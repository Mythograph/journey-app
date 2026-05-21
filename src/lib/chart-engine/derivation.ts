import {
  GATE_SEQUENCE,
  GATE_SIZE,
  LINE_SIZE,
  CHANNELS,
  GATE_CENTER,
  MOTOR_CENTERS,
  CROSS_NAMES,
} from "./data.js";
import type { CenterName, HdType, Authority, PlanetActivation } from "./types.js";
import type { PlanetaryLongitudes } from "./astronomy.js";

// ── Longitude → gate + line ───────────────────────────────────────────────────
// The HD wheel is offset 1.75° from the tropical zodiac so that Gate 41
// line 1 starts at exactly 302°00' (= 2°00' Aquarius), the canonical "HD
// New Year" position when the Sun enters Gate 41 around January 22.
// Validated against a known 1/4 Right Angle Cross of Tension chart
// (1979-03-31 18:32 BST, Reading UK → Personality Sun 21.1, Design Sun 38.4).
//
//   gate index 54 (= Gate 41) starts at 54 * 5.625° − offset
//   303.75° − 1.75° = 302.00° = 2°00' Aquarius  ✓
const WHEEL_OFFSET = 1.75;

export function longitudeToGateLine(lon: number): { gate: number; line: number } {
  const norm = (((lon + WHEEL_OFFSET) % 360) + 360) % 360;
  const gateIndex = Math.floor(norm / GATE_SIZE);
  const offsetWithin = norm - gateIndex * GATE_SIZE;
  const lineIndex = Math.min(Math.floor(offsetWithin / LINE_SIZE), 5);
  return { gate: GATE_SEQUENCE[gateIndex], line: lineIndex + 1 };
}

// ── Planetary activations ─────────────────────────────────────────────────────

const PLANET_ORDER = [
  "Sun", "Earth", "Moon", "Mercury", "Venus", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
  "NorthNode", "SouthNode", "Chiron",
] as const;

export function toActivations(lons: PlanetaryLongitudes): PlanetActivation[] {
  return PLANET_ORDER.map((planet) => {
    const { gate, line } = longitudeToGateLine(lons[planet as keyof PlanetaryLongitudes]);
    return { planet, gate, line };
  });
}

// ── Channels & centers ────────────────────────────────────────────────────────

export function deriveDefinedChannels(
  allGates: Set<number>,
): [number, number][] {
  const defined: [number, number][] = [];
  for (const [gA, gB] of CHANNELS) {
    if (allGates.has(gA) && allGates.has(gB)) {
      defined.push([gA, gB]);
    }
  }
  return defined;
}

export function deriveDefinedCenters(
  definedChannels: [number, number][],
): Set<CenterName> {
  const centers = new Set<CenterName>();
  for (const [gA, gB] of definedChannels) {
    const cA = GATE_CENTER[gA];
    const cB = GATE_CENTER[gB];
    if (cA) centers.add(cA);
    if (cB) centers.add(cB);
  }
  return centers;
}

// ── Graph helpers for Type derivation ────────────────────────────────────────

// Two centers are "connected" only when an actual defined channel runs
// between them — having both centers individually defined (via different
// channels) is not enough.
function isThroatConnectedToMotor(
  definedChannels: [number, number][],
): boolean {
  // Build adjacency from defined channels only.
  const adj = new Map<CenterName, Set<CenterName>>();
  for (const [gA, gB] of definedChannels) {
    const cA = GATE_CENTER[gA];
    const cB = GATE_CENTER[gB];
    if (!cA || !cB || cA === cB) continue;
    if (!adj.has(cA)) adj.set(cA, new Set());
    if (!adj.has(cB)) adj.set(cB, new Set());
    adj.get(cA)!.add(cB);
    adj.get(cB)!.add(cA);
  }

  if (!adj.has("Throat")) return false;

  const visited = new Set<CenterName>(["Throat"]);
  const queue: CenterName[] = ["Throat"];
  while (queue.length) {
    const current = queue.shift()!;
    if (MOTOR_CENTERS.has(current) && current !== "Throat") return true;
    const neighbors = adj.get(current);
    if (!neighbors) continue;
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }
  return false;
}

// ── Type derivation ───────────────────────────────────────────────────────────

export function deriveType(
  definedCenters: Set<CenterName>,
  definedChannels: [number, number][],
): HdType {
  if (definedCenters.size === 0) return "Reflector";

  const hasSacral = definedCenters.has("Sacral");
  const motorToThroat = isThroatConnectedToMotor(definedChannels);

  if (hasSacral) {
    return motorToThroat ? "Manifesting Generator" : "Generator";
  }
  return motorToThroat ? "Manifestor" : "Projector";
}

// ── Strategy ──────────────────────────────────────────────────────────────────

export function deriveStrategy(type: HdType): string {
  switch (type) {
    case "Generator":
    case "Manifesting Generator":
      return "To Respond";
    case "Manifestor":
      return "To Inform";
    case "Projector":
      return "To Wait for the Invitation";
    case "Reflector":
      return "To Wait a Lunar Cycle";
  }
}

// ── Authority ─────────────────────────────────────────────────────────────────

export function deriveAuthority(
  definedCenters: Set<CenterName>,
  definedChannels: [number, number][],
  type: HdType,
): Authority {
  if (type === "Reflector") return "Lunar";
  if (definedCenters.has("SolarPlexus")) return "Emotional";
  if (definedCenters.has("Sacral")) return "Sacral";
  if (definedCenters.has("Spleen")) return "Splenic";
  if (definedCenters.has("Ego")) {
    return isThroatConnectedToMotor(definedChannels)
      ? "Ego Manifested"
      : "Ego Projected";
  }
  if (definedCenters.has("G") && type === "Projector") return "Self-Projected";
  if (definedCenters.has("Ajna") && type === "Projector") return "Mental Projected";
  return "None";
}

// ── Profile ───────────────────────────────────────────────────────────────────

export function deriveProfile(
  personalityLine: number,
  designLine: number,
): string {
  return `${personalityLine}/${designLine}`;
}

// ── Incarnation Cross ─────────────────────────────────────────────────────────
// Cross type is determined by the profile (personality + design sun lines):
//   RA  = personality line 1-3
//   JUX = personality line 4 AND design line 1
//   LA  = personality line 4 (design line ≠ 1), or personality line 5-6

export function deriveIncarnationCross(
  personalitySunGate: number,
  personalitySunLine: number,
  designSunLine: number,
): string {
  // RA:  profiles 1/3, 1/4, 2/4, 2/5, 3/5, 3/6, 4/6
  // JUX: profile  4/1
  // LA:  profiles 5/1, 5/2, 6/2, 6/3
  let crossType: "RA" | "JUX" | "LA";
  if (personalitySunLine <= 3) {
    crossType = "RA";
  } else if (personalitySunLine === 4 && designSunLine === 1) {
    crossType = "JUX";
  } else if (personalitySunLine === 4) {
    crossType = "RA"; // profile 4/6
  } else {
    crossType = "LA"; // personality lines 5 or 6
  }
  const key = `${personalitySunGate}/${crossType}`;
  return CROSS_NAMES[key] ?? `Cross of Gate ${personalitySunGate} (${crossType})`;
}
