/**
 * Journey's own emails (24 Nov 2026), sent by the site through Resend, the
 * service Story Loom uses, from the same Mythograph address. Before this the
 * site handed every email to Make.com webhooks with no scenario behind them,
 * so no Journey email went out (found 22 Nov: items waiting in Make's queue).
 * No SDK: one HTTPS call, so nothing new to install.
 */

export const FROM_EMAIL = "Mythograph <noreply@mythograph.co>";

export interface OutgoingEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export type SendResult = { ok: true; id: string } | { ok: false; error: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** The first name, for the greeting; empty when there's none. */
export function firstName(name: string | undefined | null): string {
  return (name ?? "").trim().split(/\s+/)[0] ?? "";
}

function page(paragraphs: string[], linkUrl: string, linkLabel: string, footnote: string): string {
  const body = paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3a3530;">${esc(p)}</p>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:'DM Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
<tr><td style="padding-bottom:24px;text-align:center;"><p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#3A4F99;">Mythograph · Journey Narrative</p></td></tr>
<tr><td style="background:#ffffff;border-radius:16px;border:1px solid #e2e4e9;padding:36px 32px;">
${body}
<table cellpadding="0" cellspacing="0" style="margin:8px 0 20px;"><tr><td style="background:#3A4F99;border-radius:10px;">
<a href="${esc(linkUrl)}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">${esc(linkLabel)} →</a>
</td></tr></table>
<p style="margin:0;font-size:13px;color:#75685A;line-height:1.5;">${esc(footnote)}</p>
</td></tr>
<tr><td style="padding-top:20px;text-align:center;"><p style="margin:0;font-size:12px;color:#75685A;">Journey Narrative by <a href="https://mythograph.co" style="color:#3A4F99;text-decoration:none;">Mythograph</a></p></td></tr>
</table></td></tr></table></body></html>`;
}

/** Right after paying: the private link to her reading page, where she adds her birth details. */
export function linkEmail(p: { to: string; name?: string; readingUrl: string; provider?: "stripe" | "paddle" }): OutgoingEmail {
  const hi = firstName(p.name);
  const paragraphs = [
    `${hi ? `${hi}, thank` : "Thank"} you. Your Journey Narrative is ready to begin.`,
    "Open your reading page and add your birth date, time and place. Your reading is made from them, and it stays at the same link whenever you want to come back to it.",
  ];
  const footnote = `Keep this email: the link is private to you, and it's your way back to your reading.${p.provider === "paddle" ? " Your receipt comes separately from Paddle, who handles the payment." : ""}`;
  return {
    to: p.to,
    subject: "Your Journey Narrative is ready to begin",
    html: page(paragraphs, p.readingUrl, "Open my reading", footnote),
    text: [...paragraphs, `Open my reading: ${p.readingUrl}`, footnote].join("\n\n"),
  };
}

/** Once the reading is written: the same link, now with the reading on it. */
export function readyEmail(p: { to: string; name?: string; readingUrl: string }): OutgoingEmail {
  const hi = firstName(p.name);
  const paragraphs = [
    `${hi ? `${hi}, your` : "Your"} Journey Narrative is ready.`,
    "Read it at your own pace. It stays at this link, and you can save a copy as a PDF from the page.",
  ];
  const footnote = "The link is private to you. Keep this email to find your way back.";
  return {
    to: p.to,
    subject: "Your Journey Narrative is ready",
    html: page(paragraphs, p.readingUrl, "Read my Journey Narrative", footnote),
    text: [...paragraphs, `Read my Journey Narrative: ${p.readingUrl}`, footnote].join("\n\n"),
  };
}

/** Sends through Resend. Never throws: a failed send comes back as { ok: false } so the caller decides. */
export async function sendEmail(email: OutgoingEmail, apiKey: string | undefined, fetchImpl: typeof fetch = fetch): Promise<SendResult> {
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };
  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM_EMAIL, to: [email.to], subject: email.subject, html: email.html, text: email.text }),
    });
    const body = (await res.json().catch(() => null)) as { id?: string; message?: string; name?: string } | null;
    if (!res.ok || !body?.id) return { ok: false, error: `Resend ${res.status}: ${body?.message ?? body?.name ?? "no id"}` };
    return { ok: true, id: body.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}
