import type { APIRoute } from "astro";
import { getPurchase } from "../../lib/purchases.js";

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("token");
  if (!token) {
    return new Response(JSON.stringify({ ready: false }), { status: 400 });
  }

  const purchase = await getPurchase(token);
  if (!purchase) {
    return new Response(JSON.stringify({ ready: false }), { status: 404 });
  }

  return new Response(JSON.stringify({ ready: Boolean(purchase.narrative) }), {
    headers: { "Content-Type": "application/json" },
  });
};
