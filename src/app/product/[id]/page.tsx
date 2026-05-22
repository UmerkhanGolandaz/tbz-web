import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, formatINR, galleryFor } from "@/lib/data";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  return { title: p ? `${p.name} · TBZ` : "Product · TBZ" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) notFound();

  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : galleryFor(p.image, 4);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="text-[11px] tracking-brand uppercase text-[var(--muted)] mb-6">
        <Link href="/collections" className="hover:text-[var(--gold-dark)]">Collections</Link>
        {" / "}
        <Link href={`/collections/${p.category}`} className="hover:text-[var(--gold-dark)]">
          {p.category}
        </Link>
      </div>

      <ProductView product={p} gallery={gallery} />

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl mb-6">You may also love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {related.map((r) => (
              <Link key={r.id} href={`/product/${r.id}`} className="group">
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-alt)]">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="pt-3">
                  <h4 className="text-sm leading-tight">{r.name}</h4>
                  <p className="text-[var(--gold-dark)] text-sm mt-1">{formatINR(r.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
