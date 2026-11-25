import { test } from "node:test";
import assert from "node:assert/strict";
import { FROM_EMAIL, firstName, linkEmail, readyEmail, sendEmail } from "../src/lib/email.ts";
import { maskEmail, missedLinkEmails, readingUrl, sendLinkEmailOnce, sendReadyEmailOnce } from "../src/lib/fulfil.ts";
import { getPurchase, listPurchases, savePurchase, type Purchase } from "../src/lib/purchases.ts";

// Journey's own emails through Resend (24 Nov 2026).

type Call = { url: string; init: RequestInit };
function fakeFetch(status = 200, body: unknown = { id: "email_1" }) {
  const calls: Call[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status });
  }) as unknown as typeof fetch;
  return { f, calls };
}

const env = { RESEND_API_KEY: "re_test", SITE_URL: "https://journey.mythograph.co/" };

test("the link email names her, links her page, and escapes what she typed", () => {
  const e = linkEmail({ to: "a@b.co", name: "<b>Ana</b> Ruiz", readingUrl: "https://journey.mythograph.co/journey/jny_x", provider: "paddle" });
  assert.equal(e.subject, "Your Journey Narrative is ready to begin");
  assert.ok(e.html.includes("&lt;b&gt;Ana&lt;/b&gt;, thank you"));
  assert.doesNotMatch(e.html, /<b>Ana/);
  assert.match(e.html, /href="https:\/\/journey\.mythograph\.co\/journey\/jny_x"/);
  assert.match(e.text, /Open my reading: https:\/\/journey/);
  assert.match(e.html, /receipt comes separately from Paddle/);
  assert.doesNotMatch(linkEmail({ to: "a@b.co", readingUrl: "x", provider: "stripe" }).html, /Paddle/);
  assert.match(linkEmail({ to: "a@b.co", readingUrl: "x" }).text, /^Thank you\./);
  assert.equal(firstName("  María José  "), "María");
});

test("the ready email links the same page", () => {
  const e = readyEmail({ to: "a@b.co", name: "Ana", readingUrl: "https://journey.mythograph.co/journey/jny_x" });
  assert.equal(e.subject, "Your Journey Narrative is ready");
  assert.match(e.text, /^Ana, your Journey Narrative is ready\./);
});

test("no em dashes in what she reads", () => {
  for (const e of [linkEmail({ to: "a@b.co", name: "A", readingUrl: "x", provider: "paddle" }), readyEmail({ to: "a@b.co", readingUrl: "x" })]) {
    assert.doesNotMatch(e.text, /—/);
  }
});

test("sends through Resend from Mythograph", async () => {
  const { f, calls } = fakeFetch();
  const r = await sendEmail(linkEmail({ to: "a@b.co", readingUrl: "x" }), "re_test", f);
  assert.deepEqual(r, { ok: true, id: "email_1" });
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal((calls[0].init.headers as Record<string, string>).Authorization, "Bearer re_test");
  const sent = JSON.parse(String(calls[0].init.body));
  assert.equal(sent.from, FROM_EMAIL);
  assert.deepEqual(sent.to, ["a@b.co"]);
});

test("a send that fails says so instead of throwing", async () => {
  assert.equal((await sendEmail(linkEmail({ to: "a@b.co", readingUrl: "x" }), undefined)).ok, false);
  const { f } = fakeFetch(403, { name: "validation_error", message: "The domain is not verified" });
  const r = await sendEmail(linkEmail({ to: "a@b.co", readingUrl: "x" }), "re_test", f);
  assert.equal(r.ok, false);
  assert.match((r as { error: string }).error, /403: The domain is not verified/);
  const boom = (async () => { throw new Error("offline"); }) as unknown as typeof fetch;
  assert.deepEqual(await sendEmail(linkEmail({ to: "a@b.co", readingUrl: "x" }), "re_test", boom), { ok: false, error: "offline" });
});

const base = (over: Partial<Purchase>): Purchase => ({ token: `jny_${Math.random().toString(36).slice(2)}`, email: "a@b.co", name: "Ana", stripeSessionId: "s", paidAt: "2026-11-20T10:00:00Z", ...over });

test("each email goes once, and never for a test reading", async () => {
  const p = base({});
  await savePurchase(p);
  const { f, calls } = fakeFetch();
  assert.equal((await sendLinkEmailOnce(p, env, f)).ok, true);
  assert.ok((await getPurchase(p.token))?.linkEmailedAt);
  assert.deepEqual(await sendLinkEmailOnce((await getPurchase(p.token))!, env, f), { ok: true, skipped: "already sent" });
  assert.equal(JSON.parse(String(calls[0].init.body)).html.includes(`https://journey.mythograph.co/journey/${p.token}`), true);
  assert.equal(calls.length, 1);

  assert.equal((await sendReadyEmailOnce(p.token, env, f)).ok, true);
  assert.equal((await sendReadyEmailOnce(p.token, env, f) as { skipped?: string }).skipped, "already sent");
  assert.equal(calls.length, 2);

  const t = base({ test: true });
  await savePurchase(t);
  assert.deepEqual(await sendLinkEmailOnce(t, env, f), { ok: true, skipped: "test" });
  assert.equal(calls.length, 2);
});

test("a failed send isn't marked sent, so a retry tries again", async () => {
  const p = base({});
  await savePurchase(p);
  assert.equal((await sendLinkEmailOnce(p, env, fakeFetch(500, {}).f)).ok, false);
  assert.equal((await getPurchase(p.token))?.linkEmailedAt, undefined);
  assert.equal((await sendLinkEmailOnce(p, env, fakeFetch().f)).ok, true);
});

test("the catch-up picks only buyers who never reached their page", async () => {
  const since = new Date("2026-11-10");
  const list = missedLinkEmails([
    base({ paidAt: "2026-11-12T09:00:00Z", email: "first@x.co" }),
    base({ paidAt: "2026-11-18T09:00:00Z", email: "second@x.co" }),
    base({ paidAt: "2026-11-01T09:00:00Z", email: "old@x.co" }),
    base({ paidAt: "2026-11-15T09:00:00Z", linkEmailedAt: "2026-11-15T09:00:01Z" }),
    base({ paidAt: "2026-11-15T09:00:00Z", birthData: { date: "1990-01-01" } as unknown as Purchase["birthData"] }),
    base({ paidAt: "2026-11-15T09:00:00Z", test: true }),
  ], since);
  assert.deepEqual(list.map((p) => p.email), ["first@x.co", "second@x.co"]);
  assert.equal(maskEmail("clea+test7@mythograph.co"), "cl…@mythograph.co");
  assert.equal(readingUrl("jny_1", { SITE_URL: "https://journey.mythograph.co/" }), "https://journey.mythograph.co/journey/jny_1");
  assert.ok((await listPurchases()).length >= 1);
});

test("purchases are read strongly, so a page right after a save sees it", async () => {
  const { readFileSync } = await import("node:fs");
  assert.match(readFileSync("src/lib/purchases.ts", "utf8"), /netlifyGetStore\(\{ name: "journey-purchases", consistency: "strong" \}\)/);
});
