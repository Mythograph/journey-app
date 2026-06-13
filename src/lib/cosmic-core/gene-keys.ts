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
    1: { name: "Creator", description: "I am here to create new things not seen before. I need to go deep into contemplation to understand why I am called to create what I do. I need courage." },
    2: { name: "Dancer", description: "I am here to get lost in passion. Surrender to my muse and enjoy the dance of life. Get lost in the art of what I do. I am graceful and elegant in my work." },
    3: { name: "Charger", description: "I am here to be unpredictable, big and colorful. I need to challenge myself and take risks, I am not about being normal. Feel safety in trying and failing." },
    4: { name: "Server", description: "I am here to be most focused and intentional on the influence and impact I have on others. Go in a set direction when I serve others." },
    5: { name: "Fixer", description: "I am here to be practical and fix things that are worth fixing. Be focused on efficiency. Let myself want to make a wide impact and keep things going." },
    6: { name: "Teacher", description: "I am here to teach other people. To do that I need to try a lot of things, understand them, and then embrace teaching that to others. I want to help other people see their gifts." },
  },
  evolution: {
    1: { name: "Self Empowerment", description: "Self empowerment is my lesson in this life. I am creative, which is my gift and my shadow. I can struggle with confidence. I need to lean on others when necessary but then come back to solitude. Feel safe in expressing my confidence." },
    2: { name: "Passion and Relationships", description: "I want to be safe to be passionate. True passion will join with innocence when it is accepted. This line is expressed unconsciously so I will find myself looking for external feedback. The shadow of jealousy can be bad for relationships. I feel safe to have what I want only when others have what they want." },
    3: { name: "Energy and Experience", description: "Life is about searching for an experience. Let go of all expectations. I need to give myself permission to fail. Along the journey of experiencing life, I will find the gift." },
    4: { name: "Love and Community", description: "My challenge is to find the balance of socialization and isolation, without it being extreme. I can feel like I am a victim to always serving and helping others. I am here to convince others to choose a heart-based approach to life and work. The gift is about community and life balance." },
    5: { name: "Impact", description: "I have a profound effect on others that I don't understand. The shadow is disappointment that I can't solve the problems other people project onto me. My challenge is to find boundaries. I may take on more than me can handle in order to feel worthy." },
    6: { name: "Vision", description: "My lifetime is about moving through a whole story. As I mature, my vision will change. My challenge is to surrender to the fates and let life guide me. The shadow is trying to plan and control my own direction. I am very invested in a greater future for humanity." },
  },
  radiance: {
    1: { name: "Solitude", description: "A physical and mental need for solitude. I will become more connected the more alone I am." },
    2: { name: "Marriage", description: "My radiance requires biofeedback and will evolve as I move and engage with others. There is likely one person or thing that lights me up. An intense relationship to a person or thing will open my radiance." },
    3: { name: "Interaction", description: "I also need biofeedback but in a variety of ways. I will be always on the move. I come to radiance when I interact diversely with others. I will feel called to help less fortunate people from what I see in diverse travels." },
    4: { name: "Outreach", description: "My radiance is rooted in aloneness but is directed at helping others. I draw people in naturally, my shadow draws in toxic people. My body thrives in the company of trusted people. I reach out and open the hearts of others." },
    5: { name: "Leadership", description: "Leading and helping others makes me radiant and impactful. I sense my specialness and want to help others by leading in my own style. I want to help people in my own unique way." },
    6: { name: "Dream", description: "My inner dream will grow and shift. I need to experience the magnetism of life to bring this dream to fruition. Every element will change, people, places, things, but being in nature is the constant that will bring me back to health." },
  },
  purpose: {
    1: { name: "Bones", description: "My body is a physical template and needs to be anchored deeply. My bones keep records of the past. The future requires a solid foundation from my bone structure. When I am out of alignment, I will feel bone or joint pain." },
    2: { name: "Posture", description: "Focus on my spine. I bring fluid movement and posture to the bones. Follow the deep rhythm of my body to be on the path of least resistance. When out of alignment, I will experience core issues and posture issues." },
    3: { name: "Movement", description: "Ride the currents and jump from thing to thing. I need physical movement and exercise to get my blood and energy moving. Consistency may feel restrictive. When out of alignment, I will experience vascular or blood processing issues." },
    4: { name: "Breath", description: "Breath gets me in tune with the rhythmic cycle of life. I bring people together through the rhythm of breath as it connects us all. When out of alignment, I will experience breathing issues and disorders." },
    5: { name: "Voice", description: "My purpose is in the living sound of my voice. I need to vocalize, sing, speak, chant. My voice brings things into existence and complaining lowers my energy. When out of alignment, I will experience throat inflammation." },
    6: { name: "Aura", description: "My purpose fulfillment comes from realizing that my aura speaks loudly. My energy does the work for me. My intention sets my aura. People feel my intention via my work simply because my energy speaks loudly. I can also read others' auras acutely." },
  },
  // Venus Sequence
  attraction: {
    1: { name: "Fertility", description: "Shadow: Creates an extremist approach of all or nothing, sees life as lack or abundance. Gift: Needs to see the whole picture to stay aligned. Overstimulation will create numbness and emptiness." },
    2: { name: "Passion", description: "Shadow: Deep primal desire to receive mixed with a core feeling of inadequacy in comparison to others. Gift: With an open heart I can feel passionate and liberated. When claiming my desires, keep my heart open." },
    3: { name: "Playfulness", description: "Shadow: Can be promiscuous or totally blocked off, extreme playfulness can lead to unsafe experiences. Gift: Need to allow for a sense of play and adventure in my desires. Can struggle to connect with the specifics of what I desire." },
    4: { name: "Romance", description: "Shadow: Can be emotionally distant and unavailable, very sensitive to the tone of conversations. Gift: Romanticize everything into a state of gentleness. My desires may intimidate others." },
    5: { name: "Sensuality", description: "Shadow: Repressive shadow shows up as low self esteem; can become obsessed with pleasing others at my own expense. Gift: I need to be clear around my boundaries. Have a healthy sensuality and sexuality." },
    6: { name: "Innocence", description: "Shadow: A deep sense of disappointment at not feeling capable of my desires; may lose hope of connecting with someone or something. Gift: See potential in relationships before it manifests. I can be where I am but always wish and reach for more." },
  },
  iq: {
    1: { name: "The Contemplative Mind", description: "Spend time contemplating my hidden mind. I need time throughout the day for insight to come to me. The shadow shows itself as hidden intelligence." },
    2: { name: "The Brilliant Mind", description: "Quick and surprising mind that can make quantum leaps. Challenge people, structures and limits. The shadow is provocative and can show as anger and resentment." },
    3: { name: "The Flexible Mind", description: "Designed to think on its feet and have a broad scope of knowledge. The mind explores mental beliefs and structures. The shadow is evasive and can show as an aversion to answering straight." },
    4: { name: "The Influential Mind", description: "Designed to explore a single mental viewpoint with unwavering focus. Devote my energy and focus to a single direction to create influence. The shadow projects its worthiness onto others and shows itself as inflexible." },
    5: { name: "The Practical Mind", description: "The mind is a catalyst for dynamic change and transformation. It is organized so everyone has access to the answers. The shadow is defensive and puts up walls, feeling like the world is against it." },
    6: { name: "The Objective Mind", description: "The only mind with the potential to remain truly objective. Designed to explore the mental plane with no agenda, no attachment of emotions to thoughts. The shadow is a distancing and absent disconnection in an effort to remain objective." },
  },
  eq: {
    1: { name: "Self Esteem", description: "Sets the foundational tone of self esteem for all my emotional wounds. When my self esteem is low, I self sabotage. I may feel like I deserve suffering so I force it to happen." },
    2: { name: "Courtesy", description: "My emotions can explode at any time. Anger is usually expressed through blame. I can be emotionally passionate and considerate when needed." },
    3: { name: "Sympathy", description: "I will want to be with people who are in emotional turmoil so I can help them. I can have wounds from peer relationships or from family. I can be emotionally apathetic or totally shut down." },
    4: { name: "Kindness", description: "Externalises self esteem and can be mean to others when I fear rejection. Can offer great kindness to self and others when I want to. Uses unnoticed acts of kindness to feel better." },
    5: { name: "Respect", description: "Embracing emotional leadership makes others respect me for it. Sensitive to disrespect, which can be towards myself or others. Requires humility and can sometimes create a painful experience of a fall from grace." },
    6: { name: "Reverence", description: "A voyage of emotional discovery that brings wisdom. Reverence honors the long term relationship with emotions. Alienation will happen easily and cause me to feel distant, separated and cut off." },
  },
  sq: {
    1: { name: "Certainty", description: "I am searching for a certainty that isn't there but once was. The inner certainty comes from creating rhythms and routines in my life." },
    2: { name: "Freedom", description: "I need wildness and boundary pushing to feel free. I need to freely explore life's natural boundaries." },
    3: { name: "Pleasure", description: "I need pleasure as a state in life rather than as an escape. The inner child wants to feel life is an adventure. My spiritual awareness runs beneath my ideas and structures, my spirituality is beyond religion." },
    4: { name: "Belonging", description: "I am here to touch thousands of lives. I need community and connection for my inner child. What feels like togetherness for me?" },
    5: { name: "Mentoring", description: "I am destined for greatness. I need mental and emotional role models who are doing what I desire to do, but with integrity." },
    6: { name: "Patience", description: "I am here to unify the collective at a spiritual level. Designed to operate at my own unique pace so I cannot be rushed. My inner child needs to go deeply at its own pace." },
  },
  core: {
    1: { name: "Repression Healed Through Honesty", description: "I internalize suffering and avoid experiencing how much it affects me. My inner world is shut off from myself and others. Honesty is the key to healing, especially self honesty." },
    2: { name: "Denial Healed Through Ease", description: "Outward facing denial and angry outbursts are common. I blame others for my suffering and refuse ownership. Allowing anger and expressing it through creativity is the key to healing." },
    3: { name: "Shame Healed Through Humour", description: "Feeling shame for being so blind to my own pain and patterns. May be an overachiever who tries to achieve constantly to cover up a deep sense of shame. Self love and vulnerability create a humour that heals me." },
    4: { name: "Rejection Healed Through Gentleness", description: "Rejecting others before they can reject me. Experience a lot of shadow through relationships. Being gentle with myself and my hurt so I don't feel I need to protect myself is what will bring healing." },
    5: { name: "Guilt Healed Through Forgiveness", description: "Guilt around power, being powerless or exerting power. Manipulation, guilt tripping and gaslighting behavior occurs. Forgiving myself and others is the key to healing." },
    6: { name: "Separation Healed Through Care", description: "I may be hyper sensitive and feel cut off from society. I have learned to care for myself first. Healing will come when I care for myself in order to care for the world. I need other people to care for me." },
  },
  // Pearl Sequence
  vocation: {
    1: { name: "Creatives", description: "I am here to create new things in detail. Find joy in being alone through my creative process. The details bring me a sense of safety and connection to my work." },
    2: { name: "Marketers", description: "I am here to get others excited about my work. Naturalness is embodying the work and showing others the value in what has been created. There is an effortlessness to this." },
    3: { name: "Producer", description: "I am here to see how to strategically apply the work so it can be seen by others. Driven by the work being seen in the right way, keeping the integrity of the original creation. There is a lot of joy found in strategy here." },
    4: { name: "Sales", description: "I am here to pitch and distribute the work to get a bigger impact. Focused on networking and connecting people to my work. Community and people play a big role." },
    5: { name: "Management", description: "I am here to put myself in charge of managing flow and productivity of work. The role of the consultant, keeping an overview. Seeing it all and keeping it in line brings security." },
    6: { name: "Investments", description: "I am here to see things broadly and create a ripple effect from the original work/creation. Sense how to use my work to its most expansive capacity. How can I spread my original work further, remaining objective to see its value?" },
  },
  culture: {
    1: { name: "Individual", description: "I am here to create things alone and not in collaboration with others. I need others to help me share my creations with an audience so they can see it. Create content/offers in isolation and use a non-personal brand and/or staff to share it to a customer base." },
    2: { name: "Partnership", description: "I am here to work in a partnership to expand resources for my creative urges. Working 1:1 with clients also works well at this level." },
    3: { name: "Party", description: "I am here to thrive in a small group setting. Focus on how my energy is impacting others in small group environments of 3–15 people. Consider group programs, masterminds, intimate masterclasses." },
    4: { name: "Network", description: "I am here to connect at a broad organisational level with a network of support people. Consider a large community, passive programs with a small amount of access to me. 1:1 and small groups will feel limiting." },
    5: { name: "Society", description: "I am here to make big moves at a societal level for the Collective. Consider creating a large community or body of people ready to be impacted. 1:1 and small groups will trigger my Not Self." },
    6: { name: "Systems", description: "I am here to connect not with individuals but at an overarching level, across multiple systems, industries or spaces. I have a very wide viewpoint and should consider an audience at an organisational level." },
  },
  brand: {
    1: { name: "Boldness", description: "My energy shows people that it is safe to do and be differently. Investigative, persistent line; finds safety and expression through quiet, persistent pursuit of what it is curious about." },
    2: { name: "Passion", description: "My energy shows people how to be passionate and safe in their work. Creative line; finds harmony and safety in being in their unique creative process, without truly understanding that it is unique. It must be drawn out of them." },
    3: { name: "Humour", description: "My energy shows others how to laugh at their mistakes and themselves, and feel safe in trying new ways of doing things. Experiential line; finds joy and safety in new experiences and reflection." },
    4: { name: "Feeling", description: "My energy allows others to feel a deep sense of emotion, showing them it is safe to feel. I create heart and soul-opening emotional experiences. Connection line; finds truth and safety in connecting emotionally and meaningfully with others." },
    5: { name: "Wisdom", description: "My energy offers wisdom and solutions to others to help them feel certain and secure. Wisdom line; finds purpose and safety in providing insight to solve problems." },
    6: { name: "Vision", description: "My energy educates people so they can become self-reliant. I teach the why and the how. Objective line; finds insight and safety by remaining objective and sharing wisdom from a distance." },
  },
  pearl: {
    1: { name: "Simplicity", description: "My relationship to money is about supporting me to keep things easy and simple. Money and life are meant to be simple. Money is for creative freedom and ease. What is truly necessary for me?" },
    2: { name: "Recognition", description: "My relationship to money is about being seen and recognized. Being seen as myself and for how valuable I am. Receiving money feels like recognition. How much money does it take to make me feel valuable and recognized?" },
    3: { name: "Celebration", description: "My relationship to money is about celebration. Money allows me to celebrate my life and increase joy, yours and others'. I can celebrate life now, in the moment, with money. What amount feels like a huge celebration of life to me?" },
    4: { name: "Charity", description: "My relationship to money is about service to others. The more money I have, the more I can help others. There is a distinct note of gratitude. How much money do I need to truly help others in the way I feel called to?" },
    5: { name: "Power", description: "My relationship to money is about having a source of power and influence. Money allows me influence from a place of integrity. I see money as a great responsibility. I am magnetically open to a lot of wealth as money allows me to have a big impact." },
    6: { name: "Nature", description: "My relationship to money is about nature. Money and nature are the same energy for me. I am one with money and abundance. What does financial abundance feel like, and how can I embody it?" },
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

export interface SequenceSpec {
  key: "activation" | "venus" | "pearl";
  title: string;
  tagline: string;
  spheres: SphereSpec[];
}

export const GK_SEQUENCES: SequenceSpec[] = [
  {
    key: "activation",
    title: "Activation Sequence",
    tagline: "My core genius, the gifts that define the work I am here to do.",
    spheres: [
      { label: "Life's Work", gateField: "lifesWork", lineField: "lifesWorkLine", lineKey: "lifesWork", note: "What I am here to do" },
      { label: "Evolution", gateField: "evolution", lineField: "evolutionLine", lineKey: "evolution", note: "What I am here to become" },
      { label: "Radiance", gateField: "radiance", lineField: "radianceLine", lineKey: "radiance", note: "How my presence affects others" },
      { label: "Purpose", gateField: "purpose", lineField: "purposeLine", lineKey: "purpose", note: "The deepest calling of this lifetime" },
    ],
  },
  {
    key: "venus",
    title: "Venus Sequence",
    tagline: "How I attract and form relationships, the emotional intelligence at the heart of my brand.",
    spheres: [
      { label: "Attraction", gateField: "attraction", lineField: "attractionLine", lineKey: "attraction", note: "The quality that draws people to me" },
      { label: "IQ", gateField: "iq", lineField: "iqLine", lineKey: "iq", note: "My intellectual gift" },
      { label: "EQ", gateField: "eq", lineField: "eqLine", lineKey: "eq", note: "My emotional gift" },
      { label: "SQ", gateField: "sq", lineField: "sqLine", lineKey: "sq", note: "My spiritual gift" },
      { label: "Core", gateField: "core", lineField: "coreLine", lineKey: "core", note: "The wound that carries the deepest gift" },
      { label: "Purpose", gateField: "purpose", lineField: "purposeLine", lineKey: "purpose", note: "My purpose at the heart of relationship" },
    ],
  },
  {
    key: "pearl",
    title: "Pearl Sequence",
    tagline: "My path of prosperity, what emerges when I live my gifts in service.",
    spheres: [
      { label: "Vocation", gateField: "core", lineField: "coreLine", lineKey: "vocation", note: "My true vocation, the Core wound lived as my calling" },
      { label: "Brand", gateField: "brand", lineField: "brandLine", lineKey: "brand", note: "What makes me unmistakably myself" },
      { label: "Culture", gateField: "culture", lineField: "cultureLine", lineKey: "culture", note: "The environment I naturally create" },
      { label: "Pearl", gateField: "pearl", lineField: "pearlLine", lineKey: "pearl", note: "The ultimate gift through service" },
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
