import { linkEmail, readyEmail, sendEmail, type SendResult } from "./email.js";
import { getPurchase, updatePurchase, type Purchase } from "./purchases.js";

/**
 * Sending a purchase its emails, once each (24 Nov 2026). The sent time is
 * kept on the purchase, so a payment service's retry, or the catch-up path,
 * never sends the same email twice.
 */

type Env = Record<string, string | undefined>;

/** Env from Astro or the Netlify runtime, whichever has it (Netlify sets new values only on a new deploy). */
export function envOf(astroEnv: Env): Env {
  return new Proxy({}, { get: (_t, k: string) => astroEnv[k] ?? process.env[k] }) as Env;
}

export function readingUrl(token: string, env: Env): string {
  return `${(env.SITE_URL ?? "https://journey.mythograph.co").replace(/\/$/, "")}/journey/${token}`;
}

export type FulfilResult = SendResult | { ok: true; skipped: "test" | "already sent" };

/** The link email, unless it's a test purchase or already sent. */
export async function sendLinkEmailOnce(purchase: Purchase, env: Env, fetchImpl?: typeof fetch): Promise<FulfilResult> {
  if (purchase.test) return { ok: true, skipped: "test" };
  if (purchase.linkEmailedAt) return { ok: true, skipped: "already sent" };
  const r = await sendEmail(linkEmail({ to: purchase.email, name: purchase.name, readingUrl: readingUrl(purchase.token, env), provider: purchase.provider }), env.RESEND_API_KEY, fetchImpl);
  if (r.ok) await updatePurchase(purchase.token, { linkEmailedAt: new Date().toISOString() });
  return r;
}

/** The reading-ready email, unless it's a test purchase or already sent. */
export async function sendReadyEmailOnce(token: string, env: Env, fetchImpl?: typeof fetch): Promise<FulfilResult> {
  const purchase = await getPurchase(token);
  if (!purchase) return { ok: false, error: "unknown token" };
  if (purchase.test) return { ok: true, skipped: "test" };
  if (purchase.readyEmailedAt) return { ok: true, skipped: "already sent" };
  const r = await sendEmail(readyEmail({ to: purchase.email, name: purchase.name, readingUrl: readingUrl(token, env) }), env.RESEND_API_KEY, fetchImpl);
  if (r.ok) await updatePurchase(token, { readyEmailedAt: new Date().toISOString() });
  return r;
}

/** Which purchases never got their link email: paid on or after `since`, not tests, no birth details yet. Pure, for tests. */
export function missedLinkEmails(purchases: Purchase[], since: Date): Purchase[] {
  return purchases
    .filter((p) => !p.test && !p.linkEmailedAt && !p.birthData && new Date(p.paidAt) >= since)
    .sort((a, b) => a.paidAt.localeCompare(b.paidAt));
}

/** "clea+test7@mythograph.co" -> "cl…@mythograph.co", for lists that shouldn't show whole addresses. */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  return `${(user ?? "").slice(0, 2)}…@${domain ?? ""}`;
}
