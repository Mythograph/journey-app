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
    1: { name: "Creator", description: "You are here to create new things not seen before. You need to go deep into contemplation to understand why you are called to create what you do. You need courage." },
    2: { name: "Dancer", description: "You are here to get lost in passion. Surrender to your muse and enjoy the dance of life. Get lost in the art of what you do. You are graceful and elegant in your work." },
    3: { name: "Charger", description: "You are here to be unpredictable, big and colorful. You need to challenge yourself and take risks, you are not about being normal. Feel safety in trying and failing." },
    4: { name: "Server", description: "You are here to be most focused and intentional on the influence and impact you have on others. Go in a set direction when you serve others." },
    5: { name: "Fixer", description: "You are here to be practical and fix things that are worth fixing. Be focused on efficiency. Let yourself want to make a wide impact and keep things going." },
    6: { name: "Teacher", description: "You are here to teach other people. To do that you need to try a lot of things, understand them, and then embrace teaching that to others. You want to help other people see their gifts." },
  },
  evolution: {
    1: { name: "Self Empowerment", description: "Self empowerment is your lesson in this life. You are creative, which is your gift and your shadow. You can struggle with confidence. You need to lean on others when necessary but then come back to solitude. Feel safe in expressing your confidence." },
    2: { name: "Passion and Relationships", description: "You want to be safe to be passionate. True passion will join with innocence when it is accepted. This line is expressed unconsciously so you will find yourself looking for external feedback. The shadow of jealousy can be bad for relationships. You feel safe to have what you want only when others have what they want." },
    3: { name: "Energy and Experience", description: "Life is about searching for an experience. Let go of all expectations. You need to give yourself permission to fail. Along the journey of experiencing life, you will find the gift." },
    4: { name: "Love and Community", description: "Your challenge is to find the balance of socialization and isolation, without it being extreme. You can feel like you are a victim to always serving and helping others. You are here to convince others to choose a heart-based approach to life and work. The gift is about community and life balance." },
    5: { name: "Impact", description: "You have a profound effect on others that you don't understand. The shadow is disappointment that you can't solve the problems other people project onto you. Your challenge is to find boundaries. You may take on more than you can handle in order to feel worthy." },
    6: { name: "Vision", description: "Your lifetime is about moving through a whole story. As you mature, your vision will change. Your challenge is to surrender to the fates and let life guide you. The shadow is trying to plan and control your own direction. You are very invested in a greater future for humanity." },
  },
  radiance: {
    1: { name: "Solitude", description: "A physical and mental need for solitude. You will become more connected the more alone you are." },
    2: { name: "Marriage", description: "Your radiance requires biofeedback and will evolve as you move and engage with others. There is likely one person or thing that lights you up. An intense relationship to a person or thing will open your radiance." },
    3: { name: "Interaction", description: "You also need biofeedback but in a variety of ways. You will be always on the move. You come to radiance when you interact diversely with others. You will feel called to help less fortunate people from what you see in diverse travels." },
    4: { name: "Outreach", description: "Your radiance is rooted in aloneness but is directed at helping others. You draw people in naturally, your shadow draws in toxic people. Your body thrives in the company of trusted people. You reach out and open the hearts of others." },
    5: { name: "Leadership", description: "Leading and helping others makes you radiant and impactful. You sense your specialness and want to help others by leading in your own style. You want to help people in your own unique way." },
    6: { name: "Dream", description: "Your inner dream will grow and shift. You need to experience the magnetism of life to bring this dream to fruition. Every element will change, people, places, things, but being in nature is the constant that will bring you back to health." },
  },
  purpose: {
    1: { name: "Bones", description: "Your body is a physical template and needs to be anchored deeply. Your bones keep records of the past. The future requires a solid foundation from your bone structure. When you are out of alignment, you will feel bone or joint pain." },
    2: { name: "Posture", description: "Focus on your spine. You bring fluid movement and posture to the bones. Follow the deep rhythm of your body to be on the path of least resistance. When out of alignment, you will experience core issues and posture issues." },
    3: { name: "Movement", description: "Ride the currents and jump from thing to thing. You need physical movement and exercise to get your blood and energy moving. Consistency may feel restrictive. When out of alignment, you will experience vascular or blood processing issues." },
    4: { name: "Breath", description: "Breath gets you in tune with the rhythmic cycle of life. You bring people together through the rhythm of breath as it connects us all. When out of alignment, you will experience breathing issues and disorders." },
    5: { name: "Voice", description: "Your purpose is in the living sound of your voice. You need to vocalize, sing, speak, chant. Your voice brings things into existence and complaining lowers your energy. When out of alignment, you will experience throat inflammation." },
    6: { name: "Aura", description: "Your purpose fulfillment comes from realizing that your aura speaks loudly. Your energy does the work for you. Your intention sets your aura. People feel your intention via your work simply because your energy speaks loudly. You can also read others' auras acutely." },
  },
  // Venus Sequence
  attraction: {
    1: { name: "Fertility", description: "Shadow: Creates an extremist approach of all or nothing, sees life as lack or abundance. Gift: Needs to see the whole picture to stay aligned. Overstimulation will create numbness and emptiness." },
    2: { name: "Passion", description: "Shadow: Deep primal desire to receive mixed with a core feeling of inadequacy in comparison to others. Gift: With an open heart you can feel passionate and liberated. When claiming your desires, keep your heart open." },
    3: { name: "Playfulness", description: "Shadow: Can be promiscuous or totally blocked off, extreme playfulness can lead to unsafe experiences. Gift: Need to allow for a sense of play and adventure in your desires. Can struggle to connect with the specifics of what you desire." },
    4: { name: "Romance", description: "Shadow: Can be emotionally distant and unavailable, very sensitive to the tone of conversations. Gift: Romanticize everything into a state of gentleness. Your desires may intimidate others." },
    5: { name: "Sensuality", description: "Shadow: Repressive shadow shows up as low self esteem; can become obsessed with pleasing others at your own expense. Gift: You need to be clear around your boundaries. Have a healthy sensuality and sexuality." },
    6: { name: "Innocence", description: "Shadow: A deep sense of disappointment at not feeling capable of your desires; may lose hope of connecting with someone or something. Gift: See potential in relationships before it manifests. You can be where you are but always wish and reach for more." },
  },
  iq: {
    1: { name: "The Contemplative Mind", description: "Spend time contemplating your hidden mind. You need time throughout the day for insight to come to you. The shadow shows itself as hidden intelligence." },
    2: { name: "The Brilliant Mind", description: "Quick and surprising mind that can make quantum leaps. Challenge people, structures and limits. The shadow is provocative and can show as anger and resentment." },
    3: { name: "The Flexible Mind", description: "Designed to think on its feet and have a broad scope of knowledge. The mind explores mental beliefs and structures. The shadow is evasive and can show as an aversion to answering straight." },
    4: { name: "The Influential Mind", description: "Designed to explore a single mental viewpoint with unwavering focus. Devote your energy and focus to a single direction to create influence. The shadow projects its worthiness onto others and shows itself as inflexible." },
    5: { name: "The Practical Mind", description: "The mind is a catalyst for dynamic change and transformation. It is organized so everyone has access to the answers. The shadow is defensive and puts up walls, feeling like the world is against it." },
    6: { name: "The Objective Mind", description: "The only mind with the potential to remain truly objective. Designed to explore the mental plane with no agenda, no attachment of emotions to thoughts. The shadow is a distancing and absent disconnection in an effort to remain objective." },
  },
  eq: {
    1: { name: "Self Esteem", description: "Sets the foundational tone of self esteem for all your emotional wounds. When your self esteem is low, you self sabotage. You may feel like you deserve suffering so you force it to happen." },
    2: { name: "Courtesy", description: "Your emotions can explode at any time. Anger is usually expressed through blame. You can be emotionally passionate and considerate when needed." },
    3: { name: "Sympathy", description: "You will want to be with people who are in emotional turmoil so you can help them. You can have wounds from peer relationships or from family. You can be emotionally apathetic or totally shut down." },
    4: { name: "Kindness", description: "Externalises self esteem and can be mean to others when you fear rejection. Can offer great kindness to self and others when you want to. Uses unnoticed acts of kindness to feel better." },
    5: { name: "Respect", description: "Embracing emotional leadership makes others respect you for it. Sensitive to disrespect, which can be towards yourself or others. Requires humility and can sometimes create a painful experience of a fall from grace." },
    6: { name: "Reverence", description: "A voyage of emotional discovery that brings wisdom. Reverence honors the long term relationship with emotions. Alienation will happen easily and cause you to feel distant, separated and cut off." },
  },
  sq: {
    1: { name: "Certainty", description: "You are searching for a certainty that isn't there but once was. The inner certainty comes from creating rhythms and routines in your life." },
    2: { name: "Freedom", description: "You need wildness and boundary pushing to feel free. You need to freely explore life's natural boundaries." },
    3: { name: "Pleasure", description: "You need pleasure as a state in life rather than as an escape. The inner child wants to feel life is an adventure. Your spiritual awareness runs beneath your ideas and structures, your spirituality is beyond religion." },
    4: { name: "Belonging", description: "You are here to touch thousands of lives. You need community and connection for your inner child. What feels like togetherness for you?" },
    5: { name: "Mentoring", description: "You are destined for greatness. You need mental and emotional role models who are doing what you desire to do, but with integrity." },
    6: { name: "Patience", description: "You are here to unify the collective at a spiritual level. Designed to operate at your own unique pace so you cannot be rushed. Your inner child needs to go deeply at its own pace." },
  },
  core: {
    1: { name: "Repression Healed Through Honesty", description: "You internalise suffering and avoid experiencing how much it affects you. Your inner world is shut off from yourself and others. Honesty is the key to healing, especially self honesty." },
    2: { name: "Denial Healed Through Ease", description: "Outward facing denial and angry outbursts are common. You blame others for your suffering and refuse ownership. Allowing anger and expressing it through creativity is the key to healing." },
    3: { name: "Shame Healed Through Humour", description: "Feeling shame for being so blind to your own pain and patterns. May be an overachiever who tries to achieve constantly to cover up a deep sense of shame. Self love and vulnerability create a humour that heals you." },
    4: { name: "Rejection Healed Through Gentleness", description: "Rejecting others before they can reject you. Experience a lot of shadow through relationships. Being gentle with yourself and your hurt so you don't feel you need to protect yourself is what will bring healing." },
    5: { name: "Guilt Healed Through Forgiveness", description: "Guilt around power, being powerless or exerting power. Manipulation, guilt tripping and gaslighting behavior occurs. Forgiving yourself and others is the key to healing." },
    6: { name: "Separation Healed Through Care", description: "You may be hyper sensitive and feel cut off from society. You have learned to care for yourself first. Healing will come when you care for yourself in order to care for the world. You need other people to care for you." },
  },
  // Pearl Sequence
  vocation: {
    1: { name: "Creatives", description: "You are here to create new things in detail. Find joy in being alone through your creative process. The details bring you a sense of safety and connection to your work." },
    2: { name: "Marketers", description: "You are here to get others excited about your work. Naturalness is embodying the work and showing others the value in what has been created. There is an effortlessness to this." },
    3: { name: "Producer", description: "You are here to see how to strategically apply the work so it can be seen by others. Driven by the work being seen in the right way, keeping the integrity of the original creation. There is a lot of joy found in strategy here." },
    4: { name: "Sales", description: "You are here to pitch and distribute the work to get a bigger impact. Focused on networking and connecting people to your work. Community and people play a big role." },
    5: { name: "Management", description: "You are here to put yourself in charge of managing flow and productivity of work. The role of the consultant, keeping an overview. Seeing it all and keeping it in line brings security." },
    6: { name: "Investments", description: "You are here to see things broadly and create a ripple effect from the original work/creation. Sense how to use your work to its most expansive capacity. How can you spread your original work further, remaining objective to see its value?" },
  },
  culture: {
    1: { name: "Individual", description: "You are here to create things alone and not in collaboration with others. You need others to help you share your creations with an audience so they can see it. Create content/offers in isolation and use a non-personal brand and/or staff to share it to a customer base." },
    2: { name: "Partnership", description: "You are here to work in a partnership to expand resources for your creative urges. Working 1:1 with clients also works well at this level." },
    3: { name: "Party", description: "You are here to thrive in a small group setting. Focus on how your energy is impacting others in small group environments of 3–15 people. Consider group programs, masterminds, intimate masterclasses." },
    4: { name: "Network", description: "You are here to connect at a broad organisational level with a network of support people. Consider a large community, passive programs with a small amount of access to you. 1:1 and small groups will feel limiting." },
    5: { name: "Society", description: "You are here to make big moves at a societal level for the Collective. Consider creating a large community or body of people ready to be impacted. 1:1 and small groups will trigger your Not Self." },
    6: { name: "Systems", description: "You are here to connect not with individuals but at an overarching level, across multiple systems, industries or spaces. You have a very wide viewpoint and should consider an audience at an organisational level." },
  },
  brand: {
    1: { name: "Boldness", description: "Your energy shows people that it is safe to do and be differently. Investigative, persistent line; finds safety and expression through quiet, persistent pursuit of what it is curious about." },
    2: { name: "Passion", description: "Your energy shows people how to be passionate and safe in their work. Creative line; finds harmony and safety in being in their unique creative process, without truly understanding that it is unique. It must be drawn out of them." },
    3: { name: "Humour", description: "Your energy shows others how to laugh at their mistakes and themselves, and feel safe in trying new ways of doing things. Experiential line; finds joy and safety in new experiences and reflection." },
    4: { name: "Feeling", description: "Your energy allows others to feel a deep sense of emotion, showing them it is safe to feel. You create heart and soul-opening emotional experiences. Connection line; finds truth and safety in connecting emotionally and meaningfully with others." },
    5: { name: "Wisdom", description: "Your energy offers wisdom and solutions to others to help them feel certain and secure. Wisdom line; finds purpose and safety in providing insight to solve problems." },
    6: { name: "Vision", description: "Your energy educates people so they can become self-reliant. You teach the why and the how. Objective line; finds insight and safety by remaining objective and sharing wisdom from a distance." },
  },
  pearl: {
    1: { name: "Simplicity", description: "Your relationship to money is about supporting you to keep things easy and simple. Money and life are meant to be simple. Money is for creative freedom and ease. What is truly necessary for you?" },
    2: { name: "Recognition", description: "Your relationship to money is about being seen and recognized. Being seen as yourself and for how valuable you are. Receiving money feels like recognition. How much money does it take to make you feel valuable and recognized?" },
    3: { name: "Celebration", description: "Your relationship to money is about celebration. Money allows you to celebrate your life and increase joy, yours and others'. You can celebrate life now, in the moment, with money. What amount feels like a huge celebration of life to you?" },
    4: { name: "Charity", description: "Your relationship to money is about service to others. The more money you have, the more you can help others. There is a distinct note of gratitude. How much money do I need to truly help others in the way I feel called to?" },
    5: { name: "Power", description: "Your relationship to money is about having a source of power and influence. Money allows you influence from a place of integrity. You see money as a great responsibility. You are magnetically open to a lot of wealth as money allows you to have a big impact." },
    6: { name: "Nature", description: "Your relationship to money is about nature. Money and nature are the same energy for you. You are one with money and abundance. What does financial abundance feel like, and how can I embody it?" },
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
    tagline: "Your core genius, the gifts that define the work you are here to do.",
    spheres: [
      { label: "Life's Work", gateField: "lifesWork", lineField: "lifesWorkLine", lineKey: "lifesWork", note: "What you are here to do" },
      { label: "Evolution", gateField: "evolution", lineField: "evolutionLine", lineKey: "evolution", note: "What you are here to become" },
      { label: "Radiance", gateField: "radiance", lineField: "radianceLine", lineKey: "radiance", note: "How your presence affects others" },
      { label: "Purpose", gateField: "purpose", lineField: "purposeLine", lineKey: "purpose", note: "The deepest calling of this lifetime" },
    ],
  },
  {
    key: "venus",
    title: "Venus Sequence",
    tagline: "How you attract and form relationships, the emotional intelligence at the heart of your brand.",
    spheres: [
      { label: "Attraction", gateField: "attraction", lineField: "attractionLine", lineKey: "attraction", note: "The quality that draws people to you" },
      { label: "IQ", gateField: "iq", lineField: "iqLine", lineKey: "iq", note: "Your intellectual gift" },
      { label: "EQ", gateField: "eq", lineField: "eqLine", lineKey: "eq", note: "Your emotional gift" },
      { label: "SQ", gateField: "sq", lineField: "sqLine", lineKey: "sq", note: "Your spiritual gift" },
      { label: "Core", gateField: "core", lineField: "coreLine", lineKey: "core", note: "The wound that carries the deepest gift" },
      { label: "Purpose", gateField: "purpose", lineField: "purposeLine", lineKey: "purpose", note: "Your purpose at the heart of relationship" },
    ],
  },
  {
    key: "pearl",
    title: "Pearl Sequence",
    tagline: "Your path of prosperity, what emerges when you live your gifts in service.",
    spheres: [
      { label: "Vocation", gateField: "core", lineField: "coreLine", lineKey: "vocation", note: "Your true vocation, the Core wound lived as your calling" },
      { label: "Brand", gateField: "brand", lineField: "brandLine", lineKey: "brand", note: "What makes you unmistakably you" },
      { label: "Culture", gateField: "culture", lineField: "cultureLine", lineKey: "culture", note: "The environment you naturally create" },
      { label: "Pearl", gateField: "pearl", lineField: "pearlLine", lineKey: "pearl", note: "The ultimate gift through service" },
    ],
  },
];

