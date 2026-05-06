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
// Key: `${personalitySunGate}.${personalitySunLine}` → cross name
// The cross is determined by the Personality Sun gate + line (profile line 1).
// Each gate has 6 crosses; the full wheel generates 64×3=192 unique crosses
// organised by Right Angle (RA), Juxtaposition (JX), Left Angle (LA).
//
// Format of key: `${sunGate}/${sunLine}` (personality sun gate and line)
export const CROSS_NAMES: Record<string, string> = {
  // Gate 1 — Creativity / Self-Expression
  "1/1": "Right Angle Cross of the Sphinx 1",
  "1/2": "Right Angle Cross of the Sphinx 1",
  "1/3": "Right Angle Cross of the Sphinx 1",
  "1/4": "Juxtaposition Cross of the Self",
  "1/5": "Left Angle Cross of the Clarion 2",
  "1/6": "Left Angle Cross of the Clarion 2",

  // Gate 2 — The Direction of the Self
  "2/1": "Right Angle Cross of the Sphinx 2",
  "2/2": "Right Angle Cross of the Sphinx 2",
  "2/3": "Right Angle Cross of the Sphinx 2",
  "2/4": "Juxtaposition Cross of the Driver",
  "2/5": "Left Angle Cross of the Clarion 1",
  "2/6": "Left Angle Cross of the Clarion 1",

  // Gate 3 — Ordering
  "3/1": "Right Angle Cross of the Vessel of Love 3",
  "3/2": "Right Angle Cross of the Vessel of Love 3",
  "3/3": "Right Angle Cross of the Vessel of Love 3",
  "3/4": "Juxtaposition Cross of Mutation",
  "3/5": "Left Angle Cross of Mutation 2",
  "3/6": "Left Angle Cross of Mutation 2",

  // Gate 4 — Youthful Folly
  "4/1": "Right Angle Cross of the Vessel of Love 4",
  "4/2": "Right Angle Cross of the Vessel of Love 4",
  "4/3": "Right Angle Cross of the Vessel of Love 4",
  "4/4": "Juxtaposition Cross of Formulization",
  "4/5": "Left Angle Cross of Mutation 1",
  "4/6": "Left Angle Cross of Mutation 1",

  // Gate 5 — Fixed Rhythms
  "5/1": "Right Angle Cross of the Vessel of Love 1",
  "5/2": "Right Angle Cross of the Vessel of Love 1",
  "5/3": "Right Angle Cross of the Vessel of Love 1",
  "5/4": "Juxtaposition Cross of Habits",
  "5/5": "Left Angle Cross of the Vessel of Love 2",
  "5/6": "Left Angle Cross of the Vessel of Love 2",

  // Gate 6 — Conflict
  "6/1": "Right Angle Cross of the Vessel of Love 2",
  "6/2": "Right Angle Cross of the Vessel of Love 2",
  "6/3": "Right Angle Cross of the Vessel of Love 2",
  "6/4": "Juxtaposition Cross of Friction",
  "6/5": "Left Angle Cross of the Vessel of Love 1",
  "6/6": "Left Angle Cross of the Vessel of Love 1",

  // Gate 7 — The Army
  "7/1": "Right Angle Cross of the Sphinx 3",
  "7/2": "Right Angle Cross of the Sphinx 3",
  "7/3": "Right Angle Cross of the Sphinx 3",
  "7/4": "Juxtaposition Cross of Interaction",
  "7/5": "Left Angle Cross of the Clarion 4",
  "7/6": "Left Angle Cross of the Clarion 4",

  // Gate 8 — Holding Together
  "8/1": "Right Angle Cross of Eden 1",
  "8/2": "Right Angle Cross of Eden 1",
  "8/3": "Right Angle Cross of Eden 1",
  "8/4": "Juxtaposition Cross of Contribution",
  "8/5": "Left Angle Cross of Informing 2",
  "8/6": "Left Angle Cross of Informing 2",

  // Gate 9 — Focus
  "9/1": "Right Angle Cross of the Vessel of Love 1",
  "9/2": "Right Angle Cross of the Vessel of Love 1",
  "9/3": "Right Angle Cross of the Vessel of Love 1",
  "9/4": "Juxtaposition Cross of Focus",
  "9/5": "Left Angle Cross of Demands 2",
  "9/6": "Left Angle Cross of Demands 2",

  // Gate 10 — Treading
  "10/1": "Right Angle Cross of the Sphinx 4",
  "10/2": "Right Angle Cross of the Sphinx 4",
  "10/3": "Right Angle Cross of the Sphinx 4",
  "10/4": "Juxtaposition Cross of Behavior",
  "10/5": "Left Angle Cross of the Clarion 3",
  "10/6": "Left Angle Cross of the Clarion 3",

  // Gate 11 — Peace
  "11/1": "Right Angle Cross of Eden 2",
  "11/2": "Right Angle Cross of Eden 2",
  "11/3": "Right Angle Cross of Eden 2",
  "11/4": "Juxtaposition Cross of Ideas",
  "11/5": "Left Angle Cross of Informing 1",
  "11/6": "Left Angle Cross of Informing 1",

  // Gate 12 — Standstill
  "12/1": "Right Angle Cross of Planning 1",
  "12/2": "Right Angle Cross of Planning 1",
  "12/3": "Right Angle Cross of Planning 1",
  "12/4": "Juxtaposition Cross of Caution",
  "12/5": "Left Angle Cross of the Refinement 2",
  "12/6": "Left Angle Cross of the Refinement 2",

  // Gate 13 — The Fellowship of Man
  "13/1": "Right Angle Cross of Eden 3",
  "13/2": "Right Angle Cross of Eden 3",
  "13/3": "Right Angle Cross of Eden 3",
  "13/4": "Juxtaposition Cross of the Listener",
  "13/5": "Left Angle Cross of Informing 4",
  "13/6": "Left Angle Cross of Informing 4",

  // Gate 14 — Possession in Great Measure
  "14/1": "Right Angle Cross of Eden 4",
  "14/2": "Right Angle Cross of Eden 4",
  "14/3": "Right Angle Cross of Eden 4",
  "14/4": "Juxtaposition Cross of Power",
  "14/5": "Left Angle Cross of Informing 3",
  "14/6": "Left Angle Cross of Informing 3",

  // Gate 15 — Modesty
  "15/1": "Right Angle Cross of the Vessel of Love 2",
  "15/2": "Right Angle Cross of the Vessel of Love 2",
  "15/3": "Right Angle Cross of the Vessel of Love 2",
  "15/4": "Juxtaposition Cross of Extremes",
  "15/5": "Left Angle Cross of the Vessel of Love 1",
  "15/6": "Left Angle Cross of the Vessel of Love 1",

  // Gate 16 — Enthusiasm
  "16/1": "Right Angle Cross of Planning 2",
  "16/2": "Right Angle Cross of Planning 2",
  "16/3": "Right Angle Cross of Planning 2",
  "16/4": "Juxtaposition Cross of Experimentation",
  "16/5": "Left Angle Cross of the Refinement 1",
  "16/6": "Left Angle Cross of the Refinement 1",

  // Gate 17 — Following
  "17/1": "Right Angle Cross of the Sleeping Phoenix 1",
  "17/2": "Right Angle Cross of the Sleeping Phoenix 1",
  "17/3": "Right Angle Cross of the Sleeping Phoenix 1",
  "17/4": "Juxtaposition Cross of Opinions",
  "17/5": "Left Angle Cross of the Alpha 2",
  "17/6": "Left Angle Cross of the Alpha 2",

  // Gate 18 — Work on What Has Been Spoilt
  "18/1": "Right Angle Cross of Service 1",
  "18/2": "Right Angle Cross of Service 1",
  "18/3": "Right Angle Cross of Service 1",
  "18/4": "Juxtaposition Cross of Correction",
  "18/5": "Left Angle Cross of Defiance 2",
  "18/6": "Left Angle Cross of Defiance 2",

  // Gate 19 — Approach
  "19/1": "Right Angle Cross of the Four Ways 1",
  "19/2": "Right Angle Cross of the Four Ways 1",
  "19/3": "Right Angle Cross of the Four Ways 1",
  "19/4": "Juxtaposition Cross of Wanting",
  "19/5": "Left Angle Cross of the Four Ways 2",
  "19/6": "Left Angle Cross of the Four Ways 2",

  // Gate 20 — Contemplation
  "20/1": "Right Angle Cross of the Sleeping Phoenix 2",
  "20/2": "Right Angle Cross of the Sleeping Phoenix 2",
  "20/3": "Right Angle Cross of the Sleeping Phoenix 2",
  "20/4": "Juxtaposition Cross of the Now",
  "20/5": "Left Angle Cross of the Alpha 1",
  "20/6": "Left Angle Cross of the Alpha 1",

  // Gate 21 — Biting Through
  "21/1": "Right Angle Cross of the Sleeping Phoenix 3",
  "21/2": "Right Angle Cross of the Sleeping Phoenix 3",
  "21/3": "Right Angle Cross of the Sleeping Phoenix 3",
  "21/4": "Juxtaposition Cross of Control",
  "21/5": "Left Angle Cross of Wishes 2",
  "21/6": "Left Angle Cross of Wishes 2",

  // Gate 22 — Grace
  "22/1": "Right Angle Cross of Planning 3",
  "22/2": "Right Angle Cross of Planning 3",
  "22/3": "Right Angle Cross of Planning 3",
  "22/4": "Juxtaposition Cross of Grace",
  "22/5": "Left Angle Cross of the Refinement 4",
  "22/6": "Left Angle Cross of the Refinement 4",

  // Gate 23 — Splitting Apart
  "23/1": "Right Angle Cross of the Sleeping Phoenix 4",
  "23/2": "Right Angle Cross of the Sleeping Phoenix 4",
  "23/3": "Right Angle Cross of the Sleeping Phoenix 4",
  "23/4": "Juxtaposition Cross of Assimilation",
  "23/5": "Left Angle Cross of Wishes 1",
  "23/6": "Left Angle Cross of Wishes 1",

  // Gate 24 — Return
  "24/1": "Right Angle Cross of the Sleeping Phoenix 5",
  "24/2": "Right Angle Cross of the Sleeping Phoenix 5",
  "24/3": "Right Angle Cross of the Sleeping Phoenix 5",
  "24/4": "Juxtaposition Cross of Rationalization",
  "24/5": "Left Angle Cross of the Alpha 3",
  "24/6": "Left Angle Cross of the Alpha 3",

  // Gate 25 — Innocence
  "25/1": "Right Angle Cross of the Vessel of Love 3",
  "25/2": "Right Angle Cross of the Vessel of Love 3",
  "25/3": "Right Angle Cross of the Vessel of Love 3",
  "25/4": "Juxtaposition Cross of Innocence",
  "25/5": "Left Angle Cross of the Vessel of Love 4",
  "25/6": "Left Angle Cross of the Vessel of Love 4",

  // Gate 26 — The Taming Power of the Great
  "26/1": "Right Angle Cross of the Sleeping Phoenix 6",
  "26/2": "Right Angle Cross of the Sleeping Phoenix 6",
  "26/3": "Right Angle Cross of the Sleeping Phoenix 6",
  "26/4": "Juxtaposition Cross of the Trickster",
  "26/5": "Left Angle Cross of the Alpha 4",
  "26/6": "Left Angle Cross of the Alpha 4",

  // Gate 27 — Nourishment
  "27/1": "Right Angle Cross of the Unexpected 1",
  "27/2": "Right Angle Cross of the Unexpected 1",
  "27/3": "Right Angle Cross of the Unexpected 1",
  "27/4": "Juxtaposition Cross of Caring",
  "27/5": "Left Angle Cross of the Unexpected 2",
  "27/6": "Left Angle Cross of the Unexpected 2",

  // Gate 28 — Preponderance of the Great
  "28/1": "Right Angle Cross of the Unexpected 2",
  "28/2": "Right Angle Cross of the Unexpected 2",
  "28/3": "Right Angle Cross of the Unexpected 2",
  "28/4": "Juxtaposition Cross of the Game Player",
  "28/5": "Left Angle Cross of the Unexpected 1",
  "28/6": "Left Angle Cross of the Unexpected 1",

  // Gate 29 — The Abysmal
  "29/1": "Right Angle Cross of the Unexpected 3",
  "29/2": "Right Angle Cross of the Unexpected 3",
  "29/3": "Right Angle Cross of the Unexpected 3",
  "29/4": "Juxtaposition Cross of Commitment",
  "29/5": "Left Angle Cross of Uncertainty 2",
  "29/6": "Left Angle Cross of Uncertainty 2",

  // Gate 30 — The Clinging Fire
  "30/1": "Right Angle Cross of the Unexpected 4",
  "30/2": "Right Angle Cross of the Unexpected 4",
  "30/3": "Right Angle Cross of the Unexpected 4",
  "30/4": "Juxtaposition Cross of Fates",
  "30/5": "Left Angle Cross of Uncertainty 1",
  "30/6": "Left Angle Cross of Uncertainty 1",

  // Gate 31 — Influence
  "31/1": "Right Angle Cross of the Sphinx 5",
  "31/2": "Right Angle Cross of the Sphinx 5",
  "31/3": "Right Angle Cross of the Sphinx 5",
  "31/4": "Juxtaposition Cross of Influence",
  "31/5": "Left Angle Cross of the Clarion 6",
  "31/6": "Left Angle Cross of the Clarion 6",

  // Gate 32 — Duration
  "32/1": "Right Angle Cross of Service 2",
  "32/2": "Right Angle Cross of Service 2",
  "32/3": "Right Angle Cross of Service 2",
  "32/4": "Juxtaposition Cross of Conservation",
  "32/5": "Left Angle Cross of Defiance 1",
  "32/6": "Left Angle Cross of Defiance 1",

  // Gate 33 — Retreat
  "33/1": "Right Angle Cross of Eden 5",
  "33/2": "Right Angle Cross of Eden 5",
  "33/3": "Right Angle Cross of Eden 5",
  "33/4": "Juxtaposition Cross of Privacy",
  "33/5": "Left Angle Cross of Informing 6",
  "33/6": "Left Angle Cross of Informing 6",

  // Gate 34 — The Power of the Great
  "34/1": "Right Angle Cross of Service 3",
  "34/2": "Right Angle Cross of Service 3",
  "34/3": "Right Angle Cross of Service 3",
  "34/4": "Juxtaposition Cross of Power (34)",
  "34/5": "Left Angle Cross of Defiance 3",
  "34/6": "Left Angle Cross of Defiance 3",

  // Gate 35 — Progress
  "35/1": "Right Angle Cross of Planning 4",
  "35/2": "Right Angle Cross of Planning 4",
  "35/3": "Right Angle Cross of Planning 4",
  "35/4": "Juxtaposition Cross of Change",
  "35/5": "Left Angle Cross of the Refinement 3",
  "35/6": "Left Angle Cross of the Refinement 3",

  // Gate 36 — Darkening of the Light
  "36/1": "Right Angle Cross of Planning 5",
  "36/2": "Right Angle Cross of Planning 5",
  "36/3": "Right Angle Cross of Planning 5",
  "36/4": "Juxtaposition Cross of Crisis",
  "36/5": "Left Angle Cross of the Refinement 6",
  "36/6": "Left Angle Cross of the Refinement 6",

  // Gate 37 — The Family
  "37/1": "Right Angle Cross of Planning 6",
  "37/2": "Right Angle Cross of Planning 6",
  "37/3": "Right Angle Cross of Planning 6",
  "37/4": "Juxtaposition Cross of Bargains",
  "37/5": "Left Angle Cross of the Refinement 5",
  "37/6": "Left Angle Cross of the Refinement 5",

  // Gate 38 — Opposition
  "38/1": "Right Angle Cross of Service 4",
  "38/2": "Right Angle Cross of Service 4",
  "38/3": "Right Angle Cross of Service 4",
  "38/4": "Juxtaposition Cross of Opposition",
  "38/5": "Left Angle Cross of Defiance 4",
  "38/6": "Left Angle Cross of Defiance 4",

  // Gate 39 — Obstruction
  "39/1": "Right Angle Cross of the Four Ways 2",
  "39/2": "Right Angle Cross of the Four Ways 2",
  "39/3": "Right Angle Cross of the Four Ways 2",
  "39/4": "Juxtaposition Cross of Provocation",
  "39/5": "Left Angle Cross of the Four Ways 1",
  "39/6": "Left Angle Cross of the Four Ways 1",

  // Gate 40 — Deliverance
  "40/1": "Right Angle Cross of Service 5",
  "40/2": "Right Angle Cross of Service 5",
  "40/3": "Right Angle Cross of Service 5",
  "40/4": "Juxtaposition Cross of Aloneness",
  "40/5": "Left Angle Cross of Defiance 5",
  "40/6": "Left Angle Cross of Defiance 5",

  // Gate 41 — Decrease
  "41/1": "Right Angle Cross of the Four Ways 3",
  "41/2": "Right Angle Cross of the Four Ways 3",
  "41/3": "Right Angle Cross of the Four Ways 3",
  "41/4": "Juxtaposition Cross of Contraction",
  "41/5": "Left Angle Cross of the Four Ways 4",
  "41/6": "Left Angle Cross of the Four Ways 4",

  // Gate 42 — Increase
  "42/1": "Right Angle Cross of the Unexpected 5",
  "42/2": "Right Angle Cross of the Unexpected 5",
  "42/3": "Right Angle Cross of the Unexpected 5",
  "42/4": "Juxtaposition Cross of Completion",
  "42/5": "Left Angle Cross of the Unexpected 4",
  "42/6": "Left Angle Cross of the Unexpected 4",

  // Gate 43 — Breakthrough
  "43/1": "Right Angle Cross of the Sleeping Phoenix 7",
  "43/2": "Right Angle Cross of the Sleeping Phoenix 7",
  "43/3": "Right Angle Cross of the Sleeping Phoenix 7",
  "43/4": "Juxtaposition Cross of Insight",
  "43/5": "Left Angle Cross of Wishes 3",
  "43/6": "Left Angle Cross of Wishes 3",

  // Gate 44 — Coming to Meet
  "44/1": "Right Angle Cross of Service 6",
  "44/2": "Right Angle Cross of Service 6",
  "44/3": "Right Angle Cross of Service 6",
  "44/4": "Juxtaposition Cross of Alertness",
  "44/5": "Left Angle Cross of Defiance 6",
  "44/6": "Left Angle Cross of Defiance 6",

  // Gate 45 — Gathering Together
  "45/1": "Right Angle Cross of the Sleeping Phoenix 8",
  "45/2": "Right Angle Cross of the Sleeping Phoenix 8",
  "45/3": "Right Angle Cross of the Sleeping Phoenix 8",
  "45/4": "Juxtaposition Cross of Gathering",
  "45/5": "Left Angle Cross of Wishes 4",
  "45/6": "Left Angle Cross of Wishes 4",

  // Gate 46 — Pushing Upward
  "46/1": "Right Angle Cross of the Unexpected 6",
  "46/2": "Right Angle Cross of the Unexpected 6",
  "46/3": "Right Angle Cross of the Unexpected 6",
  "46/4": "Juxtaposition Cross of the Body",
  "46/5": "Left Angle Cross of the Unexpected 5",
  "46/6": "Left Angle Cross of the Unexpected 5",

  // Gate 47 — Oppression
  "47/1": "Right Angle Cross of the Sleeping Phoenix 9",
  "47/2": "Right Angle Cross of the Sleeping Phoenix 9",
  "47/3": "Right Angle Cross of the Sleeping Phoenix 9",
  "47/4": "Juxtaposition Cross of Realization",
  "47/5": "Left Angle Cross of Wishes 5",
  "47/6": "Left Angle Cross of Wishes 5",

  // Gate 48 — The Well
  "48/1": "Right Angle Cross of Planning 7",
  "48/2": "Right Angle Cross of Planning 7",
  "48/3": "Right Angle Cross of Planning 7",
  "48/4": "Juxtaposition Cross of Depth",
  "48/5": "Left Angle Cross of the Refinement 7",
  "48/6": "Left Angle Cross of the Refinement 7",

  // Gate 49 — Revolution
  "49/1": "Right Angle Cross of the Four Ways 4",
  "49/2": "Right Angle Cross of the Four Ways 4",
  "49/3": "Right Angle Cross of the Four Ways 4",
  "49/4": "Juxtaposition Cross of Principles",
  "49/5": "Left Angle Cross of the Four Ways 3",
  "49/6": "Left Angle Cross of the Four Ways 3",

  // Gate 50 — The Cauldron
  "50/1": "Right Angle Cross of the Unexpected 7",
  "50/2": "Right Angle Cross of the Unexpected 7",
  "50/3": "Right Angle Cross of the Unexpected 7",
  "50/4": "Juxtaposition Cross of Values",
  "50/5": "Left Angle Cross of the Unexpected 6",
  "50/6": "Left Angle Cross of the Unexpected 6",

  // Gate 51 — The Arousing
  "51/1": "Right Angle Cross of the Unexpected 8",
  "51/2": "Right Angle Cross of the Unexpected 8",
  "51/3": "Right Angle Cross of the Unexpected 8",
  "51/4": "Juxtaposition Cross of Shock",
  "51/5": "Left Angle Cross of the Unexpected 7",
  "51/6": "Left Angle Cross of the Unexpected 7",

  // Gate 52 — Keeping Still (Mountain)
  "52/1": "Right Angle Cross of the Unexpected 9",
  "52/2": "Right Angle Cross of the Unexpected 9",
  "52/3": "Right Angle Cross of the Unexpected 9",
  "52/4": "Juxtaposition Cross of Stillness",
  "52/5": "Left Angle Cross of Demands 1",
  "52/6": "Left Angle Cross of Demands 1",

  // Gate 53 — Development
  "53/1": "Right Angle Cross of the Four Ways 5",
  "53/2": "Right Angle Cross of the Four Ways 5",
  "53/3": "Right Angle Cross of the Four Ways 5",
  "53/4": "Juxtaposition Cross of Beginnings",
  "53/5": "Left Angle Cross of the Four Ways 6",
  "53/6": "Left Angle Cross of the Four Ways 6",

  // Gate 54 — The Marrying Maiden
  "54/1": "Right Angle Cross of Service 7",
  "54/2": "Right Angle Cross of Service 7",
  "54/3": "Right Angle Cross of Service 7",
  "54/4": "Juxtaposition Cross of Ambition",
  "54/5": "Left Angle Cross of Defiance 7",
  "54/6": "Left Angle Cross of Defiance 7",

  // Gate 55 — Abundance
  "55/1": "Right Angle Cross of the Four Ways 6",
  "55/2": "Right Angle Cross of the Four Ways 6",
  "55/3": "Right Angle Cross of the Four Ways 6",
  "55/4": "Juxtaposition Cross of Moods",
  "55/5": "Left Angle Cross of the Four Ways 5",
  "55/6": "Left Angle Cross of the Four Ways 5",

  // Gate 56 — The Wanderer
  "56/1": "Right Angle Cross of Eden 6",
  "56/2": "Right Angle Cross of Eden 6",
  "56/3": "Right Angle Cross of Eden 6",
  "56/4": "Juxtaposition Cross of Stimulation",
  "56/5": "Left Angle Cross of Informing 5",
  "56/6": "Left Angle Cross of Informing 5",

  // Gate 57 — The Gentle (Wind)
  "57/1": "Right Angle Cross of the Sleeping Phoenix 10",
  "57/2": "Right Angle Cross of the Sleeping Phoenix 10",
  "57/3": "Right Angle Cross of the Sleeping Phoenix 10",
  "57/4": "Juxtaposition Cross of Intuition",
  "57/5": "Left Angle Cross of Wishes 6",
  "57/6": "Left Angle Cross of Wishes 6",

  // Gate 58 — The Joyous (Lake)
  "58/1": "Right Angle Cross of Service 8",
  "58/2": "Right Angle Cross of Service 8",
  "58/3": "Right Angle Cross of Service 8",
  "58/4": "Juxtaposition Cross of Vitality",
  "58/5": "Left Angle Cross of Defiance 8",
  "58/6": "Left Angle Cross of Defiance 8",

  // Gate 59 — Dispersion
  "59/1": "Right Angle Cross of the Unexpected 10",
  "59/2": "Right Angle Cross of the Unexpected 10",
  "59/3": "Right Angle Cross of the Unexpected 10",
  "59/4": "Juxtaposition Cross of Strategy",
  "59/5": "Left Angle Cross of Uncertainty 3",
  "59/6": "Left Angle Cross of Uncertainty 3",

  // Gate 60 — Limitation
  "60/1": "Right Angle Cross of the Unexpected 11",
  "60/2": "Right Angle Cross of the Unexpected 11",
  "60/3": "Right Angle Cross of the Unexpected 11",
  "60/4": "Juxtaposition Cross of Limitation",
  "60/5": "Left Angle Cross of Uncertainty 4",
  "60/6": "Left Angle Cross of Uncertainty 4",

  // Gate 61 — Inner Truth
  "61/1": "Right Angle Cross of the Sleeping Phoenix 11",
  "61/2": "Right Angle Cross of the Sleeping Phoenix 11",
  "61/3": "Right Angle Cross of the Sleeping Phoenix 11",
  "61/4": "Juxtaposition Cross of Mystery",
  "61/5": "Left Angle Cross of Wishes 7",
  "61/6": "Left Angle Cross of Wishes 7",

  // Gate 62 — Preponderance of the Small
  "62/1": "Right Angle Cross of the Sleeping Phoenix 12",
  "62/2": "Right Angle Cross of the Sleeping Phoenix 12",
  "62/3": "Right Angle Cross of the Sleeping Phoenix 12",
  "62/4": "Juxtaposition Cross of Detail",
  "62/5": "Left Angle Cross of Wishes 8",
  "62/6": "Left Angle Cross of Wishes 8",

  // Gate 63 — After Completion
  "63/1": "Right Angle Cross of the Sleeping Phoenix 13",
  "63/2": "Right Angle Cross of the Sleeping Phoenix 13",
  "63/3": "Right Angle Cross of the Sleeping Phoenix 13",
  "63/4": "Juxtaposition Cross of Doubts",
  "63/5": "Left Angle Cross of the Alpha 5",
  "63/6": "Left Angle Cross of the Alpha 5",

  // Gate 64 — Before Completion
  "64/1": "Right Angle Cross of the Sleeping Phoenix 14",
  "64/2": "Right Angle Cross of the Sleeping Phoenix 14",
  "64/3": "Right Angle Cross of the Sleeping Phoenix 14",
  "64/4": "Juxtaposition Cross of Confusion",
  "64/5": "Left Angle Cross of the Alpha 6",
  "64/6": "Left Angle Cross of the Alpha 6",
};
