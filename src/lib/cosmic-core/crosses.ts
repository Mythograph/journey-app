// Cosmic Core — incarnation cross variations.
//
// Every incarnation cross is one of three structural types, derivable from the
// cross name (which the chart engine already produces). The variation
// describes the geometry of a life's purpose:
//   Right Angle   — Personal Destiny (self-directed, inward)
//   Left Angle    — Transpersonal Destiny (relational, outward, collective)
//   Juxtaposition — Fixed Fate (a single, concentrated trajectory)
//
// The 192 per-cross narratives are a separate dataset the project does not yet
// hold; until it does, the narrative pairs this variation copy with the
// four-gate synthesis (conscious + unconscious Sun and Earth).

export type CrossVariation = "RightAngle" | "LeftAngle" | "Juxtaposition";

export interface CrossVariationCopy {
  label: string;
  theme: string;
  description: string;
}

export const CROSS_VARIATIONS: Record<CrossVariation, CrossVariationCopy> = {
  RightAngle: {
    label: "Right Angle",
    theme: "a personal destiny",
    description:
      "My cross is a Right Angle, a personal destiny. Its geometry turns inward, which means my life theme is shaped more by my own self-discovery than by my relationships, especially in the first half of life. I am here to follow my own path and become fully myself, and what I learn by living it is what I eventually have to offer.",
  },
  LeftAngle: {
    label: "Left Angle",
    theme: "a transpersonal destiny",
    description:
      "My cross is a Left Angle, a transpersonal destiny. Its geometry turns outward, which means my purpose unfolds through relationships, encounters, and the collective. I am here to meet particular people and play a part in their stories as they play a part in mine, and my path reveals itself through those interactions rather than in isolation.",
  },
  Juxtaposition: {
    label: "Juxtaposition",
    theme: "a fixed fate",
    description:
      "My cross is a Juxtaposition, a fixed fate. Its geometry is singular and concentrated, which means I am here for a very specific path, with an unusual fixedness of purpose. My work is to honor that particular trajectory rather than scatter myself across many directions.",
  },
};

// Derive the variation from a cross name like "Right Angle Cross of the Sphinx".
export function crossVariation(crossName: string | null | undefined): CrossVariation | null {
  if (!crossName) return null;
  if (/right angle/i.test(crossName)) return "RightAngle";
  if (/left angle/i.test(crossName)) return "LeftAngle";
  if (/juxtaposition/i.test(crossName)) return "Juxtaposition";
  return null;
}
