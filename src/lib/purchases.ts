import { createHash, randomBytes } from "crypto";
import type { BirthData } from "./chart-engine/types.js";
import type { ChartSnapshot } from "./reading/chart-snapshot.js";

export interface Purchase {
  token: string;
  email: string;
  name: string;
  /** Stripe's checkout session id, or (for Paddle sales) Paddle's transaction id. */
  stripeSessionId: string;
  /** Who took the payment. Unset on older purchases, which were all Stripe. */
  provider?: "stripe" | "paddle";
  paidAt: string; // ISO timestamp
  birthData?: BirthData;
  narrative?: string;
  /** Chart saved with a Life Questions reading, so the page needn't re-geocode. */
  chart?: ChartSnapshot;
  /** Forces a reading format for this purchase (used by the private test path). */
  format?: "classic" | "life-questions";
  /** A free test reading: no Stripe payment, no narrative email. */
  test?: boolean;
  /** The reader's four-week tracker entries (Life Questions readings). */
  tracker?: Record<string, string | boolean>;
  /** When the site emailed her the link to her reading page (Resend, 24 Nov 2026). */
  linkEmailedAt?: string;
  /** When the site emailed her that the reading is written. */
  readyEmailedAt?: string;
}

// ── Token creation ─────────────────────────────────────────────────────────────

export function createPurchaseToken(email: string, sessionId: string): string {
  const secret = process.env.TOKEN_SECRET ?? "dev-secret-change-me";
  const rand = randomBytes(18).toString("base64url");
  const hmac = createHash("sha256")
    .update(`${secret}:${email}:${sessionId}`)
    .digest("hex")
    .slice(0, 12);
  return `jny_${hmac}${rand}`;
}

// ── Storage ───────────────────────────────────────────────────────────────────
// Uses @netlify/blobs in production, falls back to an in-process Map for local
// dev (not persistent across restarts, but fine for manual testing).

type Store = {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  keys(): Promise<string[]>;
};

const devMap = new Map<string, string>();

async function getStore(): Promise<Store> {
  try {
    const { getStore: netlifyGetStore } = await import("@netlify/blobs");
    const store = netlifyGetStore("journey-purchases");
    return {
      get: (k) => store.get(k),
      set: (k, v) => store.set(k, v),
      keys: async () => (await store.list()).blobs.map((b) => b.key),
    };
  } catch {
    // Local dev fallback
    return {
      get: async (k) => devMap.get(k) ?? null,
      set: async (k, v) => { devMap.set(k, v); },
      keys: async () => [...devMap.keys()],
    };
  }
}

export async function savePurchase(purchase: Purchase): Promise<void> {
  const store = await getStore();
  await store.set(purchase.token, JSON.stringify(purchase));
}

export async function getPurchase(token: string): Promise<Purchase | null> {
  const store = await getStore();
  const raw = await store.get(token);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Purchase;
  } catch {
    return null;
  }
}

export async function updatePurchase(token: string, updates: Partial<Omit<Purchase, "token">>): Promise<boolean> {
  const purchase = await getPurchase(token);
  if (!purchase) return false;
  await savePurchase({ ...purchase, ...updates });
  return true;
}

// ── Payment references ────────────────────────────────────────────────────────
// Paddle can send the same sale more than once; a small index from its
// transaction id to the purchase token makes a repeat do nothing.

export async function tokenForPaymentRef(ref: string): Promise<string | null> {
  const store = await getStore();
  return store.get(`ref:${ref}`);
}

export async function savePaymentRef(ref: string, token: string): Promise<void> {
  const store = await getStore();
  await store.set(`ref:${ref}`, token);
}

/** Every purchase (not the payment-reference index). For the missed-email catch-up. */
export async function listPurchases(): Promise<Purchase[]> {
  const store = await getStore();
  const keys = (await store.keys()).filter((k) => k.startsWith("jny_"));
  const out: Purchase[] = [];
  for (const k of keys) {
    const p = await getPurchase(k);
    if (p) out.push(p);
  }
  return out;
}
