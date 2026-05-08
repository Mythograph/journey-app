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
// The HD wheel starts 1.875° (= 2 line-widths) before the vernal equinox.
// This constant is derived from reference charts and places Gate 41 at
// the winter solstice (≈ 300° ecliptic), matching the HD New Year.
const WHEEL_OFFSET = 1.875;

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
  "NorthNode", "SouthNode",
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

function isThroatConnectedToMotor(definedCenters: Set<CenterName>): boolean {
  if (!definedCenters.has("Throat")) return false;

  // BFS from Throat through defined centers, check if we reach a Motor
  const visited = new Set<CenterName>(["Throat"]);
  const queue: CenterName[] = ["Throat"];

  while (queue.length) {
    const current = queue.shift()!;
    if (MOTOR_CENTERS.has(current) && current !== "Throat") return true;

    // Find neighbors via channels
    for (const [gA, gB, cA, cB] of CHANNELS) {
      void gA; void gB; // gate info not needed here
      let neighbor: CenterName | null = null;
      if (cA === current && definedCenters.has(cB)) neighbor = cB;
      else if (cB === current && definedCenters.has(cA)) neighbor = cA;
      if (neighbor && !visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}

// ── Type derivation ───────────────────────────────────────────────────────────

export function deriveType(definedCenters: Set<CenterName>): HdType {
  if (definedCenters.size === 0) return "Reflector";

  const hasSacral = definedCenters.has("Sacral");
  const motorToThroat = isThroatConnectedToMotor(definedCenters);

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
  type: HdType,
): Authority {
  if (type === "Reflector") return "Lunar";
  if (definedCenters.has("SolarPlexus")) return "Emotional";
  if (definedCenters.has("Sacral")) return "Sacral";
  if (definedCenters.has("Spleen")) return "Splenic";
  if (definedCenters.has("Ego")) {
    return isThroatConnectedToMotor(definedCenters)
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
