// Cosmic Core — channels, gate→center lookup, and emotional wave types.
//
// A framework-free copy of the bodygraph wiring the narrative needs to ground
// each gate in the body: which center a gate sits in, which channel it belongs
// to, and (for Solar Plexus channels) which kind of emotional wave it carries.
// Kept here, rather than imported from chart-engine, so cosmic-core stays a
// pure package. The two tables must agree; chart-engine/data.ts is the
// derivation source of truth.

import type { CenterName } from "./centers.js";

export type EmotionalWave = "tribal" | "individual" | "abstract";

export interface ChannelSpec {
  gates: [number, number];
  centers: [CenterName, CenterName];
  name: string;
  /** Only set for channels that run through the Solar Plexus. */
  wave?: EmotionalWave;
}

export const CHANNEL_SPECS: ChannelSpec[] = [
  { gates: [63, 4],  centers: ["Head", "Ajna"], name: "Logic" },
  { gates: [61, 24], centers: ["Head", "Ajna"], name: "Awareness" },
  { gates: [64, 47], centers: ["Head", "Ajna"], name: "Abstraction" },
  { gates: [17, 62], centers: ["Ajna", "Throat"], name: "Acceptance" },
  { gates: [11, 56], centers: ["Ajna", "Throat"], name: "Curiosity" },
  { gates: [43, 23], centers: ["Ajna", "Throat"], name: "Structuring" },
  { gates: [31, 7],  centers: ["Throat", "G"], name: "the Alpha" },
  { gates: [8, 1],   centers: ["Throat", "G"], name: "Inspiration" },
  { gates: [33, 13], centers: ["Throat", "G"], name: "the Prodigal" },
  { gates: [20, 10], centers: ["Throat", "G"], name: "Awakening" },
  { gates: [20, 34], centers: ["Throat", "Sacral"], name: "Charisma" },
  { gates: [20, 57], centers: ["Throat", "Spleen"], name: "the Brainwave" },
  { gates: [45, 21], centers: ["Throat", "Ego"], name: "Money" },
  { gates: [12, 22], centers: ["Throat", "SolarPlexus"], name: "Openness", wave: "individual" },
  { gates: [35, 36], centers: ["Throat", "SolarPlexus"], name: "Transitoriness", wave: "abstract" },
  { gates: [16, 48], centers: ["Throat", "Spleen"], name: "the Wavelength" },
  { gates: [2, 14],  centers: ["G", "Sacral"], name: "the Beat" },
  { gates: [15, 5],  centers: ["G", "Sacral"], name: "Rhythm" },
  { gates: [46, 29], centers: ["G", "Sacral"], name: "Discovery" },
  { gates: [25, 51], centers: ["G", "Ego"], name: "Initiation" },
  { gates: [10, 34], centers: ["G", "Sacral"], name: "Exploration" },
  { gates: [57, 10], centers: ["Spleen", "G"], name: "Perfected Form" },
  { gates: [3, 60],  centers: ["Sacral", "Root"], name: "Mutation" },
  { gates: [9, 52],  centers: ["Sacral", "Root"], name: "Concentration" },
  { gates: [42, 53], centers: ["Sacral", "Root"], name: "Maturation" },
  { gates: [59, 6],  centers: ["Sacral", "SolarPlexus"], name: "Intimacy", wave: "tribal" },
  { gates: [27, 50], centers: ["Sacral", "Spleen"], name: "Preservation" },
  { gates: [34, 57], centers: ["Sacral", "Spleen"], name: "Power" },
  { gates: [37, 40], centers: ["SolarPlexus", "Ego"], name: "Community", wave: "tribal" },
  { gates: [30, 41], centers: ["SolarPlexus", "Root"], name: "Recognition", wave: "abstract" },
  { gates: [49, 19], centers: ["SolarPlexus", "Root"], name: "Synthesis", wave: "tribal" },
  { gates: [55, 39], centers: ["SolarPlexus", "Root"], name: "Emoting", wave: "individual" },
  { gates: [26, 44], centers: ["Ego", "Spleen"], name: "Surrender" },
  { gates: [28, 38], centers: ["Spleen", "Root"], name: "Struggle" },
  { gates: [32, 54], centers: ["Spleen", "Root"], name: "Transformation" },
  { gates: [18, 58], centers: ["Spleen", "Root"], name: "Judgment" },
];

export const CENTER_GATE_LIST: Record<CenterName, number[]> = {
  Head:        [63, 64, 61],
  Ajna:        [4, 47, 17, 11, 43, 24],
  Throat:      [62, 23, 56, 31, 20, 8, 33, 45, 12, 35, 16],
  G:           [7, 1, 13, 10, 2, 15, 46, 25],
  Ego:         [21, 51, 26, 40],
  Sacral:      [14, 5, 29, 3, 9, 42, 59, 27, 34],
  SolarPlexus: [22, 37, 30, 49, 55, 36, 6],
  Spleen:      [48, 57, 44, 50, 28, 32, 18],
  Root:        [60, 52, 53, 19, 39, 41, 38, 54, 58],
};

export const GATE_TO_CENTER: Record<number, CenterName> = {};
for (const [center, gates] of Object.entries(CENTER_GATE_LIST) as [CenterName, number[]][]) {
  for (const g of gates) GATE_TO_CENTER[g] = center;
}

/** Every channel a gate belongs to (most gates have one; 10, 20, 34, 57 have more). */
export function channelsForGate(gate: number): ChannelSpec[] {
  return CHANNEL_SPECS.filter(c => c.gates.includes(gate));
}

/** The other gate of a channel. */
export function partnerGate(channel: ChannelSpec, gate: number): number {
  return channel.gates[0] === gate ? channel.gates[1] : channel.gates[0];
}

export function channelLabel(c: ChannelSpec): string {
  const [a, b] = [...c.gates].sort((x, y) => x - y);
  return `Channel of ${c.name} (${a}-${b})`;
}
