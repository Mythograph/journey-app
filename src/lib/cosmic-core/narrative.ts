// Cosmic Core — the Journey Narrative builder.
//
// Ported from Story Loom's buildLifePurposeNarrative (the Mythograph Soul
// Map): a 14-section journey rendered deterministically from the chart's
// planetary gate placements, plus the Golden Path section that reads the
// same chart through the Gene Keys sequences.
//
// Framed as a post-heroic search for meaning (after Sharon Blackie and the
// Fool's journey), not a tale of conquest. The Campbellian waypoints
// (threshold, descent, abyss, return) stay as universally legible signposts;
// the connective prose positions them as meaning-making, not victory. Each
// section also names the actual chart signature behind it (sigPair) so the
// reading stays grounded in the person's real mechanics.
//
// Differences from the Story Loom original, per the unification decisions:
// - Types are referred to by their standard HD names (quantum names kept
//   as metadata in types.ts).
// - Sections are joined with blank lines (no "---" dividers) so the
//   journey-app reading page parses them cleanly.
// - buildJourneyNarrative() runs Act I (the individual search for meaning),
//   then the "Am I made for this moment?" hinge, then Act II (the Village
//   Journey, personalized through the Gene Keys sequences), then the recap.

import { GATES, type GateBand, type GateField } from "./gates.js";
import { TYPE_PROFILES, type HdTypeName } from "./types.js";
import { PROFILE_LINES, profileLineDescription } from "./profiles.js";
import { CENTERS, type CenterName, type CenterStatus } from "./centers.js";
import {
  STRATEGY_TRAINING,
  AUTHORITY_TRAINING,
  PROFILE_EXPERIMENTS,
  type Authority,
} from "./navigation.js";
import {
  GK_SEQUENCES,
  GENE_KEY_FREQUENCIES,
  getSphereLineExpression,
  buildSequenceNarrative,
  type GeneKeysProfile,
  type SphereSpec,
} from "./gene-keys.js";

// ─── Profile shape consumed by the builder ────────────────────────────────────

// A center's defined/open state plus any prominent conscious lights (Sun,
// Earth) that fall in it when it is not defined — the chart signature behind
// the "a defining gift in open ground" motif.
export interface CenterState {
  name: CenterName;
  status: CenterStatus;
  prominent: { planet: string; gate: number }[];
}

export interface HumanDesignProfile {
  type: HdTypeName | "";
  typePurpose: string;
  strategy?: string;
  authority?: Authority;
  incarnationCross?: string;
  centers?: CenterState[];
  profileConscious: number | null;
  profileUnconscious: number | null;
  sunConscious: number | null;
  sunUnconscious: number | null;
  earthConscious: number | null;
  earthUnconscious: number | null;
  moonConscious: number | null;
  moonUnconscious: number | null;
  northNodeConscious: number | null;
  northNodeUnconscious: number | null;
  southNodeConscious: number | null;
  southNodeUnconscious: number | null;
  mercuryConscious: number | null;
  mercuryUnconscious: number | null;
  venusConscious: number | null;
  venusUnconscious: number | null;
  marsConscious: number | null;
  marsUnconscious: number | null;
  jupiterConscious: number | null;
  jupiterUnconscious: number | null;
  saturnConscious: number | null;
  saturnUnconscious: number | null;
  uranusConscious: number | null;
  uranusUnconscious: number | null;
  neptuneConscious: number | null;
  neptuneUnconscious: number | null;
  plutoConscious: number | null;
  plutoUnconscious: number | null;
  chironConscious: number | null;
  chironUnconscious: number | null;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function gateExpr(num: number | null, mode: GateBand, field: GateField = "short"): string {
  if (!num) return "___";
  const gate = GATES[num];
  if (!gate) return "___";
  return gate[mode][field];
}

function stringSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const bigrams = (s: string): Set<string> => {
    const set = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2).toLowerCase());
    return set;
  };
  const aB = bigrams(a);
  const bB = bigrams(b);
  let overlap = 0;
  for (const bg of aB) if (bB.has(bg)) overlap++;
  return (2 * overlap) / (aB.size + bB.size);
}

// ─── The Soul Map (the individual journey — a search for meaning) ──────────────

