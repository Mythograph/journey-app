// Cosmic Core — the Life Questions narrative (prototype).
//
// A rework of the Journey Narrative that organizes the reading around plain
// questions a person asks about their own life, instead of the fourteen
// stages of the hero's/heroine's journey. Mythic imagery stays as seasoning
// (the Herald, the Tide), but every chapter answers a question the reader
// already carries, and every placement is grounded in the body: which center
// the gate sits in, whether that center is defined or open, and which channel
// it completes or reaches toward.
//
// Four parts:
//   I.   How I'm Built       — type & profile, centers, how I move, how I decide
//   II.  Where I've Been     — South Node + generation, Saturn/Jupiter, Chiron/Mars, Moon
//   III. What I'm Here For   — cross (Sun/Earth told once), Mercury/Venus, North Node/Neptune
//   IV.  Where I Belong      — the hinge, the Village Journey (Gene Keys), recap
//   then the existing closing module (THE PEN through THE LINE).
//
// Rules the builder enforces so output stays readable for any chart:
//   - One name per gate in the Human Design chapters: "Gate N (Traditional
//     Name)". Quantum names and Gene Keys names stay out of Parts I to III.
//   - Each planet chapter opens with one plain sentence on what that planet
//     describes, so the reader never has to guess why it is in that chapter.
//   - A gate is grounded in the body once. Later chapters refer back to it
//     by number and name without re-explaining.
//   - Chiron is narrated but never defines a channel or center.

import { GATES, type GateBand, type GateField } from "./gates.js";
import { TYPE_PROFILES, type HdTypeName } from "./types.js";
import { PROFILE_LINES } from "./profiles.js";
import { CENTERS, CENTER_ORDER, type CenterName } from "./centers.js";
import { CROSS_VARIATIONS, crossVariation } from "./crosses.js";
import { crossDescription } from "./cross-descriptions.js";
import { PROFILE_EXPERIMENTS, type Authority } from "./navigation.js";
import { REFLECTION_MARKER, injectReflectionPrompts } from "./reflections.js";
import type { GeneKeysProfile } from "./gene-keys.js";
import { gateMoment } from "./gate-moments.js";
import { buildPrimer } from "./primer.js";
import { villageViews, type SequenceView, type SphereView } from "./village.js";
import {
  CHANNEL_SPECS,
  GATE_TO_CENTER,
  CENTER_GATE_LIST,
  channelsForGate,
  partnerGate,
  channelLabel,
  type ChannelSpec,
  type EmotionalWave,
} from "./channels.js";
import {
  buildClosingModule,
  type HumanDesignProfile,
} from "./narrative.js";

// ─── Input ────────────────────────────────────────────────────────────────────

export type Side = "conscious" | "unconscious";

export interface Activation {
  /** Sun, Earth, Moon, NorthNode, SouthNode, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron */
  planet: string;
  gate: number;
  line?: number | null;
  side: Side;
}

export interface LifeQuestionsInput {
  profile: HumanDesignProfile;
  geneKeys: GeneKeysProfile;
  activations: Activation[];
}

// ─── Section metadata (for the reading page / previews) ──────────────────────

export interface LifeQuestionSection {
  key: string;      // ALL-CAPS heading as emitted in the text
  title: string;    // reader-facing title
  part: string;     // which of the four parts it belongs to
  term?: string;    // the Human Design term this chapter teaches, shown as a kicker
}

export const LIFE_QUESTIONS_PARTS = [
  "How I'm Built",
  "Where I've Been",
  "What I'm Here For",
  "Where I Belong",
  "Writing It Forward",
] as const;

export const LIFE_QUESTIONS_SECTIONS: LifeQuestionSection[] = [
  { key: "WHAT KIND OF ENERGY DO I HAVE",     title: "What kind of energy do I have?",               part: "How I'm Built", term: "Energy type" },
  { key: "WHAT ROLE AM I HERE TO PLAY",       title: "What role am I here to play?",                 part: "How I'm Built", term: "Profile" },
  { key: "WHERE IS MY ENERGY STEADY",         title: "Where is my energy steady, and where do I borrow it?", part: "How I'm Built", term: "Defined and open centers" },
  { key: "HOW DO I MOVE",                     title: "How do I move through the world?",             part: "How I'm Built", term: "Strategy" },
  { key: "HOW DO I KNOW WHAT IS RIGHT",       title: "How do I know what's right for me?",           part: "How I'm Built", term: "Authority" },
  { key: "WHAT DID I START OUT CARRYING",     title: "What did I start out carrying?",               part: "Where I've Been", term: "South Node · Uranus · Pluto" },
  { key: "WHAT KEEPS TESTING ME",             title: "What keeps testing me?",                       part: "Where I've Been", term: "Saturn · Jupiter" },
  { key: "WHERE AM I MOST TENDER",            title: "Where am I most tender?",                      part: "Where I've Been", term: "Chiron · Mars" },
  { key: "WHAT KEEPS ME GOING",               title: "What keeps me going?",                         part: "Where I've Been", term: "Moon" },
  { key: "WHAT IS MY LIFE ABOUT",             title: "What is my life about?",                       part: "What I'm Here For", term: "Sun · Earth · Incarnation cross" },
  { key: "HOW DOES WHAT I CARRY COME OUT",    title: "How does what I carry come out?",              part: "What I'm Here For", term: "Mercury · Venus" },
  { key: "WHERE IS MY LIFE PULLING ME",       title: "Where is my life pulling me?",                 part: "What I'm Here For", term: "North Node · Neptune" },
  { key: "AM I MADE FOR THIS MOMENT?",        title: "Am I made for this moment?",                   part: "Where I Belong" },
  { key: "WHAT IS MY GENIUS",                 title: "What is my genius?",                           part: "Where I Belong", term: "Gene Keys · Activation Sequence" },
  { key: "HOW DO I LOVE AND CONNECT",         title: "How do I love and connect?",                   part: "Where I Belong", term: "Gene Keys · Venus Sequence" },
  { key: "WHAT DO I OFFER THE WORLD",         title: "What do I offer the world?",                   part: "Where I Belong", term: "Gene Keys · Pearl Sequence" },
  { key: "WHO I AM",                          title: "What matters most",                            part: "Where I Belong" },
  { key: "THE PEN",                           title: "The Pen",                                      part: "Writing It Forward" },
  { key: "THE EDGE",                          title: "The Edge",                                     part: "Writing It Forward" },
  { key: "THE RANGE",                         title: "The Range",                                    part: "Writing It Forward" },
  { key: "THE TURN",                          title: "The Turn",                                     part: "Writing It Forward" },
  { key: "THE SCENE",                         title: "The Scene",                                    part: "Writing It Forward" },
  { key: "THE LINE",                          title: "The Line",                                     part: "Writing It Forward" },
];

// ─── Static copy ──────────────────────────────────────────────────────────────

const MOTORS = new Set<CenterName>(["Sacral", "SolarPlexus", "Root", "Ego"]);

const CENTER_THEME: Record<CenterName, string> = {
  Head: "inspiration and mental pressure",
  Ajna: "thinking and making sense of things",
  Throat: "expression and action",
  G: "identity, love and direction",
  Ego: "willpower and self-worth",
  Sacral: "life-force and work energy",
  SolarPlexus: "emotions",
  Spleen: "instinct, health and timing",
  Root: "pressure and drive",
};

// What a person with this center open feels when someone completes one of
// their hanging gates there.
const BORROWED: Record<CenterName, string> = {
  Head: "a rush of inspiration or mental pressure that seems to come out of nowhere",
  Ajna: "sudden certainty, ideas clicking into place faster than usual",
  Throat: "an urge to speak up and be seen",
  G: "a clear sense of direction that fades when they leave",
  Ego: "a surge of willpower and the urge to promise and prove",
  Sacral: "a surge of steady, Generator-like energy: focus that suddenly comes easily, a rhythm I can keep, the power to push through",
  SolarPlexus: "moods that feel like mine but belong to the connection",
  Spleen: "a sense of safety and wellbeing, or a fear that isn't mine",
  Root: "pressure to hurry and get things done",
};

const TYPE_RHYTHM: Partial<Record<HdTypeName, string>> = {
  "Manifestor": "bursts of initiation followed by real rest",
  "Projector": "focused bursts of guidance with plenty of recovery between them",
  "Reflector": "sampling the energy around me and resting when it is done",
};

const NOT_SELF_DETAIL: Record<HdTypeName, string> = {
  "Manifestor": "Anger usually carries a message: someone was caught off guard, or I was trying to move on someone else's terms.",
  "Generator": "Frustration usually means I said yes with my head instead of my gut, or I'm pushing at a door that never opened for me.",
  "Manifesting Generator": "Frustration means I committed to something my gut never answered. Anger means I moved fast and forgot to tell the people my speed would affect.",
  "Projector": "Bitterness usually means I offered guidance nobody asked for, or I'm pouring myself into a place that doesn't see me.",
  "Reflector": "Disappointment usually means I decided too fast, or I'm living among people or places that don't feel good to be in.",
};

