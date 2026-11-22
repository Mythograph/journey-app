import { createHmac, timingSafeEqual } from "crypto";

/**
 * Paddle (Log Book, 22 Nov 2026: Journey Narrative moves from Stripe to Paddle,
 * the seller for every Mythograph digital sale). Paddle signs each webhook:
 * the Paddle-Signature header holds "ts=…;h1=…", where h1 is an HMAC-SHA256
 * of "ts:body" with the notification destination's secret key.
 */

const TOLERANCE_SECONDS = 5 * 60;

export function verifyPaddleSignature(rawBody: string, header: string | null, secret: string | undefined, now = Date.now()): boolean {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(
    header.split(";").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()];
    }),
  );
  const ts = Number(parts.ts);
  const h1 = parts.h1;
  if (!Number.isFinite(ts) || !h1) return false;
  if (Math.abs(now / 1000 - ts) > TOLERANCE_SECONDS) return false;
  const expected = createHmac("sha256", secret).update(`${ts}:${rawBody}`).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(h1, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function paddleApiBase(env: string | undefined): string {
  return env === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com";
}

/** The buyer's email and name. Paddle's transaction carries only a customer id, so we ask. */
export async function paddleCustomer(customerId: string, apiKey: string | undefined, env: string | undefined): Promise<{ email: string; name: string } | null> {
  if (!apiKey || !customerId) return null;
  const res = await fetch(`${paddleApiBase(env)}/customers/${encodeURIComponent(customerId)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return null;
  const body = (await res.json().catch(() => null)) as { data?: { email?: string; name?: string | null } } | null;
  const email = body?.data?.email?.trim();
  return email ? { email, name: body?.data?.name?.trim() ?? "" } : null;
}

/** The price ids in a transaction, whichever shape Paddle sends. */
export function priceIdsOf(items: { price?: { id?: string } | null; price_id?: string }[] | undefined): string[] {
  return (items ?? []).map((i) => i.price?.id ?? i.price_id ?? "").filter(Boolean);
}