// Inline list joiner: clauses contain commas, so separate with semicolons.
function joinClauses(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]}, and ${items[1]}`;
  return `${items.slice(0, -1).join("; ")}; and ${items[items.length - 1]}`;
}

const PLANET_DISPLAY: Record<string, string> = {
  Sun: "Sun", Earth: "Earth", Moon: "Moon", Mercury: "Mercury", Venus: "Venus",
  Mars: "Mars", Jupiter: "Jupiter", Saturn: "Saturn", Uranus: "Uranus",
  Neptune: "Neptune", Pluto: "Pluto", NorthNode: "North Node", SouthNode: "South Node",
  Chiron: "Chiron",
};

// THE SHAPE OF MY ENERGY — defined vs open centers, and the motif of a
// prominent conscious light sitting in open ground.
export function buildEnergyAnatomy(profile: HumanDesignProfile): string {
  const cs = profile.centers ?? [];
  const pc = profile.profileConscious;
  const pu = profile.profileUnconscious;
  const hasProfile = !!(pc && pu && PROFILE_LINES[pc] && PROFILE_LINES[pu]);
  if (!hasProfile && cs.length === 0) return "";

  const definedList = cs.filter(c => c.status === "defined");
  const openList = cs.filter(c => c.status !== "defined");

  const clause = (c: CenterState) =>
    `my ${CENTERS[c.name].displayName}, where ${c.status === "defined" ? CENTERS[c.name].defined : CENTERS[c.name].open}`;

  const paras: string[] = ["THE SHAPE OF MY ENERGY"];

  if (hasProfile) {
    paras.push(
      `I move through life as a ${pc}/${pu} profile, the ${PROFILE_LINES[pc!].name} and the ${PROFILE_LINES[pu!].name}. My profile is the costume I wear and the role others cast me in. My conscious line, the ${pc} (${PROFILE_LINES[pc!].name}), is how I see myself and engage the world: ${profileLineDescription(pc)}. My unconscious line, the ${pu} (${PROFILE_LINES[pu!].name}), is how others tend to experience me, often before I notice it in myself: ${profileLineDescription(pu)}. Together they shape how I meet the world and how the world meets me.`
    );
  }

  if (cs.length === 0) return paras.length > 1 ? paras.join("\n\n") : "";

  paras.push(
    `My design is ${hasProfile ? "also " : ""}a body of nine energy centers. Some are defined: colored in and consistent, the parts of me that work the same way every day and that other people feel coming from me. Some are open, the places where I take the world in, amplify it, and slowly learn to read it. My open centers are where I am most easily conditioned, because what moves through them is often not mine, and they are also where I grow wisest over a lifetime. Knowing which is which is the difference between living my own life and living a borrowed one.`
  );

  if (definedList.length) {
    paras.push(`What is consistent in me: ${joinClauses(definedList.map(clause))}. This is the ground I move from.`);
  }
  if (openList.length) {
    paras.push(`Where I take the world in: ${joinClauses(openList.map(clause))}. Here the work is discernment, noticing when I am amplifying something that belongs to someone else and mistaking it for my own. In time, these become the places I understand other people most deeply, because I have felt the full range of what moves through them.`);
  }

  const prom = openList.flatMap(c => c.prominent.map(p => ({ center: c, p })));
  if (prom.length) {
    const { center, p } = prom[0];
    const name = GATES[p.gate]?.traditionalName;
    const sig = `${PLANET_DISPLAY[p.planet] ?? p.planet} in Gate ${p.gate}${name ? `, ${name},` : ""}`;
    paras.push(
      `One of my defining gifts sits in open ground. My ${sig} lives in my open ${CENTERS[center.name].displayName}. The very thing I am here to express runs through the part of me most shaped by others. I am here to master from the inside what the world will keep trying to teach me from the outside. It can take years to trust this gift as mine, and claiming it is some of the most important work I will do.`
    );
  }

  return paras.join("\n\n");
}

// THE GAUNTLET — type/strategy/authority as the training that turns raw
// energy into sovereignty, plus how the profile lines shape how I learn.
export function buildGauntlet(profile: HumanDesignProfile): string {
  if (!profile.type) return "";
  const typeEntry = TYPE_PROFILES[profile.type];
  const strat = STRATEGY_TRAINING[profile.type];
  const auth = profile.authority ? AUTHORITY_TRAINING[profile.authority] : "";
  const exp = profile.profileConscious ? PROFILE_EXPERIMENTS[profile.profileConscious] : "";
  if (!strat && !auth && !exp) return "";

  const paras: string[] = ["THE GAUNTLET — TRAINING WITH MY DESIGN"];
  paras.push(
    `The trials of a life are not only tests. They are training. My raw energy as a ${typeEntry?.name ?? profile.type} is power, but power on its own burns out or misfires. What turns it into fortitude, resilience, and a sovereignty no one can talk me out of is learning to move the way my design is built to move. This is the discipline beneath the whole journey, and the most practical thing I will ever learn about myself.`
  );
  if (strat) paras.push(`How I am built to engage. ${strat}`);
  if (auth) paras.push(`How I am built to decide. ${auth}`);
  if (exp) {
    const pc = profile.profileConscious;
    const cname = pc && PROFILE_LINES[pc] ? PROFILE_LINES[pc].name : "";
    let e = pc
      ? `How I learn. My conscious line is the ${pc}, the ${cname}, and it sets the way I am built to learn and grow. ${exp}`
      : `How I learn. ${exp}`;
    const u = profile.profileUnconscious;
    if (u && PROFILE_LINES[u]) {
      e += ` Underneath this runs my unconscious ${u} line, the ${PROFILE_LINES[u].name}, ${profileLineDescription(u)}.`;
    }
    paras.push(e);
  }
  paras.push(
    "Every obstacle I meet is a chance to practice this. Each time I work with my strategy and my authority instead of against them, I am not only solving the problem in front of me. I am building the inner ground the rest of my life will stand on."
  );
  return paras.join("\n\n");
}

export function buildLifePurposeNarrative(profile: HumanDesignProfile, _name: string): string {
  if (!profile.type && !profile.sunConscious && !profile.sunUnconscious) return "";

  const hi  = (n: number | null) => gateExpr(n, "high", "short");
  const lo  = (n: number | null) => gateExpr(n, "low",  "short");
  const arc = (n: number | null) => gateExpr(n, "arc",  "short");
  const vb  = (n: number | null) => gateExpr(n, "high", "verb");
  const gn  = (n: number | null) => (n && GATES[n] ? `Gate ${n} (${GATES[n].traditionalName})` : "");
  const q   = (n: number | null) => (n && GATES[n] ? GATES[n].quantumName : "");
  // High-expression grounding: quantum gift-name in the prose, traditional
  // name in the parenthetical reference.
  const giftSig = (label: string, c: number | null, u: number | null): string => {
    const t = (n: number | null) => (n && GATES[n] ? GATES[n].traditionalName : "");
    const qc = q(c), qu = q(u);
    const gifts = qc && qu && c !== u ? `${qc} and ${qu}` : (qc || qu);
    const refs = c && u && c !== u
      ? `conscious Gate ${c}, ${t(c)}; unconscious Gate ${u}, ${t(u)}`
      : `Gate ${c || u}, ${t(c || u)}`;
    return gifts ? `${label}, my gift of ${gifts} (${refs})` : label;
  };
  const pd  = (n: number | null) => profileLineDescription(n);

  // Signature grounding: names the actual chart mechanic behind a passage,
  // as a skimmable parenthetical so it never bloats the prose.
  const sigPair = (label: string, c: number | null, u: number | null): string => {
    const nm = (n: number | null) => (n && GATES[n] ? GATES[n].traditionalName : "");
    if (c && u && c !== u) return `${label} (conscious Gate ${c}, ${nm(c)}; unconscious Gate ${u}, ${nm(u)})`;
    if (c && u) return `${label} (Gate ${c}, ${nm(c)}, in both layers)`;
    const g = c || u;
    return g ? `${label} (Gate ${g}, ${nm(g)})` : label;
  };

  const usedPairs = new Map<string, true>();

  const renderPair = (
    gate1: number | null,
    gate2: number | null,
    mode: GateBand,
    field: GateField,
    connector = "and",
    isRecap = false
  ): string => {
    const expr1 = gateExpr(gate1, mode, field);
    const expr2 = gateExpr(gate2, mode, field);

    if (gate1 !== null && gate1 === gate2) {
      return isRecap
        ? `${expr1} (conscious and unconscious)`
        : `${expr1}, a theme woven through both the conscious and unconscious layers of this energy`;
    }

    if (stringSimilarity(expr1, expr2) > 0.8) {
      return isRecap
        ? `${expr1} (present in both layers)`
        : `${expr1}, present in both the seen and unseen currents of this placement`;
    }

    const pairKey = `${gate1}:${gate2}:${mode}:${field}`;
    if (usedPairs.has(pairKey)) {
      const short1 = gateExpr(gate1, mode, "short");
      return field === "verb"
        ? `this same calling, ${short1}…`
        : `this same thread, ${short1}…`;
    }

    usedPairs.set(pairKey, true);
    return `${expr1}, ${connector} ${expr2}`;
  };

  const typeEntry       = profile.type ? TYPE_PROFILES[profile.type] : undefined;
  const typeLabel       = typeEntry?.name ?? profile.type ?? "___";
  const typeQuantum     = typeEntry?.quantumName ?? "";
  const typePurpose     = profile.typePurpose || typeEntry?.purposeGerund || "___";
  const typeDescription = typeEntry?.typeDescription ?? "";

  const ordinaryWorld = `THE ORDINARY WORLD

