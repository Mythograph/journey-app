import type { Authority, HdType, Chart } from "./types.js";

// ── Channel mini-essays ────────────────────────────────────────────────────────
// Keyed by `${gateA}-${gateB}` with the lower gate first. Each description names
// the channel's gift and shadow — the place where your design carries both a
// natural strength and a wound that can develop when the gift is forced or
// refused.

export const CHANNEL_DESCRIPTIONS: Record<string, string> = {
  // Head ↔ Ajna
  "4-63": "The doubt-and-answer channel between Head and Ajna. You ask 'how do you know?' as a default move. The gift is catching the broken step in other people's reasoning. The wound is using the same skill on yourself until you can't move.",

  "24-61": "The reflective-knowing channel between Head and Ajna. You sit with not-knowing until clarity arrives. Sometimes for years. The gift is insight that needs silence to land. The wound is using your mind as a hiding place from action.",

  "47-64": "The pattern-recognition channel between Head and Ajna. You replay old confusion until it becomes a story you can tell. Not on demand. The gift is making sense of what looked like chaos. The wound is overinvestment in the past.",

  // Ajna ↔ Throat
  "17-62": "The opinion-as-fact channel between Ajna and Throat. You speak in organised claims, with detail attached. You sound certain because you are. The wound is mistaking opinion for objective truth, and the loneliness that follows when others don't see what you see.",

  "11-56": "The storyteller channel between Ajna and Throat. You collect ideas, images, fragments. Your job is to tell stories with them, which makes you a teacher who works through narrative. The wound is collecting endlessly without ever telling, and the quiet ache of unspoken stories.",

  "23-43": "The individual-genius channel between Ajna and Throat. Insight arrives whole, in language only you have. The gift is original thinking. The wound is being misread when the timing is wrong, and learning early to keep the strangest thoughts to yourself.",

  // Throat ↔ G
  "7-31": "The leadership channel between Throat and G. People look to you for direction, in the future-forward sense. The gift is leading by recognition. The wound is forcing the role when the invitation hasn't arrived, and being met with the resistance that follows.",

  "1-8": "The creative-individuality channel between Throat and G. You make something only you could have made, and you say it the way only you would say it. The gift is creative singularity. The wound is waiting for approval that isn't coming, and the long silences when the world hasn't caught up to you yet.",

  "13-33": "The witness channel between Throat and G. You hold experiences, then tell them later, when the meaning arrives. The gift is being a keeper of stories. The wound is becoming the receptacle for everything everyone tells you, and the heaviness of carrying what isn't yours.",

  "10-20": "An integration channel between Throat and G. The commitment to live what you actually believe, in the present, out loud. The gift is unmistakable self-presence. The wound is performing your principles instead of living them, and the exhaustion of a self you have to constantly maintain.",

  // Throat ↔ Sacral
  "20-34": "An integration channel between Throat and Sacral. You are most magnetic when fully absorbed in what you're doing now. People follow your action more than your explanation. The wound is performing for an audience rather than being absorbed in the work itself.",

  // Throat ↔ Ego
  "21-45": "The dominion channel between Throat and Ego. You have natural authority over material resources: territory, money, the means of work. The gift is leadership of the tangible. The wound is control that becomes punishment when crossed, and the isolation of always needing to be in charge.",

  // Throat ↔ Solar Plexus
  "12-22": "The mood-as-instrument channel between Throat and Solar Plexus. Your social presence rides your emotional wave. In clarity you open rooms; in cloud you withdraw. The wound is being told your moods are too much, and learning to mute the very signal that is your gift.",

  "35-36": "The jack-of-all-trades channel between Throat and Solar Plexus. You go through experiences quickly, learn what you came for, and move on. The gift is range. The wound is restlessness that never lets a thing finish, and the shame of unfinished work in a culture that prizes completion.",

  // Throat ↔ Spleen
  "16-48": "The talent-rehearsal channel between Throat and Spleen. You repeat your craft until depth arrives, audible to others. The gift is mastery through enthusiasm. The wound is performing before the depth has arrived, and the embarrassment of being seen mid-rehearsal.",

  // G ↔ Sacral
  "2-14": "The keeper-of-the-keys channel between G and Sacral. You hold the direction, and you have the means to fund it. The gift is purposeful resource. The wound is hoarding the means without spending them on the direction, and the slow dimming that follows when wealth has no soul attached.",

  "5-15": "The flow channel between G and Sacral. You set a pace that includes everyone, even the people who didn't expect to be welcomed. The gift is inclusive timing. The wound is forcing your rhythm onto someone whose body keeps a different one, or breaking your own rhythm to please someone else's.",

  "29-46": "The yes-to-the-body channel between G and Sacral. You commit, and the work shows you what you committed to. The gift is success that arrives by surprise. The wound is saying yes to everything and learning the same lesson five times, and the exhaustion that comes from a body whose yes was never honoured.",

  // G ↔ Ego
  "25-51": "The shock channel between G and Ego. You wake people up, sometimes by accident, sometimes on purpose. The gift is courage that catalyses others. The wound is being the one who is never quite forgiven for the thing that needed to be said.",

  // G ↔ Spleen (integration)
  "10-57": "An integration channel between G and Spleen. Survival lives in the body, faster than thought. The gift is instinct so reliable you stop questioning it. The wound is mistaking nervous-system signals for spiritual ones, or being told your knowing is irrational and learning to override it.",

  // Sacral ↔ Root
  "3-60": "The pressured-change channel between Sacral and Root. Change arrives on its own timing, under pressure, when you can't force it. The gift is being the source of what's new. The wound is trying to push the timing, and the despair of pressure with nowhere to go.",

  "9-52": "The focused-attention channel between Sacral and Root. You can stay with one thing for far longer than the people around you. The gift is sustained depth. The wound is missing the larger context because you're still on page one, and being labelled obsessive by people who never went deep enough to know what they were missing.",

  "42-53": "The cycle-completion channel between Sacral and Root. You finish what you started, and you start carefully because you know you'll be in it for a while. The gift is discipline. The wound is grim duty when the joy has already left, and the fear of starting at all because you know you cannot easily stop.",

  // Sacral ↔ Solar Plexus
  "6-59": "The intimacy channel between Sacral and Solar Plexus. Chemistry, attraction, the labour of close relationships. You read people through your body. The gift is a strong pull. The wound is choosing nobody, or choosing everybody, and the loneliness either ending leaves behind.",

  // Sacral ↔ Spleen
  "27-50": "The caregiving channel between Sacral and Spleen. You take care of others, which is your gift, and your trap. The gift is the steady caretaker. The wound is care that becomes captivity for both of you, and the slow erosion of the self that gives without ever receiving.",

  "34-57": "An integration channel between Sacral and Spleen. Pure response in the present, with the spleen's instinct attached. The gift is power that arrives without thought. The wound is reactivity that bypasses the mind entirely, and the regret of words and actions that arrived faster than reflection.",

  // Solar Plexus ↔ Ego
  "37-40": "The bargain channel between Solar Plexus and Ego. You are the family-maker, the deal-broker, the one who knows who is in and who is out. Loyalty is the currency. The wound is staying in obligations that have already ended, out of love for who someone used to be.",

  // Solar Plexus ↔ Root
  "30-41": "The fantasy channel between Solar Plexus and Root. You imagine what hasn't yet existed and pull it toward you. The gift is being the dream that drives others forward. The wound is fantasy as escape from what's actually here, and the disappointment of a present that never matches the imagined future.",

  "19-49": "The need-sensitivity channel between Solar Plexus and Root. You feel the unmet need in the room, the relationship, the project. The gift is anticipating what's about to be required. The wound is over-providing for needs no one asked you to meet, and the resentment that builds when the giving wasn't seen.",

  "39-55": "The spirit-mood channel between Solar Plexus and Root. Your emotional state is the message itself. Your moods are content, not noise. The wound is moods that become contagious storms, and a lifetime of being told to cheer up by people who could not feel what you were feeling.",

  // Ego ↔ Spleen
  "26-44": "The transmitter channel between Ego and Spleen. You can sell anything you actually believe. Strong memory for people, debts, what was promised. Persuasion is your tool. The wound is selling things you don't quite believe yourself, and the slow drift away from your own truth.",

  // Spleen ↔ Root
  "28-38": "The fight-for-purpose channel between Spleen and Root. You will fight, and the question is what's worth fighting for. The gift is finding it. The wound is fighting because fighting feels familiar, and the fatigue of a life spent in opposition to things that didn't matter.",

  "32-54": "The ambition channel between Spleen and Root. You climb what's still moving, work in what's still changing. The gift is endurance through transition. The wound is climbing the wrong ladder for so long that you forget what you were after, and the grief of arriving at the top of the wrong mountain.",

  "18-58": "The corrective-vision channel between Spleen and Root. You see what's broken, and you find joy in fixing it. The gift is improvement nobody else thought to attempt. The wound is finding fault in things that were already good enough, and the loneliness of being the one who can never quite let it be.",
};

