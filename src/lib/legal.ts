/**
 * Journey's terms, refund policy and privacy notice (25 Nov 2026), needed for
 * Paddle's website review. Built on Story Loom's pages so the two read alike.
 * Refunds: 14 days, any reason (Cléa, 25 Nov 2026). Paddle is the seller of
 * record; its wording on that is required near verbatim.
 * Plain text only: each paragraph is one string.
 */

export const LEGAL_UPDATED = "25 November 2026";
export const CONTACT_EMAIL = "clea@mythograph.co";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPage {
  title: string;
  lede: string;
  sections: LegalSection[];
}

const PADDLE_LINE =
  "Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.";

export const TERMS: LegalPage = {
  title: "Terms of use",
  lede: "The agreement between you and Mythograph when you use Journey and buy a Journey Narrative.",
  sections: [
    {
      heading: "What Journey is",
      paragraphs: [
        "Journey offers a free Human Design chart and a paid Journey Narrative: a written reading of your Human Design and Gene Keys, made from your birth date, time and place.",
        "It's for reflection. It isn't therapy, and it isn't medical, legal or financial advice. What you take from it, and what you decide, is yours to judge.",
      ],
    },
    {
      heading: "Buying a Journey Narrative",
      paragraphs: [
        PADDLE_LINE,
        "The price is shown before you pay. After paying, you get an email with a private link to your reading page. You add your birth details there, and your reading is written from them.",
        "Your receipt comes from Paddle. Earlier purchases were taken by Stripe; the same terms apply to them.",
      ],
    },
    {
      heading: "Refunds",
      paragraphs: [
        "You can have a full refund within 14 days of buying, for any reason. See the refund policy for how.",
      ],
    },
    {
      heading: "Your reading and its link",
      paragraphs: [
        "Your reading lives at a private link. Anyone with the link can open it, so share it only with people you'd like to read it. Keep the email it came in: it's your way back.",
        "The reading is yours to read, print and keep for your own use. The text that makes up readings, and the site itself, belong to Mythograph, so please don't republish or sell them.",
      ],
    },
    {
      heading: "Birth details for someone else",
      paragraphs: [
        "If you enter someone else's birth details, for example as a gift, please do so only with their permission.",
      ],
    },
    {
      heading: "Using it fairly",
      paragraphs: [
        "Please don't use Journey to break the law or harm anyone, try to get into anyone else's reading, or overload or attack the site.",
      ],
    },
    {
      heading: "Changes and availability",
      paragraphs: [
        "Journey is made by a small studio, with care. We'll keep it running as well as we can, but we can't promise it will always be available or free of mistakes. If we ever close it, we'll give you at least 30 days to save a copy of your reading, which you can also do any time from the page.",
      ],
    },
    {
      heading: "Responsibility",
      paragraphs: [
        "As far as the law allows, Journey is provided as it is, and Mythograph isn't responsible for indirect losses, or for decisions you make based on a reading. If we're ever responsible for a loss, our total responsibility is limited to what you paid for your reading. Nothing here limits rights you have by law that can't be limited.",
        "These terms are governed by the law of Georgia, U.S.A.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about these terms: ${CONTACT_EMAIL}.`],
    },
  ],
};

export const REFUNDS: LegalPage = {
  title: "Refund policy",
  lede: "Fourteen days, for any reason.",
  sections: [
    {
      heading: "The promise",
      paragraphs: [
        "If a Journey Narrative isn't right for you, you can have a full refund within 14 days of buying it, for any reason. You don't need to explain.",
      ],
    },
    {
      heading: "How to ask",
      paragraphs: [
        "Reply to your receipt from Paddle, or ask at paddle.net with the email you paid with. You can also write to " + CONTACT_EMAIL + " and we'll arrange it.",
        PADDLE_LINE,
      ],
    },
    {
      heading: "When the money comes back",
      paragraphs: [
        "Paddle returns the payment to the card or account you paid with. Banks usually take 5 to 10 working days to show it.",
      ],
    },
    {
      heading: "After 14 days",
      paragraphs: [
        "After 14 days, purchases aren't refundable, except where the law where you live says otherwise. If something has gone wrong with your reading, write to us anyway and we'll make it right.",
      ],
    },
  ],
};

export const PRIVACY: LegalPage = {
  title: "Privacy notice",
  lede: "What Journey keeps about you, why, and who helps us run it.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `Journey is made by Mythograph, the studio of Cléa Hernández. Write to ${CONTACT_EMAIL} about anything in this notice.`,
      ],
    },
    {
      heading: "What we keep",
      paragraphs: [
        "When you buy: your name and email, from Paddle (or Stripe, for earlier purchases), and the payment's reference. We never see or keep your card details.",
        "For your reading: the name you enter, your birth date, time and place, the reading written from them, and anything you fill in on the reading's four-week tracker.",
        "For the free chart: the birth details you enter are used to draw the chart and aren't kept.",
      ],
    },
    {
      heading: "Why",
      paragraphs: [
        "To write your reading, keep it at your private link, and email you the link and the note that it's ready. We don't sell your information, use it for advertising, or use your reading to train AI.",
      ],
    },
    {
      heading: "Who helps us",
      paragraphs: [
        "Netlify hosts the site and stores readings. Paddle takes payments as the seller of record (Stripe did before). Resend sends our emails. LocationIQ turns a birthplace into map coordinates. Each sees only what it needs for its part.",
      ],
    },
    {
      heading: "Emails",
      paragraphs: [
        "We email you twice: the link to your reading after you buy, and a note when the reading is ready. Nothing else, unless you sign up for something separately.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep your reading so your link keeps working. Ask us to delete it at any time and we will; the link then stops working, so save a copy first. Paddle keeps payment records as the law requires.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        `You can ask what we hold about you, ask us to correct it, or ask us to delete it, by writing to ${CONTACT_EMAIL}. If you're in the EU or UK, you can also complain to your data protection authority.`,
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "If we change this notice in a way that matters, we'll update the date at the top.",
      ],
    },
  ],
};
