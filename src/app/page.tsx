import Link from "next/link";
import Image from "next/image";
import { collections, products, formatINR } from "@/lib/data";
import Marquee from "@/components/Marquee";
import HomeAppHeader from "@/components/HomeAppHeader";
import Spotlight3D from "@/components/Spotlight3D";
import WishlistButton from "@/components/WishlistButton";
import GoldDust from "@/components/GoldDust";

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 backdrop-blur-[2px]" />
        <GoldDust />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 text-white z-20">
          <p className="text-[12px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4 animate-fade-in-up delay-100">
            Established 1864
          </p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent mb-8 animate-fade-in-up delay-200"></div>
          <h1 className="text-6xl md:text-[6rem] font-light leading-tight mb-6 drop-shadow-[0_0_30px_rgba(197,165,114,0.3)] tracking-tight animate-fade-in-up delay-300">
            The Heritage of<br /><span className="italic text-[var(--gold-light)]">Indian Jewellery</span>
          </h1>
          <p className="max-w-[50ch] text-lg opacity-90 font-light drop-shadow-md animate-fade-in-up delay-[400ms]">
            Six generations of master craftsmanship. Every piece a story, perfectly told.
          </p>
          <div className="mt-14 flex flex-col md:flex-row justify-center gap-6 animate-fade-in-up delay-[500ms]">
            <Link
              href="/collections"
              className="relative px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden transition-all duration-700 uppercase tracking-[0.2em] text-[12px] group/btn"
            >
              <span className="absolute inset-0 w-0 bg-[var(--gold)] transition-all duration-[800ms] ease-out group-hover/btn:w-full -z-10" />
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* mobile banner card */}
      <section className="lg:hidden px-5 pt-2 animate-fade-in-up">
        <Link
          href="/collections/bridal"
          className="relative block aspect-[16/10] overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
        >
          <Image
            src="/tbz-web/hero.jpg"
            alt="TBZ bridal"
            fill
            sizes="100vw"
            className="object-cover transform group-hover:scale-110 transition duration-[10000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
          <GoldDust />
          <div className="absolute bottom-0 left-0 p-6 text-white z-20">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold-light)] drop-shadow-md">Featured Capsule</p>
            <p className="text-3xl serif mt-2 leading-tight drop-shadow-lg">The Bridal Atelier</p>
            <span className="inline-block mt-4 text-[10px] tracking-brand uppercase border border-white/40 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300">
              Explore Collection →
            </span>
          </div>
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-16 lg:pb-24 animate-fade-in-up delay-100 relative">
        {/* Subtle glowing ambient light behind the section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[var(--gold)]/5 blur-[100px] -z-10 pointer-events-none" />
        
        <div className="flex items-end justify-between mb-10 lg:mb-14 border-b border-gradient-to-r from-[var(--border)] via-[var(--gold)]/30 to-[var(--border)] pb-6 relative">
          <div>
            <p className="text-[11px] lg:text-[12px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--gold)]" />
              Curated Selection
            </p>
            <h2 className="text-4xl lg:text-6xl font-light drop-shadow-sm text-[var(--fg)]">New arrivals this season</h2>
          </div>
          <Link
            href="/collections"
            className="group flex items-center gap-2 text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--gold-dark)] transition-colors mb-2"
          >
            <span className="border-b border-transparent group-hover:border-[var(--gold-dark)] pb-1 transition-all">View Entire Collection</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform">
               <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 lg:gap-10 pb-12 -mx-5 px-5 lg:mx-0 lg:px-4 custom-scrollbar cursor-grab active:cursor-grabbing">
          {featured.map((p, index) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group flex flex-col snap-start shrink-0 w-[75vw] md:w-[calc(45%-1rem)] lg:w-[calc(28%-1.1rem)]" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-t-3xl rounded-b-md shadow-lg group-hover:shadow-[0_20px_40px_rgba(197,165,114,0.15)] border-[0.5px] border-[var(--gold)]/20 transition-all duration-700">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 75vw, 28vw"
                  className="object-cover transform group-hover:scale-110 transition duration-[15000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <WishlistButton />

                {/* Elegant Glassmorphism Quick View */}
                <div className="absolute bottom-4 inset-x-4 h-12 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full translate-y-20 group-hover:translate-y-0 transition-transform duration-700 ease-out flex items-center justify-center gap-3 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                   <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_2s_ease-out_infinite]" />
                   <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium drop-shadow-md z-10">Quick View</span>
                </div>
              </div>
              
              <div className="text-center px-4 pt-6 pb-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] mb-2 font-medium">
                  {p.type}
                </p>
                <h4 className="text-base md:text-lg font-light text-[var(--fg)] leading-snug group-hover:text-[var(--gold-dark)] transition-colors duration-300 line-clamp-2">
                  {p.name}
                </h4>
                <p className="mt-3 text-[var(--muted)] text-sm md:text-base tracking-[0.1em] font-light">
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
              className="group relative aspect-[4/5] overflow-hidden bg-[var(--bg-alt)] rounded-2xl shadow-lg hover:shadow-[0_20px_50px_rgba(197,165,114,0.3)] transition-all duration-[800ms] animate-fade-in-up transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Image
                src={c.hero}
                alt={c.title}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition duration-[10000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-all duration-700" />
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_ease-out]" />
              
              <div className="absolute bottom-0 inset-x-0 p-8 text-white flex flex-col justify-end transform transition-transform duration-700">
                <h3 className="text-3xl lg:text-4xl font-light transform group-hover:-translate-y-3 transition-transform duration-700">{c.title}</h3>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mt-2 transform group-hover:-translate-y-3 transition-transform duration-700 delay-100 opacity-90">
                  {c.tagline}
                </p>
                <div className="mt-5 overflow-hidden h-0 group-hover:h-12 transition-all duration-700 opacity-0 group-hover:opacity-100 flex items-center gap-3 text-[11px] tracking-brand uppercase bg-white/10 backdrop-blur-md rounded-full px-5 w-max">
                  <span>Explore Collection</span>
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

      <section className="hidden lg:block relative py-32 md:py-48 animate-fade-in-up group mt-20 mb-10 overflow-hidden">
        {/* Full bleed cinematic background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/tbz-web/img/1603561591411-07134e71a2a9.jpg"
            alt="Kalpavruksha Gold Savings"
            fill
            sizes="100vw"
            className="object-cover transform group-hover:scale-110 transition duration-[20000ms] ease-out object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[var(--gold)]" />
              <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--gold)] font-medium">
                Gold Savings Plan
              </p>
            </div>
            
            <h2 className="text-5xl md:text-7xl text-white font-serif font-light mb-6 drop-shadow-lg">
              Kalpavruksha
            </h2>
            
            <p className="text-white/80 leading-relaxed mb-10 text-lg md:text-xl font-light max-w-lg">
              The wish-fulfilling gold tree. Pay 11 instalments, TBZ pays the 12th — then
              choose any jewellery you love. Smart savings towards your dream masterpiece.
            </p>
            
            <Link 
              href="/kalpavruksha" 
              className="inline-flex items-center gap-4 group/link"
            >
              <div className="w-14 h-14 rounded-full border border-[var(--gold)] flex items-center justify-center text-[var(--gold)] group-hover/link:bg-[var(--gold)] group-hover/link:text-white transition-colors duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                   <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[12px] tracking-[0.2em] uppercase text-white group-hover/link:text-[var(--gold)] transition-colors duration-500">
                Start a Plan
              </span>
            </Link>
          </div>
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
