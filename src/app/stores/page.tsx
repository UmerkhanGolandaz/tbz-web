"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { stores } from "@/lib/data";

export default function StoresPage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState<string>("All");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(stores.map((s) => s.city)))],
    []
  );

  const filtered = stores.filter((s) => {
    const matchCity = city === "All" || s.city === city;
    const t = q.trim().toLowerCase();
    const matchQ =
      !t ||
      s.city.toLowerCase().includes(t) ||
      s.area.toLowerCase().includes(t) ||
      s.address.toLowerCase().includes(t);
    return matchCity && matchQ;
  });

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-center text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
        Visit Us
      </p>
      <h1 className="text-center text-4xl md:text-5xl mt-2 mb-3">Store Locator</h1>
      <p className="text-center text-[var(--muted)]">
        Find your nearest TBZ · The Original boutique
      </p>
      <div className="gold-divider my-8 max-w-xs mx-auto" />

      <div className="grid sm:grid-cols-[1fr_220px] gap-4 mb-10">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search city, area or PIN"
          className="w-full border border-[var(--border)] px-4 py-3 focus:outline-none focus:border-[var(--gold)]"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-[var(--border)] px-4 py-3 focus:outline-none focus:border-[var(--gold)]"
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((s) => (
          <article key={s.id} className="border border-[var(--border)] p-6 bg-white">
            <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">
              {s.city}
            </p>
            <h3 className="text-2xl mt-1">{s.area}</h3>
            <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{s.address}</p>
            <p className="text-sm mt-3">{s.phone}</p>
            <p className="text-xs text-[var(--muted)]">{s.hours}</p>
            <div className="flex items-center gap-4 mt-5">
              <Link
                href={`/appointment?store=${s.id}`}
                className="inline-flex items-center text-[10px] tracking-brand uppercase border border-[var(--gold)] text-[var(--gold-dark)] rounded-full px-3 py-1.5 whitespace-nowrap hover:bg-[var(--gold)] hover:text-white"
              >
                Book Appointment
              </Link>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  s.address
                )}`}
                className="text-[10px] tracking-brand uppercase text-[var(--muted)] hover:text-[var(--fg)] whitespace-nowrap"
              >
                Get Directions →
              </a>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[var(--muted)] py-10 col-span-full">
            No boutiques match your search. Try another city.
          </p>
        )}
      </div>
    </section>
  );
}
