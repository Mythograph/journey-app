// Cosmic Core — the Gene Keys sequences as structured views.
//
// The Life Questions reading presents each sequence (Activation, Venus,
// Pearl) as its own chapter. This module turns a GeneKeysProfile into plain
// data the reading can narrate and the page can draw as a sequence map:
// sphere cards (Gene Key, line, Shadow → Gift → Siddhi) joined by short
// pathway lines.

import { GATES } from "./gates.js";
import {
  GK_SEQUENCES,
  GENE_KEY_FREQUENCIES,
  getSphereLineExpression,
  type GeneKeysProfile,
} from "./gene-keys.js";

export interface SphereView {
  label: string;
  note: string;
  gate: number;
  gateName: string;
  line: number | null;
  lineName: string;
  lineText: string;
  shadow: string;
  gift: string;
  siddhi: string;
  /** The same sphere already appeared earlier in the reading (e.g. Purpose in Venus). */
  repeat: boolean;
}

export interface PathwayView {
  name: string;
  line: string;
}

export interface SequenceView {
  key: "activation" | "venus" | "pearl";
  title: string;
  subtitle: string;
  /** Spheres in order, with the pathway between each consecutive pair. */
  steps: ({ kind: "sphere"; sphere: SphereView } | { kind: "pathway"; pathway: PathwayView })[];
}

// One plain line per pathway, first person. The full pathway essays stay in
// gene-keys.ts for the original reading.
const PATHWAY_LINES: Record<string, string> = {
  "The Pathway of Challenge": "Where my outer purpose rubs against my biggest growing edge. The friction is the engine of my growth.",
  "The Pathway of Breakthrough": "Once I stop avoiding the challenge, something shifts quietly, more surrender than effort.",
  "The Pathway of Core Stability": "I ground into who I am underneath my roles, a floor I can stand on.",
  "The Pathway of Dharma": "What I attract mirrors the state I'm living from, so I start from purpose instead of from the wound.",
  "The Pathway of Karma": "I begin to see the pattern in who and what I'm drawn to, without being run by it.",
  "The Pathway of Intelligence": "My mind stops explaining my feelings away and starts witnessing them.",
  "The Pathway of Love": "Felt fully, old hurt loosens its grip, and love becomes larger than personal.",
  "The Pathway of Realization": "The wound at my core turns out to be the doorway to my essence.",
  "The Pathway of Initiative": "My essence starts moving outward, into form.",
  "The Pathway of Growth": "I find the places and people where my gift flourishes.",
  "The Pathway of Service": "I offer from essence, and the Pearl emerges once I stop trying to keep.",
};

export function villageViews(gk: GeneKeysProfile): SequenceView[] {
  const seen = new Set<string>();
  return GK_SEQUENCES.map(seq => {
    const spheres: (SphereView | null)[] = seq.spheres.map(sp => {
      const gate = gk[sp.gateField] as number | null;
      const freq = gate ? GENE_KEY_FREQUENCIES[gate] : null;
      if (!gate || !freq) return null;
      const line = gk[sp.lineField] as number | null;
      const expr = getSphereLineExpression(sp.lineKey, line);
      const key = `${String(sp.gateField)}:${sp.lineKey}`;
      const repeat = seen.has(key);
      seen.add(key);
      return {
        label: sp.label,
        note: sp.note,
        gate,
        gateName: GATES[gate]?.traditionalName ?? "",
        line,
        lineName: expr?.name ?? "",
        lineText: expr?.description ?? "",
        shadow: freq.shadow,
        gift: freq.gift,
        siddhi: freq.siddhi,
        repeat,
      };
    });
    const steps: SequenceView["steps"] = [];
    spheres.forEach((sphere, i) => {
      if (!sphere) return;
      steps.push({ kind: "sphere", sphere });
      const pw = seq.pathways[i];
      if (pw && spheres[i + 1]) steps.push({ kind: "pathway", pathway: { name: pw.name, line: PATHWAY_LINES[pw.name] ?? "" } });
    });
    return { key: seq.key, title: seq.title, subtitle: seq.subtitle, steps };
  });
}
