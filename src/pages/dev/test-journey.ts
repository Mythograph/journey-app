import type { APIRoute } from "astro";
import { savePurchase, createPurchaseToken } from "../../lib/purchases.js";

// Test route — creates a fake purchase and redirects to the journey page.
// Delete this file when done testing.
export const GET: APIRoute = async ({ redirect }) => {
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
