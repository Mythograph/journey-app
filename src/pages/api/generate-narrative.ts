import type { APIRoute } from "astro";
import { getPurchase, updatePurchase } from "../../lib/purchases.js";
import { generateChart } from "../../lib/chart-engine/index.js";
import { streamNarrative } from "../../lib/narrative.js";

export const GET: APIRoute = async ({ url, locals }) => {
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

  // Start generation in background — returns immediately so the function
  // doesn't time out. waitUntil() keeps the Lambda alive after the response.
  const { context } = (locals as any).netlify;
  context.waitUntil(
    (async () => {
      try {
        const chart = await generateChart(purchase.birthData!);
        let accumulated = "";
        for await (const chunk of streamNarrative(chart, purchase.name)) {
          accumulated += chunk;
        }
        await updatePurchase(token, { narrative: accumulated });

        const makeUrl = import.meta.env.MAKE_NARRATIVE_WEBHOOK_URL;
        if (makeUrl && accumulated) {
          fetch(makeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: purchase.email, name: purchase.name, narrative: accumulated }),
          }).catch(() => {});
        }
      } catch {
        // Generation failed — client will show timeout message after ~120s
      }
    })()
  );

  return new Response(JSON.stringify({ status: "generating" }), {
    headers: { "Content-Type": "application/json" },
  });
};