I am meant to be a ${typeLabel}${typeQuantum ? `: a kind of ${typeQuantum.toLowerCase()} in the way my energy is designed to move` : ""}.

${typeDescription}

Before I understood any of this, I lived inside a particular kind of ordinary, shaped by the world I was born into, the family I came through, and the early lessons life handed me without explanation. Even then, something was already moving in me that I couldn't quite name. My generation arrived with a collective inheritance: to open others to ${renderPair(profile.uranusConscious, profile.uranusUnconscious, "high", "short")}. This is the work of my ${giftSig("Uranus", profile.uranusConscious, profile.uranusUnconscious)}, a current woven into me at birth, running beneath everything I experienced long before I had language for it.

The world I grew up in had its own story about who I was and what was possible. Some of that story served me. Some of it didn't. What follows is not a conquest and it is not a performance. It is a search for what is true underneath the inherited story, and for the meaning that is mine to make.`;

  const theCall = `THE CALL

There is a thread that runs through my life, through every version of myself, every detour, every beginning: a persistent pull, a recurring sense of what I am for, even when life has taken me elsewhere. This is the call. It rarely arrives as a clear voice or a dramatic summons. It arrives as a direction I keep bending back toward, no matter how far I wander from it.

The deepest answer to why I am here is my incarnation cross${profile.incarnationCross ? `, the ${profile.incarnationCross}` : ""}. It is the largest pattern in my whole design, and it is built from four gates: the two lights of my personality, my conscious Sun and Earth, the purpose I am aware of carrying; and the two lights of my design, my unconscious Sun and Earth, the purpose others feel me living before I can name it. Where the Sun is the gift I am here to give, the Earth beneath it is the ground I have to stand on to give it.

Consciously, I am here to ${vb(profile.sunConscious)}, my gift of ${q(profile.sunConscious)}, grounded in my gift of ${q(profile.earthConscious)}. This is the role I know I am playing: my Sun in ${gn(profile.sunConscious)} and my Earth in ${gn(profile.earthConscious)}. Beneath that, in my design, I am built to ${vb(profile.sunUnconscious)}, my gift of ${q(profile.sunUnconscious)}, grounded in my gift of ${q(profile.earthUnconscious)}, the role others recognize in me before I do: my Sun in ${gn(profile.sunUnconscious)} and my Earth in ${gn(profile.earthUnconscious)}. Together these four trace the theme my life keeps returning to, and most people do not fully recognize their cross until they are decades into living it.

I am here to serve the world by ${typePurpose}. This is not a role I'm auditioning for or a standard I'm trying to meet. It is structural: the shape my energy is designed to take when I am living in alignment with what I actually am.`;

  const threshold = `THE THRESHOLD — CROSSING INTO THE UNKNOWN

Every journey has a threshold: the moment I step out of what's familiar and into the territory that actually matters. I cross it the way the Fool steps off the edge in the old tarot, not because the path is certain but because something in me is ready to begin. The way I make that crossing, the mode I engage life through, is ${pd(profile.profileConscious)}, the gift of my conscious profile line. It isn't always the path of least resistance, but it is my path, and a particular intelligence becomes available to me when I trust it.

To actually move rather than hover at the edge, what I most need to cultivate and receive is ${pd(profile.profileUnconscious)}, what my unconscious line is quietly asking for. It often comes through others, through circumstances, through what I don't yet see in myself. Without it, the threshold stays theoretical. With it, the search becomes real.`;

  const descent = `THE DESCENT — INITIATIONS AND EARLY TRIALS

A search for meaning does not go around the underworld. It goes straight through it. My early life gave me specific initiations, not obstacles to overcome and leave behind but formative experiences designed to shape something essential in me. The themes I was asked to reckon with early on were ${renderPair(profile.southNodeConscious, profile.southNodeUnconscious, "low", "short")}, the inheritance I came in already carrying, written in my ${sigPair("South Node", profile.southNodeConscious, profile.southNodeUnconscious)}.

These were the places where I went underground, where familiar structures broke down, where I was asked to question what I thought I knew about myself and the world. The descent isn't a failure; it's the curriculum. Everything I learned in those initiatory experiences is material I carry forward. The lessons of the South Node aren't meant to be left behind; they're meant to become integrated, composted into the wisdom I bring to the next phase.

My generation is learning through collective cycles of ${renderPair(profile.plutoConscious, profile.plutoUnconscious, "low", "short")}. This is my ${sigPair("Pluto", profile.plutoConscious, profile.plutoUnconscious)}. These are the fires we're all moving through together, the deep structural dismantling and rebuilding that shapes what's possible for everyone who comes after us.`;

  const abyss = `THE ABYSS — THE CENTRAL ORDEAL

Every journey has a place of maximum darkness, the moment when the old self has dissolved and the new one hasn't yet formed. This is the abyss: the threshold between who I was and who I'm becoming.

For me, this descent lives in my ${sigPair("Chiron", profile.chironConscious, profile.chironUnconscious)}, the territory of ${renderPair(profile.chironConscious, profile.chironUnconscious, "arc", "short")}. Chiron is the wounded healer, the place where what has hurt us most becomes the source of what we most have to offer. This isn't a wound I'm meant to fix or erase. It's a threshold I keep crossing more deeply, each time with more capacity to hold what I find there.

The abyss does not ask me to win. It asks whether I can let myself be remade, whether I can stay in the dark long enough for meaning to form there. The answer, over and over, is yes. Not because it's easy, but because this is where meaning is made, and everything I'm here to offer is shaped in this place first.`;

  const helpers = `THE HELPERS AND ALLIES

No one makes this journey alone. A search for meaning is never a solitary quest; it is relational, reciprocal, woven through with helpers, guides, and the people who make the return possible.

What moves me at the core, the inner allies that keep me on the path when everything else is uncertain, are ${renderPair(profile.moonConscious, profile.moonUnconscious, "high", "short")}. This is the pull of my ${giftSig("Moon", profile.moonConscious, profile.moonUnconscious)}. These are the deep motivations beneath the surface ambitions. They are emotional, instinctual, often non-rational. They are what I return to when I've lost the thread, the pulse beneath the pulse. When I tend to them, I have the energy and the heart to keep going. When I neglect them, something essential goes quiet.

Inner conflict is not a sign that I've gone wrong. It is the signal that expansion is happening, that I am being stretched into territory my current self hasn't mapped yet. I'm always becoming. I'm always doing this right.`;

  const trials = `THE ROAD OF TRIALS — THE RECURRING TESTS

The road of this journey is lined with recurring tests, the same lessons in new costumes, asking me each time to go deeper. These are not obstacles to defeat; they are the training that builds fortitude. Life keeps teaching me through my ${sigPair("Saturn", profile.saturnConscious, profile.saturnUnconscious)}: from ${lo(profile.saturnConscious)} toward ${hi(profile.saturnConscious)} in the conscious, and from ${lo(profile.saturnUnconscious)} toward ${hi(profile.saturnUnconscious)} beneath.

Saturn's lessons are not punitive; they are structural. They show up wherever I need to develop mastery, take responsibility, or stop outsourcing my authority to someone else. They are among the most transformative energies in the chart precisely because they demand something real.

When I meet those lessons honestly, when I don't bypass them or collapse under them, I discover the gifts that wait on the other side: ${renderPair(profile.jupiterConscious, profile.jupiterUnconscious, "high", "short")}. This is the grace of my ${giftSig("Jupiter", profile.jupiterConscious, profile.jupiterUnconscious)}. These are not rewards for good behavior. They are the natural expansion that comes from having done the actual work. They arrive as grace.`;

  const spiritual = `THE SPIRITUAL PATH — THE INVISIBLE CURRENT

Running beneath all of this is a spiritual current I can't force or manufacture, only attune to. My deepest spiritual path moves through ${renderPair(profile.neptuneConscious, profile.neptuneUnconscious, "high", "short")}, the quiet undertow of my ${giftSig("Neptune", profile.neptuneConscious, profile.neptuneUnconscious)}. Neptune governs the realm of the numinous: the dreams, the dissolving of ego-edges, the places where the personal story opens into something larger than itself.

When I need to re-anchor, when I've drifted from the thread, this is where I come back. Not to a doctrine or a method, but to the signature of these energies as I have come to know them in my own experience. Alignment with something larger, for me, is not abstract. It is particular. It lives here.`;

  const coreWound = `THE CORE WOUND AND THE VOCATION — THE FIGHT WORTH HAVING

This is where the journey gets intimate.

The internal fight I carry, the place where I have struggled most privately, questioned my worth, my right to take up space, my capacity to be what I sense I'm meant to be, is the territory of ${arc(profile.marsUnconscious)}. This is the core wound, and it lives in my unconscious ${sigPair("Mars", null, profile.marsUnconscious)}. It is not a flaw to be fixed but a place of tremendous sensitivity that experience has shaped into a particular kind of knowing. The things that have hurt me most here have also taught me the most. What I've learned in that territory is not incidental to my work; it is my work.

The outer expression of that fire, what I'm willing to stand for in the world, the values I won't compromise, the places where I'll take a position even when it costs me something, is ${hi(profile.marsConscious)}, my conscious ${sigPair("Mars", profile.marsConscious, null)}. This is the vocation made visible: the cause I keep returning to, the thing I find myself defending again and again, not because I decided to but because something in me can't do otherwise.

Together, these two energies trace the arc from wound to purpose. The deeper I go into understanding what has shaped me here, the more I discover what I'm genuinely equipped to offer, not in spite of the struggle but because of it. This is the alchemy at the center of the journey.`;

  const elixir = `THE ELIXIR — WHAT I CARRY BACK

The old stories end with a hero returning in triumph, holding up a prize. This is not that kind of return. What I carry back is not a trophy but a way of being I can finally inhabit: the full self, reassembled and offered back with all its complexity intact. The gift is not what I won. It is who I became while searching.

What I am here to bring back is the capacity to ${renderPair(profile.sunConscious, profile.sunUnconscious, "high", "verb", "and to")}, not as aspiration now but as lived offering. This is the same call I heard at the beginning. It hasn't changed. But I have. I bring it back now with the depth of everything the search has taught me.

The foundation that holds this offering, the ground I stand on to give it, is ${renderPair(profile.earthConscious, profile.earthUnconscious, "high", "short")}. This is the ballast of my ${giftSig("Earth", profile.earthConscious, profile.earthUnconscious)}. The Earth gate stabilizes the Sun's purpose. It is the body to the soul's vision. I allow it, build it, and receive it as the foundation of everything I create.`;

  const voice = `THE VOICE — HOW I TRANSMIT

A returned traveler doesn't just carry the medicine; they know how to offer it. My transmission moves through ${renderPair(profile.mercuryConscious, profile.mercuryUnconscious, "high", "short")}, the voice of my ${giftSig("Mercury", profile.mercuryConscious, profile.mercuryUnconscious)}. This is how meaning moves from me into the world, through my particular way of speaking, writing, articulating, and making ideas land. Not just what I say, but the quality of presence through which I say it.

What shapes everything I build, the value system that runs beneath my choices, my relationships, and my creative work, is ${renderPair(profile.venusConscious, profile.venusUnconscious, "high", "short")}, the values of my ${giftSig("Venus", profile.venusConscious, profile.venusUnconscious)}. These are the things I find beautiful, the principles I organize my life around, the non-negotiables that show up in how I love, what I protect, and what I choose to make.`;

  const theReturn = `THE RETURN — LEANING INTO THE FULLNESS

Around age 44, the journey shifts register. The initiations of the South Node have done their foundational work. The core wound has been, or is being, turned toward vocation. The question shifts from who am I becoming to who have I always been.

This is the period of growing more fully into ${renderPair(profile.northNodeConscious, profile.northNodeUnconscious, "high", "short")}, the direction my ${giftSig("North Node", profile.northNodeConscious, profile.northNodeUnconscious)} has been bending toward all along. The North Node is not a foreign destination; it is the deepest expression of the trajectory the whole journey has been building toward. It asks me to lean forward, into unfamiliar territory that nonetheless feels, when I arrive, like coming home.

This is the return that matters. Not a finish line, but a full inhabiting: showing up as the complete version of who I've been moving toward all along, and offering that to the world without apology.`;

  const recap = `WHO I AM — A RECAP

Before the story gets too long to hold, here is what is most essential to remember.

My nature: I am a ${typeLabel}${typeQuantum ? `, a kind of ${typeQuantum.toLowerCase()}` : ""}. I am here to serve by ${typePurpose}. This is not a strategy I'm adopting; it is how my energy functions at its best.

My gifts: I learn and give by ${pd(profile.profileConscious)}, and I come into my own through ${pd(profile.profileUnconscious)}. My core calling is to ${renderPair(profile.sunConscious, profile.sunUnconscious, "high", "verb", "and to", true)}. The ground I create from is ${renderPair(profile.earthConscious, profile.earthUnconscious, "high", "short", "and", true)}.

What drives me: at the heart level, what fuels me is ${renderPair(profile.moonConscious, profile.moonUnconscious, "high", "short", "and", true)}. These are not optional; they are the source. When I am connected to them, I am resourced for the work.

Where I'm growing: I carry the initiatory experience of ${renderPair(profile.southNodeConscious, profile.southNodeUnconscious, "arc", "gerund", "and", true)} as hard-won wisdom. I am growing toward ${renderPair(profile.northNodeConscious, profile.northNodeUnconscious, "high", "short", "and", true)}. The wound I'm transforming into medicine is the territory of ${arc(profile.marsUnconscious)}. The cause I'll stand for is ${hi(profile.marsConscious)}.

What I'm here to do: I communicate through ${renderPair(profile.mercuryConscious, profile.mercuryUnconscious, "high", "short", "and", true)}. I value ${renderPair(profile.venusConscious, profile.venusUnconscious, "high", "short", "and", true)}. I walk a spiritual path of ${renderPair(profile.neptuneConscious, profile.neptuneUnconscious, "high", "short", "and", true)}. I offer the medicine of ${renderPair(profile.chironConscious, profile.chironUnconscious, "arc", "short", "and", true)}.

The larger context: I was born into a generation opening others to ${renderPair(profile.uranusConscious, profile.uranusUnconscious, "high", "short", "and", true)}, learning through collective cycles of ${renderPair(profile.plutoConscious, profile.plutoUnconscious, "arc", "short", "and", true)}. My personal story is part of something larger than itself.`;

  const largerStory = `THE LARGER STORY

I have a real and irreplaceable role in what's happening here, in this era, in this lineage, in the evolution of what human beings are capable of becoming. My story is not a detour from the larger story. It is part of it.

I carry my particular wounds, my particular gifts, my particular way of seeing, and I bring them to a world that needs exactly this: the thing only I can offer, in the way only I can offer it, because of everything the journey has made of me.

This is the story I write as I live.`;

  const energyAnatomy = buildEnergyAnatomy(profile);
  const gauntlet = buildGauntlet(profile);

  return [ordinaryWorld, energyAnatomy, theCall, threshold, descent, abyss, helpers, trials, gauntlet, spiritual, coreWound, elixir, voice, theReturn, recap, largerStory]
    .filter(Boolean)
    .join("\n\n");
}

