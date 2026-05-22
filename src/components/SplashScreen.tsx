"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeT = setTimeout(() => setFading(true), 1800);
    const hideT = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(hideT);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #faf3e3 0%, #f0e2c5 45%, #d8c096 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          filter: "blur(2px)",
        }}
      />
      <div className="relative flex flex-col items-center text-center px-6">
        <div
          className="drop-shadow-[0_6px_20px_rgba(168,136,78,0.35)]"
          style={{ filter: "drop-shadow(0 6px 20px rgba(168,136,78,0.35))" }}
        >
          <Logo size={150} />
        </div>
        <p className="mt-7 text-[11px] tracking-[0.4em] uppercase text-[var(--gold-dark)]">
          Since 1864
        </p>
        <h1 className="serif text-3xl md:text-4xl mt-2 text-[var(--fg)]">
          The Heritage of Indian Jewellery
        </h1>
        <div className="mt-7 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse [animation-delay:160ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse [animation-delay:320ms]" />
        </div>
      </div>
    </div>
  );
}
