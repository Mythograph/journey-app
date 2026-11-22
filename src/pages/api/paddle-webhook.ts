import type { APIRoute } from "astro";
import { createPurchaseToken, savePaymentRef, savePurchase, tokenForPaymentRef } from "../../lib/purchases.js";
import { paddleCustomer, priceIdsOf, verifyPaddleSignature } from "../../lib/paddle.js";

/**
 * Paddle tells Journey about a sale (Log Book, 22 Nov 2026). It does what the
 * Stripe webhook does: a purchase and its token, then the token email through
 * Make.com. Paddle sends every sale on the account here, so a sale of anything
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
  if (await tokenForPaymentRef(txnId)) return new Response("ok");

  const customer = event.data.customer_id ? await paddleCustomer(event.data.customer_id, env.PADDLE_API_KEY ?? process.env.PADDLE_API_KEY, env.PADDLE_ENV ?? process.env.PADDLE_ENV) : null;
  if (!customer) {
    console.error("Paddle sale with no readable customer email:", txnId);
    // 500 so Paddle tries again later.
    return new Response("No customer email", { status: 500 });
  }

  const token = createPurchaseToken(customer.email, txnId);
  await savePurchase({ token, email: customer.email, name: customer.name, stripeSessionId: txnId, provider: "paddle", paidAt: new Date().toISOString() });
  await savePaymentRef(txnId, token);

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
  return new Response("ok");
};