// How I move: an image, the practice, and the language for it.
const STRATEGY_DEEP: Record<HdTypeName, string[]> = {
  "Manifestor": [
    "In the old stories, a herald rides ahead of the queen. The herald announces that she is coming, so the gates open and no one reaches for a weapon. My strategy as a Manifestor asks me to be my own herald: to inform before I act.",
    "Informing is different from asking permission. Asking hands my power to someone else and waits for their yes. Informing keeps the decision mine and lets the people it touches know what is coming. \"Just letting you know, I'm taking Friday off.\" \"I've decided to step back from the committee, and I wanted you to hear it from me first.\" The sentence is short, and what it does is large. People who aren't caught off guard push back far less, and the resistance that used to meet me at every turn begins to thin.",
    "I don't have to inform everyone about everything. I inform the people my action will touch, starting with the one or two closest to it. Over time it stops feeling like a task and becomes a rhythm, the way the herald's horn becomes part of the procession.",
  ],
  "Generator": [
    "A tuning fork doesn't decide to ring. Something strikes it, and it answers with its true note. My strategy as a Generator is to respond: to let life bring something to me and notice what my body answers before my mind starts arguing.",
    "The answer is usually a sound or a pull. An \"uh-huh\" that rises before I've thought it through, or an \"unh-unh\" that closes like a door. It helps to let people ask me yes-or-no questions: \"Do you want to take this on?\" \"Is this the right project for you right now?\" My gut answers those far better than it answers \"What do you want to do with your life?\"",
    "Responding doesn't mean waiting passively. My life is full of things to respond to: an email, a conversation, an idea someone else had, a sign on a wall. The practice is to let those arrive and answer the ones my body lights up for, and to stop starting things from pure willpower.",
  ],
  "Manifesting Generator": [
    "A tuning fork doesn't decide to ring. Something strikes it, and it answers with its true note, then the sound carries fast and far. My strategy as a Manifesting Generator is to respond first, then inform, then move.",
    "The response is a gut answer, an \"uh-huh\" or an \"unh-unh\" that arrives before my mind has a case. Once the yes is real, I am built to move quickly and often on several tracks at once, skipping steps that turn out not to matter. Before I leap, I let the people my speed will affect know what's coming: \"I'm switching this project to a new approach this week.\"",
    "Quitting things is part of my design. When my gut stops answering, the energy is finished, and dropping what's done makes room for what's next. The practice is to trust the response, inform as I go, and let my path be non-linear without apologizing for it.",
  ],
  "Projector": [
    "At the crossroads in the old stories, the guide doesn't chase travelers down the road. The ones who need her come and ask. My strategy as a Projector is to wait for the invitation, especially for the big things: work, love, where I live, who I guide.",
    "Waiting for the invitation is different from waiting for my life to start. I study what fascinates me, I get very good at it, and I make myself visible in ways that let the right people find me. When someone asks, \"What do you see here?\" or \"Would you work with me on this?\", my insight lands. When I offer it unasked, it tends to slide off or provoke.",
    "Recognition is the key ingredient. An invitation from someone who doesn't really see me is worth declining. The right one feels like being seen, and that is where my energy goes furthest.",
  ],
  "Reflector": [
    "The moon doesn't decide in a single night. It moves through every phase before it returns to where it began. My strategy as a Reflector is to wait about a full lunar cycle, roughly twenty-eight days, before any big decision.",
    "Over that cycle the Moon moves through all 64 gates and lights up my open centers one by one, so I get to feel a choice from every angle. Talking it through with people I trust along the way helps me hear what stays true. \"I'll have an answer for you next month\" is a complete sentence for me.",
    "My environment matters more than almost anything. Because I take in so much of the people and places around me, the right community is the first decision, and many others follow from it.",
  ],
};

// Short forms for the "put together" sentence and the recap.
const STRATEGY_STEP: Record<HdTypeName, string> = {
  "Manifestor": "Then I inform. Then I initiate",
  "Generator": "Then I respond to what life brings, and give my energy only to what my gut says yes to",
  "Manifesting Generator": "Then I respond, inform, and move",
  "Projector": "Then I wait for the invitation that truly sees me",
  "Reflector": "Then I talk it through, and decide once the cycle has passed",
};

const STRATEGY_SHORT: Record<HdTypeName, string> = {
  "Manifestor": "I inform the people my actions touch, then I act",
  "Generator": "I respond to what life brings, and follow my gut's yes",
  "Manifesting Generator": "I respond, inform, and move fast once the yes is real",
  "Projector": "I wait for invitations from people who truly see me",
  "Reflector": "I give big decisions a full lunar cycle",
};

const AUTHORITY_STEP: Record<Authority, string> = {
  "Emotional": "I wait for clarity",
  "Sacral": "I listen for my gut's answer",
  "Splenic": "I catch the first quiet knowing",
  "Ego Manifested": "I check whether my heart is really in it",
  "Ego Projected": "I talk until I hear what my heart wants",
  "Self-Projected": "I talk it through and listen to my own voice",
  "Mental Projected": "I talk it out with trusted people in the right places",
  "Lunar": "I let a full moon cycle pass",
  "None": "I give it time",
};

const AUTHORITY_SHORT: Record<Authority, string> = {
  "Emotional": "I wait for my emotional wave to settle before I commit",
  "Sacral": "I trust my gut's yes or no in the moment",
  "Splenic": "I trust the quiet first knowing, which speaks only once",
  "Ego Manifested": "I commit only when my heart is really behind it",
  "Ego Projected": "I talk it through until I hear what my heart wants",
  "Self-Projected": "I hear my truth in my own voice as I talk it through",
  "Mental Projected": "I talk it out with trusted people and notice where I feel clear",
  "Lunar": "I let a full lunar cycle pass before big decisions",
  "None": "I give big decisions time and notice what stays true",
};

// How I decide: an image and a working rule for every authority. Emotional
// gets its wave-typing paragraphs inserted between these two by the builder.
const AUTHORITY_DEEP: Record<Authority, { open: string[]; rule: string }> = {
  "Emotional": {
    open: [
      "The shore shows what is really on it once the tide goes out. My authority works the same way. It is emotional, which means my truth lives in my Solar Plexus and reveals itself over time. In the first rush of excitement or dread, I can't see clearly yet. When the wave has moved through and I still feel the same way, I know.",
    ],
    rule: "For small things, a night is enough. For big ones, I give myself a week or more, and notice how it feels in the morning and in the evening, on a bright day and a heavy one. If someone needs an answer before I have one, I can say so: \"I don't decide on the spot. I'll let you know by Friday.\"",
  },
  "Sacral": {
    open: [
      "My body answers before my mind does. My authority is sacral, which means my truth arrives as a gut response in the moment: a lift, a pull, an \"uh-huh,\" or a drop and an \"unh-unh.\" It is fast, and it is honest, and my mind is very good at talking me out of it.",
    ],
    rule: "My working rule: if the question can be asked as a yes or no, I let my body answer it out loud before I explain anything. When my gut says yes and my head says \"but,\" the gut is the one to trust. When there is no response at all, the answer is not yet.",
  },
  "Splenic": {
    open: [
      "An animal in the forest freezes before it knows why. My authority is splenic, which means my truth comes as a quiet, in-the-moment knowing about what is safe and healthy for me. It speaks once, softly, and it doesn't repeat itself.",
    ],
    rule: "My working rule: I act on the first quiet knowing, even when I can't explain it yet. If I find myself overriding a small inner \"no\" to be polite or logical, I slow down and listen again. Waiting too long turns that knowing into doubt.",
  },
  "Ego Manifested": {
    open: [
      "My truth lives in my will. My authority runs through my heart center, which means the question is always whether I genuinely want something, and I often hear the answer in what comes out of my mouth before I've planned it.",
    ],
    rule: "My working rule: I make promises only when I really want what I'm promising. \"I should\" is a warning sign. \"I want to\" is my yes. Rest and self-care are part of keeping my word, because my will is a muscle.",
  },
  "Ego Projected": {
    open: [
      "My truth lives in my heart, and I hear it in my own voice. My authority is ego projected, which means the question is whether I genuinely want something, and the answer surfaces when the right person asks me and I talk.",
    ],
    rule: "My working rule: I talk important choices through with someone who asks good questions and doesn't push. When I hear myself say \"I want,\" I listen. When I hear \"I should,\" I wait.",
  },
  "Self-Projected": {
    open: [
      "My truth lives in my voice once it has passed through my sense of who I am. My authority is self-projected, which means I find out what is right for me by talking, and listening to what I say.",
    ],
    rule: "My working rule: I talk big decisions out loud with someone who will listen without advising. The answer is in whether what I'm saying sounds like me and points toward where my life wants to go.",
  },
  "Mental Projected": {
    open: [
      "My truth emerges from the conversation and the place. My authority is environmental, which means I find clarity by talking things through with people I trust, in places where I feel well, and noticing what I hear myself say.",
    ],
    rule: "My working rule: I use trusted people as sounding boards, never as deciders, and I pay attention to how different places make me feel. I am still the one who knows.",
  },
  "Lunar": {
    open: [
      "The moon is my clock. My authority is lunar, which means no major decision is made until a full cycle, about twenty-eight days, has passed and I have felt the question from every side.",
    ],
    rule: "My working rule: I refuse to be rushed on the big things. I talk the choice through across the whole cycle and let time show me what stays true.",
  },
  "None": {
    open: [
      "My design carries no single fixed inner authority, which is rare. My clarity comes through time, my environment, and the people I trust.",
    ],
    rule: "My working rule: I make big decisions slowly and notice what stays clear over time, rather than what feels urgent in the moment.",
  },
};

const WAVE_COPY: Record<EmotionalWave, (c: ChannelSpec, extra: string) => string> = {
  tribal: (c, extra) =>
    `The tribal wave of need runs through my ${channelLabel(c)}. It is about needs, touch, belonging, and the terms of my relationships. This wave builds quietly, ratcheting up in small steps. I let small things slide, leave a need unspoken, swallow a sense that something isn't fair, until the pressure breaks open over something minor. When I suddenly erupt about the dishes, the dishes are rarely the point. The eruption is telling me that a need went unmet, or that the terms of a relationship stopped feeling fair, some time ago.${extra}`,
  individual: (c, extra) =>
    `The individual wave runs through my ${channelLabel(c)}. It moves in sudden spikes and long flat stretches, from passion to melancholy, and often the mood has no cause I can point to. It isn't asking to be fixed. Melancholy is where much of my creativity comes from, and the spikes pass on their own when I let them.${extra}`,
  abstract: (c, extra) =>
    `The abstract wave of desire runs through my ${channelLabel(c)}. This is the wave of longing and new experience. It rises slowly with anticipation, imagining what could be, and then drops sharply when reality doesn't match the dream. The meaning of an experience often arrives after it's over, when I can look back on it.${extra}`,
};

