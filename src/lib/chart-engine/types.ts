export interface BirthData {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h, local to birth city)
  city: string;
}

export type CenterName =
  | "Head"
  | "Ajna"
  | "Throat"
  | "G"
  | "Ego"
  | "Sacral"
  | "SolarPlexus"
  | "Spleen"
  | "Root";

export type HdType =
  | "Generator"
  | "Manifesting Generator"
  | "Manifestor"
  | "Projector"
  | "Reflector";

export type Authority =
  | "Emotional"
  | "Sacral"
  | "Splenic"
  | "Ego Manifested"
  | "Ego Projected"
  | "Self-Projected"
  | "Mental Projected"
  | "Lunar"
  | "None";

export interface GateLine {
  gate: number;
  line: number;
}

export interface PlanetActivation {
  planet: string;
  gate: number;
  line: number;
}

export interface Chart {
  // Meta
  birthData: BirthData;

  // Core HD properties
  type: HdType;
  strategy: string;
  authority: Authority;
  profile: string; // e.g. "1/3"
  incarnationCross: string;

  // Activations
  personalityActivations: PlanetActivation[]; // Conscious (black)
  designActivations: PlanetActivation[]; // Unconscious (red)

  // Derived
  definedGates: Set<number>; // all activated gates
  definedChannels: [number, number][];
  definedCenters: Set<CenterName>;

  // Bodygraph SVG
  bodygraphSvg: string;
}
