import type { APIRoute } from "astro";
import { savePurchase, createPurchaseToken } from "../../lib/purchases.js";

// Test route — creates a fake purchase (bypassing Stripe) and redirects to
// the journey page. Meant to stay around for ongoing manual testing, so it's
// gated behind a shared secret rather than deleted before prod: without
// DEV_TEST_SECRET set, or without a matching ?key=, it 404s like the route
// doesn't exist.
export const GET: APIRoute = async ({ redirect, url }) => {
  const secret = process.env.DEV_TEST_SECRET;
  if (!secret || url.searchParams.get("key") !== secret) {
    return new Response("Not found", { status: 404 });
  }

  const email = "clea@mythograph.co";
  const sessionId = `test_${Date.now()}`;
  const token = createPurchaseToken(email, sessionId);

  await savePurchase({
    token,
    email,
    name: "Cléa",
    stripeSessionId: sessionId,
    paidAt: new Date().toISOString(),
  });

  return redirect(`/journey/${token}`, 302);
};
