import type { Authority, HdType, Chart } from "./types.js";

// ── Channel mini-essays ────────────────────────────────────────────────────────
// Keyed by `${gateA}-${gateB}` with the lower gate first. Voice is direct,
// embodied, specific. Gift and shadow are named where it helps. These are
// pre-purchase previews; the goal is interest, not closure.

export const CHANNEL_DESCRIPTIONS: Record<string, string> = {
  // Head ↔ Ajna
  "4-63": "The doubt-and-answer channel between Head and Ajna. You ask 'how do you know?' as a default move, even when no one expects it. The gift is catching the broken step in someone's reasoning before they spend 3 weeks acting on it. The shadow is using the same skill on yourself until you can't move; the more you doubt, the more there is to doubt.",

  "24-61": "The reflective-knowing channel between Head and Ajna. You sit with not-knowing until clarity arrives, sometimes for years. The gift is insight that needs silence to land, then arrives in a single sentence that explains everything. The shadow is using the mind as a hiding place from action you already know is yours.",

  "47-64": "The pattern-recognition channel between Head and Ajna. You replay old confusion until it becomes a story you can tell. Not on demand. The gift is making sense of what looked like chaos, often years after it happened. The shadow is overinvestment in the past; the meaning will come, but you can't make it come faster.",

  // Ajna ↔ Throat
  "17-62": "The opinion-as-fact channel between Ajna and Throat. You speak in organized claims, with detail attached. You sound certain because you are certain. The gift is structured, defensible thinking that helps others find footing. The shadow is mistaking your opinion for objective truth, and being annoyed when others don't immediately agree.",

  "11-56": "The storyteller channel between Ajna and Throat. You collect ideas, images, and fragments, and your job is to tell stories with them. You teach and persuade through narrative rather than lists. The shadow is collecting endlessly without telling, or telling stories that have nothing to do with your actual life.",

  "23-43": "The individual-genius channel between Ajna and Throat. Insight arrives whole, in language only you have. The gift is original thinking that nobody else was going to come up with. The shadow is being misread when the timing is wrong, then deciding it was always going to be misunderstood.",

  // Throat ↔ G
  "7-31": "The leadership channel between Throat and G. People look to you for direction, in the future-forward sense. The gift is leading by being recognised, with the position offered rather than seized. The shadow is forcing the role when the invitation hasn't arrived, which makes the leadership land as control instead.",

  "1-8": "The creative-individuality channel between Throat and G. You make something only you could have made, and you say it the way only you would say it. The gift is creative singularity that, when received, gives other people permission to be themselves too. The shadow is waiting for approval that isn't coming, then disowning the work.",

  "13-33": "The witness channel between Throat and G. You hold experiences (yours and other people's) until the meaning arrives, then tell them. The gift is being a keeper of stories, the one people trust with what they haven't told anyone else. The shadow is becoming the receptacle for everything everyone tells you, with no place to put it down.",

  "10-20": "An integration channel between Throat and G. The commitment to live what you actually believe, in the present, out loud. The gift is unmistakable self-presence; what you say and what you do are the same thing. The shadow is performing your principles instead of living them.",

  // Throat ↔ Sacral
  "20-34": "An integration channel between Throat and Sacral. You are most magnetic when fully absorbed in what you're doing now. People follow your action more than your explanation, which means you don't have to convince anyone. The shadow is performing rather than being absorbed; the magnetism vanishes the moment you start trying to produce it.",

  // Throat ↔ Ego
  "21-45": "The dominion channel between Throat and Ego. You have a natural authority over material resources: territory, money, the means of work. The gift is leadership of the tangible; people trust you to run things. The shadow is control that turns into punishment when crossed, and an inability to share the territory you've taken responsibility for.",

  // Throat ↔ Solar Plexus
  "12-22": "The mood-as-instrument channel between Throat and Solar Plexus. Your social presence rides your emotional wave. In clarity you open rooms; in cloud you withdraw. The shadow is forcing presence when the wave isn't ready, then wondering why the room felt off.",

  "35-36": "The jack-of-all-trades channel between Throat and Solar Plexus. You go through experiences quickly, learn what you came for, and move on. The gift is range, depth across surprising domains. The shadow is restlessness that never lets a thing finish, leaving a trail of half-built lives.",

  // Throat ↔ Spleen
  "16-48": "The talent-rehearsal channel between Throat and Spleen. You repeat your craft until depth arrives, audible to others. The gift is mastery through enthusiasm; people can hear how many hours you've put in. The shadow is performing before the depth has arrived, then losing the enthusiasm that was carrying you through the practice.",

  // G ↔ Sacral
  "2-14": "The keeper-of-the-keys channel between G and Sacral. You hold the direction, and you have the means to fund it. The gift is purposeful resource: knowing where you're going and being able to get yourself and others there. The shadow is hoarding the means without spending them on the direction.",

  "5-15": "The flow channel between G and Sacral. You set a pace that includes everyone, even the people who didn't expect to be welcomed. The gift is inclusive timing; your rhythm makes the strangers feel like they belong. The shadow is forcing your rhythm onto someone whose body keeps a different one.",

  "29-46": "The yes-to-the-body channel between G and Sacral. You commit, and the work shows you what you committed to. The gift is success that arrives by surprise, often from a yes you almost didn't give. The shadow is saying yes to everything and learning the same lesson 5 times before the body's signal becomes loud enough to hear.",

  // G ↔ Ego
  "25-51": "The shock channel between G and Ego. You wake people up, sometimes by accident, sometimes on purpose. The gift is courage that catalyses others; you walk through what they were avoiding. The shadow is provocation for its own sake, shock without follow-through.",

  // G ↔ Spleen (integration)
  "10-57": "An integration channel between G and Spleen. Survival lives in the body, faster than thought. The gift is instinct so reliable you stop questioning it, an embodied knowing that beats deliberation. The shadow is mistaking nervous-system signals for spiritual ones; the body protects, but it doesn't always know what's actually best for you long-term.",

  // Sacral ↔ Root
  "3-60": "The pressured-change channel between Sacral and Root. Change arrives on its own timing, under pressure, when you can't force it. The gift is being the source of what's new, the mutation that shifts what was stuck. The shadow is trying to push the timing; mutation that's forced becomes destruction.",

  "9-52": "The focused-attention channel between Sacral and Root. You can stay with one thing for far longer than the people around you. The gift is sustained depth; you finish things others abandon. The shadow is missing the larger context because you're still on page 1, while the situation has already moved on.",

  "42-53": "The cycle-completion channel between Sacral and Root. You finish what you started, and you start carefully because you know you'll be in it for a while. The gift is discipline, the rare ability to see something through. The shadow is grim duty when the joy has already left, finishing for the sake of finishing.",

  // Sacral ↔ Solar Plexus
  "6-59": "The intimacy channel between Sacral and Solar Plexus. Chemistry, attraction, and the labour of close relationships. You read other people through your body before your mind catches up. The gift is a strong pull, and the discernment to choose well. The shadow is choosing nobody, or choosing everybody, or staying in proximity that has stopped being intimate.",

  // Sacral ↔ Spleen
  "27-50": "The caregiving channel between Sacral and Spleen. You take care of others, which is your gift, and your trap. The gift is the steady caretaker, the person whose presence makes others feel safe. The shadow is care that becomes captivity for both of you, and resentment when the people you've held don't reciprocate.",

  "34-57": "An integration channel between Sacral and Spleen. Pure response in the present, with the spleen's instinct attached. The gift is power that arrives without thought, immediate and clean. The shadow is reactivity that bypasses the mind entirely, with consequences you didn't think through.",

  // Solar Plexus ↔ Ego
  "37-40": "The bargain channel between Solar Plexus and Ego. You are the family-maker, the deal-broker, the one who knows who is in and who is out. Loyalty is the currency. The gift is binding people together around a shared agreement. The shadow is staying in obligations that have already ended, or holding people to bargains they no longer remember making.",

  // Solar Plexus ↔ Root
  "30-41": "The fantasy channel between Solar Plexus and Root. You imagine what hasn't yet existed and pull it toward you. The gift is being the dream that drives others forward; people borrow your imagination. The shadow is fantasy as escape from what's actually here, longing for a future you keep refusing to start.",

  "19-49": "The need-sensitivity channel between Solar Plexus and Root. You feel the unmet need in the room, the relationship, the project. The gift is anticipating what's about to be required, before the person needing it has spoken. The shadow is over-providing for needs no one asked you to meet, then resenting that no one noticed.",

  "39-55": "The spirit-mood channel between Solar Plexus and Root. Your emotional state is the message itself. Your moods are content, and the people who love you eventually learn to read them as information rather than weather to be managed. The shadow is moods that become contagious storms, taking down the room.",

  // Ego ↔ Spleen
  "26-44": "The transmitter channel between Ego and Spleen. You can sell anything you actually believe. Strong memory for people, debts, what was promised. The gift is persuasion in service of something true; people feel you've understood them. The shadow is selling things you don't quite believe yourself, then living with the discomfort of having been convincing about them.",

  // Spleen ↔ Root
  "28-38": "The fight-for-purpose channel between Spleen and Root. You will fight, and the question is what's worth fighting for. The gift is finding the cause, and the stamina to stay with it. The shadow is fighting because fighting feels familiar, picking the next opposition before resolving the last.",

  "32-54": "The ambition channel between Spleen and Root. You climb what's still moving, work in what's still changing. The gift is endurance through transition, the rare patience to keep building when the ground keeps shifting. The shadow is climbing the wrong ladder for so long that you forget what you were after.",

  "18-58": "The corrective-vision channel between Spleen and Root. You see what's broken, and you find joy in fixing it. The gift is improvement nobody else thought to attempt. The shadow is finding fault in things that were already good enough, and exhausting the people around you with the constant correction.",
};

