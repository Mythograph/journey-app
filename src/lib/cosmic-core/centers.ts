// Cosmic Core — the nine Human Design energy centers.
//
// Interpretive copy for each center in its two reader-facing states:
// defined (consistent, reliable, felt by others) and open (where the
// person takes in and amplifies the world, the site of both conditioning
// and, over a lifetime, wisdom). The chart engine also distinguishes
// "undefined" (open but carrying an activated gate) from "open" (no gates);
// the narrative folds both into the open copy, and surfaces the
// undefined-with-a-prominent-gate case as its own motif.
//
// The `defined` and `open` strings are written to complete the sentence
// frame "my <displayName>, where ___" so the builder can list them inline.

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

export type CenterStatus = "defined" | "undefined" | "open";

export interface CenterCopy {
  displayName: string;
  defined: string;
  open: string;
}

// Top-to-bottom bodygraph order.
export const CENTER_ORDER: CenterName[] = [
  "Head", "Ajna", "Throat", "G", "Ego", "Sacral", "SolarPlexus", "Spleen", "Root",
];

export const CENTERS: Record<CenterName, CenterCopy> = {
  Head: {
    displayName: "Head",
    defined: "my mind runs on a steady source of inspiration and questions that is genuinely my own",
    open: "I take in and amplify the questions and mental pressure of everyone around me, and can feel driven to answer questions that were never mine to solve",
  },
  Ajna: {
    displayName: "Ajna",
    defined: "I make sense of the world in consistent, dependable ways",
    open: "I try on other people's beliefs and frameworks, and can feel pressure to seem certain when I am still genuinely open",
  },
  Throat: {
    displayName: "Throat",
    defined: "I express myself and act from a consistent inner voice",
    open: "I feel pressure to speak and act in order to be seen, often on a timing that is not my own",
  },
  G: {
    displayName: "G Center",
    defined: "I carry a steady sense of who I am and the direction I am headed",
    open: "I find my sense of self and my direction through the people and places around me, and can lose myself in the wrong environment",
  },
  Ego: {
    displayName: "Ego",
    defined: "my willpower is reliable and my sense of my own worth is steady",
    open: "I feel pressure to prove my worth and to promise more than my energy can sustain",
  },
  Sacral: {
    displayName: "Sacral",
    defined: "I have sustainable, renewable energy for the work that genuinely lights me up",
    open: "I absorb the life-force around me and can push long past the point where enough is enough",
  },
  SolarPlexus: {
    displayName: "Solar Plexus",
    defined: "I move through my own emotional waves and feel them as mine",
    open: "I absorb the emotional weather of every room, and can avoid honesty to keep the peace",
  },
  Spleen: {
    displayName: "Spleen",
    defined: "I carry a steady, in-the-moment instinct for what keeps me well",
    open: "I hold on to people, things, and fears past their time, and absorb the anxieties around me",
  },
  Root: {
    displayName: "Root",
    defined: "I have a steady, reliable relationship with pressure and drive",
    open: "I rush to get free of pressure, much of which was never mine to carry",
  },
};
