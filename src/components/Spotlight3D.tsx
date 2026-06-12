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
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-24 animate-fade-in-up border-t border-[var(--border)] mt-12 bg-gradient-to-b from-white to-[var(--bg-alt)]">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side: Text & Enquiry */}
        <div className="order-2 lg:order-1 max-w-md relative mx-auto lg:mx-0">
          {/* Minimalist corner borders like the screenshot */}
          <div className="absolute -top-10 -left-10 w-16 h-16 border-t-2 border-l-2 border-[var(--border)] hidden lg:block opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 border-b-2 border-r-2 border-[var(--border)] hidden lg:block opacity-50"></div>
          
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-3">Signature Collection</p>
          <h2 className="text-3xl md:text-5xl text-[var(--fg)] mb-6 font-light leading-tight">
            1406257901
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-10 text-lg">
            Enchanted by beauty, power and grace, this masterpiece is suited for every grand occasion. Handcrafted to absolute perfection.
          </p>
          <Link href="/appointment" className="btn-outline group flex items-center justify-between w-full md:w-64 border-[var(--border)] hover:border-[var(--gold-dark)] hover:text-[var(--gold-dark)] bg-transparent px-6 py-4 transition-all duration-300">
            <span className="text-[11px] tracking-brand uppercase font-medium">MAKE AN ENQUIRY</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
        
        {/* Right side: 3D Image */}
        <div 
          className="order-1 lg:order-2 relative perspective-[1200px] cursor-crosshair flex justify-center items-center py-12"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={cardRef}
            className="relative w-full max-w-[500px] aspect-square transition-all duration-200 ease-out"
            style={{ 
              transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)` : 'rotateX(0deg) rotateY(0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Soft glowing shadow underneath the jewelry that reacts to tilt */}
            <div 
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-xl rounded-full transition-all duration-300"
              style={{
                transform: isHovering ? `translateX(${rotation.y * -1}px) scale(${1 + Math.abs(rotation.x)/40})` : 'translateX(0) scale(1)'
              }}
            />
            
            <Image
              src="/tbz-web/img/1611591437281-460914d2c14a.jpg"
              alt="Signature Masterpiece"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain filter mix-blend-multiply drop-shadow-2xl transition-transform duration-200 ease-out"
              style={{ 
                transform: isHovering ? 'translateZ(60px)' : 'translateZ(0px)',
                filter: isHovering ? 'drop-shadow(0 30px 40px rgba(0,0,0,0.15)) brightness(1.05)' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))'
              }}
            />
          </div>
          
          {/* Instruction text */}
          <div className={`absolute bottom-0 right-0 text-[10px] tracking-widest text-[var(--muted)] uppercase transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
            Hover to explore in 3D
          </div>
        </div>
      </div>
    </section>
  );
}
