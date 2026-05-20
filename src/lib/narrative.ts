import Anthropic from "@anthropic-ai/sdk";
import type { Chart } from "./chart-engine/types.js";
import {
  TYPE_DESCRIPTIONS,
  AUTHORITY_DESCRIPTIONS,
  PROFILE_DESCRIPTIONS,
  PROFILE_NAMES,
  CHANNEL_DESCRIPTIONS,
  channelKey,
} from "./chart-engine/copy.js";
import { CHANNELS } from "./chart-engine/data.js";

function buildPrompt(chart: Chart, name: string): string {
  const profileName = PROFILE_NAMES[chart.profile] ?? chart.profile;

  const channelBlocks = chart.definedChannels.map(([a, b]) => {
    const key = channelKey(a, b);
    const entry = CHANNELS.find(([ca, cb]) => (ca === a && cb === b) || (ca === b && cb === a));
    const channelName = entry?.[4] ?? `${a}-${b}`;
    const desc = CHANNEL_DESCRIPTIONS[key] ?? "";
    return `${channelName} (${a}-${b}): ${desc}`;
  });

  const noChannels = chart.definedChannels.length === 0;

  return `You are writing a Journey Narrative for Mythograph, in Cléa Hernández's voice.

Voice rules (strict — do not deviate):
- Second person ("you", not "they")
- Direct, embodied, specific. No vague spirituality, no new-age language
- Each element named precisely: the gift, the shadow, the pattern
- Short declarative sentences, then one longer one that earns it
- No bullet points, no headers — one flowing prose document with paragraph breaks
- Tone is intimate, specific, a little severe. Not reassuring. Not flattering.
- Do not use: "vibration", "manifestation" (as concept), "universe" (as mystical agent), "alignment", "resonance", "authentic self", "awakening", "consciousness", "frequency"
- Do not explain Human Design concepts to the reader — just speak directly to them about their chart

Person's name: ${name || "the reader"}

Chart facts:
- Type: ${chart.type}
- Strategy: ${chart.strategy}
- Authority: ${chart.authority}
- Profile: ${chart.profile} — ${profileName}
- Incarnation Cross: ${chart.incarnationCross}
- Defined channels (${chart.definedChannels.length}): ${noChannels ? "none" : chart.definedChannels.map(([a, b]) => `${a}-${b}`).join(", ")}

Reference material — use as voice and content guide, do not copy verbatim:

Type: ${TYPE_DESCRIPTIONS[chart.type] ?? ""}

Authority: ${AUTHORITY_DESCRIPTIONS[chart.authority] ?? ""}

Profile: ${PROFILE_DESCRIPTIONS[chart.profile] ?? ""}

${noChannels ? "No defined channels — this is unusual. The person is highly responsive to their environment and to whoever is in the room with them." : `Channels:\n${channelBlocks.join("\n\n")}`}

Write the Journey Narrative now. Structure (no headers — one flowing document):

Opening (2–3 sentences): State who this person is at the design level. Direct. No hedging. No "might" or "could be".

Type & Strategy (3–4 sentences): What kind of creature they are and how they're designed to move through the world.

Authority (3–4 sentences): Where their decision-making truth actually lives in the body. Be specific about what it feels like and what bypassing it costs.

Profile (4–5 sentences): How they meet the world and how the world meets them. Name both lines explicitly. Go into the tension between them — the friction is the teaching.

${noChannels ? "No defined channels (1 paragraph, 3–5 sentences): What it means to have no defined channels. What this creates and costs." : `Channels (one paragraph per channel, 3–5 sentences each): Each channel as a theme running through this person's life. Name the gift and the shadow concretely — no abstractions.`}

Incarnation Cross (3–5 sentences): Read the arc of their life as the cross names it. Don't explain what an incarnation cross is — just read theirs.

Closing (2–3 sentences): No advice, no reassurance. The truth of the design, plainly stated. Leave them with something to sit with.

Total length: 800–1200 words.`;
}

export async function* streamNarrative(chart: Chart, name: string): AsyncGenerator<string> {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const anthropic = new Anthropic({ apiKey });

  const stream = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    stream: true,
    messages: [{ role: "user", content: buildPrompt(chart, name) }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }
}
