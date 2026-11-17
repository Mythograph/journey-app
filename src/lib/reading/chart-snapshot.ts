// A small, storable record of a chart: the activations plus the derived
// headline facts. Saved with each Life Questions reading so the reading page
// can draw bodygraphs and rebuild the reader's profile without geocoding the
// birth city again on every visit.

import type { Chart, PlanetActivation, CenterName } from "../chart-engine/types.js";
import {
  mechanicalGates,
  deriveDefinedChannels,
  deriveDefinedCenters,
} from "../chart-engine/derivation.js";
import { humanDesignProfileFromChart, geneKeysProfileFromChart, activationsFromChart } from "../narrative.js";
import type { Activation, HumanDesignProfile, GeneKeysProfile } from "../cosmic-core/index.js";

export interface ChartSnapshot {
  type: Chart["type"];
  strategy: string;
  authority: Chart["authority"];
  profile: string;
  incarnationCross: string;
  personality: PlanetActivation[];
  design: PlanetActivation[];
}

export function snapshotFromChart(chart: Chart): ChartSnapshot {
  return {
    type: chart.type,
    strategy: chart.strategy,
    authority: chart.authority,
    profile: chart.profile,
    incarnationCross: chart.incarnationCross,
    personality: chart.personalityActivations.map(({ planet, gate, line }) => ({ planet, gate, line })),
    design: chart.designActivations.map(({ planet, gate, line }) => ({ planet, gate, line })),
  };
}

/** Rebuild the parts of a Chart the narrative adapters and renderer need. */
export function chartFromSnapshot(s: ChartSnapshot): Chart {
  const personalityGates = mechanicalGates(s.personality);
  const designGates = mechanicalGates(s.design);
  const definedGates = new Set([...personalityGates, ...designGates]);
  const definedChannels = deriveDefinedChannels(definedGates);
  const definedCenters = deriveDefinedCenters(definedChannels);
  return {
    birthData: { date: "", time: "", city: "" },
    type: s.type,
    strategy: s.strategy,
    authority: s.authority,
    profile: s.profile,
    incarnationCross: s.incarnationCross,
    personalityActivations: s.personality,
    designActivations: s.design,
    definedGates,
    definedChannels,
    definedCenters,
    bodygraphSvg: "",
    debug: {} as Chart["debug"],
  } as Chart;
}

export interface ReadingInputs {
  profile: HumanDesignProfile;
  geneKeys: GeneKeysProfile;
  activations: Activation[];
  bodygraph: {
    definedCenters: Set<CenterName>;
    definedChannels: [number, number][];
    personalityGates: Set<number>;
    designGates: Set<number>;
  };
}

/** Everything the Life Questions builder and reading page need, from one chart. */
export function readingInputsFromChart(chart: Chart): ReadingInputs {
  const activations: Activation[] = activationsFromChart(chart);
  return {
    profile: humanDesignProfileFromChart(chart),
    geneKeys: geneKeysProfileFromChart(chart),
    activations,
    bodygraph: {
      definedCenters: chart.definedCenters,
      definedChannels: chart.definedChannels,
      personalityGates: mechanicalGates(chart.personalityActivations),
      designGates: mechanicalGates(chart.designActivations),
    },
  };
}
