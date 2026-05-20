import type { APIRoute } from "astro";
import { savePurchase, createPurchaseToken } from "../../lib/purchases.js";

// Dev-only route to create a test purchase and redirect to the journey page.
// Remove or gate this before going to production with real traffic.
export const GET: APIRoute = async ({ redirect }) => {
  if (import.meta.env.PROD) {
    return new Response("Not available in production", { status: 403 });
  }

  const email = "test@example.com";
  const sessionId = `test_${Date.now()}`;
  const token = createPurchaseToken(email, sessionId);

  await savePurchase({
    token,
    email,
    name: "Test User",
    stripeSessionId: sessionId,
    paidAt: new Date().toISOString(),
  });

  return redirect(`/journey/${token}`, 302);
};
