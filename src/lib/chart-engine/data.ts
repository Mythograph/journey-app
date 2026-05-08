import type { CenterName } from "./types.js";

// ── I-Ching Wheel ────────────────────────────────────────────────────────────
// 64 gates in order starting from 0° Aries (ecliptic longitude 0).
// Each gate spans 5.625° (= 360/64). Gate at index i starts at i * 5.625°.
export const GATE_SEQUENCE: readonly number[] = [
  25, 17, 21, 51, 42,  3, 27, 24,  2, 23,  8, 20, 16, 35, 45, 12,
  15, 52, 39, 53, 62, 56, 31, 33,  7,  4, 29, 59, 40, 64, 47,  6,
  46, 18, 48, 57, 32, 50, 28, 44,  1, 43, 14, 34,  9,  5, 26, 11,
  10, 58, 38, 54, 61, 60, 41, 19, 13, 49, 30, 55, 37, 63, 22, 36,
];

export const GATE_SIZE = 360 / 64; // 5.625°
export const LINE_SIZE = GATE_SIZE / 6; // 0.9375°

// ── Channel table ─────────────────────────────────────────────────────────────
// 34 unique channels; each entry is [gateA, gateB, centerA, centerB, name].
// The Integration channels (10-20, 20-34, 34-57, 10-57) are included.
export const CHANNELS: readonly [number, number, CenterName, CenterName, string][] = [
  // Head ↔ Ajna
  [63,  4, "Head", "Ajna",        "Logic"],
  [61, 24, "Head", "Ajna",        "Awareness"],
  [64, 47, "Head", "Ajna",        "Abstraction"],
  // Ajna ↔ Throat
  [17, 62, "Ajna", "Throat",      "Acceptance"],
  [11, 56, "Ajna", "Throat",      "Curiosity"],
  [43, 23, "Ajna", "Throat",      "Structuring"],
  // Throat ↔ G
  [31,  7, "Throat", "G",         "Alpha"],
  [ 8,  1, "Throat", "G",         "Inspiration"],
  [33, 13, "Throat", "G",         "Prodigal"],
  [20, 10, "Throat", "G",         "Awakening"],        // Integration
  // Throat ↔ Sacral
  [20, 34, "Throat", "Sacral",    "Charisma"],          // Integration
  // Throat ↔ Ego
  [45, 21, "Throat", "Ego",       "Money Line"],
  // Throat ↔ Solar Plexus
  [12, 22, "Throat", "SolarPlexus", "Openness"],
  [35, 36, "Throat", "SolarPlexus", "Transitoriness"],
  // Throat ↔ Spleen
  [16, 48, "Throat", "Spleen",    "Wavelength"],
  // G ↔ Sacral
  [ 2, 14, "G", "Sacral",         "Beat"],
  [15,  5, "G", "Sacral",         "Rhythm"],
  [46, 29, "G", "Sacral",         "Discovery"],
  // G ↔ Ego
  [25, 51, "G", "Ego",            "Initiation"],
  // G ↔ Spleen (Integration)
  [57, 10, "Spleen", "G",         "Perfected Form"],   // Integration
  // Sacral ↔ Root
  [ 3, 60, "Sacral", "Root",      "Mutation"],
  [ 9, 52, "Sacral", "Root",      "Concentration"],
  [42, 53, "Sacral", "Root",      "Maturation"],
  // Sacral ↔ Solar Plexus
  [59,  6, "Sacral", "SolarPlexus", "Mating"],
  // Sacral ↔ Spleen
  [27, 50, "Sacral", "Spleen",    "Preservation"],
  // Sacral ↔ Spleen (Integration)
  [34, 57, "Sacral", "Spleen",    "Power"],             // Integration
  // Solar Plexus ↔ Ego
  [37, 40, "SolarPlexus", "Ego",  "Community"],
  // Solar Plexus ↔ Root
  [30, 41, "SolarPlexus", "Root", "Recognition"],
  [49, 19, "SolarPlexus", "Root", "Synthesis"],
  [55, 39, "SolarPlexus", "Root", "Emoting"],
  // Ego ↔ Spleen
  [26, 44, "Ego", "Spleen",       "Surrender"],
  // Spleen ↔ Root
  [28, 38, "Spleen", "Root",      "Struggle"],
  [32, 54, "Spleen", "Root",      "Transformation"],
  [18, 58, "Spleen", "Root",      "Judgment"],
];