// Lower-first gate-pair key.
export function channelKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// ── Concept intros (what each part of the chart IS) ────────────────────────────
// Static, page-level explanations of why each section matters. These sit above
// the personalized descriptions so a first-time reader has the frame.

export const TYPE_INTRO =
  "Your type is the strategy your energy runs on. It tells you how to enter the world (initiating, responding, guiding, or reflecting) so your life can move with your design instead of against it.";

export const AUTHORITY_INTRO =
  "Your authority is where your decision-making truth lives in your body. Honouring it keeps you in alignment with your design. Bypassing it puts you in the mind, and the mind is not where your truth lives.";

export const PROFILE_INTRO =
  "Your profile is 2 numbers. The first is your conscious line, the costume you wear and the way you see yourself. The second is your unconscious line, the role others experience you in. Together they describe how you meet the world and how the world meets you.";

export const INCARNATION_CROSS_INTRO =
  "Your incarnation cross is the largest pattern in your design. It is built from 4 gates: your conscious Sun and Earth (the role you are aware of playing) and your unconscious Sun and Earth (the role others see you playing). The 4 together point to the larger arc of your life, the theme that keeps returning. Most people don't fully recognise their cross until decades into the experiment.";

// ── Type / Authority / Strategy / Profile copy ─────────────────────────────────

