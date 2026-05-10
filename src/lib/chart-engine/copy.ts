import type { Authority, HdType } from "./types.js";

// ── Channel mini-essays ────────────────────────────────────────────────────────
// Keyed by `${gateA}-${gateB}` with the lower gate first. Voice is intended to
// be intimate, embodied, slightly literary — Cléa-flavoured. Each entry is a
// pre-purchase preview, not a full reading: it should leave the reader curious,
// not satiated. Aim for 30-50 words.
//
// Stubs marked TODO need their own draft. The 6 below are first-cut copy you
// can edit, replace, or use as voice reference for the rest.

export const CHANNEL_DESCRIPTIONS: Record<string, string> = {
  // ── Drafted ────────────────────────────────────────────────────────────────
  "4-63": "Logic. The mind that needs proof, not promises. You doubt out loud, and that doubt — when you let it ripen instead of swallowing it — is how the rest of us find the pattern under the noise.",

  "20-34": "Charisma. Manifest in the moment of being where you're needed, doing what you're doing. Not pursued, not performed. The room shifts when you speak from this — your throat lit by your sacral, voice carrying the weight of the body underneath.",

  "59-6": "Mating. An old, unhidden hunger. You read intimacy through the skin before the mind catches up — chemistry, friction, alignment. It will draw people closer than they meant to come, and ask you what to do with that.",

  "26-44": "Surrender. You can sell anything that's true. Memory works in your favour: faces, names, debts, gifts. The line between transmission and manipulation is yours to walk, again and again.",

  "11-56": "Curiosity. You are a teller of stories, a collector of ideas you didn't yet have a use for. The point isn't conclusion. The point is to keep the listener leaning forward.",

  "37-40": "Community. The handshake, the bargain, the meal made for everyone. You know who's in and who's out, and what the in costs. Loyalty here is real — and so is its price.",

  // ── Stubs (TODO: rewrite in your voice) ────────────────────────────────────
  "24-61": "Awareness. The pressure to know what you don't yet know — and the silence required to let it land.",
  "47-64": "Abstraction. Old confusion turning, slowly, into a story you can finally tell.",
  "17-62": "Acceptance. Opinions delivered as fact, organised, unmistakable.",
  "23-43": "Structuring. The lone insight that arrives whole, in your own grammar.",
  "7-31": "Alpha. The voice the future listens for — when invited, not before.",
  "1-8": "Inspiration. A creative singularity that asks the world to make space.",
  "13-33": "Prodigal. The witness who returns and finally says what happened.",
  "10-20": "Awakening. The commitment to live by your own knowing, out loud.",
  "21-45": "Money Line. Dominion over the material — territory, resource, wealth as command.",
  "12-22": "Openness. Mood as instrument. Social grace that opens what was closed.",
  "35-36": "Transitoriness. Many lives in one life. The restlessness that builds range.",
  "16-48": "Wavelength. Talent rehearsed until the depth becomes audible.",
  "2-14": "Beat. Direction held in the body. The keeper of keys, with resources to share.",
  "5-15": "Rhythm. A flow that includes everyone, even those who didn't expect to belong.",
  "29-46": "Discovery. Saying yes to the body, again and again, until success arrives in disguise.",
  "25-51": "Initiation. Shock as the door. You either flinch or walk through.",
  "10-57": "Perfected Form. Survival as instinct. The body knowing before the mind can argue.",
  "3-60": "Mutation. Change born under pressure, on its own timing, never on yours.",
  "9-52": "Concentration. Sustained focus where others have already gone elsewhere.",
  "42-53": "Maturation. The discipline of finishing what was started, season by season.",
  "27-50": "Preservation. Care that knows the difference between protecting and keeping captive.",
  "34-57": "Power. Pure response to the present. Survival speaking through clarity.",
  "30-41": "Recognition. Fantasy as fuel; the dream that imagines what hasn't yet existed.",
  "19-49": "Synthesis. Sensitivity to need — yours, others', the room's.",
  "39-55": "Emoting. Mood as message. The spirit that won't be performed away.",
  "28-38": "Struggle. Fighting for the purpose worth fighting for, and learning which one is.",
  "32-54": "Transformation. Ambition that climbs through what won't yet stop changing.",
  "18-58": "Judgment. The corrective eye — joy in fixing what others were willing to leave broken.",
};

