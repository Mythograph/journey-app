import type { APIRoute } from "astro";
import { savePurchase, createPurchaseToken } from "../../lib/purchases.js";
import { buildLifeQuestionsNarrative, normalizeGrammar } from "../../lib/cosmic-core/index.js";
import { chartFromSnapshot, readingInputsFromChart, type ChartSnapshot } from "../../lib/reading/chart-snapshot.js";
import { STORY_LOOM_NOTE } from "../../lib/story-loom-bridge.js";

// DEV ONLY: creates a purchase holding a finished Life Questions reading for
// the sample 4/1 Emotional Manifestor chart, without geocoding or generation,
// and redirects to it. Returns 404 outside `astro dev`.

const ROWS: [string, number, number, number, number][] = [
  ["Sun", 49, 4, 14, 1], ["Earth", 4, 4, 8, 1], ["Moon", 19, 3, 9, 5],
  ["NorthNode", 39, 2, 39, 3], ["SouthNode", 38, 2, 38, 3], ["Mercury", 41, 1, 34, 2],
  ["Venus", 25, 4, 5, 5], ["Mars", 49, 6, 5, 6], ["Jupiter", 51, 2, 21, 1],
  ["Saturn", 30, 3, 13, 4], ["Uranus", 40, 5, 40, 2], ["Neptune", 1, 6, 1, 4],
  ["Pluto", 64, 1, 64, 5], ["Chiron", 37, 2, 55, 3],
];

export const GET: APIRoute = async ({ redirect }) => {
  if (!import.meta.env.DEV) return new Response("Not found", { status: 404 });

  const snapshot: ChartSnapshot = {
    type: "Manifestor",
    strategy: "To Inform",
    authority: "Emotional",
    profile: "4/1",
    incarnationCross: "Juxtaposition Cross of Principles",
    personality: ROWS.map(([planet, gate, line]) => ({ planet, gate, line })),
    design: ROWS.map(([planet, , , gate, line]) => ({ planet, gate, line })),
  };
  const inputs = readingInputsFromChart(chartFromSnapshot(snapshot));
  const narrative = normalizeGrammar(
    buildLifeQuestionsNarrative(
      { profile: inputs.profile, geneKeys: inputs.geneKeys, activations: inputs.activations },
      { closingNote: STORY_LOOM_NOTE },
    ),
  );

  const sessionId = `sample_${Date.now()}`;
  const token = createPurchaseToken("sample@example.com", sessionId);
  await savePurchase({
    token,
    email: "sample@example.com",
    name: "Sample Reader",
    stripeSessionId: sessionId,
    paidAt: new Date().toISOString(),
    birthData: { date: "1985-06-01", time: "12:00", city: "Savannah, GA" },
    narrative,
    chart: snapshot,
  });
  return redirect(`/journey/${token}`, 302);
};
