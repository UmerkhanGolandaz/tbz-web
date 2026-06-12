"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/components/WishlistProvider";
import { products, formatINR } from "@/lib/data";

export default function WishlistPage() {
  const { items, remove } = useWishlist();

  const savedProducts = items
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 min-h-[60vh] animate-fade-in-up">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl">Your Wishlist</h1>
          <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mt-2">
            {savedProducts.length} {savedProducts.length === 1 ? "Item" : "Items"} Saved
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[var(--bg-alt)] border border-[var(--border)]">
          <svg className="w-12 h-12 mx-auto text-[var(--gold-light)] mb-4" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h2 className="text-2xl mb-2">Your wishlist is empty</h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            Discover our exquisite collections and save your favorite pieces to review later or share with loved ones.
          </p>
          <Link href="/collections" className="btn-gold">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
          {savedProducts.map((p) => (
            <div key={p.id} className="group bg-white relative border border-transparent hover:border-[var(--border)] transition-all">
              <button 
                onClick={() => remove(p.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-[var(--muted)] hover:text-red-500 shadow-sm transition"
                title="Remove from Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <Link href={`/product/${p.id}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-alt)]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="pt-3 pb-4 px-2">
                  <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">
                    {p.type}
                  </p>
                  <h4 className="text-sm lg:text-base mt-1 leading-tight">{p.name}</h4>
                  <p className="mt-1.5 text-[var(--gold-dark)] text-sm font-medium">{formatINR(p.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
