import type { Handler } from "@netlify/functions";
import type { Purchase } from "../../src/lib/purchases.js";
import { generateChart } from "../../src/lib/chart-engine/index.js";
import { streamNarrative } from "../../src/lib/narrative.js";

// Background function: runs for up to 15 minutes on all plans (including free).
// Invoked via POST from /api/generate-narrative with the full purchase object in the body.
// After generating, POSTs back to /api/save-narrative (a regular Astro route with Blobs access)
// because @netlify/blobs has no context in standalone background functions.
const handler: Handler = async (event) => {
  let body: { purchase?: Purchase };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400 };
  }

  const purchase = body.purchase;
  if (!purchase?.token || !purchase?.birthData) return { statusCode: 400 };
  if (purchase.narrative) return { statusCode: 200 }; // already done

  const siteUrl = process.env.URL ?? "http://localhost:4321";
  const callbackSecret = process.env.INTERNAL_CALLBACK_SECRET;
  if (!callbackSecret) {
    console.error("generate-bg: INTERNAL_CALLBACK_SECRET is not set");
    return { statusCode: 500 };
  }

  try {
    const chart = await generateChart(purchase.birthData);
    let accumulated = "";
    for await (const chunk of streamNarrative(chart, purchase.name ?? "")) {
      accumulated += chunk;
    }
    console.log(`generate-bg: generated narrative for token ${purchase.token.slice(0, 10)}… (${accumulated.length} chars)`);

    // Write via the Astro API route which has proper Blobs context
    const saveRes = await fetch(`${siteUrl}/api/save-narrative`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: purchase.token, narrative: accumulated, secret: callbackSecret }),
    });
    if (!saveRes.ok) {
      const text = await saveRes.text();
      console.error(`generate-bg: save-narrative returned ${saveRes.status}: ${text}`);
      return { statusCode: 500 };
    }
    console.log(`generate-bg: saved narrative for token ${purchase.token.slice(0, 10)}…`);

    const makeUrl = process.env.MAKE_NARRATIVE_WEBHOOK_URL;
    if (makeUrl && accumulated) {
      await fetch(makeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: purchase.email, name: purchase.name, narrative: accumulated }),
      });
    }
  } catch (err) {
    console.error("generate-bg: generation failed", err);
  }

  return { statusCode: 200 };
};

export { handler };