// ─── Act II: the hinge and the Village Journey (Gene Keys) ────────────────────

// One sphere rendered as a detail paragraph (Gene Key, name, line, the
// Shadow -> Gift -> Siddhi spectrum, and the line meaning).
function renderSphere(sphere: SphereSpec, geneKeys: GeneKeysProfile): string | null {
  const num = geneKeys[sphere.gateField];
  const line = geneKeys[sphere.lineField];
  if (num === null) return null;
  const freq = GENE_KEY_FREQUENCIES[num];
  if (!freq) return null;
  const gate = GATES[num];
  const lineExpr = getSphereLineExpression(sphere.lineKey, line);

  let p = `${sphere.label}: Gene Key ${num}`;
  if (gate) p += `, ${gate.traditionalName}`;
  if (line && lineExpr) p += `, Line ${line} (${lineExpr.name})`;
  p += `. ${sphere.note}. The Shadow of ${freq.shadow} ripens into the Gift of ${freq.gift} and flowers as the Siddhi of ${freq.siddhi}.`;
  if (lineExpr) p += ` ${lineExpr.description}`;
  return p;
}

function spheresFor(key: "activation" | "venus" | "pearl", geneKeys: GeneKeysProfile): string[] {
  const seq = GK_SEQUENCES.find(s => s.key === key);
  if (!seq) return [];
  return seq.spheres.map(s => renderSphere(s, geneKeys)).filter((p): p is string => Boolean(p));
}

