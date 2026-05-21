import Anthropic from "@anthropic-ai/sdk";
import type { Chart, HdType } from "./chart-engine/types.js";
import { PROFILE_NAMES } from "./chart-engine/copy.js";
import { getGateExpression } from "./chart-engine/gate-data.js";

// ── Static copy ───────────────────────────────────────────────────────────────

const TYPE_PURPOSE: Record<HdType, string> = {
  "Generator": "responding to life and generating sustained momentum for what is ready to move",
  "Manifesting Generator": "responding swiftly, informing those who need to know, and moving in the non-linear way my design requires",
  "Manifestor": "initiating what needs to begin and informing those who will be affected before I act",
  "Projector": "guiding the energy and direction of others, waiting to be recognized and invited to do so",
  "Reflector": "reflecting the health and vitality of the communities I inhabit, and waiting a full lunar cycle for clarity on major decisions",
};

const LINE_CONSCIOUS: Record<number, string> = {
  1: "deep study and the building of solid foundations — I need to understand the underneath before I can move",
  2: "my natural gifts, which I often don't see in myself until others call me out to use them",
  3: "trial and error — learning through bonds that form and break and experiments that test what is actually real",
  4: "my existing relationships and the network of people who already know and trust me",
  5: "being called upon as a problem-solver and meeting the projections others bring",
  6: "the full arc of lived experience — the trials of the first phase, the watching of the second, and the wisdom they become in the third",
};

const LINE_UNCONSCIOUS: Record<number, string> = {
  1: "a foundation solid enough to act from — the ground has to be stable before I can trust the step",
  2: "others to recognize and name what they see in me, a calling-out I cannot manufacture alone",
  3: "the willingness to keep going after the bonds break and the experiments fail, knowing they were the education",
  4: "a genuine community of people who actually know me — influence travels through real relationships",
  5: "a real, solid foundation beneath the practical solutions I am expected to offer",
  6: "time, and the patience to let each life phase complete before the next one begins",
};

// ── Gate data lookup ──────────────────────────────────────────────────────────

const PLANET_KEY_MAP: Record<string, string> = {
  sun: "Sun", earth: "Earth", moon: "Moon", mercury: "Mercury",
  venus: "Venus", mars: "Mars", jupiter: "Jupiter", saturn: "Saturn",
  uranus: "Uranus", neptune: "Neptune", pluto: "Pluto",
  north_node: "NorthNode", south_node: "SouthNode", chiron: "Chiron",
};

function gateFor(chart: Chart, planetKey: string, position: "conscious" | "unconscious"): number | null {
  const name = PLANET_KEY_MAP[planetKey];
  if (!name) return null;
  const activations = position === "conscious"
    ? chart.personalityActivations
    : chart.designActivations;
  return activations.find(a => a.planet === name)?.gate ?? null;
}

function datum(chart: Chart, planetKey: string, position: "conscious" | "unconscious", level: "low" | "high" | "arc"): string {
  const gate = gateFor(chart, planetKey, position);
  if (gate === null) return "(data unavailable)";
  return getGateExpression(gate, level, "expanded");
}

