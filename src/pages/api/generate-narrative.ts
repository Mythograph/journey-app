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

  // Use Netlify's injected URL env var (canonical site URL) as the base;
  // url.origin can resolve to an internal address inside a Lambda.
  const siteUrl = process.env.URL ?? url.origin;
  const bgUrl = `${siteUrl}/.netlify/functions/generate-bg-background`;
  try {
    await fetch(bgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  } catch (err) {
    console.error("generate-narrative: failed to trigger bg function", err);
  }

  return new Response(JSON.stringify({ status: "generating" }), {
    headers: { "Content-Type": "application/json" },
  });
};