// ── Channel name fallback (already in CHANNELS table, exposed here for ease) ──
// (Not strictly needed — CHANNELS in data.ts is canonical — but a thin wrapper.)
export function channelKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// ── Type / Strategy / Authority / Profile copy ─────────────────────────────────

export const TYPE_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "A sustainable life-force engine. You are built to respond — not to initiate, not to chase. When the right thing arrives, your body will tell you. The work is to wait long enough to hear it.",
  "Manifesting Generator": "A multi-armed engine of response. Faster than a Generator, less linear. You skip steps and double back; the path is the path because you walked it. Inform what you're doing, then move.",
  "Manifestor": "A starter. You don't need permission, and you don't owe an explanation — but informing what you're about to do is the courtesy that keeps the world from arguing with you.",
  "Projector": "A guide, a reader, a noticer of the patterns others can't yet see. Your strategy is to wait for the invitation. Recognition is real; chasing it isn't.",
  "Reflector": "Lunar in design — a mirror for the people and places around you. Your decisions take a full lunar cycle to clarify. Time is your medium, not your enemy.",
};

export const AUTHORITY_DESCRIPTIONS: Record<Authority, string> = {
  "Emotional": "Wait through the wave. Clarity arrives at the bottom of the feeling, not the top. There is no truth in a yes given quickly when the wave hasn't crested.",
  "Sacral": "Listen to the gut sound before the words form — the uh-huh, the uh-uh. Your body answers before your mind has time to negotiate.",
  "Splenic": "Quiet, instant, only-once. Your spleen speaks in a whisper at the moment a choice arrives. Miss it, and it doesn't repeat.",
  "Ego Manifested": "Your willpower knows. If your heart wants it, you have what's needed to do it. If it doesn't, no amount of reasoning will make the energy show up.",
  "Ego Projected": "Your truth runs through what you say, in the moment of saying it. Listen to your own voice — it's how you find out what you mean.",
  "Self-Projected": "Your truth lives in the throat after passing through the G — identity speaking itself out loud. Talk it through with someone who only listens.",
  "Mental Projected": "Talk it through. Out loud, with people who know you. Your clarity comes from sounding the decision, not from sitting alone with it.",
  "Lunar": "Twenty-eight days. No major decision without a full lunar cycle of moving through the pattern. Time is the authority; the moon keeps it.",
  "None": "No fixed inner authority — your design carries something else as guide. (We'll go deeper into this in the Journey Narrative.)",
};

export const STRATEGY_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "Wait to respond.",
  "Manifesting Generator": "Wait to respond, then inform.",
  "Manifestor": "Inform before you act.",
  "Projector": "Wait for the invitation.",
  "Reflector": "Wait a lunar cycle.",
};

// ── Profile copy ───────────────────────────────────────────────────────────────
// 12 conscious/unconscious profile combinations. Drafts; revise to your voice.
export const PROFILE_DESCRIPTIONS: Record<string, string> = {
  "1/3": "The investigator who learns by trial. You go deep into the foundation, then test what you found by walking into it. Not all errors are mistakes; most are research.",
  "1/4": "The investigator-friend. You build deep knowledge and share it through the people you already trust. Networks are your transmission line.",
  "2/4": "The natural-friend. You have a gift you mostly forget you have, until someone you know calls it out. Your work moves through invitation, not advertisement.",
  "2/5": "The hermit-heretic. People project onto you — saviour, betrayer, both. Solitude is how you stay yourself; emergence is when you're called for the practical fix.",
  "3/5": "The experimental-heretic. You learn by trying, fail forward in public, and the world keeps offering you problems to solve.",
  "3/6": "The experimental-role-model. First half of life: trial and error, on the ground. Second half: living from the roof, watching, having lived enough to know.",
  "4/6": "The opportunist-role-model. Influence runs through your network and your example. People watch how you walk.",
  "4/1": "The opportunist-investigator. Networks of friends meeting deep foundational knowledge. The bridge between trust and rigour.",
  "5/1": "The heretic-investigator. People expect you to solve it. You will, if the foundation is solid. Get clear on what you actually know before you arrive.",
  "5/2": "The heretic-hermit. Called out for what you didn't ask to be known for. Your privacy isn't a luxury — it's how you stay sane.",
  "6/2": "The role-model-hermit. Three life chapters: the trial years, the rooftop years, and the wisdom years. Most of your transmission happens in chapter three.",
  "6/3": "The role-model-experimental. You live and learn until the wisdom is unmistakable, even to you.",
};
