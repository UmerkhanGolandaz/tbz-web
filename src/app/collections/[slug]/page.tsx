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
      <section className="relative h-[40vh] min-h-[280px]">
        <Image
          src={col.hero}
          alt={col.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <p className="text-[11px] tracking-brand uppercase opacity-80">{col.tagline}</p>
          <h1 className="text-5xl md:text-6xl mt-2">{col.title}</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-[var(--muted)] leading-relaxed">{col.blurb}</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        {items.length === 0 ? (
          <p className="text-center text-[var(--muted)] py-10">
            New pieces coming soon. Visit{" "}
            <Link href="/stores" className="underline">a TBZ boutique</Link> to preview.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {items.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
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
                  <h4 className="text-base mt-1 leading-tight">{p.name}</h4>
                  <p className="mt-1.5 text-[var(--gold-dark)] text-sm">
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
