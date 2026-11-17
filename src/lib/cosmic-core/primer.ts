// Cosmic Core — "Before You Begin": a plain-language primer for first-time
// readers of Human Design and the Gene Keys. Spoken in the chart reader's
// voice ("you"), short cards, no jargon left undefined.

import type { HumanDesignProfile } from "./narrative.js";

export interface PrimerCard {
  title: string;
  body: string;
  /** Show the reader's full bodygraph beside this card. */
  showChart?: boolean;
}

export function buildPrimerCards(p: HumanDesignProfile): PrimerCard[] {
  const profile = p.profileConscious && p.profileUnconscious ? `${p.profileConscious}/${p.profileUnconscious}` : "";
  return [
    {
      title: "What Human Design is",
      body: "Human Design is a map of how your energy is built to work. It was first described in 1987 by Ra Uru Hu, and it weaves together older systems: the I Ching, Western astrology, the Kabbalah's Tree of Life, and the Hindu chakras. Your chart is calculated from the exact moment and place you were born.",
    },
    {
      title: "The idea underneath it",
      body: "From the day you arrive, the people and places around you shape you. Some of that shaping nourishes you, and some of it pulls you away from how you're actually built. Human Design calls that pull conditioning. Your chart helps you notice which parts of you are steady and yours, and which parts take in the world around you. The invitation is to test it: live by it for a while, and see what changes.",
    },
    {
      title: "What a bodygraph is",
      body: "Your bodygraph is the picture of your chart. It has nine shapes, called centers, and each one governs a part of life: inspiration, thinking, expression, identity, willpower, emotions, life-force, instinct, and pressure. A colored center is defined, which means it works the same way every day and other people feel it coming from you. A white center is open, which means you take in and amplify the energy of the people around you. Open centers are where you learn the most about other people.",
      showChart: true,
    },
    {
      title: "Gates and channels",
      body: "The small numbered circles are gates, 64 in all. Each gate is a specific kind of energy, like Focus, Desire, or Shock. When a gate is colored in, you carry it. When the gates at both ends of a line are colored in, they form a channel, a steady current between two centers. Channels are what color your centers in.",
    },
    {
      title: "Black and red",
      body: "Each colored gate comes from where a planet was. Black gates are calculated from the moment you were born. They're your conscious side, the parts of yourself you recognize and can talk about. Red gates are calculated from about 88 days before your birth. They're your unconscious side, the parts that run through your body and that other people often see in you first.",
    },
    {
      title: "Where the I Ching comes in",
      body: `The I Ching is an ancient Chinese book of 64 hexagrams. Each hexagram is an image of change, built from six lines. Human Design lays those 64 hexagrams around the zodiac wheel, so each one becomes a gate, and the six lines of each hexagram become the lines of your profile${profile ? ` (your ${profile}, for example)` : ""}. When a planet sits in a slice of that wheel, it switches the matching gate on in your chart.`,
    },
    {
      title: "What the Gene Keys add",
      body: "The Gene Keys, written by Richard Rudd, read the same 64 gates as a contemplative path. Each one is a spectrum: a Shadow (how the energy contracts under fear), a Gift (what it becomes with awareness), and a Siddhi (its fullest flowering). Near the end of this reading, they show how your gifts move out into community.",
    },
    {
      title: "How to read this",
      body: "Each chapter asks a question about your life. The large text is written in your own voice, as \"I\" and \"my,\" so you can hear it as yours. Alongside it, in quieter text, is the chart reader's voice, explaining what in your chart it comes from, with a small bodygraph showing where to look. Keep what rings true, test the rest against your life, and let go of whatever doesn't fit. You don't have to read it all at once.",
    },
  ];
}

/** Plain-text form for the stored narrative. */
export function buildPrimer(p: HumanDesignProfile): string {
  return ["BEFORE YOU BEGIN", ...buildPrimerCards(p).map(c => `${c.title}. ${c.body}`)].join("\n\n");
}
