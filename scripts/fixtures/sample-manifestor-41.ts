// Fixture: a 4/1 Emotional Manifestor (Juxtaposition Cross of Principles).
// Gate activations only, no birth data or name, for prototyping narrative
// builders without running the chart engine.

import type { Activation, HumanDesignProfile, GeneKeysProfile } from "../../src/lib/cosmic-core/index.js";
import { EMPTY_GENE_KEYS } from "../../src/lib/cosmic-core/index.js";

// [planet, conscious gate, conscious line, unconscious gate, unconscious line]
const ROWS: [string, number, number | null, number, number | null][] = [
  ["Sun",       49, 4,    14, 1],
  ["Earth",      4, 4,     8, 1],
  ["Moon",      19, null,  9, 5],
  ["NorthNode", 39, null, 39, null],
  ["SouthNode", 38, null, 38, null],
  ["Mercury",   41, null, 34, null],
  ["Venus",     25, 4,     5, 5],
  ["Mars",      49, 6,     5, 6],
  ["Jupiter",   51, 2,    21, 1],
  ["Saturn",    30, null, 13, null],
  ["Uranus",    40, null, 40, null],
  ["Neptune",    1, null,  1, null],
  ["Pluto",     64, null, 64, null],
  ["Chiron",    37, null, 55, null],
];

export const activations: Activation[] = ROWS.flatMap(([planet, cg, cl, ug, ul]) => [
  { planet, gate: cg, line: cl, side: "conscious" as const },
  { planet, gate: ug, line: ul, side: "unconscious" as const },
]);

const gate = (planet: string, side: "conscious" | "unconscious") =>
  activations.find(a => a.planet === planet && a.side === side)?.gate ?? null;
const line = (planet: string, side: "conscious" | "unconscious") =>
  activations.find(a => a.planet === planet && a.side === side)?.line ?? null;

export const profile: HumanDesignProfile = {
  type: "Manifestor",
  typePurpose: "",
  strategy: "To Inform",
  authority: "Emotional",
  incarnationCross: "Juxtaposition Cross of Principles",
  profileConscious: 4,
  profileUnconscious: 1,
  sunConscious: gate("Sun", "conscious"),           sunUnconscious: gate("Sun", "unconscious"),
  earthConscious: gate("Earth", "conscious"),       earthUnconscious: gate("Earth", "unconscious"),
  moonConscious: gate("Moon", "conscious"),         moonUnconscious: gate("Moon", "unconscious"),
  northNodeConscious: gate("NorthNode", "conscious"), northNodeUnconscious: gate("NorthNode", "unconscious"),
  southNodeConscious: gate("SouthNode", "conscious"), southNodeUnconscious: gate("SouthNode", "unconscious"),
  mercuryConscious: gate("Mercury", "conscious"),   mercuryUnconscious: gate("Mercury", "unconscious"),
  venusConscious: gate("Venus", "conscious"),       venusUnconscious: gate("Venus", "unconscious"),
  marsConscious: gate("Mars", "conscious"),         marsUnconscious: gate("Mars", "unconscious"),
  jupiterConscious: gate("Jupiter", "conscious"),   jupiterUnconscious: gate("Jupiter", "unconscious"),
  saturnConscious: gate("Saturn", "conscious"),     saturnUnconscious: gate("Saturn", "unconscious"),
  uranusConscious: gate("Uranus", "conscious"),     uranusUnconscious: gate("Uranus", "unconscious"),
  neptuneConscious: gate("Neptune", "conscious"),   neptuneUnconscious: gate("Neptune", "unconscious"),
  plutoConscious: gate("Pluto", "conscious"),       plutoUnconscious: gate("Pluto", "unconscious"),
  chironConscious: gate("Chiron", "conscious"),     chironUnconscious: gate("Chiron", "unconscious"),
};

export const geneKeys: GeneKeysProfile = {
  ...EMPTY_GENE_KEYS,
  lifesWork: gate("Sun", "conscious"),      lifesWorkLine: line("Sun", "conscious"),
  evolution: gate("Earth", "conscious"),    evolutionLine: line("Earth", "conscious"),
  radiance: gate("Sun", "unconscious"),     radianceLine: line("Sun", "unconscious"),
  purpose: gate("Earth", "unconscious"),    purposeLine: line("Earth", "unconscious"),
  attraction: gate("Moon", "unconscious"),  attractionLine: line("Moon", "unconscious"),
  iq: gate("Venus", "conscious"),           iqLine: line("Venus", "conscious"),
  eq: gate("Mars", "conscious"),            eqLine: line("Mars", "conscious"),
  sq: gate("Venus", "unconscious"),         sqLine: line("Venus", "unconscious"),
  core: gate("Mars", "unconscious"),        coreLine: line("Mars", "unconscious"),
  brand: gate("Sun", "conscious"),          brandLine: line("Sun", "conscious"),
  culture: gate("Jupiter", "unconscious"),  cultureLine: line("Jupiter", "unconscious"),
  pearl: gate("Jupiter", "conscious"),      pearlLine: line("Jupiter", "conscious"),
};
