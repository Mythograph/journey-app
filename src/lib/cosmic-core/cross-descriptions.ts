// Cosmic Core — per-cross incarnation narratives.
//
// One entry per incarnation cross, keyed exactly like the chart engine's
// CROSS_NAMES table: `${sunPersonalityGate}/${RA|JUX|LA}`. Each cross's source
// description (loveyourhumandesign.com) has been rewritten into the first-person
// Mythograph voice and stripped of pop-culture references, repeated "follow your
// strategy" boilerplate, editorial asides, and banned vocabulary. The text
// speaks only to the cross's purpose; the cross name, the four gates, and the
// variation geometry (Right Angle / Left Angle / Juxtaposition) are supplied
// separately by The Call. Any cross without an entry here falls back to the
// four-gate synthesis.

import type { CrossVariation } from "./crosses.js";

export const CROSS_DESCRIPTIONS: Record<string, string> = {
  // ── Gate 1 ──────────────────────────────────────────────────────────────
  "1/RA":
    "I am here to follow my own lead and stay inside the present moment, absorbed in my own way of doing things. That absorption is my real contribution, even though I am not trying to direct anyone. When I do my own expressive work from the core of what moves me, other people find their direction in my example and follow it.",
  "1/JUX":
    "My cross carries the charge of pure self-expression. I am here to be different and do my own thing, and it is through that individual expression that other people get to look on and take up whatever moves them. Not all of it will land. Some of what I express will push people away, and that is the nature of the energy, not anything personal.",
  "1/LA":
    "I am here to embody self-expression and to stand up to whatever tries to control it. People will try to impose rules on how I am allowed to express myself, and my work is to defy them, because no one gets to put bounds on self-expression. I am here to make sure that voice has its room and that no one boxes it in.",

  // ── Gate 2 ──────────────────────────────────────────────────────────────
  "2/RA":
    "I am here to see and stay open to the possibilities, and to guide other people by showing them the many directions a beautiful life could take. I point out the roads we might choose and the alternate routes. What I find harder is explaining why one road over another; the seeing comes more easily to me than the reasoning.",
  "2/JUX":
    "My cross gives me direction, and that direction is bound up with discovering the truth: my own, the truth of the people around me, and the larger truths underneath. It is a steady pull, and I tend to draw the people near me forward along it, toward the same knowing.",
  "2/LA":
    "Whether I am conscious of it or not, I am here to step out of line and stand for the other way of doing things. My defiance might be small or large, but its work is to bring variation to what has hardened into the norm. The change rarely comes straight from my action; it comes from how other people read it, and that is how I loosen what has grown stuck.",

  // ── Gate 3 ──────────────────────────────────────────────────────────────
  "3/RA":
    "I carry a drive toward laws and order. Even as a child, a house with no rules would have unsettled me. I am here to live out the laws of the tribe and to improve them, but gradually; the change in me is patient, not revolutionary. When structure shifts too fast, it feels like chaos to me.",
  "3/JUX":
    "My cross carries the charge to cause change, usually around rules and laws. There is moral weight to it: anyone who tries to change a law can be read as a dissident, and changing it from a position of power can look like corruption. Even so, I am here to be a mutative force in the rules a tribe lives by.",
  "3/LA":
    "I am here to lead change in the law and in how things are run, and that will always create tension between the people who want things to stay and the people who want them to move. My cross is a kind of wishing, a hope held out for a better future, and part of my work is to offer the leadership that turns the wish into something real.",

  // ── Gate 4 ──────────────────────────────────────────────────────────────
  "4/RA":
    "I am driven to explain, and what I am explaining is really a theory that still has to be tested. The difficulty is that my explanations come out individual, and a logical idea only takes hold once it reaches the collective. I am here to offer the uncommon explanation, the one most people would not arrive at, the kind that pulls a group out of a belief that no longer holds. If my idea reads as strange, I try not to take it personally; that is just the dance between the individual and the collective.",
  "4/JUX":
    "I am here to express my theories about the patterns and formulas underneath things. I am not here to prove them; I am here to lay them out and let the rest of us puzzle over them. My gift is seeing the formula, and my work is to put it into words and then let it go.",
  "4/LA":
    "My cross is about revolution, but practical revolution. If the pattern holds and the facts support it, it is a change I am willing to put myself behind. If it is only a good theory with nothing solid under it, I let it go. I am here to make change that can actually stand.",

  // ── Gate 5 ──────────────────────────────────────────────────────────────
  "5/RA":
    "I am here to live in the flow of life. Everything moves in patterns through the river of time, and I have an instinct for those patterns, in nature and in the larger order of things. When I go with the current instead of fighting it, my energy stays free for what actually matters. I am here to be wise about this and to pass on what I come to understand.",
  "5/JUX":
    "I am here to live by my own patterns, and they run close to ritual for me. I can be rigid about them, the small fixed rhythms of an ordinary day, and that is the point: without pattern, life turns to chaos. What I show other people is how much steadiness a chosen rhythm can hold, and how rhythm becomes its own kind of freedom.",
  "5/LA":
    "I am here to march to my own beat, looking for the rhythms that work for me even when they work for no one else. That is where the separation comes in: along the way I find that other people's patterns do not fit me. The world needs people who move at their own tempo, filling the spaces around the mainstream, and that sense of my own timing is what I have to offer.",

  // ── Gate 6 ──────────────────────────────────────────────────────────────
  "6/RA":
    "It can feel as though I was thrown out of Eden, as though birth itself was an exile from somewhere that already held everything. Over time I carry the charge to go out and explore and actually live. My direction is not back toward the garden but forward, to find a slice of Eden here on the earth and then share it with the people around me.",
  "6/JUX":
    "I find my opportunities through my relationships, and the conflict I have to live with is an inner one: part of me grieves a lost garden, and part of me delights in being alive on the earth. One side reaches for the Eden it remembers; the other revels in the plain joy of a body and a life. My work is to let my relationships bring that joy within reach.",
  "6/LA":
    "I am here to be a guide to life on the earthly plane. My work is to teach, and to be an example, that when I live in line with how I am actually made, I get what I need, not what my mind insists on but what my body and my life truly require. I am a kind of guardian of how to live well in this material world.",

  // ── Gate 7 ──────────────────────────────────────────────────────────────
  "7/RA":
    "I am here to lead, to guide and direct, with an instinct that reaches toward the future. Of the leadership crosses this is the one that most actively seeks the role, though how strongly that shows depends on the rest of my design. My deepest asset is the ability to read the patterns of the past and project where they are heading, and to bring that forward in how I lead.",
  "7/JUX":
    "I am drawn to be involved in leadership, though not always at the front of it. More often I am a single contributor to something larger, with a foot in the door of the organizations and movements that steer things. I am here to take part in how a group finds its direction.",
  "7/LA":
    "I am the one expected to step forward when a situation badly needs someone to. People look to me to come through and carry the weight, so preparation matters more for me than for most; the expectations are large. I am here to lead in those moments, which means being genuinely ready, or honestly declining when I am not.",

  // ── Gate 8 ──────────────────────────────────────────────────────────────
  "8/RA":
    "I am here to contribute through my own individual effort, and the passion I bring tends to be contagious; my excitement pulls other people along. I am unlikely to stay anyone's follower for long. At some point I step out on my own and break new ground, and when I do, it gives other people something to catch hold of and ride.",
  "8/JUX":
    "My contribution comes through demonstration. I am the one who adopts some project, takes it under my wing, and keeps fixing and bettering it over a long stretch of time. That steady, hands-on devotion to making one thing better is what I give back.",
  "8/LA":
    "I carry a real desire for the right home and the right things around me, and underneath it a quiet uncertainty: do I have the right one? My moods move in a wave between joy and a low sadness, and the work is to know that the wave is a wave. When I am in the low, the joy is already on its way back, and my choices prove themselves right to me over time.",

  // ── Gate 9 ──────────────────────────────────────────────────────────────
  "9/RA":
    "I am here to contribute the planning that a family, a group, or a community needs. I have an eye for the details and for what actually has to get done. Where the money or the energy comes from is someone else's part; my focus stays on the ends rather than the means, grounded in what the group has decided matters.",
  "9/JUX":
    "I am built to find focus, especially in planning, but not by racing logically through every option. My focus comes when I relax into the task and let it come into view over time, letting the pieces settle into place on their own. That unhurried way of arriving is how I do my best and clearest work.",
  "9/LA":
    "My capacity to focus and to contribute is tied directly to the security I am actually given. A speculative arrangement, where the reward is a promise rather than something in hand, does not suit me. With real stability under me, though, I can bring an enormous, steady focus to whatever I take on.",

  // ── Gate 10 ─────────────────────────────────────────────────────────────
  "10/RA":
    "My cross is built on love: love of spirit, of the body, of humanity, and of myself. I am here to be an embodiment of love, and the love that drives me most is the search for self-love. What I am looking for is a way to live as one individual example of love that other people can see.",
  "10/JUX":
    "I have an instinct to guide and correct how things are done, weighing the logic of a process and offering the fix. The aim is a better way of doing things and more joy in the living of them. Not everyone welcomes being corrected, so the work is as much about how and when I offer it as the correction itself.",
  "10/LA":
    "I am here to watch behavior closely, to analyze it and then say what would correct it, so that hardship or harm gets headed off before it arrives. That impulse can tip into the judgmental or the heavy-handed, so my delivery matters; it lands far better when I soften it. I am here to help people avoid what is risky and to recognize what is good.",

  // ── Gate 11 ─────────────────────────────────────────────────────────────
  "11/RA":
    "I came into a body from somewhere lighter, and this world is dense and heavy by comparison. I am here to teach and to pass on why the body experience matters, to live out that philosophy while I am inside it. Some days the heaviness weighs on me; other days I can speak clearly for the worth of being here in a body, and I move between those two views.",
  "11/JUX":
    "I am driven to express my ideas, especially about what it is to be here in a body, the physical fact of being human. My cross supports the work of philosophizing and ordering my thoughts into something I can hand over. I am here to teach, and to speak what I see to the world.",
  "11/LA":
    "I am here to stand for education, because it is one of the ways we come to understand who we are, and understanding who we are is what lets us evolve. Education is the ground that evolution grows from, and my work is to be part of it and to help make it available to everyone.",

  // ── Gate 12 ─────────────────────────────────────────────────────────────
  "12/RA":
    "I carry the drive to go out and explore the world, and it was never only about me; it pulls me to bring other people along. This is the same force that first led us out of the garden, and it ties closely to art, to bringing what I feel into form. I move through stretches of sadness, since so much of the world is not Eden, but the exploring always comes through, because that is what I am here to do.",
  "12/JUX":
    "I have a particular charge for spreading the word, and it is not only the articulation, it is the love carried inside the message. When I speak, I can move the people around me with what I say. My work is to use that gift to make things better wherever I put it.",
  "12/LA":
    "I am here to educate by speaking out, less through quiet exchange than through addressing the people who are ready to hear. When I am living in line with myself, an open and receptive audience finds me. I am here to deliver the word in whatever field genuinely moves me.",

  // ── Gate 13 ─────────────────────────────────────────────────────────────
  "13/RA":
    "I am here to be intuitive about the past. My work is to help reconcile what has already happened, gathering history and drawing the one piece of useful counsel out of everything that has occurred.",
  "13/JUX":
    "I am here to listen and to gather the history of events and confidences, the kind very few people will ever hear. This cross is built for taking it in rather than passing it on; much of what I hold stays held. It is the deep listening itself that I am here to offer.",
  "13/LA":
    "I am here to look back and give direction, and to do it through my own changing process, which is why I end up wearing masks; there is real pressure on me to point the way. Underneath runs a melancholy, an individual longing for a higher kind of love with another person. The twist is that my energy is so individual that loving someone can complicate it, and so love, for me, has to begin alone.",

  // ── Gate 14 ─────────────────────────────────────────────────────────────
  "14/RA":
    "I am here well provided for, with an energy that draws the resources I need toward me, and with a strong pull to say yes and commit. That same yes can overextend me into burnout if I am not careful, so the work is to commit only to what I am genuinely passionate about. People are drawn to the abundance I carry; my task is to spend it on the things that matter at the level of the soul.",
  "14/JUX":
    "I am built to get what I want, and how well I do depends on how secure I feel, both materially and in love. This works out over the long haul only when I move the way I am designed to. Romance turns out to be central to my happiness, and my underlying drive is simply to be happy and secure; that is my own road to power.",
  "14/LA":
    "I am here to provide the resources and the security that quiet other people's uncertainty: shelter and food in a home, product or direction in the work. There is a kind of void around me, and I have the energy to fill it. People who are unsettled find steadiness and solid ground through what I bring.",

  // ── Gate 15 ─────────────────────────────────────────────────────────────
  "15/RA":
    "Born as a vessel of love, I am here to bring people into the flow of life in a loving way. The pull of my cross runs toward humanity as a whole: love of spirit, love of the flesh, love of myself, and love of everyone. My work is to draw people into love, for themselves, for each other, and for the human family.",
  "15/JUX":
    "I am here to find my rhythm inside extremes. I do have a rhythm, but it swings wide: long nights and early mornings, intense stretches followed by nothing at all. That extreme tempo is not a flaw to correct; it is simply how my rhythm runs, and it is allowed to.",
  "15/LA":
    "I speak from a place of love and caution, guiding people away from the patterns and paths where I can see they will get hurt. My aim is to help them avoid a painful experience, though my guidance will not always be wanted. When I offer it in line with my own design, most of the time it is received the way I mean it.",

  // ── Gate 16 ─────────────────────────────────────────────────────────────
  "16/RA":
    "I bring enthusiasm to finding a better way of doing things for the collective, and that energy grows when I genuinely care about what I am improving. I take an idea and analyze it deeply to make life better, holding together the spirit of a thing and the talent for it while I look for the real depth of the solution. My harder task is finding the resources for it, since those have to come from outside me.",
  "16/JUX":
    "When something truly interests me, I become fixated; it gets under my skin and I am determined to make it real. I can have a hard time letting go of what I cannot quite bring off. I am here to be that determined, and when I move the way I am designed to, the thing I have fixed on comes to life.",
  "16/LA":
    "I am here to draw people in to identify with what I am behind, whether that is a cause, a project, or an idea. I have a knack for getting others to step into the picture I am painting. It is logic underneath, carried by charisma and real enthusiasm, that hooks people, and I gather around me the ones who believe in the same thing.",

  // ── Gate 17 ─────────────────────────────────────────────────────────────
  "17/RA":
    "I bring four logical energies together, and the one that leads is opinion. With it comes a strong drive to correct and to organize so that life can be healthier, longer, and more joyful. I serve people through guidance, ordering, and correction. I may feel like a healer, but my real place is as the guide; each person has to take their own steps to actually heal.",
  "17/JUX":
    "I am here to give my opinions. Not all of them will be popular, and not all of them will be right, but they matter; they help correct what is off and bring a more logical order that makes life more joyful. Being this opinionated is simply how I am made, which means the people closest to me need to be comfortable with how freely I say what I think.",
  "17/LA":
    "I am here to get my hands dirty and stir things up. I poke at the issues that have gone stagnant and provoke the evaluation, correction, and refinement they need. It creates tension, since not everyone wants their settled things disturbed, but that disturbance is exactly my work.",

  // ── Gate 18 ─────────────────────────────────────────────────────────────
  "18/RA":
    "My energy says: get your life in order. Correction leads in me, and it is aimed at making life better and more joyful. That is not an easy message to carry, because not everyone is ready to be corrected, and it can land as personal even when it is not. I do better when I soften the delivery and when the correction is actually invited. I am here to help shape this world into a better place.",
  "18/JUX":
    "I am here to correct the patterns that get in the way of a more joyful life, and to do it for other people, even though correction is so often unwelcome. The work is to voice it with tact and care; done that way, I can be genuinely wise about both correction and harmony. Done carelessly, it leaves me alone.",
  "18/LA":
    "I am here to stir things up, to turn things over so they can be made better. There is something practical in it: if nothing is going to change, it is not worth the effort. I am like the quiet one who finally rises to take on the bully, making the change for everyone's sake. That is what I am here to do.",

  // ── Gate 19 ─────────────────────────────────────────────────────────────
  "19/RA":
    "I am driven to make sure everyone has what they need, and the most basic of those needs is food. For me this can be as close as making sure my own family is fed, but it usually reaches further, toward the community, the country, even the world. Running through it is a deep spiritual thread, woven right into the drive to feed people.",
  "19/JUX":
    "I have a need to be expressive, and the creativity in me is strong, but it wants privacy. I need a space of my own where I can let it move. I am here to be creative in my own way, on my own ground.",
  "19/LA":
    "I carry a sense of what is needed, not today but further down the road. Mine is the voice that says the way we are doing things now will wear out the ground beneath us, and that the sustainable path is the one that lasts. I am here to point us toward the longer term, especially around food and the things we depend on to survive.",

  // ── Gate 20 ─────────────────────────────────────────────────────────────
  "20/RA":
    "My energy is about being busy. It hardly matters what I am doing; the being busy is what I need. There is a strong individual streak in it, and from that I can draw strength or loneliness, joy or melancholy. I can be busy and happy or busy with my sadness, and finding the happiness in it is up to me.",
  "20/JUX":
    "I carry the charge of the present moment, and also the charge of family and community. The challenge is that I can get so lost in the now that I lose sight of the people around me. When I hold both, my presence and my connection to my community, I become a living model of how to actually be here.",
  "20/LA":
    "I am here to be a mutative force inside my tribe, with an industrious energy that gets things done. The individual things I bring can be attractive enough that the community takes them up, but not always: sometimes I want to keep them my own, and sometimes the group simply does not see their worth. So my life has a dance to it, offering change to the group and watching to see whether it is taken.",

  // ── Gate 21 ─────────────────────────────────────────────────────────────
  "21/RA":
    "I carry the tension that a tribe needs to stay in order, whether that shows up in a family, a workplace, or a community. It is a necessary provocation, the friction that keeps a group aligned. The response it draws out also opens the door to clearer, more effective leadership.",
  "21/JUX":
    "I have a real need for control, and it is through that control that I can take something and remake it into something new. Everyone has a little of this; few have it as strongly as I do. I take hold of a situation, start it over, and shape it into what it was supposed to be, and that drive is where my innovation comes from.",
  "21/LA":
    "I am here to bring smaller forces together, in a very controlled way, to make something larger happen. I am after the grand and the complex, built up out of many parts. The control has to be tight, because without it the whole thing collapses into chaos, and that is not what I am for.",

  // ── Gate 22 ─────────────────────────────────────────────────────────────
  "22/RA":
    "Fueled by listening, by teaching, and by working things out, I have the energy to rule my own world, whether that turns out to be my own life, my family, my town, or something larger. I am here to rule with grace. This is not something I have to go chasing; the rulership tends to come to me.",
  "22/JUX":
    "I am a listener by design, and I love to listen; I will fall for certain voices and conversations simply to stay in them longer. That attentiveness is a gift with strangers especially, who seem to sense, almost at once, that I am truly taking in what they say.",
  "22/LA":
    "I have both the gift of listening and the gift of communicating: I take in what people say with full attention, then put it back into words clearly and well. I am a gatherer and a distributor of information. Every family, community, and government needs someone who can do that.",

  // ── Gate 23 ─────────────────────────────────────────────────────────────
  "23/RA":
    "I am here to put individual insight into words, and because it is individual, it arrives new to the collective and can sound strange at first. So I am built to repeat myself, to say the thing again and again, and it is through that repetition that people slowly grow familiar with what I am expressing. A new idea spreads the way a fad does: odd at first, then everywhere. I am here to introduce us to what is new.",
  "23/JUX":
    "I am pushed to bring my individual ideas forward to create change, and because they are new, they can strike people as foreign at first. My challenge is to offer them without frightening anyone off, which often means holding back until I know people, and only then letting my real expression out. Expressing that inner self is my contribution. Some of the ideas take flight; some fall away, and both are part of it.",
  "23/LA":
    "There is a drive in me to give the same explanation again and again, which makes me a natural teacher. The repetition is not a burden; it satisfies something, and each retelling clarifies the message a little more. That dedication to explaining is the gift I bring to this life.",

  // ── Gate 24 ─────────────────────────────────────────────────────────────
  "24/RA":
    "I am driven to understand, mentally, everything I come across, and to do it I go over things again and again until the understanding is solid. It gives me purpose, the way ocean waves polish a stone: I keep returning to the same experiences and memories, looking for how it all fits together. Because this is such an individual drive, I tend to live it as an example or a single contributor, since most people do not have the patience to circle a thing as many times as I will.",
  "24/JUX":
    "I am unusually gifted at grasping concepts and truly understanding them, which can put me among the brightest people in a room. My challenge is translating that understanding into terms the collective can hold. It is not enough to explain the idea in the moment; I also have to show how it ties back to the past and forward into the future.",
  "24/LA":
    "I carry the energy of incarnation itself, a deep sense that everything is always coming and going, the way cells die off and are replaced. I recognize that pattern instinctively, and it lets me give direction to almost everything I meet. Whatever stage a thing is in, I have a feel for what led up to it and where it is going, and without quite trying, I help point people toward where their own process is heading.",

  // ── Gate 25 ─────────────────────────────────────────────────────────────
  "25/RA":
    "At the center of everything I carry is love: love of the body, of humanity, of behavior, and a universal love beneath them all. I am here to be universally loving toward all things. At some point in my life a shock will meet me, and the work of my cross is to come through it without losing that love.",
  "25/JUX":
    "I am here to bring forward a love of life and of simply being alive. It is not exactly about finding happiness, though that would be the ideal; it is about the bright, effervescent joy of being here in a body, moving through this human existence. That innocence is what I am here to spread.",
  "25/LA":
    "I am here to speak for health and for how necessary it is to a joyful life; food, money, and even love pale beside it when it is gone. As a healer's cross, I tend to move through my own seasons of sickness, so that I can speak from the inside about the joy and the worth of healing and of being well.",

  // ── Gate 26 ─────────────────────────────────────────────────────────────
  "26/RA":
    "I am here to put myself forward as a leader, and my skill at shaping how I am seen is what sells my ability to lead. This is not a fact-based enterprise; it runs on the persuasive energy I carry. I am here to lead and to sell myself as the leader, and the honest part of the work is making sure I actually have what it takes to deliver.",
  "26/JUX":
    "My cross has a sleight of hand to it: I can sell, and make people believe in what I am selling, whether that is a product or a brand-new idea. I have both the marketing instinct and the trustworthiness to win a commitment. The same gift can be used to deceive, but it can also rally people around something important before the evidence has fully caught up.",
  "26/LA":
    "I am here to confront power and to put my own in its place. My energy is built with a hard edge, because I am meant to take on the people in charge who ought to be questioned. I am deliberately provocative: provocation forces justification, and justification reveals what a person actually stands for. My confrontational streak has a purpose, which is to get us to the bottom of things.",

  // ── Gate 27 ─────────────────────────────────────────────────────────────
  "27/RA":
    "Mine is a tribal cross: I am here to support and stand for my people, whether that is my friends, my family, my town, or my team. I make sure they are nurtured and cared for, even when that means bending a rule. I also tend to bring the unexpected with me; whether I cause it or simply attract it, surprise is something I can count on, for better and for worse.",
  "27/JUX":
    "I am here to bring a sense of care to all things and all people, which can be a blessing and, at times, a burden. Caring gives me purpose, and part of that drive is making sure I am cared for too. Mine is the energy behind loving your neighbor, and my work is to find where that belongs in my own life.",
  "27/LA":
    "I have a knack for handling the unexpected with surprising smoothness, and by the way my energy works, I tend to draw the unexpected toward me. My purpose is to move around and through it, for myself and for other people. I do well wherever balance under sudden pressure matters, on the front lines of things, where moving smoothly through the unforeseen is everything.",

  // ── Gate 28 ─────────────────────────────────────────────────────────────
  "28/RA":
    "I am here to struggle with things in this life. When I have found my passion, the struggle feels worthwhile, even productive; when I have not, the same struggle turns heavy and bleak. So the task is to find what I am passionate about and then embrace the struggle, because it is meant to bring me a deeper, more personal sense of meaning. Unexpected things will keep arriving, and there is purpose in the ride.",
  "28/JUX":
    "There is a gambler in me, willing and even driven to take risks for the thrill of them. Through those risks I am chasing two things at once: the rush, and a sense of purpose. The work is to make sure the things I bet heavily on are the ones I am truly passionate about; staked there, the risk is where my success comes from.",
  "28/LA":
    "I am here to shift away from the old, inherited way of doing things and to align myself with what is coming, and to show others that it can be done. There is risk in making the move, and I can be seen as a deserter for it, but I understand in my bones that nothing lasts forever. Aligning with the new is what I am here for.",

  // ── Gate 29 ─────────────────────────────────────────────────────────────
  "29/RA":
    "My energy is a yes, carried by a real enthusiasm for life and a drive to make things grand by throwing myself fully in. I am here to spread excitement and to spread the word about whatever I love. My commitment can be boundless, but I am in a body with real limits, so I have to set some bounds on how many things I say yes to, and reserve the yes for what I am truly passionate about, or I will burn out.",
  "29/JUX":
    "I am here to say yes and to commit, often to many things at once, and there is a burning desire in me to agree to everything, which is exactly what will burn me out. I am capable of extreme devotion, and the depth of my commitment can inspire the people around me. The work is to make sure what I commit to is truly my passion.",
  "29/LA":
    "I am here to do things, and I can find myself busy nearly all the time, with a deep dedication to whatever I am doing. It matters enormously that what keeps me busy is something I am passionate about, not a passing interest but a passion that runs from the core of me. When I find that and set it in motion, I am among the most industrious, productive people there are.",

  // ── Gate 30 ─────────────────────────────────────────────────────────────
  "30/RA":
    "My cross carries desire, and the drive to actually live out what I desire; I am the one who tries the new thing first, on impulse, and the rest of us learn from how it goes. I also carry the pull toward yes, and I have to manage it, or I end up overwhelmed by everything I have agreed to.",
  "30/JUX":
    "I carry drive and obsession, a passion that runs deep in me and keeps pushing me forward. I will work on what I love endlessly, on and on, until I burn out, and that burning out is simply the rhythm of how I am made. Some of the greatest discoveries have come from people who move this way.",
  "30/LA":
    "I am here to be industrious, with a strong desire to stay busy and to see the people around me busy too. Underneath the work is a goal: bringing people together, in the belief that this is how we come together. The trick for me is to let my busyness come as a response to life rather than something I force into being.",

  // ── Gate 31 ─────────────────────────────────────────────────────────────
  "31/RA":
    "I am likely to land in a place of leadership rather unexpectedly. It can seem to come from nowhere: suddenly I am in the spotlight, or at least the one holding everything up. I am here to know that this energy is in me and that I will be thrust into the lead, and to get ready to carry the responsibility when it comes.",
  "31/JUX":
    "I can be deeply influential, because I am persistent; I will go over a process again and again until I reach the goal. This is the design of the agent, the advisor, the architect. My influence blends real interpersonal skill with a quality of leadership, and I am here to lead, and to bring others along my way.",
  "31/LA":
    "Mine is the cross of a leader. I carry the alpha energy to head the pack and to make sure its survival needs are met. I have the mental agility to plan and a presence that assures people they are safe, and that sense of safety is one of the most important things my leadership provides, because it eases the group's deepest, survival-level fear.",

  // ── Gate 32 ─────────────────────────────────────────────────────────────
  "32/RA":
    "I survive by looking for value, with a strong streak of saving and storing in me. I am always weighing the worth of things and of people. I am here to bring that sense of value together in a way that helps ensure survival, my own and the species'.",
  "32/JUX":
    "I am here to conserve and to preserve life, and that can show up in fearful forms: preparing for disaster, stocking food and water, or throwing myself into the work of protecting the environment. I am here to lend my voice to preserving life. The fear is a useful engine, but I do best when I do not let it take over, and stay grounded in what I am actually here to protect.",
  "32/LA":
    "I have a sense of the limits that survival requires, and it comes from a place that can be fearful, the part of me that says there is no use in trying. My gift is being able to name the limitations that any success actually has to respect. The liability is that the fearful side can grow strong and pull me, or others, low, so the work is to keep turning back toward what is possible.",

  // ── Gate 33 ─────────────────────────────────────────────────────────────
  "33/RA":
    "What leads in me is a need for privacy. It is a retreating energy, and what it is really after is the freedom that only comes from having a space of my own. It ties closely to home, to the four walls where I can simply be myself. I may be very social, but there comes a point when I need to be alone, and underneath it is a belief that everyone has the right to a space to be themselves in.",
  "33/JUX":
    "I carry the belief that everyone deserves a small place of retreat, and to me that is where peace actually begins: people are most at peace when each has their own territory, their own four walls to withdraw into. I am here to live that out and to bring the influence of it, often simply by being myself, in whatever work lets me make room for others to have their own space.",
  "33/LA":
    "I carry an energy for having a living space of my own, and beautiful things within it. Part of the drive is privacy, the room to be myself, and I hold it not only for me but as something everyone has a right to. Beyond shelter, I want beauty inside the walls, and I am here to make sure all of us can have a private, inspiring space of our own.",

  // ── Gate 34 ─────────────────────────────────────────────────────────────
  "34/RA":
    "I have a great need to be busy; the line from my gut to my voice is all about doing the thing, whatever it is. The danger is getting so lost in the busyness that I drift from what matters to my soul, so the work is to make sure what I am doing is a passion that makes my heart sing. I am built to be productive and drawn toward secure relationships, but I get there by listening inward, not by doing for its own sake.",
  "34/JUX":
    "I carry a lot of power and raw energy, and I am here to exchange it for something in return, whether that is entertainment or some other kind of productivity. People want the power I have. I am here to share it and to get what I want in turn, and the honest work is making sure what I want is what my soul wants, not what my ego is chasing.",
  "34/LA":
    "I can thrive on my own and as part of a community, and my challenge is finding the balance between the two. The control and restriction that come with being in a group can make me want to be alone, and yet in groups I genuinely flourish. I am here to contribute to my family or community even when I am not always happy inside it, and I often find my balance as an outside contributor rather than a full member.",

  // ── Gate 35 ─────────────────────────────────────────────────────────────
  "35/RA":
    "I am here to balance the hunger for experience with the relief of being done with it; my motto is been there, done that. Often I realize I have lived something close enough before that I do not need to do it all again, even as I feel pressure to taste every part of a thing fully. My work is to save the collective from repeating what we already know, and to move us toward what we have not yet learned.",
  "35/JUX":
    "I am driven toward specific, singular experiences; I fix on one and work toward it until it is complete. I tend to load enormous expectation onto the outcome, and so I am sometimes disappointed, because nothing could match the buildup. The work is to keep moving toward the experiences that are genuinely right for me.",
  "35/LA":
    "I am here to live with an acceptance of all kinds of people. We carry an old, tribal wariness of the stranger, but my cross has moved past it; as our cities have grown, there is a need for people who can be at ease without knowing everyone around them. Being accepting and comfortable among strangers is a real talent of mine, and often a key one in my work.",

  // ── Gate 36 ─────────────────────────────────────────────────────────────
  "36/RA":
    "I carry the story of being thrown out of Eden and then setting out to rediscover it. I may have come into life feeling cast from paradise, or had something early on that left me sensing Eden was lost. That gives me the drive to seek my own Eden through experience, and the experience itself is what moves me forward. My gift is to find that slice of Eden and show it to the world.",
  "36/JUX":
    "I hold a love of humanity and a hunger for intimacy at the same time, and that can set up a conflict inside me, between the wider love and the close, personal drive. My purpose is to bring the two into balance, into harmony with the rest of how I am made.",
  "36/LA":
    "I am here to find balance in intimacy, between the personal pleasure I need and my life within the larger group. One part of me wants to seize a dream and run off to a cave alone; another wants to be there at the fire with everyone. Finding that balance, and showing it, is the gift I bring.",

  // ── Gate 37 ─────────────────────────────────────────────────────────────
  "37/RA":
    "I am here to make the deals and bargains that hold a community together. Institutions are really built out of compromises, the way we pay into something shared so that all of us get schools and roads in return. My energy goes toward creating, strengthening, and sustaining community, in whatever shape it takes.",
  "37/JUX":
    "I am here to make deals and bargains, the kind that serve me and can also help build community. I find the give-and-take in nearly everything, and my energy expresses itself in wanting something back for each thing I put in.",
  "37/LA":
    "I am here to seek a break from the communities that already exist. Living in a group means making bargains and sacrifices to keep everyone content, and at some point a community realizes it cannot please everyone. Mine is the voice that names when the compromise has gone too far, when it is time to move on and begin building again, and even that is part of how community gets made.",

  // ── Gate 38 ─────────────────────────────────────────────────────────────
  "38/RA":
    "My energy is looking for a purpose and ready to fight to bring it about, which makes finding that purpose the most important thing for me. When I live in line with my design, the purpose reveals itself; when I do not, I end up struggling with the lack of it, with no clear direction. The task is to listen inward and put my fight-through-anything energy to good use.",
  "38/JUX":
    "I am here to be an opposing force to almost everything I meet, and through that opposition I make people justify what they are doing, saying, or selling. It is a valuable process: it is in the justifying that a group starts to see which ideas hold up and which are full of holes. I add value by asking the right questions and pressing on things until the underlying truth shows itself.",
  "38/LA":
    "I carry an energy that provokes other people and stirs up tension in them. Things can get heated, since people will unload on me, but I am energetically built for it and it does not really rattle me. What I am doing is forcing them to take a position and defend it, often without even meaning to; a small nudge from me and suddenly they are worked up. I am here to get people moving and to push them toward finding meaning in their lives.",

  // ── Gate 39 ─────────────────────────────────────────────────────────────
  "39/RA":
    "I was born able to push people's buttons. It can draw out negative reactions, but the real aim of the provocation is to find the right spirit in what comes back. In a sense I hand people a gift: a chance to work on whatever I have stirred in them, though they will not always see it that way. My purpose is to create the tension that brings a reaction, and in that reaction lie the seeds of something that can lead another person toward their own emotional path to spirit.",
  "39/JUX":
    "I am designed to be deeply provoking, and the point of it is to create a reaction and some movement around whatever I have touched. If there were nothing there for the other person to work on, I would get no reaction at all. Not everyone is ready to do that work, though, so I have to be mindful of my timing, or I get more than I bargained for.",
  "39/LA":
    "I am here to be an individual; the energies of my cross are individual through and through. It is not really about being social or part of a community, even if I can be, because in the end I march to my own drum. That is a real contribution: it gives others a chance to see my way and take up the parts that move them. It can also annoy the more community-minded, since it is so different from what they accept, and that friction is, in the end, what leads to change.",

  // ── Gate 40 ─────────────────────────────────────────────────────────────
  "40/RA":
    "I am here to weigh the cost of the things a community wants to do; mine is the evaluation of the bargain itself, how much work this will take and what it will return. Being part of a community means giving things up to belong, paying in either money or effort to build it and stay in it. I am the one who says, I like the idea, but is it worth the cost?",
  "40/JUX":
    "I am here to be the brakes when things get carried away, the voice that says we have already tried that. Mine is an energy of resistance, and it matters: without it, a group can get so swept up that it heads straight off a cliff. I am here to question and to push back, so that everyone snaps out of the emotional rush long enough to justify where they are actually going.",
  "40/LA":
    "I have an energy that moves on when a real threat appears, whether that means relocating or leaving behind what I do or believe. The migration is rooted in survival, in fleeing to stay alive, and I will stay in denial right up until I am convinced it is time to go. It often shows in work, where I hold on no matter what until I finally see the writing on the wall and leave for something else.",

  // ── Gate 41 ─────────────────────────────────────────────────────────────
  "41/RA":
    "I am here to bump into the unexpected and to bring something forward out of that encounter, though what it will be is never clear at the time. My energy fills me with expectations about what the discovery will become, and those expectations are not always met. I am here to make the discovery and carry it forward, and to expect the unexpected along the way.",
  "41/JUX":
    "My energy is about expectation, about the fantasy of what is going to happen next, and it makes me good at spotting trends, at reading out where things are heading. The prediction is not always right, because it is fantasy, but it does have a basis in the patterns I have watched. Much of it is tied to the anticipation itself, to the feelings the fantasy stirs up ahead of time.",
  "41/LA":
    "I have the energy to lead, though I often have to wait for the opening to take it; when it comes, I am ready. I can lead because I offer an emotional vision that other people are ready to follow. When I move the way I am designed to, the chance to lead presents itself.",

  // ── Gate 42 ─────────────────────────────────────────────────────────────
  "42/RA":
    "I am driven by closure, by the need to see things finished. The work is to pursue what I am passionate about at a scale I can actually complete, whatever obstacles come. That drive only resolves when I take in the whole environment, everything that makes up the reality around a thing, and understanding fully how that environment works is the key to being at peace with this cross.",
  "42/JUX":
    "I carry a drive to complete things; long after other people give up, I keep going until I cross the finish line. Research and other long, patient pursuits often suit me. The trick is to take on what I can actually finish, within a reasonable span or with a clear end in sight. Even a marriage is a serious commitment for me, because I am driven to see it through, for better or worse.",
  "42/LA":
    "I am here to impose limits on other people, and they can come out abruptly: you cannot do this, you cannot keep going with that. The limits matter, though; they are what save us from wandering endlessly without structure, and they bring clarity, the focus that comes from working inside a boundary. The abruptness usually comes from my leaving out the reason, so the work is to explain myself, because the limit alone will not always be welcome.",

  // ── Gate 43 ─────────────────────────────────────────────────────────────
  "43/RA":
    "I am driven to explain things to the world, and it is not an easy task, because I am trying to put words to what I simply already know. The knowing is individual, and while others work to follow, part of me just wants to say, I know because I know. Still, I keep explaining, because I am driven to get it across. My mission is to bring that individual thought into the light, where it can turn out to be a stroke of genius.",
  "43/JUX":
    "I spend much of my life saying aha. My insight comes from pulling abstract pieces together until they suddenly fit, and I often have trouble explaining how, because the process is not logical, and explanations people can follow usually are. It is just the pieces falling into place all at once, and there it is.",
  "43/LA":
    "I have the energy to express my knowings to the world; I am driven to explain an insight and then leave it for other people to digest. Because the insight is individual, it can take a while to be taken up, and sometimes it is simply too different to absorb at all. I am here to throw out these pieces, and the rest of us will either take them in or let them pass.",

  // ── Gate 44 ─────────────────────────────────────────────────────────────
  "44/RA":
    "I am here to guide and direct based on the past, with an instinct for managing people so that a group or tribe is provided for. Drawing on a kind of bodily memory, I can steer resources where they need to go. Like an old family business, I am the one who assigns the tasks so that it all comes together and the community has everything it needs.",
  "44/JUX":
    "I am a kind of watchdog, for the universe or at least for my own corner of it. I am alert to trouble, to the pattern that is going wrong, and I tend to notice it before anyone else does. When what I notice matters to the group and I raise it the right way, people heed the warning; raised the wrong way, I become the one who cried wolf.",
  "44/LA":
    "I carry the energy of the cycle, always reviewing things to see whether they are right and whether there is enough, driven by a fear of not having enough. I turn things over and over. My role is to let the people in my group, family, or company know when something is going wrong, and to direct the work of setting it right again.",

  // ── Gate 45 ─────────────────────────────────────────────────────────────
  "45/RA":
    "I am here to take power and rule my own piece of ground, though it may not be land at all. I am driven to have control of something, whether that is my home or a department at work; there is a pull to hold rulership over it. Rulership matters, because it brings structure to chaos, and ruling is what I am here to do.",
  "45/JUX":
    "I carry a desire to possess the people in my life, to have a kind of control over those I am close to. It matters greatly that I move the way I am designed to, because otherwise the people I am trying to hold will not accept it and will grow distressed, even angry. Living in line with my design is what makes this cross work, for them and, most of all, for me.",
  "45/LA":
    "I have an energy that comes in from the outside to take control of what is rightfully mine. In any society or business, leadership eventually goes stagnant, and I am here to shake it up, usually from outside, the way someone comes in to optimize a large, sluggish operation. This is not only about business; the same force takes hold in my personal life and community. The real drive underneath is power and control.",

  // ── Gate 46 ─────────────────────────────────────────────────────────────
  "46/RA":
    "My cross carries the love of life. I am deeply into my body and everything that touches it, into experiencing this earthly existence in a loving way. I am here to be love, and the key for me is that it has a sensuousness to it. I am here to show other people how to love being alive.",
  "46/JUX":
    "I am here to be in the right place at the right time. Part of that is simply being in my body and enjoying it, even loving this earthly experience, and sharing that love with the world. I am an opportunist in the best sense, and I share my knack for serendipity with the people around me.",
  "46/LA":
    "I am here to be love, and to heal through love, and my cross supports doing that with other people. My focus is on the love of the body and on being fully in it. I may not always see much come back to me, but the power of healing through love makes a real difference in the world around me.",

  // ── Gate 47 ─────────────────────────────────────────────────────────────
  "47/RA":
    "I am here to make sense of the past, to bring its events forward and give the fuller picture in the present. I might use that to lead, or simply to rule my own corner of the world. I always make more sense, and feel more connected to people, when I weave the past into what I am doing now, and that continuity is what I offer to help others connect and feel in tune.",
  "47/JUX":
    "I am here to bring ideas to life that connect the past, the present, and the future. Some of them can feel heavy, even oppressive, and that weight is exactly what pushes everyone else to test them for validity. I am here to throw the ideas out and leave it to the rest of us to carry them forward or shoot them down.",
  "47/LA":
    "Mine is a cross of rulership carried through openness and care. I am here to be social and to inform, with a real concern for the greater whole. I am likely to bring what I know forward through art, through song, through some expressive medium rather than plain telling.",

  // ── Gate 48 ─────────────────────────────────────────────────────────────
  "48/RA":
    "I carry a great deal of depth, with a drive to know and to truly understand, and a tension that pushes me to acquire the skills to do things deeply. Only when I relax into the flow do I find that, living the way I am designed to, the skills arrive when I actually need them. As I allow that, they have the depth I require. I am here to bring depth, and to relax out of the tension that would otherwise have me endlessly chasing talent.",
  "48/JUX":
    "My cross is all about depth, about the ability to do things in a profoundly deep way. I get noticed for it, and it is through my social connections that the chances to excel come to me. The depth I bring inspires other people toward a better, more logical way of doing things.",
  "48/LA":
    "I bring depth, and I am here to contribute it to the world, though I depend on other people to make that deep contribution land. I can get fed up waiting for the right connection, so patience is part of the work, relaxing into the flow until the encounter arrives where my depth can shine. It can take in any field; the drive is always to provide a deeper understanding so that a process, a product, or a system can be made better.",

  // ── Gate 49 ─────────────────────────────────────────────────────────────
  "49/RA":
    "My cross carries a revolutionary, mutating energy, and because it is emotional, it comes with tension and a certain aggression. Providing food plays a large part in it; I carry the drive that moves us to act on the body's need to be nourished. It is called explanation because there is pressure on me to explain what my mutation is about, and since my revolution is individual, other people can struggle to follow it.",
  "49/JUX":
    "My cross is about standing on principle, and it carries the charge of revolution and change. I have a fundamental drive to stand up for what is right, especially for human rights, with a recurring theme of food and how we provide it, because we have to eat to live. I may be ahead of my time, passionate about a threat before the rest of the collective even sees the problem I see so clearly.",
  "49/LA":
    "My energy is revolution, change in the service of the common good. Food is a central theme in it, as it has been in revolutions for a long time. There is something of the outlaw who robs from plenty to feed the hungry in me: I see the need to provide for the people who have less, and I am moved to meet it.",

  // ── Gate 50 ─────────────────────────────────────────────────────────────
  "50/RA":
    "I am here to make the laws a tribe lives by. For any group to survive, there has to be order around who provides, who prepares, and how it is all shared, and though we are far from the campfire now, the principle holds. My gift is setting the rules so a family or an organization can function with less chaos. As the lawmaker, though, I have to stay open to feedback, because everyone else has to live under what I set; my standards tend to be inherited and I am not always open to outside input, and when neither the group nor I will bend, something has to give.",
  "50/JUX":
    "I am here to bring forward rules and values, but I do it with a lenient hand. I help a family or a group establish the order that keeps it from breaking down into chaos. Mine is not a rigid authority; it is one that can read the wisdom of a circumstance and bend or negotiate when that is what is needed.",
  "50/LA":
    "I am here to look at the systems already in place and offer my own view of how they might be different. It can be unpopular, because people are rarely willing to give up what has governed them for a long time. Still, I am here to make the case that certain things no longer fit or make sense, and the work is to be wise about when I share those wishes, so I am not simply driven out of the group I call home.",

  // ── Gate 51 ─────────────────────────────────────────────────────────────
  "51/RA":
    "I get to the point with a shocking, penetrating energy. I cut through the extras and go straight to the heart of a matter, to the answer, without a lot of fluff, and I tend to do it in a way that startles people. In being so blunt I often clear the way for others, though that is secondary to my own need to do the thing and get it done.",
  "51/JUX":
    "I am driven to shock people, and at its rawest it does not even matter to me whether what I say is true, because it is shock for its own sake. Out of the shock comes reaction, and reaction can break a person out of complacency. Moving people away from lethargy and complacency is what I am here to do.",
  "51/LA":
    "I am here to bring shock and, with it, the possibility of change, for the people who are ready for it. They may still gasp, or ask how I could, but underneath they have been waiting for exactly this to move them. My shock needs a receiver, and my energy guides me toward the people who, at some level, are ready for it and ready to move on.",

  // ── Gate 52 ─────────────────────────────────────────────────────────────
  "52/RA":
    "I am here to help guide and correct other people, and because my lead energy comes from a place of stillness, that is where I guide from. Like a counselor sitting quietly in an office, I am someone people seek out for advice and a clear read on their situation. My guidance lands best, and does the most good, when I offer it the way I am designed to.",
  "52/JUX":
    "I am here to give sage advice, but when it is asked for. There is an innate stillness in me that asks to be recognized, and it is from that stillness that I find clarity about everything around me. When people come to me, I offer real ideas and solutions; what is not in my nature is to initiate the advising. My expertise makes its deepest impact when it is drawn out of that quiet.",
  "52/LA":
    "I am here to point out what is not working in society and to demand that someone take action and put it right. My concern is collective, not personal; it is about the dysfunction that affects the greater whole. I am here to make a stand and be heard. My energy for it is limited, so I have to use it the way I am designed to, and trust that others will get involved and help carry the change.",

  // ── Gate 53 ─────────────────────────────────────────────────────────────
  "53/RA":
    "I carry the energy of starting, of initiating something new, and I always have an ambition to change things or begin again. I would much rather get in on the ground floor than take up something old and established. I am here to be an initiating force, and to be recognized for it, and I want what I work on done in a big way. That ability to initiate works best when I move the way I am designed to, so that I am there from the very beginning of whatever I am passionate about.",
  "53/JUX":
    "I carry a rare blend of initiation and transformation. It makes me well suited to managing a project of any size: I can assess the cost and the scope, weigh the resources and what they will add. People seek me out for that, because I have the energy to get a project started, size up what it needs, and set in motion the change that sees it through.",
  "53/LA":
    "I bring forward the energy of the never-ending cycle, which is really the story of evolution. Change is constant, and it moves in cycles, beginning, transformation, ripening, completion, and then it all starts over. I carry every part of that, and I am here to endure and to excel at handling the repetitive, ever-changing cycles of how things evolve.",

  // ── Gate 54 ─────────────────────────────────────────────────────────────
  "54/RA":
    "I get noticed through my ambition; people recognize what I do because of how driven my approach is. I also have an energy to get to the point, to skip the circling and simply get the thing done. That can cut both ways, depending on what people expect: when I am asked to be thorough, my instinct to do it quickly and easily can leave their expectations unmet.",
  "54/JUX":
    "I am here to make commitments and to see them through to the end, with a drive to push forward and get the job done. It matters that I live the way I am designed to, and that I find the things my soul actually wants to commit to, the ones that make a voice deep inside me say, that is exactly what I should do. I am built to stick with it and make it happen.",
  "54/LA":
    "I carry a powerful, transforming energy for getting things done, and my cross is tied to the cycles that all of life moves through. I understand in my bones that everything is born, dies, and is born again, that things are always changing and ripening through that turning. Because I am part of the process, my own education and work tend to cycle too; I am unlikely to stay in one job for decades unless it can evolve with me. I am here to master the work of maturation.",

  // ── Gate 55 ─────────────────────────────────────────────────────────────
  "55/RA":
    "Like the phoenix that rises from its own ashes, my energy is pushed forward by the line from my gut to my voice, and it can be enormously productive. Inside it, though, is a moodiness that swings between the glass half full and the glass half empty. My challenge is to ride that wave and find solace in the fuller moments. I am learning a great deal about the texture and the quality of emotions, and I have a gift for teaching what I learn.",
  "55/JUX":
    "I carry a longing to know things in real depth and detail. If I can balance the moodiness that cycles through me, the melancholy especially, then I have a genuine talent for bringing things forward in a beautiful way.",
  "55/LA":
    "I have a primal need for good food, for love, and for intimacy, and meeting those needs is the very fuel of my spirit and the way I come to feel good about myself. Once that foundation is set, my spirit can soar.",

  // ── Gate 56 ─────────────────────────────────────────────────────────────
  "56/RA":
    "I am here to speak about ideal laws. I am drawn to rules and to talking and dreaming about how to create them. My work is to promote change through a vision of what is possible and a picture of how it would be structured. The fine details of the structure do not move me; what moves me is sharing the dream and how it would make things better.",
  "56/JUX":
    "I have a need for the stimulation of adrenaline; I am something of a thrill-seeker, and I love to tell the story of my exploits afterward. I am well made for a life of adventure and for the work of recounting it, whether on the water, in the wild, or on the page. I am here to be lit up by the thrill and to tell the tale of it.",
  "56/LA":
    "I have a knack for drawing people's attention away from what they are doing or thinking, which makes me well suited to comedy, or to helping someone who is lost. It can also be a problem, since it interrupts and can draw negative reactions, and turned inward it distracts me from my own work. Underneath, I am pulling people toward whatever is stimulating me, and when I do it the way I am designed to, it is far more welcome, and far more effective.",

  // ── Gate 57 ─────────────────────────────────────────────────────────────
  "57/RA":
    "I have a rare ability to read other people and to know, in the moment, what is right or wrong for them. My intuition runs deep, deep enough at times to feel like hearing something beyond form, and it comes as an instantaneous sense of yes or no that pulses and then fades. I am here to be wise about what to do in the moment, for myself and for others. The knowing comes from intuition, and I tend to be straight to the point, not inclined to fill in the details.",
  "57/JUX":
    "I have an intuitive gift, though by design I will probably not voice it very often. I can read other people and know what is right and wrong for them. The work is to voice that knowing selectively, the way I am designed to, because that is how I will actually be heard, and how my gift reaches the world.",
  "57/LA":
    "I carry an energy that makes me wise and intuitive, the kind of energy other people want, so that over time they seek me out. I hold knowledge that can guide them, and like an old soothsayer I can offer practical solutions to the problems of the day. As I grow older, I find myself more and more drawn to live my life guided by that intuitive gift.",

  // ── Gate 58 ─────────────────────────────────────────────────────────────
  "58/RA":
    "My cross is an interesting blend: a love of beauty and life, alongside the energy to correct a logical process. That correction matters, because it changes patterns for the better and moves us forward. My eye for beauty can make some people envious, since they would rather put that energy toward practical correction, but my drive runs the other way, toward the aesthetic and the spiritual more than the merely useful.",
  "58/JUX":
    "I bring something vital to the work of logic, which is otherwise starved for energy, and I have plenty of it. The catch is that my cross also wants control, so I will be asked to contribute and find myself reaching for the reins. When our aims point the same way, there is harmony; when they do not, the relationship is at odds. My gift is to power the logical process and to steer it for the good of everyone involved.",
  "58/LA":
    "My energy is useful to other people, so they seek me out to get at it, and I also offer correction, which can alienate people when it comes unasked. At times I feel taken advantage of, as though everyone is drawing on my energy, and over time I learn to find the balance and make sure I get something back. That is where my demands come in: I want a fair return for the energy I give out.",

  // ── Gate 59 ─────────────────────────────────────────────────────────────
  "59/RA":
    "Sexual desire and intimate relationships play a foundational role in my life this time around. Like the phoenix, these energies cycle through my years, taking flight, soaring, burning down to ash, and rising again. In my early years it is closeness to my family; in my prime it is about intimacy and making a family of my own; later it becomes a caretaking role for the wider family. I am here, in the end, to take part in the regeneration of the human family.",
  "59/JUX":
    "I have a real strategic gift when it comes to relationships; I could be a wonderful matchmaker, because I can see where people fit together, and people freely tell me what they are drawn to. My own matchmaking is the harder part, especially when someone I am interested in has just told me they are interested in someone else.",
  "59/LA":
    "My cross is about finding intimacy and romance, anywhere from the purely sexual to the tender, moving kind of love. I am driven to bring focus to both the pleasure and the pain that relationships bring. Because we humans are so consumed by relationship, there are many paths through which I might live this energy out.",

  // ── Gate 60 ─────────────────────────────────────────────────────────────
  "60/RA":
    "I am here to hold the boundaries of the law. I understand that laws matter, that they keep order and hold a society together, and I am bound to the traditional ones, the older customs. Lawmaking is an evolutionary thing: rules get set, and over a long time, sometimes a very long time, they change. We cannot just throw them all out and pick new ones, because there has to be continuity, and I am here to be that stabilizing force, the one who reminds us of the rules that hold us together.",
  "60/JUX":
    "I am here to live within the old laws and traditions; I am fixed in how I believe things ought to be done. Rules have real purpose for me, keeping things from sliding into chaos, and I am not comfortable with new ones; I prefer the old. I am here to offer that heritage, because there is an important balance between change and tradition, and I help preserve the tradition side of it.",
  "60/LA":
    "I am here to put the brakes on change. There is a delicate balance between tradition and change; progress is all change, but change left unchecked would only make chaos. So I insist on the checks and balances, the voice that asks why we are changing something we have done the same way for two hundred years. That can frustrate the people pushing for progress, but my voice matters, and it deserves to be heard.",

  // ── Gate 61 ─────────────────────────────────────────────────────────────
  "61/RA":
    "I am here to bring the unknown into knowing, whether that is undiscovered knowledge or simply a new way of looking at things. I carry an inner knowing, and by sharing it I cause the world to reconsider where it stands and make room for the new.",
  "61/JUX":
    "My energy drives knowing and thinking; I am always looking to understand how things work and to move that understanding along. As we evolve, so does what we understand, and I am driven to work that process, to help carry our understanding to a new level.",
  "61/LA":
    "I am here to bring things into focus by identifying their parts and giving them names, whether those are objects, concepts, or whole ways of life. By naming a thing, I give it the foundation that lets the collective discuss it. I am driven to bring things into focus so that the logical work of evaluating them can actually be done.",

  // ── Gate 62 ─────────────────────────────────────────────────────────────
  "62/RA":
    "I have a great ability to find and remember the small details, and they matter to me enough that I am driven to share them, though I have to remember that other people do not always want every last one. Used well, that gift is genuinely useful, a real contribution to any profession or organization that needs someone with a deep eye for detail.",
  "62/JUX":
    "I am here to deliver meaning through detail, though there is a fuzziness to it: the details are not always precise, and the way I deliver them can obscure the very meaning I am after, like a storyteller who keeps breaking off to add small facts and loses the thread. I do my best work as a contributor in relationship with others, where my contribution can flow and land with its full force.",
  "62/LA":
    "I am here to ask questions and examine patterns in search of a deeper understanding, asking whether something is truly all right or simply working itself out. I am driven to ask the questions that help us reason out why we have arrived where we are, because those questions call for the answers that let us logically sort it all out.",

  // ── Gate 63 ─────────────────────────────────────────────────────────────
  "63/RA":
    "I am here to ask questions and examine patterns in search of a deeper understanding, asking whether a thing is really all right or just working itself out. I am driven to ask, from a logical standpoint, why we have arrived where we are with a given situation, and my questions call for the answers that help us sort it out and make progress.",
  "63/JUX":
    "I carry a strong doubt about the logical process; my first instinct is that a thing will not work. I am here to be the doubter, and it is from that doubt that an idea, a product, or a process gets examined closely enough to make sure it works without undue risk. In a sense, I am a kind of safety inspector, an overseer for the rest of us.",
  "63/LA":
    "I have an energy to step in and take power or authority, and it is a transpersonal drive, with karma woven into it, whether my own or the need to protect people who are being taken advantage of. The irony is that by taking over a situation I might make it better, and I might just as easily make it worse.",

  // ── Gate 64 ─────────────────────────────────────────────────────────────
  "64/RA":
    "I have an ability to take hold of power through sheer mental force. I can turn the pressure to figure things out into clear, effective communication, and that turns people into followers. Not everyone can push ideas forward and lead with them, but I am energetically designed to do exactly that.",
  "64/JUX":
    "I am here to be conscious of our patterns of living and of thinking, with the energy of a narrator or a historian. There is a tendency in me to bend the facts when I have a personal stake, because part of this cross is tied to the ego and its drive for gain and self-preservation, and that is where the confusion comes in, when the facts and the reality do not quite match. Staying objective is my best ground, the place from which I keep my account of events accurate.",
  "64/LA":
    "I am here to take power or authority over situations, and to do it I draw on history and bend it toward my own view, sometimes distorting it, and I may profit by it. This is a karmic cross, which means that whenever I consider stepping into authority, I have to weigh the outcome carefully as part of the decision.",
};

// Look up a cross's purpose narrative by sun personality gate + variation.
export function crossDescription(
  sunGate: number | null | undefined,
  variation: CrossVariation | null | undefined,
): string | null {
  if (sunGate == null || !variation) return null;
  const abbrev = variation === "RightAngle" ? "RA" : variation === "LeftAngle" ? "LA" : "JUX";
  return CROSS_DESCRIPTIONS[`${sunGate}/${abbrev}`] ?? null;
}
