// The Life Questions reading as a complete HTML document.
//
// One renderer for both the live reading page (/journey/[token]) and the
// preview script, so the two never drift apart. It parses the stored text
// (layer markers from cosmic-core/life-questions.ts) into chapters and lays
// them out as spreads: the reader's first-person voice on the left, the
// chart reader's notes, bodygraph and Gene Keys maps on the right, a sticky
// chapter strip, part pages with journey threads, the four-week tracker and
// the signed closing note.

import {
  REFLECTION_MARKER,
  DETAIL_MARKER,
  NOTE_MARKER,
  WHATIS_MARKER,
  LIFE_QUESTIONS_SECTIONS,
  LIFE_QUESTIONS_PARTS,
  lifeQuestionsPartThreads,
  lifeQuestionsFocus,
  buildPrimerCards,
  villageViews,
  experimentPractices,
  toSecondPerson,
  type Activation,
  type HumanDesignProfile,
  type GeneKeysProfile,
} from "../cosmic-core/index.js";
import { renderBodygraph } from "../chart-engine/render.js";
import type { CenterName } from "../chart-engine/types.js";
import type { ClosingNote } from "../story-loom-bridge.js";

export interface LifeQuestionsDocumentInput {
  text: string;
  profile: HumanDesignProfile;
  geneKeys: GeneKeysProfile;
  activations: Activation[];
  bodygraph: {
    definedCenters: Set<CenterName>;
    definedChannels: [number, number][];
    personalityGates: Set<number>;
    designGates: Set<number>;
  };
  /** Name on the cover. */
  name?: string;
  /** Small line under the name, e.g. "4/1 Emotional Manifestor". */
  subtitle?: string;
  closingNote?: ClosingNote;
  tracker?: {
    /** Saved entries to start from. */
    initial?: Record<string, string | boolean>;
    /** POST endpoint that stores entries with the purchase. Omit to keep them in the browser only. */
    saveUrl?: string;
    token?: string;
  };
  /** Birth data for the "Not the right name?" form (live page only). */
  renameForm?: { date: string; time: string; city: string };
  title?: string;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function roman(n: number): string {
  const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, sym] of map) while (n >= v) { out += sym; n -= v; }
  return out;
}