// Lower-first gate-pair key.
export function channelKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

// ── Type ───────────────────────────────────────────────────────────────────────
// Each type is a different shape of energy in the world — a different way of
// initiating, responding, or reflecting. The descriptions below name the
// energetic essence, the wound that develops when the design is forced against
// itself, and the alignment that lets the gifts move freely.

export const TYPE_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "You carry a sustained, renewable life-force — a sacral engine that lights up when something is genuinely yours to do, and goes quiet when it isn't. Generators are roughly 70% of the world; the work that sustains and shapes life moves through your hands. The wound for many Generators is years spent initiating instead of responding — pushing toward goals that looked right on paper, ignoring the body's signals, and ending up exhausted in a life that doesn't quite fit. When you learn to trust the gut yes that arrives before language, work stops feeling like effort and starts feeling like devotion. Your alignment is mastery through response; your purpose path moves through whatever your body keeps returning to with energy and joy.",

  "Manifesting Generator": "You are built to move quickly and non-linearly — to feel the sacral yes, leap, change direction mid-stride, and double back when something pulls. Your design holds the engine of a Generator with the speed of a Manifestor. The wound is a lifetime of being told to slow down, finish what you started, stay on one path; forcing yourself to follow a single thread when your design needs many can leave you feeling scattered, wrong, or behind. When you respond and then inform the people your changes affect before pivoting, the speed becomes grace rather than chaos. Your alignment is multi-faceted mastery; the path turns out to be right because you walked it, in your own order.",

  "Manifestor": "You carry initiating energy — the rare capacity to start things from a still place, without needing permission, invitation, or anyone else's yes. Manifestors are about 9% of the world. The wound is often early: a hand came down on that initiating impulse — 'don't, stop, who do you think you are' — and you learned to swallow the urge to act. Many Manifestors live behind a held breath, waiting for permission that wasn't theirs to wait for. When you inform the people your action will affect and then move, the resistance softens, and the world stops fighting your starts. Your alignment is freedom; your purpose path is to bring something new into being.",

  "Projector": "You are a guide and a seer — designed to read systems, recognise the right timing in others, and direct energy more skilfully than the people you guide. Projectors are about 20% of the world, and your gift is in the seeing. The wound is exhaustion from unrecognised effort: working hard to be seen, offering insight that wasn't asked for, and burning out in environments that don't reflect your gifts. When you wait for the genuine invitation — to a relationship, a role, a question — your wisdom lands, and the right people keep finding you. Your alignment is recognition; your purpose path is shown to you by those who see you clearly.",

  "Reflector": "You are the rarest design — barely 1% of the world — lunar and sampling, here to reflect the health of whatever community you stand inside. Your openness is a gift: you taste every energy that passes through, and you mirror back what is actually present. The wound is pressure to behave like the consistent types around you — to know quickly, decide quickly, commit quickly — when your design needs a full lunar cycle to taste a thing from every angle. When you give your big decisions twenty-eight days and choose your environments carefully, you become a clear mirror, and the world sees itself in you. Your purpose path is to show the room what it actually is.",
};

