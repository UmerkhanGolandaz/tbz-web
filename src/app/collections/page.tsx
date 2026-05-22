import Link from "next/link";
import Image from "next/image";
import { collections } from "@/lib/data";

export const metadata = { title: "Collections · TBZ" };

export default function CollectionsIndex() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="text-center mb-12">
        <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
          Shop Jewellery
        </p>
        <h1 className="text-4xl md:text-5xl mt-2">Our Collections</h1>
        <div className="gold-divider mt-6 max-w-xs mx-auto" />
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
              <p className="text-[11px] tracking-brand uppercase opacity-80 mt-1">{c.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
