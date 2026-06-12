"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import GoldDust from "./GoldDust";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force scroll to top on reload and disable browser scroll restoration
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-in-out transform-gpu will-change-transform will-change-opacity ${
        fading ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(to bottom, #0a0a0a, #1a1510, #0a0a0a)",
      }}
    >
      <div
        className={`absolute inset-0 transform-gpu will-change-transform transition-transform duration-[15000ms] ease-out ${
          mounted ? "scale-110" : "scale-100"
        }`}
        style={{
          backgroundImage: "url(/tbz-web/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      <GoldDust />
      <div className="relative flex flex-col items-center text-center px-6 z-20">
        <div
          className="drop-shadow-[0_0_40px_rgba(197,165,114,0.6)] animate-fade-in-up"
          style={{ filter: "drop-shadow(0 0 40px rgba(197,165,114,0.6))" }}
        >
          <img 
            src="https://www.tbztheoriginal.com/images/logo.png" 
            alt="TBZ Logo" 
            className="h-28 md:h-36 object-contain"
          />
        </div>
        <p className="mt-8 text-[11px] tracking-[0.6em] uppercase text-[var(--gold)] animate-fade-in-up delay-100 drop-shadow-[0_0_10px_rgba(197,165,114,0.8)]">
          Since 1864
        </p>
        <h1 className="serif text-3xl md:text-5xl mt-4 text-white font-light tracking-wide animate-fade-in-up delay-200 drop-shadow-2xl">
          The Heritage of Indian Jewellery
        </h1>
        <div className="mt-10 flex items-center gap-2 animate-fade-in-up delay-300">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_10px_#c5a572] animate-[ping_1.5s_infinite]" />
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </div>
    </div>
  );
}