const SEQ_KEYS: Record<string, "activation" | "venus" | "pearl"> = {
  "WHAT IS MY GENIUS": "activation",
  "HOW DO I LOVE AND CONNECT": "venus",
  "WHAT DO I OFFER THE WORLD": "pearl",
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface Chapter {
  key: string; title: string; part: string; term: string; tab: string;
  whatIs: string; voice: string[]; prompt: string; detail: string[]; note: string;
}

function parseChapters(text: string): Chapter[] {
  const chapters: Chapter[] = [];
  for (const b of text.split(/\n\n+/)) {
    const line = b.trim();
    if (!line) continue;
    const meta = LIFE_QUESTIONS_SECTIONS.find(s => line === s.key || line.startsWith(s.key + " "));
    if (meta) {
      chapters.push({ key: meta.key, title: meta.title, part: meta.part, term: meta.term ?? "", tab: meta.tab ?? meta.title, whatIs: "", voice: [], prompt: "", detail: [], note: "" });
      continue;
    }
    const ch = chapters[chapters.length - 1];
    if (!ch) continue; // the primer text precedes the first chapter; the page draws it from data
    if (line.startsWith(NOTE_MARKER)) { ch.note = line.slice(NOTE_MARKER.length); continue; }
    if (line.startsWith(WHATIS_MARKER)) { ch.whatIs = line.slice(WHATIS_MARKER.length).replace(/\n/g, " "); continue; }
    if (line.startsWith(DETAIL_MARKER)) ch.detail.push(line.slice(DETAIL_MARKER.length).replace(/\n/g, " "));
    else if (line.startsWith(REFLECTION_MARKER)) ch.prompt = line.slice(REFLECTION_MARKER.length);
    else ch.voice.push(line.replace(/\n/g, " "));
  }
  return chapters;
}

export function renderLifeQuestionsDocument(input: LifeQuestionsDocumentInput): string {
  const { text, profile, geneKeys, activations } = input;
  const chapters = parseChapters(text);

  const bodygraph = (focus?: { gates: number[]; centers: string[] }) => renderBodygraph({
    definedCenters: input.bodygraph.definedCenters,
    definedChannels: input.bodygraph.definedChannels,
    personalityGates: input.bodygraph.personalityGates,
    designGates: input.bodygraph.designGates,
    personalityActivations: [],
    designActivations: [],
    focus: focus ? { gates: focus.gates, centers: focus.centers as CenterName[] } : undefined,
  });
  const focusMap = lifeQuestionsFocus({ profile, geneKeys, activations });
  const partThreads = lifeQuestionsPartThreads(profile, geneKeys);
  const views = villageViews(geneKeys);

  const sequenceMap = (key: string): string => {
    const v = views.find(x => x.key === key);
    if (!v) return "";
    const you = (s: string) => esc(toSecondPerson(s));
    return `<div class="seq"><p class="seq-title">${esc(v.title)} · ${you(v.subtitle)}</p>${v.steps.map(st => {
      if (st.kind === "pathway") return `<div class="path"><span class="path-name">${esc(st.pathway.name.replace(/^The /, ""))}</span><p>${you(st.pathway.line)}</p></div>`;
      const sp = st.sphere;
      const line = sp.line ? `<span class="gk-line">Line ${sp.line}${sp.lineName ? ` · ${esc(sp.lineName)}` : ""}</span>` : "";
      if (sp.repeat) return `<div class="sphere repeat"><div class="sp-head"><span class="sp-label">${esc(sp.label)}</span><span class="gk">GK ${sp.gate}</span></div><p class="sp-note">${you(sp.note)}.</p></div>`;
      return `<div class="sphere"><div class="sp-head"><span class="sp-label">${esc(sp.label)}</span><span class="gk">GK ${sp.gate}</span></div>` +
        `<p class="sp-note">${you(sp.note)} ${line}</p>` +
        `<div class="spectrum"><span><small>Shadow</small>${esc(sp.shadow)}</span><i>›</i><span class="gift"><small>Gift</small>${esc(sp.gift)}</span><i>›</i><span><small>Siddhi</small>${esc(sp.siddhi)}</span></div>` +
        (sp.lineText ? `<p class="sp-line">${you(sp.lineText)}</p>` : "") + `</div>`;
    }).join("")}</div>`;
  };

  const tracker = (): string => {
    const practices = experimentPractices(profile);
    const grid = (pi: number, mode: "check" | "tally") => `<table class="grid"><thead><tr><th></th>${DAYS.map(d => `<th>${d}</th>`).join("")}</tr></thead><tbody>${
      [1, 2, 3, 4].map(w => `<tr><th>Week ${w}</th>${DAYS.map((_, d) => mode === "check"
        ? `<td><label class="box"><input type="checkbox" data-k="p${pi}w${w}d${d}" aria-label="Week ${w}, day ${d + 1}"><span></span></label></td>`
        : `<td><input class="tally" type="number" min="0" max="20" inputmode="numeric" placeholder="0" data-k="p${pi}w${w}d${d}" aria-label="Week ${w}, day ${d + 1}, times"></td>`
      ).join("")}</tr>`).join("")
    }</tbody></table>`;
    const note = (k: string, rows: number, ph: string) => `<textarea data-k="${k}" rows="${rows}" placeholder="${esc(ph)}"></textarea>`;
    return `<section class="tracker" id="tracker">
  <div class="tracker-bar"><div><p class="label">Your four-week tracker</p><p class="tracker-sub">Tap to check off each day. Everything saves as you go, right here in your reading.</p></div><div><p class="tracker-progress"><strong data-progress>0</strong> of ${practices.filter(p => p.mode === "check").length * 28} days</p><p class="save-state" data-save-state></p></div></div>
  <div class="tracker-page">
    <div class="tp-dates"><label>Started on <input type="date" data-k="start"></label></div>
    <div class="tp-expect"><p class="tp-label">What I expect to notice</p>${note("expect", 2, "Write it today, so you can compare at the end.")}</div>
    ${practices.map((pr, i) => `<div class="tp-practice"><div class="tp-ph"><span class="tp-num">${i + 1}</span><div><p class="tp-title">${esc(pr.title)}</p><p class="tp-detail">${esc(pr.detail)}</p><p class="tp-how">${pr.mode === "check" ? "Check off each day I practice it." : "Note how many times it shows up."}</p></div></div><div class="grid-wrap">${grid(i, pr.mode)}</div></div>`).join("")}
  </div>
  <div class="tracker-page tp-second">
    <p class="tp-label">Weekly check-ins · five minutes at the end of each week</p>
    ${[1, 2, 3, 4].map(w => `<div class="tp-week"><p class="tp-wk">Week ${w}</p>${note(`week${w}`, 2, "What I noticed, and what I'll adjust")}</div>`).join("")}
    <div class="tp-week tp-final"><p class="tp-wk">After four weeks · What changed?</p>${note("final", 3, "Look back at what you expected. What's different now?")}</div>
    <p class="tp-save"><button type="button" class="linkish" onclick="printTracker()">Save a copy as PDF</button></p>
  </div>
</section>`;
  };

  let html = "";
  let curPart = "";
  chapters.forEach((ch, i) => {
    if (ch.part !== curPart) {
      curPart = ch.part;
      const pn = LIFE_QUESTIONS_PARTS.indexOf(ch.part as typeof LIFE_QUESTIONS_PARTS[number]);
      const thread = partThreads[ch.part as typeof LIFE_QUESTIONS_PARTS[number]] ?? "";
      html += `<section class="part"><p class="part-num">Part ${roman(pn + 1)}</p><h1>${esc(ch.part)}</h1>${thread ? `<p class="thread">${esc(thread)}</p>` : ""}</section>`;
    }
    const f = focusMap[ch.key];
    const hasChart = ch.detail.length > 0;
    const voice = ch.voice.map((v, j) => {
      const step = v.match(/^(\d)\. (.*)$/);
      if (step) {
        const [lead, ...rest] = step[2].split(/(?<=\.) /);
        return `<div class="practice"><span class="practice-num">${step[1]}</span><p><strong>${esc(lead)}</strong> ${esc(rest.join(" "))}</p></div>`;
      }
      const label = ch.key === "WHO I AM" ? v.match(/^([A-Z][A-Za-z' ]{2,30}): (.*)$/) : null;
      if (label) return `<p class="glance"><span>${esc(label[1])}</span>${esc(label[2])}</p>`;
      return `<p class="${j === 0 && hasChart ? "mirror" : "say"}">${esc(v)}</p>`;
    }).join("");
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
      const inner = SEQ_KEYS[ch.key] ? sequenceMap(SEQ_KEYS[ch.key]) : `${graph}${ch.detail.map(d => `<p>${esc(d)}</p>`).join("")}`;
      chart = `<details class="chart"><summary>What your chart shows</summary>${inner}</details>`;
    }
    let extra = ch.key === "WHAT IS MY EXPERIMENT" ? tracker() : "";
    if (ch.note && input.closingNote) {
      const n = input.closingNote;
      const body = ch.note.endsWith(" " + n.signature) ? ch.note.slice(0, -n.signature.length - 1) : ch.note;
      extra += `<aside class="note"><p class="label">A note from ${esc(n.signature)}</p><p>${esc(body)}</p><p class="sig">${esc(n.signature)}</p><a class="note-link" href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.linkText)} →</a></aside>`;
    }
    html += `<article class="chapter${hasChart ? "" : " solo"}" id="ch-${i + 1}"><div class="voice"><p class="num">${roman(i + 1)}${ch.term ? `<span class="term"> · ${esc(ch.term)}</span>` : ""}</p><h2>${esc(ch.title)}</h2>${ch.whatIs ? `<div class="whatis"><p class="label">What this is</p><p>${esc(ch.whatIs)}</p></div>` : ""}${voice}${prompt}${extra}</div>${chart}</article>`;
  });

  const tocParts: { part: string; items: string[] }[] = [];
  chapters.forEach((ch, i) => {
    let g = tocParts[tocParts.length - 1];
    if (!g || g.part !== ch.part) { g = { part: ch.part, items: [] }; tocParts.push(g); }
    g.items.push(`<a href="#ch-${i + 1}" data-ch="ch-${i + 1}" title="${esc(ch.title)}"><span class="tn">${roman(i + 1)}</span>${esc(ch.tab)}</a>`);
  });
  const toc = `<nav class="toc" aria-label="Chapters"><div class="toc-track">${tocParts.map(g => `<div class="toc-group"><span class="toc-part">${esc(g.part)}</span><div class="toc-items">${g.items.join("")}</div></div>`).join("")}</div></nav>`;

  const primer = `<details class="primer"><summary>New to Human Design and Gene Keys?<small>Start here · about 5 minutes</small></summary><div class="cards">${
    buildPrimerCards(profile).map(c => `<section class="card${c.showChart ? " wide" : ""}"><h3>${esc(c.title)}</h3><p>${esc(c.body)}</p>${c.showChart ? `<figure class="graph">${bodygraph()}</figure>` : ""}</section>`).join("")
  }</div></details>`;

  const rename = input.renameForm
    ? `<details class="rename"><summary>Not the right name?</summary><form method="POST"><input type="hidden" name="date" value="${esc(input.renameForm.date)}"><input type="hidden" name="time" value="${esc(input.renameForm.time)}"><input type="hidden" name="city" value="${esc(input.renameForm.city)}"><input name="name" type="text" required placeholder="Correct name" value="${esc(input.name ?? "")}"><button type="submit">Save</button></form></details>`
    : "";

  const trackerConfig = JSON.stringify({
    initial: input.tracker?.initial ?? {},
    saveUrl: input.tracker?.saveUrl ?? null,
    token: input.tracker?.token ?? null,
  }).replace(/</g, "\\u003c");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(input.title ?? "My Journey Narrative · Mythograph")}</title>
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
<style>
${READING_CSS}
</style></head><body><div class="wrap">
<header class="topbar"><a class="brand" href="/">Mythograph</a><button type="button" class="pdf-btn" onclick="printReading()">Download PDF</button></header>
${toc}
<section class="cover"><p>Mythograph</p><h1>My Journey Narrative</h1>${input.name ? `<p class="who">${esc(input.name)}</p>` : ""}${input.subtitle ? `<p>${esc(input.subtitle)}</p>` : ""}${rename}</section>
${primer}
${html}
</div>
<script type="application/json" id="tracker-config">${trackerConfig}</script>
<script>
${READING_SCRIPT}
</script>
</body></html>`;
}

const READING_CSS = `:root{--bg:#fafaf7;--ink:#1a1410;--terra:#c05a3c;--gold:#c8a24a;--indigo:#3a4f99;--muted:#5f574f;--soft:#8a8178;--panel:#f2eee6;--line:#e3dccf}
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
.term{font-family:"DM Sans",sans-serif;font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;color:var(--soft)}
.whatis{font-family:"DM Sans",sans-serif;font-size:15px;line-height:1.6;color:var(--muted);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:14px 0;margin:-6px 0 28px}
.whatis .label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin:0 0 .35em}
.whatis p{margin:0}
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
.graph svg{display:block;width:100%;max-width:430px!important;height:auto;margin:0 auto}
figcaption{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:10px}
.chip{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;color:#3d362f;background:#fff;border:1px solid #e3dccf;border-radius:999px;padding:3px 9px}
.chip i{width:8px;height:8px;border-radius:50%;background:#111}
.chip.unconscious i{background:#c0392b}
.seq{display:flex;flex-direction:column;align-items:stretch}
.seq-title{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--soft);margin:0 0 14px}
.sphere{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.sphere.repeat{opacity:.75;padding:10px 16px}
.sp-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.sp-label{font-family:"Playfair Display",serif;font-weight:700;font-size:1.15rem;color:var(--ink)}
.gk{font-size:.72rem;font-weight:500;letter-spacing:.08em;color:#fff;background:var(--terra);border-radius:999px;padding:2px 9px;white-space:nowrap}
.sp-note{margin:.2em 0 .7em !important;font-size:.88rem;color:var(--soft)}
.gk-line{display:inline-block;margin-left:4px;color:var(--terra)}
.spectrum{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:0 0 .6em}
.spectrum span{display:flex;flex-direction:column;font-size:.92rem;color:var(--muted);line-height:1.25}
.spectrum span.gift{color:var(--ink);font-weight:500}
.spectrum small{font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--soft)}
.spectrum i{font-style:normal;color:var(--gold);font-size:1.1rem}
.sp-line{margin:0 !important;font-size:.9rem}
.path{border-left:2px dashed var(--gold);margin:0 0 0 22px;padding:10px 0 10px 18px}
.path-name{font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.path p{margin:.15em 0 0 !important;font-size:.88rem;font-style:italic}
.practice{display:flex;gap:16px;align-items:flex-start;background:var(--panel);border-radius:10px;padding:16px 18px;margin:0 0 12px}
.practice-num{flex:none;width:34px;height:34px;border-radius:50%;background:var(--terra);color:#fff;font-family:"Playfair Display",serif;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:1.05rem}
.practice p{margin:0;font-size:1.08rem;line-height:1.55}
.practice strong{font-weight:500}
.glance{font-size:1.12rem;line-height:1.55;margin:0 0 1em;padding-bottom:1em;border-bottom:1px solid var(--line)}
.glance span{display:block;font-family:"DM Sans",sans-serif;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin-bottom:.3em}
.tracker{margin-top:28px;border:1px solid var(--gold);border-radius:12px;overflow:hidden;background:#fffdf8;color:#1a1410}
.tracker-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 20px;background:var(--panel);flex-wrap:wrap}
.tracker-bar .label{font-family:"DM Sans",sans-serif;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--terra);margin:0}
.tracker-sub{margin:.2em 0 0;font-size:.95rem;color:var(--muted)}
.tracker button{font-family:"DM Sans",sans-serif;font-size:.85rem;font-weight:500;letter-spacing:.04em;color:#fff;background:var(--terra);border:none;border-radius:999px;padding:10px 18px;cursor:pointer}
.tracker button:hover{background:#a84a2f}
.tracker-page{padding:22px 22px 8px;font-family:"DM Sans",sans-serif}
.tp-second{border-top:1px dashed var(--gold)}
.tp-head h3{font-family:"Playfair Display",serif;font-size:1.6rem;margin:.1em 0 .2em}
.tp-brand{font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:#9c8762;margin:0}
.tp-meta{font-size:.85rem;color:#6b625a;margin:0 0 14px}
.fill{display:inline-block;width:120px;border-bottom:1px solid #b39a6b}
.tp-label{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:#c05a3c;margin:0 0 6px}
.lines span{display:block;height:26px;border-bottom:1px solid #d8ccb4}
.tp-expect{margin-bottom:18px}
.tp-practice{margin:0 0 18px;break-inside:avoid}
.tp-ph{display:flex;gap:12px;align-items:flex-start;margin-bottom:8px}
.tp-num{flex:none;width:26px;height:26px;border-radius:50%;background:#c05a3c;color:#fff;font-family:"Playfair Display",serif;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:.9rem}
.tp-title{font-family:"Fraunces",serif;font-weight:500;font-size:1.05rem;margin:0}
.tp-detail{font-size:.85rem;color:#5f574f;margin:.1em 0 0;line-height:1.45}
.tp-how{font-size:.72rem;color:#9c8762;margin:.25em 0 0;font-style:italic}
.grid{width:100%;border-collapse:collapse;font-size:.75rem}
.grid th{font-weight:500;color:#9c8762;padding:3px 0;text-align:center}
.grid tbody th{text-align:left;white-space:nowrap;padding-right:8px;width:62px}
.grid td{text-align:center;padding:2px 0;border-top:1px solid #efe7d6}
.box{display:inline-flex;cursor:pointer;padding:4px}
.box input{position:absolute;opacity:0;width:1px;height:1px}
.box span{display:inline-block;width:24px;height:24px;border:1.5px solid #b39a6b;border-radius:6px;background:#fff;transition:background .15s}
.box input:checked+span{background:#c05a3c;border-color:#c05a3c;box-shadow:inset 0 0 0 3px #fff}
.box input:focus-visible+span{outline:2px solid #3a4f99;outline-offset:2px}
.tally{width:34px;height:30px;text-align:center;font:inherit;font-size:.9rem;border:1.5px solid #d8ccb4;border-radius:6px;background:#fff;color:#1a1410;-moz-appearance:textfield}
.tally::-webkit-inner-spin-button{-webkit-appearance:none}
.grid-wrap{overflow-x:auto}
.tracker textarea{width:100%;box-sizing:border-box;font:inherit;font-size:.95rem;line-height:1.5;border:1px solid #d8ccb4;border-radius:8px;padding:10px 12px;background:#fff;color:#1a1410;resize:vertical}
.tracker textarea:focus,.tally:focus,.tp-dates input:focus{outline:2px solid #3a4f99;outline-offset:1px;border-color:transparent}
.tp-dates{margin:0 0 14px;font-size:.85rem;color:#6b625a}
.tp-dates input{font:inherit;border:1px solid #d8ccb4;border-radius:6px;padding:4px 8px;margin-left:6px;background:#fff;color:#1a1410}
.tp-wk{font-family:"Fraunces",serif;font-weight:500;margin:0 0 6px}
.tracker-progress{margin:0;font-size:.85rem;color:var(--muted)}
.tracker-progress strong{font-family:"Playfair Display",serif;font-size:1.3rem;color:var(--terra)}
.linkish{background:none!important;color:var(--indigo,#3a4f99)!important;text-decoration:underline;text-underline-offset:3px;padding:0!important;font-size:.85rem!important}
.tp-save{margin:6px 0 14px}
.tp-week{margin:0 0 16px;break-inside:avoid}
@media print{
  @page{size:letter;margin:0.55in}
  html.print-tracker body>*:not(#print-root){display:none!important}
  html.print-tracker body{background:#fff}
  #print-root .tracker{border:none;margin:0;background:#fff}
  #print-root .tracker-bar{display:none}
  #print-root .tracker-page{padding:0}
  #print-root .tp-save{display:none}
  #print-root textarea{border:none;border-bottom:1px solid #d8ccb4;border-radius:0;min-height:70px}
  #print-root .tp-second{border-top:none;break-before:page;page-break-before:always}
  .box,.tp-num{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
.note{margin-top:40px;padding:26px 28px;border-top:3px solid var(--gold);background:var(--panel);border-radius:4px 4px 12px 12px}
.note .label{font-family:"DM Sans",sans-serif;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin:0 0 .6em}
.note p{font-size:1.08rem;line-height:1.65;margin:0}
.note .sig{font-family:"Playfair Display",serif;font-style:italic;font-size:1.4rem;margin:.6em 0 .9em}
.note-link{display:inline-block;font-family:"DM Sans",sans-serif;font-size:.88rem;font-weight:500;color:#fff;background:var(--terra);border-radius:999px;padding:10px 18px;text-decoration:none}
.note-link:hover{background:#a84a2f}
.toc{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 94%,transparent);backdrop-filter:blur(6px);border-bottom:1px solid var(--line);margin:0 -16px;padding:0 16px}
.toc-track{display:flex;gap:22px;overflow-x:auto;scrollbar-width:none;padding:10px 0 8px;scroll-behavior:smooth}
.toc-track::-webkit-scrollbar{display:none}
.toc-group{flex:none;display:flex;flex-direction:column;gap:4px}
.toc-part{font-family:"DM Sans",sans-serif;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);white-space:nowrap}
.toc-items{display:flex;gap:6px}
.toc a{flex:none;display:inline-flex;align-items:center;gap:6px;font-family:"DM Sans",sans-serif;font-size:.8rem;color:var(--muted);text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:5px 11px;white-space:nowrap;transition:background .15s,color .15s,border-color .15s}
.toc a:hover{border-color:var(--gold);color:var(--ink)}
.toc a .tn{font-family:"Playfair Display",serif;font-size:.72rem;color:var(--terra)}
.toc a.on{background:var(--ink);border-color:var(--ink);color:var(--bg)}
.toc a.on .tn{color:var(--gold)}
.chapter{scroll-margin-top:72px}
@media print{.toc{display:none}}
.thread{font-family:"Fraunces",serif;font-style:italic;font-size:clamp(1.15rem,2.4vw,1.4rem);line-height:1.6;max-width:640px;margin:1.4em auto 0;color:var(--muted)}
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

.topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 0;font-family:"DM Sans",sans-serif}
.brand{font-size:.68rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--soft);text-decoration:none}
.pdf-btn{font-family:"DM Sans",sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:var(--terra);border:none;border-radius:999px;padding:9px 16px;cursor:pointer}
.pdf-btn:hover{background:#a84a2f}
.cover .who{font-family:"Playfair Display",serif;font-weight:600;font-size:clamp(1.2rem,3vw,1.6rem);letter-spacing:.01em;text-transform:none;color:var(--muted);margin:.2em 0 .6em}
.rename{font-family:"DM Sans",sans-serif;font-size:.78rem;color:var(--soft);margin-top:10px}
.rename summary{cursor:pointer}
.rename form{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px}
.rename input{font:inherit;border:1px solid var(--line);border-radius:6px;padding:7px 10px;background:#fff;color:#1a1410}
.rename button{font:inherit;font-weight:500;color:#fff;background:var(--terra);border:none;border-radius:6px;padding:7px 14px;cursor:pointer}
.save-state{font-size:.75rem;color:var(--soft);margin:0}
@media print{
  html:not(.print-tracker) .topbar,html:not(.print-tracker) .rename,html:not(.print-tracker) .tracker-bar,html:not(.print-tracker) .tp-save,html:not(.print-tracker) .primer>summary small{display:none!important}
  html:not(.print-tracker) body{background:#fff}
  html:not(.print-tracker) .wrap{padding-bottom:0}
  html:not(.print-tracker) .cover{min-height:auto;padding:30vh 0 20vh;break-after:page}
  html:not(.print-tracker) .part{min-height:auto;break-before:page;padding:30vh 0 0}
  html:not(.print-tracker) .chapter{display:block;min-height:0;padding:28px 0 8px;border-top:1px solid #e3dccf}
  html:not(.print-tracker) .chapter h2,html:not(.print-tracker) .chapter .num{break-after:avoid;break-inside:avoid}
  html:not(.print-tracker) .graph,html:not(.print-tracker) .card,html:not(.print-tracker) .glance,html:not(.print-tracker) .whatis,html:not(.print-tracker) .mirror,html:not(.print-tracker) .tp-practice,html:not(.print-tracker) .tp-week,html:not(.print-tracker) .chart p{break-inside:avoid}
  html:not(.print-tracker) .chart summary{border:none;padding:0 0 6px}
  html:not(.print-tracker) .chart summary::after{content:""}
  html:not(.print-tracker) .graph{padding:8px;margin:6px 0 14px}
  html:not(.print-tracker) .primer{break-after:page}
  html:not(.print-tracker) .tracker{break-before:page}
  html:not(.print-tracker) .voice{position:static}
  html:not(.print-tracker) .chart{background:none;padding:0;margin-top:18px}
  html:not(.print-tracker) .graph svg{max-width:250px!important;margin:0 auto}
  html:not(.print-tracker) .sphere,html:not(.print-tracker) .practice,html:not(.print-tracker) .note,html:not(.print-tracker) .prompt{break-inside:avoid}
  .chip i,.gk,.practice-num,.tp-num,.note-link{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
`;

const READING_SCRIPT = `var CFG={};try{CFG=JSON.parse(document.getElementById("tracker-config").textContent||"{}")}catch(e){}
var TRACK_KEY="mythograph-tracker-v1"+(CFG.token?":"+CFG.token.slice(0,12):"");
function localState(){try{return JSON.parse(localStorage.getItem(TRACK_KEY)||"{}")}catch(e){return {}}}
function collect(){var st={};document.querySelectorAll("#tracker [data-k]").forEach(function(el){var v=el.type==="checkbox"?el.checked:el.value;if(v!==false&&v!=="")st[el.dataset.k]=v;});return st;}
var saveTimer=null,saveMsg=null;
function setSaveMsg(t){if(!saveMsg)saveMsg=document.querySelector("#tracker [data-save-state]");if(saveMsg)saveMsg.textContent=t;}
function pushToServer(st){if(!CFG.saveUrl||!CFG.token)return;setSaveMsg("Saving…");fetch(CFG.saveUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:CFG.token,state:st})}).then(function(r){setSaveMsg(r.ok?"Saved":"Saved on this device");}).catch(function(){setSaveMsg("Saved on this device");});}
function saveTracker(){var st=collect();try{localStorage.setItem(TRACK_KEY,JSON.stringify(st))}catch(e){}updateProgress();clearTimeout(saveTimer);saveTimer=setTimeout(function(){pushToServer(st);},700);}
function updateProgress(){var n=document.querySelectorAll('#tracker input[type="checkbox"]:checked').length;var p=document.querySelector("#tracker [data-progress]");if(p)p.textContent=n;}
function initTracker(){var server=CFG.initial||{};var st=Object.keys(server).length?server:localState();document.querySelectorAll("#tracker [data-k]").forEach(function(el){var v=st[el.dataset.k];if(v!==undefined){if(el.type==="checkbox")el.checked=!!v;else el.value=v;}el.addEventListener(el.tagName==="TEXTAREA"||el.type==="number"||el.type==="date"?"input":"change",saveTracker);});updateProgress();if(!Object.keys(server).length&&Object.keys(st).length)pushToServer(st);}
document.addEventListener("DOMContentLoaded",initTracker);
document.addEventListener("DOMContentLoaded",function(){try{var links={};document.querySelectorAll(".toc a[data-ch]").forEach(function(a){links[a.dataset.ch]=a;});var current=null;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var a=links[e.target.id];if(a&&a!==current){if(current)current.classList.remove("on");a.classList.add("on");current=a;var tr=a.closest(".toc-track");if(tr){var l=a.offsetLeft-tr.clientWidth/2+a.clientWidth/2;tr.scrollTo({left:l,behavior:"smooth"});}}}});},{rootMargin:"-40% 0px -55% 0px"});document.querySelectorAll("article.chapter[id]").forEach(function(el){io.observe(el);});}catch(e){}});
function printTracker(){var h=document.documentElement;var src=document.getElementById("tracker");if(!src)return;var root=document.createElement("div");root.id="print-root";var copy=src.cloneNode(true);var a=src.querySelectorAll("[data-k]"),b=copy.querySelectorAll("[data-k]");a.forEach(function(el,i){if(el.type==="checkbox")b[i].checked=el.checked;else b[i].value=el.value;});copy.removeAttribute("id");root.appendChild(copy);document.body.appendChild(root);h.classList.add("print-tracker");var done=function(){h.classList.remove("print-tracker");root.remove();window.removeEventListener("afterprint",done);};window.addEventListener("afterprint",done);window.print();}
function printReading(){var opened=[];document.querySelectorAll("details").forEach(function(d){if(!d.open&&!d.classList.contains("rename")){d.open=true;opened.push(d);}});var done=function(){opened.forEach(function(d){d.open=false;});window.removeEventListener("afterprint",done);};window.addEventListener("afterprint",done);window.print();}
(function(){try{var wide=window.matchMedia("(min-width:960px)");var set=function(){document.querySelectorAll("details.chart").forEach(function(d){if(wide.matches)d.open=true;});};set();wide.addEventListener("change",set);}catch(e){}})();`;
