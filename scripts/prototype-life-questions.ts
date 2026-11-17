// Render the Life Questions reading for the sample fixture, using the same
// renderer as the live reading page (src/lib/reading/life-questions-reading.ts).
//   npx tsx scripts/prototype-life-questions.ts <out-dir>
// Writes life-questions.txt and life-questions.html, and prints a voice audit.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildLifeQuestionsNarrative,
  normalizeGrammar,
  DETAIL_MARKER,
  CHANNEL_SPECS,
} from "../src/lib/cosmic-core/index.js";
import { renderLifeQuestionsDocument } from "../src/lib/reading/life-questions-reading.js";
import { STORY_LOOM_NOTE } from "../src/lib/story-loom-bridge.js";
import type { CenterName } from "../src/lib/chart-engine/types.js";
import { activations, profile, geneKeys } from "./fixtures/sample-manifestor-41.js";

const outDir = process.argv[2] ?? "out";
mkdirSync(outDir, { recursive: true });

const text = normalizeGrammar(buildLifeQuestionsNarrative({ profile, geneKeys, activations }, { closingNote: STORY_LOOM_NOTE }));
writeFileSync(join(outDir, "life-questions.txt"), text);

// ── Voice audit ──────────────────────────────────────────────────────────────
const BANNED = /\b(vibration|manifestation|resonance|authentic self|awakening|frequency)\b/gi;
const report: string[] = [];
const words = text.split(/\s+/).length;
report.push(`words: ${words}`);
const visible = text.split(/\n\n+/).filter(b => !b.startsWith(DETAIL_MARKER)).join(" ").split(/\s+/).length;
report.push(`visible words (short layer + prompts + recap + closing): ${visible}`);
const banned = text.match(BANNED) ?? [];
report.push(`banned words: ${banned.length ? banned.join(", ") : "none"}`);
const prose = text.split("\n").filter(l => !/^[A-Z][A-Z ?'—-]+$/.test(l.trim()));
report.push(`em dashes in prose: ${prose.join("\n").split("—").length - 1}`);
report.push(`"not X, but Y": ${(text.match(/\bnot [^.,;]{1,40}, but\b/g) ?? []).length}`);
report.push(`blanks (___ / unknown gate): ${(text.match(/___|unknown gate/g) ?? []).length}`);
for (const n of [1, 4, 5, 49]) report.push(`"Gate ${n} sits in" count: ${(text.match(new RegExp(`Gate ${n} sits in`, "g")) ?? []).length}`);
console.log(report.join("\n"));

// ── HTML preview (same renderer as the live reading page) ───────────────────
const real = activations.filter(a => a.planet !== "Chiron");
const personalityGates = new Set(real.filter(a => a.side === "conscious").map(a => a.gate));
const designGates = new Set(real.filter(a => a.side === "unconscious").map(a => a.gate));
const all = new Set([...personalityGates, ...designGates]);
const chans = CHANNEL_SPECS.filter(c => c.gates.every(g => all.has(g)));

const page = renderLifeQuestionsDocument({
  text,
  profile,
  geneKeys,
  activations,
  bodygraph: {
    definedCenters: new Set<CenterName>(chans.flatMap(c => c.centers) as CenterName[]),
    definedChannels: chans.map(c => c.gates),
    personalityGates,
    designGates,
  },
  name: "Sample reading",
  subtitle: "4/1 Emotional Manifestor",
  closingNote: STORY_LOOM_NOTE,
  title: "Life Questions Preview",
});
writeFileSync(join(outDir, "life-questions.html"), page);
console.log(`wrote ${outDir}/life-questions.{txt,html}`);
