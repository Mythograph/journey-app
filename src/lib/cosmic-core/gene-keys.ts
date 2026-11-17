// Cosmic Core — Gene Keys layer
//
// Frequencies (Shadow -> Gift -> Siddhi), Golden Path sphere line
// expressions, the three sequences, and the sequence narrative builder.
// Ported from Story Loom's gene-keys.ts; sequences reflect the corrected
// state (Venus Purpose and Pearl Vocation spheres surfaced — the Vocation
// sphere reuses the Venus Core gate but reads the `vocation` line set).

export interface GeneKeyFrequency {
  shadow: string;
  gift: string;
  siddhi: string;
}

export interface GeneKeysProfile {
  // Activation Sequence — Life's Work
  lifesWork: number | null; lifesWorkLine: number | null;
  evolution: number | null; evolutionLine: number | null;
  radiance: number | null; radianceLine: number | null;
  purpose: number | null; purposeLine: number | null;
  // Venus Sequence — The Heart's Journey
  attraction: number | null; attractionLine: number | null;
  iq: number | null; iqLine: number | null;
  eq: number | null; eqLine: number | null;
  sq: number | null; sqLine: number | null;
  core: number | null; coreLine: number | null;
  // Pearl Sequence — Prosperity
  brand: number | null; brandLine: number | null;
  culture: number | null; cultureLine: number | null;
  pearl: number | null; pearlLine: number | null;
}

export const EMPTY_GENE_KEYS: GeneKeysProfile = {
  lifesWork: null, lifesWorkLine: null,
  evolution: null, evolutionLine: null,
  radiance: null, radianceLine: null,
  purpose: null, purposeLine: null,
  attraction: null, attractionLine: null,
  iq: null, iqLine: null,
  eq: null, eqLine: null,
  sq: null, sqLine: null,
  core: null, coreLine: null,
  brand: null, brandLine: null,
  culture: null, cultureLine: null,
  pearl: null, pearlLine: null,
};

