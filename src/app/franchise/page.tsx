"use client";

import { useState } from "react";

export default function Franchise() {
  const [form, set] = useState({ name: "", phone: "", email: "", city: "", message: "" });
  const [done, setDone] = useState(false);

  const submit = () => {
    if (form.name && form.phone && form.city) setDone(true);
  };

  if (done) {
    return (
      <section className="max-w-lg mx-auto px-6 py-20 text-center">
        <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">Received</p>
        <h1 className="text-4xl mt-2 mb-4">Thank you for your interest</h1>
        <p className="text-[var(--muted)]">
          Our franchise team will reach out to you within 48 hours.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-center text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
        Partner With Us
      </p>
      <h1 className="text-center text-4xl md:text-5xl mt-2 mb-3">Franchise Enquiry</h1>
      <p className="text-center text-[var(--muted)] max-w-xl mx-auto">
        Take part in 160 years of heritage. Bring TBZ · The Original to your city.
      </p>
      <div className="gold-divider my-8 max-w-xs mx-auto" />

      <div className="space-y-5">
        {([
          ["name", "Full Name", "text"],
          ["phone", "Mobile Number", "tel"],
          ["email", "Email", "email"],
          ["city", "City of Interest", "text"],
        ] as const).map(([k, label, type]) => (
          <label key={k} className="block">
            <span className="text-[11px] tracking-brand uppercase text-[var(--muted)]">{label}</span>
            <input
              type={type}
              value={form[k]}
              onChange={(e) => set({ ...form, [k]: e.target.value })}
              className="mt-1 w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
          </label>
        ))}
        <label className="block">
          <span className="text-[11px] tracking-brand uppercase text-[var(--muted)]">Tell us about yourself</span>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => set({ ...form, message: e.target.value })}
            className="mt-1 w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
          />
        </label>
        <button onClick={submit} className="btn-gold w-full">Submit Enquiry</button>
      </div>
    </section>
  );
}
