"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

type Tab = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  match?: (p: string) => boolean;
};

const stroke = (active: boolean) => (active ? "var(--gold-dark)" : "currentColor");

const tabs: Tab[] = [
  {
    href: "/",
    label: "Home",
    match: (p) => p === "/",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" stroke={stroke(a)} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/collections",
    label: "Shop",
    match: (p) => p.startsWith("/collections") || p.startsWith("/product"),
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 8h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" stroke={stroke(a)} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" stroke={stroke(a)} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/digital-gold",
    label: "Gold",
    match: (p) => p.startsWith("/digital-gold") || p.startsWith("/kalpavruksha"),
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke={stroke(a)} strokeWidth="1.5" />
        <path d="M12 8v8M9 11h6M9 14h6" stroke={stroke(a)} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/appointment",
    label: "Visits",
    match: (p) => p.startsWith("/appointment") || p.startsWith("/stores"),
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="15" rx="2" stroke={stroke(a)} strokeWidth="1.5" />
        <path d="M8 3v4M16 3v4M3.5 10h17" stroke={stroke(a)} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/account",
    label: "Profile",
    match: (p) => p.startsWith("/account") || p === "/login",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke={stroke(a)} strokeWidth="1.5" />
        <path d="M4.5 20c1.5-3.5 4.5-5 7.5-5s6 1.5 7.5 5" stroke={stroke(a)} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";
  const { user } = useAuth();

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[var(--border)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = t.match ? t.match(pathname) : pathname === t.href;
          const href =
            t.href === "/account" && !user ? "/login" : t.href;
          return (
            <li key={t.href} className="flex">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex-1 min-h-14 py-2 flex flex-col items-center justify-center gap-0.5 ${
                  active ? "text-[var(--gold-dark)]" : "text-[var(--muted)]"
                }`}
              >
                {t.icon(active)}
                <span className="text-[10px] tracking-[0.12em] uppercase">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