// The bridge from the individual journey to the collective one.
export function buildHinge(): string {
  return `AM I MADE FOR THIS MOMENT?

The first journey was a search for who I am. I walked into the underworld and came back with something I can finally inhabit, and I learned how to move, decide, and create as the design I actually am. And then, sooner or later, a different question arrives. Not who am I, but: am I made for this moment? Is what I have found in myself meant for something happening now, something larger than me?

This is where the journey turns outward. Having found my purpose, I begin to look for where it belongs, among other people, inside the larger story unfolding in my lifetime. The search for my own meaning becomes a search for my place in the meaning we are making together. A second journey begins, and this one I do not take alone.`;
}

// THE VILLAGE JOURNEY — the collective arc, personalized through the three
// Gene Keys sequences (Activation = the genius I bring, Venus = how I gather
// and bond, Pearl = what emerges through service).
export function buildVillageJourney(geneKeys: GeneKeysProfile): string {
  const hasAny = GK_SEQUENCES.some(seq => seq.spheres.some(s => geneKeys[s.gateField] !== null));
  if (!hasAny) return "";

  const paras: string[] = ["THE VILLAGE JOURNEY"];
  paras.push(
    "The Gene Keys are a contemplative companion to my Human Design chart. Every gate in my design is also a Gene Key, and each one names a spectrum I move along over a lifetime. At the low end is the Shadow, the way the energy contracts under fear. In the middle is the Gift, what that same energy becomes when I meet it with awareness. At the highest end is the Siddhi, its fullest flowering. The work is never to be rid of the Shadow but to recognize it, so the Gift can come through."
  );
  paras.push(
    "My Gene Keys are arranged into three sequences. I am choosing to read these sequences as the path by which I become more fully myself and serve my purpose within the movement of the collective. No one changes the world alone. When enough people who have done their own inner work find each other, a village forms: a circle of unique medicine gathered around a shared vision none of them could have reached by themselves. These sequences map how I am built to find my village and what I am here to contribute to it."
  );

  const activation = buildSequenceNarrative("activation", geneKeys);
  if (activation) {
    paras.push(`The Calling and the Gathering. A village begins when several people receive the same call and are drawn together by something they cannot quite name. The core genius I bring to that circle, the gift the village needs from me, lives in my Activation Sequence. ${activation}`);
    paras.push(...spheresFor("activation", geneKeys));
  }

  const venus = buildSequenceNarrative("venus", geneKeys);
  if (venus) {
    paras.push(`Gathering the Circle. A village is held together by the quality of its relationships. The way I attract the people I am meant to do this with, and the way I love them through the work, is my Venus Sequence. ${venus}`);
    paras.push(...spheresFor("venus", geneKeys));
  }

  const coreNum = geneKeys.core;
  const coreFreq = coreNum ? GENE_KEY_FREQUENCIES[coreNum] : null;
  if (coreFreq) {
    paras.push(`The Trials and the Shared Abyss. Every village meets resistance from the world and friction from within, and the hardest test is always relational. The place my own conditioning shows up inside the group is my Core, the Gift of ${coreFreq.gift} emerging from the Shadow of ${coreFreq.shadow}. When I meet it consciously, it stops running the village from underneath and becomes the source of my deepest contribution.`);
  }

  const pearl = buildSequenceNarrative("pearl", geneKeys);
  if (pearl) {
    paras.push(`The Disruptive Solution and the New Paradigm. What emerges when I stop striving and start serving, when I live my gifts in genuine contribution, is my Pearl Sequence: a prosperity that arrives as a consequence of alignment rather than force. ${pearl}`);
    paras.push(...spheresFor("pearl", geneKeys));
  }

  paras.push(
    "This is the heart of the village journey: not losing myself in the collective, and not standing apart from it, but becoming most fully myself in service of something that needs exactly what I carry. My purpose finds its moment among others. That is the answer to the question. I am made for this moment, and so are the people I am here to find."
  );

  return paras.join("\n\n");
}

// ─── The full Journey Narrative ───────────────────────────────────────────────
// Act I (the individual search for meaning, I-XIV) -> the hinge -> Act II (the
// Village Journey / Gene Keys) -> recap -> larger story.

export function buildJourneyNarrative(
  profile: HumanDesignProfile,
  geneKeys: GeneKeysProfile,
  name: string
): string {
  const soulMap = buildLifePurposeNarrative(profile, name);
  if (!soulMap) return "";

  const village = buildVillageJourney(geneKeys);
  if (!village) return soulMap;
  const actTwo = `${buildHinge()}\n\n${village}`;

  // Insert Act II before the recap ("WHO I AM") so the reading still closes
  // on the recap and The Larger Story.
  const recapIndex = soulMap.indexOf("WHO I AM — A RECAP");
  if (recapIndex === -1) return `${soulMap}\n\n${actTwo}`;

  return (
    soulMap.slice(0, recapIndex).trimEnd() +
    "\n\n" + actTwo + "\n\n" +
    soulMap.slice(recapIndex)
  );
}
