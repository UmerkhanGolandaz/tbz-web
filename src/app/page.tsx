import Link from "next/link";
import Image from "next/image";
import { collections, products, formatINR } from "@/lib/data";
import Marquee from "@/components/Marquee";
import HomeAppHeader from "@/components/HomeAppHeader";
import Spotlight3D from "@/components/Spotlight3D";

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <>
      <HomeAppHeader />

      {/* hero (desktop only - replaced by app-style header on mobile) */}
      <section className="hidden lg:block relative h-[85vh] min-h-[600px] overflow-hidden animate-fade-in-up group">
        <Image
          src="/tbz-web/hero.jpg"
          alt="TBZ bridal jewellery"
          fill
          priority
          sizes="100vw"
          className="object-cover transform transition-transform duration-[15000ms] ease-out scale-100 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 text-white">
          <p className="text-[12px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            Established 1864
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent mb-6"></div>
          <h1 className="text-6xl md:text-[5.5rem] font-light leading-tight mb-6 drop-shadow-xl tracking-tight">
            The Heritage of<br />Indian Jewellery
          </h1>
          <p className="max-w-[45ch] text-lg opacity-90 font-light drop-shadow-md">
            Six generations of master craftsmanship. Every piece a story, perfectly told.
          </p>
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
            <Link
              href="/collections"
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.15em] text-[11px]"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* mobile banner card */}
      <section className="lg:hidden px-5 pt-2 animate-fade-in-up">
        <Link
          href="/collections/bridal"
          className="relative block aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <Image
            src="/tbz-web/hero.jpg"
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

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-16 lg:pb-24 animate-fade-in-up delay-100">
        <div className="flex items-end justify-between mb-8 lg:mb-12 border-b border-[var(--border)] pb-4">
          <div>
            <p className="text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-[var(--gold-dark)] mb-2">
              Featured
            </p>
            <h2 className="text-3xl lg:text-5xl font-light">New arrivals this season</h2>
          </div>
          <Link
            href="/collections"
            className="text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--gold-dark)] transition-colors mb-2"
          >
            View All →
          </Link>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-10 -mx-5 px-5 lg:mx-0 lg:px-0 no-scrollbar cursor-grab active:cursor-grabbing">
          {featured.map((p, index) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group flex flex-col snap-start shrink-0 w-[70vw] md:w-[calc(40%-1rem)] lg:w-[calc(25%-1.1rem)]" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-alt)] rounded-sm mb-4">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 70vw, 25vw"
                  className="object-cover transform group-hover:scale-110 transition duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                />
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                
                <button 
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center text-[var(--muted)] hover:text-red-500 hover:scale-110 shadow-lg transition-all duration-500 delay-100"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Glassmorphism Slide-up Bar */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-white/70 backdrop-blur-lg border-t border-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-between px-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--fg)] font-medium">Quick View</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--gold-dark)] transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                     <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="text-center px-2">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] mb-1.5">
                  {p.type}
                </p>
                <h4 className="text-sm md:text-base font-light text-[var(--fg)] leading-snug group-hover:text-[var(--gold-dark)] transition-colors duration-300 line-clamp-2">
                  {p.name}
                </h4>
                <p className="mt-2 text-[var(--gold-dark)] text-sm md:text-base tracking-wide">
                  {formatINR(p.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="hidden lg:block border-y border-[var(--border)] py-2">
        <Marquee />
      </div>

      <section className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 animate-fade-in-up">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold-dark)] mb-3">
            Explore
          </p>
          <h2 className="text-4xl md:text-5xl font-light">Crafted for every moment</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {collections.map((c, index) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-[var(--bg-alt)] rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Image
                src={c.hero}
                alt={c.title}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 group-hover:opacity-80 transition duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white flex flex-col justify-end transform transition-transform duration-500">
                <h3 className="text-2xl lg:text-3xl font-light transform group-hover:-translate-y-2 transition-transform duration-500">{c.title}</h3>
                <p className="text-[11px] tracking-brand uppercase text-[var(--gold)] mt-1 transform group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                  {c.tagline}
                </p>
                <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center gap-2 text-[11px] tracking-brand uppercase">
                  <span className="border-b border-[var(--gold)] pb-1">Explore Collection</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                     <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Premium Spotlight 3D Section */}
      <Spotlight3D />

      <section className="hidden lg:grid max-w-7xl mx-auto px-6 lg:px-10 py-10 md:py-20 md:grid-cols-2 gap-10 items-center animate-fade-in-up">
        <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-sm group">
          <Image
            src="/tbz-web/img/1603561591411-07134e71a2a9.jpg"
            alt="Kalpavruksha Gold Savings"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition duration-700"
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

      <section className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-32 animate-fade-in-up">
        <div className="text-center mb-16">
          <div className="gold-divider mx-auto mb-6 max-w-[40px]"></div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gold-dark)] mb-3">
            From Our Clients
          </p>
          <h2 className="text-3xl md:text-4xl font-light">A bond passed down generations</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
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
          ].map((t, index) => (
            <figure
              key={t.name}
              className="flex flex-col text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <span className="serif text-6xl leading-none text-[var(--gold)] opacity-50 mb-4" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="text-[var(--muted)] text-lg leading-relaxed flex-1 font-light italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-[var(--gold)]/20 mx-auto w-2/3">
                <p className="text-sm tracking-wide text-[var(--fg)]">{t.name}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gold-dark)] mt-2">
                  {t.meta}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="hidden lg:block bg-[var(--bg-alt)] py-10 md:py-20 animate-fade-in-up">
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
