import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, products, formatINR } from "@/lib/data";

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
            {items.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group bg-white border border-transparent hover:border-[var(--border)] transition-all">
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-alt)]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-700 ease-out"
                  />
                  <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur opacity-0 group-hover:opacity-100 flex items-center justify-center text-[var(--muted)] hover:text-red-500 shadow-sm transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="pt-4 pb-5 px-3">
                  <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">
                    {p.type}
                  </p>
                  <h4 className="text-sm lg:text-base mt-1 leading-tight group-hover:text-[var(--gold-dark)] transition-colors">{p.name}</h4>
                  <p className="mt-2 text-[var(--gold-dark)] text-sm font-medium">
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
