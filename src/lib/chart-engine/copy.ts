import type { Authority, HdType, Chart } from "./types.js";

// ── Channel mini-essays ────────────────────────────────────────────────────────
// Keyed by `${gateA}-${gateB}` with the lower gate first. Voice is direct,
// embodied, specific. Gift and shadow are named where it helps. These are
// pre-purchase previews, not full readings; the goal is interest, not closure.

export const CHANNEL_DESCRIPTIONS: Record<string, string> = {
  // Head ↔ Ajna
  "4-63": "Logic. The doubt-and-answer channel between Head and Ajna. You ask 'how do you know?' as a default move. The gift is catching the broken step in other people's reasoning. The shadow is using the same skill on yourself until you can't move.",

  "24-61": "Awareness. The reflective-knowing channel between Head and Ajna. You sit with not-knowing until clarity arrives. Sometimes for years. The gift is insight that needs silence to land. The shadow is using your mind as a hiding place from action.",

  "47-64": "Abstraction. The pattern-recognition channel between Head and Ajna. You replay old confusion until it becomes a story you can tell. Not on demand. The gift is making sense of what looked like chaos. The shadow is overinvestment in the past.",

  // Ajna ↔ Throat
  "17-62": "Acceptance. The opinion-as-fact channel between Ajna and Throat. You speak in organized claims, with detail attached. You sound certain because you are. The shadow is mistaking opinion for objective truth.",

  "11-56": "Curiosity. The storyteller channel between Ajna and Throat. You collect ideas, images, fragments. Your job is to tell stories with them, which makes you a teacher who works through narrative. The shadow is collecting endlessly without telling.",

  "23-43": "Structuring. The individual-genius channel between Ajna and Throat. Insight arrives whole, in language only you have. The gift is original thinking. The shadow is being misread when the timing is wrong.",

  // Throat ↔ G
  "7-31": "Alpha. The leadership channel between Throat and G. People look to you for direction, in the future-forward sense. The gift is leading by recognition. The shadow is forcing the role when the invitation hasn't arrived.",

  "1-8": "Inspiration. The creative-individuality channel between Throat and G. You make something only you could have made, and you say it the way only you would say it. The gift is creative singularity. The shadow is waiting for approval that isn't coming.",

  "13-33": "Prodigal. The witness channel between Throat and G. You hold experiences, then tell them later, when the meaning arrives. The gift is being a keeper of stories. The shadow is becoming the receptacle for everything everyone tells you.",

  "10-20": "Awakening. An integration channel between Throat and G. The commitment to live what you actually believe, in the present, out loud. The gift is unmistakable self-presence. The shadow is performing your principles instead of living them.",

  // Throat ↔ Sacral
  "20-34": "Charisma. An integration channel between Throat and Sacral. You are most magnetic when fully absorbed in what you're doing now. People follow your action more than your explanation. The shadow is performing rather than being absorbed.",

  // Throat ↔ Ego
  "21-45": "Money Line. The dominion channel between Throat and Ego. You have natural authority over material resources: territory, money, the means of work. The gift is leadership of the tangible. The shadow is control that becomes punishment when crossed.",

  // Throat ↔ Solar Plexus
  "12-22": "Openness. The mood-as-instrument channel between Throat and Solar Plexus. Your social presence rides your emotional wave. In clarity you open rooms; in cloud you withdraw. The shadow is forcing presence when the wave isn't ready.",

  "35-36": "Transitoriness. The jack-of-all-trades channel between Throat and Solar Plexus. You go through experiences quickly, learn what you came for, and move on. The gift is range. The shadow is restlessness that never lets a thing finish.",

  // Throat ↔ Spleen
  "16-48": "Wavelength. The talent-rehearsal channel between Throat and Spleen. You repeat your craft until depth arrives, audible to others. The gift is mastery through enthusiasm. The shadow is performing before the depth has arrived.",

  // G ↔ Sacral
  "2-14": "Beat. The keeper-of-the-keys channel between G and Sacral. You hold the direction, and you have the means to fund it. The gift is purposeful resource. The shadow is hoarding the means without spending them on the direction.",

  "5-15": "Rhythm. The flow channel between G and Sacral. You set a pace that includes everyone, even the people who didn't expect to be welcomed. The gift is inclusive timing. The shadow is forcing your rhythm onto someone whose body keeps a different one.",

  "29-46": "Discovery. The yes-to-the-body channel between G and Sacral. You commit, and the work shows you what you committed to. The gift is success that arrives by surprise. The shadow is saying yes to everything and learning the same lesson 5 times.",

  // G ↔ Ego
  "25-51": "Initiation. The shock channel between G and Ego. You wake people up, sometimes by accident, sometimes on purpose. The gift is courage that catalyses others. The shadow is provocation for its own sake.",

  // G ↔ Spleen (integration)
  "10-57": "Perfected Form. An integration channel between G and Spleen. Survival lives in the body, faster than thought. The gift is instinct so reliable you stop questioning it. The shadow is mistaking nervous-system signals for spiritual ones.",

  // Sacral ↔ Root
  "3-60": "Mutation. The pressured-change channel between Sacral and Root. Change arrives on its own timing, under pressure, when you can't force it. The gift is being the source of what's new. The shadow is trying to push the timing.",

  "9-52": "Concentration. The focused-attention channel between Sacral and Root. You can stay with one thing for far longer than the people around you. The gift is sustained depth. The shadow is missing the larger context because you're still on page 1.",

  "42-53": "Maturation. The cycle-completion channel between Sacral and Root. You finish what you started, and you start carefully because you know you'll be in it for a while. The gift is discipline. The shadow is grim duty when the joy has already left.",

  // Sacral ↔ Solar Plexus
  "6-59": "Mating. The intimacy channel between Sacral and Solar Plexus. Chemistry, attraction, the labour of close relationships. You read people through your body. The gift is a strong pull. The shadow is choosing nobody, or choosing everybody.",

  // Sacral ↔ Spleen
  "27-50": "Preservation. The caregiving channel between Sacral and Spleen. You take care of others, which is your gift, and your trap. The gift is the steady caretaker. The shadow is care that becomes captivity for both of you.",

  "34-57": "Power. An integration channel between Sacral and Spleen. Pure response in the present, with the spleen's instinct attached. The gift is power that arrives without thought. The shadow is reactivity that bypasses the mind entirely.",

  // Solar Plexus ↔ Ego
  "37-40": "Community. The bargain channel between Solar Plexus and Ego. You are the family-maker, the deal-broker, the one who knows who is in and who is out. Loyalty is the currency. The shadow is staying in obligations that have already ended.",

  // Solar Plexus ↔ Root
  "30-41": "Recognition. The fantasy channel between Solar Plexus and Root. You imagine what hasn't yet existed and pull it toward you. The gift is being the dream that drives others forward. The shadow is fantasy as escape from what's actually here.",

  "19-49": "Synthesis. The need-sensitivity channel between Solar Plexus and Root. You feel the unmet need in the room, the relationship, the project. The gift is anticipating what's about to be required. The shadow is over-providing for needs no one asked you to meet.",

  "39-55": "Emoting. The spirit-mood channel between Solar Plexus and Root. Your emotional state is the message itself. Your moods are content, not noise. The shadow is moods that become contagious storms.",

  // Ego ↔ Spleen
  "26-44": "Surrender. The transmitter channel between Ego and Spleen. You can sell anything you actually believe. Strong memory for people, debts, what was promised. Persuasion is your tool. The shadow is selling things you don't quite believe yourself.",

  // Spleen ↔ Root
  "28-38": "Struggle. The fight-for-purpose channel between Spleen and Root. You will fight, and the question is what's worth fighting for. The gift is finding it. The shadow is fighting because fighting feels familiar.",

  "32-54": "Transformation. The ambition channel between Spleen and Root. You climb what's still moving, work in what's still changing. The gift is endurance through transition. The shadow is climbing the wrong ladder for so long that you forget what you were after.",

  "18-58": "Judgment. The corrective-vision channel between Spleen and Root. You see what's broken, and you find joy in fixing it. The gift is improvement nobody else thought to attempt. The shadow is finding fault in things that were already good enough.",
};