export const GENE_KEY_FREQUENCIES: Record<number, GeneKeyFrequency> = {
  1: { shadow: "Entropy", gift: "Freshness", siddhi: "Beauty" },
  2: { shadow: "Dislocation", gift: "Orientation", siddhi: "Unity" },
  3: { shadow: "Chaos", gift: "Innovation", siddhi: "Innocence" },
  4: { shadow: "Intolerance", gift: "Understanding", siddhi: "Forgiveness" },
  5: { shadow: "Impatience", gift: "Patience", siddhi: "Timelessness" },
  6: { shadow: "Conflict", gift: "Diplomacy", siddhi: "Peace" },
  7: { shadow: "Division", gift: "Guidance", siddhi: "Virtue" },
  8: { shadow: "Mediocrity", gift: "Style", siddhi: "Exquisiteness" },
  9: { shadow: "Inertia", gift: "Determination", siddhi: "Invincibility" },
  10: { shadow: "Self-Obsession", gift: "Naturalness", siddhi: "Being" },
  11: { shadow: "Obscurity", gift: "Idealism", siddhi: "Light" },
  12: { shadow: "Vanity", gift: "Discrimination", siddhi: "Purity" },
  13: { shadow: "Discord", gift: "Discernment", siddhi: "Empathy" },
  14: { shadow: "Compromise", gift: "Competence", siddhi: "Bounteousness" },
  15: { shadow: "Dullness", gift: "Magnetism", siddhi: "Florescence" },
  16: { shadow: "Indifference", gift: "Versatility", siddhi: "Mastery" },
  17: { shadow: "Opinion", gift: "Far-Sightedness", siddhi: "Omniscience" },
  18: { shadow: "Judgment", gift: "Integrity", siddhi: "Perfection" },
  19: { shadow: "Co-dependence", gift: "Sensitivity", siddhi: "Sacrifice" },
  20: { shadow: "Superficiality", gift: "Self-Assurance", siddhi: "Presence" },
  21: { shadow: "Control", gift: "Authority", siddhi: "Valor" },
  22: { shadow: "Dishonor", gift: "Graciousness", siddhi: "Grace" },
  23: { shadow: "Complexity", gift: "Simplicity", siddhi: "Quintessence" },
  24: { shadow: "Addiction", gift: "Invention", siddhi: "Silence" },
  25: { shadow: "Constriction", gift: "Acceptance", siddhi: "Universal Love" },
  26: { shadow: "Pride", gift: "Artfulness", siddhi: "Invisibility" },
  27: { shadow: "Selfishness", gift: "Altruism", siddhi: "Selflessness" },
  28: { shadow: "Purposelessness", gift: "Totality", siddhi: "Immortality" },
  29: { shadow: "Half-Heartedness", gift: "Commitment", siddhi: "Devotion" },
  30: { shadow: "Desire", gift: "Lightness", siddhi: "Rapture" },
  31: { shadow: "Arrogance", gift: "Leadership", siddhi: "Humility" },
  32: { shadow: "Failure", gift: "Preservation", siddhi: "Veneration" },
  33: { shadow: "Forgetting", gift: "Mindfulness", siddhi: "Revelation" },
  34: { shadow: "Force", gift: "Strength", siddhi: "Majesty" },
  35: { shadow: "Hunger", gift: "Adventure", siddhi: "Boundlessness" },
  36: { shadow: "Turbulence", gift: "Humanity", siddhi: "Compassion" },
  37: { shadow: "Weakness", gift: "Equality", siddhi: "Tenderness" },
  38: { shadow: "Struggle", gift: "Perseverance", siddhi: "Honor" },
  39: { shadow: "Provocation", gift: "Dynamism", siddhi: "Liberation" },
  40: { shadow: "Exhaustion", gift: "Resolve", siddhi: "Divine Will" },
  41: { shadow: "Fantasy", gift: "Anticipation", siddhi: "Emanation" },
  42: { shadow: "Expectation", gift: "Detachment", siddhi: "Celebration" },
  43: { shadow: "Deafness", gift: "Insight", siddhi: "Epiphany" },
  44: { shadow: "Interference", gift: "Teamwork", siddhi: "Synarchy" },
  45: { shadow: "Dominance", gift: "Synergy", siddhi: "Communion" },
  46: { shadow: "Seriousness", gift: "Delight", siddhi: "Ecstasy" },
  47: { shadow: "Oppression", gift: "Transmutation", siddhi: "Transfiguration" },
  48: { shadow: "Inadequacy", gift: "Resourcefulness", siddhi: "Wisdom" },
  49: { shadow: "Reaction", gift: "Revolution", siddhi: "Rebirth" },
  50: { shadow: "Corruption", gift: "Equilibrium", siddhi: "Harmony" },
  51: { shadow: "Agitation", gift: "Initiative", siddhi: "Awakening" },
  52: { shadow: "Stress", gift: "Restraint", siddhi: "Stillness" },
  53: { shadow: "Immaturity", gift: "Expansion", siddhi: "Superabundance" },
  54: { shadow: "Greed", gift: "Aspiration", siddhi: "Ascension" },
  55: { shadow: "Victimhood", gift: "Freedom", siddhi: "Freedom" },
  56: { shadow: "Distraction", gift: "Enrichment", siddhi: "Intoxication" },
  57: { shadow: "Unease", gift: "Intuition", siddhi: "Clarity" },
  58: { shadow: "Dissatisfaction", gift: "Vitality", siddhi: "Bliss" },
  59: { shadow: "Dishonesty", gift: "Intimacy", siddhi: "Transparency" },
  60: { shadow: "Limitation", gift: "Realism", siddhi: "Justice" },
  61: { shadow: "Psychosis", gift: "Inspiration", siddhi: "Sanctity" },
  62: { shadow: "Intellectualism", gift: "Precision", siddhi: "Impeccability" },
  63: { shadow: "Doubt", gift: "Inquiry", siddhi: "Truth" },
  64: { shadow: "Confusion", gift: "Imagination", siddhi: "Illumination" },
};

export function getGeneKey(num: number | null | undefined): GeneKeyFrequency | null {
  if (!num || num < 1 || num > 64) return null;
  return GENE_KEY_FREQUENCIES[num] ?? null;
}

// ─── Per-sphere line expressions (Golden Path) ────────────────────────────────

export interface SphereLineExpression {
  name: string;
  description: string;
}