export const TYPE_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "Generators are roughly 70% of people. Your design is built for sustained, responsive energy. When the right thing arrives, your sacral centre answers before your mind has time to deliberate; the gut sound is your truth. Initiating from the mind, instead of waiting for the response, creates frustration. Your work is to wait long enough to feel the yes when it comes, and to trust the body when it does.",
  "Manifesting Generator": "Manifesting Generators are about 33% of people. You move faster than a Generator and in less linear paths. You skip steps, double back, and change directions, and the path is right because you walked it. Your strategy is to wait to respond first (your sacral signal still rules), then to inform the people who need to know what you're doing. Skipping the informing step creates anger and resistance from the people you forgot to bring along.",
  "Manifestor": "Manifestors are about 9% of people. You start things. You don't need permission to act, and you don't owe anyone an explanation. Your strategy is to inform people what you're about to do, before you do it. This isn't asking; it's the courtesy that keeps the world from arguing with you. Skipping the informing step turns your initiating energy into anger, both yours and theirs.",
  "Projector": "Projectors are about 20% of people. You are designed to guide, to read, and to see patterns other people miss. Your strategy is to wait for the invitation; recognition that comes to you is real, and chasing it does not work. The invitation can be small (a question, an opening, a 'what do you think?') or large (a job, a partnership, a marriage). When recognised, your guidance lands. Without recognition, it grates.",
  "Reflector": "Reflectors are about 1% of people, the rarest type. You are lunar in design. You reflect the people and places around you back to them, which makes you a sensitive instrument for the health of any community you join. Big decisions need a full lunar cycle, 28 days, to clarify. Time is your authority; the moon keeps it. Where you live and who you are around matter more for you than for any other type.",
};