// Lower-first gate-pair key.
export function channelKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// ── Type / Authority / Strategy / Profile copy ─────────────────────────────────

export const TYPE_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "You have sustained, responsive energy. The right thing arrives, and your body knows. Your work is to wait long enough to feel the yes when it comes, and to trust it once you do.",
  "Manifesting Generator": "You move faster than a Generator, in less linear paths. You skip steps, double back, change directions. The path is right because you walked it. Wait to respond, then inform people what you're doing.",
  "Manifestor": "You start things. You don't need permission, and you don't owe anyone an explanation. The courtesy of informing people what you're about to do stops them arguing with you.",
  "Projector": "You guide, you read, you see patterns other people miss. Your strategy is to wait for the invitation. Recognition that comes to you is real. Chasing recognition does not work.",
  "Reflector": "You are lunar in design. You reflect the people and places around you. Big decisions need a full lunar cycle, 28 days, to clarify. The cycle is your authority.",
};

export const AUTHORITY_DESCRIPTIONS: Record<Authority, string> = {
  "Emotional": "Wait through the wave. Clarity arrives at the bottom of the feeling. A fast yes given before the wave crests is not yet your truth.",
  "Sacral": "Listen for the gut sound before words form. The uh-huh, the uh-uh. Your body answers before your mind has time to negotiate.",
  "Splenic": "Quiet, instant, only-once. Your spleen sends a soft signal at the moment a choice arrives. Miss it, and it doesn't repeat.",
  "Ego Manifested": "Your willpower knows. If your heart wants it, you have what's needed to do it. If it doesn't, no amount of reasoning will make the energy show up.",
  "Ego Projected": "Your truth runs through what you say, in the moment of saying it. Listen to your own voice; that is how you find out what you mean.",
  "Self-Projected": "Your truth lives in the throat after passing through the G. Your identity speaks itself out loud. Talk it through with someone who only listens.",
  "Mental Projected": "Talk the decision through, out loud, with people who know you. Speaking it makes it clear. Sitting alone with it does not.",
  "Lunar": "28 days. No major decision without a full lunar cycle of moving through the pattern. The cycle is the authority; the moon keeps the time.",
  "None": "No fixed inner authority. Your design uses something else as guide. The Journey Narrative goes into this in detail.",
};