export const SPHERE_LINE_EXPRESSIONS: Record<string, Record<number, SphereLineExpression>> = {
  // Activation Sequence
  lifesWork: {
    1: { name: "Creator", description: "I'm here to create things the world hasn't seen yet. That takes courage, and it takes time in deep contemplation so I understand why I'm called to make what I make." },
    2: { name: "Dancer", description: "I'm here to lose myself in passion. When I surrender to my muse and get absorbed in the art of what I do, my work moves with grace and elegance." },
    3: { name: "Charger", description: "I'm here to be big, colorful and a little unpredictable. I grow by taking risks and challenging myself, and I'm safest when I let myself try, fail and try again." },
    4: { name: "Server", description: "I'm here to be focused and intentional about the influence I have on other people. I serve best when I choose a clear direction and move in it." },
    5: { name: "Fixer", description: "I'm here to be practical: to fix what's worth fixing and keep good things running. I'm allowed to want a wide impact, and efficiency is part of my gift." },
    6: { name: "Teacher", description: "I'm here to teach. I learn by trying many things and understanding them deeply, and then I help other people see their own gifts." },
  },
  evolution: {
    1: { name: "Self Empowerment", description: "My lifelong lesson is self-empowerment. My creativity is both my gift and my challenge, and confidence can come and go. I lean on others when I need to, then return to my own ground, and I grow by letting my confidence be seen." },
    2: { name: "Passion and Relationships", description: "I want to feel safe being passionate. This line works largely below awareness, so I often look to others for feedback about it. Jealousy is its shadow. I feel free to have what I want when the people around me have what they want too." },
    3: { name: "Energy and Experience", description: "My life is a search for experience. My growth comes from letting go of expectations and giving myself permission to fail. The gift turns up along the way, inside the experiences themselves." },
    4: { name: "Love and Community", description: "My challenge is balancing time with people and time alone, without swinging to either extreme. I can feel trapped in always serving and helping. My gift is inviting others into a heart-based way of living and working, rooted in community and balance." },
    5: { name: "Impact", description: "I affect people more than I realize. Its shadow is disappointment when I can't solve the problems others project onto me, or taking on more than I can handle to feel worthy. My growth is in clear boundaries." },
    6: { name: "Vision", description: "My life moves through a whole story, and my vision changes as I mature. The shadow is trying to plan and control every step. The growth is surrendering to how life wants to guide me. I care deeply about a better future for everyone." },
  },
  radiance: {
    1: { name: "Solitude", description: "I need real solitude, in body and mind. The more time I spend alone, the more connected I become." },
    2: { name: "Marriage", description: "My radiance grows through close engagement, often with one person or one pursuit that truly lights me up. An intense, devoted relationship opens it." },
    3: { name: "Interaction", description: "My radiance grows through variety: many people, many places, lots of movement. What I see along the way often calls me to help people who have less." },
    4: { name: "Outreach", description: "My radiance is rooted in time alone and aimed at helping others. I draw people in naturally, so I choose them carefully. My body thrives among trusted people, and I open hearts when I reach out." },
    5: { name: "Leadership", description: "Leading and helping others makes me radiant. I know I have something special to offer, and I offer it best in my own style." },
    6: { name: "Dream", description: "I carry an inner dream that keeps growing and shifting. People and places will change around me. Time in nature is what keeps bringing me back to health." },
  },
  purpose: {
    1: { name: "Bones", description: "My purpose lives in my body's structure. I need deep, solid grounding, as if my bones hold the record of where I've been. When I'm out of alignment, it may show up as stiffness or aches in my bones and joints." },
    2: { name: "Posture", description: "My purpose lives in my spine and in how I carry myself. Following my body's own rhythm keeps me on the path of least resistance. When I'm out of alignment, it may show up in my posture or my core." },
    3: { name: "Movement", description: "My purpose lives in movement. I need to move my body and follow the currents from one thing to the next, and too much routine can feel confining. When I'm out of alignment, my energy and circulation may feel sluggish." },
    4: { name: "Breath", description: "My purpose lives in my breath, which keeps me in tune with the rhythm of life. I bring people together through that shared rhythm. When I'm out of alignment, I may notice it first in my breathing." },
    5: { name: "Voice", description: "My purpose lives in the sound of my voice. Speaking, singing and vocalizing help bring things into being, and complaining drains me. When I'm out of alignment, I may feel it in my throat." },
    6: { name: "Aura", description: "My purpose lives in my presence. My energy speaks loudly and does much of the work for me, so my intention matters. People feel it through what I make, and I read other people's energy clearly too." },
  },
  // Venus Sequence
  attraction: {
    1: { name: "Fertility", description: "In the shadow, I swing between all or nothing and see life as either lack or plenty. At my best, I stay aligned by seeing the whole picture, and I protect myself from the overstimulation that leaves me numb." },
    2: { name: "Passion", description: "In the shadow, a deep desire to receive gets tangled with feeling inadequate next to others. At my best, I claim my desires with an open heart, and I feel passionate and free." },
    3: { name: "Playfulness", description: "In the shadow, I can be all-in or completely closed off, and play can tip into risk. At my best, I bring adventure and play to what I desire, even when I'm still finding the specifics." },
    4: { name: "Romance", description: "In the shadow, I can turn distant and unavailable, and I'm very sensitive to the tone of a conversation. At my best, I bring gentleness and romance to everything, though the strength of my desires can intimidate people." },
    5: { name: "Sensuality", description: "In the shadow, this shows up as low self-esteem or pleasing others at my own expense. At my best, I'm clear about my boundaries and at home in a healthy sensuality." },
    6: { name: "Innocence", description: "In the shadow, I can feel incapable of what I desire and lose hope of real connection. At my best, I see the potential in a relationship before it's visible, and I keep reaching for more while staying where I am." },
  },
  iq: {
    1: { name: "The Contemplative Mind", description: "My mind needs quiet time each day so insight can surface. In the shadow, my intelligence stays hidden, even from me." },
    2: { name: "The Brilliant Mind", description: "My mind is quick and surprising, and it makes sudden leaps. I'm built to challenge people, structures and limits. In the shadow, that edge turns into provocation, anger or resentment." },
    3: { name: "The Flexible Mind", description: "My mind thinks on its feet and ranges widely across ideas and belief systems. In the shadow, it gets evasive and avoids a straight answer." },
    4: { name: "The Influential Mind", description: "My mind is built to explore one viewpoint with steady focus, and my influence grows when I commit to a single direction. In the shadow, I project my worth onto others and turn inflexible." },
    5: { name: "The Practical Mind", description: "My mind is a catalyst for change, and it organizes ideas so everyone can use them. In the shadow, it gets defensive and walls itself off, as if the world were against it." },
    6: { name: "The Objective Mind", description: "My mind can stay truly objective, exploring ideas without an agenda or emotional attachment. In the shadow, objectivity turns into distance and disconnection." },
  },
  eq: {
    1: { name: "Self Esteem", description: "My self-esteem sets the tone for all my emotional wounds. When it's low, I can sabotage myself, as if I believed I deserved to suffer." },
    2: { name: "Courtesy", description: "My emotions can flare suddenly, and anger tends to come out as blame. At my best, I'm emotionally passionate and still considerate when it counts." },
    3: { name: "Sympathy", description: "I'm drawn to people in emotional turmoil because I want to help. My wounds often come from family or friendships. In the shadow, I can go numb and shut down." },
    4: { name: "Kindness", description: "In the shadow, I can be unkind to others when I fear rejection. At my best, I offer real kindness to myself and others, often through quiet acts nobody notices." },
    5: { name: "Respect", description: "When I embrace emotional leadership, people respect me for it. I'm sensitive to disrespect, toward me or anyone else. This line asks for humility and can bring a painful fall from grace." },
    6: { name: "Reverence", description: "My emotional life is a long voyage of discovery that brings wisdom, and reverence honors that relationship. In the shadow, I slip easily into feeling distant, separate and cut off." },
  },
  sq: {
    1: { name: "Certainty", description: "I'm searching for a certainty I once felt. I find it again by building rhythms and routines that steady me." },
    2: { name: "Freedom", description: "I need some wildness to feel free, room to explore and push against life's natural edges." },
    3: { name: "Pleasure", description: "I need pleasure as a way of living, so it doesn't become an escape. My inner child wants life to feel like an adventure, and my spirituality runs deeper than any religion or system." },
    4: { name: "Belonging", description: "I'm here to touch many lives, and my inner child needs community and connection. A question worth asking: what does togetherness feel like for me?" },
    5: { name: "Mentoring", description: "I carry the potential for real greatness. I need mental and emotional role models who are doing what I want to do, with integrity." },
    6: { name: "Patience", description: "I'm here to help bring people together at a deep level. I move at my own pace and can't be rushed, and my inner child needs to go deep in its own time." },
  },
  core: {
    1: { name: "Repression Healed Through Honesty", description: "I tend to hold suffering inside and avoid feeling how much it affects me, closing my inner world off from myself and others. Honesty heals it, especially honesty with myself." },
    2: { name: "Denial Healed Through Ease", description: "In the shadow, I deny my pain, blame others for it, or let anger burst out. Healing comes from allowing my anger and giving it a creative outlet." },
    3: { name: "Shame Healed Through Humour", description: "I can feel ashamed of how blind I've been to my own pain and patterns, and overachieve to cover it. Self-love and vulnerability open a gentle humor that heals me." },
    4: { name: "Rejection Healed Through Gentleness", description: "I can reject people before they reject me, and much of my shadow plays out in relationships. Being gentle with myself and my hurt, so I don't feel the need to armor up, is what heals." },
    5: { name: "Guilt Healed Through Forgiveness", description: "I carry guilt around power, whether I feel powerless or use power over others, and it can show up as manipulation or guilt-tripping. Forgiving myself and others is the key to healing." },
    6: { name: "Separation Healed Through Care", description: "I may be highly sensitive and feel cut off from the world, so I've learned to care for myself first. Healing comes when I care for myself in order to care for the world, and when I let other people care for me." },
  },
  // Pearl Sequence
  vocation: {
    1: { name: "Creatives", description: "I'm here to create new things in fine detail. I find joy in working alone, and the details give me a sense of safety and connection to my work." },
    2: { name: "Marketers", description: "I'm here to get people excited about the work. I embody it naturally and show others its value, and there's an ease to how I do it." },
    3: { name: "Producer", description: "I'm here to work out how the work can be seen in the right way, while keeping the original creation intact. Strategy brings me real joy." },
    4: { name: "Sales", description: "I'm here to share and distribute the work so it reaches further. I thrive on networking and connecting people to it, and community plays a big role." },
    5: { name: "Management", description: "I'm here to manage the flow of the work and keep it moving, like a consultant holding the overview. Seeing the whole and keeping it on track gives me security." },
    6: { name: "Investments", description: "I'm here to see the big picture and create a ripple effect from original work. I sense how to use it to its fullest. My guiding question: how can I spread this work further while staying clear-eyed about its value?" },
  },
  culture: {
    1: { name: "Individual", description: "I create best on my own, then need others to help bring my work to an audience. I thrive making my content and offers in solitude, and letting a team or a brand that isn't built around my personality share them." },
    2: { name: "Partnership", description: "I thrive in partnership, where a trusted other expands the resources for my creative urges. Working one-on-one with clients suits me too." },
    3: { name: "Party", description: "I thrive in small groups of about three to fifteen people, where I can feel how my energy moves the room. Group programs, masterminds and intimate workshops suit me." },
    4: { name: "Network", description: "I thrive connecting with a broad network of supporters. Large communities and programs with light access to me suit me best, and one-on-one work can feel limiting." },
    5: { name: "Society", description: "I'm here to make big moves at the level of society. I do best building a large community of people ready for change, and one-on-one or small-group work tends to drain me." },
    6: { name: "Systems", description: "I'm here to connect across whole systems, industries and fields, with a very wide view. My natural audience is organizations more than individuals." },
  },
  brand: {
    1: { name: "Boldness", description: "My energy shows people it's safe to be different. I find my footing through quiet, persistent pursuit of whatever I'm curious about." },
    2: { name: "Passion", description: "My energy shows people how to be passionate and safe in their work. My creative process is unique, often more than I realize, and others help draw it out of me." },
    3: { name: "Humour", description: "My energy shows people how to laugh at their mistakes and feel safe trying new ways of doing things. I find joy in new experiences and in reflecting on them." },
    4: { name: "Feeling", description: "My energy lets people feel deeply and shows them it's safe to feel. I create heart-opening experiences, and I find truth in connecting with people emotionally and meaningfully." },
    5: { name: "Wisdom", description: "My energy offers wisdom and practical solutions that help people feel secure. I find purpose in insight that solves real problems." },
    6: { name: "Vision", description: "My energy helps people become self-reliant. I teach the why and the how, and I see most clearly from a little distance." },
  },
  pearl: {
    1: { name: "Simplicity", description: "Money, for me, is about keeping life simple and easy. It buys creative freedom and ease. My question: what is truly necessary for me?" },
    2: { name: "Recognition", description: "Money, for me, is about being seen and recognized for who I am and how valuable I am. Receiving it feels like recognition. My question: how much does it take for me to feel valued?" },
    3: { name: "Celebration", description: "Money, for me, is about celebration. It lets me celebrate life now and share the joy. My question: what amount would feel like a real celebration?" },
    4: { name: "Charity", description: "Money, for me, is about serving others, and the more I have, the more I can help, with a strong note of gratitude. My question: how much do I need to help in the way I feel called to?" },
    5: { name: "Power", description: "Money, for me, is a source of influence I use with integrity, and a real responsibility. I'm open to a lot of wealth because it lets me make a big impact." },
    6: { name: "Nature", description: "Money, for me, is the same energy as nature: a natural flow of abundance I'm part of. My question: what does financial abundance feel like, and how can I live it?" },
  },
};

