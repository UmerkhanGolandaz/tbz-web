import Image from "next/image";

export const metadata = { title: "Our Heritage · TBZ" };

const milestones = [
  ["1864", "Shri Tribhovandas Bhimji Zaveri founds TBZ in Mumbai's Zaveri Bazaar."],
  ["1936", "Crafted the famed Sir Cusrow Wadia diamond-set tiara."],
  ["1985", "Awarded official 'Jewellers to the Maharajas' honour."],
  ["2010", "Listed on BSE & NSE · among the first Indian jewellery houses to do so."],
  ["2018", "Launched Kalpavruksha, India's most loved gold savings plan."],
  ["Today", "30+ boutiques across India, six generations of trust."],
];

export default function About() {
  return (
    <>
      <section className="relative h-[44vh] min-h-[300px]">
        <Image
          src="/img/1602173574767-37ac01994b2a.jpg"
          alt="TBZ heritage"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-[11px] tracking-brand uppercase opacity-80">Since 1864</p>
          <h1 className="text-5xl md:text-6xl mt-2">Our Heritage</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-center text-[var(--muted)] leading-relaxed">
          Tribhovandas Bhimji Zaveri opened a modest jewellery store in Mumbai&apos;s
          Zaveri Bazaar in 1864. Six generations later, TBZ · The Original is one of
          India&apos;s most-loved jewellery houses, marrying centuries-old craftsmanship
          with contemporary design and uncompromising trust.
        </p>
        <div className="gold-divider my-12 max-w-xs mx-auto" />

        <div className="space-y-6">
          {milestones.map(([year, text]) => (
            <div key={year} className="grid grid-cols-[80px_1fr] gap-4 items-start">
              <p className="text-[var(--gold-dark)] serif text-2xl">{year}</p>
              <p className="text-[var(--muted)] leading-relaxed pt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
