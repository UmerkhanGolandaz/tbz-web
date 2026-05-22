"use client";

import { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

const DENOMS = [5000, 11000, 21000, 51000];

export default function GiftCards() {
  const { user } = useAuth();
  const [amount, setAmount] = useState(11000);
  const [custom, setCustom] = useState("");
  const [to, setTo] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState<null | { code: string }>(null);

  const finalAmount = custom ? Number(custom) : amount;
  const valid = finalAmount >= 1000 && to.name && (to.email || to.phone);

  const send = () => {
    if (!valid) return;
    setSent({ code: "TBZ-" + Math.random().toString(36).slice(2, 10).toUpperCase() });
  };

  if (sent) {
    return (
      <section className="max-w-lg mx-auto px-6 py-16 text-center">
        <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">Sent</p>
        <h1 className="text-4xl mt-2 mb-4">Your gift is on its way</h1>
        <div className="gold-divider my-6 max-w-[160px] mx-auto" />
        <p className="text-[var(--muted)]">Gift Card Code</p>
        <p className="text-2xl tracking-[0.3em] mt-2">{sent.code}</p>
        <p className="mt-6 text-sm text-[var(--muted)]">
          {formatINR(finalAmount)} delivered to {to.email || to.phone}
        </p>
        <Link href="/" className="btn-gold inline-block mt-8">Back to Home</Link>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-center text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
        A Gift of Gold
      </p>
      <h1 className="text-center text-4xl md:text-5xl mt-2 mb-3">TBZ Gift Cards</h1>
      <p className="text-center text-[var(--muted)] max-w-xl mx-auto">
        Let your loved ones choose from the entire TBZ collection. Redeemable in-store
        and online across India.
      </p>
      <div className="gold-divider my-8 max-w-xs mx-auto" />

      {!user ? (
        <p className="text-center">
          <Link href="/login" className="btn-gold inline-block">Sign In to Buy</Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative aspect-[3/2] bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] p-7 text-white flex flex-col justify-between">
            <div className="text-[10px] tracking-brand uppercase opacity-90">TBZ Gift Card</div>
            <div>
              <p className="text-3xl serif">{formatINR(finalAmount || 0)}</p>
              <p className="text-[11px] tracking-brand uppercase opacity-90 mt-2">
                {to.name ? `For ${to.name}` : "For someone special"}
              </p>
            </div>
            <p className="text-[10px] tracking-brand uppercase opacity-80">
              Redeemable at any TBZ boutique
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mb-2">
                Choose Amount
              </p>
              <div className="flex flex-wrap gap-2">
                {DENOMS.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setAmount(d);
                      setCustom("");
                    }}
                    className={`px-3 py-1.5 text-sm border ${
                      !custom && amount === d
                        ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {formatINR(d)}
                  </button>
                ))}
              </div>
              <input
                placeholder="Custom amount (min ₹1,000)"
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                className="mt-3 w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
              />
            </div>

            <input
              placeholder="Recipient name"
              value={to.name}
              onChange={(e) => setTo({ ...to, name: e.target.value })}
              className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
            <input
              placeholder="Recipient email"
              type="email"
              value={to.email}
              onChange={(e) => setTo({ ...to, email: e.target.value })}
              className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
            <input
              placeholder="Recipient phone (optional)"
              value={to.phone}
              onChange={(e) => setTo({ ...to, phone: e.target.value })}
              className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
            <textarea
              rows={2}
              placeholder="Personal message"
              value={to.message}
              onChange={(e) => setTo({ ...to, message: e.target.value })}
              className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />

            <button
              onClick={send}
              disabled={!valid}
              className="btn-gold w-full disabled:opacity-50"
            >
              Send Gift Card
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
