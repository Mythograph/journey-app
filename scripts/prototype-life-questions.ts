// Render the Life Questions prototype for the sample fixture.
//   npx tsx scripts/prototype-life-questions.ts <out-dir>
// Writes life-questions.txt and life-questions.html, and prints a voice audit.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildLifeQuestionsNarrative,
  normalizeGrammar,
  REFLECTION_MARKER,
  DETAIL_MARKER,
  LIFE_QUESTIONS_SECTIONS,
  LIFE_QUESTIONS_PARTS,
} from "../src/lib/cosmic-core/index.js";
import { activations, profile, geneKeys } from "./fixtures/sample-manifestor-41.js";

const outDir = process.argv[2] ?? "out";
mkdirSync(outDir, { recursive: true });

const text = normalizeGrammar(buildLifeQuestionsNarrative({ profile, geneKeys, activations }));
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

// ── HTML preview ─────────────────────────────────────────────────────────────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const roman = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];
const blocks = text.split(/\n\n+/);
let html = "";
let curPart = "";
let idx = 0;
let detail: string[] = [];
const flush = () => {
  if (!detail.length) return;
  html += `<details><summary>What your chart shows</summary>${detail.map(d => `<p>${esc(d)}</p>`).join("")}</details>`;
  detail = [];
};
for (const b of blocks) {
  const line = b.trim();
  if (line.startsWith(DETAIL_MARKER)) { detail.push(line.slice(DETAIL_MARKER.length).replace(/\n/g, " ")); continue; }
  flush();
  const meta = LIFE_QUESTIONS_SECTIONS.find(s => line === s.key || line.startsWith(s.key + " "));
  if (meta) {
    if (meta.part !== curPart) {
      if (curPart) html += "</section>";
      curPart = meta.part;
      const pn = LIFE_QUESTIONS_PARTS.indexOf(meta.part as typeof LIFE_QUESTIONS_PARTS[number]);
      html += `<section class="part"><p class="part-label">Part ${roman[pn]}</p><h1>${esc(meta.part)}</h1>`;
    }
    idx++;
    html += `<h2><span class="num">${roman[idx - 1]}</span>${esc(meta.title)}</h2>`;
  } else if (line.startsWith(REFLECTION_MARKER)) {
    html += `<aside><p class="label">To write with</p><p>${esc(line.slice(REFLECTION_MARKER.length))}</p></aside>`;
  } else {
    html += `<p>${esc(line.replace(/\n/g, " "))}</p>`;
  }
}
flush();
html += "</section>";

const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Life Questions Prototype</title>
<style>
:root{--bg:#fafaf7;--ink:#1a1410;--terra:#c05a3c;--gold:#c8a24a;--muted:#6b625a;--card:#f1ede4}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#17130f;--ink:#efe9df;--terra:#e08a6c;--gold:#d8b860;--muted:#a99f93;--card:#231d17}}
body{background:var(--bg);color:var(--ink);font:17px/1.65 Georgia,"Fraunces",serif;margin:0}
main{max-width:680px;margin:0 auto;padding:48px 16px 96px}
.cover{text-align:center;margin-bottom:56px}.cover p{color:var(--muted)}
h1{font-size:2rem;margin:.2em 0 1em;letter-spacing:-.01em}
h2{font-size:1.45rem;margin:2.4em 0 .8em;line-height:1.25}
.num{display:block;color:var(--terra);font-size:.85rem;letter-spacing:.2em;margin-bottom:.3em}
.part{border-top:1px solid var(--gold);padding-top:40px;margin-top:64px}
.part-label{color:var(--gold);letter-spacing:.25em;text-transform:uppercase;font-size:.8rem;margin:0}
aside{background:var(--card);border-left:3px solid var(--gold);padding:14px 18px;margin:1.6em 0;border-radius:4px}
aside .label{font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin:0 0 .4em}
aside p{margin:0}
details{margin:1.2em 0 2em;border-top:1px dashed var(--gold);padding-top:10px;color:var(--muted)}
summary{cursor:pointer;color:var(--terra);font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;padding:6px 0}
details[open] summary{margin-bottom:.6em}
details p{font-size:.95rem}
</style></head><body><main>
<div class="cover"><h1>My Human Design Journey</h1><p>Life Questions prototype · sample chart: 4/1 Emotional Manifestor</p></div>
${html}
</main></body></html>`;
writeFileSync(join(outDir, "life-questions.html"), page);
console.log(`wrote ${outDir}/life-questions.{txt,html}`);
