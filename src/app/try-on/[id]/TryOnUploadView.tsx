"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/data";

export default function TryOnUploadView({ product }: { product: Product }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [cleanedSrc, setCleanedSrc] = useState<string | null>(null);
  const [size, setSize] = useState(180);
  const [pos, setPos] = useState({ x: 50, y: 55 });
  const [opacity, setOpacity] = useState(1);

  // Chromakey the product image once
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      if (!ctx) return setCleanedSrc(product.image);
      ctx.drawImage(img, 0, 0);
      try {
        const d = ctx.getImageData(0, 0, c.width, c.height);
        const px = d.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i], g = px[i + 1], b = px[i + 2];
          const lum = (r + g + b) / 3;
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          if (lum > 235 && sat < 22) px[i + 3] = 0;
          else if (lum > 215 && sat < 30) px[i + 3] = Math.round(255 * ((235 - lum) / 20));
        }
        ctx.putImageData(d, 0, 0);
        setCleanedSrc(c.toDataURL("image/png"));
      } catch {
        setCleanedSrc(product.image);
      }
    };
    img.onerror = () => setCleanedSrc(product.image);
    img.src = product.image;
  }, [product.image]);

  const handleFile = (f: File | undefined) => {
    if (!f || !f.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    dragOffset.current = {
      x: e.clientX - (r.left + (pos.x / 100) * r.width),
      y: e.clientY - (r.top + (pos.y / 100) * r.height),
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragOffset.current) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - dragOffset.current.x - r.left) / r.width) * 100;
    const y = ((e.clientY - dragOffset.current.y - r.top) / r.height) * 100;
    setPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };
  const onPointerUp = () => {
    dragOffset.current = null;
  };

  const downloadSnapshot = async () => {
    if (!photo || !cleanedSrc || !stageRef.current) return;
    const base = await loadImage(photo);
    const overlay = await loadImage(cleanedSrc);
    const c = document.createElement("canvas");
    c.width = base.naturalWidth;
    c.height = base.naturalHeight;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(base, 0, 0);
    const stageRect = stageRef.current.getBoundingClientRect();
    const scaleX = c.width / stageRect.width;
    const ovSize = size * scaleX;
    const cx = (pos.x / 100) * c.width;
    const cy = (pos.y / 100) * c.height;
    ctx.globalAlpha = opacity;
    ctx.drawImage(overlay, cx - ovSize / 2, cy - ovSize / 2, ovSize, ovSize);
    ctx.globalAlpha = 1;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `tbz-tryon-${product.id}-${Date.now()}.png`;
    a.click();
  };

  return (
    <section className="max-w-3xl mx-auto px-5 lg:px-10 py-8">
      <Link
        href={`/product/${product.id}`}
        className="inline-flex items-center gap-2 text-[11px] tracking-brand uppercase text-[var(--gold-dark)] border border-[var(--gold-light)] bg-[var(--bg-alt)] rounded-full pl-2 pr-4 py-1.5 mb-5 hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)]"
      >
        <span className="w-5 h-5 rounded-full bg-white border border-[var(--gold-light)] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="truncate max-w-[200px]">Back to {product.name}</span>
      </Link>

      <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">Virtual Try-On</p>
      <h1 className="text-3xl md:text-4xl mt-1 mb-2">Try on {product.name}</h1>
      <p className="text-[var(--muted)] text-sm">
        Upload a photo of yourself and we&apos;ll place the piece on top so you can preview the
        look. Drag to position, scale to fit.
      </p>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mt-8">
        <div>
          {!photo ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className="flex flex-col items-center justify-center aspect-[3/4] border-2 border-dashed border-[var(--border)] rounded-2xl bg-[var(--bg-alt)] cursor-pointer hover:border-[var(--gold)] transition text-center p-6"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
              />
              <span className="w-14 h-14 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--gold-dark)] mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 16V5m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <p className="text-sm">Tap to upload a photo</p>
              <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mt-1">
                or drag &amp; drop
              </p>
              <p className="text-[11px] text-[var(--muted)] mt-4 max-w-xs">
                For best results, use a clear front-facing photo with neutral lighting. Your
                photo never leaves this device.
              </p>
            </label>
          ) : (
            <div className="relative">
              <div
                ref={stageRef}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="Your photo" className="absolute inset-0 w-full h-full object-cover" />
                {cleanedSrc && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={cleanedSrc}
                    alt={product.name}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    draggable={false}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity,
                      transform: "translate(-50%, -50%)",
                      filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
                    }}
                    className="absolute object-contain touch-none cursor-grab active:cursor-grabbing"
                  />
                )}
              </div>
              <button
                onClick={() => {
                  setPhoto(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="mt-3 text-[11px] tracking-brand uppercase text-[var(--muted)] underline"
              >
                Upload a different photo
              </button>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="flex items-center gap-4 bg-[var(--bg-alt)] p-4 rounded-2xl">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
              <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">{product.type}</p>
              <p className="text-sm truncate">{product.name}</p>
              <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] mt-0.5">
                {product.purity || "TBZ"}
              </p>
            </div>
          </div>

          {photo && (
            <>
              <label className="block">
                <span className="text-[10px] tracking-brand uppercase text-[var(--muted)]">Size</span>
                <input
                  type="range"
                  min={80}
                  max={420}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-[var(--gold)] mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[10px] tracking-brand uppercase text-[var(--muted)]">Blend</span>
                <input
                  type="range"
                  min={0.5}
                  max={1}
                  step={0.01}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-[var(--gold)] mt-1"
                />
              </label>
              <button onClick={downloadSnapshot} className="btn-gold w-full">
                Save Snapshot
              </button>
            </>
          )}

          <ul className="text-xs text-[var(--muted)] space-y-1.5">
            <li>· Drag the piece to position it</li>
            <li>· Adjust size to match your frame</li>
            <li>· This is a visual preview, not a fit guarantee</li>
            <li>· Want the real thing on you?{" "}
              <Link href={`/appointment?product=${product.id}`} className="underline text-[var(--gold-dark)]">
                Book a boutique try-on
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