export const AUTHORITY_DESCRIPTIONS: Record<Authority, string> = {
  "Emotional": "Your decisions land at the bottom of an emotional wave, not the top. The wave runs through you when something asks for a decision: excitement, doubt, hope, hesitation, all in sequence. A fast yes given before the wave crests is not yet your truth, and you will later have to undo what you committed to. Sleep on it. Sleep on it again. Honouring this is how you stay in your design instead of in your mind.",
  "Sacral": "Your authority is the gut sound that arrives before words form. The uh-huh, the uh-uh. Your body answers before your mind has time to negotiate, and the answer is the truth. Practising this is small at first: ask yourself yes/no questions out loud and notice what your body does in response. The mind will try to override the gut. The gut is right.",
  "Splenic": "Your spleen sends a soft, quiet signal at the moment a choice arrives. It is instant, only-once, and it does not repeat. Miss it and the moment passes. Splenic authority asks you to slow down enough to hear the whisper, and to trust it without explanation. The mind cannot reverse-engineer a splenic hit; you either felt it, or you didn't.",
  "Ego Manifested": "Your willpower is your authority. If your heart genuinely wants the thing, you have what's needed to do it. If your heart doesn't want it, no amount of reasoning will make the energy show up. The question to ask is: do I actually want this? Not should I, not would it be good for me, not is it the right move. Do I want it. The wanting is the truth.",
  "Ego Projected": "Your truth runs through what you say, in the moment of saying it. Listen to your own voice; that is how you find out what you mean. Your authority needs an audience (a friend, a journal, a voice memo), because the speaking is the deciding. Sitting alone in silence with the question keeps you in the mind.",
  "Self-Projected": "Your truth lives in the throat after passing through the G centre. Your identity speaks itself out loud when you have someone to speak to. Talk it through with someone who only listens, no advice, no opinions. Hearing yourself is how you find out what your design wants you to do.",
  "Mental Projected": "Talk the decision through, out loud, with people who know you and whose presence resonates with your design. Speaking it makes it clear. Sitting alone with it does not. Your authority is collective in nature, but it isn't a vote; the others are sounding boards, not deciders. You are still the one who knows.",
  "Lunar": "28 days. No major decision is made without a full lunar cycle of moving through the question. The cycle itself is your authority. Talk it through with multiple people across the 28 days, in different locations if you can. By the end of the cycle, you will know. Skipping this is how Reflectors end up disappointed in commitments their environment talked them into.",
  "None": "Your design carries no fixed inner authority. This is rare and asks for a different relationship with decisions, often through the cycles of your environment or the people around you. The Journey Narrative goes into this in detail.",
};

export const STRATEGY_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "Wait to respond.",
  "Manifesting Generator": "Wait to respond, then inform.",
  "Manifestor": "Inform before you act.",
  "Projector": "Wait for the invitation.",
  "Reflector": "Wait a lunar cycle.",
};

// 12 conscious/unconscious profile combinations.
// Names use slash format: "Conscious / Unconscious" (capitalised).
export const PROFILE_NAMES: Record<string, string> = {
  "1/3": "Investigator / Experimenter",
  "1/4": "Investigator / Opportunist",
  "2/4": "Hermit / Opportunist",
  "2/5": "Hermit / Heretic",
  "3/5": "Experimenter / Heretic",
  "3/6": "Experimenter / Role Model",
  "4/6": "Opportunist / Role Model",
  "4/1": "Opportunist / Investigator",
  "5/1": "Heretic / Investigator",
  "5/2": "Heretic / Hermit",
  "6/2": "Role Model / Hermit",
  "6/3": "Role Model / Experimenter",
};

