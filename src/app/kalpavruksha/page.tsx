"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";

export default function Kalpavruksha() {
  const { user } = useAuth();
  const [monthly, setMonthly] = useState(5000);
  const [months, setMonths] = useState<11 | 17>(11);

  const summary = useMemo(() => {
    const youPay = monthly * months;
    const tbzBonus = monthly; // 12th / 18th instalment paid by TBZ
    const total = youPay + tbzBonus;
    return { youPay, tbzBonus, total };
  }, [monthly, months]);

  return (
    <>
      <section className="relative h-[36vh] min-h-[260px]">
        <Image
          src="/tbz-web/img/1633934542430-9d4a1f8c0c39.jpg"
          alt="Kalpavruksha"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <p className="text-[11px] tracking-brand uppercase opacity-80">Gold Savings Plan</p>
          <h1 className="text-5xl md:text-6xl mt-2">Kalpavruksha</h1>
          <p className="opacity-90 mt-2 text-sm">The wish-fulfilling gold tree</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-[var(--muted)] leading-relaxed">
          Save smart, gift yourself the jewellery of your dreams. Pay a monthly
          instalment of your choice · TBZ adds the final instalment as a bonus. At
          maturity, choose any jewellery from the entire TBZ collection.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="border border-[var(--border)] p-8 bg-white">
          <h2 className="text-2xl mb-6 text-center">Plan Calculator</h2>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mb-3">
                Monthly Instalment
              </p>
              <div className="flex flex-wrap gap-2">
                {[2000, 5000, 10000, 25000, 50000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMonthly(v)}
                    className={`px-3 py-1.5 text-sm border ${
                      monthly === v
                        ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {formatINR(v)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mb-3">
                Plan Duration
              </p>
              <div className="flex gap-3">
                {[
                  { v: 11, label: "12 months (pay 11)" },
                  { v: 17, label: "18 months (pay 17)" },
                ].map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setMonths(o.v as 11 | 17)}
                    className={`flex-1 px-3 py-2.5 text-xs border ${
                      months === o.v
                        ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--bg-alt)] p-5 grid grid-cols-3 gap-3 text-center">
              <Stat label="You pay" value={formatINR(summary.youPay)} />
              <Stat label="TBZ bonus" value={formatINR(summary.tbzBonus)} accent />
              <Stat label="Total value" value={formatINR(summary.total)} />
            </div>

            <Link
              href={user ? "/appointment?store=s-mum-zaveri" : "/login"}
              className="btn-gold w-full text-center block"
            >
              {user ? "Start Kalpavruksha at a Boutique" : "Sign In to Enrol"}
            </Link>
            <p className="text-xs text-[var(--muted)] text-center">
              · Enrolment finalised at any TBZ boutique · GST extra on metal value at
              redemption · Terms apply
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-5">
          <h3 className="text-2xl">How it works</h3>
          {[
            ["1.", "Choose your monthly instalment and plan duration."],
            ["2.", "Pay each month · at the boutique, by NEFT, or via UPI."],
            ["3.", "On the last instalment, TBZ adds a bonus instalment."],
            ["4.", "Redeem against any jewellery across the TBZ collection."],
          ].map(([n, t]) => (
            <div key={n} className="flex gap-4">
              <span className="text-[var(--gold-dark)] serif text-xl">{n}</span>
              <p className="text-[var(--muted)]">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">{label}</p>
      <p className={`mt-1 text-lg ${accent ? "text-[var(--gold-dark)]" : ""}`}>{value}</p>
    </div>
  );
}
