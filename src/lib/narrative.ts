// Journey Narrative orchestration.
//
// The narrative itself is built deterministically by cosmic-core (the
// Heroine's Journey Soul Map + the Gene Keys Golden Path), then passed
// through the grammar normalizer. An optional LLM polish pass — gated by
// ENABLE_NARRATIVE_POLISH=true — smooths grammatically-correct-but-clunky
// seams without being allowed to change meaning, structure, or facts.
// The result is generated once and stored, so readers always get the
// stored text instantly.

import Anthropic from "@anthropic-ai/sdk";
import type { Chart, CenterName } from "./chart-engine/types.js";
import { CENTER_GATES, GATE_CENTER } from "./chart-engine/data.js";
import {
  buildJourneyNarrative,
  normalizeGrammar,
  EMPTY_GENE_KEYS,
  CENTER_ORDER,
  type HumanDesignProfile,
  type GeneKeysProfile,
  type HdTypeName,
  type CenterState,
  type Authority,
} from "./cosmic-core/index.js";

// ─── Chart → profile adapters ─────────────────────────────────────────────────

function activation(chart: Chart, planet: string, position: "conscious" | "unconscious") {
  const list = position === "conscious" ? chart.personalityActivations : chart.designActivations;
  return list.find(a => a.planet === planet) ?? null;
}

// Defined (in a channel), undefined (open but carrying an activated gate),
// or open (no activated gates). Prominent conscious lights (Sun, Earth) that
// land in a non-defined center drive the "defining gift in open ground" motif.
function computeCenters(chart: Chart): CenterState[] {
  const lights = ["Sun", "Earth"] as const;
  const lightGate: Record<string, number | null> = {};
  for (const l of lights) lightGate[l] = gateOf(chart, l, "conscious");

  return CENTER_ORDER.map((name) => {
    const center = name as unknown as CenterName;
    const isDefined = chart.definedCenters.has(center);
    const hasGate = CENTER_GATES[center].some((g) => chart.definedGates.has(g));
    const status = isDefined ? "defined" : hasGate ? "undefined" : "open";
    const prominent: { planet: string; gate: number }[] = [];
    if (status !== "defined") {
      for (const l of lights) {
        const g = lightGate[l];
        if (g != null && GATE_CENTER[g] === center) prominent.push({ planet: l, gate: g });
      }
    }
    return { name, status, prominent };
  });
}

function gateOf(chart: Chart, planet: string, position: "conscious" | "unconscious"): number | null {
  return activation(chart, planet, position)?.gate ?? null;
}

function lineOf(chart: Chart, planet: string, position: "conscious" | "unconscious"): number | null {
  return activation(chart, planet, position)?.line ?? null;
}

export function humanDesignProfileFromChart(chart: Chart): HumanDesignProfile {
  const [consciousLine, unconsciousLine] = chart.profile.split("/").map(Number);
  return {
    type: chart.type as HdTypeName,
    typePurpose: "", // resolved from TYPE_PROFILES inside the builder
    strategy: chart.strategy,
    authority: chart.authority as Authority,
    centers: computeCenters(chart),
    profileConscious: Number.isFinite(consciousLine) ? consciousLine : null,
    profileUnconscious: Number.isFinite(unconsciousLine) ? unconsciousLine : null,
    sunConscious: gateOf(chart, "Sun", "conscious"),
    sunUnconscious: gateOf(chart, "Sun", "unconscious"),
    earthConscious: gateOf(chart, "Earth", "conscious"),
    earthUnconscious: gateOf(chart, "Earth", "unconscious"),
    moonConscious: gateOf(chart, "Moon", "conscious"),
    moonUnconscious: gateOf(chart, "Moon", "unconscious"),
    northNodeConscious: gateOf(chart, "NorthNode", "conscious"),
    northNodeUnconscious: gateOf(chart, "NorthNode", "unconscious"),
    southNodeConscious: gateOf(chart, "SouthNode", "conscious"),
    southNodeUnconscious: gateOf(chart, "SouthNode", "unconscious"),
    mercuryConscious: gateOf(chart, "Mercury", "conscious"),
    mercuryUnconscious: gateOf(chart, "Mercury", "unconscious"),
    venusConscious: gateOf(chart, "Venus", "conscious"),
    venusUnconscious: gateOf(chart, "Venus", "unconscious"),
    marsConscious: gateOf(chart, "Mars", "conscious"),
    marsUnconscious: gateOf(chart, "Mars", "unconscious"),
    jupiterConscious: gateOf(chart, "Jupiter", "conscious"),
    jupiterUnconscious: gateOf(chart, "Jupiter", "unconscious"),
    saturnConscious: gateOf(chart, "Saturn", "conscious"),
    saturnUnconscious: gateOf(chart, "Saturn", "unconscious"),
    uranusConscious: gateOf(chart, "Uranus", "conscious"),
    uranusUnconscious: gateOf(chart, "Uranus", "unconscious"),
    neptuneConscious: gateOf(chart, "Neptune", "conscious"),
    neptuneUnconscious: gateOf(chart, "Neptune", "unconscious"),
    plutoConscious: gateOf(chart, "Pluto", "conscious"),
    plutoUnconscious: gateOf(chart, "Pluto", "unconscious"),
    chironConscious: gateOf(chart, "Chiron", "conscious"),
    chironUnconscious: gateOf(chart, "Chiron", "unconscious"),
  };
}

