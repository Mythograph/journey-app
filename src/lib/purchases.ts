import { createHash, randomBytes } from "crypto";
import type { BirthData } from "./chart-engine/types.js";

export interface Purchase {
  token: string;
  email: string;
  name: string;
  stripeSessionId: string;
  paidAt: string; // ISO timestamp
  birthData?: BirthData;
  narrative?: string;
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
};

const devMap = new Map<string, string>();

async function getStore(): Promise<Store> {
  try {
    const { getStore: netlifyGetStore } = await import("@netlify/blobs");
    const store = netlifyGetStore("journey-purchases");
    return {
      get: (k) => store.get(k),
      set: (k, v) => store.set(k, v),
    };
  } catch {
    // Local dev fallback
    return {
      get: async (k) => devMap.get(k) ?? null,
      set: async (k, v) => { devMap.set(k, v); },
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
