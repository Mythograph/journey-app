// Cosmic Core — unified gate data (single source of truth)
//
// Merged from the Mythograph journey-app gate data and the Story Loom
// HD_GATES (quantum names, verb/gerund forms, story paragraphs).
// Gate descriptions are original interpretations of Human Design principles
// developed through the Mythograph framework. Human Design draws from the
// I Ching, Kabbalah, the Hindu Chakra system, astrology, and quantum physics.
// These descriptions are not affiliated with or endorsed by any other
// Human Design school or system.
//
// Each gate carries three frequency bands:
//   low  = conditioned / shadow expression
//   high = realized / gift expression
//   arc  = the low -> high journey
// in four grammatical forms (short, expanded, verb, gerund) so narrative
// builders can slot them into different sentence positions, plus a
// standalone storyParagraph.

export interface GateExpression {
  short: string;
  expanded: string;
  verb: string;
  gerund: string;
}

export interface Gate {
  number: number;
  traditionalName: string;
  quantumName: string;
  low: GateExpression;
  high: GateExpression;
  arc: GateExpression;
  storyParagraph: string;
}

export const GATES: Record<number, Gate> = {
  1: {
    number: 1, traditionalName: "Self-Expression", quantumName: "Purpose",
    low: {
      short: "an erratic or purposeless life, hiding because the calling feels too big to claim",
      expanded: "A pattern of anxiety and self-doubt around life purpose, often hiding or deflecting the calling because it feels too large, too presumptuous, or impossible to fulfill.",
      verb: "hide from a calling that feels too big to claim, living an erratic or purposeless life",
      gerund: "hiding from a calling that feels too big to claim, living an erratic or purposeless life",
    },
    high: {
      short: "a clear knowing of who I am and a deep, steady connection to my purpose",
      expanded: "An innate orientation toward authentic self-knowledge that functions as a compass. Purpose stops being a burden and becomes a reliable internal anchor.",
      verb: "know who I am and live from a clear, steady sense of purpose",
      gerund: "knowing who I am and living from a clear, steady sense of purpose",
    },
    arc: {
      short: "moving from hiding the calling to living from it as a natural expression of who I am",
      expanded: "This gate begins in the fear that purpose is something to perform or prove, and matures into a quiet, steady knowing of self that needs no justification.",
      verb: "move from hiding the calling to living from it as a natural expression of who I am",
      gerund: "moving from hiding the calling to living from it as a natural expression of who I am",
    },
    storyParagraph: "When Gate 1 is conditioned, life can feel scattered or purposeless — there's an anxious pressure to be doing something uniquely meaningful, and when it doesn't come easily, the tendency is to hide or deflect, as if the calling itself is too much to claim. But this gate's real gift is an innate knowing of who you are. When you stop performing purpose and start living from authentic self-knowledge, the sense of mission stops being a burden and becomes a steady compass.",
  },
  2: {
    number: 2, traditionalName: "Keeper of the Keys", quantumName: "Allowing",
    low: {
      short: "fierce self-sufficiency, burning out rather than trusting I'm supported",
      expanded: "A pattern of refusing help, pushing past limits, and operating as if trusting in support would be naive or weak. The drive toward total self-reliance becomes its own kind of depletion.",
      verb: "burn out through fierce self-sufficiency, refusing to trust that I'm supported",
      gerund: "burning out through fierce self-sufficiency, refusing to trust that I'm supported",
    },
    high: {
      short: "a trust that I am supported in being exactly who I am, even when I can't see how",
      expanded: "The ability to set intentions and move toward them in a state of genuine trust — that the right resources, relationships, and conditions will arrive. Living in gratitude rather than scarcity.",
      verb: "trust that I am supported in being exactly who I am, even when I can't see how",
      gerund: "trusting that I am supported in being exactly who I am, even when I can't see how",
    },
    arc: {
      short: "moving from exhausted self-sufficiency into the ease of trusting what's already flowing toward me",
      expanded: "This gate begins in the belief that I have to do everything alone, and opens into the understanding that receiving support is not weakness — it is the natural consequence of alignment.",
      verb: "move from exhausted self-sufficiency into the ease of trusting what's already flowing toward me",
      gerund: "moving from exhausted self-sufficiency into the ease of trusting what's already flowing toward me",
    },
    storyParagraph: "In its conditioned form, Gate 2 drives fierce self-sufficiency — you push yourself past your limits rather than ask for help, operating as if trusting in support would be naive or weak. The shift happens when you begin to set intentions and move toward them while genuinely trusting that the right resources and people will show up. Living in gratitude rather than scarcity is what unlocks the gate's highest expression: faith in what's already flowing toward you.",
  },
  3: {
    number: 3, traditionalName: "Ordering", quantumName: "Innovation",
    low: {
      short: "pressure to share ideas before they're ready, burning out against timing I can't force",
      expanded: "A compulsion to get new things out into the world immediately, often exhausting the idea before it has a chance to root. The innovation arrives before its moment, and loses traction.",
      verb: "push ideas out before they're ready, burning out against timing I can't force",
      gerund: "pushing ideas out before they're ready, burning out against timing I can't force",
    },
    high: {
      short: "the patience to cultivate ideas until the timing is right, trusting that my moment will come",
      expanded: "An ability to sit with innovation quietly, let it mature, and trust that the leading edge of what you carry will land when conditions are aligned. Patience becomes a creative practice.",
      verb: "cultivate ideas until the timing is right and trust that my moment will come",
      gerund: "cultivating ideas until the timing is right and trusting that my moment will come",
    },
    arc: {
      short: "moving from frantic urgency to trusting the timing of what I'm here to bring",
      expanded: "This gate begins in the pressure to prove the new idea right now, and opens into a relaxed confidence that what is genuinely innovative doesn't need to be forced — it needs to be ready.",
      verb: "move from frantic urgency to trusting the timing of what I'm here to bring",
      gerund: "moving from frantic urgency to trusting the timing of what I'm here to bring",
    },
    storyParagraph: "Gate 3 conditioned feels like urgency — the pressure to get the idea out now, to share the new thing before it's ready, which often burns out the innovation before it has a chance to root. The real medicine here is patience with the leading edge. As an innovator, your timing is rarely conventional. When you learn to cultivate your ideas quietly and trust that the right moment will arrive, what you bring into the world lands with far more impact.",
  },
  4: {
    number: 4, traditionalName: "Answers", quantumName: "Possibility",
    low: {
      short: "self-doubt around ideas I can't fully figure out, pressure to implement before the seed is ready",
      expanded: "A tendency to doubt ideas that feel half-formed, pushing toward implementation before the imagination has had time to generate the emotional response that makes attraction possible.",
      verb: "doubt ideas I can't fully figure out and pressure myself to implement before the seed is ready",
      gerund: "doubting ideas I can't fully figure out and pressuring myself to implement before the seed is ready",
    },
    high: {
      short: "the ability to hold an idea as a possibility and let it seed the imagination until it draws what it needs",
      expanded: "Treating ideas as seeds rather than problems. Letting an idea live in the imagination long enough to generate an emotional response, which then calibrates the heart and attracts the right experiences.",
      verb: "hold an idea as a possibility and let it seed my imagination until it draws what it needs",
      gerund: "holding an idea as a possibility and letting it seed my imagination until it draws what it needs",
    },
    arc: {
      short: "moving from needing to solve the idea immediately to trusting it as a seed that wants to grow",
      expanded: "This gate begins in the anxiety of the half-formed idea, and opens into the understanding that imagination — not logic — is what makes a possibility real.",
      verb: "move from needing to solve the idea immediately to trusting it as a seed that wants to grow",
      gerund: "moving from needing to solve the idea immediately to trusting it as a seed that wants to grow",
    },
    storyParagraph: "Conditioned, Gate 4 creates self-doubt around ideas that feel half-formed — there's pressure to figure everything out and implement before the idea has been properly seeded. The higher path is to treat ideas as possibilities rather than problems to solve. When you let an idea live in your imagination long enough to generate an emotional response, it starts attracting the experiences and opportunities that match it. The idea doesn't need to be solved — it needs to be felt.",
  },
  5: {
    number: 5, traditionalName: "Patterns", quantumName: "Consistency",
    low: {
      short: "constant struggle to stay consistent, feeling out of sync with what a successful life is supposed to look like",
      expanded: "Habits fall apart, routines collapse, and there's a persistent sense of failing to match some external standard of how a well-functioning life is supposed to run.",
      verb: "struggle to stay consistent, feeling out of sync with what a successful life is supposed to look like",
      gerund: "struggling to stay consistent, feeling out of sync with what a successful life is supposed to look like",
    },
    high: {
      short: "the ability to build habits that feel like genuine expressions of who I am, without forcing alignment",
      expanded: "Consistency that comes from alignment rather than willpower — routines that are actually expressions of the authentic self, easy to maintain because they belong to you.",
      verb: "build habits that feel like genuine expressions of who I am, without forcing alignment",
      gerund: "building habits that feel like genuine expressions of who I am, without forcing alignment",
    },
    arc: {
      short: "moving from forcing consistency to building rhythms that are genuinely mine",
      expanded: "This gate begins in the exhausting struggle against external standards of productivity, and opens into the discovery that alignment creates its own sustainable rhythm.",
      verb: "move from forcing consistency to building rhythms that are genuinely mine",
      gerund: "moving from forcing consistency to building rhythms that are genuinely mine",
    },
    storyParagraph: "When Gate 5 is conditioned, staying consistent feels like a constant battle — habits slip, routines collapse, and there's a persistent feeling of being out of sync with what a successful life is supposed to look like. The shift comes when you stop using willpower to force alignment and start building habits that actually feel like expressions of who you are. Consistency, for this gate, isn't discipline for its own sake — it's the practice of living true to yourself in small, repeatable ways.",
  },
  6: {
    number: 6, traditionalName: "Friction", quantumName: "Impact",
    low: {
      short: "emotional reactivity, invisibility, and doing whatever it takes to be seen or resourced",
      expanded: "Desperation to be seen and heard, emotional reactivity from a sense of lack, and a willingness to take energy or resources by whatever means available. Fear of never mattering.",
      verb: "react from emotional overwhelm, do whatever it takes to be seen or resourced",
      gerund: "reacting from emotional overwhelm, doing whatever it takes to be seen or resourced",
    },
    high: {
      short: "maintaining an emotional frequency that creates peace, equity, and genuine influence",
      expanded: "An ability to hold a high-frequency emotional state that shapes the environment — generating peace, equity, and sustainable relating. Influence through alignment rather than force.",
      verb: "maintain an emotional frequency that creates peace, equity, and genuine influence",
      gerund: "maintaining an emotional frequency that creates peace, equity, and genuine influence",
    },
    arc: {
      short: "moving from fighting to be seen to becoming an anchor of peace that others orient around",
      expanded: "This gate begins in the fear of invisibility, and opens into the discovery that emotional alignment creates a kind of presence that influences without effort.",
      verb: "move from fighting to be seen to becoming an anchor of peace that others orient around",
      gerund: "moving from fighting to be seen to becoming an anchor of peace that others orient around",
    },
    storyParagraph: "Gate 6 conditioned can produce emotional reactivity, a feeling of invisibility, and a willingness to do whatever it takes to get resources and recognition. There's often a fear of never being truly seen. In its high expression, this gate becomes an energetic anchor for peace and equitability — your emotional frequency influences the room, the relationship, the community. You don't have to fight to be seen; your alignment speaks for itself.",
  },
  7: {
    number: 7, traditionalName: "Self in Interaction", quantumName: "Collaboration",
    low: {
      short: "pushing for visible leadership, struggling to be recognized as the one in charge",
      expanded: "A compulsion to seize or perform leadership as a form of validation, often exhausting the energy available for actual purpose. The need to be the figurehead overrides the capacity to lead effectively.",
      verb: "push for visible leadership, struggling to be recognized as the one in charge",
      gerund: "pushing for visible leadership, struggling to be recognized as the one in charge",
    },
    high: {
      short: "understanding that real influence often works through collaboration rather than the front of the room",
      expanded: "A recognition that power often runs deeper through supporting and shaping leadership than competing for it. The ability to unify people around an idea and influence the direction others take.",
      verb: "trust that real influence often works through collaboration rather than the front of the room",
      gerund: "trusting that real influence often works through collaboration rather than the front of the room",
    },
    arc: {
      short: "moving from needing to be the visible leader to trusting the influence I carry in any position",
      expanded: "This gate begins in the grasping for recognition, and opens into the quiet confidence that leadership isn't always about being in front — sometimes the most powerful position is behind.",
      verb: "move from needing to be the visible leader to trusting the influence I carry in any position",
      gerund: "moving from needing to be the visible leader to trusting the influence I carry in any position",
    },
    storyParagraph: "When conditioned, Gate 7 pushes hard for visible leadership — there's a compulsion to be recognized as the one in charge, often at the cost of real effectiveness. The evolution here is realizing that influence runs deeper than titles. The most powerful version of this energy works with leadership rather than competing for it, helping unify people around ideas that shape the direction others follow. You don't have to be at the front to matter most.",
  },
  8: {
    number: 8, traditionalName: "Contribution", quantumName: "Fulfillment",
    low: {
      short: "believing purpose is something I have to perform or do rather than something I already am",
      expanded: "A tendency to think of life purpose as a role to execute — a model to perform, a service to deliver — which leads to trying to be someone you're not in order to seem useful.",
      verb: "believe purpose is something I have to perform or do rather than something I already am",
      gerund: "believing purpose is something I have to perform or do rather than something I already am",
    },
    high: {
      short: "the understanding that being fully, authentically myself is the contribution",
      expanded: "A recognition that authentic presence — simply being the full expression of yourself — is both the purpose and the gift. What inspires others is not your performance but your genuine self-expression.",
      verb: "understand that being fully, authentically myself is the contribution",
      gerund: "understanding that being fully, authentically myself is the contribution",
    },
    arc: {
      short: "moving from performing a purpose to inhabiting one",
      expanded: "This gate begins in the pressure to do the right thing and be the right kind of person, and opens into the embodied realization that who you actually are is the point.",
      verb: "move from performing a purpose to inhabiting one",
      gerund: "moving from performing a purpose to inhabiting one",
    },
    storyParagraph: "Conditioned Gate 8 can feel like purpose is something you're supposed to do — a role to perform, a model to embody — which leads to trying to be someone you're not. The real purpose of this gate is simpler: being fully, authentically yourself is the contribution. When you stop performing and start expressing, you become an invitation for others to do the same. Your authentic presence is the thing that inspires.",
  },
  9: {
    number: 9, traditionalName: "Focus", quantumName: "Convergence",
    low: {
      short: "overwhelm from too many options, scattered attention, unable to see what connects",
      expanded: "Too many directions, too many details, a persistent sense of fragmentation. The inability to see the relationship between ideas and actions makes it hard to know where to begin.",
      verb: "feel overwhelmed by too many options, scattering my attention, unable to see what connects",
      gerund: "feeling overwhelmed by too many options, scattering my attention, unable to see what connects",
    },
    high: {
      short: "the ability to see the big picture and know exactly where to place my energy",
      expanded: "A gift for zooming out, perceiving the larger convergence, and identifying the exact point where focused energy will actually matter. Complexity becomes navigable.",
      verb: "see the big picture and know exactly where to place my energy",
      gerund: "seeing the big picture and knowing exactly where to place my energy",
    },
    arc: {
      short: "moving from scattered overwhelm to clarity about where my energy belongs",
      expanded: "This gate begins in the fog of too many options, and opens into a clear, orienting perspective on where convergence wants to happen.",
      verb: "move from scattered overwhelm to clarity about where my energy belongs",
      gerund: "moving from scattered overwhelm to clarity about where my energy belongs",
    },
    storyParagraph: "In its conditioned state, Gate 9 creates overwhelm — too many options, too many details, a sense of being scattered across things that don't connect. The higher expression is the ability to zoom out, see the big picture, and know exactly where to place your energy. You're built to perceive the relationship between ideas and actions. When you trust that gift rather than resist the complexity, the fog clears and the next right move becomes obvious.",
  },
  10: {
    number: 10, traditionalName: "Love of Self", quantumName: "Self-Love",
    low: {
      short: "questioning my own lovability, settling for less, and sometimes blaming others for my circumstances",
      expanded: "A pattern of proving worth, settling for less than what is deserved, and orienting toward victim consciousness. The absence of self-love creates a persistent need for external validation.",
      verb: "question my own lovability, settle for less, and sometimes blame others for my circumstances",
      gerund: "questioning my own lovability, settling for less, and sometimes blaming others for my circumstances",
    },
    high: {
      short: "self-love as the foundation and source of creative power rather than something I have to earn",
      expanded: "The recognition that love for yourself is not a reward — it is the ground of everything. When self-love is the starting point rather than the goal, what you build from there carries a fundamentally different quality.",
      verb: "know self-love as the foundation and source of my creative power rather than something I have to earn",
      gerund: "knowing self-love as the foundation and source of my creative power rather than something I have to earn",
    },
    arc: {
      short: "moving from needing to prove my worth to knowing love as my foundation",
      expanded: "This gate begins in the exhausting work of proving lovability, and opens into the quiet certainty that love is not contingent — it is structural.",
      verb: "move from needing to prove my worth to knowing love as my foundation",
      gerund: "moving from needing to prove my worth to knowing love as my foundation",
    },
    storyParagraph: "Gate 10 conditioned often shows up as questioning your own lovability — settling for less, proving yourself, and sometimes sliding into victim consciousness by blaming your circumstances on others. The shift is recognizing that self-love isn't a reward you earn; it's the source of your creative power. When you love yourself as the starting point rather than the goal, everything you build from there carries a different quality.",
  },
  11: {
    number: 11, traditionalName: "Ideas", quantumName: "The Conceptualist",
    low: {
      short: "trying to manifest every idea that passes through me, exhausting myself as a builder of everything",
      expanded: "A frantic compulsion to turn every incoming idea into a project, forgetting that not every idea that moves through you is yours to build. The vessel becomes overloaded.",
      verb: "try to manifest every idea that passes through me, exhausting myself as a builder of everything",
      gerund: "trying to manifest every idea that passes through me, exhausting myself as a builder of everything",
    },
    high: {
      short: "the ability to hold and steward ideas until the right moment or person arrives to carry them",
      expanded: "A recognition that you are a vessel for ideas, not necessarily a builder of all of them. The gift is in holding inspiration gently, protecting it, and knowing when to transmit and to whom.",
      verb: "hold and steward ideas until the right moment or person arrives to carry them",
      gerund: "holding and stewarding ideas until the right moment or person arrives to carry them",
    },
    arc: {
      short: "moving from forcing every idea into form to trusting my role as a steward of inspiration",
      expanded: "This gate begins in the exhaustion of trying to build everything, and opens into the ease of knowing that some ideas pass through you on their way to somewhere else.",
      verb: "move from forcing every idea into form to trusting my role as a steward of inspiration",
      gerund: "moving from forcing every idea into form to trusting my role as a steward of inspiration",
    },
    storyParagraph: "In its conditioned form, Gate 11 frantically tries to manifest every idea that comes through — which is exhausting, because not every idea that passes through you is yours to build. This gate is a vessel. Its gift is holding and protecting ideas until the right person or moment appears to carry them forward. When you relax into that role — as a steward of inspiration rather than a builder of everything — your ideas start landing where they actually belong.",
  },
  12: {
    number: 12, traditionalName: "Caution", quantumName: "The Channel",
    low: {
      short: "paralysis from caution or forcing words before they're ready",
      expanded: "A pattern of either stalling out because hesitancy has hardened into paralysis, or rushing to speak before the moment is aligned. Both distort the real power of this voice.",
      verb: "stall in paralysis from caution or force words before they're ready",
      gerund: "stalling in paralysis from caution or forcing words before they're ready",
    },
    high: {
      short: "the trust that when the timing is right, my voice carries genuine transformative weight",
      expanded: "An understanding that this voice is a vehicle for transformation — and that articulation coming at the right moment carries real power to change how people think. Waiting for fluency is wisdom, not weakness.",
      verb: "trust that when the timing is right, my voice carries genuine transformative weight",
      gerund: "trusting that when the timing is right, my voice carries genuine transformative weight",
    },
    arc: {
      short: "moving from forcing or silencing my voice to trusting the timing of its impact",
      expanded: "This gate begins in the tension between speaking too soon and staying too silent, and opens into a calibrated trust in the relationship between timing and transmission.",
      verb: "move from forcing or silencing my voice to trusting the timing of its impact",
      gerund: "moving from forcing or silencing my voice to trusting the timing of its impact",
    },
    storyParagraph: "When conditioned, Gate 12 either hesitates too long (letting caution harden into paralysis) or pushes too soon (trying to force words into form before they're ready). The high expression of this gate is understanding that your voice is a vehicle for transformation — and that when the timing is right, the words come naturally and carry real weight. Struggling to articulate something is information: it usually means the moment hasn't arrived yet. Wait for the fluency.",
  },
  13: {
    number: 13, traditionalName: "The Listener", quantumName: "Narrative",
    low: {
      short: "staying trapped in old stories, replaying past pain, unable to move the narrative forward",
      expanded: "A tendency to carry old wounds as a fixed identity, returning to the same narrative loops rather than composting experience into something generative.",
      verb: "stay trapped in old stories, replaying past pain, unable to move the narrative forward",
      gerund: "staying trapped in old stories, replaying past pain, unable to move the narrative forward",
    },
    high: {
      short: "using the power of personal narrative to consciously create and transform",
      expanded: "A rare ability to craft language that shifts how people perceive themselves and their lives. This power begins with the stories you choose to tell about your own experience, and radiates outward.",
      verb: "use the power of personal narrative to consciously create and transform",
      gerund: "using the power of personal narrative to consciously create and transform",
    },
    arc: {
      short: "moving from being stuck in the old story to becoming a conscious narrator of my own becoming",
      expanded: "This gate begins in the grip of the wound-story, and opens into the realization that narrative is not just what happened — it is what you make of what happened.",
      verb: "move from being stuck in the old story to becoming a conscious narrator of my own becoming",
      gerund: "moving from being stuck in the old story to becoming a conscious narrator of my own becoming",
    },
    storyParagraph: "Conditioned, Gate 13 stays stuck in old stories — carrying past pain, repeating old wounds, staying in a victimhood narrative that keeps replaying. The evolution is the conscious use of personal narrative. You have a rare ability to craft language that shifts how people see themselves and their lives. That power starts with the stories you choose to tell about your own experience. When you rewrite your own narrative with intention, you model what's possible for everyone around you.",
  },
  14: {
    number: 14, traditionalName: "Power Skills", quantumName: "Creation",
    low: {
      short: "fear and compromise around resources, doing whatever work I have to do just to survive",
      expanded: "A scarcity-driven relationship with money and work — compromising on true purpose in order to maintain material stability, letting anxiety about resources drive choices.",
      verb: "compromise around resources, doing whatever work I have to do just to survive",
      gerund: "compromising around resources, doing whatever work I have to do just to survive",
    },
    high: {
      short: "working from alignment with my heart, trusting that support follows genuine purpose",
      expanded: "A complete reframing of what work is for. Not labor for material gain, but contribution from the heart — and the discovery that when you work from that place, resources follow. Support flows from alignment.",
      verb: "work from alignment with my heart, trusting that support follows genuine purpose",
      gerund: "working from alignment with my heart, trusting that support follows genuine purpose",
    },
    arc: {
      short: "moving from working out of fear to creating from genuine alignment",
      expanded: "This gate begins in the fear that doing the real work won't sustain you, and opens into the lived experience that it does — that alignment and material support are not in conflict.",
      verb: "move from working out of fear to creating from genuine alignment",
      gerund: "moving from working out of fear to creating from genuine alignment",
    },
    storyParagraph: "Gate 14 conditioned is rooted in fear around money and resources — compromising on what you're actually here to do in order to survive, letting material anxiety drive your choices. The high expression reframes work entirely: you're not here to work for material gain, but to work from alignment with your heart. When you do that, resources follow — and the resources you have naturally increase the resources available to others. Support flows from alignment, not from hustle.",
  },
  15: {
    number: 15, traditionalName: "Extremes", quantumName: "Compassion",
    low: {
      short: "judging myself for rhythms that don't match conventional expectations, forcing my waves into a linear schedule",
      expanded: "Self-judgment and friction from trying to fit natural waves of creative energy into a daily structure that doesn't belong to you. The failure to match conventional productivity standards becomes evidence of personal failure.",
      verb: "judge myself for rhythms that don't match conventional expectations, forcing my waves into a linear schedule",
      gerund: "judging myself for rhythms that don't match conventional expectations, forcing my waves into a linear schedule",
    },
    high: {
      short: "trusting my own rhythm, knowing that cycles and extremes are part of how I create and renew",
      expanded: "An ability to honor your own flow — to work within natural parameters when it feels right, rest without guilt in between, and recognize that disruption to old rhythms is itself a form of creative work.",
      verb: "trust my own rhythm, knowing that cycles and extremes are part of how I create and renew",
      gerund: "trusting my own rhythm, knowing that cycles and extremes are part of how I create and renew",
    },
    arc: {
      short: "moving from judging my rhythms to trusting them as the shape of my contribution",
      expanded: "This gate begins in the shame of not fitting the expected schedule, and opens into the understanding that your particular rhythm is not a deficit — it's the form your contribution takes.",
      verb: "move from judging my rhythms to trusting them as the shape of my contribution",
      gerund: "moving from judging my rhythms to trusting them as the shape of my contribution",
    },
    storyParagraph: "When conditioned, Gate 15 creates self-judgment around rhythm — trying to force yourself into conventional schedules and feeling like a failure when your natural waves of energy don't cooperate. The truth is that you're built for extremes and cycles, not linear consistency. The high expression is learning to trust your own rhythm, work within the parameters that feel right, and rest without guilt in between. You're here to shift old patterns toward something more genuinely compassionate — starting with how you treat yourself.",
  },
  16: {
    number: 16, traditionalName: "Skills", quantumName: "Zest",
    low: {
      short: "leaping without enough preparation, or holding back because others say I'm not ready",
      expanded: "Either a pattern of enthusiastic action before the ground is stable, or unnecessary restraint because external voices override your own sense of readiness. Both distort the energy.",
      verb: "leap without enough preparation, or hold back because others say I'm not ready",
      gerund: "leaping without enough preparation, or holding back because others say I'm not ready",
    },
    high: {
      short: "the courage to trust my own timing and move when it feels right, even without a full map",
      expanded: "A faith in your own intuition about when the timing is right — a willingness to step forward when something in you says yes, even without certainty about exactly how the path will unfold.",
      verb: "trust my own timing and move when it feels right, even without a full map",
      gerund: "trusting my own timing and moving when it feels right, even without a full map",
    },
    arc: {
      short: "moving from self-doubt about readiness to trusting my own intuition about when to move",
      expanded: "This gate begins in the oscillation between reckless leaping and unnecessary restraint, and opens into a clear, felt sense of when you are genuinely ready enough.",
      verb: "move from self-doubt about readiness to trusting my own intuition about when to move",
      gerund: "moving from self-doubt about readiness to trusting my own intuition about when to move",
    },
    storyParagraph: "Gate 16 conditioned either leaps recklessly into new things without preparation, or holds back unnecessarily because others insist you're not ready. Both are distortions of the same energy. In its high expression, this gate is the courage to trust your own intuition about timing — to move forward when it feels right, even without a complete map. Faith in the outcome, and trust in your own readiness, are what make this gate's enthusiasm transformative rather than scattered.",
  },
  17: {
    number: 17, traditionalName: "Opinions", quantumName: "Anticipation",
    low: {
      short: "sharing opinions as facts, creating narratives filled with doubt that limit what feels possible",
      expanded: "A pattern of treating opinions as certainties, building collective narratives of doubt and limitation, and using mental energy to contract rather than expand what seems possible.",
      verb: "share opinions as facts, creating narratives filled with doubt that limit what feels possible",
      gerund: "sharing opinions as facts, creating narratives filled with doubt that limit what feels possible",
    },
    high: {
      short: "using my mind to explore potentials and invite others to think bigger",
      expanded: "A capacity to orient mental energy toward possibility — generating thoughts that stretch what people believe is available to them, inspiring expansive imagination rather than confirming limitation.",
      verb: "use my mind to explore potentials and invite others to think bigger",
      gerund: "using my mind to explore potentials and invite others to think bigger",
    },
    arc: {
      short: "moving from contracting narratives to thoughts that open new terrain",
      expanded: "This gate begins in the conviction that opinions are truth, and opens into the discovery that the same mental power used to constrain can be redirected toward expansion.",
      verb: "move from contracting narratives to thoughts that open new terrain",
      gerund: "moving from contracting narratives to thoughts that open new terrain",
    },
    storyParagraph: "Conditioned, Gate 17 shares opinions as if they were facts — creating narratives filled with doubt, limiting what others believe is possible. The shift is learning to use your mental capacity to explore and expand, not contract. Your thoughts, when directed toward possibility rather than certainty, can help people think bigger. Your words can set the stage for new potentials. The mind of Gate 17, at its best, is an incubator for what could be.",
  },
  18: {
    number: 18, traditionalName: "Correction", quantumName: "Re-Alignment",
    low: {
      short: "criticizing without care for impact, more focused on being right than on whether it serves",
      expanded: "A compulsion to correct that prioritizes personal rightness over genuine contribution. Insight shared without regard for timing, relationship, or whether it actually adds to joy in the world.",
      verb: "criticize without care for impact, more focused on being right than on whether it serves",
      gerund: "criticizing without care for impact, more focused on being right than on whether it serves",
    },
    high: {
      short: "seeing what needs to shift and waiting for the right moment to serve re-alignment",
      expanded: "An ability to perceive misalignment clearly and hold the correction until the timing and circumstances allow it to land in service of joy rather than ego. Discernment over judgment.",
      verb: "see what needs to shift and wait for the right moment to serve re-alignment",
      gerund: "seeing what needs to shift and waiting for the right moment to serve re-alignment",
    },
    arc: {
      short: "moving from needing to be right to offering correction in service of something larger",
      expanded: "This gate begins in the compulsion to correct, and opens into the wisdom of knowing when — and whether — to speak.",
      verb: "move from needing to be right to offering correction in service of something larger",
      gerund: "moving from needing to be right to offering correction in service of something larger",
    },
    storyParagraph: "When conditioned, Gate 18 can be critical without care — more focused on being right than on whether the insight actually serves anyone. There's often a compulsion to correct before the timing is right. In its higher expression, this gate sees what's misaligned and waits for the right moment and circumstances to address it. The correction isn't for the sake of being right; it's in service of joy, and it's offered when it can actually land.",
  },
  19: {
    number: 19, traditionalName: "Wanting", quantumName: "Attunement",
    low: {
      short: "shutting down from overwhelm, or becoming clingy as a way of forcing the connection I need",
      expanded: "Emotional sensitivity that either collapses inward as shutdown or reaches outward as clinginess — both responses to the intensity of wanting genuine connection and belonging.",
      verb: "shut down from overwhelm, or become clingy as a way of forcing the connection I need",
      gerund: "shutting down from overwhelm, or becoming clingy as a way of forcing the connection I need",
    },
    high: {
      short: "sensing the emotional needs of others and knowing how to bring things back into alignment",
      expanded: "A capacity to read the emotional field of a person, relationship, or community — and to know, intuitively, what is needed to restore genuine connection and sustain heart-to-heart intimacy.",
      verb: "sense the emotional needs of others and know how to bring things back into alignment",
      gerund: "sensing the emotional needs of others and knowing how to bring things back into alignment",
    },
    arc: {
      short: "moving from overwhelm by sensitivity to working with it as a gift of attunement",
      expanded: "This gate begins in the pain of being too sensitive for the room, and opens into the discovery that the same sensitivity is the gift of knowing what others need before they can name it.",
      verb: "move from overwhelm by sensitivity to working with it as a gift of attunement",
      gerund: "moving from overwhelm by sensitivity to working with it as a gift of attunement",
    },
    storyParagraph: "Gate 19 conditioned can swing between emotional shutdown (because the sensitivity feels like too much) and emotional clinginess (trying to force the connection you deeply need). The high expression of this gate is the ability to sense the emotional needs of others — and of a community — and know how to bring things back into alignment. This gate can read the room in ways others can't, and in its highest form, uses that sensitivity to increase genuine intimacy and heart-to-heart connection.",
  },
  20: {
    number: 20, traditionalName: "Metamorphosis", quantumName: "Patience",
    low: {
      short: "acting before the timing is right, feeling pressure to move before I'm ready",
      expanded: "An urgency that pushes toward action before the conditions are aligned, leading to frustration, false starts, or quitting — not from lack of capacity, but from mistiming.",
      verb: "act before the timing is right, feeling pressure to move before I'm ready",
      gerund: "acting before the timing is right, feeling pressure to move before I'm ready",
    },
    high: {
      short: "trusting the preparation phase, knowing what needs to be in place before the moment arrives",
      expanded: "A deep intuition for what needs to be built, gathered, learned, or set in place before the right timing unfolds. Patience here is not passivity — it is active readiness.",
      verb: "trust the preparation phase, knowing what needs to be in place before the moment arrives",
      gerund: "trusting the preparation phase, knowing what needs to be in place before the moment arrives",
    },
    arc: {
      short: "moving from pressure to act prematurely to trusting the preparation that makes action real",
      expanded: "This gate begins in the frustration of feeling like timing is an obstacle, and opens into the understanding that preparation is itself the work — and that when you are truly ready, the moment arrives.",
      verb: "move from pressure to act prematurely to trusting the preparation that makes action real",
      gerund: "moving from pressure to act prematurely to trusting the preparation that makes action real",
    },
    storyParagraph: "Conditioned, Gate 20 feels the pressure to act before the moment is right — and when action comes too soon, frustration or quitting often follows. The evolution here is trusting the preparation phase. This gate has an intuition for what needs to be set in place before the right timing arrives — what skills to develop, what people to gather, what foundations to build. Patience isn't passive here; it's active readiness.",
  },
  21: {
    number: 21, traditionalName: "The Treasurer", quantumName: "Self-Regulation",
    low: {
      short: "controlling people, resources, and circumstances from a fear of not being worthy of support",
      expanded: "An attempt to maintain safety through control — of environments, resources, people — rooted in a deep-seated fear that without vigilance, support will disappear.",
      verb: "control people, resources, and circumstances from a fear of not being worthy of support",
      gerund: "controlling people, resources, and circumstances from a fear of not being worthy of support",
    },
    high: {
      short: "regulating my inner and outer environment in ways that reflect and sustain my true value",
      expanded: "An ability to maintain the conditions — emotional, energetic, relational, material — that allow you to function at your genuine level of capacity. Generosity toward yourself, and boundaries that protect it.",
      verb: "regulate my inner and outer environment in ways that reflect and sustain my true value",
      gerund: "regulating my inner and outer environment in ways that reflect and sustain my true value",
    },
    arc: {
      short: "moving from controlling out of fear to regulating from a place of knowing my own worth",
      expanded: "This gate begins in the grip of control, and opens into the spacious clarity of knowing what you need in order to remain sustainable — and claiming it.",
      verb: "move from controlling out of fear to regulating from a place of knowing my own worth",
      gerund: "moving from controlling out of fear to regulating from a place of knowing my own worth",
    },
    storyParagraph: "When conditioned, Gate 21 tries to control people, resources, and circumstances from a place of fear — a deep-seated worry that you're not worthy of being supported. The high expression is about regulation rather than control: maintaining the inner and outer conditions that reflect your true value. This means setting boundaries, being generous with yourself, and taking the actions necessary to remain sustainable. You're not controlling life — you're honoring your place in it.",
  },
  22: {
    number: 22, traditionalName: "Openness", quantumName: "Surrender",
    low: {
      short: "stifling passion from the fear I can't afford to pursue it, settling and compromising",
      expanded: "A shutting down of creative and passionate energy because of the belief that following what you love is not materially possible. Despair becomes the regulator of what gets created.",
      verb: "stifle my passion from the fear I can't afford to pursue it, settling and compromising",
      gerund: "stifling my passion from the fear I can't afford to pursue it, settling and compromising",
    },
    high: {
      short: "the grace to pursue my passion and contribution knowing I am fully supported in doing so",
      expanded: "A deep trust in the universal flow of support — the willingness to follow passion and purpose without waiting for proof that the resources will arrive. Surrender here is not defeat; it is the act of trusting the flow.",
      verb: "pursue my passion and contribution with grace, knowing I am fully supported in doing so",
      gerund: "pursuing my passion and contribution with grace, knowing I am fully supported in doing so",
    },
    arc: {
      short: "moving from suppressing my passion to letting it carry me toward what I'm actually here to make",
      expanded: "This gate begins in the compromise born of fear, and opens into the liberating recognition that support follows genuine pursuit — not the other way around.",
      verb: "move from suppressing my passion to letting it carry me toward what I'm actually here to make",
      gerund: "moving from suppressing my passion to letting it carry me toward what I'm actually here to make",
    },
    storyParagraph: "Gate 22 conditioned stifles passion — there's a fear that you can't afford to pursue what you love, so you settle or compromise, and the creative process feels blocked. The high expression is a deep trust that you are fully supported in making your unique contribution to the world, no matter what the outer circumstances look like. Surrender here isn't defeat; it's the grace of trusting the flow enough to move forward with your passion anyway.",
  },
  23: {
    number: 23, traditionalName: "Assimilation", quantumName: "Transmission",
    low: {
      short: "desperate to be understood, sharing insights with people who aren't ready, feeling alone with my knowing",
      expanded: "A compulsion to transmit what you understand before people are ready to receive it — followed by despair or bitterness at the gap between your knowing and others' comprehension.",
      verb: "desperately seek to be understood, sharing insights with people who aren't ready, feeling alone with my knowing",
      gerund: "desperately seeking to be understood, sharing insights with people who aren't ready, feeling alone with my knowing",
    },
    high: {
      short: "translating transformative insight with the right timing and trust in my own knowing",
      expanded: "The ability to take what you understand — sometimes far ahead of the collective — and translate it in ways that actually land. Knowing when to share is as important as knowing what to share.",
      verb: "translate transformative insight with the right timing and trust in my own knowing",
      gerund: "translating transformative insight with the right timing and trust in my own knowing",
    },
    arc: {
      short: "moving from the loneliness of knowing too much to the confidence of transmitting at the right moment",
      expanded: "This gate begins in the isolation of insight that can't yet be received, and opens into the mastery of knowing when and how your understanding will actually shift someone.",
      verb: "move from the loneliness of knowing too much to the confidence of transmitting at the right moment",
      gerund: "moving from the loneliness of knowing too much to the confidence of transmitting at the right moment",
    },
    storyParagraph: "Conditioned, Gate 23 is desperate to be understood — sharing insights with people who aren't ready to receive them, and then feeling despair or bitterness at the disconnect. The evolution is timing and trust: knowing when to transmit what you understand, and having confidence that your knowingness is real even when others can't follow it yet. When aligned, this gate can translate complex or radical ideas into language that genuinely shifts how people think.",
  },
  24: {
    number: 24, traditionalName: "Rationalization", quantumName: "Blessings",
    low: {
      short: "using rationalization to stay safe inside old patterns, resisting what wants to grow",
      expanded: "A tendency to construct logical justifications for remaining where you are — explaining away the invitation to transform, settling for less than what is possible.",
      verb: "use rationalization to stay safe inside old patterns, resisting what wants to grow",
      gerund: "using rationalization to stay safe inside old patterns, resisting what wants to grow",
    },
    high: {
      short: "reframing every experience as a potential source of growth, finding the blessing in the whole story",
      expanded: "An ability to look at the complete arc of experience — including what was hard — and find what was learned, what grew, and what was ultimately liberating. Gratitude for the whole journey.",
      verb: "reframe every experience as a potential source of growth, finding the blessing in the whole story",
      gerund: "reframing every experience as a potential source of growth, finding the blessing in the whole story",
    },
    arc: {
      short: "moving from rationalizing the status quo to finding genuine grace in what has been",
      expanded: "This gate begins in the habit of explaining why change isn't possible, and opens into the discovery that every experience — without exception — has been composting into wisdom.",
      verb: "move from rationalizing the status quo to finding genuine grace in what has been",
      gerund: "moving from rationalizing the status quo to finding genuine grace in what has been",
    },
    storyParagraph: "Gate 24 conditioned uses rationalization to stay safe — holding on to familiar patterns, resisting growth, and constructing explanations for why things can't change. The high expression reframes every experience as a potential source of expansion. When you shift the story of what's happened to you — from what went wrong to what you learned — you free yourself from loops that no longer serve you. Gratitude for the whole journey, including the hard parts, is what this gate does best.",
  },
  25: {
    number: 25, traditionalName: "Love of Spirit", quantumName: "Spirit",
    low: {
      short: "mistrust of something larger, using willpower instead of alignment, feeling unworthy of being loved by Source",
      expanded: "Operating from ego and personal strategy alone, cutting off from any sense of divine support, and using force to create what alignment might otherwise attract. A fundamental sense of being unsupported by the larger order.",
      verb: "mistrust something larger, relying on willpower instead of alignment, feeling unworthy of being loved by Source",
      gerund: "mistrusting something larger, relying on willpower instead of alignment, feeling unworthy of being loved by Source",
    },
    high: {
      short: "a consistent, devoted relationship with Source as the foundation for how I move through everything",
      expanded: "A practice of returning to alignment with something larger than the personal self — consistently, diligently — as the source of healing, purpose, and the capacity to serve others.",
      verb: "maintain a devoted, consistent relationship with Source as the ground of everything I do",
      gerund: "maintaining a devoted, consistent relationship with Source as the ground of everything I do",
    },
    arc: {
      short: "moving from relying on willpower alone to trusting something larger as the ground I stand on",
      expanded: "This gate begins in the isolation of feeling unsupported by the universe, and opens into the sustained practice of alignment that makes everything else possible.",
      verb: "move from relying on willpower alone to trusting something larger as the ground I stand on",
      gerund: "moving from relying on willpower alone to trusting something larger as the ground I stand on",
    },
    storyParagraph: "When conditioned, Gate 25 cuts off from Source — operating from ego and personal gain, using willpower instead of alignment, and feeling fundamentally unworthy of divine support. In its highest expression, this gate cultivates a consistent, devoted relationship with something larger than itself. That connection becomes the foundation for everything else — a way of healing not just yourself, but others, through the quality of presence you carry.",
  },
  26: {
    number: 26, traditionalName: "The Trickster", quantumName: "Integrity",
    low: {
      short: "inflating worth as a mask for feeling unworthy, or shrinking in the face of past wounds",
      expanded: "Either overcompensating for insecurity with ego, performance, or control — or collapsing under old wounds and failing to claim what is genuinely yours. Both are distortions of the same energy.",
      verb: "inflate my worth as a mask for feeling unworthy, or shrink in the face of past wounds",
      gerund: "inflating my worth as a mask for feeling unworthy, or shrinking in the face of past wounds",
    },
    high: {
      short: "living in alignment across all dimensions — moral, energetic, physical, relational, financial — with trust in my own place",
      expanded: "A grounded, clear-eyed integrity that doesn't require performance. Acting as if you are precious, setting boundaries from that knowing, and doing the right thing even when it costs something.",
      verb: "live in alignment across all dimensions — moral, energetic, physical, relational, financial — with trust in my own place",
      gerund: "living in alignment across all dimensions — moral, energetic, physical, relational, financial — with trust in my own place",
    },
    arc: {
      short: "moving from performing worth or hiding from it to embodying genuine integrity",
      expanded: "This gate begins in the oscillation between inflation and contraction, and opens into a settled, non-dramatic integrity that simply knows its own value.",
      verb: "move from performing worth or hiding from it to embodying genuine integrity",
      gerund: "moving from performing worth or hiding from it to embodying genuine integrity",
    },
    storyParagraph: "Gate 26 conditioned either inflates self-worth as a mask for feeling unworthy, or shrinks in the face of past trauma and doesn't claim what's rightfully theirs. The high expression is integrity — living in alignment across every dimension: moral, energetic, physical, relational, financial. This isn't about being perfect; it's about trusting your place enough to act as if you're precious, set clear boundaries, and do the right thing even when it costs something.",
  },
  27: {
    number: 27, traditionalName: "Responsibility", quantumName: "Accountability",
    low: {
      short: "over-caretaking, guilt, martyrdom, giving from a place that depletes rather than serves",
      expanded: "A pattern of over-giving that is rooted in guilt or obligation rather than genuine care — caretaking that exhausts the self and enables others to avoid their own growth.",
      verb: "over-caretake from guilt and martyrdom, giving from a place that depletes rather than serves",
      gerund: "over-caretaking from guilt and martyrdom, giving from a place that depletes rather than serves",
    },
    high: {
      short: "supporting others from a full place, nurturing in ways that increase genuine self-sufficiency",
      expanded: "True nurturing that comes from abundance rather than depletion. The ability to lift others up in ways that encourage their own self-love and empowerment, rather than creating dependency.",
      verb: "support others from a full place, nurturing in ways that increase genuine self-sufficiency",
      gerund: "supporting others from a full place, nurturing in ways that increase genuine self-sufficiency",
    },
    arc: {
      short: "moving from martyrdom to genuine care that sustains both the giver and the receiver",
      expanded: "This gate begins in the exhaustion of giving what you don't have, and opens into the discovery that the most nourishing thing you can offer comes from a full, not depleted, place.",
      verb: "move from martyrdom to genuine care that sustains both the giver and the receiver",
      gerund: "moving from martyrdom to genuine care that sustains both the giver and the receiver",
    },
    storyParagraph: "Gate 27 conditioned swings between over-caretaking (martyrdom, guilt, enabling) and co-dependency — giving so much to others that there's nothing left for self. The high expression is genuine nurturing: supporting others' growth without removing the lessons they need to face. When you feed people from a full place — healthy nourishment, real support — and hold them accountable for their own self-love, you become a force for actual empowerment rather than rescue.",
  },
  28: {
    number: 28, traditionalName: "Struggle", quantumName: "Adventure and Challenge",
    low: {
      short: "refusing the journey out of fear it will be too painful, or identifying so fully with struggle that failure feels inevitable",
      expanded: "A tendency to avoid the path because past difficulty has made struggle feel like proof of inadequacy — or to stay so entrenched in the struggle narrative that the meaning in it is invisible.",
      verb: "refuse the journey out of fear it will be too painful, or identify so fully with struggle that failure feels inevitable",
      gerund: "refusing the journey out of fear it will be too painful, or identifying so fully with struggle that failure feels inevitable",
    },
    high: {
      short: "turning challenge into a meaningful path of courage and contribution shared with others",
      expanded: "The understanding that your personal experience of perseverance — what you've tried, lost, endured, and kept going through — is precisely what gives others permission to believe something better is possible. Challenge deepens what you have to offer.",
      verb: "turn challenge into a meaningful path of courage and contribution shared with others",
      gerund: "turning challenge into a meaningful path of courage and contribution shared with others",
    },
    arc: {
      short: "moving from struggle as identity to struggle as the ground of genuine meaning",
      expanded: "This gate begins in the fear that the hard path is proof something is wrong, and opens into the realization that the difficulty has been building something real all along.",
      verb: "move from struggle as identity to struggle as the ground of genuine meaning",
      gerund: "moving from struggle as identity to struggle as the ground of genuine meaning",
    },
    storyParagraph: "Gate 28 conditioned refuses the journey out of fear that it will be too painful, or it identifies so fully with past struggles that failure feels inevitable. The high expression takes those same struggles and turns them into the texture of a meaningful life. Your personal experience of perseverance — what you've tried, failed at, and kept going through — is exactly what gives others permission to believe something better is possible. The adventure matters because of what it deepens.",
  },
  29: {
    number: 29, traditionalName: "Perseverance", quantumName: "Devotion",
    low: {
      short: "over-committing, burning out, unable to recognize when enough is enough",
      expanded: "Saying yes to everything, staying long past the natural end of things, and depleting the self through a compulsive devotion to completion — even when what's being completed no longer serves.",
      verb: "over-commit, burn out, and stay unable to recognize when enough is enough",
      gerund: "over-committing, burning out, and staying unable to recognize when enough is enough",
    },
    high: {
      short: "the ability to commit fully to the right thing, and to know the difference by sensing genuine resonance",
      expanded: "A capacity to persevere in ways that genuinely change the direction of a life — yours and others' — because the commitment is real. Knowing what deserves your yes is the gift.",
      verb: "commit fully to the right thing and know the difference by sensing genuine resonance",
      gerund: "committing fully to the right thing and knowing the difference by sensing genuine resonance",
    },
    arc: {
      short: "moving from indiscriminate over-commitment to a devotion that comes from genuine resonance",
      expanded: "This gate begins in the exhaustion of over-giving through obligation, and opens into the discovery that discernment about what you commit to is itself a form of devotion.",
      verb: "move from indiscriminate over-commitment to a devotion that comes from genuine resonance",
      gerund: "moving from indiscriminate over-commitment to a devotion that comes from genuine resonance",
    },
    storyParagraph: "When conditioned, Gate 29 over-commits — saying yes to everything, burning out, staying in things long past their natural end because letting go feels like failure. The high expression is the ability to respond: to commit fully to the right thing, and to know what that is by sensing genuine resonance rather than obligation. Your devotion, when it's real, changes the direction of a life — yours and others'.",
  },
  30: {
    number: 30, traditionalName: "Desire", quantumName: "Passion",
    low: {
      short: "burning out from intensity, misdirecting passion, leaping into chaos before the vision is stable",
      expanded: "Passion that arrives faster than the vision can sustain it — leaping into heat without enough ground, burning out, and abandoning what had potential before it could mature.",
      verb: "burn out from intensity, misdirecting passion, leaping into chaos before the vision is stable",
      gerund: "burning out from intensity, misdirecting passion, leaping into chaos before the vision is stable",
    },
    high: {
      short: "sustaining a dream or vision long enough to bring it into form and inspire others to hold theirs",
      expanded: "An ability to hold the flame of a vision steady over time — tending it rather than exhausting it — until it becomes real. The capacity to inspire others not by the intensity of your passion but by its endurance.",
      verb: "sustain a dream or vision long enough to bring it into form and inspire others to hold theirs",
      gerund: "sustaining a dream or vision long enough to bring it into form and inspiring others to hold theirs",
    },
    arc: {
      short: "moving from burning fast and collapsing to learning how to tend a vision over time",
      expanded: "This gate begins in the volatility of passion without container, and opens into the discipline of tending what you love long enough to let it fully arrive.",
      verb: "move from burning fast and collapsing to learning how to tend a vision over time",
      gerund: "moving from burning fast and collapsing to learning how to tend a vision over time",
    },
    storyParagraph: "Gate 30 conditioned is passion misdirected — burning hot, leaping into chaos, exhausting itself on intensity that has no staying power. The shift is learning to sustain the vision. This gate's gift isn't the spark; it's the ability to hold a dream alive long enough to bring it into form. When you learn to tend your passion like a fire rather than ignite and abandon it, you become someone who genuinely inspires others to hold their own visions.",
  },
  31: {
    number: 31, traditionalName: "Democracy", quantumName: "The Leader",
    low: {
      short: "pushing for leadership as personal validation, or shrinking from it without feeling worthy",
      expanded: "Either seizing the role of leader from a place of needing to be seen, or avoiding leadership entirely because it feels presumptuous. Both cut off the genuine capacity to lead.",
      verb: "push for leadership as personal validation, or shrink from it without feeling worthy",
      gerund: "pushing for leadership as personal validation, or shrinking from it without feeling worthy",
    },
    high: {
      short: "earning leadership by listening, and assuming it as a voice for the people I serve",
      expanded: "A leadership that is recognized rather than seized — rooted in genuine attentiveness to what the people around you need, and a willingness to hold the vision they can't always see themselves.",
      verb: "earn leadership by listening and assume it as a voice for the people I serve",
      gerund: "earning leadership by listening and assuming it as a voice for the people I serve",
    },
    arc: {
      short: "moving from grasping for or avoiding leadership to receiving it as a genuine calling",
      expanded: "This gate begins in the conflict between wanting to lead and feeling unworthy of it, and opens into a quiet confidence that real leadership is given, not taken — and that it flows from service.",
      verb: "move from grasping for or avoiding leadership to receiving it as a genuine calling",
      gerund: "moving from grasping for or avoiding leadership to receiving it as a genuine calling",
    },
    storyParagraph: "Conditioned, Gate 31 either pushes for leadership as personal validation, or shrinks back and doesn't feel worthy of leading at all. In its high expression, leadership here is earned through listening. The leader of Gate 31 is a voice for the people they serve — someone who assumes their role because others genuinely recognize them, and who holds it by staying responsive to what those people actually need. Leading doesn't have to be seized; it can be received.",
  },
  32: {
    number: 32, traditionalName: "Continuity", quantumName: "Endurance",
    low: {
      short: "letting fear of failure prevent the preparation needed, or pushing too hard against the right timing",
      expanded: "Either avoiding the necessary groundwork because starting feels like too great a risk, or pushing relentlessly past the signals that timing isn't right and burning out in the process.",
      verb: "let fear of failure prevent the preparation needed, or push too hard against the right timing",
      gerund: "letting fear of failure prevent the preparation needed, or pushing too hard against the right timing",
    },
    high: {
      short: "a patient, thorough readiness that translates inspiration into an actual foundation",
      expanded: "An awareness of exactly what needs to be in place for a dream to become real — building that foundation quietly, steadily, and trusting that the timing will open when the stage is properly set.",
      verb: "build patient, thorough readiness that translates inspiration into an actual foundation",
      gerund: "building patient, thorough readiness that translates inspiration into an actual foundation",
    },
    arc: {
      short: "moving from fear of failure into patient preparation that lets the right moment arrive",
      expanded: "This gate begins in the avoidance of preparation, and opens into the deep satisfaction of building something solid enough to hold the dream when timing finally opens.",
      verb: "move from fear of failure into patient preparation that lets the right moment arrive",
      gerund: "moving from fear of failure into patient preparation that lets the right moment arrive",
    },
    storyParagraph: "Gate 32 conditioned lets fear of failure prevent preparation — avoiding what needs to be done, or rushing in against the right timing and burning out. The high expression is patient readiness: understanding exactly what needs to be in place for a dream to become real, building that foundation quietly and steadily, and trusting that timing will unfold when the stage is set. Preparation isn't procrastination; it's translating inspiration into actual readiness.",
  },
  33: {
    number: 33, traditionalName: "Privacy", quantumName: "Retelling",
    low: {
      short: "staying in a personal narrative built on pain, sharing stories from wound rather than wisdom",
      expanded: "A tendency to carry experience as wound rather than letting it ripen into wisdom — sharing from a place of hurt and disempowerment that neither liberates the teller nor helps the listener.",
      verb: "stay in a personal narrative built on pain, sharing stories from wound rather than wisdom",
      gerund: "staying in a personal narrative built on pain, sharing stories from wound rather than wisdom",
    },
    high: {
      short: "translating personal experience into empowering narrative at the right moment, with the greatest impact",
      expanded: "A mastery of when a story has composted from pain into something generative — something that offers others a map. The power of this gate lives in the timing and the transformation of the telling.",
      verb: "translate personal experience into empowering narrative at the right moment, with the greatest impact",
      gerund: "translating personal experience into empowering narrative at the right moment, with the greatest impact",
    },
    arc: {
      short: "moving from wound-story to wisdom-story, knowing when it's time to tell it differently",
      expanded: "This gate begins in the grip of the old narrative, and opens into the craft of knowing when experience has become something worth sharing — and how to tell it in a way that frees rather than binds.",
      verb: "move from wound-story to wisdom-story, knowing when it's time to tell it differently",
      gerund: "moving from wound-story to wisdom-story, knowing when it's time to tell it differently",
    },
    storyParagraph: "When conditioned, Gate 33 stays stuck in personal narratives built on pain — sharing stories from a place of wound rather than wisdom. The high expression is knowing when a story has ripened into something that can help others. The transformation from experience to insight — finding the meaning in the difficult thing and sharing it at the right moment — is this gate's real craft. You're not just telling what happened; you're giving someone else a map.",
  },
  34: {
    number: 34, traditionalName: "Power", quantumName: "Power",
    low: {
      short: "forcing things into being through sheer will, depleting myself by pushing against timing and circumstance",
      expanded: "A pattern of effortful pushing — trying to make things happen through force, becoming exhausted when the timing or conditions aren't right, depleting the energy that could be reserved for genuine impact.",
      verb: "force things into being through sheer will, depleting myself by pushing against timing and circumstance",
      gerund: "forcing things into being through sheer will, depleting myself by pushing against timing and circumstance",
    },
    high: {
      short: "waiting for the right convergence of people, timing, and idea — then moving with real clarity and force",
      expanded: "An ability to hold energy in reserve until the moment when the right people, the right vision, and the right timing converge — and then move with a power that is self-sustaining rather than effortful.",
      verb: "wait for the right convergence of people, timing, and idea — then move with real clarity and force",
      gerund: "waiting for the right convergence of people, timing, and idea — then moving with real clarity and force",
    },
    arc: {
      short: "moving from pushing and forcing to waiting for the moment that calls for everything I have",
      expanded: "This gate begins in the exhaustion of relentless push, and opens into the discovery that power used at the right moment — from a rested, aligned place — changes things in ways that force never could.",
      verb: "move from pushing and forcing to waiting for the moment that calls for everything I have",
      gerund: "moving from pushing and forcing to waiting for the moment that calls for everything I have",
    },
    storyParagraph: "Gate 34 conditioned burns energy pushing and forcing things into being — trying to make things happen through sheer will, and depleting itself when the timing or conditions aren't right. The high expression knows how to wait for the moment when the right people, the right idea, and the right timing converge — and then moves with real force and clarity. This gate's power is most effective when it's responsive rather than relentless.",
  },
  35: {
    number: 35, traditionalName: "Change", quantumName: "Experience",
    low: {
      short: "settling into boredom or restlessness, never challenging the status quo or seeing experiences through",
      expanded: "A tendency to either numb out into a life that never challenges the possible, or to move restlessly from experience to experience without going deep enough to learn what any of them have to teach.",
      verb: "settle into boredom or restlessness, never challenging the status quo or seeing experiences through",
      gerund: "settling into boredom or restlessness, never challenging the status quo or seeing experiences through",
    },
    high: {
      short: "knowing which experiences are worth having and bringing back what I learn to expand what's possible",
      expanded: "A discernment about which experiences are genuinely generative — and a commitment to going deep enough to extract what they offer, then sharing that knowledge to expand what others believe is available to them.",
      verb: "know which experiences are worth having and bring back what I learn to expand what's possible",
      gerund: "knowing which experiences are worth having and bringing back what I learn to expand what's possible",
    },
    arc: {
      short: "moving from restlessness or stagnation to choosing experiences with intention and mining them for meaning",
      expanded: "This gate begins in the boredom of a life that plays it safe or the restlessness of constant movement without depth, and opens into the practice of intentional experience as a form of service.",
      verb: "move from restlessness or stagnation to choosing experiences with intention and mining them for meaning",
      gerund: "moving from restlessness or stagnation to choosing experiences with intention and mining them for meaning",
    },
    storyParagraph: "Conditioned, Gate 35 settles into boredom or numbness — never quite challenging the status quo, letting restlessness become stagnation. In its high expression, this gate is discerning about which experiences are genuinely worth having, and it brings back what it learns to change the collective story of what's possible. Not every experience needs to be had — but the ones you choose to dive into become fuel for evolution.",
  },
  36: {
    number: 36, traditionalName: "Crisis", quantumName: "Exploration",
    low: {
      short: "leaping from one thing to the next without alignment, creating chaos and missing the full arc of experience",
      expanded: "A pattern of jumping into new opportunities before the current one has unfolded — driven by restlessness or crisis energy — and never arriving at the full fruition of what was begun.",
      verb: "leap from one thing to the next without alignment, creating chaos and missing the full arc of experience",
      gerund: "leaping from one thing to the next without alignment, creating chaos and missing the full arc of experience",
    },
    high: {
      short: "holding a vision with sustained emotional alignment and letting it develop through its full natural arc",
      expanded: "An ability to stay with a vision long enough to see what it becomes — maintaining emotional alignment through the uncertainty, and discovering that real miracles come from the commitment to see things through.",
      verb: "hold a vision with sustained emotional alignment and let it develop through its full natural arc",
      gerund: "holding a vision with sustained emotional alignment and letting it develop through its full natural arc",
    },
    arc: {
      short: "moving from crisis-driven leaping to the sustained presence that lets visions become real",
      expanded: "This gate begins in the pattern of constant new beginnings, and opens into the understanding that the deepest possibilities require you to stay long enough to find out.",
      verb: "move from crisis-driven leaping to the sustained presence that lets visions become real",
      gerund: "moving from crisis-driven leaping to the sustained presence that lets visions become real",
    },
    storyParagraph: "Gate 36 conditioned leaps from one new thing to the next without waiting for anything to fully unfold — creating chaos, missing the fullness of each experience, always looking for what's next before the current thing has delivered what it came to teach. The high expression is the ability to hold a vision with sustained emotional alignment and let it develop through its natural arc. The real miracles come from staying with something long enough to see what it becomes.",
  },
  37: {
    number: 37, traditionalName: "Friendship", quantumName: "Peace",
    low: {
      short: "searching for peace outside myself, trying to manage or fix the outer world to feel okay inside",
      expanded: "A tendency to locate peace in the external environment — in other people's behavior, in circumstances, in control — rather than cultivating it as an inner practice.",
      verb: "search for peace outside myself, trying to manage or fix the outer world to feel okay inside",
      gerund: "searching for peace outside myself, trying to manage or fix the outer world to feel okay inside",
    },
    high: {
      short: "generating peace from within, and responding to life from that stability no matter what's happening around me",
      expanded: "An ability to stay connected to an inner peace that remains relatively stable regardless of outer circumstances — and to generate peaceful choices and relating from that ground.",
      verb: "generate peace from within and respond to life from that stability no matter what's happening around me",
      gerund: "generating peace from within and responding to life from that stability no matter what's happening around me",
    },
    arc: {
      short: "moving from seeking peace outside to finding it as an inner practice I can bring anywhere",
      expanded: "This gate begins in the exhaustion of trying to manufacture peace through control, and opens into the quiet discovery that it was always available inwardly — and from there, outwardly.",
      verb: "move from seeking peace outside to finding it as an inner practice I can bring anywhere",
      gerund: "moving from seeking peace outside to finding it as an inner practice I can bring anywhere",
    },
    storyParagraph: "Conditioned, Gate 37 looks for peace outside itself — trying to manage, fix, or control the external environment in order to feel okay on the inside. The high expression is an inner peace that stays more or less steady regardless of what's happening around you. From that stability, you naturally generate peaceful choices and peaceful relating. You don't create peace by controlling life; you create it by staying connected to it as a practice.",
  },
  38: {
    number: 38, traditionalName: "The Fighter", quantumName: "The Visionary",
    low: {
      short: "fighting for the sake of fighting, aggression without direction or meaning",
      expanded: "A pattern of engaging in conflict or struggle that has no real purpose — fighting everything, defending territory that doesn't matter, exhausting energy on battles that don't serve the vision.",
      verb: "fight for the sake of fighting, with aggression that has no direction or meaning",
      gerund: "fighting for the sake of fighting, with aggression that has no direction or meaning",
    },
    high: {
      short: "knowing what's worth committing to and using lived struggle to craft a vision that anchors real possibility",
      expanded: "An ability to use personal experience of challenge and perseverance as the raw material for a vision that is genuinely worth fighting for — something meaningful enough to anchor a life around.",
      verb: "know what's worth committing to and use lived struggle to craft a vision that anchors real possibility",
      gerund: "knowing what's worth committing to and using lived struggle to craft a vision that anchors real possibility",
    },
    arc: {
      short: "moving from fighting everything to knowing what deserves the full force of my commitment",
      expanded: "This gate begins in undirected struggle, and opens into the clarity of a vision compelling enough to give all of that fighting energy a worthy purpose.",
      verb: "move from fighting everything to knowing what deserves the full force of my commitment",
      gerund: "moving from fighting everything to knowing what deserves the full force of my commitment",
    },
    storyParagraph: "Gate 38 conditioned fights for the sake of fighting — aggression without direction, struggle without meaning. The evolution is knowing what's actually worth committing to. When you stop fighting everything and start asking what's worthy of your energy, you become a visionary: someone who uses their lived experience of struggle and perseverance to anchor a genuine possibility in the world. The vision you carry is the thing that makes the fight worth it.",
  },
  39: {
    number: 39, traditionalName: "Provocation", quantumName: "Recalibration",
    low: {
      short: "panic in the face of lack, provoking others to fill an inner alignment they can't provide",
      expanded: "A tendency to respond to scarcity — real or perceived — with hoarding, provocation, or making others responsible for an inner sense of insufficiency they cannot resolve.",
      verb: "panic in the face of lack, provoking others to fill an inner alignment they can't provide",
      gerund: "panicking in the face of lack, provoking others to fill an inner alignment they can't provide",
    },
    high: {
      short: "using the awareness of lack as a signal to recalibrate toward sufficiency and abundance",
      expanded: "An ability to sense contraction — in yourself or in a shared field — and use that awareness as an invitation to shift toward sufficiency. Turning the experience of lack into a doorway toward abundance rather than a confirmation of it.",
      verb: "use the awareness of lack as a signal to recalibrate toward sufficiency and abundance",
      gerund: "using the awareness of lack as a signal to recalibrate toward sufficiency and abundance",
    },
    arc: {
      short: "moving from reacting to lack with panic to using it as a recalibration signal",
      expanded: "This gate begins in the spiral of scarcity and provocation, and opens into the discovery that the felt sense of lack is itself a navigational tool — pointing toward where re-alignment is needed.",
      verb: "move from reacting to lack with panic to using it as a recalibration signal",
      gerund: "moving from reacting to lack with panic to using it as a recalibration signal",
    },
    storyParagraph: "Gate 39 conditioned responds to lack with panic — hoarding, provoking others, making them responsible for an inner alignment they can't provide. The high expression turns that same sensitivity into a capacity for transformation: when you sense lack, you use it as a signal to recalibrate toward sufficiency. You know how to turn contraction into abundance — in yourself first, and then in the spaces you inhabit.",
  },
  40: {
    number: 40, traditionalName: "Loneliness", quantumName: "Restoration",
    low: {
      short: "overdoing and over-giving to prove my value, then collapsing into loneliness and resentment",
      expanded: "A pattern of exhausting the self through relentless giving and doing — driven by the need to justify belonging — followed by a loneliness that feels like punishment rather than signal.",
      verb: "overdo and over-give to prove my value, then collapse into loneliness and resentment",
      gerund: "overdoing and over-giving to prove my value, then collapsing into loneliness and resentment",
    },
    high: {
      short: "retreating to restore, then returning to community with genuinely more to offer",
      expanded: "An understanding that withdrawal is not abandonment — it is the necessary replenishment that makes sustainable contribution possible. The rhythm of solitude and return is a form of wisdom, not failure.",
      verb: "retreat to restore, then return to community with genuinely more to offer",
      gerund: "retreating to restore, then returning to community with genuinely more to offer",
    },
    arc: {
      short: "moving from proving worth through over-giving to honoring the rhythm of retreat and return",
      expanded: "This gate begins in the exhaustion of giving what you don't have, and opens into the discovery that the most generous thing you can do is restore yourself first.",
      verb: "move from proving worth through over-giving to honoring the rhythm of retreat and return",
      gerund: "moving from proving worth through over-giving to honoring the rhythm of retreat and return",
    },
    storyParagraph: "Gate 40 conditioned overdoes and over-gives as a way of proving value, then collapses into loneliness and resentment. The high expression understands that retreat isn't abandonment — it's replenishment. When you genuinely rest and restore, you return to community with more to offer. The rhythm of withdrawal and return is natural and necessary, and honoring it allows your contribution to be sustainable rather than burned out.",
  },
  41: {
    number: 41, traditionalName: "Fantasy", quantumName: "Imagination",
    low: {
      short: "fixating on worst-case scenarios, suppressing dreams out of fear of being judged as unrealistic",
      expanded: "A tendency to use the imagination against itself — either catastrophizing, or shutting down the dreaming capacity entirely to avoid the disappointment or judgment that comes with hoping.",
      verb: "fixate on worst-case scenarios, suppressing dreams out of fear of being judged as unrealistic",
      gerund: "fixating on worst-case scenarios, suppressing dreams out of fear of being judged as unrealistic",
    },
    high: {
      short: "using creative imagination to hold abundant visions and break limiting beliefs about what's possible",
      expanded: "An ability to sustain expansive, possibility-oriented visions with genuine imaginative commitment — sharing them at the right moment, and using the dreaming faculty to dissolve old patterns and inherited ceilings.",
      verb: "use creative imagination to hold abundant visions and break limiting beliefs about what's possible",
      gerund: "using creative imagination to hold abundant visions and break limiting beliefs about what's possible",
    },
    arc: {
      short: "moving from imagination turned inward against myself to imagination as a creative force for what hasn't happened yet",
      expanded: "This gate begins in the fear of dreaming, and opens into the understanding that imagination isn't naïve — it is the first act of every real creation.",
      verb: "move from imagination turned inward against myself to imagination as a creative force for what hasn't happened yet",
      gerund: "moving from imagination turned inward against myself to imagination as a creative force for what hasn't happened yet",
    },
    storyParagraph: "Conditioned, Gate 41 fixates on worst-case scenarios or suppresses its dreaming entirely — afraid of being judged as unrealistic, or too afraid of disappointment to hope at all. The high expression is the ability to hold an abundant vision with genuine creative imagination — to sustain it, share it when the timing is right, and use it to break through limiting beliefs. You're built to imagine what hasn't happened yet, and that's not naïve; it's the first step of every real creation.",
  },
  42: {
    number: 42, traditionalName: "Finishing Things", quantumName: "Conclusion",
    low: {
      short: "avoiding completion, piling up unfinished things, or forcing endings before they're ready",
      expanded: "Either a backlog of incompletions that creates paralysis and overwhelm, or a pressure to wrap things up prematurely — both patterns cutting off the full maturation of what was begun.",
      verb: "avoid completion, pile up unfinished things, or force endings before they're ready",
      gerund: "avoiding completion, piling up unfinished things, or forcing endings before they're ready",
    },
    high: {
      short: "knowing exactly what needs to be completed to create genuine space for what wants to begin",
      expanded: "A clear sense of which cycles are ready to close, and the wisdom to facilitate their completion in ways that honor what they have been — making real space for what comes next.",
      verb: "know exactly what needs to be completed to create genuine space for what wants to begin",
      gerund: "knowing exactly what needs to be completed to create genuine space for what wants to begin",
    },
    arc: {
      short: "moving from pressure around completion to a clear, wise sense of when and how things are ready to end",
      expanded: "This gate begins in the anxiety of things left undone or finished too soon, and opens into the discernment of knowing when a cycle has truly run its course.",
      verb: "move from pressure around completion to a clear, wise sense of when and how things are ready to end",
      gerund: "moving from pressure around completion to a clear, wise sense of when and how things are ready to end",
    },
    storyParagraph: "Gate 42 conditioned avoids or delays what needs to be completed — either from pressure to start new things before the current ones are done, or from a backlog of incompletions that creates paralysis. The high expression is a clear sense of what needs to be finished to create genuine space for what's next. You know how to complete a cycle with wisdom — not prematurely, and not endlessly extended — so that something new has room to begin.",
  },
  43: {
    number: 43, traditionalName: "Insight", quantumName: "Insight",
    low: {
      short: "feeling alone with my knowing, sharing before the timing is right, frustrated at not being understood",
      expanded: "A pattern of having clear, often radical insight but struggling to articulate it — or sharing it before others are ready, and then feeling isolated with what you understand.",
      verb: "feel alone with my knowing, share before the timing is right, feel frustrated at not being understood",
      gerund: "feeling alone with my knowing, sharing before the timing is right, feeling frustrated at not being understood",
    },
    high: {
      short: "trusting that the right moment will come to share what I know in a way that actually lands",
      expanded: "A confidence in the reality of your own knowing, combined with a patience for the timing that allows it to be received. When the moment is right, the transmission happens naturally and shifts something real in the listener.",
      verb: "trust that the right moment will come to share what I know in a way that actually lands",
      gerund: "trusting that the right moment will come to share what I know in a way that actually lands",
    },
    arc: {
      short: "moving from the loneliness of knowing too soon to the confidence of sharing at the right moment",
      expanded: "This gate begins in the frustration of understanding things others can't yet follow, and opens into a quiet trust that the right moment for transmission will always arrive.",
      verb: "move from the loneliness of knowing too soon to the confidence of sharing at the right moment",
      gerund: "moving from the loneliness of knowing too soon to the confidence of sharing at the right moment",
    },
    storyParagraph: "When conditioned, Gate 43 feels isolated with its knowing — having lightning-bolt clarity that's difficult to articulate, sharing it before the timing is right, and then feeling alone when no one understands. The high expression is trust in timing. Your insights are real and they expand what people understand about the world, but they need the right moment to land. When you wait for the alignment between what you know and when people can receive it, the transmission actually transforms something.",
  },
  44: {
    number: 44, traditionalName: "Energy", quantumName: "Truth",
    low: {
      short: "feeling haunted by past patterns, believing history is doomed to repeat itself",
      expanded: "A paralysis rooted in the weight of past experience — the belief that what has happened before is insurmountable, that old patterns are permanent, that the past determines the future.",
      verb: "feel haunted by past patterns, believing history is doomed to repeat itself",
      gerund: "feeling haunted by past patterns, believing history is doomed to repeat itself",
    },
    high: {
      short: "seeing patterns clearly and using that awareness to help myself and others break free of them",
      expanded: "An ability to recognize the origin of a pattern — where it came from, what it was protecting against, what it costs to maintain — and use that awareness as the first step toward transformation. Pain becomes purposeful rather than permanent.",
      verb: "see patterns clearly and use that awareness to help myself and others break free of them",
      gerund: "seeing patterns clearly and using that awareness to help myself and others break free of them",
    },
    arc: {
      short: "moving from being trapped by the past to using pattern recognition as a tool for liberation",
      expanded: "This gate begins in the haunting of old cycles, and opens into the clarity that seeing a pattern fully is the beginning of being free of it.",
      verb: "move from being trapped by the past to using pattern recognition as a tool for liberation",
      gerund: "moving from being trapped by the past to using pattern recognition as a tool for liberation",
    },
    storyParagraph: "Gate 44 conditioned is haunted by patterns — believing that what has happened before is inevitably going to happen again, feeling trapped by history. The high expression can see patterns for what they are and use that awareness to help break them — for yourself and for others. Recognizing where a pattern came from is the first step toward moving through it, and this gate has a particular gift for turning old pain into renewed purpose and value.",
  },
  45: {
    number: 45, traditionalName: "The King or Queen", quantumName: "Distribution",
    low: {
      short: "using leadership as a performance of status, withholding or controlling from a place of insecurity",
      expanded: "Leadership rooted in the need to be seen as important — compensating for insecurity with control, ego, or bombast, and measuring worth by the recognition of others.",
      verb: "use leadership as a performance of status, withholding or controlling from a place of insecurity",
      gerund: "using leadership as a performance of status, withholding or controlling from a place of insecurity",
    },
    high: {
      short: "understanding that knowledge and resources are most powerful when shared to help others build their own foundation",
      expanded: "A recognition that true leadership is distributive rather than hoarding — that what you know and what you have becomes most valuable when it is used to grow the capacity and abundance of others.",
      verb: "understand that knowledge and resources are most powerful when shared to help others build their own foundation",
      gerund: "understanding that knowledge and resources are most powerful when shared to help others build their own foundation",
    },
    arc: {
      short: "moving from leading to be seen to leading in order to genuinely build others up",
      expanded: "This gate begins in the performance of authority, and opens into the understanding that real power is generative — it multiplies rather than consolidates.",
      verb: "move from leading to be seen to leading in order to genuinely build others up",
      gerund: "moving from leading to be seen to leading in order to genuinely build others up",
    },
    storyParagraph: "When conditioned, Gate 45 uses leadership as a performance of status — compensating for insecurity with control, ego, or withholding. In its high expression, this gate understands that knowledge and material resources are most powerful when they're shared in ways that help others grow their own foundation. True leadership here isn't about being seen as a leader; it's about building others up with what you know and what you have.",
  },
  46: {
    number: 46, traditionalName: "Love of Body", quantumName: "Embodiment",
    low: {
      short: "disconnecting from or rejecting the body, neglecting or hiding it, avoiding the commitment to physical care",
      expanded: "A pattern of treating the body as an obstacle, an embarrassment, or something separate from the real self — neglecting its needs, disconnecting from its signals, refusing to inhabit it fully.",
      verb: "disconnect from or reject the body, neglecting or hiding it, avoiding the commitment to physical care",
      gerund: "disconnecting from or rejecting the body, neglecting or hiding it, avoiding the commitment to physical care",
    },
    high: {
      short: "honoring the body as the soul's instrument and committing to inhabiting it as fully as possible",
      expanded: "A recognition that the body is not separate from the spiritual journey — it is the vehicle through which the soul expresses itself in the world. Tending the body becomes a sacred practice, and full embodiment becomes a form of spiritual commitment.",
      verb: "honor the body as the soul's instrument and commit to inhabiting it as fully as possible",
      gerund: "honoring the body as the soul's instrument and committing to inhabiting it as fully as possible",
    },
    arc: {
      short: "moving from disconnection or shame around the body to treating it as a partner in the work",
      expanded: "This gate begins in the estrangement from physical life, and opens into the discovery that how much life force you can embody is directly connected to how much you can offer.",
      verb: "move from disconnection or shame around the body to treating it as a partner in the work",
      gerund: "moving from disconnection or shame around the body to treating it as a partner in the work",
    },
    storyParagraph: "Gate 46 conditioned disconnects from the body — sometimes through neglect, sometimes through shame, avoiding the commitment to physical care that actually grounds the spirit. The high expression recognizes the body as the soul's instrument: something to be loved, tended, and inhabited fully. When you treat your physical form as a partner in your purpose rather than an obstacle to it, you discover how much life force is available to you. Embodiment is a spiritual practice.",
  },
  47: {
    number: 47, traditionalName: "Realization", quantumName: "Mindset",
    low: {
      short: "quitting when I can't figure out how to make something happen, feeling defeated by ideas I can't manifest",
      expanded: "A tendency to abandon inspiration at the first obstacle of implementation — treating the absence of a clear path as evidence that the vision isn't real or isn't for you.",
      verb: "quit when I can't figure out how to make something happen, feeling defeated by ideas I can't manifest",
      gerund: "quitting when I can't figure out how to make something happen, feeling defeated by ideas I can't manifest",
    },
    high: {
      short: "maintaining inspired, hopeful thought as a practice regardless of what's happening around me",
      expanded: "An understanding that the orientation of the mind toward possibility — independent of current circumstances — is what calibrates the emotional frequency that attracts the how. You don't need to know the mechanism; you need to keep believing in the direction.",
      verb: "maintain inspired, hopeful thought as a practice regardless of what's happening around me",
      gerund: "maintaining inspired, hopeful thought as a practice regardless of what's happening around me",
    },
    arc: {
      short: "moving from collapsing under what I can't figure out to trusting that inspiration itself is enough to begin",
      expanded: "This gate begins in the despair of the half-manifested idea, and opens into the discovery that a mind held in hopeful alignment is itself a generative act.",
      verb: "move from collapsing under what I can't figure out to trusting that inspiration itself is enough to begin",
      gerund: "moving from collapsing under what I can't figure out to trusting that inspiration itself is enough to begin",
    },
    storyParagraph: "Conditioned, Gate 47 quits when it can't figure out how — treating the absence of a clear path as evidence that the vision isn't possible. The shift is in maintaining inspired, hopeful thought regardless of outer circumstances. Your mind's orientation toward possibility calibrates your emotional frequency, and that frequency is what actually draws in the how. You don't need to know the mechanism; you need to keep believing in the direction.",
  },
  48: {
    number: 48, traditionalName: "Depth", quantumName: "Wisdom",
    low: {
      short: "paralyzed by inadequacy, afraid to act until I know more, convinced I'm not ready enough",
      expanded: "A persistent sense of not knowing enough, not being prepared enough, not having sufficient authority to act or be trusted — which keeps genuine mastery perpetually just out of reach.",
      verb: "feel paralyzed by inadequacy, afraid to act until I know more, convinced I'm not ready enough",
      gerund: "feeling paralyzed by inadequacy, afraid to act until I know more, convinced I'm not ready enough",
    },
    high: {
      short: "trusting my own depth of knowing and my connection to Source as the real foundation for action",
      expanded: "A self-trust rooted in the recognition that your capacity to learn, to go deep, and to find what you need is itself the wisdom. You don't need to have arrived — you need to trust the process of knowing.",
      verb: "trust my own depth of knowing and my connection to Source as the real foundation for action",
      gerund: "trusting my own depth of knowing and my connection to Source as the real foundation for action",
    },
    arc: {
      short: "moving from paralysis in inadequacy to trusting the depth I carry as enough to begin",
      expanded: "This gate begins in the stalling of not-yet-enough, and opens into the confidence that depth of engagement — not certainty — is the real credential.",
      verb: "move from paralysis in inadequacy to trusting the depth I carry as enough to begin",
      gerund: "moving from paralysis in inadequacy to trusting the depth I carry as enough to begin",
    },
    storyParagraph: "Gate 48 conditioned stalls in inadequacy — convinced it doesn't know enough, isn't ready enough, and needs more preparation before it can act or be trusted. The high expression is the self-trust to explore deeply, build real foundations, and then move from genuine mastery rather than performed certainty. You are connected to a source of knowing that goes beyond what you've formally learned. Trust that, and the depth you carry becomes wisdom others can actually use.",
  },
  49: {
    number: 49, traditionalName: "Principles", quantumName: "The Catalyst",
    low: {
      short: "quitting too soon to avoid vulnerability, or holding rigidly to agreements that have long stopped serving",
      expanded: "Either leaving before the real work begins as a way of protecting against intimacy, or staying locked in commitments and values that have outlasted their usefulness — refusing to let go even when a higher principle is calling.",
      verb: "quit too soon to avoid vulnerability, or hold rigidly to agreements that have long stopped serving",
      gerund: "quitting too soon to avoid vulnerability, or holding rigidly to agreements that have long stopped serving",
    },
    high: {
      short: "knowing when to release what no longer serves and modeling the courage of choosing a higher alignment",
      expanded: "An ability to sense when a value, relationship, or agreement has run its course — and the courage to move on in service of something better. When you release what no longer aligns, you don't just free yourself; you demonstrate what it looks like to choose a higher principle over a comfortable but diminishing situation.",
      verb: "know when to release what no longer serves and model the courage of choosing a higher alignment",
      gerund: "knowing when to release what no longer serves and modeling the courage of choosing a higher alignment",
    },
    arc: {
      short: "moving from holding on out of fear to trusting that release in service of a higher value is its own form of integrity",
      expanded: "This gate begins in the oscillation between premature exit and prolonged staying, and opens into a calibrated sense of when genuine evolution requires letting go.",
      verb: "move from holding on out of fear to trusting that release in service of a higher value is its own form of integrity",
      gerund: "moving from holding on out of fear to trusting that release in service of a higher value is its own form of integrity",
    },
    storyParagraph: "When conditioned, Gate 49 either quits too soon to avoid vulnerability, or holds rigidly to agreements and values that have long since stopped serving anyone. The high expression knows when it's time to let something go — and has the courage to do it in service of something better. When you move on from what no longer aligns, you don't just free yourself; you model for others what it looks like to choose a higher principle over a comfortable but diminishing status quo.",
  },
  50: {
    number: 50, traditionalName: "Values", quantumName: "Nurturing",
    low: {
      short: "over-caring from a depleted place, held in check by guilt and rigid principles",
      expanded: "A pattern of giving past the point of genuine capacity — driven by obligation, guilt, or an inability to let others face the consequences of their own choices — resulting in exhaustion and resentment.",
      verb: "over-care from a depleted place, held in check by guilt and rigid principles",
      gerund: "over-caring from a depleted place, held in check by guilt and rigid principles",
    },
    high: {
      short: "nurturing from fullness, and teaching others in ways that increase their own self-sufficiency",
      expanded: "True care that comes from an abundant rather than depleted place. An intuition for what others genuinely need to grow — not what keeps them comfortable or dependent — and the willingness to offer that even when it's harder.",
      verb: "nurture from fullness and teach others in ways that increase their own self-sufficiency",
      gerund: "nurturing from fullness and teaching others in ways that increase their own self-sufficiency",
    },
    arc: {
      short: "moving from guilt-driven caretaking to nourishment that genuinely sustains everyone involved",
      expanded: "This gate begins in the exhaustion of giving what you don't have, and opens into the recognition that you can only truly feed others from a place that is itself well-fed.",
      verb: "move from guilt-driven caretaking to nourishment that genuinely sustains everyone involved",
      gerund: "moving from guilt-driven caretaking to nourishment that genuinely sustains everyone involved",
    },
    storyParagraph: "Gate 50 conditioned over-gives from a depleted place, held in check by guilt and rigid principles — taking care of everyone else while neglecting the self. The evolution is understanding that you can only genuinely nurture others from a full well. Self-tending is not selfish; it's the source of your capacity to support. When you fill yourself first, what you offer others has real nutritional value — it feeds them in ways that support genuine growth and self-sufficiency.",
  },
  51: {
    number: 51, traditionalName: "Shock", quantumName: "Initiation",
    low: {
      short: "losing connection to purpose when life disrupts, becoming bitter or grasping for control",
      expanded: "A tendency to be destabilized by the unexpected — letting the shock of disruption generate bitterness, anger at the universe, or a frantic attempt to regain control that depletes the energy needed to actually navigate change.",
      verb: "lose connection to purpose when life disrupts, becoming bitter or grasping for control",
      gerund: "losing connection to purpose when life disrupts, becoming bitter or grasping for control",
    },
    high: {
      short: "using cycles of disruption as catalysts that deepen connection to purpose and Source",
      expanded: "An ability to consciously meet disruption as an initiatory threshold — asking what this is opening rather than what it is destroying. Each shock becomes a deeper anchoring in what actually matters.",
      verb: "use cycles of disruption as catalysts that deepen my connection to purpose and Source",
      gerund: "using cycles of disruption as catalysts that deepen my connection to purpose and Source",
    },
    arc: {
      short: "moving from being destabilized by disruption to recognizing it as the threshold it actually is",
      expanded: "This gate begins in the shock of unexpected turns, and opens into the trust that disruption is not random — it is the form the soul's curriculum sometimes takes.",
      verb: "move from being destabilized by disruption to recognizing it as the threshold it actually is",
      gerund: "moving from being destabilized by disruption to recognizing it as the threshold it actually is",
    },
    storyParagraph: "Gate 51 conditioned is destabilized by disruption — the unexpected twists of life trigger bitterness, anger, or a grasping attempt to regain control. The high expression uses disruption differently: every shock becomes a threshold, an invitation to go deeper into connection with purpose and Source. When you stop trying to prevent the unexpected and start asking what it's initiating you into, the disruptions in your life become the most formative chapters of your story.",
  },
  52: {
    number: 52, traditionalName: "Stillness", quantumName: "Perspective",
    low: {
      short: "scattered attention, overwhelmed into paralysis, or focused on the wrong things entirely",
      expanded: "An inability to find the still point that would clarify where energy belongs — either scattering across too many inputs at once, or freezing in overwhelm while what actually matters waits.",
      verb: "scatter my attention, overwhelm myself into paralysis, or focus on the wrong things entirely",
      gerund: "scattering my attention, overwhelming myself into paralysis, or focusing on the wrong things entirely",
    },
    high: {
      short: "the ability to step back, see the larger pattern, and know exactly where my energy will matter",
      expanded: "A gift for perspective — for stepping out of the immediate noise and perceiving what is actually happening at a structural level. From that vantage, you know precisely where to place your energy so it bears real fruit.",
      verb: "step back, see the larger pattern, and know exactly where my energy will matter",
      gerund: "stepping back, seeing the larger pattern, and knowing exactly where my energy will matter",
    },
    arc: {
      short: "moving from scattered overwhelm to the stillness that reveals where I actually belong",
      expanded: "This gate begins in the inability to find the center, and opens into the quiet clarity that comes from learning to be still enough to see.",
      verb: "move from scattered overwhelm to the stillness that reveals where I actually belong",
      gerund: "moving from scattered overwhelm to the stillness that reveals where I actually belong",
    },
    storyParagraph: "Conditioned, Gate 52 either scatters attention in overwhelm or stalls in paralysis — unable to find the still point that would clarify where to focus. The high expression is the ability to step back, see the larger pattern, and know exactly where your energy will actually matter. Not all movement is progress. This gate understands the difference between focused, well-placed action and busy-ness that bears no fruit.",
  },
  53: {
    number: 53, traditionalName: "Starting Things", quantumName: "Starting",
    low: {
      short: "reacting to pressure to begin before it's right, or refusing to start from the trauma of past false starts",
      expanded: "Either a pattern of launching prematurely in response to pressure — and then reaping nothing from the effort — or a refusal to begin at all because previous ill-timed starts have left a residue of failure.",
      verb: "react to pressure to begin before it's right, or refuse to start from the trauma of past false starts",
      gerund: "reacting to pressure to begin before it's right, or refusing to start from the trauma of past false starts",
    },
    high: {
      short: "sitting with inspiration until it's ready, then initiating with trust in how it will unfold",
      expanded: "The ability to sense when an idea is genuinely ready to be launched — and to begin from that resonance with confidence, trusting that what is initiated at the right moment carries its own momentum.",
      verb: "sit with inspiration until it's ready, then initiate with trust in how it will unfold",
      gerund: "sitting with inspiration until it's ready, then initiating with trust in how it will unfold",
    },
    arc: {
      short: "moving from pressure-driven starts to initiating from genuine readiness and trust",
      expanded: "This gate begins in the anxiety around beginning — either too much urgency or too much fear — and opens into the calm discernment of knowing when something is genuinely ready to move.",
      verb: "move from pressure-driven starts to initiating from genuine readiness and trust",
      gerund: "moving from pressure-driven starts to initiating from genuine readiness and trust",
    },
    storyParagraph: "Gate 53 conditioned reacts to the pressure to begin — either starting everything impulsively (and reaping nothing) or refusing to start at all because past premature launches left wounds. The high expression is attuned beginning: sitting with an inspiration until you understand what it wants, then initiating it with trust in how it will unfold. You're here to launch things — but from resonance, not pressure. The right start carries its own momentum.",
  },
  54: {
    number: 54, traditionalName: "Drive", quantumName: "Divine Inspiration",
    low: {
      short: "forcing inspiration into form through will, pushing ideas that aren't mine to build or don't have their timing",
      expanded: "A compulsion to take every incoming inspiration and push it into manifestation — even when the idea isn't yours to build, or when the timing isn't aligned — resulting in exhaustion and diminished results.",
      verb: "force inspiration into form through will, pushing ideas that aren't mine to build or don't have their timing",
      gerund: "forcing inspiration into form through will, pushing ideas that aren't mine to build or don't have their timing",
    },
    high: {
      short: "cultivating a relationship with the creative muse and stewarding inspiration with patience and preparation",
      expanded: "An ability to tend inspiration gently — building the energetic and practical foundations for it, honoring the muse without forcing, and trusting that stewardship of an idea is itself a form of service. Not all inspiration is yours to execute, but all of it deserves to be honored.",
      verb: "cultivate a relationship with the creative muse and steward inspiration with patience and preparation",
      gerund: "cultivating a relationship with the creative muse and stewarding inspiration with patience and preparation",
    },
    arc: {
      short: "moving from forcing every inspiration into form to serving as a patient, discerning steward",
      expanded: "This gate begins in the exhaustion of trying to build everything that arrives, and opens into the ease of knowing which inspirations are yours to carry and which are yours to pass along.",
      verb: "move from forcing every inspiration into form to serving as a patient, discerning steward",
      gerund: "moving from forcing every inspiration into form to serving as a patient, discerning steward",
    },
    storyParagraph: "When conditioned, Gate 54 forces inspiration into form through sheer will — pushing hard on ideas that may not even be yours to manifest, or that haven't reached their right moment. The high expression cultivates a genuine relationship with the creative muse — holding inspiration gently, building the energetic and practical foundations for it, and trusting that stewardship of an idea is its own form of service. Not every inspiration is yours to build, but all of them deserve to be honored.",
  },
  55: {
    number: 55, traditionalName: "Spirit", quantumName: "Faith",
    low: {
      short: "operating from scarcity and fear, hoarding, indecision, creating through willpower rather than trust",
      expanded: "A pattern of clinging to what you have out of fear there won't be enough — withholding, indecision, and a reliance on personal will to create what aligned faith might otherwise attract.",
      verb: "operate from scarcity and fear, hoarding, and creating through willpower rather than trust",
      gerund: "operating from scarcity and fear, hoarding, and creating through willpower rather than trust",
    },
    high: {
      short: "holding the emotional frequency of a vision with enough faith to create without clinging or controlling",
      expanded: "An ability to sustain the emotional alignment of a creative vision even in the absence of visible proof — trusting in sufficiency so deeply that creation happens without the constraint of what you can currently see.",
      verb: "hold the emotional frequency of a vision with enough faith to create without clinging or controlling",
      gerund: "holding the emotional frequency of a vision with enough faith to create without clinging or controlling",
    },
    arc: {
      short: "moving from creating from fear and scarcity to trusting that faith itself is a generative force",
      expanded: "This gate begins in the tightness of scarcity, and opens into the discovery that a mind and heart held in genuine trust can create in ways that force never could.",
      verb: "move from creating from fear and scarcity to trusting that faith itself is a generative force",
      gerund: "moving from creating from fear and scarcity to trusting that faith itself is a generative force",
    },
    storyParagraph: "Gate 55 conditioned operates from scarcity — hoarding, indecision, not trusting that there's enough, trying to create through willpower because trusting Source feels too risky. The high expression holds the emotional frequency of a vision even in the absence of visible proof. When you trust in sufficiency deeply enough to create without clinging or controlling, you unlock a creative capacity that isn't limited by what you can currently see. Faith, in this gate, is a generative force.",
  },
  56: {
    number: 56, traditionalName: "The Storyteller", quantumName: "Expansion",
    low: {
      short: "telling contracting stories that keep myself and others stuck in what hasn't worked",
      expanded: "A use of narrative that depletes rather than expands — stories that confirm limitation, reinforce what's impossible, and drain the energy of everyone who hears them.",
      verb: "tell contracting stories that keep myself and others stuck in what hasn't worked",
      gerund: "telling contracting stories that keep myself and others stuck in what hasn't worked",
    },
    high: {
      short: "sharing stories and inspirations that open possibility-oriented thinking and activate creative energy in others",
      expanded: "A mastery of expansive narrative — stories and insights that orient people toward what might be possible, shift their emotional frequency upward, and generate the kind of momentum that actually creates change.",
      verb: "share stories and inspirations that open possibility-oriented thinking and activate creative energy in others",
      gerund: "sharing stories and inspirations that open possibility-oriented thinking and activating creative energy in others",
    },
    arc: {
      short: "moving from stories that confirm limitation to stories that open what's possible",
      expanded: "This gate begins in the habit of the contracting narrative, and opens into the discovery that the same storytelling gift used to limit can be redirected to liberate.",
      verb: "move from stories that confirm limitation to stories that open what's possible",
      gerund: "moving from stories that confirm limitation to stories that open what's possible",
    },
    storyParagraph: "Gate 56 conditioned tells contracting stories — narratives that limit, deplete, or keep both teller and listener stuck in what hasn't worked. The high expression knows that stories are one of the most powerful tools for shifting how people feel and what they believe is possible. When you choose expansive narratives — ones that orient toward potential rather than problem — you activate something in others that genuinely moves them toward growth.",
  },
  57: {
    number: 57, traditionalName: "Intuition", quantumName: "Instinct",
    low: {
      short: "paralyzed by fear of the future, unable to trust myself or follow through on what I know needs to happen",
      expanded: "A pattern of knowing what needs to be prepared, what action needs to be taken, what the future is signaling — and failing to act on it because fear or self-doubt overrides the instinct.",
      verb: "feel paralyzed by fear of the future, unable to trust myself or follow through on what I know needs to happen",
      gerund: "feeling paralyzed by fear of the future, unable to trust myself or follow through on what I know needs to happen",
    },
    high: {
      short: "trusting my own instinct about timing and following through on what I know needs to be made ready",
      expanded: "A finely tuned sense of when the timing is right, what needs to be prepared before it arrives, and when to move. This isn't certainty — it's a living relationship with inner guidance that you've learned to follow.",
      verb: "trust my own instinct about timing and follow through on what I know needs to be made ready",
      gerund: "trusting my own instinct about timing and following through on what I know needs to be made ready",
    },
    arc: {
      short: "moving from paralysis around the future to trusting the instinct that's always been trying to guide me",
      expanded: "This gate begins in the gap between knowing and acting, and opens into the embodied trust that following your instinct — before the full logic is clear — is the real intelligence.",
      verb: "move from paralysis around the future to trusting the instinct that's always been trying to guide me",
      gerund: "moving from paralysis around the future to trusting the instinct that's always been trying to guide me",
    },
    storyParagraph: "When conditioned, Gate 57 is paralyzed by the future — too afraid to trust itself, knowing what needs to be done but failing to act on it. The high expression is a finely tuned instinct: a clear sense of when the timing is right, what needs to be prepared, and when to move. This isn't about being certain; it's about following through on inner guidance before you've fully rationalized why. The instinct is the knowing. Trust it.",
  },
  58: {
    number: 58, traditionalName: "Joy", quantumName: "Joy",
    low: {
      short: "denying joy, avoiding mastery, feeling guilty or ashamed about doing what I love",
      expanded: "A disconnection from the pleasure of genuine mastery — whether through guilt, shame, self-denial, or the belief that joy in one's own work is self-indulgent or undeserved.",
      verb: "deny joy, avoid mastery, feeling guilty or ashamed about doing what I love",
      gerund: "denying joy, avoiding mastery, feeling guilty or ashamed about doing what I love",
    },
    high: {
      short: "living in the flow of joy that comes from committing to genuine mastery of what I love",
      expanded: "A practice of refining your gifts — not for performance or external recognition, but because the deepening itself is satisfying. When you commit to this, you enter a state of flow that sustains and fuels everything else.",
      verb: "live in the flow of joy that comes from committing to genuine mastery of what I love",
      gerund: "living in the flow of joy that comes from committing to genuine mastery of what I love",
    },
    arc: {
      short: "moving from denying joy to inhabiting it as a daily practice and source of real creative fuel",
      expanded: "This gate begins in the shame or suppression of doing what you love, and opens into the discovery that joy in mastery is not a luxury — it is the engine.",
      verb: "move from denying joy to inhabiting it as a daily practice and source of real creative fuel",
      gerund: "moving from denying joy to inhabiting it as a daily practice and source of real creative fuel",
    },
    storyParagraph: "Gate 58 conditioned avoids joy — through guilt, through disbelief, through avoiding the practice of mastery because pleasure feels undeserved. The high expression is simple but profound: the joy that comes from genuine mastery. When you commit to refining your gifts — not for performance, but because the deepening itself is satisfying — you live in a state of flow that feeds everything else. Joy here isn't a reward; it's the practice.",
  },
  59: {
    number: 59, traditionalName: "Sexuality", quantumName: "Sustainability",
    low: {
      short: "fighting to survive, forcing agreements, crafting relationships from scarcity rather than sufficiency",
      expanded: "A pattern of relating and creating from fear — forcing partnerships and agreements that are unsustainable because they are built on the belief that there isn't enough and you have to take what you can get.",
      verb: "fight to survive, force agreements, and craft relationships from scarcity rather than sufficiency",
      gerund: "fighting to survive, forcing agreements, and crafting relationships from scarcity rather than sufficiency",
    },
    high: {
      short: "building partnerships and agreements from trust and sufficiency, knowing abundance is meant to be shared",
      expanded: "A capacity to create genuinely sustainable relationships and foundations — partnerships that hold because they are built on real alignment rather than need, and agreements that work because both parties are genuinely served.",
      verb: "build partnerships and agreements from trust and sufficiency, knowing abundance is meant to be shared",
      gerund: "building partnerships and agreements from trust and sufficiency, knowing abundance is meant to be shared",
    },
    arc: {
      short: "moving from creating from fear of lack to building from a foundation of genuine sufficiency",
      expanded: "This gate begins in the survival-mode of scarcity relating, and opens into the ease and richness of creating from a place where there is genuinely enough.",
      verb: "move from creating from fear of lack to building from a foundation of genuine sufficiency",
      gerund: "moving from creating from fear of lack to building from a foundation of genuine sufficiency",
    },
    storyParagraph: "Gate 59 conditioned fights to survive — forcing agreements, penetrating others' boundaries, crafting relationships from scarcity rather than sufficiency. The high expression creates from trust: knowing that abundance is meant to be shared, and building partnerships and agreements that genuinely sustain everyone involved. When you stop fighting for resources and start building sustainable foundations with the right people, the quality of what you create changes entirely.",
  },
  60: {
    number: 60, traditionalName: "Acceptance", quantumName: "Conservation",
    low: {
      short: "resisting change, holding to what's familiar, letting disruption create rigidity rather than adaptation",
      expanded: "A tendency to cling to what is known — fighting transformation, refusing what wants to evolve, letting the overwhelm of change generate paralysis or reactivity rather than orientation toward what's being conserved.",
      verb: "resist change, hold to what's familiar, let disruption create rigidity rather than adaptation",
      gerund: "resisting change, holding to what's familiar, letting disruption create rigidity rather than adaptation",
    },
    high: {
      short: "finding what's working inside the change and staying curious about what's being built through disruption",
      expanded: "An optimism that doesn't deny difficulty but stays oriented toward what's being conserved, carried forward, and created through the transformation. A capacity to move through change gracefully because you're looking for what's emerging rather than mourning what's ending.",
      verb: "find what's working inside the change and stay curious about what's being built through disruption",
      gerund: "finding what's working inside the change and staying curious about what's being built through disruption",
    },
    arc: {
      short: "moving from resisting change to staying curious about what transformation is building",
      expanded: "This gate begins in the grip of the familiar, and opens into the trust that even structural disruption is conserving something essential — and that finding that thread is the work.",
      verb: "move from resisting change to staying curious about what transformation is building",
      gerund: "moving from resisting change to staying curious about what transformation is building",
    },
    storyParagraph: "Gate 60 conditioned resists change — holding to what's familiar, fighting transformation, letting disruption create rigidity instead of adaptation. The evolution is optimism: the ability to find what's working inside the change, to focus on what's being conserved and carried forward rather than what's being lost. You don't have to force anything. When you stay curious about what's being built through the disruption, you become someone who knows how to move through transformation gracefully.",
  },
  61: {
    number: 61, traditionalName: "Mystery", quantumName: "Wonder",
    low: {
      short: "needing to know why, becoming bitter or victimized when no answer comes",
      expanded: "A compulsion to explain, justify, or find the cause of everything — and when understanding doesn't arrive, a slide into bitterness, rationalization, or victimhood that uses the unanswered question as evidence of cosmic injustice.",
      verb: "need to know why and become bitter or victimized when no answer comes",
      gerund: "needing to know why and becoming bitter or victimized when no answer comes",
    },
    high: {
      short: "staying in a state of genuine wonder, using curiosity as a creative force rather than a source of anxiety",
      expanded: "An ability to hold the mystery — to stay innocent, open, and creatively alive in the face of what can't be fully known. Wonder as a sustaining force for powerful, ongoing creativity.",
      verb: "stay in a state of genuine wonder, using curiosity as a creative force rather than a source of anxiety",
      gerund: "staying in a state of genuine wonder, using curiosity as a creative force rather than a source of anxiety",
    },
    arc: {
      short: "moving from the need to know why to the freedom of genuine curiosity",
      expanded: "This gate begins in the pressure to have the answer, and opens into the discovery that not-knowing, held lightly, is one of the most generative states available.",
      verb: "move from the need to know why to the freedom of genuine curiosity",
      gerund: "moving from the need to know why to the freedom of genuine curiosity",
    },
    storyParagraph: "When conditioned, Gate 61 needs to know why — and when no answer comes, it can tip into bitterness or victimhood, constructing elaborate rationalizations to fill the gap. The high expression stays in a state of genuine wonder: the ability to hold the not-knowing with curiosity rather than anxiety. When you stay innocent enough to be surprised by life, your creativity stays alive. The mystery isn't a problem to solve; it's the thing that keeps you reaching.",
  },
  62: {
    number: 62, traditionalName: "Details", quantumName: "Preparation",
    low: {
      short: "over-preparing from anxiety, letting the plan override the actual flow of things",
      expanded: "A tendency to use preparation as a form of control — building plans so detailed and thorough that they become a substitute for genuine engagement with how things are actually unfolding.",
      verb: "over-prepare from anxiety, letting the plan override the actual flow of things",
      gerund: "over-preparing from anxiety, letting the plan override the actual flow of things",
    },
    high: {
      short: "knowing what's genuinely necessary and trusting that alignment will provide the rest when I need it",
      expanded: "A calibrated readiness — attuned to what is actually needed and trusting that when you are aligned, the right information and resources will arrive at the right time. Preparation serves the moment rather than trying to account for every contingency.",
      verb: "know what's genuinely necessary and trust that alignment will provide the rest when I need it",
      gerund: "knowing what's genuinely necessary and trusting that alignment will provide the rest when I need it",
    },
    arc: {
      short: "moving from anxious over-preparation to a grounded trust in aligned readiness",
      expanded: "This gate begins in the compulsion to plan away uncertainty, and opens into the ease of knowing that prepared and controlling are not the same thing.",
      verb: "move from anxious over-preparation to a grounded trust in aligned readiness",
      gerund: "moving from anxious over-preparation to a grounded trust in aligned readiness",
    },
    storyParagraph: "Gate 62 conditioned over-prepares out of anxiety — creating such thorough plans that the plan overrides the actual flow, and the energy goes into managing the map rather than walking the territory. The high expression knows what's genuinely necessary and trusts that when you're aligned, the right information will come when you need it. Preparation serves the moment; it doesn't need to account for every contingency in advance.",
  },
  63: {
    number: 63, traditionalName: "Doubt", quantumName: "Curiosity",
    low: {
      short: "spiraling in self-doubt, suspicious and uncertain, questioning without arriving anywhere generative",
      expanded: "A mental loop of doubt that undermines existing structures without building new ones — questioning that destabilizes rather than opens, producing suspicion rather than creative inquiry.",
      verb: "spiral in self-doubt, suspicious and uncertain, questioning without arriving anywhere generative",
      gerund: "spiraling in self-doubt, suspicious and uncertain, questioning without arriving anywhere generative",
    },
    high: {
      short: "using curiosity and questioning as a force that opens new potentials and invites bigger thinking",
      expanded: "An ability to take the same questioning energy that could spiral into doubt and redirect it toward possibility — asking what could be, what might work, what else is available. Curiosity as a doorway rather than a trap.",
      verb: "use curiosity and questioning as a force that opens new potentials and invites bigger thinking",
      gerund: "using curiosity and questioning as a force that opens new potentials and inviting bigger thinking",
    },
    arc: {
      short: "moving from doubt that contracts to curiosity that expands",
      expanded: "This gate begins in the anxiety of questions without answers, and opens into the discovery that the same questioning mind can be oriented toward wonder rather than worry.",
      verb: "move from doubt that contracts to curiosity that expands",
      gerund: "moving from doubt that contracts to curiosity that expands",
    },
    storyParagraph: "Conditioned, Gate 63 spirals in self-doubt — suspicious, unable to settle on certainty, questioning without arriving anywhere generative. The high expression takes that same questioning and turns it toward possibility: using curiosity as a creative force that opens new potentials rather than undermining existing ones. Doubt can be a doorway. When you treat your questions as invitations to imagine something new, the mind of Gate 63 becomes genuinely visionary.",
  },
  64: {
    number: 64, traditionalName: "Confusion", quantumName: "Divine Transference",
    low: {
      short: "pressuring myself to manifest big ideas, despairing when I can't figure out how to make them real",
      expanded: "An exhausting mental loop of receiving large, visionary ideas and then straining to figure out how to implement them — collapsing in despair or inadequacy when the mechanism doesn't reveal itself.",
      verb: "pressure myself to manifest big ideas and despair when I can't figure out how to make them real",
      gerund: "pressuring myself to manifest big ideas and despairing when I can't figure out how to make them real",
    },
    high: {
      short: "receiving big ideas with openness, dreaming into them, and trusting I'll know my role if they're mine to carry",
      expanded: "An understanding that your relationship with a big idea may be to hold it — to give it your imagination, dream it fully, and trust that if it is yours to build, the how will become clear. Not every idea that moves through you is yours to execute; some you are simply here to carry until the right moment or person arrives.",
      verb: "receive big ideas with openness, dream into them, and trust I'll know my role if they're mine to carry",
      gerund: "receiving big ideas with openness, dreaming into them, and trusting I'll know my role if they're mine to carry",
    },
    arc: {
      short: "moving from straining to manifest every vision to trusting my role as a receiver and dreamer of what wants to come through",
      expanded: "This gate begins in the pressure to be the one who makes it happen, and opens into the spacious recognition that holding a vision with care and imagination is itself a form of service — and sometimes the most important one.",
      verb: "move from straining to manifest every vision to trusting my role as a receiver and dreamer of what wants to come through",
      gerund: "moving from straining to manifest every vision to trusting my role as a receiver and dreamer of what wants to come through",
    },
    storyParagraph: "Gate 64 conditioned feels the mental pressure to manifest big ideas and despairs when it can't figure out how. There's an exhausting loop of imagining and straining to implement. The high expression understands that your role with a big idea may be to hold it — to give it your imagination, dream into it, and trust that the how will become clear if it's yours to build. Not every idea that moves through you is yours to execute; some you're simply here to carry until the right moment or person arrives.",
  },
};

export type GateBand = "low" | "high" | "arc";
export type GateField = "short" | "expanded" | "verb" | "gerund";

export function getGateExpression(
  gate: number,
  band: GateBand,
  field: GateField,
): string {
  return GATES[gate]?.[band]?.[field] ?? "";
}

export function getGateName(num: number | null | undefined): string {
  if (!num) return "___";
  return GATES[num]?.quantumName ?? `Gate ${num}`;
}
