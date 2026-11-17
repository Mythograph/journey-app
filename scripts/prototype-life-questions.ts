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
  CHANNEL_SPECS,
  lifeQuestionsFocus,
  buildPrimerCards,
} from "../src/lib/cosmic-core/index.js";
import { renderBodygraph } from "../src/lib/chart-engine/render.js";
import type { CenterName } from "../src/lib/chart-engine/types.js";
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

// ── HTML preview: chapters as spreads ────────────────────────────────────────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const roman = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"];

// Bodygraph inputs from the fixture (Chiron never defines a gate).
const real = activations.filter(a => a.planet !== "Chiron");
const pGates = new Set(real.filter(a => a.side === "conscious").map(a => a.gate));
const dGates = new Set(real.filter(a => a.side === "unconscious").map(a => a.gate));
const all = new Set([...pGates, ...dGates]);
const chans = CHANNEL_SPECS.filter(c => c.gates.every(g => all.has(g)));
const definedCenters = new Set<CenterName>(chans.flatMap(c => c.centers) as CenterName[]);
const bodygraph = (focus?: { gates: number[]; centers: string[] }) => renderBodygraph({
  definedCenters,
  definedChannels: chans.map(c => c.gates),
  personalityGates: pGates,
  designGates: dGates,
  personalityActivations: [],
  designActivations: [],
  focus: focus ? { gates: focus.gates, centers: focus.centers as CenterName[] } : undefined,
});
const focusMap = lifeQuestionsFocus({ profile, geneKeys, activations });

// Parse the text into chapters.
interface Chapter { key: string; title: string; part: string; voice: string[]; prompt: string; detail: string[] }
const chapters: Chapter[] = [];
for (const b of text.split(/\n\n+/)) {
  const line = b.trim();
  const meta = LIFE_QUESTIONS_SECTIONS.find(s => line === s.key || line.startsWith(s.key + " "));
  if (meta) { chapters.push({ key: meta.key, title: meta.title, part: meta.part, voice: [], prompt: "", detail: [] }); continue; }
  const ch = chapters[chapters.length - 1];
  if (!ch) continue;
  if (line.startsWith(DETAIL_MARKER)) ch.detail.push(line.slice(DETAIL_MARKER.length).replace(/\n/g, " "));
  else if (line.startsWith(REFLECTION_MARKER)) ch.prompt = line.slice(REFLECTION_MARKER.length);
  else ch.voice.push(line.replace(/\n/g, " "));
}

let html = "";
let curPart = "";
chapters.forEach((ch, i) => {
  if (ch.part !== curPart) {
    curPart = ch.part;
    const pn = LIFE_QUESTIONS_PARTS.indexOf(ch.part as typeof LIFE_QUESTIONS_PARTS[number]);
    html += `<section class="part"><p class="part-num">Part ${roman[pn]}</p><h1>${esc(ch.part)}</h1></section>`;
  }
  const f = focusMap[ch.key];
  const hasChart = ch.detail.length > 0;
  const voice = ch.voice.map((v, j) => `<p class="${j === 0 && hasChart ? "mirror" : "say"}">${esc(v)}</p>`).join("");
  const prompt = ch.prompt ? `<aside class="prompt"><p class="label">To write with</p><p>${esc(ch.prompt)}</p></aside>` : "";
  let chart = "";
  if (hasChart) {
    const merged = new Map<string, Set<string>>();
    for (const l of f?.labels ?? []) {
      const k = `${l.gate}|${l.planet}`;
      if (!merged.has(k)) merged.set(k, new Set());
      merged.get(k)!.add(l.side);
    }
    const chips = [...merged].map(([k, sides]) => {
      const [gate, planet] = k.split("|");
      const cls = sides.size === 2 ? "both" : [...sides][0];
      return `<span class="chip ${cls}"><i></i>Gate ${gate} · ${esc(planet)}</span>`;
    }).join("");
    const graph = f ? `<figure class="graph">${bodygraph(f)}${chips ? `<figcaption>${chips}</figcaption>` : ""}</figure>` : "";
    chart = `<details class="chart"><summary>What your chart shows</summary>${graph}${ch.detail.map(d => `<p>${esc(d)}</p>`).join("")}</details>`;
  }
  html += `<article class="chapter${hasChart ? "" : " solo"}"><div class="voice"><p class="num">${roman[i]}</p><h2>${esc(ch.title)}</h2>${voice}${prompt}</div>${chart}</article>`;
});

const primer = `<details class="primer"><summary>New to Human Design and Gene Keys?<small>Start here · about 5 minutes</small></summary><div class="cards">${
  buildPrimerCards(profile).map(c => `<section class="card${c.showChart ? " wide" : ""}"><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p>${c.showChart ? `<figure class="graph">${bodygraph()}</figure>` : ""}</section>`).join("")
}</div></details>`;