// ── Authority ──────────────────────────────────────────────────────────────────
// Authority is the way your body — not your mind — knows what's true for you.

export const AUTHORITY_INTRO =
  "Your authority is how your body knows. It is the channel through which your design speaks its yes and its no, beneath the noise of the mind. Decisions made through your authority keep you in alignment with who you actually are; decisions made against it are how, slowly, you lose yourself in choices that look right on paper and feel wrong in the body. Living from authority is not mystical — it is the simple, daily practice of letting your design choose for you. The body always knows first.";

export const AUTHORITY_DESCRIPTIONS: Record<Authority, string> = {
  "Emotional": "Your clarity does not arrive in a single moment — it arrives at the bottom of an emotional wave that has had time to move all the way through you. Hope and disappointment, excitement and doubt, will both visit any decision; the truth is what's left when the wave is finished. The wound is years of yes-on-the-crest and no-in-the-trough — agreements made in optimism and unmade in the dip, and the slow erosion of trust from the people around you who never knew which version of you they would meet. When you wait the wave out, you choose with your whole self, and the choice holds. There is no emergency that justifies skipping the wave.",

  "Sacral": "Your authority lives in the gut — a sound, an uh-huh or uh-uh, that arrives before language and answers honestly whether your mind likes the answer or not. The wound is having been trained to override that sound — to be polite, reasonable, accommodating, to talk yourself into a yes the body never gave. Years of overriding leaves the sacral quieter and the fatigue louder. When you let the gut speak first and your words come second, your energy stops betraying you, and the right work, the right people, the right life flow toward you. The yes is felt; the no is felt. There is nothing to negotiate.",

  "Splenic": "Your authority is a quiet, instant signal in the present moment — an instinct that whispers once and does not repeat. It is the most subtle of the inner authorities and the easiest to miss in noise or speed. The wound is having ignored that whisper enough times that you stopped trusting it, and the strange grief of knowing in hindsight what your body had told you in the moment. When you slow down, listen for it, and let it move you in real time, your spleen keeps you safe and aligned with what is actually alive for you. It will not argue. It will simply tell you, once.",

  "Ego Manifested": "Your authority lives in the heart and willpower — a clear, voiced 'I want' or 'I will' that knows what it has the energy for. If your heart is genuinely in it, you have what it takes; if it isn't, no amount of discipline will manufacture the energy. The wound is making promises from obligation rather than from genuine want, and burning out trying to keep them. When you let your willpower speak honestly and out loud — to yourself, and to the people you commit to — your word holds, and the work you choose feels like yours.",

  "Ego Projected": "Your truth lives in your voice — you find out what you actually mean by hearing yourself say it, with the right person listening. The wound is keeping it inside, weighing the decision in silence, never quite reaching clarity because the channel of clarity is speech. When you speak it, in the moment, to someone who only listens, your alignment becomes audible to you, and your direction makes itself known.",

  "Self-Projected": "Your authority moves from your G centre through your throat — your identity speaks itself, and you find your truth in the words your own voice carries. The wound is making decisions in your head, alone, second-guessing yourself in a loop that never lands. When you talk it out with a trusted listener and listen to what you actually say, your direction reveals itself. You are not deciding; you are noticing what you already are.",

  "Mental Projected": "You have no inner motor authority — your truth is found by talking, in the company of people who know you. Your design is a sounding board that needs other sounding boards. The wound is being pushed to decide alone, on the spot, when your design needs the shared field of conversation. When you speak the question through with your trusted circle and listen for what the conversation makes clear, the right environment finds you, and the right life unfolds inside it.",

  "Lunar": "Your authority is a lunar cycle — twenty-eight days of moving the question through every place, every mood, every weather your body can sample. The wound is being rushed, told to commit quickly, treated like the consistent types around you. When you give big decisions a full cycle, your body taste-tests every angle, and the right choice clarifies in its own time. The cycle is the authority; the moon keeps the time. There is no short-cut, and there does not need to be.",

  "None": "You have no fixed inner authority — your design uses environment, conversation, and time as your way of knowing. The wound is being asked to decide as if you were one of the consistent types, when your truth lives in the field around you rather than inside you. When you trust the rhythm your design actually needs, the right path makes itself known. The Journey Narrative goes into this in detail.",
};

