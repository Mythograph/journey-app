import type { APIRoute } from "astro";
import { getPurchase, updatePurchase } from "../../lib/purchases.js";
import { generateChart } from "../../lib/chart-engine/index.js";
import { streamNarrative } from "../../lib/narrative.js";

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const purchase = await getPurchase(token);
  if (!purchase) {
    return new Response("Invalid token", { status: 404 });
  }
  if (!purchase.birthData) {
    return new Response("No birth data on file", { status: 400 });
  }

  // If narrative already exists, return it immediately as a single SSE event
  if (purchase.narrative) {
    const body = `data: ${JSON.stringify({ text: purchase.narrative })}\n\ndata: [DONE]\n\n`;
    return new Response(body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  }

  const chart = await generateChart(purchase.birthData);
  const name = purchase.name;

  let accumulated = "";

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of streamNarrative(chart, name)) {
          accumulated += chunk;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
        }
        // Save the complete narrative to Netlify Blobs
        await updatePurchase(token, { narrative: accumulated });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
};