const WAVE_NAME: Record<EmotionalWave, string> = {
  tribal: "tribal",
  individual: "individual",
  abstract: "abstract",
};

// Plain-language framing for each planet, so the reader knows why a planet
// belongs in the chapter it appears in.
const PLANET_PLAIN = {
  SouthNode: "The South Node describes the scenery of the first part of my life: the places, people and patterns I was born into and practiced early, often before I had any say.",
  Generation: "Two slow-moving planets, Uranus and Pluto, stay in the same gate for years, so I share them with nearly everyone born around the time I was. They describe the times I arrived in more than my personal story.",
  Saturn: "Saturn is the strict teacher in a chart. It shows where I have to build mastery slowly, usually by getting it wrong a few times first.",
  Jupiter: "Jupiter is where life opens up and support finds me, usually once I've done the work Saturn asks for.",
  Chiron: "Chiron marks the wound that becomes medicine: the place I have hurt most, and over time, the place I can help other people most.",
  Mars: "Mars is raw drive. On my unconscious side, it holds the immature energy I grow up through, and often an old ache about my worth. On my conscious side, it shows what I'll stand up for.",
  Moon: "The Moon is the part of me that knows what I need before my mind catches up: my moods, my hungers, my sense of safety. In Human Design it is the driving force, the motivation that keeps me moving after ambition runs out.",
  Mercury: "Mercury is how I think out loud: the way I speak, write, and make ideas land.",
  Venus: "Venus describes what I value and find beautiful, and the principles I organize my relationships and my work around.",
  NorthNode: "The North Node describes the scenery of the second part of my life. Somewhere around my late thirties to mid-forties, the backdrop shifts, and life starts pulling me toward it.",
  Neptune: "Neptune is quieter. It shows where my life opens into something larger than me, and also where I can lose my edges or drift into fog.",
};

const PROMPTS: Record<string, (p: HumanDesignProfile) => string> = {
  "WHAT KIND OF ENERGY DO I HAVE": () =>
    "When have I felt most like this description of myself, and when have I tried hardest to be something else? What did trying cost me?",
  "WHAT ROLE AM I HERE TO PLAY": () =>
    "Looking back, how have the biggest openings in my life actually found me? What did I need in place before I felt ready to step through?",
  "WHERE IS MY ENERGY STEADY": () =>
    "Where do I feel most unmistakably like myself, and where do I quietly take on energy that is not mine? When this week did I feel the difference in my body?",
  "HOW DO I MOVE": () =>
    "What is one thing I could practice this week that matches how I'm built to move? What do I usually do instead?",
  "HOW DO I KNOW WHAT IS RIGHT": () =>
    "What decision am I holding right now? What would it look like to make it the way my design decides, instead of the way I usually do?",
  "WHAT DID I START OUT CARRYING": () =>
    "What was the story my early world told me about who I was and what was possible? Which parts of it am I still living out without choosing to?",
  "WHAT KEEPS TESTING ME": () =>
    "What test keeps returning to me in different costumes? If it's training, what is it training me for?",
  "WHERE AM I MOST TENDER": () =>
    "Where does my oldest ache still ask something of me? How has it already made me useful to someone else?",
  "WHAT KEEPS ME GOING": () =>
    "What do I need in order to feel resourced, and when did I last give it to myself without earning it first?",
  "WHAT IS MY LIFE ABOUT": () =>
    "Looking back, what theme has my life kept returning to, no matter how far I wandered? Where do I see it right now?",
  "HOW DOES WHAT I CARRY COME OUT": () =>
    "How does what is true in me want to come out, in words, in making, in presence? Where do I dilute it before anyone hears it?",
  "AM I MADE FOR THIS MOMENT?": () =>
    "What is happening in my time that seems to need something I carry? Where do I feel called beyond my own becoming?",
  "WHAT IS MY GENIUS": () =>
    "Where does my genius show up without effort? Who noticed it in me before I did?",
  "HOW DO I LOVE AND CONNECT": () =>
    "Who have I been drawn to again and again, and what pattern do I see now? What would it mean to meet my core wound with care?",
  "WHAT DO I OFFER THE WORLD": () =>
    "What would I offer if I weren't trying to prove anything? Where do people already recognize me for it?",
  "WHERE IS MY LIFE PULLING ME": () =>
    "What would it mean to lean all the way into where I am going, instead of half-protecting myself from it?",
};

// ─── Chart context ────────────────────────────────────────────────────────────

interface Ctx {
  activations: Activation[];
  definedGates: Set<number>;          // excludes Chiron
  definedChannels: ChannelSpec[];
  definedCenters: Set<CenterName>;
  grounded: Set<number>;
  centersExplained: Set<CenterName>;
  usedFullChannel: boolean;
  usedFullHanging: boolean;
  hangingCount: number;
  briefed: Set<number>;
  shortUsedLight: boolean;
}

function buildCtx(activations: Activation[]): Ctx {
  const definedGates = new Set(activations.filter(a => a.planet !== "Chiron").map(a => a.gate));
  const definedChannels = CHANNEL_SPECS.filter(c => c.gates.every(g => definedGates.has(g)));
  const definedCenters = new Set<CenterName>();
  for (const c of definedChannels) c.centers.forEach(x => definedCenters.add(x));
  return { activations, definedGates, definedChannels, definedCenters, grounded: new Set(), centersExplained: new Set(), usedFullChannel: false, usedFullHanging: false, hangingCount: 0, briefed: new Set(), shortUsedLight: false };
}

const PLANET_LABEL: Record<string, string> = {
  Sun: "Sun", Earth: "Earth", Moon: "Moon", Mercury: "Mercury", Venus: "Venus",
  Mars: "Mars", Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus",
  Neptune: "Neptune", Pluto: "Pluto", NorthNode: "North Node", SouthNode: "South Node",
  Chiron: "Chiron",
};

function centerName(c: CenterName): string {
  return CENTERS[c].displayName;
}

function g(n: number | null | undefined): string {
  if (!n || !GATES[n]) return "an unknown gate";
  return `Gate ${n} (${GATES[n].traditionalName})`;
}

function expr(n: number | null | undefined, band: GateBand, field: GateField = "short"): string {
  if (!n || !GATES[n]) return "";
  return GATES[n][band][field];
}

function planetsIn(ctx: Ctx, gate: number): string[] {
  const names = [...new Set(ctx.activations.filter(a => a.gate === gate).map(a => PLANET_LABEL[a.planet] ?? a.planet))];
  return names;
}

function listAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * Ground a gate in the body: center, defined/open, and its channel (complete,
 * or the partner gate it reaches toward). Returns "" if already grounded.
 */
function ground(ctx: Ctx, gate: number | null | undefined): string {
  if (!gate || !GATES[gate] || ctx.grounded.has(gate)) return "";
  ctx.grounded.add(gate);

  const center = GATE_TO_CENTER[gate];
  const defined = ctx.definedCenters.has(center);
  const chans = channelsForGate(gate);
  const mine = chans.find(c => ctx.definedChannels.includes(c));

  // Name the center's theme the first time it comes up only.
  const theme = ctx.centersExplained.has(center) ? "" : `, the center of ${CENTER_THEME[center]}`;
  ctx.centersExplained.add(center);
  const where = `Gate ${gate} sits in my ${defined ? "defined" : "open"} ${centerName(center)}${theme}`;

  if (ctx.briefed.has(gate)) {
    if (mine && ctx.definedGates.has(gate)) return `Gate ${gate} is half of my ${channelLabel(mine)}, so it is consistent in me.`;
    const pg = chans.map(c => partnerGate(c, gate));
    const pp = pg.find(x => planetsIn(ctx, x).length > 0) ?? pg[0];
    if (!pp) return "";
    const w = planetsIn(ctx, pp);
    return w.length
      ? `Gate ${gate}'s channel partner is ${g(pp)}, where my ${listAnd(w)} sits, but the channel isn't complete.`
      : `Gate ${gate}'s channel partner is ${g(pp)}, which isn't in my chart, so I feel this energy most fully around people who carry it.`;
  }

  if (mine && ctx.definedGates.has(gate)) {
    if (!ctx.usedFullChannel) {
      ctx.usedFullChannel = true;
      return `${where}, and it is half of my ${channelLabel(mine)}. A complete channel like this runs the same way every day, and other people feel it coming from me.`;
    }
    return `${where}, as half of my ${channelLabel(mine)}, so it is consistent in me.`;
  }

  // Prefer a partner gate where something of mine sits (often Chiron).
  const partners = chans.map(c => partnerGate(c, gate));
  const withPlanet = partners.find(p => planetsIn(ctx, p).length > 0);
  const p = withPlanet ?? partners[0];
  const who = p ? planetsIn(ctx, p) : [];

  if (!ctx.usedFullHanging) {
    ctx.usedFullHanging = true;
    let s = `${where}. ${defined ? "Because that center is defined, this is a steady part of me." : "Because that center is open, this energy doesn't run the same way every day."}`;
    if (p) {
      const tail = who.length ? `, where my ${listAnd(who)} sits without completing the channel` : ", which my chart doesn't carry";
      s += ` It is half of a channel, reaching toward ${g(p)} in my ${centerName(GATE_TO_CENTER[p])}${tail}. I feel its full current most around people who carry that other half.`;
    }
    return s;
  }
  // Chiron marks a gate without activating it.
  if (!ctx.definedGates.has(gate)) {
    let s = `${where}. Chiron marks this gate without activating it, so it works as a theme in my life more than an energy I broadcast.`;
    if (p && who.length) s += ` Its partner, ${g(p)}, is where my ${listAnd(who)} sits.`;
    return s;
  }
  let s = `${where}, so it ${defined ? "is steady in me" : "comes and goes"}.`;
  if (p) {
    if (who.length) {
      s += ` Its partner, ${g(p)}, holds my ${listAnd(who)}, but the channel isn't complete.`;
    } else {
      const variants = [
        `Its partner, ${g(p)}, isn't in my chart, so I feel this one most fully around people who carry it.`,
        `Its partner, ${g(p)}, isn't in my chart. Someone who carries it completes the circuit for me.`,
        `Its partner, ${g(p)}, belongs to other people, so this energy comes most alive in company.`,
      ];
      s += " " + variants[ctx.hangingCount++ % variants.length];
    }
  }
  return s;
}