export function getSphereLineExpression(
  sphereField: string,
  line: number | null | undefined
): SphereLineExpression | null {
  if (!line || line < 1 || line > 6) return null;
  return SPHERE_LINE_EXPRESSIONS[sphereField]?.[line] ?? null;
}

// ─── The Sequences ────────────────────────────────────────────────────────────
// Single source of truth for how spheres are displayed and narrated.
// `lineKey` (when present) overrides which line-expression set a sphere reads,
// so a sphere can reuse another sphere's gate value but show its own line
// meanings (the Pearl Vocation reads the Venus Core gate with `vocation` lines).

export interface SphereSpec {
  label: string;
  gateField: keyof GeneKeysProfile;
  lineField: keyof GeneKeysProfile;
  lineKey: string;
  note: string;
}

// A pathway connects one sphere to the next within a sequence. pathways[i]
// runs from spheres[i] to spheres[i+1], so pathways.length === spheres.length - 1.
export interface Pathway {
  name: string;
  description: string;
}

export interface SequenceSpec {
  key: "activation" | "venus" | "pearl";
  title: string;
  subtitle: string;
  tagline: string;
  spheres: SphereSpec[];
  pathways: Pathway[];
}

export const GK_SEQUENCES: SequenceSpec[] = [
  {
    key: "activation",
    title: "Activation Sequence",
    subtitle: "Discovering My Genius",
    tagline: "My core genius, the gifts that define the work I am here to do.",
    spheres: [
      { label: "Life's Work", gateField: "lifesWork", lineField: "lifesWorkLine", lineKey: "lifesWork", note: "What I am here to do" },
      { label: "Evolution", gateField: "evolution", lineField: "evolutionLine", lineKey: "evolution", note: "What I am here to become" },
      { label: "Radiance", gateField: "radiance", lineField: "radianceLine", lineKey: "radiance", note: "How my presence affects others" },
      { label: "Purpose", gateField: "purpose", lineField: "purposeLine", lineKey: "purpose", note: "The deepest calling of this lifetime" },
    ],
    pathways: [
      { name: "The Pathway of Challenge", description: "Between my Life's Work and my Evolution runs the Pathway of Challenge, the friction point where my outer purpose meets my greatest growing edge. These two energies sit in direct opposition in my design, and the tension between them is not a problem to solve but the engine of my becoming. Its shadow is avoidance, or a life lived from one crisis to the next. The work is to stay with the friction rather than flee it." },
      { name: "The Pathway of Breakthrough", description: "Between my Evolution and my Radiance runs the Pathway of Breakthrough. Once I genuinely engage my challenge instead of avoiding it, something shifts, not through effort but through a kind of inner surrender. The breakthrough is quiet, more a change of state than a triumph, and my vitality begins to come online. Its shadow is collapse, stalling out just before the shift." },
      { name: "The Pathway of Core Stability", description: "Between my Radiance and my Purpose runs the Pathway of Core Stability. As my radiance opens, I begin to ground into something steady underneath everything: my actual purpose, not as a destination I chase but as a floor I stand on. Core Stability is the felt sense of knowing who I am beneath my roles, my wounds, and my performances. Its shadow is rigidity, mistaking a fixed identity for stable ground." },
    ],
  },
  {
    key: "venus",
    title: "Venus Sequence",
    subtitle: "Opening the Heart",
    tagline: "How I attract and form relationships, the emotional intelligence at the heart of my brand.",
    spheres: [
      { label: "Purpose", gateField: "purpose", lineField: "purposeLine", lineKey: "purpose", note: "The same core ground I reached at the close of the Activation Sequence, here as the ground of relationship" },
      { label: "Attraction", gateField: "attraction", lineField: "attractionLine", lineKey: "attraction", note: "The quality that draws people to me" },
      { label: "IQ", gateField: "iq", lineField: "iqLine", lineKey: "iq", note: "My intellectual gift" },
      { label: "EQ", gateField: "eq", lineField: "eqLine", lineKey: "eq", note: "My emotional gift" },
      { label: "SQ", gateField: "sq", lineField: "sqLine", lineKey: "sq", note: "My spiritual gift" },
      { label: "Core", gateField: "core", lineField: "coreLine", lineKey: "core", note: "The Sacred Wound, and through it my Core Essence" },
    ],
    pathways: [
      { name: "The Pathway of Dharma", description: "Between my Purpose and my Attraction runs the Pathway of Dharma. What I magnetically draw toward me is never random; it mirrors the state I am living from. Before I can work with what I attract, I have to be grounded in my actual purpose rather than in my wound. Dharma here means aligning what I am calling in with who I truly am at my core." },
      { name: "The Pathway of Karma", description: "Between my Attraction and my IQ runs the Pathway of Karma, the recognition of pattern. The people and things I have been drawn to follow an emotional logic, a groove laid down by my conditioning and my ancestry. My IQ reveals how my mind has learned to manage, explain, or defend against the patterns that keep repeating. To move through this pathway is to see the pattern clearly without being run by it." },
      { name: "The Pathway of Intelligence", description: "Between my IQ and my EQ runs the Pathway of Intelligence, where mind and emotional body meet. Most of us use our intelligence to stay one step ahead of our feelings, to explain away what we are actually experiencing. This pathway asks me to bring mental clarity into the emotional body rather than using it to escape. When my mind stops defending and starts witnessing, my emotional body can begin to open." },
      { name: "The Pathway of Love", description: "Between my EQ and my SQ runs the Pathway of Love, the passage from emotional wounding into the larger dimension of relationship. It asks that I have genuinely felt my emotional material, not resolved it but felt it fully enough that it stops being a closed fist. When the emotional body softens, something larger comes through, a love that is no longer personal but pervasive. Here the journey becomes devotional rather than psychological." },
      { name: "The Pathway of Realization", description: "Between my SQ and my Core runs the Pathway of Realization, the final and most delicate passage. My Core holds both the Sacred Wound, the deepest pain of separation and often ancestral in origin, and the Core Essence that wound has been protecting all along. Realization is not an intellectual insight but a lived recognition that the wound is the doorway, that the wound and the gift are not separate. When I stop running from the primal pain at my Core, I discover what has been waiting there: my essential nature, set free." },
    ],
  },
  {
    key: "pearl",
    title: "Pearl Sequence",
    subtitle: "Embodying My Contribution",
    tagline: "My path of prosperity, what emerges when I live my gifts in service.",
    spheres: [
      { label: "Vocation", gateField: "core", lineField: "coreLine", lineKey: "vocation", note: "My true vocation, the Core Essence from the Venus Sequence now lived as my calling" },
      { label: "Brand", gateField: "brand", lineField: "brandLine", lineKey: "brand", note: "My Life's Work reseen as how my essence expresses in the world" },
      { label: "Culture", gateField: "culture", lineField: "cultureLine", lineKey: "culture", note: "The environment I naturally create" },
      { label: "Pearl", gateField: "pearl", lineField: "pearlLine", lineKey: "pearl", note: "The ultimate gift through service" },
    ],
    pathways: [
      { name: "The Pathway of Initiative", description: "Between my Vocation and my Brand runs the Pathway of Initiative, the first movement outward. Initiative here is not hustle; it is the natural impulse of an unlocked essence to move into form, taking what I found in the interior work and beginning to express it. Its shadow is the hesitation born of old worthiness wounds, or the opposite, leaping before my inner vocation is actually clear." },
      { name: "The Pathway of Growth", description: "Between my Brand and my Culture runs the Pathway of Growth, the search for the environment that amplifies my gift. Growth happens in the right ecology. This pathway asks where my essence actually flourishes and who my gift is for. Its shadow is bringing my gift to places it does not belong, or staying in familiar communities that no longer fit." },
      { name: "The Pathway of Service", description: "Between my Culture and my Pearl runs the Pathway of Service, the passage from individual expression into genuine offering. Service at this level is not self-sacrifice; it is the natural orientation of someone who has found their gift and their people and now moves within a field larger than themselves. The Pearl does not emerge because I am trying to give. It emerges because I have stopped trying to keep. Its shadow is performing service for identity or approval rather than contributing from essence." },
    ],
  },
];

