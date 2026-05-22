export const metadata = { title: "Contact · TBZ" };

export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-center text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
        We&apos;re Here
      </p>
      <h1 className="text-center text-4xl md:text-5xl mt-2 mb-3">Contact TBZ</h1>
      <div className="gold-divider my-8 max-w-xs mx-auto" />

      <div className="grid md:grid-cols-2 gap-10 text-[var(--muted)]">
        <div>
          <h3 className="text-xl text-[var(--fg)] mb-2">Customer Care</h3>
          <p>+91 22 4045 1000</p>
          <p>customercare@tbz.in</p>
          <p className="mt-3 text-sm">Mon–Sat, 10:00 · 19:00 IST</p>
        </div>
        <div>
          <h3 className="text-xl text-[var(--fg)] mb-2">Registered Office</h3>
          <p>
            Tribhovandas Bhimji Zaveri Ltd.
            <br />
            241/43, Zaveri Bazaar, Kalbadevi Road
            <br />
            Mumbai 400002, India
          </p>
        </div>
      </div>
    </section>
  );
}
