// Cosmic Core — Human Design profile lines.
//
// The six line keynotes feed the narrative builder (Threshold section).
// The 12 conscious/unconscious profile combinations with long-form
// descriptions live at the app presentation layer (journey-app's
// chart-engine/copy.ts) until both apps consume them from here.

export interface ProfileLine {
  name: string;
  description: string;
}

export const PROFILE_LINES: Record<number, ProfileLine> = {
  1: { name: "Investigator", description: "building a secure foundation of knowledge" },
  2: { name: "Natural",      description: "expressing your natural gifts and being called forth by others" },
  3: { name: "Martyr",       description: "learning through trial, error and lived experience" },
  4: { name: "Opportunist",  description: "building a network of influence and meaningful connections" },
  5: { name: "Heretic",      description: "offering practical solutions that serve the collective" },
  6: { name: "Role Model",   description: "embodying wisdom earned through a full arc of lived experience" },
};

export function profileLineDescription(n: number | null): string {
  if (!n) return "___";
  return PROFILE_LINES[n]?.description ?? `Line ${n}`;
}
