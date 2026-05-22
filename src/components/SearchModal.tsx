"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, collections, formatINR } from "@/lib/data";

type Props = { onClose: () => void };

const QUICK = [
  { label: "Gold", href: "/collections/gold" },
  { label: "Diamond", href: "/collections/diamond" },
  { label: "Bridal", href: "/collections/bridal" },
  { label: "Jadau", href: "/collections/jadau" },
  { label: "Platinum", href: "/collections/platinum" },
  { label: "Digital Gold", href: "/digital-gold" },
];

export default function SearchModal({ onClose }: Props) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const matchedProducts = useMemo(
    () =>
      term
        ? products
            .filter((p) =>
              [p.name, p.type, p.category, p.purity, p.description]
                .filter(Boolean)
                .some((s) => (s as string).toLowerCase().includes(term))
            )
            .slice(0, 6)
        : [],
    [term]
  );
  const matchedCollections = useMemo(
    () =>
      term
        ? collections.filter(
            (c) =>
              c.title.toLowerCase().includes(term) ||
              c.tagline.toLowerCase().includes(term)
          )
        : [],
    [term]
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div
        className="bg-white max-w-2xl mx-auto mt-0 lg:mt-20 h-full lg:h-auto lg:max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[var(--border)] px-4 py-3 flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jewellery, collections…"
            className="flex-1 text-base focus:outline-none placeholder:text-[var(--muted)]"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-[11px] tracking-brand uppercase text-[var(--muted)] hover:text-[var(--fg)]"
          >
            Cancel
          </button>
        </div>

        {!term ? (
          <div className="p-5">
            <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  onClick={onClose}
                  className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-full hover:border-[var(--gold)]"
                >
                  {q.label}
                </Link>
              ))}
            </div>
            <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mt-7 mb-3">
              Trending
            </p>
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3"
                >
                  <div className="relative w-14 h-14 bg-[var(--bg-alt)] shrink-0">
                    <Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm truncate">{p.name}</p>
                    <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">
                      {formatINR(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : matchedProducts.length === 0 && matchedCollections.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[var(--muted)]">No results for &ldquo;{q}&rdquo;.</p>
            <p className="text-sm text-[var(--muted)] mt-2">
              Try Gold, Diamond, Polki or Bridal — or{" "}
              <Link
                href="/appointment"
                onClick={onClose}
                className="underline text-[var(--gold-dark)]"
              >
                book a private preview
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="p-2">
            {matchedCollections.length > 0 && (
              <div className="px-3 pt-3 pb-1">
                <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] mb-1">
                  Collections
                </p>
                <ul>
                  {matchedCollections.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/collections/${c.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between py-2 hover:text-[var(--gold-dark)]"
                      >
                        <span>{c.title}</span>
                        <span className="text-[10px] tracking-brand uppercase text-[var(--muted)]">
                          {c.tagline}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {matchedProducts.length > 0 && (
              <div className="px-3 pt-2 pb-3">
                <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] mb-1">
                  Products
                </p>
                <ul className="divide-y divide-[var(--border)]">
                  {matchedProducts.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 py-2.5"
                      >
                        <div className="relative w-14 h-14 bg-[var(--bg-alt)] shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-tight">{p.name}</p>
                          <p className="text-[10px] tracking-brand uppercase text-[var(--muted)] mt-0.5">
                            {p.type} · {p.category}
                          </p>
                        </div>
                        <p className="text-sm text-[var(--gold-dark)] whitespace-nowrap">
                          {formatINR(p.price)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
