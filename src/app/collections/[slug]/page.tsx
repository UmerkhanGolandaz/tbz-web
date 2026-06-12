import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, products, formatINR } from "@/lib/data";
import WishlistButton from "@/components/WishlistButton";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  return { title: c ? `${c.title} Jewellery · TBZ` : "Collection · TBZ" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = collections.find((x) => x.slug === slug);
  if (!col) notFound();

  const items = products.filter((p) => p.category === slug);

  return (
    <>
      <section className="relative h-[55vh] min-h-[400px] md:h-[65vh] md:min-h-[500px] overflow-hidden group">
        <Image
          src={col.hero}
          alt={col.title}
          fill
          sizes="100vw"
          className="object-cover transform transition-transform duration-[10000ms] ease-out scale-100 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 animate-fade-in-up">
          <p className="text-[12px] md:text-[14px] tracking-[0.2em] uppercase text-[var(--gold)] mb-3">{col.tagline}</p>
          <h1 className="text-6xl md:text-8xl font-light drop-shadow-lg">{col.title}</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center animate-fade-in-up delay-100">
        <div className="gold-divider mx-auto mb-8 max-w-[60px]" />
        <p className="text-[var(--muted)] text-lg md:text-xl leading-relaxed font-light">{col.blurb}</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 animate-fade-in-up delay-200">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-[var(--bg-alt)] border border-[var(--border)]">
            <p className="text-[var(--muted)]">
              New pieces coming soon. Visit{" "}
              <Link href="/stores" className="underline text-[var(--gold-dark)]">a TBZ boutique</Link> to preview.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((p, index) => (
              <Link 
                key={p.id} 
                href={`/product/${p.id}`} 
                className="group flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-alt)] rounded-sm mb-4">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  
                  {/* Floating Wishlist Button */}
                  <WishlistButton />

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
        )}
      </section>
    </>
  );
}
