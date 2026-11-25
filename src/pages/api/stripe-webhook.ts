import type { APIRoute } from "astro";
import Stripe from "stripe";
import { createPurchaseToken, getPurchase, savePaymentRef, savePurchase, tokenForPaymentRef } from "../../lib/purchases.js";
import { envOf, readingUrl, sendLinkEmailOnce } from "../../lib/fulfil.js";

export const POST: APIRoute = async ({ request }) => {
  const stripeSecret = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;
  const env = envOf(import.meta.env);
  const makeWebhookUrl = env.MAKE_WEBHOOK_URL;

  if (!stripeSecret || !webhookSecret) {
    return new Response("Stripe env vars not configured", { status: 500 });
  }

  const stripe = new Stripe(stripeSecret);
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature error:", msg);
    return new Response(`Webhook signature error: ${msg}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email ?? session.metadata?.email;
    const name  = session.customer_details?.name  ?? "";

    if (!email) {
      console.error("No customer email in checkout session", session.id);
      return new Response("No customer email", { status: 400 });
    }

    // A repeat of a session already recorded (Stripe retries until it gets a 2xx):
    // send the link email only if it hasn't gone yet, and never make a second purchase.
    const ref = `stripe:${session.id}`;
    const known = await tokenForPaymentRef(ref);
    if (known) {
      const had = await getPurchase(known);
      const again = had ? await sendLinkEmailOnce(had, env) : { ok: true as const };
      if (!again.ok) console.error("Journey link email failed again:", session.id, again.error);
      return again.ok ? new Response("ok", { status: 200 }) : new Response("Email not sent", { status: 500 });
    }

    // Generate a signed access token for this purchase
    const token = createPurchaseToken(email, session.id);
    const purchase = { token, email, name, stripeSessionId: session.id, provider: "stripe" as const, paidAt: new Date().toISOString() };

    // Persist the purchase so the journey page can verify it
    await savePurchase(purchase);
    await savePaymentRef(ref, token);

    // The site sends the link email itself (Resend, 24 Nov 2026; Make.com had no scenario).
    // If it fails, answer 500 so Stripe retries; the retry finds the purchase above.
    const sent = await sendLinkEmailOnce(purchase, env);
    if (!sent.ok) console.error("Journey link email failed:", session.id, sent.error);

    // A copy to Make, only if its address is set (for Kit tags and the like).
    if (makeWebhookUrl) {
      try {
        await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            email,
            name,
            stripeSessionId: session.id,
            journeyUrl: readingUrl(token, env),
          }),
        });
      } catch (err) {
        console.error("Make.com webhook forward failed:", err);
      }
    }
    if (!sent.ok) return new Response("Email not sent", { status: 500 });
  }

  return new Response("ok", { status: 200 });
};
