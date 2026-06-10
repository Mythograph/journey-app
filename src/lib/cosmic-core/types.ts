// Cosmic Core — the five Human Design types.
//
// Canonical keys are the standard HD names (Generator, Manifestor, …);
// the Mythograph quantum name is carried as metadata for apps that want it.
// `purpose` is the second-person display copy; `purposeGerund` is the
// first-person fragment used by the narrative builder in the slot
// "I am here to serve the world by ___".

export type HdTypeName =
  | "Generator"
  | "Manifesting Generator"
  | "Manifestor"
  | "Projector"
  | "Reflector";

export interface TypeProfile {
  name: HdTypeName;
  quantumName: string;
  purpose: string;
  purposeGerund: string;
  typeDescription: string;
}

export const TYPE_PROFILES: Record<HdTypeName, TypeProfile> = {
  "Manifestor": {
    name: "Manifestor",
    quantumName: "Initiator",
    purpose: "To initiate new beginnings and inspire others into action. Your role is to start things and be the catalyst for change in the world.",
    purposeGerund: "initiating what needs to begin and informing those who will be affected before I act",
    typeDescription: "I am here to initiate — to bring new things into being and set things in motion that others then carry forward. My energy is designed to move independently, without needing to wait for permission or consensus. Not knowing this early in life, I often felt like I was either too much — too forceful, too direct, too loud — or I pulled back and suppressed that initiating impulse entirely, wondering why others seemed to move more freely than I did. I may have reacted with anger when I felt controlled or thwarted, or I may have learned to make myself small in order to avoid the friction my natural way of moving through the world seemed to create.",
  },
  "Generator": {
    name: "Generator",
    quantumName: "Builder",
    purpose: "To respond to life with your powerful sacral energy and build things that bring you joy and deep satisfaction. Your work is to find what truly lights you up and commit fully to it.",
    purposeGerund: "responding to life and generating sustained momentum for what is ready to move",
    typeDescription: "I am here to respond — to find the work that genuinely lights me up and give it everything I have. My energy is sustainable and generative when I wait for things to respond to, rather than initiating from strategy or obligation. Not knowing this early in life, I often felt frustrated — spinning my wheels on things that weren't quite right for me, saying yes out of obligation rather than genuine resonance. I may have learned to push and initiate like the people around me, and wondered why it never felt as natural or as satisfying, or why my energy would surge and then suddenly crash.",
  },
  "Manifesting Generator": {
    name: "Manifesting Generator",
    quantumName: "Time Bender",
    purpose: "To find the fastest, most efficient path forward and master multiple creative paths simultaneously. Your speed and responsiveness are your greatest gifts.",
    purposeGerund: "responding swiftly, informing those who need to know, and moving in the non-linear way my design requires",
    typeDescription: "I am here to respond and then move — fast, multi-passionately, and in ways that often skip steps others consider essential. My energy is built for speed and multiplicity; I am meant to do more than one thing and to find shortcuts that work. Not knowing this early in life, I often felt frustrated and stuck when I couldn't get things moving, or guilty for dropping things that no longer held my interest. I may have been told I was scattered, inconsistent, or that I needed to slow down and finish what I started — when in fact my way of moving through the world was correct all along, just misunderstood.",
  },
  "Projector": {
    name: "Projector",
    quantumName: "Orchestrator",
    purpose: "To guide, lead and orchestrate the energy of others. To see deeply into people and systems and share your profound wisdom and insight when invited.",
    purposeGerund: "guiding the energy and direction of others, waiting to be recognized and invited to do so",
    typeDescription: "I am here to guide — to see others clearly and offer direction, recognition, and wisdom about how systems and people can work better. My energy is not designed for sustained output; it is designed for focused, penetrating perception. Not knowing this early in life, I often felt bitter — working hard to be seen, over-extending myself trying to keep pace with energy types that operate very differently than I do, and feeling invisible or undervalued when my contributions weren't recognized. I may have learned to hustle and push rather than wait for the genuine invitations that are actually meant for me.",
  },
  "Reflector": {
    name: "Reflector",
    quantumName: "Calibrator",
    purpose: "To reflect the health and vitality of your community back to itself. To serve as a living barometer of collective wellbeing and celebrate what is truly working.",
    purposeGerund: "reflecting the health and vitality of the communities I inhabit, and waiting a full lunar cycle for clarity on major decisions",
    typeDescription: "I am here to reflect — to sample the energy of the people and environments around me and offer a clear mirror of what's actually present in a community or group. My energy is lunar and cyclical, not fixed, which means I am naturally variable, and that variability is a feature, not a problem. Not knowing this early in life, I often felt disappointed — unsure who I actually was underneath all the energies I was absorbing, uncertain whether I could trust my own sense of things from one day to the next. I may have felt invisible or like I was always disappearing into the moods and identities of people around me, unable to find stable ground.",
  },
};
