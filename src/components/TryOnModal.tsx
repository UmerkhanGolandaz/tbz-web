"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  imageSrc: string;
  productName: string;
  onClose: () => void;
};

export default function TryOnModal({ imageSrc, productName, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(160);
  const [pos, setPos] = useState({ x: 50, y: 55 });
  const [opacity, setOpacity] = useState(1);
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [cleanedSrc, setCleanedSrc] = useState<string | null>(null);

  // Chromakey: drop the white studio background so the piece reads like jewellery,
  // not a sticker. Runs once when the modal opens.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      try {
        const d = ctx.getImageData(0, 0, c.width, c.height);
        const px = d.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i], g = px[i + 1], b = px[i + 2];
          const lum = (r + g + b) / 3;
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          // near-white / low-saturation pixels = background
          if (lum > 235 && sat < 22) {
            px[i + 3] = 0;
          } else if (lum > 215 && sat < 30) {
            px[i + 3] = Math.round(255 * ((235 - lum) / 20));
          }
        }
        ctx.putImageData(d, 0, 0);
        setCleanedSrc(c.toDataURL("image/png"));
      } catch {
        // CORS may block getImageData on some hosts; fall back to raw image.
        setCleanedSrc(imageSrc);
      }
    };
    img.onerror = () => setCleanedSrc(imageSrc);
    img.src = imageSrc;
    return () => {
      cancelled = true;
    };
  }, [imageSrc]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError("Camera is not available on this device.");
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1280 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
          setReady(true);
        }
      } catch (e) {
        setError(
          (e as Error).name === "NotAllowedError"
            ? "Please allow camera access to try on."
            : "Couldn't start the camera."
        );
      }
    })();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [facing]);

  const onPointerDown = (e: React.PointerEvent) => {
    const stage = containerRef.current?.getBoundingClientRect();
    if (!stage) return;
    dragOffset.current = {
      x: e.clientX - (stage.left + (pos.x / 100) * stage.width),
      y: e.clientY - (stage.top + (pos.y / 100) * stage.height),
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragOffset.current) return;
    const stage = containerRef.current?.getBoundingClientRect();
    if (!stage) return;
    const x = ((e.clientX - dragOffset.current.x - stage.left) / stage.width) * 100;
    const y = ((e.clientY - dragOffset.current.y - stage.top) / stage.height) * 100;
    setPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };
  const onPointerUp = () => {
    dragOffset.current = null;
  };

  const snapshot = () => {
    const v = videoRef.current;
    const stage = containerRef.current;
    if (!v || !stage) return;
    const w = v.videoWidth;
    const h = v.videoHeight;
    if (!w || !h) return;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Mirror selfie like the on-screen preview
    if (facing === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(v, 0, 0, w, h);
    if (facing === "user") {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    const overlay = new Image();
    overlay.crossOrigin = "anonymous";
    overlay.onload = () => {
      const stageRect = stage.getBoundingClientRect();
      const scaleX = w / stageRect.width;
      const scaleY = h / stageRect.height;
      const ovSize = size * scaleX;
      const cx = (pos.x / 100) * stageRect.width * scaleX;
      const cy = (pos.y / 100) * stageRect.height * scaleY;
      ctx.globalAlpha = opacity;
      ctx.drawImage(overlay, cx - ovSize / 2, cy - ovSize / 2, ovSize, ovSize);
      ctx.globalAlpha = 1;
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `tbz-tryon-${Date.now()}.png`;
      a.click();
    };
    overlay.src = cleanedSrc || imageSrc;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-[11px] tracking-brand uppercase">Try On · {productName}</p>
        <button onClick={onClose} aria-label="Close" className="p-2">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-neutral-900"
      >
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
            <p className="text-lg">{error}</p>
            <p className="text-sm text-white/70 mt-2">
              You can still book a try-on at a TBZ boutique.
            </p>
            <button onClick={onClose} className="btn-outline mt-6" style={{ color: "#fff", borderColor: "#fff" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${
                facing === "user" ? "[transform:scaleX(-1)]" : ""
              }`}
            />
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
                Starting camera…
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cleanedSrc || imageSrc}
              alt={productName}
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
              className="absolute select-none touch-none object-contain cursor-grab active:cursor-grabbing"
            />
          </>
        )}
      </div>

      {!error && (
        <div className="bg-black/90 text-white p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <label className="text-[10px] tracking-brand uppercase">
              Size
              <input
                type="range"
                min={80}
                max={420}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
            </label>
            <label className="text-[10px] tracking-brand uppercase">
              Blend
              <input
                type="range"
                min={0.5}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
            </label>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setFacing(facing === "user" ? "environment" : "user")}
              className="btn-outline"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}
            >
              Flip
            </button>
            <button onClick={snapshot} className="btn-gold">
              Capture
            </button>
          </div>
          <p className="text-[10px] tracking-brand uppercase text-white/60 text-center">
            Drag the piece to position · this is a visual preview, not a fit guarantee
          </p>
        </div>
      )}
    </div>
  );
}
