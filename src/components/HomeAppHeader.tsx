"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./AuthProvider";
import { useDigitalGold } from "./DigitalGoldProvider";
import { useAppointments } from "./AppointmentProvider";
import { collections, formatINR } from "@/lib/data";

const CATEGORY_LABELS: Record<string, string> = {
  gold: "Gold",
  diamond: "Diamond",
  bridal: "Bridal",
  jadau: "Jadau",
  platinum: "Platinum",
  kalpavruksha: "Plan",
};

const QUICK = [
  {
    href: "/appointment",
    label: "Book Visit",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.1" />
        <path d="M8 3.5v3.5M16 3.5v3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M10.2 14.3l1.4 1.4 2.6-2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/digital-gold",
    label: "Buy Gold",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="6.2" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <text x="12" y="15.5" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontSize="9" fill="currentColor">au</text>
      </svg>
    ),
  },
  {
    href: "/kalpavruksha",
    label: "Plan",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21v-7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M9.5 21h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M12 14c-3.6 0-6-2.2-6-5s2.4-5 6-5 6 2.2 6 5-2.4 5-6 5Z" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="9" cy="7" r="0.8" fill="currentColor" />
        <circle cx="15" cy="7" r="0.8" fill="currentColor" />
        <circle cx="12" cy="5.2" r="0.8" fill="currentColor" />
        <circle cx="9.5" cy="10.2" r="0.7" fill="currentColor" />
        <circle cx="14.5" cy="10.2" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/stores",
    label: "Stores",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M12 6.2l2.4 2.6-2.4 2.6-2.4-2.6Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/gift-cards",
    label: "Gift Card",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M3 12.5h18" stroke="currentColor" strokeWidth="1.1" />
        <path d="M12 8v13" stroke="currentColor" strokeWidth="1.1" />
        <path d="M12 8c-1.5-3-5-2.6-5 0 0 1.4 2 1.6 5 0Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M12 8c1.5-3 5-2.6 5 0 0 1.4-2 1.6-5 0Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeAppHeader() {
  const { user } = useAuth();
  const { balanceGrams, ratePerGram } = useDigitalGold();
  const { appointments } = useAppointments();
  const upcoming = appointments.filter(
    (a) => new Date(a.date + "T" + a.time) >= new Date()
  ).length;

  const initial = (user?.name || user?.identifier || "?").trim().charAt(0).toUpperCase();

  return (
    <section className="lg:hidden bg-white pt-2 pb-4">
      <div className="px-5">
        <div className="flex items-center gap-3 mt-2">
          <Link
            href={user ? "/account" : "/login"}
            aria-label="Profile"
            className="w-11 h-11 rounded-full bg-[var(--gold)] text-white flex items-center justify-center serif text-xl shrink-0"
          >
            {user ? initial : "·"}
          </Link>
          <div className="min-w-0">
            <p className="text-[11px] tracking-brand uppercase text-[var(--muted)]">{greeting()}</p>
            <p className="text-base truncate">
              {user ? user.name || "Welcome back" : "Welcome to TBZ"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link
            href="/digital-gold"
            className="bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-white p-3 rounded-2xl"
          >
            <p className="text-[10px] tracking-brand uppercase opacity-90">Gold Vault</p>
            <p className="serif text-xl leading-tight mt-1">
              {balanceGrams.toFixed(3)} <span className="text-sm">g</span>
            </p>
            <p className="text-[10px] opacity-90 mt-0.5">{formatINR(ratePerGram)} / g</p>
          </Link>
          <Link
            href="/account"
            className="border border-[var(--border)] p-3 rounded-2xl"
          >
            <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">Visits</p>
            <p className="serif text-xl leading-tight mt-1">{upcoming}</p>
            <p className="text-[10px] text-[var(--muted)] mt-0.5">
              {upcoming === 1 ? "upcoming visit" : "upcoming visits"}
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-5 px-5">
        <div className="grid grid-cols-5 gap-1">
          {QUICK.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="flex flex-col items-center gap-1.5 overflow-hidden"
            >
              <span className="w-12 h-12 rounded-full bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center text-[var(--gold-dark)]">
                {q.icon}
              </span>
              <span className="text-[10px] tracking-[0.1em] uppercase text-center leading-tight min-h-[2lh] flex items-start">
                {q.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5 px-5">
        <div className="grid grid-cols-5 gap-1">
          {collections.filter((c) => c.slug !== "kalpavruksha").map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="flex flex-col items-center gap-1.5 overflow-hidden"
            >
              <span className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-[var(--gold-light)]">
                <Image
                  src={c.hero}
                  alt={c.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="text-[10px] tracking-[0.1em] uppercase text-center leading-tight min-h-[2lh] flex items-start">
                {CATEGORY_LABELS[c.slug] || c.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