function groundAll(ctx: Ctx, gates: (number | null | undefined)[]): string {
  const seen = new Set<number>();
  const parts: string[] = [];
  for (const gt of gates) {
    if (!gt || seen.has(gt)) continue;
    seen.add(gt);
    const s = ground(ctx, gt);
    if (s) parts.push(s);
  }
  return parts.join(" ");
}

/** "My North Node is in Gate 39 (Provocation) on both my conscious and unconscious sides" */
function placement(label: string, c: number | null, u: number | null): string {
  if (c && u && c === u) return `My ${label} is in ${g(c)} on both my conscious and unconscious sides`;
  if (c && u) return `My conscious ${label} is in ${g(c)}, and my unconscious ${label} is in ${g(u)}`;
  const x = c || u;
  return x ? `My ${label} is in ${g(x)}` : "";
}

/** Two band phrases joined, collapsing a repeated gate. */
function pairExpr(c: number | null, u: number | null, band: GateBand, field: GateField = "short", joiner = "and"): string {
  if (c && u && c === u) return expr(c, band, field);
  const a = expr(c, band, field), b = expr(u, band, field);
  return a && b ? `${a}, ${joiner} ${b}` : (a || b);
}

// ─── Sections ─────────────────────────────────────────────────────────────────

// The detail layer speaks in the chart reader's voice ("you"), answering the
// reader's own first-person short version. Quoted speech stays as written.
const SECOND_PERSON: [RegExp, string][] = [
  [/\bam I\b/g, "are you"], [/\bI (\w+ly) am\b/g, "you $1 are"], [/\bI (\w+ly) was\b/g, "you $1 were"], [/\bI am\b/g, "you are"], [/\bI'm\b/g, "you're"], [/\bI've\b/g, "you've"],
  [/\bI'll\b/g, "you'll"], [/\bI'd\b/g, "you'd"], [/\bI was\b/g, "you were"], [/\bI\b/g, "you"],
  [/\bmyself\b/g, "yourself"], [/\bmine\b/g, "yours"], [/\bmy\b/g, "your"], [/\bMy\b/g, "Your"],
  [/\bme\b/g, "you"],
];

export function toSecondPerson(text: string): string {
  return text
    .split(/("[^"]*")/)
    .map(part => {
      if (part.startsWith("\"")) return part;
      let out = part;
      for (const [re, rep] of SECOND_PERSON) out = out.replace(re, rep);
      return out.replace(/(^|[.!?:]\s+)you\b/g, (_m, pre) => `${pre}You`);
    })
    .join("");
}

// Two layers: the short version (always visible), the writing prompt, then the
// full chart detail, each detail paragraph led by DETAIL_MARKER so the reading
// page can fold it away under "In my chart".
function withPrompt(heading: string, body: string[], profile: HumanDesignProfile, short?: string[], whatIs?: string): string {
  const detail = body.filter(Boolean);
  const top = (short ?? []).filter(Boolean);
  const prompt = PROMPTS[heading]?.(profile);
  const note = whatIs ? [WHATIS_MARKER + whatIs] : [];
  if (!top.length) {
    if (prompt) detail.push(REFLECTION_MARKER + prompt);
    return [heading, ...note, ...detail].join("\n\n");
  }
  const out = [heading, ...note, ...top];
  if (prompt) out.push(REFLECTION_MARKER + prompt);
  out.push(...detail.map(d => DETAIL_MARKER + toSecondPerson(d)));
  return out.join("\n\n");
}

// Each section builds its short version first (which marks the gates it
// briefly grounds), then a detail layer that only adds to it: the other side
// of the chart, the channel story, and the longer interpretive copy.

/** "My unconscious Moon is in Gate 9 (Focus)", only when it differs from the conscious one. */
function sides(
  label: string,
  c: number | null,
  u: number | null,
  descC: (n: number) => string,
  descU: (n: number) => string = descC,
): string {
  if (c && u && c === u) return `My ${label} is in ${g(c)} on both my conscious and unconscious sides. ${descC(c)}`;
  const out: string[] = [];
  if (c) out.push(`My conscious ${label} is in ${g(c)}. ${descC(c)}`);
  if (u) out.push(`My unconscious ${label}, running underneath, is in ${g(u)}. ${descU(u)}`);
  return out.join(" ");
}

function sectionType(p: HumanDesignProfile, ctx: Ctx): string {
  if (!p.type) return "";
  const t = TYPE_PROFILES[p.type];
  const short = [TYPE_MIRROR[p.type], `That's what it feels like to be a ${t.name}. ${TYPE_ESSENCE[p.type]}`];
  return withPrompt("WHAT KIND OF ENERGY DO I HAVE", [t.typeDescription], p, short, whatIsType(p, ctx));
}

function sectionProfile(p: HumanDesignProfile, _ctx: Ctx): string {
  const pc = p.profileConscious, pu = p.profileUnconscious;
  if (!pc || !pu || !PROFILE_LINES[pc] || !PROFILE_LINES[pu]) return "";
  const short = [
    PROFILE_MIRROR[pc],
    `That's my ${pc}/${pu} profile, the ${PROFILE_LINES[pc].name} and the ${PROFILE_LINES[pu].name}. It means ${LINE_CONSCIOUS[pc]}, and ${LINE_UNCONSCIOUS[pu]}.`,
  ];
  const body = [
    `My conscious ${pc} line, the ${PROFILE_LINES[pc].name}, is how I see myself and meet the world. My unconscious ${pu} line, the ${PROFILE_LINES[pu].name}, is how other people often experience me before I notice it myself.`,
    PROFILE_EXPERIMENTS[pc] ?? "",
    PROFILE_EXPERIMENTS[pu] && pu !== pc ? `Underneath, my ${pu} line adds its own way of learning. ${PROFILE_EXPERIMENTS[pu]}` : "",
  ];
  return withPrompt("WHAT ROLE AM I HERE TO PLAY", body, p, short, whatIsProfile(p));
}

function sectionCenters(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortCenters(p, ctx);
  const body: string[] = [];
  const defined = CENTER_ORDER.filter(c => ctx.definedCenters.has(c));
  const open = CENTER_ORDER.filter(c => !ctx.definedCenters.has(c));
  const count = (n: number) => ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][n];

  if (defined.length) {
    body.push(defined.map(c => `In my ${centerName(c)}, ${CENTERS[c].defined}.`).join(" ") + " This is the ground I move from.");
  }
  if (open.length) {
    body.push(
      open.map(c => `In my open ${centerName(c)}, ${CENTERS[c].open}.`).join(" ") +
      " In each of these, the work is noticing when I'm amplifying something that belongs to someone else."
    );
  }

  // Hanging gates in open centers: the "borrowed energy" motif.
  for (const c of open) {
    const gates = CENTER_GATE_LIST[c].filter(x => ctx.definedGates.has(x));
    if (gates.length < 2 && !(c === "Sacral" && gates.length)) continue;
    const names = gates.map(x => `${x} (${GATES[x].traditionalName})`);
    const sides = new Set(ctx.activations.filter(a => gates.includes(a.gate) && a.planet !== "Chiron").map(a => a.side));
    let sideNote = "";
    if (sides.size === 1 && sides.has("unconscious")) sideNote = ` All of them are on the unconscious, Design side of my chart, so they run through my body below awareness.`;
    if (sides.size === 1 && sides.has("conscious")) sideNote = ` All of them are on my conscious side, so I tend to notice them in myself.`;
    let para = `My open ${centerName(c)} holds ${gates.length === 1 ? "an activated gate" : `${count(gates.length).toLowerCase()} activated gates`}: ${listAnd(names)}.${sideNote} ${gates.length === 1 ? "It is" : "Each is"} half of a channel, waiting for a matching gate in someone else's chart. When I spend time with people who carry those other halves, I can feel ${BORROWED[c]}.`;
    if (c === "Sacral") {
      para += " That surge is real, and it is borrowed. It belongs to the connection, and it fades when the person leaves.";
      const rhythm = p.type ? TYPE_RHYTHM[p.type] : undefined;
      if (rhythm) para += ` My own design is built for ${rhythm}.`;
    }
    body.push(para);
  }

  // A defining conscious light (Sun or Earth) in open ground.
  const light = [
    p.sunConscious ? { planet: "Sun", gate: p.sunConscious } : null,
    p.earthConscious ? { planet: "Earth", gate: p.earthConscious } : null,
  ].find(l => l && !ctx.definedCenters.has(GATE_TO_CENTER[l.gate]));
  if (light) {
    const c = GATE_TO_CENTER[light.gate];
    body.push(
      ctx.shortUsedLight
        ? ground(ctx, light.gate)
        : `One of my defining gifts sits in open ground. My ${light.planet} in ${g(light.gate)} lives in my open ${centerName(c)}, so the very thing I'm here to express runs through the part of me most shaped by others. It can take years to trust this gift as mine, and claiming it is some of the most important work I'll do. ${ground(ctx, light.gate)}`
    );
  }
  return withPrompt("WHERE IS MY ENERGY STEADY", body, p, short, whatIsCenters());
}

/** Shortest path of defined channels from the Throat to a motor center. */
function motorToThroat(ctx: Ctx): { motor: CenterName; path: ChannelSpec[] } | null {
  if (!ctx.definedCenters.has("Throat")) return null;
  const prev = new Map<CenterName, { from: CenterName; via: ChannelSpec }>();
  const queue: CenterName[] = ["Throat"];
  const seen = new Set<CenterName>(["Throat"]);
  while (queue.length) {
    const cur = queue.shift()!;
    if (cur !== "Throat" && MOTORS.has(cur)) {
      const path: ChannelSpec[] = [];
      let at: CenterName = cur;
      while (at !== "Throat") {
        const step: { from: CenterName; via: ChannelSpec } = prev.get(at)!;
        path.push(step.via);
        at = step.from;
      }
      return { motor: cur, path };
    }
    for (const ch of ctx.definedChannels) {
      const [a, b] = ch.centers;
      const next = a === cur ? b : b === cur ? a : null;
      if (next && !seen.has(next)) {
        seen.add(next);
        prev.set(next, { from: cur, via: ch });
        queue.push(next);
      }
    }
  }
  return null;
}

function sectionMove(p: HumanDesignProfile, ctx: Ctx): string {
  if (!p.type) return "";
  const short = shortMove(p, ctx);
  // The deep copy's middle paragraph is the practice the short version already gives.
  const deep = STRATEGY_DEEP[p.type];
  const body = [deep[0], deep[2]];

  if (p.type === "Manifestor" || p.type === "Manifesting Generator") {
    const m = motorToThroat(ctx);
    if (m) {
      body.push(
        `My design shows why this matters so much for me. My ${centerName(m.motor)} connects to my Throat through the ${listAnd(m.path.map(channelLabel))}, so my energy can turn straight into action and speech. That is the initiating power in my design. It also means I can move before anyone around me sees it coming.`
      );
    }
  }
  // The short version names the signal; the detail says what it is telling me.
  body.push(NOT_SELF_DETAIL[p.type]);
  return withPrompt("HOW DO I MOVE", body, p, short, whatIsStrategy(p));
}

function sectionDecide(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortDecide(p, ctx);
  const auth: Authority = p.authority ?? "None";
  const deep = AUTHORITY_DEEP[auth] ?? AUTHORITY_DEEP["None"];
  const body = [...deep.open];

  if (auth === "Emotional") {
    const waves = ctx.definedChannels.filter(c => c.wave);
    for (const w of waves) {
      let extra = "";
      const lifesWork = p.sunConscious;
      if (lifesWork && w.gates.includes(lifesWork)) {
        extra = ` ${g(lifesWork)} is also my conscious Sun, so this wave and my purpose are bound together. My emotions are often how I discover what matters most to me.`;
      }
      body.push(WAVE_COPY[w.wave!](w, extra));
    }
    if (waves.length >= 2) {
      body.push("My waves can stack. One rises while another builds quietly underneath, and when both drop at once, the crash can feel like burnout or failure. Often it is two waves landing at the same time, and it passes.");
    }
    const hanging = CHANNEL_SPECS.filter(c => c.wave && !ctx.definedChannels.includes(c))
      .map(c => ({ c, mine: c.gates.filter(x => ctx.definedGates.has(x)) }))
      .filter(x => x.mine.length === 1);
    if (hanging.length) {
      const bits = hanging.map(h => `Gate ${h.mine[0]}, half of the ${WAVE_NAME[h.c.wave!]} ${channelLabel(h.c)}`);
      body.push(`I also carry single gates from other waves: ${bits.join("; and ")}. These channels aren't complete in my chart, so these aren't my waves. Around people who carry the missing halves, I may feel those rhythms move through me for a while, which is worth remembering when a mood doesn't match my own patterns.`);
    }
  }
  body.push(deep.rule);
  return withPrompt("HOW DO I KNOW WHAT IS RIGHT", body, p, short, whatIsAuthority(p));
}

function sectionStart(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortStart(p, ctx);
  const body: string[] = [];
  const sc = p.southNodeConscious, su = p.southNodeUnconscious;
  body.push(PLANET_PLAIN.SouthNode + " " + sides("South Node", sc, su, n => `Early on, I practiced ${firstClause(expr(n, "low"))}. Over a lifetime, the work is to ${expr(n, "arc", "verb")}.`));
  body.push(groundAll(ctx, [sc, su]));
  const uc = p.uranusConscious, uu = p.uranusUnconscious, pc = p.plutoConscious, pu = p.plutoUnconscious;
  if (uc || pc) {
    const gen: string[] = [PLANET_PLAIN.Generation];
    if (uc || uu) gen.push(`${placement("Uranus", uc, uu)}. My generation carries a shared gift: ${pairExpr(uc, uu, "high")}.`);
    if (pc || pu) gen.push(`${placement("Pluto", pc, pu)}. Its shared shadow looks like ${pairExpr(pc, pu, "low")}. The collective work is to ${pairExpr(pc, pu, "arc", "verb", "and to")}.`);
    body.push(gen.join(" "));
    body.push(groundAll(ctx, [uc, uu, pc, pu]));
  }
  body.push("The world I grew up in had its own story about who I was and what was possible. Some of it served me. Some of it didn't. Seeing what I started out carrying is how I begin to tell the difference.");
  return withPrompt("WHAT DID I START OUT CARRYING", body, p, short);
}

function sectionTests(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortTests(p, ctx);
  const sc = p.saturnConscious, su = p.saturnUnconscious, jc = p.jupiterConscious, ju = p.jupiterUnconscious;
  const body = [
    PLANET_PLAIN.Saturn,
    sides("Saturn", sc, su, n => `The lesson starts with ${firstClause(expr(n, "low"))}, and grows into ${expr(n, "high", "gerund")}.`),
    groundAll(ctx, [sc, su]),
    PLANET_PLAIN.Jupiter,
    sides("Jupiter", jc, ju, n => `Things open up through ${expr(n, "high", "gerund")}.`),
    groundAll(ctx, [jc, ju]),
  ];
  return withPrompt("WHAT KEEPS TESTING ME", body, p, short);
}

function sectionTender(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortTender(p, ctx);
  const cc = p.chironConscious, cu = p.chironUnconscious, mu = p.marsUnconscious, mc = p.marsConscious;
  const body: string[] = [];
  if (cc || cu) {
    body.push(
      [
        PLANET_PLAIN.Chiron,
        sides("Chiron", cc, cu, n => `The tender territory here is ${firstClause(expr(n, "low"))}, and the work is to ${expr(n, "arc", "verb")}.`),
        "I'm not meant to fix or erase this wound. I cross it more deeply each time, with more capacity to hold what I find. Chiron doesn't color in gates the way the other planets do, so these gates may look blank on my bodygraph.",
      ].filter(Boolean).join(" ")
    );
    body.push(groundAll(ctx, [cc, cu]));
  }
  if (mc || mu) body.push(
    PLANET_PLAIN.Mars + " " +
    sides("Mars", mc, mu,
      n => `It shows what I'll stand up for: ${expr(n, "high")}.`,
      n => `It holds an old ache about my worth that can show up as ${firstClause(expr(n, "low"))}. The work is to ${expr(n, "arc", "verb")}.`) +
    (mc && mu ? " The ache underneath and the stand I take in the world are two ends of one fire." : "")
  );
  body.push(groundAll(ctx, [mu, mc]));
  return withPrompt("WHERE AM I MOST TENDER", body, p, short);
}

function sectionGoing(p: HumanDesignProfile, ctx: Ctx): string {
  const mc = p.moonConscious, mu = p.moonUnconscious;
  if (!mc && !mu) return "";
  const short = shortGoing(p, ctx);
  const body = [
    PLANET_PLAIN.Moon + " " + sides("Moon", mc, mu, n => `It fuels me through ${expr(n, "high", "gerund")}.`),
    groundAll(ctx, [mc, mu]),
    "My body is the first ally I have. When I listen to it and tend my needs, I'm resourced. When I override it, I lose the very support that keeps me on the path.",
  ];
  return withPrompt("WHAT KEEPS ME GOING", body, p, short);
}

function sectionAbout(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortAbout(p, ctx);
  const body: string[] = [];
  const v = crossVariation(p.incarnationCross);
  body.push(
    `This theme comes from my incarnation cross${p.incarnationCross ? `, the ${p.incarnationCross}` : ""}. It is built from the four gates of my Sun and Earth, on both sides of my chart. The Sun is the gift I'm here to give, and the Earth beneath it is the ground I stand on to give it.`
  );
  if (v) body.push(CROSS_VARIATIONS[v].description);
  const sc = p.sunConscious, ec = p.earthConscious, su = p.sunUnconscious, eu = p.earthUnconscious;
  if (sc) {
    body.push(`Consciously, my Sun is in ${g(sc)} and my Earth is in ${g(ec)}. This is the role I know I'm playing: I'm here to ${expr(sc, "high", "verb")}, standing on ${expr(ec, "high")}.`);
  }
  if (su) {
    body.push(`Underneath, my unconscious Sun is in ${g(su)} and my unconscious Earth is in ${g(eu)}. Others often recognize this in me before I do: I'm built to ${expr(su, "high", "verb")}, standing on ${expr(eu, "high")}.`);
  }
  const cd = crossDescription(sc, v);
  if (cd) body.push(cd.split(/(?<=\.)\s/).slice(1).join(" "));
  body.push(groundAll(ctx, [sc, ec, su, eu]));
  const t = p.type ? TYPE_PROFILES[p.type] : undefined;
  if (t) body.push(`As a ${t.name}, I serve the world by ${t.purposeGerund}. Most people don't fully recognize their cross until they're decades into living it.`);
  return withPrompt("WHAT IS MY LIFE ABOUT", body, p, short);
}

function sectionComesOut(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortComesOut(p, ctx);
  const mc = p.mercuryConscious, mu = p.mercuryUnconscious, vc = p.venusConscious, vu = p.venusUnconscious;
  const body = [
    PLANET_PLAIN.Mercury,
    sides("Mercury", mc, mu, n => `My voice works through ${expr(n, "high", "gerund")}.`, n => `It gives my voice a second register: ${expr(n, "high", "gerund")}.`),
    groundAll(ctx, [mc, mu]),
    PLANET_PLAIN.Venus,
    sides("Venus", vc, vu, n => `I value ${expr(n, "high")}.`, n => `I also value ${expr(n, "high")}.`),
    vc || vu ? "These values show up in how I love, what I protect, and what I choose to make." : "",
    groundAll(ctx, [vc, vu]),
  ];
  return withPrompt("HOW DOES WHAT I CARRY COME OUT", body, p, short);
}

function sectionPulling(p: HumanDesignProfile, ctx: Ctx): string {
  const short = shortPulling(p, ctx);
  const nc = p.northNodeConscious, nu = p.northNodeUnconscious;
  const body = [
    PLANET_PLAIN.NorthNode,
    sides("North Node", nc, nu, n => `It pulls me toward ${expr(n, "high", "gerund")}.`),
    groundAll(ctx, [nc, nu]),
  ];
  const ec = p.neptuneConscious, eu = p.neptuneUnconscious;
  if (ec || eu) {
    body.push(`${PLANET_PLAIN.Neptune} ${placement("Neptune", ec, eu)}. At its clearest, this is ${pairExpr(ec, eu, "high")}. In the fog, it can look like ${pairExpr(ec, eu, "low")}. When I've drifted from the thread, this is where I come back to re-anchor.`);
    body.push(groundAll(ctx, [ec, eu]));
  }
  return withPrompt("WHERE IS MY LIFE PULLING ME", body, p, short);
}

function hinge(): string {
  return `AM I MADE FOR THIS MOMENT?

Everything so far has been about me: how I'm built, where I've been, and what I'm here for. Sooner or later, a different question arrives. Is what I've found in myself meant for something happening now, something larger than me?

This is where the reading turns outward. Having found my purpose, I begin looking for where it belongs, among other people and inside the larger story unfolding in my lifetime. The Gene Keys are the lens for this part. They use the same gates as my Human Design chart, with different names, so I'll see familiar numbers in a new light.`;
}

function recap(p: HumanDesignProfile): string {
  const t = p.type ? TYPE_PROFILES[p.type] : undefined;
  const lines: string[] = ["WHO I AM — A RECAP", "Before the story gets too long to hold, here is what matters most."];
  if (t) lines.push(`My nature: I'm a ${t.name}. I serve by ${t.purposeGerund}.`);
  if (p.type) {
    const auth: Authority = p.authority ?? "None";
    lines.push(`How I move and decide: ${STRATEGY_SHORT[p.type]}. ${AUTHORITY_SHORT[auth]}.`);
  }
  if (p.sunConscious) lines.push(`What my life is about: ${pairExpr(p.sunConscious, p.sunUnconscious, "high")}.`);
  if (p.southNodeConscious) lines.push(`Where I'm growing: I'm learning to ${pairExpr(p.southNodeConscious, p.southNodeUnconscious, "arc", "verb", "and to")}.`);
  if (p.moonConscious) lines.push(`What keeps me going: ${pairExpr(p.moonConscious, p.moonUnconscious, "high", "gerund")}.`);
  if (p.northNodeConscious) lines.push(`Where I'm headed: toward ${pairExpr(p.northNodeConscious, p.northNodeUnconscious, "high", "gerund")}.`);
  return lines.join("\n\n");
}

// ─── Short versions (the always-visible layer) ───────────────────────────────
// Three or four plain sentences per chapter, one idea, and one concrete
// detail from the body. The full chapter text becomes the folded detail.

export const DETAIL_MARKER = "◇ ";
export const WHATIS_MARKER = "ⓘ ";

const TYPE_ESSENCE: Record<HdTypeName, string> = {
  "Manifestor": "I'm here to start things. My energy moves in bursts, on my own timing, without waiting for anyone's permission.",
  "Generator": "I'm here to build. My energy is steady and renewable when I give it to work my gut says yes to.",
  "Manifesting Generator": "I'm here to respond and then move fast, often on several things at once, finding shortcuts other people miss.",
  "Projector": "I'm here to guide. I see people and systems clearly, and my insight lands best when someone asks for it.",
  "Reflector": "I'm here to mirror the health of my community. I take in the energy around me, so where I live and who I'm with shapes everything.",
};

// Conscious line: how I meet the world. Unconscious line: what runs underneath.
const LINE_CONSCIOUS: Record<number, string> = {
  1: "I build confidence by studying something deeply before I act",
  2: "my gifts show up most when I'm left alone and then called out by others",
  3: "I learn by trying things and bumping into what doesn't work",
  4: "my opportunities come through people who already know and trust me",
  5: "people look to me for practical solutions and project their hopes onto me",
  6: "my life moves in chapters, and I grow into being an example for others",
};
const LINE_UNCONSCIOUS: Record<number, string> = {
  1: "underneath, I feel safest once I understand something all the way down",
  2: "underneath, I carry natural gifts I don't always see in myself",
  3: "underneath, my body learns by doing, mistakes included",
  4: "underneath, I need warm, steady relationships to feel secure",
  5: "underneath, people sense I can fix things, sometimes before I've offered",
  6: "underneath, I'm watching from a distance and gathering wisdom over time",
};

const MOVE_SHORT: Record<HdTypeName, string> = {
  "Manifestor": "I'm built to inform before I act. Informing keeps the decision mine. It's a one-line heads-up to the people my move will touch, like \"Just letting you know, I'm taking Friday off.\" When I skip it, people push back and I feel controlled, and anger is the signal.",
  "Generator": "I'm built to respond. I let life bring things to me and notice what my gut says, often as a sound: \"uh-huh\" or \"unh-unh.\" When I start things from willpower alone, frustration is the signal.",
  "Manifesting Generator": "I'm built to respond, then inform, then move. Once my gut says yes, I can go fast and on several tracks at once, as long as I tell the people my speed affects. Frustration and anger are my signals that I skipped a step.",
  "Projector": "I'm built to wait for the invitation, especially for big things like work and love. My insight lands when someone asks for it. Bitterness is my signal that I'm offering it where it isn't wanted.",
  "Reflector": "I'm built to wait about a full lunar cycle before big decisions. My environment shapes me more than most, so where I am and who I'm with comes first. Disappointment is my signal that I rushed, or that I'm in the wrong place.",
};

const DECIDE_SHORT: Record<Authority, string> = {
  "Emotional": "My authority is emotional. My truth shows up after the feeling settles, so I don't make big decisions on the same day. I sleep on it, sometimes for a week.",
  "Sacral": "My authority is sacral. My gut answers in the moment, before my mind builds a case, and the gut is the one to trust.",
  "Splenic": "My authority is splenic: a quiet knowing in the moment that speaks only once. I act on the first whisper.",
  "Ego Manifested": "My authority runs through my heart and will. I commit only when I really want something. \"I should\" is a warning sign.",
  "Ego Projected": "My authority runs through my heart. I talk things through until I hear what I actually want.",
  "Self-Projected": "My authority is self-projected. I find my truth by talking out loud to someone who simply listens.",
  "Mental Projected": "My authority is environmental. I find clarity by talking things through with trusted people, in places where I feel well.",
  "Lunar": "My authority is lunar. Big decisions get a full moon cycle.",
  "None": "My design has no fixed inner authority, so I give big decisions time and notice what stays true.",
};

const WAVE_SHORT: Record<EmotionalWave, string> = {
  tribal: "the tribal wave, which builds quietly until it erupts over something small",
  individual: "the individual wave, which spikes and goes flat, often with no clear cause",
  abstract: "the abstract wave, which rises with anticipation and drops when reality doesn't match the dream",
};

/** The first clause of a gate phrase; keeps the whole phrase when the first clause is too short to stand alone. */
function firstClause(s: string): string {
  const first = s.split(", ")[0];
  return first.split(" ").length < 3 ? s : first;
}

// Mirrors for the chapters that aren't about a single gate. Each is a moment
// the reader may recognize before anything is explained.
const TYPE_MIRROR: Record<HdTypeName, string> = {
  "Manifestor": "I've been told I'm too much: too fast, too direct, too sure. Other times I've gone quiet to keep the peace, and felt the anger build anyway.",
  "Generator": "Some days I could work forever. Other days I drag myself through things I said yes to and never wanted.",
  "Manifesting Generator": "I've been called scattered. I start five things, drop two, and finish the rest faster than anyone expected.",
  "Projector": "I see what would fix it before anyone asks. When I say it unasked, it lands like criticism, and I end up tired and unseen.",
  "Reflector": "I've never been quite the same person two weeks in a row, and I used to think that meant something was wrong with me.",
};

const OPEN_CENTER_MIRROR: Record<CenterName, string> = {
  Sacral: "There are weeks when I work like three people, and then I can't get out of bed.",
  SolarPlexus: "I walk into a room and feel everyone's mood before I've taken off my coat.",
  Head: "My mind fills up with other people's questions, and I lie awake trying to answer them.",
  Ajna: "I can sound certain in a meeting and realize on the drive home that I'm not.",
  Ego: "I've promised more than I could deliver, just to prove I was worth it.",
  Spleen: "I've stayed in jobs and relationships long after I knew, because leaving felt unsafe.",
  Root: "I rush to clear my list just to make the pressure stop.",
  G: "I've lost myself in the wrong place, and found myself again by moving.",
  Throat: "I talk to fill silences, then wish I'd waited.",
};
const OPEN_CENTER_NAME: Partial<Record<CenterName, string>> = {
  Sacral: "That's my open Sacral. In busy, productive company I can borrow a Generator's energy, and it fades when they leave.",
  SolarPlexus: "That's my open Solar Plexus. I take in the emotions around me and feel them as if they were mine.",
  Head: "That's my open Head. I take in other people's mental pressure, and many of those questions were never mine to answer.",
  Ajna: "That's my open Ajna. I try on other people's certainty, and my own thinking stays wonderfully flexible.",
  Ego: "That's my open Ego. I have nothing to prove, and the pressure to prove it comes from outside me.",
  Spleen: "That's my open Spleen. I hold on to what feels familiar, even when it no longer keeps me well.",
  Root: "That's my open Root. I absorb the pressure around me and rush to get free of it.",
  G: "That's my open G Center. My sense of direction comes alive through the places and people around me.",
  Throat: "That's my open Throat. I feel the pressure to speak, and my voice is truest when I let it come in its own time.",
};
const CENTER_PRIORITY: CenterName[] = ["Sacral", "SolarPlexus", "Head", "Ajna", "Ego", "Spleen", "Root", "G", "Throat"];

const MOVE_MIRROR: Record<HdTypeName, string> = {
  "Manifestor": "I've made a decision, acted on it, and then spent a week dealing with people who felt blindsided.",
  "Generator": "I've said yes before my body had a chance to answer, and spent months living inside the result.",
  "Manifesting Generator": "I've leapt, then turned around to find nobody knew where I'd gone.",
  "Projector": "I've given brilliant advice nobody asked for and watched it slide off the table.",
  "Reflector": "I've made a big choice in a single afternoon and regretted the speed more than the choice.",
};

const DECIDE_MIRROR: Record<Authority, string> = {
  "Emotional": "I've said yes on a high and woken up the next morning wondering what I agreed to.",
  "Sacral": "My gut knew in a second. Then I talked myself out of it for a month.",
  "Splenic": "I had a quiet bad feeling, ignored it because it made no sense, and it turned out to be right.",
  "Ego Manifested": "I've kept promises my heart wasn't in, and felt my energy drain with every one.",
  "Ego Projected": "I often don't know what I want until I hear myself say it.",
  "Self-Projected": "I figure things out mid-sentence, talking to someone who simply listens.",
  "Mental Projected": "I make better decisions on a walk with a friend than alone at my desk.",
  "Lunar": "What feels right on Monday feels wrong by Thursday, and true again by the end of the month.",
  "None": "Urgency has never once made my choices better.",
};

const PROFILE_MIRROR: Record<number, string> = {
  1: "I don't feel ready until I've read everything, asked everyone, and checked the foundation twice.",
  2: "I do my best work when no one is watching, and then someone knocks on the door and asks me to share it.",
  3: "Almost everything I know, I learned by getting it wrong first.",
  4: "Almost every good thing in my life came through someone I already knew.",
  5: "People call me when something needs fixing, and sometimes they expect more than I can give.",
  6: "I've often felt older than my age, watching from a little distance and taking notes on how life works.",
};

// "What this is" notes: the chart reader explaining a Human Design term in
// plain language, where it comes from in the chart, and why it matters.
const TYPE_REASON: Record<HdTypeName, string> = {
  "Manifestor": "a motor center connects to your Throat while your Sacral stays open",
  "Generator": "your Sacral, the center of life-force, is defined",
  "Manifesting Generator": "your Sacral is defined and a motor center also connects to your Throat",
  "Projector": "your Sacral is open and no motor center connects to your Throat",
  "Reflector": "all nine of your centers are open",
};

const STRATEGY_NAME: Record<HdTypeName, string> = {
  "Manifestor": "to inform before you act",
  "Generator": "to respond",
  "Manifesting Generator": "to respond, then inform",
  "Projector": "to wait for the invitation",
  "Reflector": "to wait a full lunar cycle",
};

const AUTHORITY_REASON: Record<Authority, string> = {
  "Emotional": "your Solar Plexus is defined, and the Solar Plexus outranks every other center",
  "Sacral": "your Sacral is defined and your Solar Plexus is open",
  "Splenic": "your Spleen is your highest-ranking defined center",
  "Ego Manifested": "your Ego connects directly to your Throat",
  "Ego Projected": "your Ego connects to your G Center",
  "Self-Projected": "your G Center connects to your Throat with no motor below it",
  "Mental Projected": "all of your definition sits above the Throat",
  "Lunar": "all nine of your centers are open",
  "None": "none of the inner authorities is defined in your chart",
};

const AUTHORITY_NAME: Record<Authority, string> = {
  "Emotional": "emotional", "Sacral": "sacral", "Splenic": "splenic",
  "Ego Manifested": "ego manifested", "Ego Projected": "ego projected",
  "Self-Projected": "self-projected", "Mental Projected": "mental (environmental)",
  "Lunar": "lunar", "None": "outer",
};

const FOUNDATION_NOTE = "Your type, strategy and authority are the foundation of your whole design. If you take only one thing from this reading, take these three.";

function whatIsType(p: HumanDesignProfile, _ctx: Ctx): string {
  if (!p.type) return "";
  const article = /^[AEIOU]/.test(p.type) ? "an" : "a";
  return `Your energy type is the broadest layer of your design. It describes how your energy moves and how it meets other people. There are five types, and each comes from which of your centers are defined and how they connect. You're ${article} ${p.type} because ${TYPE_REASON[p.type]}. ${FOUNDATION_NOTE}`;
}

function whatIsProfile(p: HumanDesignProfile): string {
  const pc = p.profileConscious, pu = p.profileUnconscious;
  return `Your profile is the role you play in your life story: how you learn, and how other people tend to meet you. It's written as two numbers, taken from the line (one to six) your Sun falls in on each side of your chart. The first number comes from your conscious side, the second from your unconscious side. Yours is ${pc}/${pu}. If your type is the kind of energy you have, your profile is the costume it wears.`;
}

function whatIsCenters(): string {
  return "Your nine centers are the hubs of your bodygraph. Each one governs part of life, from thinking to willpower to emotions. Defined centers, colored in, are consistent in you. Open centers, left white, are where you take in and amplify the people around you. Knowing which is which helps you tell your own energy from everyone else's.";
}

function whatIsStrategy(p: HumanDesignProfile): string {
  if (!p.type) return "";
  return `Your strategy is the way your type is built to meet life, so your energy moves with the least resistance. Each type has one. As ${/^[AEIOU]/.test(p.type) ? "an" : "a"} ${p.type}, yours is ${STRATEGY_NAME[p.type]}. It's the most practical part of Human Design to test: try it for a few weeks and notice what changes.`;
}

function whatIsAuthority(p: HumanDesignProfile): string {
  const auth: Authority = p.authority ?? "None";
  return `Your authority is where in your body your most reliable decisions come from. It's set by your defined centers, which rank in a fixed order, with the Solar Plexus first, then the Sacral, then the Spleen. Your authority is ${AUTHORITY_NAME[auth]}, because ${AUTHORITY_REASON[auth]}. Strategy tells you how to move. Authority tells you when a choice is right.`;
}

function shortCenters(p: HumanDesignProfile, ctx: Ctx): string[] {
  const defined = CENTER_ORDER.filter(c => ctx.definedCenters.has(c)).map(centerName);
  const openC = CENTER_ORDER.filter(c => !ctx.definedCenters.has(c));
  const generatorType = p.type === "Generator" || p.type === "Manifesting Generator";
  const pick = CENTER_PRIORITY.find(c => openC.includes(c) && !(c === "Sacral" && generatorType));
  const out: string[] = [];
  if (pick) out.push(OPEN_CENTER_MIRROR[pick], OPEN_CENTER_NAME[pick]!);
  const words = ["None", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  let s = `${words[defined.length]} of my nine energy centers are defined${defined.length ? ` (${listAnd(defined)})` : ""}. They work the same way every day, and people feel them coming from me.`;
  if (openC.length) s += ` My open ${listAnd(openC.map(centerName))} ${openC.length === 1 ? "is" : "are"} where I soak up other people's energy and, over time, grow wise about it.`;
  out.push(s);
  return out;
}

function shortMove(p: HumanDesignProfile, ctx: Ctx): string[] {
  if (!p.type) return [];
  const out = [MOVE_MIRROR[p.type], MOVE_SHORT[p.type]];
  if (!ctx.definedCenters.has("Sacral")) {
    if (p.type === "Manifestor") out.push("Because my Sacral is open, I inform people about my rest too. \"I'm done for today\" counts.");
    if (p.type === "Projector" || p.type === "Reflector") out.push("Because my Sacral is open, I rest before I'm exhausted, and I leave before I've taken on more than my own energy can carry.");
  }
  return out;
}

function shortDecide(p: HumanDesignProfile, ctx: Ctx): string[] {
  const auth: Authority = p.authority ?? "None";
  const out = [DECIDE_MIRROR[auth], DECIDE_SHORT[auth]];
  if (auth === "Emotional") {
    const waves = [...new Set(ctx.definedChannels.filter(c => c.wave).map(c => c.wave!))];
    if (waves.length) out.push(`My chart carries ${waves.length === 1 ? "one kind of emotional wave" : `${waves.length === 2 ? "two" : "three"} kinds of emotional wave`}: ${waves.map(w => WAVE_SHORT[w]).join("; and ")}. Knowing which one I'm riding tells me when to wait.`);
  }
  if (p.type) out.push(`In practice: ${AUTHORITY_STEP[auth]}. ${STRATEGY_STEP[p.type]}.`);
  return out;
}

function shortStart(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const x = p.southNodeConscious ?? p.southNodeUnconscious;
  if (!x) return [];
  return [
    gateMoment(x, "shadow"),
    `That's my South Node, the scenery of my early life. It trained me in ${firstClause(expr(x, "low"))}. The work of my life is to ${expr(x, "arc", "verb")}.`,
  ];
}

function shortTests(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const x = p.saturnConscious ?? p.saturnUnconscious;
  if (!x) return [];
  const out = [
    gateMoment(x, "shadow"),
    `That's my Saturn, the lesson that keeps coming back in new costumes. It grows into ${expr(x, "high", "gerund")}.`,
  ];
  const j = p.jupiterConscious ?? p.jupiterUnconscious;
  if (j) out.push(`${gateMoment(j, "gift")} That's my Jupiter, the grace that opens up once I've done Saturn's work.`);
  return out;
}

function shortTender(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const out: string[] = [];
  const c = p.chironConscious ?? p.chironUnconscious;
  if (c) out.push(gateMoment(c, "shadow"), `That's my Chiron, the wound that becomes medicine. The work is to ${expr(c, "arc", "verb")}.`);
  const m = p.marsUnconscious;
  if (m && m !== c) out.push(`${gateMoment(m, "shadow")} That's my unconscious Mars, an old ache about my worth. The work there is to ${expr(m, "arc", "verb")}.`);
  if (out.length) out.push("Nothing here is a flaw to fix. What has hurt me most is also what I've learned the most from, and it becomes part of what I offer.");
  return out;
}

function shortGoing(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const x = p.moonConscious ?? p.moonUnconscious;
  if (!x) return [];
  return [
    gateMoment(x, "gift"),
    "That's my Moon, what keeps me going after ambition runs out. When I tend it, I'm resourced. When I neglect it, something essential goes quiet.",
  ];
}

function shortAbout(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const x = p.sunConscious;
  if (!x) return [];
  const out = [gateMoment(x, "gift"), `That's my Sun, the theme my life keeps returning to: ${expr(x, "high", "gerund")}.`];
  const v = crossVariation(p.incarnationCross);
  const cd = crossDescription(x, v);
  if (cd) out.push(cd.split(/(?<=\.)\s/)[0]);
  const e = p.earthConscious;
  if (e) out.push(`Underneath it, my Earth is the ground I stand on: ${expr(e, "high")}.`);
  return out;
}

function shortComesOut(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const m = p.mercuryConscious ?? p.mercuryUnconscious;
  const v = p.venusConscious ?? p.venusUnconscious;
  const out: string[] = [];
  if (m) out.push(gateMoment(m, "gift"), "That's my Mercury, the way my voice works best.");
  if (v) out.push(`${gateMoment(v, "gift")} That's my Venus, what I value most: ${expr(v, "high")}.`);
  return out;
}

function shortPulling(p: HumanDesignProfile, _ctx: Ctx): string[] {
  const x = p.northNodeConscious ?? p.northNodeUnconscious;
  if (!x) return [];
  return [
    gateMoment(x, "gift"),
    `That's my North Node, the direction my life bends toward from somewhere in my late thirties to mid-forties: ${expr(x, "high", "gerund")}. It can feel unfamiliar at first, and then like coming home.`,
  ];
}

// ─── Chapter focus (for the bodygraph window) ────────────────────────────────

export interface ChapterLabel { planet: string; gate: number; side: Side }
export interface ChapterFocus { gates: number[]; centers: CenterName[]; labels: ChapterLabel[] }

/** Which gates and centers each chapter is about, for highlighting the bodygraph. */
export function lifeQuestionsFocus(input: LifeQuestionsInput): Record<string, ChapterFocus> {
  const { profile: p, activations } = input;
  const ctx = buildCtx(activations);
  const byPlanets = (...planets: string[]): ChapterFocus => {
    const labels = activations.filter(a => planets.includes(a.planet)).map(a => ({ planet: PLANET_LABEL[a.planet] ?? a.planet, gate: a.gate, side: a.side }));
    return { gates: [...new Set(labels.map(l => l.gate))], centers: [], labels };
  };
  const openC = CENTER_ORDER.filter(c => !ctx.definedCenters.has(c));
  const generatorType = p.type === "Generator" || p.type === "Manifesting Generator";
  const pick = CENTER_PRIORITY.find(c => openC.includes(c) && !(c === "Sacral" && generatorType));
  const motor = motorToThroat(ctx);
  const sp = ctx.definedChannels.filter(c => c.wave);
  return {
    "WHAT KIND OF ENERGY DO I HAVE": {
      gates: [],
      centers: motor ? [...new Set(motor.path.flatMap(c => c.centers))] : [],
      labels: [],
    },
    "WHAT ROLE AM I HERE TO PLAY": byPlanets("Sun"),
    "WHERE IS MY ENERGY STEADY": {
      gates: pick ? CENTER_GATE_LIST[pick].filter(x => ctx.definedGates.has(x)) : [],
      centers: pick ? [pick] : [],
      labels: [],
    },
    "HOW DO I MOVE": {
      gates: motor ? motor.path.flatMap(c => c.gates) : [],
      centers: motor ? [...new Set(motor.path.flatMap(c => c.centers))] : [],
      labels: [],
    },
    "HOW DO I KNOW WHAT IS RIGHT": {
      gates: sp.flatMap(c => c.gates),
      centers: p.authority === "Emotional" ? ["SolarPlexus"] : p.authority === "Sacral" ? ["Sacral"] : p.authority === "Splenic" ? ["Spleen"] : [],
      labels: [],
    },
    "WHAT DID I START OUT CARRYING": byPlanets("SouthNode", "Uranus", "Pluto"),
    "WHAT KEEPS TESTING ME": byPlanets("Saturn", "Jupiter"),
    "WHERE AM I MOST TENDER": byPlanets("Chiron", "Mars"),
    "WHAT KEEPS ME GOING": byPlanets("Moon"),
    "WHAT IS MY LIFE ABOUT": byPlanets("Sun", "Earth"),
    "HOW DOES WHAT I CARRY COME OUT": byPlanets("Mercury", "Venus"),
    "WHERE IS MY LIFE PULLING ME": byPlanets("NorthNode", "Neptune"),
  };
}

// ─── The Gene Keys sequences, one chapter each ───────────────────────────────

const SEQUENCE_CHAPTER: Record<SequenceView["key"], { heading: string; anchor: string; lead: string; whatIs: string }> = {
  activation: {
    heading: "WHAT IS MY GENIUS",
    anchor: "Life's Work",
    lead: "My genius moves through four spheres",
    whatIs: "The Activation Sequence is the first of three Gene Keys sequences. It's drawn from the same four gates as your incarnation cross, your Sun and Earth on both sides, and it describes your individual genius: what you're here to do, what you're here to become, how your presence lands, and the purpose underneath it all.",
  },
  venus: {
    heading: "HOW DO I LOVE AND CONNECT",
    anchor: "Attraction",
    lead: "My heart moves through these spheres",
    whatIs: "The Venus Sequence describes how you attract people, how you relate, and the core wound that relationships tend to touch. It's drawn from your Moon, Venus and Mars. It's the heart of the Gene Keys, and the slowest to unfold.",
  },
  pearl: {
    heading: "WHAT DO I OFFER THE WORLD",
    anchor: "Pearl",
    lead: "My contribution moves through these spheres",
    whatIs: "The Pearl Sequence describes what you offer the world and how prosperity finds you: your vocation, the way your essence shows up publicly, the kind of community you create, and the gift that emerges through a life of service. It's drawn from your Sun, Mars and Jupiter.",
  },
};

function sphereDetail(sp: SphereView): string {
  if (sp.repeat) return `${sp.label} · Gene Key ${sp.gate} (${sp.gateName}). ${sp.note}.`;
  const line = sp.line ? ` · Line ${sp.line}${sp.lineName ? `, ${sp.lineName}` : ""}` : "";
  return `${sp.label} · Gene Key ${sp.gate} (${sp.gateName})${line}. ${sp.note}. Shadow of ${sp.shadow}, Gift of ${sp.gift}, Siddhi of ${sp.siddhi}. ${sp.lineText}`.trim();
}

function sectionSequence(view: SequenceView, p: HumanDesignProfile): string {
  const meta = SEQUENCE_CHAPTER[view.key];
  const spheres = view.steps.filter(s => s.kind === "sphere").map(s => (s as { sphere: SphereView }).sphere);
  if (!spheres.length) return "";
  const anchor = spheres.find(s => s.label === meta.anchor) ?? spheres[0];
  const short: string[] = [
    gateMoment(anchor.gate, "gift"),
    `That's my ${anchor.label}, Gene Key ${anchor.gate}. Its shadow is ${anchor.shadow}, and its gift is ${anchor.gift}.`,
  ];
  const fresh = spheres.filter(s => !s.repeat);
  if (fresh.length > 1) {
    // Merge spheres that share a gift ("Patience in my SQ and my Core").
    const byGift: { gift: string; labels: string[] }[] = [];
    for (const sp of fresh) {
      const last = byGift[byGift.length - 1];
      if (last && last.gift === sp.gift) last.labels.push(sp.label);
      else byGift.push({ gift: sp.gift, labels: [sp.label] });
    }
    short.push(`${meta.lead}: ${joinClausesPlain(byGift.map(b => `${b.gift} in my ${b.labels.join(" and my ")}`))}.`);
  }
  if (view.key === "venus") {
    const core = spheres.find(s => s.label === "Core");
    if (core) short.push(`At the center sits my Core wound, ${core.shadow}, which opens over time into ${core.gift}.`);
  }
  const body = view.steps.map(st => st.kind === "sphere"
    ? sphereDetail(st.sphere)
    : `${st.pathway.name}. ${st.pathway.line}`);
  return withPrompt(meta.heading, body, p, short, meta.whatIs);
}

function joinClausesPlain(items: string[]): string {
  if (items.length <= 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export function buildLifeQuestionsNarrative(input: LifeQuestionsInput): string {
  const { profile: p, geneKeys } = input;
  const ctx = buildCtx(input.activations);

  const partOneToThree = [
    sectionType(p, ctx),
    sectionProfile(p, ctx),
    sectionCenters(p, ctx),
    sectionMove(p, ctx),
    sectionDecide(p, ctx),
    sectionStart(p, ctx),
    sectionTests(p, ctx),
    sectionTender(p, ctx),
    sectionGoing(p, ctx),
    sectionAbout(p, ctx),
    sectionComesOut(p, ctx),
    sectionPulling(p, ctx),
  ].filter(Boolean);

  // Part IV: the hinge, then one chapter per Gene Keys sequence.
  const views = villageViews(geneKeys);
  const sequences = views.map(v => sectionSequence(v, p)).filter(Boolean);
  const belong = sequences.length
    ? [withPrompt("AM I MADE FOR THIS MOMENT?", hinge().split("\n\n").slice(1), p), ...sequences]
    : [];
  const tail = [recap(p), buildClosingModule(p, geneKeys)].join("\n\n");

  return [buildPrimer(p), ...partOneToThree, ...belong, injectReflectionPrompts(tail, p)].join("\n\n");
}
