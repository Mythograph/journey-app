// Cosmic Core — navigating by design: strategy, authority, and profile-line
// experiments. The training copy behind THE GAUNTLET section, where the
// reader learns how their type/strategy/authority turn raw energy into
// sovereignty, and how their profile lines are meant to experiment with life.

import type { HdTypeName } from "./types.js";

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

// How each type is built to engage the world (strategy as training).
export const STRATEGY_TRAINING: Record<HdTypeName, string> = {
  "Generator":
    "My training is to wait to respond. Rather than pushing from my mind, I let life bring things toward me and feel for the gut-level yes or no that answers. Every time I honor that response instead of forcing an opening, I build trust in my own energy and stop spending it on what was never mine.",
  "Manifesting Generator":
    "My training is to wait to respond, and then to inform. I let life show me what to answer, follow the fast, multi-track yes when it comes, and tell the people my moves affect before I leap. Each round of respond-then-inform builds momentum that doesn't collapse, and keeps the people around me moving with me instead of against me.",
  "Manifestor":
    "My training is to inform before I act. I don't need permission, but letting people know what I am about to do, before I do it, clears the resistance out of my path. Every time I inform instead of springing it on people, I turn friction into freedom.",
  "Projector":
    "My training is to wait for the invitation and the recognition. My guidance lands when it has been asked for and grates when it hasn't. Every time I wait for the genuine invitation instead of pushing to be seen, I protect my energy and my insight is actually received.",
  "Reflector":
    "My training is to wait a full lunar cycle before any major decision. I am a mirror, and my clarity comes through time and through sampling many people and places. Every time I let a whole cycle pass before I commit, I keep myself from choices my environment talked me into.",
};

// How each authority is built to decide (authority as training).
export const AUTHORITY_TRAINING: Record<Authority, string> = {
  "Emotional":
    "My authority is emotional, which means my truth is not in the first rush of yes or no. It lives at the bottom of the emotional wave, after I have slept on a decision, sometimes more than once. Training here means never committing in the heat of a feeling, and learning again and again that clarity comes with time.",
  "Sacral":
    "My authority is sacral, the gut response that rises before words, the uh-huh or the uh-uh in my body. Training here means putting decisions to myself as yes-or-no questions and trusting the sound my body makes over the case my mind builds.",
  "Splenic":
    "My authority is splenic, a quiet, in-the-moment knowing that speaks once and does not repeat itself. Training here means slowing down enough to catch the whisper the first time, and acting on it without demanding that it justify itself.",
  "Ego Manifested":
    "My authority runs through my will and my heart. My truth is whether I genuinely want a thing, not whether I should, and I hear it in what I find myself saying out loud. Training here means making promises only when the want is real, and noticing when my heart is not actually in it.",
  "Ego Projected":
    "My authority runs through my heart, heard in my own voice. My truth is whether I genuinely want a thing, not whether I should. Training here means talking things through until I can hear what I actually want, and committing only when the wanting is real.",
  "Self-Projected":
    "My authority is self-projected, which means my truth lives in my voice once it has passed through my sense of who I am. Training here means talking things out loud with someone who only listens, no advice and no opinions, and hearing what I actually mean.",
  "Mental Projected":
    "My authority is environmental. I find my truth by talking things through with trusted people and noticing how different places make me feel. Training here means using others as sounding boards rather than deciders, and remembering that I am still the one who knows.",
  "Lunar":
    "My authority is lunar. No major decision is made without a full cycle of the moon to move through the question. Training here means refusing to be rushed, talking the choice through across the whole cycle, and letting time reveal what is true.",
  "None":
    "My design carries no fixed inner authority, which is rare. Training here means making big decisions slowly, through the cycles of my environment and the people I trust, and noticing what stays clear over time rather than what feels urgent in the moment.",
};

// How each profile line is built to experiment with life. Line 3 is the
// experimenter by design, so its entry leans into trial and error.
export const PROFILE_EXPERIMENTS: Record<number, string> = {
  1: "I experiment by going deep before I go wide. I give myself permission to study, to test the ground, and to build the foundation of knowledge that makes me feel secure enough to act. My confidence is earned by understanding the underneath.",
  2: "I experiment by protecting my solitude and letting myself be called out. My gifts are natural, and I often can't see them myself, so the experiment is to trust the people who name them and to answer only the calls that genuinely fit.",
  3: "Experimenting is my path. I am built to learn by trial and error, to try things, collide with what doesn't work, and discover what does through lived experience. Nothing I label a mistake is wasted; it is research. Of all the lines, I experiment most freely, and the more I let myself try and fail without shame, the faster I find what is real.",
  4: "I experiment through my relationships. My opportunities and my growth arrive through the people who already know and trust me, so the experiment is to share what I am working on with my network and let the next step come through connection rather than force.",
  5: "I experiment by offering practical solutions and watching the projections that come back. People will project all sorts of expectations onto me, so the experiment is to deliver real, useful help when the call genuinely fits, and to set clear boundaries when it doesn't.",
  6: "I experiment in chapters. My life moves through distinct phases, and especially after my mid-thirties I experiment less through trial and more by living what I have already learned. I lead by example, and the experiment becomes letting my own life be the teaching.",
};
