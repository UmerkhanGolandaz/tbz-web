"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useAuth } from "./AuthProvider";
import NotificationBell from "./NotificationBell";
import SearchModal from "./SearchModal";
import { useDigitalGold } from "./DigitalGoldProvider";

const navLeft = [
  { href: "/stores", label: "Store Locator" },
  { href: "/appointment", label: "Make an Appointment" },
];
const navRight = [
  { href: "/digital-gold", label: "Digital Gold" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/kalpavruksha", label: "Buy Kalpavruksha" },
];
const mainNav = [
  { href: "/collections/gold", label: "Gold" },
  { href: "/collections/diamond", label: "Diamond" },
  { href: "/collections", label: "Collections" },
  { href: "/collections/jadau", label: "Jadau" },
  { href: "/franchise", label: "Franchisee Enquiries" },
  { href: "/about", label: "About Us" },
];

function GoldBalancePill() {
  const { balanceGrams } = useDigitalGold();
  if (balanceGrams <= 0) return null;
  return (
    <Link
      href="/digital-gold"
      className="px-2 py-0.5 rounded-full bg-[var(--gold-light)] text-[var(--gold-dark)] text-[10px] tracking-brand"
      title="Digital gold balance"
    >
      {balanceGrams.toFixed(3)} g
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[var(--border)] shadow-sm transition-all duration-300">

      {/* desktop top row */}
      <div className="hidden lg:grid grid-cols-3 items-center px-8 py-4">
        <nav className="flex items-center gap-6 text-[11px] tracking-brand uppercase text-[var(--muted)]">
          {navLeft.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-[var(--gold-dark)]">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex justify-center">
          <Link href="/" aria-label="TBZ home">
            <Logo size={72} />
          </Link>
        </div>
        <nav className="flex items-center gap-6 justify-end text-[11px] tracking-brand uppercase text-[var(--muted)]">
          {navRight.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-[var(--gold-dark)]">
              {n.label}
            </Link>
          ))}
          <Link
            href={user ? "/account" : "/login"}
            aria-label={user ? "Account" : "Sign In"}
            className="hover:text-[var(--gold-dark)] flex items-center"
          >
            {user ? (
              <span className="w-7 h-7 rounded-full bg-[var(--gold)] text-white text-[11px] tracking-normal flex items-center justify-center uppercase">
                {(user.name || user.identifier || "U").trim().charAt(0)}
              </span>
            ) : (
              "Sign In"
            )}
          </Link>
          <GoldBalancePill />
          <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[var(--gold-dark)] flex items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <NotificationBell />
        </nav>
      </div>

      {/* desktop main nav */}
      <div className="hidden lg:flex justify-center gap-10 pb-4 text-[12px] tracking-brand uppercase">
        {mainNav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="text-[var(--fg)] hover:text-[var(--gold-dark)]"
          >
            {n.label}
          </Link>
        ))}
      </div>

      {/* mobile bar */}
      <div className="lg:hidden grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
        <div className="flex items-center gap-1 justify-start">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-1.5 -ml-1.5 text-[var(--muted)] hover:text-[var(--gold-dark)]"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <Link href="/" aria-label="TBZ home">
          <Logo size={52} />
        </Link>
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="p-1.5 text-[var(--muted)] hover:text-[var(--gold-dark)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <NotificationBell />
        </div>
      </div>

      </header>

      {/* mobile drawer - only items not in the bottom tab bar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/45" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="absolute left-0 top-0 h-full w-[84%] max-w-sm bg-white overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 pt-5 pb-3">
              <Logo size={52} />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="gold-divider mb-2" />

            <DrawerGroup
              title="Shop By Category"
              items={[
                { href: "/collections/gold", label: "Gold" },
                { href: "/collections/diamond", label: "Diamond" },
                { href: "/collections/jadau", label: "Jadau" },
                { href: "/collections/bridal", label: "Bridal" },
                { href: "/collections/platinum", label: "Platinum" },
              ]}
              onNav={() => setOpen(false)}
            />
            <DrawerGroup
              title="Services"
              items={[
                { href: "/gift-cards", label: "Gift Cards" },
                { href: "/kalpavruksha", label: "Kalpavruksha Plan" },
                { href: "/stores", label: "Store Locator" },
              ]}
              onNav={() => setOpen(false)}
            />
            <DrawerGroup
              title="About"
              items={[
                { href: "/about", label: "Our Heritage" },
                { href: "/franchise", label: "Franchisee Enquiries" },
                { href: "/contact", label: "Contact" },
              ]}
              onNav={() => setOpen(false)}
            />

            <p className="text-[10px] tracking-brand uppercase text-[var(--muted)] text-center pt-2 pb-6">
              TBZ - The Original - Since 1864
            </p>
          </div>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function DrawerGroup({
  title,
  items,
  onNav,
}: {
  title: string;
  items: { href: string; label: string }[];
  onNav: () => void;
}) {
  return (
    <div className="px-6 py-4 border-b border-[var(--border)]">
      <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] mb-3">
        {title}
      </p>
      <nav className="flex flex-col gap-3">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            onClick={onNav}
            className="text-[13px] tracking-brand uppercase"
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
