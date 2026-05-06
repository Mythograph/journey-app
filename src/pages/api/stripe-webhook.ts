import type { APIRoute } from "astro";
import Stripe from "stripe";
import { createPurchaseToken, savePurchase } from "../../lib/purchases.js";

export const POST: APIRoute = async ({ request }) => {
  const stripeSecret = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;
  const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;

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

    // Generate a signed access token for this purchase
    const token = createPurchaseToken(email, session.id);

    // Persist the purchase so the journey page can verify it
    await savePurchase({
      token,
      email,
      name,
      stripeSessionId: session.id,
      paidAt: new Date().toISOString(),
    });

    // Forward to Make.com for order fulfilment (email delivery, CRM, etc.)
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
            journeyUrl: `${import.meta.env.SITE_URL ?? ""}/journey/${token}`,
          }),
        });
      } catch (err) {
        // Log but don't fail — Make.com delivery is best-effort
        console.error("Make.com webhook forward failed:", err);
      }
    }
  }

  return new Response("ok", { status: 200 });
};