// ─── Sequence narrative builder ───────────────────────────────────────────────
// One flowing sentence per sequence, chaining the Gift of each populated sphere.

const capitalize = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export function buildSequenceNarrative(
  sequenceKey: "activation" | "venus" | "pearl",
  geneKeys: GeneKeysProfile
): string {
  const seq = GK_SEQUENCES.find((s) => s.key === sequenceKey);
  if (!seq) return "";

  const sphere = (label: string) => {
    const spec = seq.spheres.find((s) => s.label === label);
    if (!spec) return null;
    const num = geneKeys[spec.gateField];
    if (num === null) return null;
    const freq = GENE_KEY_FREQUENCIES[num];
    if (!freq) return null;
    return { num, freq };
  };

  if (sequenceKey === "activation") {
    const lw = sphere("Life's Work");
    const ev = sphere("Evolution");
    const ra = sphere("Radiance");
    const pu = sphere("Purpose");
    const parts: string[] = [];
    if (lw) parts.push(`the gift I carry into the world as my Life's Work is ${lw.freq.gift} (GK ${lw.num})`);
    if (ev) parts.push(`my inner Evolution deepens through ${ev.freq.gift} (GK ${ev.num})`);
    if (ra) parts.push(`I naturally emanate ${ra.freq.gift} (GK ${ra.num}) to those around me`);
    if (pu) parts.push(`and at the deepest level, my Purpose is rooted in ${pu.freq.gift} (GK ${pu.num})`);
    return parts.length > 0 ? capitalize(parts.join(", ")) + "." : "";
  }

  if (sequenceKey === "venus") {
    const at = sphere("Attraction");
    const iq = sphere("IQ");
    const eq = sphere("EQ");
    const sq = sphere("SQ");
    const pu = sphere("Purpose");
    const co = sphere("Core");
    const parts: string[] = [];
    if (at) parts.push(`I draw others through ${at.freq.gift} (GK ${at.num})`);
    if (iq) parts.push(`my mind works through ${iq.freq.gift} (GK ${iq.num})`);
    if (eq) parts.push(`emotionally I move through ${eq.freq.gift} (GK ${eq.num})`);
    if (sq) parts.push(`with ${sq.freq.gift} (GK ${sq.num}) as my spiritual current`);
    if (pu) parts.push(`my purpose at the heart of relationship moves through ${pu.freq.gift} (GK ${pu.num})`);
    if (co) parts.push(`and at my core, ${co.freq.gift} (GK ${co.num}) is the wound of ${co.freq.shadow} becoming gift`);
    return parts.length > 0 ? capitalize(parts.join(", ")) + "." : "";
  }

  if (sequenceKey === "pearl") {
    const vo = sphere("Vocation");
    const br = sphere("Brand");
    const cu = sphere("Culture");
    const pe = sphere("Pearl");
    const parts: string[] = [];
    if (vo) parts.push(`my true vocation expresses as ${vo.freq.gift} (GK ${vo.num})`);
    if (br) parts.push(`what makes me unmistakably myself in the world is ${br.freq.gift} (GK ${br.num})`);
    if (cu) parts.push(`I naturally cultivate ${cu.freq.gift} (GK ${cu.num}) in the environments I create`);
    if (pe) parts.push(`and ${pe.freq.gift} (GK ${pe.num}) is what emerges through a life in full service`);
    return parts.length > 0 ? capitalize(parts.join(", ")) + "." : "";
  }

  return "";
}
