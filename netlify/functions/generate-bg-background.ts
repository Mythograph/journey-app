import type { Handler } from "@netlify/functions";
import { getPurchase, updatePurchase } from "../../src/lib/purchases.js";
import { generateChart } from "../../src/lib/chart-engine/index.js";
import { streamNarrative } from "../../src/lib/narrative.js";

// Background function: runs for up to 15 minutes on all plans (including free).
// Invoked via POST from /api/generate-narrative with { token } in the body.
// Netlify always responds 202 immediately; this handler runs async.
const handler: Handler = async (event) => {
  let token: string | undefined;
  try {
    const body = JSON.parse(event.body ?? "{}");
    token = body.token;
  } catch {
    return { statusCode: 400 };
  }

  if (!token) return { statusCode: 400 };

  const purchase = await getPurchase(token);
  if (!purchase?.birthData) return { statusCode: 400 };
  if (purchase.narrative) return { statusCode: 200 }; // already done

  try {
    const chart = await generateChart(purchase.birthData);
    let accumulated = "";
    for await (const chunk of streamNarrative(chart, purchase.name)) {
      accumulated += chunk;
    }
    await updatePurchase(token, { narrative: accumulated });
    console.log(`generate-bg: saved narrative for token ${token.slice(0, 10)}… (${accumulated.length} chars)`);

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
