const items = [
  "Free home preview in 12+ cities",
  "BIS Hallmarked 22kt gold",
  "IGI / SGL certified diamonds",
  "Lifetime polish & cleaning",
  "160+ years of heritage since 1864",
  "Buy 24kt digital gold from ₹100",
  "Exchange & buyback at any boutique",
  "Hand-finished by master karigars",
];

export default function Marquee() {
  const row = (
    <div className="flex items-center gap-10 px-5 shrink-0">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="text-[11px] tracking-brand uppercase whitespace-nowrap">{t}</span>
          <span className="text-[var(--gold)]" aria-hidden>✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="What we promise"
      className="bg-gradient-to-r from-[var(--gold-light)] via-[#f1e4c4] to-[var(--gold-light)] text-[var(--gold-dark)] border-y border-[var(--gold-light)] overflow-hidden"
    >
      <div className="marquee-track flex py-3">
        {row}
        {row}
      </div>
    </section>
  );
}