export const PROFILE_DESCRIPTIONS: Record<string, string> = {
  "1/3": "Consciously, you are the Investigator: you study deeply, you need a foundation of knowledge before you'll speak, and you do not feel ready until you understand the underneath. Unconsciously, others experience you as the Experimenter: someone who learns by doing, who tries, fails, and tries again in public. Your life moves through both modes. Most of the things you call mistakes are research that becomes wisdom.",
  "1/4": "Consciously, you are the Investigator: you build deep knowledge slowly, on your own terms, and you don't share until the foundation is solid. Unconsciously, others experience you as the Opportunist: someone whose influence travels through their network of trusted relationships. Your work moves through people you already know, and the depth you bring is what makes those relationships matter.",
  "2/4": "Consciously, you are the Hermit: you have a natural gift you mostly forget you have, and you need solitude to stay yourself. Unconsciously, others experience you as the Opportunist: someone whose presence in their network they value. People will name your gift before you do, and they invite you to use it. Your work moves through invitation, not through advertisement.",
  "2/5": "Consciously, you are the Hermit: you need solitude to stay yourself, and you have a gift others see before you do. Unconsciously, others experience you as the Heretic: a problem-solver they project the role of saviour onto. People will call you out from your hermitage with practical demands. Solitude keeps you sane; emergence is for the specific call you can actually answer.",
  "3/5": "Consciously, you are the Experimenter: you learn by trying, your failures are public, and they teach you. Unconsciously, others experience you as the Heretic: someone with practical solutions, projected onto when something needs fixing. The world keeps bringing you new problems to solve, partly because you keep walking into them, and partly because people sense you can.",
  "3/6": "Consciously, you are the Experimenter: trial and error is how you learn, and you don't apologise for it. Unconsciously, others experience you as the Role Model: someone whose lived life is itself the teaching. Your life has 2 halves with a transition around age 30. The first half is mistakes and getting to know the terrain. The second is watching, knowing, having lived enough to see the patterns.",
  "4/6": "Consciously, you are the Opportunist: your influence moves through your network and your friendships. Unconsciously, others experience you as the Role Model: someone whose example they watch and learn from. People follow how you live more than what you say. The two together mean your community is also your audience, whether or not you wanted that to be the case.",
  "4/1": "Consciously, you are the Opportunist: you build influence through your existing relationships. Unconsciously, others experience you as the Investigator: someone with deep, foundational knowledge they trust. The combination means your network values you for what you actually know. People come to you because they trust both your reach and your rigour.",
  "5/1": "Consciously, you are the Heretic: you see yourself as someone with practical solutions, called in to fix what others can't. Unconsciously, others experience you as the Investigator: the depth of your study and foundation. They project the saviour role onto you, and you can deliver because the foundation is there. The shadow is being projected onto without the foundation actually being in place yet, or hiding behind the foundation when the call to deliver comes.",
  "5/2": "Consciously, you are the Heretic: people call you out for solutions, and the projections come fast. Unconsciously, others experience you as the Hermit: someone whose solitude is part of what makes them effective. You will be projected onto for things you didn't ask to be known for. Privacy is how you stay sane; emergence is reserved for the specific calls that actually fit.",
  "6/2": "Consciously, you are the Role Model: someone whose life is itself the teaching. Unconsciously, others experience you as the Hermit: someone whose solitude is necessary and observed. 3 life chapters: the trial years (until about 30), the watching years (from the rooftop, between roughly 30 and 50), and the wisdom years (after about 50). Most of your work in the world happens in the 3rd chapter.",
  "6/3": "Consciously, you are the Role Model: your lived life is the teaching. Unconsciously, others experience you as the Experimenter: someone whose trials they have watched and learned from. You live and learn, again and again, until the wisdom is unmistakable, even to you. The lessons are not over until you say so, and you tend to say so later than other people would.",
};

// ── Synopsis ───────────────────────────────────────────────────────────────────
// A paragraph-long through-line that pulls together type, profile, authority,
// strategy, defined channels, and incarnation cross. Generated dynamically per
// chart so every reader gets their own custom version.

interface SynopsisChannel { name: string; }

export function chartSynopsis(chart: Chart, channels: SynopsisChannel[]): string {
  const { type, profile, authority, strategy, incarnationCross } = chart;
  const authPart = authority === "None" ? "" : `${authority} `;
  const profileName = PROFILE_NAMES[profile] ?? profile;

  const id = `You are a ${profile} ${authPart}${type}, the ${profileName}.`;
  const strategyLine = `Your strategy is ${strategy.toLowerCase()}, and your decisions arise from ${authority === "None" ? "your lunar reflection" : `your ${authority.toLowerCase()} authority`}.`;

  let channelsLine: string;
  if (channels.length === 0) {
    channelsLine = "You have no fully-defined channels, which is unusual. Your design is highly responsive to whoever and whatever is in the room with you.";
  } else if (channels.length === 1) {
    channelsLine = `1 channel is defined: ${channels[0].name}. That is the theme your life keeps coming back to.`;
  } else {
    const names = channels.map((c) => c.name);
    const list =
      names.length === 2
        ? `${names[0]} and ${names[1]}`
        : `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
    channelsLine = `${names.length} channels are defined: ${list}. These are the themes your life keeps coming back to.`;
  }

  const crossLine = `Your incarnation cross is ${incarnationCross}, the larger arc your life is here to play out. The Journey Narrative reads it in full.`;

  return `${id} ${strategyLine} ${channelsLine} ${crossLine}`;
}