// ── Strategy ───────────────────────────────────────────────────────────────────

export const STRATEGY_DESCRIPTIONS: Record<HdType, string> = {
  "Generator": "Wait to respond.",
  "Manifesting Generator": "Wait to respond, then inform.",
  "Manifestor": "Inform before you act.",
  "Projector": "Wait for the invitation.",
  "Reflector": "Wait a lunar cycle.",
};

// ── Profile lines ──────────────────────────────────────────────────────────────
// Your profile is two numbers: the conscious line (your personality — how you
// see yourself) and the unconscious line (your design — how others see you and
// how your body moves through the world). Both lines are always present; they
// are two halves of the same self.

export interface LineDescription {
  name: string;
  conscious: string;
  unconscious: string;
}

export const LINE_DESCRIPTIONS: Record<number, LineDescription> = {
  1: {
    name: "Investigator",
    conscious:
      "You are someone who needs to know. You build foundations carefully, study the ground beneath your feet, and feel anxious until the research is done. Knowledge is your safety. Until you have it, you don't quite trust yourself to speak.",
    unconscious:
      "Others feel a serious presence with depth — someone with authority when the work has been done, and visible hesitation when it hasn't. Your body broadcasts the foundation, or its absence, before you say a word.",
  },
  2: {
    name: "Hermit",
    conscious:
      "You are private by design. Solitude is not a preference but a need — the studio, the garden, the quiet room is where you become yourself. You forget you have a gift until someone names it, and you are often surprised by what comes naturally.",
    unconscious:
      "Others see a natural talent so obvious it looks like it shouldn't need permission. People will call you out of your hermitage to use that gift, and the right calls match the work you were already doing alone.",
  },
  3: {
    name: "Experimenter",
    conscious:
      "You learn by trying. Your life is a series of experiments — bonds made and broken, projects begun and abandoned, mistakes that became wisdom. Failure is not shame; it is research. You discover what works by walking into what doesn't.",
    unconscious:
      "Others see resilience and embodiment, a slightly chaotic energy that has clearly lived through things. People feel your hard-won knowing — the kind that only arrives in someone who has actually been in the fire.",
  },
  4: {
    name: "Opportunist",
    conscious:
      "You are a person of bonds. Your life moves through your network — the friends, family, and colleagues you have built deep ties with. Strangers are uncomfortable until they aren't; the right next chapter usually arrives through someone you already know.",
    unconscious:
      "Others see a warm, foundational, externally-oriented person who carries their community with them. People feel that your influence travels through the relationships you already have, and that you are most yourself in connection.",
  },
  5: {
    name: "Heretic",
    conscious:
      "You are practical, problem-solving, and most yourself when you are called in to fix what's broken. You meet the world with a useful answer and prefer to do the work rather than be watched doing it. You are the one people call in a crisis.",
    unconscious:
      "Others project a saviour and a heretic onto you, often before they have actually met you. When the projection holds, you are revered; when it breaks, you are blamed. Privacy is your protection, and the right people earn the real you over time.",
  },
  6: {
    name: "Role Model",
    conscious:
      "You live in three life chapters: a trial-and-error first chapter (until roughly thirty), a watching-from-the-roof second chapter (roughly thirty to fifty), and a wisdom-and-example third chapter. You are slowly becoming the person others will study.",
    unconscious:
      "Others see a trustworthy, embodied, slightly above-the-fray quality, even when you don't intend to be watched. People take their cues from how you move; your example is the lesson, not your words.",
  },
};

