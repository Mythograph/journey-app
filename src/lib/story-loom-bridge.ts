// The closing note that bridges the Journey reading to Story Loom.
//
// Lives in the app layer, not cosmic-core: cosmic-core is shared with the
// Story Loom app itself, which should never carry an invitation to Story Loom.
// Written in Cléa's voice and signed, so it reads as a note from her rather
// than as part of the reader's first-person reading. Language follows the
// Brand Glossary: "golden thread" (purpose statement), "narrative field"
// (personal brand), "old myth" (limiting belief).

export interface ClosingNote {
  text: string;
  signature: string;
  linkText: string;
  url: string;
}

export const STORY_LOOM_NOTE: ClosingNote = {
  text:
    "The sentence you just wrote is the beginning of what I call your golden thread: the motivation running beneath everything you do. In Story Loom, my one-on-one program, we follow that thread together, through your stories and the old myths you've been living by, until it grows into a narrative field, a way of speaking about your work that sounds like you wherever it shows up. If you feel the pull to go further, I'd love to hear where you're starting from.",
  signature: "Cléa",
  linkText: "Explore Story Loom",
  url: "https://cleahernandez.com",
};
