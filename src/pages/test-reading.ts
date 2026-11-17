import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import { savePurchase, createPurchaseToken } from "../lib/purchases.js";

// Private, free test path for Cléa on the live site:
//   /test-reading?key=<TEST_READING_KEY>              → a Life Questions reading
//   /test-reading?key=<TEST_READING_KEY>&format=classic → the classic reading
//
// Creates an unpaid test purchase and sends you to its reading page, where you
// enter birth data and the reading generates exactly as a customer's would.
// The format is forced per purchase, so this works while READING_FORMAT is
// still off for customers. Test readings skip the narrative email.
//
// Returns 404 unless TEST_READING_KEY is set (at least 16 characters) and the
// key matches, so the route is invisible to anyone without the key.

function keyMatches(given: string | null, expected: string | undefined): boolean {
  if (!given || !expected || expected.length < 16) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const GET: APIRoute = async ({ url, redirect }) => {
  if (!keyMatches(url.searchParams.get("key"), process.env.TEST_READING_KEY)) {
    return new Response("Not found", { status: 404 });
  }

  const format = url.searchParams.get("format") === "classic" ? "classic" : "life-questions";
  const email = "test-reading@journey.mythograph.co";
  const sessionId = `test_${Date.now()}`;
  const token = createPurchaseToken(email, sessionId);

  await savePurchase({
    token,
    email,
    name: "",
    stripeSessionId: sessionId,
    paidAt: new Date().toISOString(),
    format,
    test: true,
  });

  return new Response(null, {
    status: 302,
    headers: { Location: `/journey/${token}`, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });
};
