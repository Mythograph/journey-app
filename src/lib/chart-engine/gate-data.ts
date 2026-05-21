export interface GateExpression {
  short: string;
  expanded: string;
}

export interface GateData {
  low: GateExpression;
  high: GateExpression;
  arc: GateExpression;
}

export const GATE_DATA: Record<number, GateData> = {
  1: {
    low: {
      short: "an erratic or purposeless life, hiding because the calling feels too big to claim",
      expanded: "A pattern of anxiety and self-doubt around life purpose, often hiding or deflecting the calling because it feels too large, too presumptuous, or impossible to fulfill.",
    },
    high: {
      short: "a clear knowing of who I am and a deep, steady connection to my purpose",
      expanded: "An innate orientation toward authentic self-knowledge that functions as a compass. Purpose stops being a burden and becomes a reliable internal anchor.",
    },
    arc: {
      short: "moving from hiding the calling to living from it as a natural expression of who I am",
      expanded: "This gate begins in the fear that purpose is something to perform or prove, and matures into a quiet, steady knowing of self that needs no justification.",
    },
  },
  2: {
    low: {
      short: "fierce self-sufficiency, burning out rather than trusting I'm supported",
      expanded: "A pattern of refusing help, pushing past limits, and operating as if trusting in support would be naive or weak. The drive toward total self-reliance becomes its own kind of depletion.",
    },
    high: {
      short: "a trust that I am supported in being exactly who I am, even when I can't see how",
      expanded: "The ability to set intentions and move toward them in a state of genuine trust — that the right resources, relationships, and conditions will arrive. Living in gratitude rather than scarcity.",
    },
    arc: {
      short: "moving from exhausted self-sufficiency into the ease of trusting what's already flowing toward me",
      expanded: "This gate begins in the belief that I have to do everything alone, and opens into the understanding that receiving support is not weakness — it is the natural consequence of alignment.",
    },
  },
  3: {
    low: {
      short: "pressure to share ideas before they're ready, burning out against timing I can't force",
      expanded: "A compulsion to get new things out into the world immediately, often exhausting the idea before it has a chance to root. The innovation arrives before its moment, and loses traction.",
    },
    high: {
      short: "the patience to cultivate ideas until the timing is right, trusting that my moment will come",
      expanded: "An ability to sit with innovation quietly, let it mature, and trust that the leading edge of what you carry will land when conditions are aligned. Patience becomes a creative practice.",
    },
    arc: {
      short: "moving from frantic urgency to trusting the timing of what I'm here to bring",
      expanded: "This gate begins in the pressure to prove the new idea right now, and opens into a relaxed confidence that what is genuinely innovative doesn't need to be forced — it needs to be ready.",
    },
  },
  4: {
    low: {
      short: "self-doubt around ideas I can't fully figure out, pressure to implement before the seed is ready",
      expanded: "A tendency to doubt ideas that feel half-formed, pushing toward implementation before the imagination has had time to generate the emotional response that makes attraction possible.",
    },
    high: {
      short: "the ability to hold an idea as a possibility and let it seed the imagination until it draws what it needs",
      expanded: "Treating ideas as seeds rather than problems. Letting an idea live in the imagination long enough to generate an emotional response, which then calibrates the heart and attracts the right experiences.",
    },
    arc: {
      short: "moving from needing to solve the idea immediately to trusting it as a seed that wants to grow",
      expanded: "This gate begins in the anxiety of the half-formed idea, and opens into the understanding that imagination — not logic — is what makes a possibility real.",
    },
  },
  5: {
    low: {
      short: "constant struggle to stay consistent, feeling out of sync with what a successful life is supposed to look like",
      expanded: "Habits fall apart, routines collapse, and there's a persistent sense of failing to match some external standard of how a well-functioning life is supposed to run.",
    },
    high: {
      short: "the ability to build habits that feel like genuine expressions of who I am, without forcing alignment",
      expanded: "Consistency that comes from alignment rather than willpower — routines that are actually expressions of the authentic self, easy to maintain because they belong to you.",
    },
    arc: {
      short: "moving from forcing consistency to building rhythms that are genuinely mine",
      expanded: "This gate begins in the exhausting struggle against external standards of productivity, and opens into the discovery that alignment creates its own sustainable rhythm.",
    },
  },
  6: {
    low: {
      short: "emotional reactivity, invisibility, and doing whatever it takes to be seen or resourced",
      expanded: "Desperation to be seen and heard, emotional reactivity from a sense of lack, and a willingness to take energy or resources by whatever means available. Fear of never mattering.",
    },
    high: {
      short: "maintaining an emotional frequency that creates peace, equity, and genuine influence",
      expanded: "An ability to hold a high-frequency emotional state that shapes the environment — generating peace, equity, and sustainable relating. Influence through alignment rather than force.",
    },
    arc: {
      short: "moving from fighting to be seen to becoming an anchor of peace that others orient around",
      expanded: "This gate begins in the fear of invisibility, and opens into the discovery that emotional alignment creates a kind of presence that influences without effort.",
    },
  },
  7: {
    low: {
      short: "pushing for visible leadership, struggling to be recognized as the one in charge",
      expanded: "A compulsion to seize or perform leadership as a form of validation, often exhausting the energy available for actual purpose. The need to be the figurehead overrides the capacity to lead effectively.",
    },
    high: {
      short: "understanding that real influence often works through collaboration rather than the front of the room",
      expanded: "A recognition that power often runs deeper through supporting and shaping leadership than competing for it. The ability to unify people around an idea and influence the direction others take.",
    },
    arc: {
      short: "moving from needing to be the visible leader to trusting the influence I carry in any position",
      expanded: "This gate begins in the grasping for recognition, and opens into the quiet confidence that leadership isn't always about being in front — sometimes the most powerful position is behind.",
    },
  },
  8: {
    low: {
      short: "believing purpose is something I have to perform or do rather than something I already am",
      expanded: "A tendency to think of life purpose as a role to execute — a model to perform, a service to deliver — which leads to trying to be someone you're not in order to seem useful.",
    },
    high: {
      short: "the understanding that being fully, authentically myself is the contribution",
      expanded: "A recognition that authentic presence — simply being the full expression of yourself — is both the purpose and the gift. What inspires others is not your performance but your genuine self-expression.",
    },
    arc: {
      short: "moving from performing a purpose to inhabiting one",
      expanded: "This gate begins in the pressure to do the right thing and be the right kind of person, and opens into the embodied realization that who you actually are is the point.",
    },
  },
  9: {
    low: {
      short: "overwhelm from too many options, scattered attention, unable to see what connects",
      expanded: "Too many directions, too many details, a persistent sense of fragmentation. The inability to see the relationship between ideas and actions makes it hard to know where to begin.",
    },
    high: {
      short: "the ability to see the big picture and know exactly where to place my energy",
      expanded: "A gift for zooming out, perceiving the larger convergence, and identifying the exact point where focused energy will actually matter. Complexity becomes navigable.",
    },
    arc: {
      short: "moving from scattered overwhelm to clarity about where my energy belongs",
      expanded: "This gate begins in the fog of too many options, and opens into a clear, orienting perspective on where convergence wants to happen.",
    },
  },
  10: {
    low: {
      short: "questioning my own lovability, settling for less, and sometimes blaming others for my circumstances",
      expanded: "A pattern of proving worth, settling for less than what is deserved, and orienting toward victim consciousness. The absence of self-love creates a persistent need for external validation.",
    },
    high: {
      short: "self-love as the foundation and source of creative power rather than something I have to earn",
      expanded: "The recognition that love for yourself is not a reward — it is the ground of everything. When self-love is the starting point rather than the goal, what you build from there carries a fundamentally different quality.",
    },
    arc: {
      short: "moving from needing to prove my worth to knowing love as my foundation",
      expanded: "This gate begins in the exhausting work of proving lovability, and opens into the quiet certainty that love is not contingent — it is structural.",
    },
  },
  11: {
    low: {
      short: "trying to manifest every idea that passes through me, exhausting myself as a builder of everything",
      expanded: "A frantic compulsion to turn every incoming idea into a project, forgetting that not every idea that moves through you is yours to build. The vessel becomes overloaded.",
    },
    high: {
      short: "the ability to hold and steward ideas until the right moment or person arrives to carry them",
      expanded: "A recognition that you are a vessel for ideas, not necessarily a builder of all of them. The gift is in holding inspiration gently, protecting it, and knowing when to transmit and to whom.",
    },
    arc: {
      short: "moving from forcing every idea into form to trusting my role as a steward of inspiration",
      expanded: "This gate begins in the exhaustion of trying to build everything, and opens into the ease of knowing that some ideas pass through you on their way to somewhere else.",
    },
  },
  12: {
    low: {
      short: "paralysis from caution or forcing words before they're ready",
      expanded: "A pattern of either stalling out because hesitancy has hardened into paralysis, or rushing to speak before the moment is aligned. Both distort the real power of this voice.",
    },
    high: {
      short: "the trust that when the timing is right, my voice carries genuine transformative weight",
      expanded: "An understanding that this voice is a vehicle for transformation — and that articulation coming at the right moment carries real power to change how people think. Waiting for fluency is wisdom, not weakness.",
    },
    arc: {
      short: "moving from forcing or silencing my voice to trusting the timing of its impact",
      expanded: "This gate begins in the tension between speaking too soon and staying too silent, and opens into a calibrated trust in the relationship between timing and transmission.",
    },
  },
  13: {
    low: {
      short: "staying trapped in old stories, replaying past pain, unable to move the narrative forward",
      expanded: "A tendency to carry old wounds as a fixed identity, returning to the same narrative loops rather than composting experience into something generative.",
    },
    high: {
      short: "using the power of personal narrative to consciously create and transform",
      expanded: "A rare ability to craft language that shifts how people perceive themselves and their lives. This power begins with the stories you choose to tell about your own experience, and radiates outward.",
    },
    arc: {
      short: "moving from being stuck in the old story to becoming a conscious narrator of my own becoming",
      expanded: "This gate begins in the grip of the wound-story, and opens into the realization that narrative is not just what happened — it is what you make of what happened.",
    },
  },
  14: {
    low: {
      short: "fear and compromise around resources, doing whatever work I have to do just to survive",
      expanded: "A scarcity-driven relationship with money and work — compromising on true purpose in order to maintain material stability, letting anxiety about resources drive choices.",
    },
    high: {
      short: "working from alignment with my heart, trusting that support follows genuine purpose",
      expanded: "A complete reframing of what work is for. Not labor for material gain, but contribution from the heart — and the discovery that when you work from that place, resources follow. Support flows from alignment.",
    },
    arc: {
      short: "moving from working out of fear to creating from genuine alignment",
      expanded: "This gate begins in the fear that doing the real work won't sustain you, and opens into the lived experience that it does — that alignment and material support are not in conflict.",
    },
  },
  15: {
    low: {
      short: "judging myself for rhythms that don't match conventional expectations, forcing my waves into a linear schedule",
      expanded: "Self-judgment and friction from trying to fit natural waves of creative energy into a daily structure that doesn't belong to you. The failure to match conventional productivity standards becomes evidence of personal failure.",
    },
    high: {
      short: "trusting my own rhythm, knowing that cycles and extremes are part of how I create and renew",
      expanded: "An ability to honor your own flow — to work within natural parameters when it feels right, rest without guilt in between, and recognize that disruption to old rhythms is itself a form of creative work.",
    },
    arc: {
      short: "moving from judging my rhythms to trusting them as the shape of my contribution",
      expanded: "This gate begins in the shame of not fitting the expected schedule, and opens into the understanding that your particular rhythm is not a deficit — it's the form your contribution takes.",
    },
  },
  16: {
    low: {
      short: "leaping without enough preparation, or holding back because others say I'm not ready",
      expanded: "Either a pattern of enthusiastic action before the ground is stable, or unnecessary restraint because external voices override your own sense of readiness. Both distort the energy.",
    },
    high: {
      short: "the courage to trust my own timing and move when it feels right, even without a full map",
      expanded: "A faith in your own intuition about when the timing is right — a willingness to step forward when something in you says yes, even without certainty about exactly how the path will unfold.",
    },
    arc: {
      short: "moving from self-doubt about readiness to trusting my own intuition about when to move",
      expanded: "This gate begins in the oscillation between reckless leaping and unnecessary restraint, and opens into a clear, felt sense of when you are genuinely ready enough.",
    },
  },
  17: {
    low: {
      short: "sharing opinions as facts, creating narratives filled with doubt that limit what feels possible",
      expanded: "A pattern of treating opinions as certainties, building collective narratives of doubt and limitation, and using mental energy to contract rather than expand what seems possible.",
    },
    high: {
      short: "using my mind to explore potentials and invite others to think bigger",
      expanded: "A capacity to orient mental energy toward possibility — generating thoughts that stretch what people believe is available to them, inspiring expansive imagination rather than confirming limitation.",
    },
    arc: {
      short: "moving from contracting narratives to thoughts that open new terrain",
      expanded: "This gate begins in the conviction that opinions are truth, and opens into the discovery that the same mental power used to constrain can be redirected toward expansion.",
    },
  },
  18: {
    low: {
      short: "criticizing without care for impact, more focused on being right than on whether it serves",
      expanded: "A compulsion to correct that prioritizes personal rightness over genuine contribution. Insight shared without regard for timing, relationship, or whether it actually adds to joy in the world.",
    },
    high: {
      short: "seeing what needs to shift and waiting for the right moment to serve re-alignment",
      expanded: "An ability to perceive misalignment clearly and hold the correction until the timing and circumstances allow it to land in service of joy rather than ego. Discernment over judgment.",
    },
    arc: {
      short: "moving from needing to be right to offering correction in service of something larger",
      expanded: "This gate begins in the compulsion to correct, and opens into the wisdom of knowing when — and whether — to speak.",
    },
  },
  19: {
    low: {
      short: "shutting down from overwhelm, or becoming clingy as a way of forcing the connection I need",
      expanded: "Emotional sensitivity that either collapses inward as shutdown or reaches outward as clinginess — both responses to the intensity of wanting genuine connection and belonging.",
    },
    high: {
      short: "sensing the emotional needs of others and knowing how to bring things back into alignment",
      expanded: "A capacity to read the emotional field of a person, relationship, or community — and to know, intuitively, what is needed to restore genuine connection and sustain heart-to-heart intimacy.",
    },
    arc: {
      short: "moving from overwhelm by sensitivity to working with it as a gift of attunement",
      expanded: "This gate begins in the pain of being too sensitive for the room, and opens into the discovery that the same sensitivity is the gift of knowing what others need before they can name it.",
    },
  },
  20: {
    low: {
      short: "acting before the timing is right, feeling pressure to move before I'm ready",
      expanded: "An urgency that pushes toward action before the conditions are aligned, leading to frustration, false starts, or quitting — not from lack of capacity, but from mistiming.",
    },
    high: {
      short: "trusting the preparation phase, knowing what needs to be in place before the moment arrives",
      expanded: "A deep intuition for what needs to be built, gathered, learned, or set in place before the right timing unfolds. Patience here is not passivity — it is active readiness.",
    },
    arc: {
      short: "moving from pressure to act prematurely to trusting the preparation that makes action real",
      expanded: "This gate begins in the frustration of feeling like timing is an obstacle, and opens into the understanding that preparation is itself the work — and that when you are truly ready, the moment arrives.",
    },
  },
  21: {
    low: {
      short: "controlling people, resources, and circumstances from a fear of not being worthy of support",
      expanded: "An attempt to maintain safety through control — of environments, resources, people — rooted in a deep-seated fear that without vigilance, support will disappear.",
    },
    high: {
      short: "regulating my inner and outer environment in ways that reflect and sustain my true value",
      expanded: "An ability to maintain the conditions — emotional, energetic, relational, material — that allow you to function at your genuine level of capacity. Generosity toward yourself, and boundaries that protect it.",
    },
    arc: {
      short: "moving from controlling out of fear to regulating from a place of knowing my own worth",
      expanded: "This gate begins in the grip of control, and opens into the spacious clarity of knowing what you need in order to remain sustainable — and claiming it.",
    },
  },
  22: {
    low: {
      short: "stifling passion from the fear I can't afford to pursue it, settling and compromising",
      expanded: "A shutting down of creative and passionate energy because of the belief that following what you love is not materially possible. Despair becomes the regulator of what gets created.",
    },
    high: {
      short: "the grace to pursue my passion and contribution knowing I am fully supported in doing so",
      expanded: "A deep trust in the universal flow of support — the willingness to follow passion and purpose without waiting for proof that the resources will arrive. Surrender here is not defeat; it is the act of trusting the flow.",
    },
    arc: {
      short: "moving from suppressing my passion to letting it carry me toward what I'm actually here to make",
      expanded: "This gate begins in the compromise born of fear, and opens into the liberating recognition that support follows genuine pursuit — not the other way around.",
    },
  },
  23: {
    low: {
      short: "desperate to be understood, sharing insights with people who aren't ready, feeling alone with my knowing",
      expanded: "A compulsion to transmit what you understand before people are ready to receive it — followed by despair or bitterness at the gap between your knowing and others' comprehension.",
    },
    high: {
      short: "translating transformative insight with the right timing and trust in my own knowing",
      expanded: "The ability to take what you understand — sometimes far ahead of the collective — and translate it in ways that actually land. Knowing when to share is as important as knowing what to share.",
    },
    arc: {
      short: "moving from the loneliness of knowing too much to the confidence of transmitting at the right moment",
      expanded: "This gate begins in the isolation of insight that can't yet be received, and opens into the mastery of knowing when and how your understanding will actually shift someone.",
    },
  },
  24: {
    low: {
      short: "using rationalization to stay safe inside old patterns, resisting what wants to grow",
      expanded: "A tendency to construct logical justifications for remaining where you are — explaining away the invitation to transform, settling for less than what is possible.",
    },
    high: {
      short: "reframing every experience as a potential source of growth, finding the blessing in the whole story",
      expanded: "An ability to look at the complete arc of experience — including what was hard — and find what was learned, what grew, and what was ultimately liberating. Gratitude for the whole journey.",
    },
    arc: {
      short: "moving from rationalizing the status quo to finding genuine grace in what has been",
      expanded: "This gate begins in the habit of explaining why change isn't possible, and opens into the discovery that every experience — without exception — has been composting into wisdom.",
    },
  },
  25: {
    low: {
      short: "mistrust of something larger, using willpower instead of alignment, feeling unworthy of being loved by Source",
      expanded: "Operating from ego and personal strategy alone, cutting off from any sense of divine support, and using force to create what alignment might otherwise attract. A fundamental sense of being unsupported by the larger order.",
    },
    high: {
      short: "a consistent, devoted relationship with Source as the foundation for how I move through everything",
      expanded: "A practice of returning to alignment with something larger than the personal self — consistently, diligently — as the source of healing, purpose, and the capacity to serve others.",
    },
    arc: {
      short: "moving from relying on willpower alone to trusting something larger as the ground I stand on",
      expanded: "This gate begins in the isolation of feeling unsupported by the universe, and opens into the sustained practice of alignment that makes everything else possible.",
    },
  },
  26: {
    low: {
      short: "inflating worth as a mask for feeling unworthy, or shrinking in the face of past wounds",
      expanded: "Either overcompensating for insecurity with ego, performance, or control — or collapsing under old wounds and failing to claim what is genuinely yours. Both are distortions of the same energy.",
    },
    high: {
      short: "living in alignment across all dimensions — moral, energetic, physical, relational, financial — with trust in my own place",
      expanded: "A grounded, clear-eyed integrity that doesn't require performance. Acting as if you are precious, setting boundaries from that knowing, and doing the right thing even when it costs something.",
    },
    arc: {
      short: "moving from performing worth or hiding from it to embodying genuine integrity",
      expanded: "This gate begins in the oscillation between inflation and contraction, and opens into a settled, non-dramatic integrity that simply knows its own value.",
    },
  },
  27: {
    low: {
      short: "over-caretaking, guilt, martyrdom, giving from a place that depletes rather than serves",
      expanded: "A pattern of over-giving that is rooted in guilt or obligation rather than genuine care — caretaking that exhausts the self and enables others to avoid their own growth.",
    },
    high: {
      short: "supporting others from a full place, nurturing in ways that increase genuine self-sufficiency",
      expanded: "True nurturing that comes from abundance rather than depletion. The ability to lift others up in ways that encourage their own self-love and empowerment, rather than creating dependency.",
    },
    arc: {
      short: "moving from martyrdom to genuine care that sustains both the giver and the receiver",
      expanded: "This gate begins in the exhaustion of giving what you don't have, and opens into the discovery that the most nourishing thing you can offer comes from a full, not depleted, place.",
    },
  },
  28: {
    low: {
      short: "refusing the journey out of fear it will be too painful, or identifying so fully with struggle that failure feels inevitable",
      expanded: "A tendency to avoid the path because past difficulty has made struggle feel like proof of inadequacy — or to stay so entrenched in the struggle narrative that the meaning in it is invisible.",
    },
    high: {
      short: "turning challenge into a meaningful path of courage and contribution shared with others",
      expanded: "The understanding that your personal experience of perseverance — what you've tried, lost, endured, and kept going through — is precisely what gives others permission to believe something better is possible. Challenge deepens what you have to offer.",
    },
    arc: {
      short: "moving from struggle as identity to struggle as the ground of genuine meaning",
      expanded: "This gate begins in the fear that the hard path is proof something is wrong, and opens into the realization that the difficulty has been building something real all along.",
    },
  },
  29: {
    low: {
      short: "over-committing, burning out, unable to recognize when enough is enough",
      expanded: "Saying yes to everything, staying long past the natural end of things, and depleting the self through a compulsive devotion to completion — even when what's being completed no longer serves.",
    },
    high: {
      short: "the ability to commit fully to the right thing, and to know the difference by sensing genuine resonance",
      expanded: "A capacity to persevere in ways that genuinely change the direction of a life — yours and others' — because the commitment is real. Knowing what deserves your yes is the gift.",
    },
    arc: {
      short: "moving from indiscriminate over-commitment to a devotion that comes from genuine resonance",
      expanded: "This gate begins in the exhaustion of over-giving through obligation, and opens into the discovery that discernment about what you commit to is itself a form of devotion.",
    },
  },
  30: {
    low: {
      short: "burning out from intensity, misdirecting passion, leaping into chaos before the vision is stable",
      expanded: "Passion that arrives faster than the vision can sustain it — leaping into heat without enough ground, burning out, and abandoning what had potential before it could mature.",
    },
    high: {
      short: "sustaining a dream or vision long enough to bring it into form and inspire others to hold theirs",
      expanded: "An ability to hold the flame of a vision steady over time — tending it rather than exhausting it — until it becomes real. The capacity to inspire others not by the intensity of your passion but by its endurance.",
    },
    arc: {
      short: "moving from burning fast and collapsing to learning how to tend a vision over time",
      expanded: "This gate begins in the volatility of passion without container, and opens into the discipline of tending what you love long enough to let it fully arrive.",
    },
  },
  31: {
    low: {
      short: "pushing for leadership as personal validation, or shrinking from it without feeling worthy",
      expanded: "Either seizing the role of leader from a place of needing to be seen, or avoiding leadership entirely because it feels presumptuous. Both cut off the genuine capacity to lead.",
    },
    high: {
      short: "earning leadership by listening, and assuming it as a voice for the people I serve",
      expanded: "A leadership that is recognized rather than seized — rooted in genuine attentiveness to what the people around you need, and a willingness to hold the vision they can't always see themselves.",
    },
    arc: {
      short: "moving from grasping for or avoiding leadership to receiving it as a genuine calling",
      expanded: "This gate begins in the conflict between wanting to lead and feeling unworthy of it, and opens into a quiet confidence that real leadership is given, not taken — and that it flows from service.",
    },
  },
  32: {
    low: {
      short: "letting fear of failure prevent the preparation needed, or pushing too hard against the right timing",
      expanded: "Either avoiding the necessary groundwork because starting feels like too great a risk, or pushing relentlessly past the signals that timing isn't right and burning out in the process.",
    },
    high: {
      short: "a patient, thorough readiness that translates inspiration into an actual foundation",
      expanded: "An awareness of exactly what needs to be in place for a dream to become real — building that foundation quietly, steadily, and trusting that the timing will open when the stage is properly set.",
    },
    arc: {
      short: "moving from fear of failure into patient preparation that lets the right moment arrive",
      expanded: "This gate begins in the avoidance of preparation, and opens into the deep satisfaction of building something solid enough to hold the dream when timing finally opens.",
    },
  },
  33: {
    low: {
      short: "staying in a personal narrative built on pain, sharing stories from wound rather than wisdom",
      expanded: "A tendency to carry experience as wound rather than letting it ripen into wisdom — sharing from a place of hurt and disempowerment that neither liberates the teller nor helps the listener.",
    },
    high: {
      short: "translating personal experience into empowering narrative at the right moment, with the greatest impact",
      expanded: "A mastery of when a story has composted from pain into something generative — something that offers others a map. The power of this gate lives in the timing and the transformation of the telling.",
    },
    arc: {
      short: "moving from wound-story to wisdom-story, knowing when it's time to tell it differently",
      expanded: "This gate begins in the grip of the old narrative, and opens into the craft of knowing when experience has become something worth sharing — and how to tell it in a way that frees rather than binds.",
    },
  },
  34: {
    low: {
      short: "forcing things into being through sheer will, depleting myself by pushing against timing and circumstance",
      expanded: "A pattern of effortful pushing — trying to make things happen through force, becoming exhausted when the timing or conditions aren't right, depleting the energy that could be reserved for genuine impact.",
    },
    high: {
      short: "waiting for the right convergence of people, timing, and idea — then moving with real clarity and force",
      expanded: "An ability to hold energy in reserve until the moment when the right people, the right vision, and the right timing converge — and then move with a power that is self-sustaining rather than effortful.",
    },
    arc: {
      short: "moving from pushing and forcing to waiting for the moment that calls for everything I have",
      expanded: "This gate begins in the exhaustion of relentless push, and opens into the discovery that power used at the right moment — from a rested, aligned place — changes things in ways that force never could.",
    },
  },
  35: {
    low: {
      short: "settling into boredom or restlessness, never challenging the status quo or seeing experiences through",
      expanded: "A tendency to either numb out into a life that never challenges the possible, or to move restlessly from experience to experience without going deep enough to learn what any of them have to teach.",
    },
    high: {
      short: "knowing which experiences are worth having and bringing back what I learn to expand what's possible",
      expanded: "A discernment about which experiences are genuinely generative — and a commitment to going deep enough to extract what they offer, then sharing that knowledge to expand what others believe is available to them.",
    },
    arc: {
      short: "moving from restlessness or stagnation to choosing experiences with intention and mining them for meaning",
      expanded: "This gate begins in the boredom of a life that plays it safe or the restlessness of constant movement without depth, and opens into the practice of intentional experience as a form of service.",
    },
  },
  36: {
    low: {
      short: "leaping from one thing to the next without alignment, creating chaos and missing the full arc of experience",
      expanded: "A pattern of jumping into new opportunities before the current one has unfolded — driven by restlessness or crisis energy — and never arriving at the full fruition of what was begun.",
    },
    high: {
      short: "holding a vision with sustained emotional alignment and letting it develop through its full natural arc",
      expanded: "An ability to stay with a vision long enough to see what it becomes — maintaining emotional alignment through the uncertainty, and discovering that real miracles come from the commitment to see things through.",
    },
    arc: {
      short: "moving from crisis-driven leaping to the sustained presence that lets visions become real",
      expanded: "This gate begins in the pattern of constant new beginnings, and opens into the understanding that the deepest possibilities require you to stay long enough to find out.",
    },
  },
  37: {
    low: {
      short: "searching for peace outside myself, trying to manage or fix the outer world to feel okay inside",
      expanded: "A tendency to locate peace in the external environment — in other people's behavior, in circumstances, in control — rather than cultivating it as an inner practice.",
    },
    high: {
      short: "generating peace from within, and responding to life from that stability no matter what's happening around me",
      expanded: "An ability to stay connected to an inner peace that remains relatively stable regardless of outer circumstances — and to generate peaceful choices and relating from that ground.",
    },
    arc: {
      short: "moving from seeking peace outside to finding it as an inner practice I can bring anywhere",
      expanded: "This gate begins in the exhaustion of trying to manufacture peace through control, and opens into the quiet discovery that it was always available inwardly — and from there, outwardly.",
    },
  },
  38: {
    low: {
      short: "fighting for the sake of fighting, aggression without direction or meaning",
      expanded: "A pattern of engaging in conflict or struggle that has no real purpose — fighting everything, defending territory that doesn't matter, exhausting energy on battles that don't serve the vision.",
    },
    high: {
      short: "knowing what's worth committing to and using lived struggle to craft a vision that anchors real possibility",
      expanded: "An ability to use personal experience of challenge and perseverance as the raw material for a vision that is genuinely worth fighting for — something meaningful enough to anchor a life around.",
    },
    arc: {
      short: "moving from fighting everything to knowing what deserves the full force of my commitment",
      expanded: "This gate begins in undirected struggle, and opens into the clarity of a vision compelling enough to give all of that fighting energy a worthy purpose.",
    },
  },
  39: {
    low: {
      short: "panic in the face of lack, provoking others to fill an inner alignment they can't provide",
      expanded: "A tendency to respond to scarcity — real or perceived — with hoarding, provocation, or making others responsible for an inner sense of insufficiency they cannot resolve.",
    },
    high: {
      short: "using the awareness of lack as a signal to recalibrate toward sufficiency and abundance",
      expanded: "An ability to sense contraction — in yourself or in a shared field — and use that awareness as an invitation to shift toward sufficiency. Turning the experience of lack into a doorway toward abundance rather than a confirmation of it.",
    },
    arc: {
      short: "moving from reacting to lack with panic to using it as a recalibration signal",
      expanded: "This gate begins in the spiral of scarcity and provocation, and opens into the discovery that the felt sense of lack is itself a navigational tool — pointing toward where re-alignment is needed.",
    },
  },
  40: {
    low: {
      short: "overdoing and over-giving to prove my value, then collapsing into loneliness and resentment",
      expanded: "A pattern of exhausting the self through relentless giving and doing — driven by the need to justify belonging — followed by a loneliness that feels like punishment rather than signal.",
    },
    high: {
      short: "retreating to restore, then returning to community with genuinely more to offer",
      expanded: "An understanding that withdrawal is not abandonment — it is the necessary replenishment that makes sustainable contribution possible. The rhythm of solitude and return is a form of wisdom, not failure.",
    },
    arc: {
      short: "moving from proving worth through over-giving to honoring the rhythm of retreat and return",
      expanded: "This gate begins in the exhaustion of giving what you don't have, and opens into the discovery that the most generous thing you can do is restore yourself first.",
    },
  },
  41: {
    low: {
      short: "fixating on worst-case scenarios, suppressing dreams out of fear of being judged as unrealistic",
      expanded: "A tendency to use the imagination against itself — either catastrophizing, or shutting down the dreaming capacity entirely to avoid the disappointment or judgment that comes with hoping.",
    },
    high: {
      short: "using creative imagination to hold abundant visions and break limiting beliefs about what's possible",
      expanded: "An ability to sustain expansive, possibility-oriented visions with genuine imaginative commitment — sharing them at the right moment, and using the dreaming faculty to dissolve old patterns and inherited ceilings.",
    },
    arc: {
      short: "moving from imagination turned inward against myself to imagination as a creative force for what hasn't happened yet",
      expanded: "This gate begins in the fear of dreaming, and opens into the understanding that imagination isn't naïve — it is the first act of every real creation.",
    },
  },
  42: {
    low: {
      short: "avoiding completion, piling up unfinished things, or forcing endings before they're ready",
      expanded: "Either a backlog of incompletions that creates paralysis and overwhelm, or a pressure to wrap things up prematurely — both patterns cutting off the full maturation of what was begun.",
    },
    high: {
      short: "knowing exactly what needs to be completed to create genuine space for what wants to begin",
      expanded: "A clear sense of which cycles are ready to close, and the wisdom to facilitate their completion in ways that honor what they have been — making real space for what comes next.",
    },
    arc: {
      short: "moving from pressure around completion to a clear, wise sense of when and how things are ready to end",
      expanded: "This gate begins in the anxiety of things left undone or finished too soon, and opens into the discernment of knowing when a cycle has truly run its course.",
    },
  },
  43: {
    low: {
      short: "feeling alone with my knowing, sharing before the timing is right, frustrated at not being understood",
      expanded: "A pattern of having clear, often radical insight but struggling to articulate it — or sharing it before others are ready, and then feeling isolated with what you understand.",
    },
    high: {
      short: "trusting that the right moment will come to share what I know in a way that actually lands",
      expanded: "A confidence in the reality of your own knowing, combined with a patience for the timing that allows it to be received. When the moment is right, the transmission happens naturally and shifts something real in the listener.",
    },
    arc: {
      short: "moving from the loneliness of knowing too soon to the confidence of sharing at the right moment",
      expanded: "This gate begins in the frustration of understanding things others can't yet follow, and opens into a quiet trust that the right moment for transmission will always arrive.",
    },
  },
  44: {
    low: {
      short: "feeling haunted by past patterns, believing history is doomed to repeat itself",
      expanded: "A paralysis rooted in the weight of past experience — the belief that what has happened before is insurmountable, that old patterns are permanent, that the past determines the future.",
    },
    high: {
      short: "seeing patterns clearly and using that awareness to help myself and others break free of them",
      expanded: "An ability to recognize the origin of a pattern — where it came from, what it was protecting against, what it costs to maintain — and use that awareness as the first step toward transformation. Pain becomes purposeful rather than permanent.",
    },
    arc: {
      short: "moving from being trapped by the past to using pattern recognition as a tool for liberation",
      expanded: "This gate begins in the haunting of old cycles, and opens into the clarity that seeing a pattern fully is the beginning of being free of it.",
    },
  },
  45: {
    low: {
      short: "using leadership as a performance of status, withholding or controlling from a place of insecurity",
      expanded: "Leadership rooted in the need to be seen as important — compensating for insecurity with control, ego, or bombast, and measuring worth by the recognition of others.",
    },
    high: {
      short: "understanding that knowledge and resources are most powerful when shared to help others build their own foundation",
      expanded: "A recognition that true leadership is distributive rather than hoarding — that what you know and what you have becomes most valuable when it is used to grow the capacity and abundance of others.",
    },
    arc: {
      short: "moving from leading to be seen to leading in order to genuinely build others up",
      expanded: "This gate begins in the performance of authority, and opens into the understanding that real power is generative — it multiplies rather than consolidates.",
    },
  },
  46: {
    low: {
      short: "disconnecting from or rejecting the body, neglecting or hiding it, avoiding the commitment to physical care",
      expanded: "A pattern of treating the body as an obstacle, an embarrassment, or something separate from the real self — neglecting its needs, disconnecting from its signals, refusing to inhabit it fully.",
    },
    high: {
      short: "honoring the body as the soul's instrument and committing to inhabiting it as fully as possible",
      expanded: "A recognition that the body is not separate from the spiritual journey — it is the vehicle through which the soul expresses itself in the world. Tending the body becomes a sacred practice, and full embodiment becomes a form of spiritual commitment.",
    },
    arc: {
      short: "moving from disconnection or shame around the body to treating it as a partner in the work",
      expanded: "This gate begins in the estrangement from physical life, and opens into the discovery that how much life force you can embody is directly connected to how much you can offer.",
    },
  },
  47: {
    low: {
      short: "quitting when I can't figure out how to make something happen, feeling defeated by ideas I can't manifest",
      expanded: "A tendency to abandon inspiration at the first obstacle of implementation — treating the absence of a clear path as evidence that the vision isn't real or isn't for you.",
    },
    high: {
      short: "maintaining inspired, hopeful thought as a practice regardless of what's happening around me",
      expanded: "An understanding that the orientation of the mind toward possibility — independent of current circumstances — is what calibrates the emotional frequency that attracts the how. You don't need to know the mechanism; you need to keep believing in the direction.",
    },
    arc: {
      short: "moving from collapsing under what I can't figure out to trusting that inspiration itself is enough to begin",
      expanded: "This gate begins in the despair of the half-manifested idea, and opens into the discovery that a mind held in hopeful alignment is itself a generative act.",
    },
  },
  48: {
    low: {
      short: "paralyzed by inadequacy, afraid to act until I know more, convinced I'm not ready enough",
      expanded: "A persistent sense of not knowing enough, not being prepared enough, not having sufficient authority to act or be trusted — which keeps genuine mastery perpetually just out of reach.",
    },
    high: {
      short: "trusting my own depth of knowing and my connection to Source as the real foundation for action",
      expanded: "A self-trust rooted in the recognition that your capacity to learn, to go deep, and to find what you need is itself the wisdom. You don't need to have arrived — you need to trust the process of knowing.",
    },
    arc: {
      short: "moving from paralysis in inadequacy to trusting the depth I carry as enough to begin",
      expanded: "This gate begins in the stalling of not-yet-enough, and opens into the confidence that depth of engagement — not certainty — is the real credential.",
    },
  },
  49: {
    low: {
      short: "quitting too soon to avoid vulnerability, or holding rigidly to agreements that have long stopped serving",
      expanded: "Either leaving before the real work begins as a way of protecting against intimacy, or staying locked in commitments and values that have outlasted their usefulness — refusing to let go even when a higher principle is calling.",
    },
    high: {
      short: "knowing when to release what no longer serves and modeling the courage of choosing a higher alignment",
      expanded: "An ability to sense when a value, relationship, or agreement has run its course — and the courage to move on in service of something better. When you release what no longer aligns, you don't just free yourself; you demonstrate what it looks like to choose a higher principle over a comfortable but diminishing situation.",
    },
    arc: {
      short: "moving from holding on out of fear to trusting that release in service of a higher value is its own form of integrity",
      expanded: "This gate begins in the oscillation between premature exit and prolonged staying, and opens into a calibrated sense of when genuine evolution requires letting go.",
    },
  },
  50: {
    low: {
      short: "over-caring from a depleted place, held in check by guilt and rigid principles",
      expanded: "A pattern of giving past the point of genuine capacity — driven by obligation, guilt, or an inability to let others face the consequences of their own choices — resulting in exhaustion and resentment.",
    },
    high: {
      short: "nurturing from fullness, and teaching others in ways that increase their own self-sufficiency",
      expanded: "True care that comes from an abundant rather than depleted place. An intuition for what others genuinely need to grow — not what keeps them comfortable or dependent — and the willingness to offer that even when it's harder.",
    },
    arc: {
      short: "moving from guilt-driven caretaking to nourishment that genuinely sustains everyone involved",
      expanded: "This gate begins in the exhaustion of giving what you don't have, and opens into the recognition that you can only truly feed others from a place that is itself well-fed.",
    },
  },
  51: {
    low: {
      short: "losing connection to purpose when life disrupts, becoming bitter or grasping for control",
      expanded: "A tendency to be destabilized by the unexpected — letting the shock of disruption generate bitterness, anger at the universe, or a frantic attempt to regain control that depletes the energy needed to actually navigate change.",
    },
    high: {
      short: "using cycles of disruption as catalysts that deepen connection to purpose and Source",
      expanded: "An ability to consciously meet disruption as an initiatory threshold — asking what this is opening rather than what it is destroying. Each shock becomes a deeper anchoring in what actually matters.",
    },
    arc: {
      short: "moving from being destabilized by disruption to recognizing it as the threshold it actually is",
      expanded: "This gate begins in the shock of unexpected turns, and opens into the trust that disruption is not random — it is the form the soul's curriculum sometimes takes.",
    },
  },
  52: {
    low: {
      short: "scattered attention, overwhelmed into paralysis, or focused on the wrong things entirely",
      expanded: "An inability to find the still point that would clarify where energy belongs — either scattering across too many inputs at once, or freezing in overwhelm while what actually matters waits.",
    },
    high: {
      short: "the ability to step back, see the larger pattern, and know exactly where my energy will matter",
      expanded: "A gift for perspective — for stepping out of the immediate noise and perceiving what is actually happening at a structural level. From that vantage, you know precisely where to place your energy so it bears real fruit.",
    },
    arc: {
      short: "moving from scattered overwhelm to the stillness that reveals where I actually belong",
      expanded: "This gate begins in the inability to find the center, and opens into the quiet clarity that comes from learning to be still enough to see.",
    },
  },
  53: {
    low: {
      short: "reacting to pressure to begin before it's right, or refusing to start from the trauma of past false starts",
      expanded: "Either a pattern of launching prematurely in response to pressure — and then reaping nothing from the effort — or a refusal to begin at all because previous ill-timed starts have left a residue of failure.",
    },
    high: {
      short: "sitting with inspiration until it's ready, then initiating with trust in how it will unfold",
      expanded: "The ability to sense when an idea is genuinely ready to be launched — and to begin from that resonance with confidence, trusting that what is initiated at the right moment carries its own momentum.",
    },
    arc: {
      short: "moving from pressure-driven starts to initiating from genuine readiness and trust",
      expanded: "This gate begins in the anxiety around beginning — either too much urgency or too much fear — and opens into the calm discernment of knowing when something is genuinely ready to move.",
    },
  },
  54: {
    low: {
      short: "forcing inspiration into form through will, pushing ideas that aren't mine to build or don't have their timing",
      expanded: "A compulsion to take every incoming inspiration and push it into manifestation — even when the idea isn't yours to build, or when the timing isn't aligned — resulting in exhaustion and diminished results.",
    },
    high: {
      short: "cultivating a relationship with the creative muse and stewarding inspiration with patience and preparation",
      expanded: "An ability to tend inspiration gently — building the energetic and practical foundations for it, honoring the muse without forcing, and trusting that stewardship of an idea is itself a form of service. Not all inspiration is yours to execute, but all of it deserves to be honored.",
    },
    arc: {
      short: "moving from forcing every inspiration into form to serving as a patient, discerning steward",
      expanded: "This gate begins in the exhaustion of trying to build everything that arrives, and opens into the ease of knowing which inspirations are yours to carry and which are yours to pass along.",
    },
  },
  55: {
    low: {
      short: "operating from scarcity and fear, hoarding, indecision, creating through willpower rather than trust",
      expanded: "A pattern of clinging to what you have out of fear there won't be enough — withholding, indecision, and a reliance on personal will to create what aligned faith might otherwise attract.",
    },
    high: {
      short: "holding the emotional frequency of a vision with enough faith to create without clinging or controlling",
      expanded: "An ability to sustain the emotional alignment of a creative vision even in the absence of visible proof — trusting in sufficiency so deeply that creation happens without the constraint of what you can currently see.",
    },
    arc: {
      short: "moving from creating from fear and scarcity to trusting that faith itself is a generative force",
      expanded: "This gate begins in the tightness of scarcity, and opens into the discovery that a mind and heart held in genuine trust can create in ways that force never could.",
    },
  },
  56: {
    low: {
      short: "telling contracting stories that keep myself and others stuck in what hasn't worked",
      expanded: "A use of narrative that depletes rather than expands — stories that confirm limitation, reinforce what's impossible, and drain the energy of everyone who hears them.",
    },
    high: {
      short: "sharing stories and inspirations that open possibility-oriented thinking and activate creative energy in others",
      expanded: "A mastery of expansive narrative — stories and insights that orient people toward what might be possible, shift their emotional frequency upward, and generate the kind of momentum that actually creates change.",
    },
    arc: {
      short: "moving from stories that confirm limitation to stories that open what's possible",
      expanded: "This gate begins in the habit of the contracting narrative, and opens into the discovery that the same storytelling gift used to limit can be redirected to liberate.",
    },
  },
  57: {
    low: {
      short: "paralyzed by fear of the future, unable to trust myself or follow through on what I know needs to happen",
      expanded: "A pattern of knowing what needs to be prepared, what action needs to be taken, what the future is signaling — and failing to act on it because fear or self-doubt overrides the instinct.",
    },
    high: {
      short: "trusting my own instinct about timing and following through on what I know needs to be made ready",
      expanded: "A finely tuned sense of when the timing is right, what needs to be prepared before it arrives, and when to move. This isn't certainty — it's a living relationship with inner guidance that you've learned to follow.",
    },
    arc: {
      short: "moving from paralysis around the future to trusting the instinct that's always been trying to guide me",
      expanded: "This gate begins in the gap between knowing and acting, and opens into the embodied trust that following your instinct — before the full logic is clear — is the real intelligence.",
    },
  },
  58: {
    low: {
      short: "denying joy, avoiding mastery, feeling guilty or ashamed about doing what I love",
      expanded: "A disconnection from the pleasure of genuine mastery — whether through guilt, shame, self-denial, or the belief that joy in one's own work is self-indulgent or undeserved.",
    },
    high: {
      short: "living in the flow of joy that comes from committing to genuine mastery of what I love",
      expanded: "A practice of refining your gifts — not for performance or external recognition, but because the deepening itself is satisfying. When you commit to this, you enter a state of flow that sustains and fuels everything else.",
    },
    arc: {
      short: "moving from denying joy to inhabiting it as a daily practice and source of real creative fuel",
      expanded: "This gate begins in the shame or suppression of doing what you love, and opens into the discovery that joy in mastery is not a luxury — it is the engine.",
    },
  },
  59: {
    low: {
      short: "fighting to survive, forcing agreements, crafting relationships from scarcity rather than sufficiency",
      expanded: "A pattern of relating and creating from fear — forcing partnerships and agreements that are unsustainable because they are built on the belief that there isn't enough and you have to take what you can get.",
    },
    high: {
      short: "building partnerships and agreements from trust and sufficiency, knowing abundance is meant to be shared",
      expanded: "A capacity to create genuinely sustainable relationships and foundations — partnerships that hold because they are built on real alignment rather than need, and agreements that work because both parties are genuinely served.",
    },
    arc: {
      short: "moving from creating from fear of lack to building from a foundation of genuine sufficiency",
      expanded: "This gate begins in the survival-mode of scarcity relating, and opens into the ease and richness of creating from a place where there is genuinely enough.",
    },
  },
  60: {
    low: {
      short: "resisting change, holding to what's familiar, letting disruption create rigidity rather than adaptation",
      expanded: "A tendency to cling to what is known — fighting transformation, refusing what wants to evolve, letting the overwhelm of change generate paralysis or reactivity rather than orientation toward what's being conserved.",
    },
    high: {
      short: "finding what's working inside the change and staying curious about what's being built through disruption",
      expanded: "An optimism that doesn't deny difficulty but stays oriented toward what's being conserved, carried forward, and created through the transformation. A capacity to move through change gracefully because you're looking for what's emerging rather than mourning what's ending.",
    },
    arc: {
      short: "moving from resisting change to staying curious about what transformation is building",
      expanded: "This gate begins in the grip of the familiar, and opens into the trust that even structural disruption is conserving something essential — and that finding that thread is the work.",
    },
  },
  61: {
    low: {
      short: "needing to know why, becoming bitter or victimized when no answer comes",
      expanded: "A compulsion to explain, justify, or find the cause of everything — and when understanding doesn't arrive, a slide into bitterness, rationalization, or victimhood that uses the unanswered question as evidence of cosmic injustice.",
    },
    high: {
      short: "staying in a state of genuine wonder, using curiosity as a creative force rather than a source of anxiety",
      expanded: "An ability to hold the mystery — to stay innocent, open, and creatively alive in the face of what can't be fully known. Wonder as a sustaining force for powerful, ongoing creativity.",
    },
    arc: {
      short: "moving from the need to know why to the freedom of genuine curiosity",
      expanded: "This gate begins in the pressure to have the answer, and opens into the discovery that not-knowing, held lightly, is one of the most generative states available.",
    },
  },
  62: {
    low: {
      short: "over-preparing from anxiety, letting the plan override the actual flow of things",
      expanded: "A tendency to use preparation as a form of control — building plans so detailed and thorough that they become a substitute for genuine engagement with how things are actually unfolding.",
    },
    high: {
      short: "knowing what's genuinely necessary and trusting that alignment will provide the rest when I need it",
      expanded: "A calibrated readiness — attuned to what is actually needed and trusting that when you are aligned, the right information and resources will arrive at the right time. Preparation serves the moment rather than trying to account for every contingency.",
    },
    arc: {
      short: "moving from anxious over-preparation to a grounded trust in aligned readiness",
      expanded: "This gate begins in the compulsion to plan away uncertainty, and opens into the ease of knowing that prepared and controlling are not the same thing.",
    },
  },
  63: {
    low: {
      short: "spiraling in self-doubt, suspicious and uncertain, questioning without arriving anywhere generative",
      expanded: "A mental loop of doubt that undermines existing structures without building new ones — questioning that destabilizes rather than opens, producing suspicion rather than creative inquiry.",
    },
    high: {
      short: "using curiosity and questioning as a force that opens new potentials and invites bigger thinking",
      expanded: "An ability to take the same questioning energy that could spiral into doubt and redirect it toward possibility — asking what could be, what might work, what else is available. Curiosity as a doorway rather than a trap.",
    },
    arc: {
      short: "moving from doubt that contracts to curiosity that expands",
      expanded: "This gate begins in the anxiety of questions without answers, and opens into the discovery that the same questioning mind can be oriented toward wonder rather than worry.",
    },
  },
  64: {
    low: {
      short: "pressuring myself to manifest big ideas, despairing when I can't figure out how to make them real",
      expanded: "An exhausting mental loop of receiving large, visionary ideas and then straining to figure out how to implement them — collapsing in despair or inadequacy when the mechanism doesn't reveal itself.",
    },
    high: {
      short: "receiving big ideas with openness, dreaming into them, and trusting I'll know my role if they're mine to carry",
      expanded: "An understanding that your relationship with a big idea may be to hold it — to give it your imagination, dream it fully, and trust that if it is yours to build, the how will become clear. Not every idea that moves through you is yours to execute; some you are simply here to carry until the right moment or person arrives.",
    },
    arc: {
      short: "moving from straining to manifest every vision to trusting my role as a receiver and dreamer of what wants to come through",
      expanded: "This gate begins in the pressure to be the one who makes it happen, and opens into the spacious recognition that holding a vision with care and imagination is itself a form of service — and sometimes the most important one.",
    },
  },
};

export function getGateExpression(
  gate: number,
  level: "low" | "high" | "arc",
  length: "short" | "expanded",
): string {
  return GATE_DATA[gate]?.[level]?.[length] ?? "";
}