const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Life Questions Prototype</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
<style>
:root{--bg:#fafaf7;--ink:#1a1410;--terra:#c05a3c;--gold:#c8a24a;--indigo:#3a4f99;--muted:#5f574f;--soft:#8a8178;--panel:#f2eee6;--line:#e3dccf}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#16120e;--ink:#f1ebe2;--terra:#e08a6c;--gold:#d8b860;--muted:#b9afa3;--soft:#8f867c;--panel:#201a15;--line:#352c24}}
:root[data-theme="dark"]{--bg:#16120e;--ink:#f1ebe2;--terra:#e08a6c;--gold:#d8b860;--muted:#b9afa3;--soft:#8f867c;--panel:#201a15;--line:#352c24}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);margin:0;font-family:"Fraunces",Georgia,serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:1180px;margin:0 auto;padding:0 16px 120px}
.cover{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;border-bottom:1px solid var(--gold)}
.cover h1{font-family:"Playfair Display",serif;font-weight:700;font-size:clamp(2.4rem,7vw,4.4rem);letter-spacing:-.02em;margin:.2em 0}
.cover p{color:var(--soft);font-family:"DM Sans",sans-serif;letter-spacing:.18em;text-transform:uppercase;font-size:.78rem}
.part{min-height:46vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;margin-top:48px}
.part-num{font-family:"DM Sans",sans-serif;color:var(--gold);letter-spacing:.3em;text-transform:uppercase;font-size:.8rem;margin:0}
.part h1{font-family:"Playfair Display",serif;font-style:italic;font-weight:500;font-size:clamp(2.2rem,6vw,3.8rem);margin:.15em 0 0}
.chapter{display:grid;grid-template-columns:1fr;gap:28px;padding:56px 0;border-top:1px solid var(--line)}
.num{font-family:"Playfair Display",serif;color:var(--terra);font-size:1rem;letter-spacing:.25em;margin:0 0 .4em}
h2{font-family:"Playfair Display",serif;font-weight:700;font-size:clamp(1.9rem,4.4vw,2.9rem);line-height:1.1;letter-spacing:-.015em;margin:0 0 .8em}
.mirror{font-family:"Playfair Display",serif;font-style:italic;font-weight:500;font-size:clamp(1.4rem,3vw,1.85rem);line-height:1.35;margin:0 0 .9em;padding-left:18px;border-left:3px solid var(--gold)}
.say{font-size:clamp(1.12rem,2.2vw,1.3rem);line-height:1.6;margin:0 0 .9em}
.solo .voice{max-width:720px;margin:0 auto}
.solo .say{font-size:1.15rem}
.prompt{background:var(--panel);border-radius:6px;padding:18px 20px;margin-top:1.6em}
.prompt .label,.chart summary,.chart .label{font-family:"DM Sans",sans-serif;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin:0 0 .5em}
.prompt p{margin:0;font-style:italic;font-size:1.05rem;line-height:1.55}
.chart{font-family:"DM Sans",sans-serif;font-size:15.5px;line-height:1.65;color:var(--muted)}
.chart summary{cursor:pointer;list-style:none;padding:10px 0;border-top:1px dashed var(--gold)}
.chart summary::-webkit-details-marker{display:none}
.chart summary::after{content:" +";color:var(--gold)}
.chart[open] summary::after{content:" –"}
.chart p{margin:0 0 1em}
.graph{margin:4px 0 22px;background:#fafaf7;border:1px solid var(--line);border-radius:8px;padding:14px}
.graph svg{display:block;width:100%;max-width:260px;height:auto;margin:0 auto}
figcaption{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:10px}
.chip{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;color:#3d362f;background:#fff;border:1px solid #e3dccf;border-radius:999px;padding:3px 9px}
.chip i{width:8px;height:8px;border-radius:50%;background:#111}
.chip.unconscious i{background:#c0392b}
.chip.both i{background:linear-gradient(90deg,#111 50%,#c0392b 50%)}
.primer{margin:40px auto 0;max-width:1180px}
.primer>summary{cursor:pointer;list-style:none;text-align:center;font-family:"Playfair Display",serif;font-style:italic;font-size:clamp(1.3rem,3vw,1.7rem);padding:22px 16px;border:1px solid var(--gold);border-radius:999px;max-width:560px;margin:0 auto}
.primer>summary::-webkit-details-marker{display:none}
.primer>summary small{display:block;font-family:"DM Sans",sans-serif;font-style:normal;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin-top:6px}
.cards{display:grid;grid-template-columns:1fr;gap:18px;margin-top:32px}
.card{background:var(--panel);border-radius:10px;padding:24px 26px;font-family:"DM Sans",sans-serif;font-size:15.5px;line-height:1.65;color:var(--muted)}
.card h3{font-family:"Playfair Display",serif;font-weight:700;font-size:1.35rem;color:var(--ink);margin:0 0 .5em;line-height:1.2}
.card p{margin:0}
.card .graph{margin:16px 0 0}
@media (min-width:760px){.cards{grid-template-columns:1fr 1fr}.card.wide{grid-row:span 2}}
@media (min-width:960px){
  .chapter{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:64px;align-items:start;min-height:80vh;padding:80px 0}
  .voice{position:sticky;top:40px}
  .chart{background:var(--panel);border-radius:10px;padding:28px 30px}
  .chart summary{pointer-events:none;border-top:none;padding-top:0}
  .chart summary::after{content:""}
  .solo{grid-template-columns:1fr;min-height:auto}
}
</style></head><body><div class="wrap">
<section class="cover"><p>Mythograph</p><h1>My Human Design Journey</h1><p>Life Questions prototype · 4/1 Emotional Manifestor</p></section>
${primer}
${html}
</div>
<script>
(function(){try{var wide=window.matchMedia("(min-width:960px)");var set=function(){document.querySelectorAll("details.chart").forEach(function(d){if(wide.matches)d.open=true;});};set();wide.addEventListener("change",set);}catch(e){}})();
</script>
</body></html>`;
writeFileSync(join(outDir, "life-questions.html"), page);
console.log(`wrote ${outDir}/life-questions.{txt,html}`);