// ── Center → gates ────────────────────────────────────────────────────────────
export const CENTER_GATES: Record<CenterName, readonly number[]> = {
  Head:        [63, 64, 61],
  Ajna:        [ 4, 47, 17, 11, 43, 24],
  Throat:      [62, 23, 56, 31, 20,  8, 33, 45, 12, 35, 16],
  G:           [ 7,  1, 13, 10,  2, 15, 46, 25],
  Ego:         [21, 51, 26, 40],
  Sacral:      [14,  5, 29,  3,  9, 42, 59, 27, 34],
  SolarPlexus: [22, 37, 30, 49, 55, 36,  6],
  Spleen:      [48, 57, 44, 50, 28, 32, 18],
  Root:        [60, 52, 53, 19, 39, 41, 38, 54, 58],
};

// Reverse lookup: gate → center
export const GATE_CENTER: Record<number, CenterName> = {};
for (const [center, gates] of Object.entries(CENTER_GATES) as [CenterName, readonly number[]][]) {
  for (const g of gates) GATE_CENTER[g] = center;
}

// ── Motor centers ─────────────────────────────────────────────────────────────
export const MOTOR_CENTERS = new Set<CenterName>(["Sacral", "SolarPlexus", "Root", "Ego"]);

// ── 192 Incarnation Crosses ───────────────────────────────────────────────────
// Key: `${personalitySunGate}/${"RA"|"JUX"|"LA"}`
// RA  = personality line 1-3
// JUX = personality line 4 AND design line 1
// LA  = personality line 4 (design line ≠1), or personality line 5-6
export const CROSS_NAMES: Record<string, string> = {
  "1/RA": "Right Angle Cross of the Sphinx 1",
  "1/JUX": "Juxtaposition Cross of the Self",
  "1/LA": "Left Angle Cross of the Clarion 2",

  "2/RA": "Right Angle Cross of the Sphinx 2",
  "2/JUX": "Juxtaposition Cross of the Driver",
  "2/LA": "Left Angle Cross of the Clarion 1",

  "3/RA": "Right Angle Cross of the Vessel of Love 3",
  "3/JUX": "Juxtaposition Cross of Mutation",
  "3/LA": "Left Angle Cross of Mutation 2",

  "4/RA": "Right Angle Cross of the Vessel of Love 4",
  "4/JUX": "Juxtaposition Cross of Formulization",
  "4/LA": "Left Angle Cross of Mutation 1",

  "5/RA": "Right Angle Cross of the Vessel of Love 1",
  "5/JUX": "Juxtaposition Cross of Habits",
  "5/LA": "Left Angle Cross of the Vessel of Love 2",

  "6/RA": "Right Angle Cross of the Vessel of Love 2",
  "6/JUX": "Juxtaposition Cross of Friction",
  "6/LA": "Left Angle Cross of the Vessel of Love 1",

  "7/RA": "Right Angle Cross of the Sphinx 3",
  "7/JUX": "Juxtaposition Cross of Interaction",
  "7/LA": "Left Angle Cross of the Clarion 4",

  "8/RA": "Right Angle Cross of Eden 1",
  "8/JUX": "Juxtaposition Cross of Contribution",
  "8/LA": "Left Angle Cross of Informing 2",

  "9/RA": "Right Angle Cross of the Vessel of Love 1",
  "9/JUX": "Juxtaposition Cross of Focus",
  "9/LA": "Left Angle Cross of Demands 2",

  "10/RA": "Right Angle Cross of the Sphinx 4",
  "10/JUX": "Juxtaposition Cross of Behavior",
  "10/LA": "Left Angle Cross of the Clarion 3",

  "11/RA": "Right Angle Cross of Eden 2",
  "11/JUX": "Juxtaposition Cross of Ideas",
  "11/LA": "Left Angle Cross of Informing 1",

  "12/RA": "Right Angle Cross of Planning 1",
  "12/JUX": "Juxtaposition Cross of Caution",
  "12/LA": "Left Angle Cross of the Refinement 2",

  "13/RA": "Right Angle Cross of Eden 3",
  "13/JUX": "Juxtaposition Cross of the Listener",
  "13/LA": "Left Angle Cross of Informing 4",

  "14/RA": "Right Angle Cross of Eden 4",
  "14/JUX": "Juxtaposition Cross of Power",
  "14/LA": "Left Angle Cross of Informing 3",

  "15/RA": "Right Angle Cross of the Vessel of Love 2",
  "15/JUX": "Juxtaposition Cross of Extremes",
  "15/LA": "Left Angle Cross of the Vessel of Love 1",

  "16/RA": "Right Angle Cross of Planning 2",
  "16/JUX": "Juxtaposition Cross of Experimentation",
  "16/LA": "Left Angle Cross of the Refinement 1",

  "17/RA": "Right Angle Cross of the Sleeping Phoenix 1",
  "17/JUX": "Juxtaposition Cross of Opinions",
  "17/LA": "Left Angle Cross of the Alpha 2",

  "18/RA": "Right Angle Cross of Service 1",
  "18/JUX": "Juxtaposition Cross of Correction",
  "18/LA": "Left Angle Cross of Defiance 2",

  "19/RA": "Right Angle Cross of the Four Ways 1",
  "19/JUX": "Juxtaposition Cross of Wanting",
  "19/LA": "Left Angle Cross of the Four Ways 2",

  "20/RA": "Right Angle Cross of the Sleeping Phoenix 2",
  "20/JUX": "Juxtaposition Cross of the Now",
  "20/LA": "Left Angle Cross of the Alpha 1",

  "21/RA": "Right Angle Cross of the Sleeping Phoenix 3",
  "21/JUX": "Juxtaposition Cross of Control",
  "21/LA": "Left Angle Cross of Wishes 2",

  "22/RA": "Right Angle Cross of Planning 3",
  "22/JUX": "Juxtaposition Cross of Grace",
  "22/LA": "Left Angle Cross of the Refinement 4",

  "23/RA": "Right Angle Cross of the Sleeping Phoenix 4",
  "23/JUX": "Juxtaposition Cross of Assimilation",
  "23/LA": "Left Angle Cross of Wishes 1",

  "24/RA": "Right Angle Cross of the Sleeping Phoenix 5",
  "24/JUX": "Juxtaposition Cross of Rationalization",
  "24/LA": "Left Angle Cross of the Alpha 3",

  "25/RA": "Right Angle Cross of the Vessel of Love 3",
  "25/JUX": "Juxtaposition Cross of Innocence",
  "25/LA": "Left Angle Cross of the Vessel of Love 4",

  "26/RA": "Right Angle Cross of the Sleeping Phoenix 6",
  "26/JUX": "Juxtaposition Cross of the Trickster",
  "26/LA": "Left Angle Cross of the Alpha 4",

  "27/RA": "Right Angle Cross of the Unexpected 1",
  "27/JUX": "Juxtaposition Cross of Caring",
  "27/LA": "Left Angle Cross of the Unexpected 2",

  "28/RA": "Right Angle Cross of the Unexpected 2",
  "28/JUX": "Juxtaposition Cross of the Game Player",
  "28/LA": "Left Angle Cross of the Unexpected 1",

  "29/RA": "Right Angle Cross of the Unexpected 3",
  "29/JUX": "Juxtaposition Cross of Commitment",
  "29/LA": "Left Angle Cross of Uncertainty 2",

  "30/RA": "Right Angle Cross of the Unexpected 4",
  "30/JUX": "Juxtaposition Cross of Fates",
  "30/LA": "Left Angle Cross of Uncertainty 1",

  "31/RA": "Right Angle Cross of the Sphinx 5",
  "31/JUX": "Juxtaposition Cross of Influence",
  "31/LA": "Left Angle Cross of the Clarion 6",

  "32/RA": "Right Angle Cross of Service 2",
  "32/JUX": "Juxtaposition Cross of Conservation",
  "32/LA": "Left Angle Cross of Defiance 1",

  "33/RA": "Right Angle Cross of Eden 5",
  "33/JUX": "Juxtaposition Cross of Privacy",
  "33/LA": "Left Angle Cross of Informing 6",

  "34/RA": "Right Angle Cross of Service 3",
  "34/JUX": "Juxtaposition Cross of Power (34)",
  "34/LA": "Left Angle Cross of Defiance 3",

  "35/RA": "Right Angle Cross of Planning 4",
  "35/JUX": "Juxtaposition Cross of Change",
  "35/LA": "Left Angle Cross of the Refinement 3",

  "36/RA": "Right Angle Cross of Eden 1",
  "36/JUX": "Juxtaposition Cross of Crisis",
  "36/LA": "Left Angle Cross of the Refinement 6",

  "37/RA": "Right Angle Cross of Planning 6",
  "37/JUX": "Juxtaposition Cross of Bargains",
  "37/LA": "Left Angle Cross of the Refinement 5",

  "38/RA": "Right Angle Cross of Service 4",
  "38/JUX": "Juxtaposition Cross of Opposition",
  "38/LA": "Left Angle Cross of Defiance 4",

  "39/RA": "Right Angle Cross of the Four Ways 2",
  "39/JUX": "Juxtaposition Cross of Provocation",
  "39/LA": "Left Angle Cross of the Four Ways 1",

  "40/RA": "Right Angle Cross of Service 5",
  "40/JUX": "Juxtaposition Cross of Aloneness",
  "40/LA": "Left Angle Cross of Defiance 5",

  "41/RA": "Right Angle Cross of the Four Ways 3",
  "41/JUX": "Juxtaposition Cross of Contraction",
  "41/LA": "Left Angle Cross of the Four Ways 4",

  "42/RA": "Right Angle Cross of the Unexpected 5",
  "42/JUX": "Juxtaposition Cross of Completion",
  "42/LA": "Left Angle Cross of the Unexpected 4",

  "43/RA": "Right Angle Cross of the Sleeping Phoenix 7",
  "43/JUX": "Juxtaposition Cross of Insight",
  "43/LA": "Left Angle Cross of Wishes 3",

  "44/RA": "Right Angle Cross of Service 6",
  "44/JUX": "Juxtaposition Cross of Alertness",
  "44/LA": "Left Angle Cross of Defiance 6",

  "45/RA": "Right Angle Cross of the Sleeping Phoenix 8",
  "45/JUX": "Juxtaposition Cross of Gathering",
  "45/LA": "Left Angle Cross of Wishes 4",

  "46/RA": "Right Angle Cross of the Unexpected 6",
  "46/JUX": "Juxtaposition Cross of the Body",
  "46/LA": "Left Angle Cross of the Unexpected 5",

  "47/RA": "Right Angle Cross of the Sleeping Phoenix 9",
  "47/JUX": "Juxtaposition Cross of Realization",
  "47/LA": "Left Angle Cross of Wishes 5",

  "48/RA": "Right Angle Cross of Planning 7",
  "48/JUX": "Juxtaposition Cross of Depth",
  "48/LA": "Left Angle Cross of the Refinement 7",

  "49/RA": "Right Angle Cross of the Four Ways 4",
  "49/JUX": "Juxtaposition Cross of Principles",
  "49/LA": "Left Angle Cross of the Four Ways 3",

  "50/RA": "Right Angle Cross of the Unexpected 7",
  "50/JUX": "Juxtaposition Cross of Values",
  "50/LA": "Left Angle Cross of the Unexpected 6",

  "51/RA": "Right Angle Cross of the Unexpected 8",
  "51/JUX": "Juxtaposition Cross of Shock",
  "51/LA": "Left Angle Cross of the Unexpected 7",

  "52/RA": "Right Angle Cross of the Unexpected 9",
  "52/JUX": "Juxtaposition Cross of Stillness",
  "52/LA": "Left Angle Cross of Demands 1",

  "53/RA": "Right Angle Cross of the Four Ways 5",
  "53/JUX": "Juxtaposition Cross of Beginnings",
  "53/LA": "Left Angle Cross of the Four Ways 6",

  "54/RA": "Right Angle Cross of Service 7",
  "54/JUX": "Juxtaposition Cross of Ambition",
  "54/LA": "Left Angle Cross of Defiance 7",

  "55/RA": "Right Angle Cross of the Four Ways 6",
  "55/JUX": "Juxtaposition Cross of Moods",
  "55/LA": "Left Angle Cross of the Four Ways 5",

  "56/RA": "Right Angle Cross of Eden 6",
  "56/JUX": "Juxtaposition Cross of Stimulation",
  "56/LA": "Left Angle Cross of Informing 5",

  "57/RA": "Right Angle Cross of the Sleeping Phoenix 10",
  "57/JUX": "Juxtaposition Cross of Intuition",
  "57/LA": "Left Angle Cross of Wishes 6",

  "58/RA": "Right Angle Cross of Service 8",
  "58/JUX": "Juxtaposition Cross of Vitality",
  "58/LA": "Left Angle Cross of Defiance 8",

  "59/RA": "Right Angle Cross of the Unexpected 10",
  "59/JUX": "Juxtaposition Cross of Strategy",
  "59/LA": "Left Angle Cross of Uncertainty 3",

  "60/RA": "Right Angle Cross of the Unexpected 11",
  "60/JUX": "Juxtaposition Cross of Limitation",
  "60/LA": "Left Angle Cross of Uncertainty 4",

  "61/RA": "Right Angle Cross of the Sleeping Phoenix 11",
  "61/JUX": "Juxtaposition Cross of Mystery",
  "61/LA": "Left Angle Cross of Wishes 7",

  "62/RA": "Right Angle Cross of the Sleeping Phoenix 12",
  "62/JUX": "Juxtaposition Cross of Detail",
  "62/LA": "Left Angle Cross of Wishes 8",

  "63/RA": "Right Angle Cross of the Sleeping Phoenix 13",
  "63/JUX": "Juxtaposition Cross of Doubts",
  "63/LA": "Left Angle Cross of the Alpha 5",

  "64/RA": "Right Angle Cross of the Sleeping Phoenix 14",
  "64/JUX": "Juxtaposition Cross of Confusion",
  "64/LA": "Left Angle Cross of the Alpha 6",
};
