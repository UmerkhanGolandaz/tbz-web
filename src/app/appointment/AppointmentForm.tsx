"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { stores, products } from "@/lib/data";
import { useAuth } from "@/components/AuthProvider";
import { useAppointments } from "@/components/AppointmentProvider";
import { useNotifications } from "@/components/NotificationProvider";
import { useDigitalGold } from "@/components/DigitalGoldProvider";

const TIMES = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const CATEGORIES = ["Gold", "Diamond", "Jadau", "Bridal", "Platinum", "Kalpavruksha", "General"];

export default function AppointmentForm() {
  const { user } = useAuth();
  const { book } = useAppointments();
  const { push } = useNotifications();
  const { reward } = useDigitalGold();
  const router = useRouter();
  const sp = useSearchParams();
  const productId = sp.get("product");
  const linkedProduct = useMemo(
    () => products.find((p) => p.id === productId),
    [productId]
  );

  const [storeId, setStoreId] = useState(stores[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState(
    linkedProduct
      ? linkedProduct.category.charAt(0).toUpperCase() + linkedProduct.category.slice(1)
      : "General"
  );
  const [notes, setNotes] = useState(
    linkedProduct
      ? `Interested in viewing: ${linkedProduct.name} (${linkedProduct.id.toUpperCase()})`
      : ""
  );
  const [submitted, setSubmitted] = useState<null | { id: string }>(null);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setDate(d.toISOString().slice(0, 10));
  }, []);

  if (!user) {
    return (
      <section className="max-w-md mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl mb-3">Book an Appointment</h1>
        <p className="text-[var(--muted)] mb-8">
          Please sign in to schedule a personal preview at a TBZ boutique.
        </p>
        <Link href="/login" className="btn-gold inline-block">
          Sign In to Continue
        </Link>
      </section>
    );
  }

  const submit = () => {
    if (!date || !time) return;
    const a = book({ storeId, date, time, category, notes });
    const s = stores.find((x) => x.id === storeId);
    push({
      kind: "appointment",
      title: "Appointment confirmed",
      body: `${s?.area}, ${s?.city} · ${date} at ${time}. Reference ${a.id.toUpperCase()}.`,
      href: "/account",
    });
    const bonus = 0.05;
    reward(bonus, "Appointment booking bonus");
    push({
      kind: "gold",
      title: "You earned digital gold",
      body: `${bonus.toFixed(3)} g credited as a booking bonus.`,
      href: "/digital-gold",
    });
    setSubmitted({ id: a.id });
  };

  if (submitted) {
    const s = stores.find((x) => x.id === storeId);
    return (
      <section className="max-w-lg mx-auto px-6 py-16 text-center">
        <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">Confirmed</p>
        <h1 className="text-4xl mt-2 mb-4">Your appointment is booked</h1>
        <div className="gold-divider my-6 max-w-[160px] mx-auto" />
        <p className="text-[var(--muted)]">
          Reference <strong>{submitted.id.toUpperCase()}</strong>
        </p>
        <div className="mt-6 inline-block text-left text-sm bg-[var(--bg-alt)] px-6 py-5 rounded-sm">
          <p><strong>{s?.area}</strong>, {s?.city}</p>
          <p className="text-[var(--muted)]">{s?.address}</p>
          <p className="mt-2">{date} at {time}</p>
          <p>Category: {category}</p>
        </div>
        <p className="mt-8 text-sm text-[var(--muted)]">
          Our boutique team will reach out on {user.identifier} to confirm.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="btn-gold inline-flex items-center gap-2 px-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Done</span>
          </button>
          <Link
            href="/account"
            className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] hover:underline underline-offset-4"
          >
            View my appointments
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-center text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
        Personal Preview
      </p>
      <h1 className="text-center text-4xl md:text-5xl mt-2 mb-3">Book an Appointment</h1>
      <p className="text-center text-[var(--muted)] mb-2">
        Select your nearest TBZ boutique and a convenient time. A jewellery
        consultant will be ready for your private preview.
      </p>
      <div className="gold-divider my-8 max-w-xs mx-auto" />

      {linkedProduct && (
        <div className="bg-[var(--bg-alt)] p-4 mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-white relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={linkedProduct.image}
              alt={linkedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm">
            <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">Viewing</p>
            <p>{linkedProduct.name}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <Field label="Boutique">
          <select
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.city} · {s.area}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Pick a Date">
          <DateStrip selected={date} onSelect={setDate} />
        </Field>

        <Field label="Time Slot">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="">Select…</option>
              {TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

        <Field label="Category of Interest">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Notes (optional)">
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us about your preferences, budget or occasion"
            className="w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
          />
        </Field>

        <button onClick={submit} disabled={!date || !time} className="btn-gold w-full disabled:opacity-50">
          Confirm Appointment
        </button>

        <p className="text-center text-xs text-[var(--muted)]">
          Free of cost · Reschedule anytime up to 4 hours before your visit
        </p>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-brand uppercase text-[var(--muted)]">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function DateStrip({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sel = selected ? new Date(selected + "T00:00:00") : today;
  const [view, setView] = useState({
    year: sel.getFullYear(),
    month: sel.getMonth(),
  });

  const monthStart = new Date(view.year, view.month, 1);
  const monthEnd = new Date(view.year, view.month + 1, 0);
  const daysInMonth = monthEnd.getDate();

  const days: Date[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(view.year, view.month, i);
    d.setHours(0, 0, 0, 0);
    if (d >= today) days.push(d);
  }

  const atCurrentMonth =
    view.year === today.getFullYear() && view.month === today.getMonth();
  const canGoPrev = !atCurrentMonth;

  const goPrev = () => {
    const m = view.month - 1;
    setView(
      m < 0 ? { year: view.year - 1, month: 11 } : { year: view.year, month: m }
    );
  };
  const goNext = () => {
    const m = view.month + 1;
    setView(
      m > 11 ? { year: view.year + 1, month: 0 } : { year: view.year, month: m }
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-1 mb-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="p-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold-dark)] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--muted)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-sm text-[var(--gold-dark)] serif">
          {MONTH_NAMES[view.month]} {view.year}
        </p>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="p-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--gold-dark)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[9px] tracking-[0.16em] text-[var(--muted)] mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={"pad-" + i} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = new Date(view.year, view.month, i + 1);
          d.setHours(0, 0, 0, 0);
          const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          const past = d < today;
          const isSel = iso === selected;
          const isToday = d.toDateString() === today.toDateString();
          return (
            <button
              type="button"
              key={iso}
              onClick={() => !past && onSelect(iso)}
              disabled={past}
              aria-pressed={isSel}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition ${
                isSel
                  ? "bg-[var(--gold)] text-white"
                  : past
                    ? "text-[var(--muted)] opacity-40 cursor-not-allowed"
                    : "text-[var(--fg)] hover:bg-[var(--bg-alt)]"
              } ${isToday && !isSel ? "ring-1 ring-[var(--gold)]" : ""}`}
            >
              <span className="serif leading-none">{d.getDate()}</span>
              {isToday && (
                <span className={`text-[8px] tracking-brand uppercase mt-0.5 ${isSel ? "opacity-90" : "text-[var(--gold-dark)]"}`}>
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
