import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import { listPurchases } from "../../lib/purchases.js";
import { envOf, maskEmail, missedLinkEmails, sendLinkEmailOnce } from "../../lib/fulfil.js";

/**
 * Catching up on link emails that never went out (24 Nov 2026): before the
 * site sent its own emails, every one went to Make.com, where nothing picked
 * them up. Private, behind TEST_READING_KEY, like /test-reading.
 *
 *   GET  /api/send-missed?key=…&since=2026-11-01   lists who would get one (nothing is sent)
 *   POST /api/send-missed?key=…&since=2026-11-01&confirm=send   sends them, once each
 *
 * Only buyers who paid on or after `since`, haven't added birth details (so
 * never reached their page) and haven't had the email. Test readings never.
 */

function keyMatches(given: string | null, expected: string | undefined): boolean {
  if (!given || !expected || expected.length < 16) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body, null, 2), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

async function who(url: URL) {
  const env = envOf(import.meta.env);
  if (!keyMatches(url.searchParams.get("key"), env.TEST_READING_KEY)) return null;
  const since = new Date(url.searchParams.get("since") ?? "");
  if (Number.isNaN(since.getTime())) return { env, since: null, list: [] };
  return { env, since, list: missedLinkEmails(await listPurchases(), since) };
}

export const GET: APIRoute = async ({ url }) => {
  const w = await who(url);
  if (!w) return new Response("Not found", { status: 404 });
  if (!w.since) return json({ error: "Add since=YYYY-MM-DD: the first payment date to include." }, 400);
  return json({
    wouldSend: w.list.length,
    people: w.list.map((p) => ({ email: maskEmail(p.email), paidAt: p.paidAt, via: p.provider ?? "stripe" })),
    toSend: "POST to this same address with &confirm=send",
  });
};

export const POST: APIRoute = async ({ url }) => {
  const w = await who(url);
  if (!w) return new Response("Not found", { status: 404 });
  if (!w.since) return json({ error: "Add since=YYYY-MM-DD." }, 400);
  if (url.searchParams.get("confirm") !== "send") return json({ error: "Add &confirm=send to send." }, 400);
  const results = [];
  for (const p of w.list) {
    const r = await sendLinkEmailOnce(p, w.env);
    results.push({ email: maskEmail(p.email), sent: r.ok, ...(r.ok ? {} : { error: r.error }) });
  }
  return json({ sent: results.filter((r) => r.sent).length, failed: results.filter((r) => !r.sent).length, results });
};
