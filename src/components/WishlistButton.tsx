"use client";

export default function WishlistButton() {
  return (
    <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Wishlist logic */ }}
      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center text-[var(--muted)] hover:text-red-500 hover:scale-110 shadow-lg transition-all duration-500 delay-100"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