// ─── Sequence narrative builder ───────────────────────────────────────────────
// One flowing sentence per sequence, chaining the Gift of each populated sphere.

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
    if (lw) parts.push(`The gift you carry into the world as your Life's Work is ${lw.freq.gift} (GK ${lw.num})`);
    if (ev) parts.push(`your inner Evolution deepens through ${ev.freq.gift} (GK ${ev.num})`);
    if (ra) parts.push(`you naturally emanate ${ra.freq.gift} (GK ${ra.num}) to those around you`);
    if (pu) parts.push(`and at the deepest level, your Purpose is rooted in ${pu.freq.gift} (GK ${pu.num})`);
    return parts.length > 0 ? parts.join(", ") + "." : "";
  }

  if (sequenceKey === "venus") {
    const at = sphere("Attraction");
    const iq = sphere("IQ");
    const eq = sphere("EQ");
    const sq = sphere("SQ");
    const pu = sphere("Purpose");
    const co = sphere("Core");
    const parts: string[] = [];
    if (at) parts.push(`You draw others through ${at.freq.gift} (GK ${at.num})`);
    if (iq) parts.push(`your mind works through ${iq.freq.gift} (GK ${iq.num})`);
    if (eq) parts.push(`emotionally you move through ${eq.freq.gift} (GK ${eq.num})`);
    if (sq) parts.push(`with ${sq.freq.gift} (GK ${sq.num}) as your spiritual current`);
    if (pu) parts.push(`your purpose at the heart of relationship moves through ${pu.freq.gift} (GK ${pu.num})`);
    if (co) parts.push(`and at your core, ${co.freq.gift} (GK ${co.num}) is the wound of ${co.freq.shadow} becoming gift`);
    return parts.length > 0 ? parts.join(", ") + "." : "";
  }

  if (sequenceKey === "pearl") {
    const vo = sphere("Vocation");
    const br = sphere("Brand");
    const cu = sphere("Culture");
    const pe = sphere("Pearl");
    const parts: string[] = [];
    if (vo) parts.push(`Your true vocation expresses as ${vo.freq.gift} (GK ${vo.num})`);
    if (br) parts.push(`what makes you unmistakably you in the world is ${br.freq.gift} (GK ${br.num})`);
    if (cu) parts.push(`you naturally cultivate ${cu.freq.gift} (GK ${cu.num}) in the environments you create`);
    if (pe) parts.push(`and ${pe.freq.gift} (GK ${pe.num}) is what emerges through a life in full service`);
    return parts.length > 0 ? parts.join(", ") + "." : "";
  }

  return "";
}
