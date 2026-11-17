import type { APIRoute } from "astro";
import { getPurchase, updatePurchase } from "../../lib/purchases.js";

// Saves the reader's four-week tracker with their purchase, so entries follow
// the reading link to any device. The token is the credential, exactly as it
// is for the reading page itself.
//
// Accepts only the shapes the tracker produces: short alphanumeric keys,
// boolean checks or short strings (dates, tallies, notes).

const MAX_KEYS = 200;
const MAX_TEXT = 4000;
const KEY_RE = /^[a-z0-9]{1,16}$/i;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function cleanState(input: unknown): Record<string, string | boolean> | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const entries = Object.entries(input as Record<string, unknown>);
  if (entries.length > MAX_KEYS) return null;
  const out: Record<string, string | boolean> = {};
  for (const [k, v] of entries) {
    if (!KEY_RE.test(k)) return null;
    if (typeof v === "boolean") out[k] = v;
    else if (typeof v === "string" && v.length <= MAX_TEXT) out[k] = v;
    else return null;
  }
  return out;
}

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("token");
  if (!token) return json({ error: "Missing token" }, 400);
  const purchase = await getPurchase(token);
  if (!purchase) return json({ error: "Invalid token" }, 404);
  return json({ state: purchase.tracker ?? {} });
};

export const POST: APIRoute = async ({ request }) => {
  let body: { token?: unknown; state?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (typeof body.token !== "string" || !body.token) return json({ error: "Missing token" }, 400);
  const state = cleanState(body.state);
  if (!state) return json({ error: "Invalid tracker state" }, 400);

  const ok = await updatePurchase(body.token, { tracker: state });
  if (!ok) return json({ error: "Invalid token" }, 404);
  return json({ ok: true });
};