export const STRATEGY_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "Wait to respond.",
  "Manifesting Generator": "Wait to respond, then inform.",
  "Manifestor": "Inform before you act.",
  "Projector": "Wait for the invitation.",
  "Reflector": "Wait a lunar cycle.",
};

// 12 conscious/unconscious profile combinations.
export const PROFILE_DESCRIPTIONS: Record<string, string> = {
  "1/3": "Investigator-experimenter. You build a deep foundation through study, then test what you learned by walking into it. Most of your errors are research that becomes wisdom.",
  "1/4": "Investigator-friend. You build deep knowledge and share it through the people you already trust. Your influence travels through your existing relationships.",
  "2/4": "Natural-friend. You have a gift you forget you have, until someone you know names it for you. People invite you to use it; that is how the work moves.",
  "2/5": "Hermit-heretic. People project saviour and betrayer onto you, sometimes both at once. Solitude keeps you yourself. You emerge when called for the practical fix.",
  "3/5": "Experimental-heretic. You learn by trying. Your failures are public, and they teach you. The world keeps bringing you new problems to solve.",
  "3/6": "Experimental-role-model. Two halves to your life. The first: trial and error, mistakes, getting to know the terrain. The second: watching, knowing, having lived enough to see the patterns.",
  "4/6": "Opportunist-role-model. Your influence travels through your network and your example. People watch how you move.",
  "4/1": "Opportunist-investigator. Networks of trusted friends combined with deep foundational knowledge. You connect trust and rigour.",
  "5/1": "Heretic-investigator. People expect you to solve it. You will, if your foundation is solid. Get clear on what you actually know before you arrive.",
  "5/2": "Heretic-hermit. People call you out for things you didn't choose to be known for. Privacy keeps you sane.",
  "6/2": "Role-model-hermit. 3 life chapters: the trial years, the watching years, and the wisdom years. Most of your work in the world happens in the 3rd chapter.",
  "6/3": "Role-model-experimental. You live and learn, again and again, until the wisdom is unmistakable, even to you.",
};

// ── Synopsis ───────────────────────────────────────────────────────────────────
// A paragraph-long through-line that pulls together type, profile, authority,
// strategy, defined channels, and incarnation cross. Generated dynamically per
// chart so every reader gets their own custom version.

interface SynopsisChannel { name: string; }

export function chartSynopsis(chart: Chart, channels: SynopsisChannel[]): string {
  const { type, profile, authority, strategy, incarnationCross } = chart;
  const authPart = authority === "None" ? "" : `${authority} `;

  const id = `You are a ${profile} ${authPart}${type}.`;
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

  const crossLine = `Your incarnation cross is ${incarnationCross}, the arc your life is here to play out. The Journey Narrative reads it in full.`;

  return `${id} ${strategyLine} ${channelsLine} ${crossLine}`;
}
