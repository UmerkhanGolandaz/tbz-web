"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type GoldTxn = {
  id: string;
  type: "buy" | "sell" | "reward";
  grams: number;
  ratePerGram: number;
  amountInr: number;
  createdAt: string;
  note?: string;
};

type Ctx = {
  balanceGrams: number;
  ratePerGram: number;
  txns: GoldTxn[];
  buyInr: (inr: number) => GoldTxn;
  buyGrams: (g: number) => GoldTxn;
  sellGrams: (g: number) => GoldTxn | null;
  reward: (g: number, note?: string) => GoldTxn;
};

const C = createContext<Ctx | null>(null);

// Static demo rate (₹ / gram of 24kt). Real app would pull from a price feed.
const RATE = 7484;

export function DigitalGoldProvider({ children }: { children: ReactNode }) {
  const [txns, setTxns] = useState<GoldTxn[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tbz.gold");
      if (raw) setTxns(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: GoldTxn[]) => {
    localStorage.setItem("tbz.gold", JSON.stringify(next));
    setTxns(next);
  };

  const balanceGrams = txns.reduce((acc, t) => {
    if (t.type === "sell") return acc - t.grams;
    return acc + t.grams;
  }, 0);

  const make = (t: Omit<GoldTxn, "id" | "createdAt">): GoldTxn => ({
    ...t,
    id: "g_" + Math.random().toString(36).slice(2, 9),
    createdAt: new Date().toISOString(),
  });

  return (
    <C.Provider
      value={{
        balanceGrams,
        ratePerGram: RATE,
        txns,
        buyInr(inr) {
          const grams = Math.round((inr / RATE) * 10000) / 10000;
          const t = make({ type: "buy", grams, ratePerGram: RATE, amountInr: inr });
          persist([t, ...txns]);
          return t;
        },
        buyGrams(g) {
          const t = make({ type: "buy", grams: g, ratePerGram: RATE, amountInr: Math.round(g * RATE) });
          persist([t, ...txns]);
          return t;
        },
        sellGrams(g) {
          if (g > balanceGrams) return null;
          const t = make({ type: "sell", grams: g, ratePerGram: RATE, amountInr: Math.round(g * RATE) });
          persist([t, ...txns]);
          return t;
        },
        reward(g, note) {
          const t = make({ type: "reward", grams: g, ratePerGram: RATE, amountInr: Math.round(g * RATE), note });
          persist([t, ...txns]);
          return t;
        },
      }}
    >
      {children}
    </C.Provider>
  );
}

export function useDigitalGold() {
  const v = useContext(C);
  if (!v) throw new Error("useDigitalGold must be used inside DigitalGoldProvider");
  return v;
}
