import type { APIRoute } from "astro";
import { createPurchaseToken, getPurchase, savePaymentRef, savePurchase, tokenForPaymentRef } from "../../lib/purchases.js";
import { envOf, sendLinkEmailOnce } from "../../lib/fulfil.js";
import { paddleCustomer, priceIdsOf, verifyPaddleSignature } from "../../lib/paddle.js";

/**
 * Paddle tells Journey about a sale (Log Book, 22 Nov 2026). It does what the
 * Stripe webhook does: a purchase and its token, then the link email, which
 * the site sends itself through Resend (24 Nov 2026; Make.com had no scenario). Paddle sends every sale on the account here, so a sale of anything
 * other than the Journey Narrative is acknowledged and left alone. A repeat of
 * a sale already recorded changes nothing.
 */
export const POST: APIRoute = async ({ request }) => {
  const env = import.meta.env;
  const rawBody = await request.text();
  const signature = request.headers.get("paddle-signature");
  const secret = env.PADDLE_WEBHOOK_SECRET ?? process.env.PADDLE_WEBHOOK_SECRET;
  if (!verifyPaddleSignature(rawBody, signature, secret)) {
    // Says which part failed, never the secret itself.
    console.error("Paddle signature check failed:", JSON.stringify({ header: Boolean(signature), secretSet: Boolean(secret), secretLooksRight: Boolean(secret?.startsWith("pdl_ntfset_")) }));
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    event_type?: string;
    data?: { id?: string; customer_id?: string | null; items?: { price?: { id?: string } | null; price_id?: string }[] };
  };
  if (event.event_type !== "transaction.completed" || !event.data?.id) return new Response("ok");

  const journeyPrice = env.PADDLE_PRICE_JOURNEY ?? env.PUBLIC_PADDLE_PRICE_JOURNEY ?? process.env.PUBLIC_PADDLE_PRICE_JOURNEY;
  if (!journeyPrice || !priceIdsOf(event.data.items).includes(journeyPrice)) return new Response("ok");

  const txnId = event.data.id;
  const env2 = envOf(env);
  // A repeat of a sale already recorded: send the link email only if it hasn't gone yet.
  const known = await tokenForPaymentRef(txnId);
  if (known) {
    const had = await getPurchase(known);
    if (!had) return new Response("ok");
    const again = await sendLinkEmailOnce(had, env2);
    if (!again.ok) console.error("Journey link email failed again:", txnId, again.error);
    return again.ok ? new Response("ok") : new Response("Email not sent", { status: 500 });
  }

  const customer = event.data.customer_id ? await paddleCustomer(event.data.customer_id, env.PADDLE_API_KEY ?? process.env.PADDLE_API_KEY, env.PADDLE_ENV ?? process.env.PADDLE_ENV) : null;
  if (!customer) {
    console.error("Paddle sale with no readable customer email:", txnId);
    // 500 so Paddle tries again later.
    return new Response("No customer email", { status: 500 });
  }

  const token = createPurchaseToken(customer.email, txnId);
  await savePurchase({ token, email: customer.email, name: customer.name, stripeSessionId: txnId, provider: "paddle", paidAt: new Date().toISOString() });
  await savePaymentRef(txnId, token);

  // The site sends the link email itself (Resend, 24 Nov 2026). If it fails, answer 500 so
  // Paddle sends the sale again; the repeat finds the purchase above and tries the email again.
  const sent = await sendLinkEmailOnce({ token, email: customer.email, name: customer.name, stripeSessionId: txnId, provider: "paddle", paidAt: new Date().toISOString() }, env2);
  if (!sent.ok) console.error("Journey link email failed:", txnId, sent.error);

  // A copy to Make, only if its address is set (for Kit tags and the like). It no longer sends the email.
  const makeWebhookUrl = env.MAKE_WEBHOOK_URL ?? process.env.MAKE_WEBHOOK_URL;
  if (makeWebhookUrl) {
    try {
      await fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Same fields the Stripe webhook sends, so the Make scenario needs no change.
        body: JSON.stringify({ token, email: customer.email, name: customer.name, stripeSessionId: txnId, journeyUrl: `${env.SITE_URL ?? ""}/journey/${token}` }),
      });
    } catch (err) {
      console.error("Make.com webhook forward failed:", err);
    }
  }
  return sent.ok ? new Response("ok") : new Response("Email not sent", { status: 500 });
};
