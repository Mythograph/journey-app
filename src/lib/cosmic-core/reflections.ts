// Cosmic Core — reflection / writing prompts.
//
// A single first-person journaling prompt is attached to the end of each stage
// of the reading. Prompts stay in the reading's voice ("I", "my") so the reader
// writes as themselves rather than being addressed. Most are fixed; a few are
// lightly personalized from the chart (the hybrid the project asked for).
//
// Each prompt is emitted as its own paragraph, led by REFLECTION_MARKER, so the
// reading page and the PDF can render it as a set-apart callout. The marker is a
// single glyph the grammar normalizer leaves untouched (it is not punctuation,
// and it is not a lowercase letter, so the paragraph-capitalize rule skips it).

import { GATES } from "./gates.js";
import type { HumanDesignProfile } from "./narrative.js";

export const REFLECTION_MARKER = "✎ ";

// Every section heading, in reading order, used to find stage boundaries.
const ALL_HEADINGS = [
  "THE ORDINARY WORLD",
  "THE SHAPE OF MY ENERGY",
  "THE CALL",
  "THE THRESHOLD",
  "THE DESCENT",
  "THE ABYSS",
  "THE HELPERS AND ALLIES",
  "THE ROAD OF TRIALS",
  "THE GAUNTLET",
  "THE SPIRITUAL PATH",
  "THE CORE WOUND AND THE VOCATION",
  "THE ELIXIR",
  "THE VOICE",
  "THE RETURN",
  "AM I MADE FOR THIS MOMENT?",
  "THE VILLAGE JOURNEY",
  "WHO I AM",
  "THE LARGER STORY",
];

// Build the per-stage prompts. Keyed by heading; a heading absent from the map
// (the recap) simply gets no prompt.
function buildPrompts(profile: HumanDesignProfile): Record<string, string> {
  const q = (n: number | null | undefined) => (n && GATES[n] ? GATES[n].quantumName : "");
  const callGift = q(profile.sunConscious);

  return {
    "THE ORDINARY WORLD":
      "What was the story my early world told me about who I was and what was possible? Which parts of it am I still living out, even now, without choosing to?",
    "THE SHAPE OF MY ENERGY":
      "Where do I feel most unmistakably like myself, and where do I quietly take on energy that is not mine? When this week did I feel the difference in my body?",
    "THE CALL":
      callGift
        ? `Where have I felt the pull of my gift of ${callGift} and bent away from it? What would change if I stopped wandering from what I am for?`
        : "Where have I felt the pull of what I am for and bent away from it? What would change if I stopped wandering from it?",
    "THE THRESHOLD":
      "What threshold am I standing at right now, hovering at the edge instead of crossing? What is the smallest true step I could take across it?",
    "THE DESCENT":
      "What early experience shaped me more than I usually admit? What did it ask of me then that I am still answering now?",
    "THE ABYSS":
      "What is the ordeal I keep circling back to? Where does it still ask something of me, and what might it be making in me?",
    "THE HELPERS AND ALLIES":
      "Who have my real helpers been, and did I let them help? Where am I refusing support I actually need?",
    "THE ROAD OF TRIALS":
      "What test keeps returning to me in different costumes? If it is not a punishment but a training, what is it training me for?",
    "THE GAUNTLET":
      "When did I last make a decision the way my design actually works, and when did I override it? What happened, in my body and my life, each time?",
    "THE SPIRITUAL PATH":
      "Where do I sense something larger moving through my life, even when I cannot name it? When have I trusted it, and when have I argued with it?",
    "THE CORE WOUND AND THE VOCATION":
      "What is the fight I cannot not have? Where does my deepest wound point straight at the work that is mine to do?",
    "THE ELIXIR":
      "If I had to name the one thing my life has given me to carry back to other people, what would it be today?",
    "THE VOICE":
      "How does what is true in me actually want to come out, in words, in making, in presence? Where do I dilute it before anyone hears it?",
    "THE RETURN":
      "What would it mean to lean all the way into where I am going, instead of half-protecting myself from it?",
    "AM I MADE FOR THIS MOMENT?":
      "What is happening in my time that seems to need something I carry? Where do I feel called beyond my own becoming?",
    "THE VILLAGE JOURNEY":
      "Who is already in my village, and who am I still looking for? What medicine do I bring to a circle that none of us could reach alone?",
    "THE LARGER STORY":
      "Knowing all of this, what is the next true chapter I want to live, and the first line of it I could write this week?",
  };
}

// Return the heading a single-line block opens, if any.
function headingOf(block: string): string | null {
  const firstLine = block.trim().split("\n")[0].trim();
  for (const h of ALL_HEADINGS) {
    if (firstLine === h || firstLine.startsWith(h + " ")) return h;
  }
  return null;
}

// Append each stage's prompt as the final block of that stage, so it lands just
// before the next heading (or at the very end of the reading).
export function injectReflectionPrompts(text: string, profile: HumanDesignProfile): string {
  const prompts = buildPrompts(profile);
  const blocks = text.split(/\n\n+/);
  const out: string[] = [];
  let pending: string | null = null;

  for (const block of blocks) {
    const heading = headingOf(block);
    if (heading) {
      if (pending) out.push(pending);
      out.push(block);
      pending = prompts[heading] ? REFLECTION_MARKER + prompts[heading] : null;
    } else {
      out.push(block);
    }
  }
  if (pending) out.push(pending);

  return out.join("\n\n");
}