// Golden Path sphere derivation. Standard Gene Keys mapping; the anchors
// confirmed against Story Loom: conscious Sun = Life's Work = Brand,
// unconscious Earth = Purpose (Activation and Venus), unconscious Mars =
// Core Wound = Vocation.
export function geneKeysProfileFromChart(chart: Chart): GeneKeysProfile {
  return {
    ...EMPTY_GENE_KEYS,
    lifesWork: gateOf(chart, "Sun", "conscious"),        lifesWorkLine: lineOf(chart, "Sun", "conscious"),
    evolution: gateOf(chart, "Earth", "conscious"),      evolutionLine: lineOf(chart, "Earth", "conscious"),
    radiance: gateOf(chart, "Sun", "unconscious"),       radianceLine: lineOf(chart, "Sun", "unconscious"),
    purpose: gateOf(chart, "Earth", "unconscious"),      purposeLine: lineOf(chart, "Earth", "unconscious"),
    attraction: gateOf(chart, "Moon", "unconscious"),    attractionLine: lineOf(chart, "Moon", "unconscious"),
    iq: gateOf(chart, "Venus", "conscious"),             iqLine: lineOf(chart, "Venus", "conscious"),
    eq: gateOf(chart, "Mars", "conscious"),              eqLine: lineOf(chart, "Mars", "conscious"),
    sq: gateOf(chart, "Venus", "unconscious"),           sqLine: lineOf(chart, "Venus", "unconscious"),
    core: gateOf(chart, "Mars", "unconscious"),          coreLine: lineOf(chart, "Mars", "unconscious"),
    brand: gateOf(chart, "Sun", "conscious"),            brandLine: lineOf(chart, "Sun", "conscious"),
    culture: gateOf(chart, "Jupiter", "unconscious"),    cultureLine: lineOf(chart, "Jupiter", "unconscious"),
    pearl: gateOf(chart, "Jupiter", "conscious"),        pearlLine: lineOf(chart, "Jupiter", "conscious"),
  };
}

// ─── Optional LLM polish pass (layer 3) ───────────────────────────────────────

const POLISH_PROMPT = `You are a copy editor. Below is a personal narrative assembled from templates. Your only job is to repair grammar and smooth awkward seams where template fragments were joined.

Strict rules:
- Fix grammatical errors, article mistakes, and broken sentence joins.
- Where two joined fragments read clunky, you may lightly reword the join — but the meaning, imagery, and vocabulary of each fragment must be preserved.
- Do NOT add, remove, or reorder sentences, paragraphs, or sections.
- Do NOT change any section heading (the ALL-CAPS lines). Reproduce them exactly.
- Do NOT change names, numbers, gate references, Gene Key references, or any factual content.
- Do NOT change the voice (first person stays first person, second person stays second person).
- Plain text only. No markdown.
- Respond with the full corrected document and nothing else — no preamble, no commentary.

DOCUMENT:

`;

async function polishNarrative(text: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return text;

  try {
    const anthropic = new Anthropic({ apiKey });
    const stream = anthropic.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 32000,
      thinking: { type: "adaptive" },
      messages: [{ role: "user", content: POLISH_PROMPT + text }],
    });
    const message = await stream.finalMessage();
    const polished = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("")
      .trim();

    // Safety net: if the polish pass changed the document's shape, keep the
    // deterministic version. Headings and overall length must survive.
    const headingsIn = (text.match(/^[A-Z][A-Z —–-]+$/gm) ?? []).length;
    const headingsOut = (polished.match(/^[A-Z][A-Z —–-]+$/gm) ?? []).length;
    const ratio = polished.length / text.length;
    if (headingsOut !== headingsIn || ratio < 0.8 || ratio > 1.2) {
      console.warn("polishNarrative: output failed shape check, using unpolished text");
      return text;
    }
    return polished;
  } catch (err) {
    console.error("polishNarrative: polish pass failed, using unpolished text", err);
    return text;
  }
}

// ─── Generation ───────────────────────────────────────────────────────────────

export async function generateNarrative(chart: Chart, name: string): Promise<string> {
  const hd = humanDesignProfileFromChart(chart);
  const gk = geneKeysProfileFromChart(chart);

  const draft = buildJourneyNarrative(hd, gk, name);
  const normalized = normalizeGrammar(draft);

  if (process.env.ENABLE_NARRATIVE_POLISH === "true") {
    return polishNarrative(normalized);
  }
  return normalized;
}

// Back-compat: the Netlify background function consumes an async generator.
export async function* streamNarrative(chart: Chart, name: string): AsyncGenerator<string> {
  yield await generateNarrative(chart, name);
}