// ── Profile combinations ──────────────────────────────────────────────────────

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
  "1/3": "An investigator's hunger for foundation paired with an experimenter's willingness to learn by doing. You read everything, then go test it with your body. The wound is shame around the failures the world saw, and the loneliness of having needed to know more than anyone asked you to. The gift is wisdom no one can take from you, because you earned it by walking into the fire.",

  "1/4": "An investigator's depth of study, channeled through a network of trusted friends. You influence the people closest to you with what you have spent years quietly learning. The wound is the loneliness of preparing endlessly without ever feeling ready, and a sense that your gift is invisible to the wider world. The gift is a circle of people whose trust in you is built on something real.",

  "2/4": "A hermit's natural gift broadcast through the people who love you. You forget what you are good at until your network reflects it back, and the right work arrives through the people who already know you. The wound is being called out of your studio before the work is ready, and resenting the people whose love drew you out. The gift is showing up for your people from a place of actual mastery.",

  "2/5": "A hermit's natural gifts paired with the heretic's practical edge. People project both saviour and threat onto you, sometimes in the same conversation. The wound is being known for things you didn't choose to be known for, and being judged for projections you never agreed to wear. Solitude is your medicine; the people who find you in your hermitage are the ones who get the truth.",

  "3/5": "An experimenter's resilience paired with the heretic's mythic role. You learn by trying, your failures are public, and the world keeps bringing you new problems to solve. The wound is being expected to have answers you haven't yet earned, and being blamed when the projection breaks. The gift is a body of practical, hard-won wisdom forged in actual contact with the world.",

  "3/6": "An experimenter's first half of life paired with a role model's second half. The first thirty years are wild and full of bumps; somewhere around thirty you climb to the rooftop and watch from a distance; by fifty, you are the person others come to. The wound is grief over the mess of the first chapter, and impatience with the long quiet of the second. The gift is the embodied wisdom of someone who has actually lived.",

  "4/6": "An opportunist's network paired with a role model's example. Your influence travels through the people you love and through the way you move in the world. The wound is the loneliness of being watched, and the careful self-presentation that follows. The gift is friendships that age into deep trust as your example matures, and a third chapter spent living the wisdom your earlier years collected.",

  "4/1": "An opportunist's bonds combined with an investigator's foundation. You connect trust and rigour: your network experiences you as the friend who actually knows. The wound is feeling responsible for everyone in your circle, and the weight of being the reliable one. The gift is reliability that is real — when you say you know, the people who love you can take it to the bank.",

  "5/1": "A heretic's pragmatic call to fix what's broken paired with an investigator's foundation. People expect you to solve it; you can, when the foundation is solid. The wound is being blamed when the projection breaks, and the temptation to arrive before the research is done. The gift is being the one with both the answer and the receipts.",

  "5/2": "A heretic's practical pull paired with a hermit's natural gift. People call on you to fix things, then project on you when you cannot be everywhere at once. The wound is being known for things you didn't agree to be known for, and the bitterness of carrying other people's expectations. Privacy is what keeps you sane; your gift emerges in the time you spend out of view.",

  "6/2": "A role model's three-chapter arc paired with a hermit's natural gift. Most of your work in the world happens after fifty, and most of your gift emerges from the time you spend alone. The wound is feeling unfinished or behind for most of your life, while the consistent types around you appear to be ahead. The gift is a third chapter spent living what you actually know.",

  "6/3": "A role model's three-chapter arc paired with an experimenter's resilience. You will live and learn, again and again, through every chapter, until the wisdom is unmistakable even to you. The wound is exhaustion from how many times you had to be shown, and grief over the things the experiments cost. The gift is a kind of knowing that no one can argue with, because it was earned.",
};

