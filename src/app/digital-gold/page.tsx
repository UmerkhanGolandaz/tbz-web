"use client";

import { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";
import { useDigitalGold } from "@/components/DigitalGoldProvider";
import { useNotifications } from "@/components/NotificationProvider";

const PRESETS_INR = [500, 1000, 2500, 5000, 10000];

export default function DigitalGold() {
  const { user } = useAuth();
  const { balanceGrams, ratePerGram, txns, buyInr, sellGrams } = useDigitalGold();
  const { push } = useNotifications();
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState(1000);
  const [sellG, setSellG] = useState(0.1);
  const [flash, setFlash] = useState<string | null>(null);

  if (!user) {
    return (
      <section className="max-w-md mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl mb-3">Digital Gold</h1>
        <p className="text-[var(--muted)] mb-8">
          Sign in to buy 24kt digital gold from the comfort of your home.
        </p>
        <Link href="/login" className="btn-gold inline-block">Sign In</Link>
      </section>
    );
  }

  const buy = () => {
    const t = buyInr(amount);
    push({
      kind: "gold",
      title: "Digital gold purchased",
      body: `${t.grams.toFixed(4)} g credited to your vault.`,
      href: "/digital-gold",
    });
    setFlash(`Bought ${t.grams.toFixed(4)} g for ${formatINR(amount)}`);
  };
  const sell = () => {
    const t = sellGrams(sellG);
    if (!t) {
      setFlash("Insufficient balance");
      return;
    }
    push({
      kind: "gold",
      title: "Digital gold redeemed",
      body: `${t.grams.toFixed(4)} g sold for ${formatINR(t.amountInr)}.`,
      href: "/digital-gold",
    });
    setFlash(`Sold ${t.grams.toFixed(4)} g for ${formatINR(t.amountInr)}`);
  };

  const inrValue = balanceGrams * ratePerGram;

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-center text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
        TBZ Gold Vault
      </p>
      <h1 className="text-center text-4xl md:text-5xl mt-2 mb-3">Digital Gold</h1>
      <p className="text-center text-[var(--muted)] max-w-xl mx-auto">
        24kt 999.9 fine gold, stored in insured vaults. Buy from ₹100, redeem any time
        in cash or against TBZ jewellery.
      </p>
      <div className="gold-divider my-8 max-w-xs mx-auto" />

      <div className="bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-white p-7">
        <p className="text-[11px] tracking-brand uppercase opacity-90">Your Vault</p>
        <p className="serif text-5xl mt-1">{balanceGrams.toFixed(4)} <span className="text-2xl">g</span></p>
        <p className="text-sm opacity-90 mt-1">≈ {formatINR(Math.round(inrValue))}</p>
        <div className="gold-divider my-5 opacity-60" />
        <div className="flex justify-between text-xs">
          <div>
            <p className="opacity-80">Live rate</p>
            <p className="text-base mt-0.5">{formatINR(ratePerGram)} / g</p>
          </div>
          <div className="text-right">
            <p className="opacity-80">Purity</p>
            <p className="text-base mt-0.5">24kt 999.9</p>
          </div>
        </div>
      </div>

      <div className="flex border border-[var(--border)] mt-8">
        <button
          onClick={() => setMode("buy")}
          className={`flex-1 py-2.5 text-[11px] tracking-brand uppercase ${
            mode === "buy" ? "bg-[var(--gold)] text-white" : "text-[var(--muted)]"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setMode("sell")}
          className={`flex-1 py-2.5 text-[11px] tracking-brand uppercase ${
            mode === "sell" ? "bg-[var(--gold)] text-white" : "text-[var(--muted)]"
          }`}
        >
          Sell
        </button>
      </div>

      {mode === "buy" ? (
        <div className="mt-6 space-y-5">
          <div>
            <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mb-2">Amount</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS_INR.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`px-3 py-1.5 text-sm border ${
                    amount === v
                      ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                      : "border-[var(--border)]"
                  }`}
                >
                  {formatINR(v)}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="mt-3 w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
            <p className="text-xs text-[var(--muted)] mt-2">
              You will receive ~{(amount / ratePerGram).toFixed(4)} g at {formatINR(ratePerGram)}/g
            </p>
          </div>
          <button onClick={buy} disabled={amount < 100} className="btn-gold w-full disabled:opacity-50">
            Buy Gold for {formatINR(amount)}
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div>
            <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mb-2">Grams</p>
            <input
              type="number"
              step={0.001}
              min={0}
              max={balanceGrams}
              value={sellG}
              onChange={(e) => setSellG(Number(e.target.value) || 0)}
              className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
            <p className="text-xs text-[var(--muted)] mt-2">
              You will receive {formatINR(Math.round(sellG * ratePerGram))} · max {balanceGrams.toFixed(4)} g
            </p>
          </div>
          <button
            onClick={sell}
            disabled={sellG <= 0 || sellG > balanceGrams}
            className="btn-outline w-full disabled:opacity-50"
          >
            Sell {sellG.toFixed(4)} g
          </button>
        </div>
      )}

      {flash && (
        <p className="mt-4 text-center text-sm text-[var(--gold-dark)]">{flash}</p>
      )}

      <div className="mt-12">
        <h2 className="text-2xl mb-4">Transaction History</h2>
        {txns.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {txns.map((t) => (
              <li key={t.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm capitalize">
                    {t.type === "reward" ? "Reward credit" : t.type}
                    {t.note ? ` · ${t.note}` : ""}
                  </p>
                  <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mt-0.5">
                    {new Date(t.createdAt).toLocaleString("en-IN")} · @ {formatINR(t.ratePerGram)}/g
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm ${
                      t.type === "sell" ? "text-red-600" : "text-[var(--gold-dark)]"
                    }`}
                  >
                    {t.type === "sell" ? "-" : "+"}
                    {t.grams.toFixed(4)} g
                  </p>
                  <p className="text-[11px] tracking-brand uppercase text-[var(--muted)]">
                    {formatINR(t.amountInr)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="gold-divider my-12 max-w-xs mx-auto" />

      <div className="grid sm:grid-cols-3 gap-6 text-sm text-[var(--muted)]">
        <div>
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-1">
            24kt Purity
          </p>
          <p>999.9 fine gold, BIS hallmarked.</p>
        </div>
        <div>
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-1">
            Insured Vault
          </p>
          <p>Stored at IDBI Trusteeship secured vaults.</p>
        </div>
        <div>
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-1">
            Redeem As
          </p>
          <p>Cash, jewellery or physical coin.</p>
        </div>
      </div>
    </section>
  );
}