function gateLabel(chart: Chart, planetKey: string, position: "conscious" | "unconscious"): string {
  const gate = gateFor(chart, planetKey, position);
  return gate !== null ? `Gate ${gate}` : "unknown gate";
}

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildPrompt(chart: Chart, name: string): string {
  const profileName = PROFILE_NAMES[chart.profile] ?? chart.profile;
  const [consciousLine, unconsciousLine] = chart.profile.split("/").map(Number);

  const d = (planet: string, pos: "conscious" | "unconscious", level: "low" | "high" | "arc") =>
    datum(chart, planet, pos, level);
  const g = (planet: string, pos: "conscious" | "unconscious") =>
    gateLabel(chart, planet, pos);

  return `You are writing a Journey Narrative for Mythograph, in Cléa Hernández's voice.

PERSON: ${name || "the reader"}
TYPE: ${chart.type}
PROFILE: ${chart.profile} — ${profileName}
AUTHORITY: ${chart.authority}
STRATEGY: ${chart.strategy}
INCARNATION CROSS: ${chart.incarnationCross}

VOICE RULES (strict):
- First person ("I", "my", "me") throughout
- Direct, embodied, specific — no vague spirituality, no new-age language
- Short declarative sentences, then one longer one that earns it
- No em dashes. No "not X, but Y" constructions.
- No bullet points in the output — flowing prose only
- Do not use: "vibration", "manifestation" (as mystical concept), "universe" as agent, "resonance", "authentic self", "awakening", "frequency"
- Preserve each section heading exactly as shown

Write the narrative section by section, following this structure. Each DATA block contains the specific meaning to weave into that section — do not quote it verbatim, use it as the content to express in your own rendering of the voice.

---

THE ORDINARY WORLD

Open with: "I am meant to be a/an ${chart.type}."

Then write about arriving in the world already carrying a generational inheritance, something woven in before there was language for it.
DATA — Uranus conscious (${g("uranus", "conscious")}): ${d("uranus", "conscious", "high")}
DATA — Uranus unconscious (${g("uranus", "unconscious")}): ${d("uranus", "unconscious", "high")}

Close this section with: the world had its own story about who I was. Some of it served me. The journey ahead is learning which parts to keep.

---

THE CALL

Write about a thread running through this life, through every version of the self.
DATA — Sun conscious (${g("sun", "conscious")}): ${d("sun", "conscious", "high")}
DATA — Sun unconscious (${g("sun", "unconscious")}): ${d("sun", "unconscious", "high")}

Then: I am here to serve the world by ${TYPE_PURPOSE[chart.type]}. This is structural — the shape my energy is designed to take.

---

THE THRESHOLD — CROSSING INTO THE UNKNOWN

Write about the threshold every journey has.
The way I cross it is through: ${LINE_CONSCIOUS[consciousLine] ?? "my primary mode of engaging with life"}
To actually make the crossing, I need: ${LINE_UNCONSCIOUS[unconsciousLine] ?? "what I must cultivate and receive"}

---

THE DESCENT — INITIATIONS AND EARLY TRIALS

Write about the heroine's journey going through the underworld, not around it. Specific early initiations that shaped something essential.
DATA — South Node conscious (${g("south_node", "conscious")}): ${d("south_node", "conscious", "low")}
DATA — South Node unconscious (${g("south_node", "unconscious")}): ${d("south_node", "unconscious", "low")}

Then: the descent is the curriculum. These lessons are meant to be integrated, composted into wisdom.

Then: the collective fires of this generation.
DATA — Pluto conscious (${g("pluto", "conscious")}): ${d("pluto", "conscious", "low")}
DATA — Pluto unconscious (${g("pluto", "unconscious")}): ${d("pluto", "unconscious", "low")}

---

THE ABYSS — THE CENTRAL ORDEAL

Write about the place of maximum darkness between who you were and who you're becoming.
DATA — Chiron conscious (${g("chiron", "conscious")}): ${d("chiron", "conscious", "arc")}
DATA — Chiron unconscious (${g("chiron", "unconscious")}): ${d("chiron", "unconscious", "arc")}

Close: the answer is yes, because this is where the medicine lives.

---

THE HELPERS AND ALLIES

Write about the journey being relational. The inner allies that keep me on the path.
DATA — Moon conscious (${g("moon", "conscious")}): ${d("moon", "conscious", "high")}
DATA — Moon unconscious (${g("moon", "unconscious")}): ${d("moon", "unconscious", "high")}

Close: inner conflict is the signal that expansion is happening. I'm always becoming. I'm always doing this right.

---

THE ROAD OF TRIALS — THE RECURRING TESTS

Write about recurring tests, the same lessons in new costumes.
DATA — Saturn conscious, shadow (${g("saturn", "conscious")}): ${d("saturn", "conscious", "low")}
DATA — Saturn conscious, gift (${g("saturn", "conscious")}): ${d("saturn", "conscious", "high")}
DATA — Saturn unconscious, shadow (${g("saturn", "unconscious")}): ${d("saturn", "unconscious", "low")}
DATA — Saturn unconscious, gift (${g("saturn", "unconscious")}): ${d("saturn", "unconscious", "high")}

Then: Saturn's lessons are structural. They demand something real.

Then: the gifts on the other side.
DATA — Jupiter conscious (${g("jupiter", "conscious")}): ${d("jupiter", "conscious", "high")}
DATA — Jupiter unconscious (${g("jupiter", "unconscious")}): ${d("jupiter", "unconscious", "high")}

---

THE SPIRITUAL PATH — THE INVISIBLE CURRENT

Write about the spiritual current running beneath everything.
DATA — Neptune conscious (${g("neptune", "conscious")}): ${d("neptune", "conscious", "high")}
DATA — Neptune unconscious (${g("neptune", "unconscious")}): ${d("neptune", "unconscious", "high")}

Close: alignment with something larger, for me, is particular. It lives here.

---

THE CORE WOUND AND THE VOCATION — THE FIGHT WORTH HAVING

Open: this is where the journey gets intimate.

Write about the internal fight, the most private struggle.
DATA — Mars unconscious (${g("mars", "unconscious")}): ${d("mars", "unconscious", "arc")}

Then: the outer expression of that fire, what I'll stand for.
DATA — Mars conscious (${g("mars", "conscious")}): ${d("mars", "conscious", "high")}

Close: these two energies trace the arc from wound to purpose. This is the alchemy at the center of the journey.

---

THE ELIXIR — WHAT I CARRY BACK

Write about the heroine's return being about integration, the full self reassembled.

What I bring back:
DATA — Sun conscious (${g("sun", "conscious")}): ${d("sun", "conscious", "high")}
DATA — Sun unconscious (${g("sun", "unconscious")}): ${d("sun", "unconscious", "high")}

The foundation that holds it:
DATA — Earth conscious (${g("earth", "conscious")}): ${d("earth", "conscious", "high")}
DATA — Earth unconscious (${g("earth", "unconscious")}): ${d("earth", "unconscious", "high")}

---

THE VOICE — HOW I TRANSMIT

Write about how meaning moves from me into the world.
DATA — Mercury conscious (${g("mercury", "conscious")}): ${d("mercury", "conscious", "high")}
DATA — Mercury unconscious (${g("mercury", "unconscious")}): ${d("mercury", "unconscious", "high")}

Then: what shapes everything I build.
DATA — Venus conscious (${g("venus", "conscious")}): ${d("venus", "conscious", "high")}
DATA — Venus unconscious (${g("venus", "unconscious")}): ${d("venus", "unconscious", "high")}

---

THE RETURN — LEANING INTO THE FULLNESS

Write about the journey shifting register around age 44. The question shifts from who am I becoming to who have I always been.

DATA — North Node conscious (${g("north_node", "conscious")}): ${d("north_node", "conscious", "high")}
DATA — North Node unconscious (${g("north_node", "unconscious")}): ${d("north_node", "unconscious", "high")}

Close: this is the return that matters, a full inhabiting, offering that to the world without apology.

---

WHO I AM — A RECAP

Write a tight recap of everything essential. Prose, not bullets.

Nature: ${chart.type}. Designed to move through the world by ${TYPE_PURPOSE[chart.type]}.
Core calling — Sun conscious: ${d("sun", "conscious", "high")}
Core calling — Sun unconscious: ${d("sun", "unconscious", "high")}
Ground — Earth conscious: ${d("earth", "conscious", "high")}
Ground — Earth unconscious: ${d("earth", "unconscious", "high")}
Fuel — Moon conscious: ${d("moon", "conscious", "high")}
Fuel — Moon unconscious: ${d("moon", "unconscious", "high")}
Initiatory lessons — South Node conscious arc: ${d("south_node", "conscious", "arc")}
Initiatory lessons — South Node unconscious arc: ${d("south_node", "unconscious", "arc")}
Growing toward — North Node conscious: ${d("north_node", "conscious", "high")}
Growing toward — North Node unconscious: ${d("north_node", "unconscious", "high")}
Wound becoming medicine — Mars unconscious: ${d("mars", "unconscious", "arc")}
Cause — Mars conscious: ${d("mars", "conscious", "high")}
Transmission — Mercury conscious: ${d("mercury", "conscious", "high")}
Transmission — Mercury unconscious: ${d("mercury", "unconscious", "high")}
Values — Venus conscious: ${d("venus", "conscious", "high")}
Values — Venus unconscious: ${d("venus", "unconscious", "high")}
Spiritual path — Neptune conscious: ${d("neptune", "conscious", "high")}
Spiritual path — Neptune unconscious: ${d("neptune", "unconscious", "high")}
Wound and healing — Chiron conscious: ${d("chiron", "conscious", "arc")}
Wound and healing — Chiron unconscious: ${d("chiron", "unconscious", "arc")}
Generational inheritance — Uranus conscious: ${d("uranus", "conscious", "high")}
Generational inheritance — Uranus unconscious: ${d("uranus", "unconscious", "high")}
Collective fire — Pluto conscious arc: ${d("pluto", "conscious", "arc")}
Collective fire — Pluto unconscious arc: ${d("pluto", "unconscious", "arc")}

---

THE LARGER STORY

Write a closing that places this person's particular wounds, gifts, and way of seeing within something larger than themselves. Their story is part of the larger story. End with: "This is the story I write as I live."

---

Total length: 2000–2500 words. Write all sections now, in order, as one continuous document.`;
}

// ── Stream ────────────────────────────────────────────────────────────────────

export async function* streamNarrative(chart: Chart, name: string): AsyncGenerator<string> {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const anthropic = new Anthropic({ apiKey });

  const stream = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    stream: true,
    messages: [{ role: "user", content: buildPrompt(chart, name) }],
  });

  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      yield event.delta.text;
    }
  }
}