// ── Incarnation Cross ──────────────────────────────────────────────────────────

export const INCARNATION_CROSS_INTRO =
  "Your incarnation cross is the through-line of your life — the four gates that name the role you came here to play. Of the 192 crosses, this is yours, and it tells you what the energetic gifts of your design are ultimately in service of. Your type is how you operate; your authority is how you decide; your profile is how you meet the world; your channels are the themes you keep returning to. The cross is what all of it is for.";

// ── Synopsis ───────────────────────────────────────────────────────────────────
// A paragraph-long through-line that pulls together type, profile, authority,
// channels, and incarnation cross. Generated dynamically per chart so every
// reader gets their own custom version. Returns HTML (rendered with set:html)
// so the Journey Narrative can be linked inline.

interface SynopsisChannel { name: string; }

const JN_LINK = '<a class="underline decoration-[#3a4f99]/40 underline-offset-4 hover:decoration-[#3a4f99]" href="/#journey-narrative">Journey Narrative</a>';

function indefiniteArticle(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function chartSynopsis(chart: Chart, channels: SynopsisChannel[]): string {
  const { type, profile, authority, incarnationCross } = chart;
  const profileName = PROFILE_NAMES[profile];
  const authPart = authority === "None" ? "" : `${authority} `;
  const profilePart = profileName
    ? ` — ${indefiniteArticle(profileName)} ${profileName}`
    : "";

  const opening = `You are a ${profile} ${authPart}${type}${profilePart}. Your design carries a particular shape — a set of energies, gifts, and sensitivities that have been with you since birth, and a path your life keeps drawing you toward.`;

  let channelsLine: string;
  if (channels.length === 0) {
    channelsLine =
      "You have no fully-defined channels, which is rare and meaningful — your design is a sensitive instrument, taking the colour of whoever and whatever stands beside you, and your wisdom lives in what you reflect back.";
  } else if (channels.length === 1) {
    channelsLine = `Your one defined channel — ${channels[0].name} — is the theme your life keeps returning to, the doorway where your gift and your wound both live.`;
  } else {
    const names = channels.map((c) => c.name);
    const list =
      names.length === 2
        ? `${names[0]} and ${names[1]}`
        : `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
    channelsLine = `Your defined channels — ${list} — are the themes your life keeps returning to, the doorways where your gifts and your wounds both live.`;
  }

  const crossLine = `Underneath all of it runs your incarnation cross — ${incarnationCross} — the larger purpose path your design is here to play out. The ${JN_LINK} reads each of these elements as one continuous story.`;

  return `${opening} ${channelsLine} ${crossLine}`;
}
