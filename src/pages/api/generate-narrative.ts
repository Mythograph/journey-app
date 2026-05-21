import type { APIRoute } from "astro";
import { getPurchase } from "../../lib/purchases.js";

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), { status: 400 });
  }

  const purchase = await getPurchase(token);
  if (!purchase) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 404 });
  }
  if (!purchase.birthData) {
    return new Response(JSON.stringify({ error: "No birth data" }), { status: 400 });
  }
  if (purchase.narrative) {
    return new Response(JSON.stringify({ status: "ready" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Trigger the background function (returns 202 immediately; generates for up to 15 min).
  const bgUrl = `${url.origin}/.netlify/functions/generate-bg-background`;
  fetch(bgUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  }).catch(() => {});

  return new Response(JSON.stringify({ status: "generating" }), {
    headers: { "Content-Type": "application/json" },
  });
};
