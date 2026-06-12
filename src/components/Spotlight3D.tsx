"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Spotlight3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Dampen the rotation for a smooth effect
    const rotateX = -(y / rect.height) * 30; // Max tilt 15 degrees
    const rotateY = (x / rect.width) * 30;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 md:py-32 animate-fade-in-up group/section">
      {/* Dynamic ambient gold lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full bg-[var(--gold)]/10 blur-[120px] pointer-events-none transition-opacity duration-1000" />
      <div className="absolute right-0 bottom-0 w-1/3 aspect-square rounded-full bg-[var(--gold)]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left side: Premium Typography & Content */}
        <div className="order-2 lg:order-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[var(--gold)]" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">Signature Collection</p>
            <span className="w-8 h-[1px] bg-[var(--gold)] lg:hidden" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-[5rem] text-white font-light leading-[1.1] mb-4 drop-shadow-2xl font-serif">
            The Royal Polki
          </h2>
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-10 font-mono">
            SKU: 1406257901
          </p>

          <p className="text-white/70 leading-relaxed mb-12 text-lg md:text-xl font-light">
            Enchanted by beauty, power and grace, this masterpiece is suited for every grand occasion. Handcrafted to absolute perfection by master karigars over 400 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Link 
              href="/appointment" 
              className="relative px-10 py-5 bg-[var(--gold)] text-white hover:bg-white hover:text-black overflow-hidden transition-all duration-700 uppercase tracking-[0.2em] text-[12px] hover:shadow-[0_0_40px_rgba(197,165,114,0.4)]"
            >
              Request a Private Viewing
            </Link>
          </div>
        </div>
        
        {/* Right side: 3D Image Showcase */}
        <div 
          className="order-1 lg:order-2 relative perspective-[1500px] cursor-crosshair flex justify-center items-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glassmorphism pedestal ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl transition-transform duration-1000 ease-out animate-[spin_60s_linear_infinite]" 
               style={{ transform: isHovering ? 'scale(1.05) translate(-50%, -50%)' : 'scale(1) translate(-50%, -50%)', transformOrigin: 'top left' }} />

          <div 
            ref={cardRef}
            className="relative w-full max-w-[550px] aspect-square transition-all duration-300 ease-out z-10"
            style={{ 
              transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.1, 1.1, 1.1)` : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Highly reactive spotlight reflection */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 rounded-full opacity-0 mix-blend-overlay transition-opacity duration-300 pointer-events-none"
              style={{
                opacity: isHovering ? 1 : 0,
                transform: `translateX(${rotation.y * 2}px) translateY(${rotation.x * 2}px)`
              }}
            />
            
            {/* The Jewelry Image - Made it pop immensely on dark background */}
            <Image
              src="/tbz-web/img/1611591437281-460914d2c14a.jpg"
              alt="Signature Masterpiece"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain filter transition-all duration-300 ease-out mix-blend-screen"
              style={{ 
                transform: isHovering ? 'translateZ(100px)' : 'translateZ(0px)',
                filter: isHovering ? 'drop-shadow(0 40px 50px rgba(197,165,114,0.3)) brightness(1.2)' : 'drop-shadow(0 20px 30px rgba(0,0,0,0.5)) brightness(1)'
              }}
            />
          </div>
          
          {/* Subtle instruction text */}
          <div className={`absolute -bottom-8 right-0 lg:right-12 text-[9px] tracking-[0.3em] text-white/40 uppercase transition-opacity duration-700 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse mr-2" />
            Interactive 3D Experience
          </div>
        </div>
      </div>
    </section>
  );
}
