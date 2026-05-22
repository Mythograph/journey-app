import type { APIRoute } from "astro";
import { getPurchase, savePurchase } from "../../lib/purchases.js";

// Internal callback used by the background function after narrative generation.
// Protected by a shared secret to prevent arbitrary writes.
export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.INTERNAL_CALLBACK_SECRET;
  if (!secret) {
    return new Response(JSON.stringify({ error: "Not configured" }), { status: 500 });
  }

  let body: { token?: string; narrative?: string; secret?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (body.secret !== secret) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  const { token, narrative } = body;
  if (!token || !narrative) {
    return new Response(JSON.stringify({ error: "Missing token or narrative" }), { status: 400 });
  }

  const purchase = await getPurchase(token);
  if (!purchase) {
    return new Response(JSON.stringify({ error: "Unknown token" }), { status: 404 });
  }

  await savePurchase({ ...purchase, narrative });
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
