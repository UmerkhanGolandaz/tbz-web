"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Product, formatINR } from "@/lib/data";
import TryOnModal from "@/components/TryOnModal";
import { useNotifications } from "@/components/NotificationProvider";
import { useWishlist } from "@/components/WishlistProvider";

export default function ProductView({
  product,
  gallery,
}: {
  product: Product;
  gallery: string[];
}) {
  const [active, setActive] = useState(0);
  const [tryOn, setTryOn] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [toast, setToast] = useState<{ text: string; saved: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { push } = useNotifications();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);

  const toggleWishlist = () => {
    const nowSaved = toggle(product.id);
    push({
      kind: "system",
      title: nowSaved ? "Added to favorites" : "Removed from favorites",
      body: nowSaved
        ? `${product.name} · we will notify you on price drops.`
        : `${product.name} removed from your favorites.`,
      href: nowSaved ? "/account#favorites" : undefined,
    });
    setToast({
      text: nowSaved
        ? `${product.name} added to favorites`
        : `${product.name} removed from favorites`,
      saved: nowSaved,
    });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <div
          className="relative aspect-square bg-[var(--bg-alt)] overflow-hidden cursor-zoom-in"
          onClick={() => setZoom(true)}
        >
          <Image
            src={gallery[active]}
            alt={product.name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <Link
            href={`/try-on/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 bg-white/95 text-[var(--fg)] px-4 py-2 text-[11px] tracking-brand uppercase border border-[var(--gold)] hover:bg-[var(--gold)] hover:text-white"
          >
            ✦ Try On
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
            aria-pressed={saved}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition ${
              saved
                ? "bg-[var(--gold)] text-white"
                : "bg-white/95 text-[var(--gold-dark)] hover:bg-[var(--gold)] hover:text-white"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"}>
              <path
                d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active - 1 + gallery.length) % gallery.length);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 text-[var(--gold-dark)] flex items-center justify-center shadow-sm hover:bg-[var(--gold)] hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active + 1) % gallery.length);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 text-[var(--gold-dark)] flex items-center justify-center shadow-sm hover:bg-[var(--gold)] hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-[10px] tracking-brand uppercase text-[var(--muted)] rounded-full px-2.5 py-0.5">
                {active + 1} / {gallery.length}
              </div>
            </>
          )}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden bg-[var(--bg-alt)] border ${
                active === i ? "border-[var(--gold)]" : "border-transparent"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${product.name} ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
          {product.type}
        </p>
        <h1 className="text-4xl md:text-5xl mt-2 mb-3">{product.name}</h1>
        <p className="text-2xl text-[var(--gold-dark)]">{formatINR(product.price)}</p>
        <p className="text-xs text-[var(--muted)] mt-1">Incl. of taxes · Pricing indicative</p>

        <div className="gold-divider my-8 max-w-xs" />

        <p className="text-[var(--muted)] leading-relaxed">{product.description}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
          {product.weight && (
            <>
              <dt className="text-[var(--muted)] text-[11px] tracking-brand uppercase">Weight</dt>
              <dd>{product.weight}</dd>
            </>
          )}
          {product.purity && (
            <>
              <dt className="text-[var(--muted)] text-[11px] tracking-brand uppercase">
                Metal / Purity
              </dt>
              <dd>{product.purity}</dd>
            </>
          )}
          <dt className="text-[var(--muted)] text-[11px] tracking-brand uppercase">Hallmark</dt>
          <dd>BIS Hallmarked</dd>
          <dt className="text-[var(--muted)] text-[11px] tracking-brand uppercase">SKU</dt>
          <dd>{product.id.toUpperCase()}</dd>
        </dl>

        <div className="mt-8">
          <Link
            href={`/appointment?product=${product.id}`}
            className="btn-gold block w-full text-center"
          >
            Book Appointment
          </Link>
        </div>

        <ul className="mt-10 space-y-2 text-sm text-[var(--muted)]">
          <li>· Free home preview in select cities</li>
          <li>· Lifetime polish & cleaning at any TBZ boutique</li>
          <li>· Exchange & buyback policy as per BIS guidelines</li>
        </ul>
      </div>

      {tryOn && (
        <TryOnModal
          imageSrc={gallery[active]}
          productName={product.name}
          onClose={() => setTryOn(false)}
        />
      )}

      {toast && (
        <div className="fixed inset-x-4 bottom-28 lg:bottom-8 z-50 flex justify-center pointer-events-none">
        <div
          role="status"
          aria-live="polite"
          className="bg-white text-[var(--fg)] border border-[var(--gold-light)] shadow-lg rounded-full pl-2 pr-4 py-2 flex items-center gap-2.5 text-sm max-w-full lg:max-w-md pointer-events-auto animate-[tbz-toast_2.4s_ease-out]"
        >
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              toast.saved
                ? "bg-[var(--gold)] text-white"
                : "bg-[var(--bg-alt)] text-[var(--gold-dark)]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={toast.saved ? "currentColor" : "none"}>
              <path
                d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="truncate flex-1 min-w-0">{toast.text}</span>
        </div>
        </div>
      )}

      {zoom && (
        <button
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6 cursor-zoom-out"
          aria-label="Close zoom"
        >
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={gallery[active]}
              alt={product.name}
              fill
              sizes="(max-width:1024px) 100vw, 800px"
              className="object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
}
