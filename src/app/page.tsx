import Link from "next/link";
import Image from "next/image";
import { collections, products, formatINR } from "@/lib/data";
import Marquee from "@/components/Marquee";
import HomeAppHeader from "@/components/HomeAppHeader";

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <>
      <HomeAppHeader />

      {/* hero (desktop only - replaced by app-style header on mobile) */}
      <section className="hidden lg:block relative h-[68vh] min-h-[460px] md:h-[72vh] md:min-h-[480px] overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="TBZ bridal jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 text-white">
          <p className="text-[10px] md:text-[11px] tracking-brand uppercase opacity-80">
            Since 1864
          </p>
          <h1 className="text-[2rem] leading-[1.05] md:text-7xl mt-3 mb-4 md:mb-5 text-balance max-w-[18ch] md:max-w-none">
            The Heritage of Indian Jewellery
          </h1>
          <p className="max-w-[34ch] md:max-w-xl text-[13px] md:text-base opacity-90 text-balance">
            Six generations of craftsmanship, every piece a story.
          </p>
          <div className="mt-7 md:mt-8 w-full md:w-auto flex flex-col md:flex-row justify-center gap-3 md:gap-4 max-w-[280px] md:max-w-none">
            <Link
              href="/collections"
              className="btn-gold w-full md:w-auto text-center"
            >
              Shop Collections
            </Link>
            <Link
              href="/appointment"
              className="btn-outline w-full md:w-auto text-center"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.85)" }}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* mobile banner card */}
      <section className="lg:hidden px-5 pt-2">
        <Link
          href="/collections/bridal"
          className="relative block aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <Image
            src="/hero.jpg"
            alt="TBZ bridal"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 text-white">
            <p className="text-[10px] tracking-brand uppercase opacity-90">Featured Capsule</p>
            <p className="text-2xl serif mt-1 leading-tight">The Bridal Atelier</p>
            <span className="inline-block mt-3 text-[10px] tracking-brand uppercase border border-white/70 rounded-full px-3 py-1">
              Explore →
            </span>
          </div>
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pt-6 lg:pt-14 pb-10 lg:pb-16">
        <div className="flex items-end justify-between mb-5 lg:mb-8">
          <div>
            <p className="text-[10px] lg:text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
              Featured
            </p>
            <h2 className="text-2xl lg:text-4xl mt-1 lg:mt-2">New arrivals this season</h2>
          </div>
          <Link
            href="/collections"
            className="text-[10px] lg:text-[11px] tracking-brand uppercase text-[var(--muted)] hover:text-[var(--fg)]"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
          {featured.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group bg-white">
              <div className="relative aspect-square overflow-hidden bg-[var(--bg-alt)]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="pt-3">
                <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">
                  {p.type}
                </p>
                <h4 className="text-sm lg:text-base mt-1 leading-tight">{p.name}</h4>
                <p className="mt-1.5 text-[var(--gold-dark)] text-sm">{formatINR(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hidden lg:block bg-[var(--bg-alt)] py-6">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { t: "Heritage", s: "Crafted since 1864" },
            { t: "Hallmark", s: "BIS-certified gold" },
            { t: "Certified", s: "IGI / SGL diamonds" },
            { t: "Lifetime Care", s: "Free polish & cleaning" },
          ].map((b) => (
            <div key={b.t}>
              <div className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
                {b.t}
              </div>
              <div className="text-sm text-[var(--muted)] mt-1">{b.s}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="hidden lg:block">
        <Marquee />
      </div>

      <section className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-10 py-10 md:py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
            Shop By Collection
          </p>
          <h2 className="text-4xl md:text-5xl mt-2">Crafted for every moment</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {collections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[var(--bg-alt)]"
            >
              <Image
                src={c.hero}
                alt={c.title}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-2xl">{c.title}</h3>
                <p className="text-[11px] tracking-brand uppercase opacity-80 mt-1">
                  {c.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hidden lg:grid max-w-7xl mx-auto px-6 lg:px-10 py-10 md:py-20 md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3]">
          <Image
            src="/img/1633934542430-9d4a1f8c0c39.jpg"
            alt="Kalpavruksha"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
            Gold Savings Plan
          </p>
          <h2 className="text-4xl md:text-5xl mt-2">Kalpavruksha</h2>
          <p className="mt-4 text-[var(--muted)] leading-relaxed">
            The wish-fulfilling gold tree. Pay 11 instalments, TBZ pays the 12th · then
            choose any jewellery you love. Smart savings towards your dream piece.
          </p>
          <Link href="/kalpavruksha" className="btn-gold mt-7 inline-block">
            Start a Plan
          </Link>
        </div>
      </section>

      <section className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-10 py-10 md:py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
            From Our Clients
          </p>
          <h2 className="text-3xl md:text-4xl mt-2">A bond passed down generations</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-7">
          {[
            {
              quote:
                "My grandmother bought her wedding set from TBZ Zaveri Bazaar. Sixty years later, I picked mine from the same store. Some things only get better with time.",
              name: "Aanya Mehta",
              meta: "Bridal client · Mumbai",
            },
            {
              quote:
                "The home preview was such a thoughtful touch. The team brought options matched to what I had in mind and the polki choker was even better in person.",
              name: "Ritika Bansal",
              meta: "Jadau client · New Delhi",
            },
            {
              quote:
                "Started a Kalpavruksha plan three years ago and used it for my daughter's first earrings. The bonus instalment was a sweet surprise.",
              name: "Vikram Iyer",
              meta: "Kalpavruksha member · Bengaluru",
            },
          ].map((t) => (
            <figure
              key={t.name}
              className="bg-[var(--bg-alt)] border border-[var(--border)] p-6 flex flex-col"
            >
              <span className="serif text-5xl leading-none text-[var(--gold)]" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="text-[var(--muted)] leading-relaxed mt-2 flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-[var(--border)]">
                <p className="text-sm">{t.name}</p>
                <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] mt-1">
                  {t.meta}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="hidden lg:block bg-[var(--bg-alt)] py-10 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
            Our Story
          </p>
          <h2 className="text-4xl md:text-5xl mt-3 mb-6">160+ Years of Trust</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Founded in 1864 in Mumbai&apos;s Zaveri Bazaar by Shri Tribhovandas Bhimji
            Zaveri, TBZ · The Original is among India&apos;s oldest and most-trusted
            jewellery houses. Today, we serve generations across India and around the
            world.
          </p>
          <Link href="/about" className="btn-outline mt-8 inline-block">
            Read Our Heritage
          </Link>
        </div>
      </section>
    </>
  );
}
