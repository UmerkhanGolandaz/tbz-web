"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useAppointments } from "@/components/AppointmentProvider";
import { useDigitalGold } from "@/components/DigitalGoldProvider";
import { useNotifications } from "@/components/NotificationProvider";
import { useWishlist } from "@/components/WishlistProvider";
import Image from "next/image";
import { stores, products, formatINR } from "@/lib/data";

export default function Account() {
  const { user, setName, signOut } = useAuth();
  const { appointments, cancel } = useAppointments();
  const { balanceGrams, ratePerGram, txns } = useDigitalGold();
  const { items: notifs, unread } = useNotifications();
  const { items: wishlist, remove: removeWish } = useWishlist();
  const router = useRouter();
  const [name, setLocalName] = useState(user?.name || "");
  const [savedFlash, setSavedFlash] = useState(false);

  if (!user) {
    return (
      <section className="max-w-md mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl mb-3">My Account</h1>
        <p className="text-[var(--muted)] mb-8">Sign in to view your account.</p>
        <Link href="/login" className="btn-gold inline-block">Sign In</Link>
      </section>
    );
  }

  const initial = (user.name || user.identifier || "U").trim().charAt(0).toUpperCase();
  const inrValue = balanceGrams * ratePerGram;
  const upcoming = appointments.filter((a) => new Date(a.date + "T" + a.time) >= new Date());
  const recentGold = txns.slice(0, 4);

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[var(--gold)] text-white flex items-center justify-center serif text-3xl">
          {initial}
        </div>
        <div className="flex-1">
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">My TBZ</p>
          <h1 className="text-3xl md:text-4xl mt-1">
            Hello{user.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-[var(--muted)] text-sm mt-0.5">{user.identifier}</p>
        </div>
      </header>

      <div className="gold-divider my-8" />

      {/* Top stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat
          label="Digital Gold"
          value={`${balanceGrams.toFixed(4)} g`}
          sub={`≈ ${formatINR(Math.round(inrValue))}`}
          href="/digital-gold"
          accent
        />
        <Stat
          label="Appointments"
          value={String(upcoming.length)}
          sub={upcoming.length === 1 ? "upcoming" : "upcoming visits"}
          href="#appointments"
        />
        <Stat
          label="Notifications"
          value={String(unread)}
          sub={`${notifs.length} total`}
          href="#activity"
        />
        <Stat
          label="Gold Rate"
          value={formatINR(ratePerGram)}
          sub="per gram · 24kt"
          href="/digital-gold"
        />
      </div>

      {/* Vault + Quick actions */}
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 mt-6">
        <div className="bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-white p-6">
          <p className="text-[11px] tracking-brand uppercase opacity-90">TBZ Gold Vault</p>
          <p className="serif text-4xl mt-1">
            {balanceGrams.toFixed(4)} <span className="text-xl">g</span>
          </p>
          <p className="text-sm opacity-90">≈ {formatINR(Math.round(inrValue))}</p>
          <div className="gold-divider my-4 opacity-60" />
          <div className="flex items-end justify-between">
            <div className="text-xs opacity-90">
              <p>24kt 999.9 · insured vault</p>
              <p className="mt-0.5">Live rate {formatINR(ratePerGram)}/g</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/digital-gold"
                className="inline-flex items-center text-[10px] tracking-brand uppercase rounded-full px-3 py-1.5 border border-white/70 text-white hover:bg-white hover:text-[var(--gold-dark)]"
              >
                Buy
              </Link>
              <Link
                href="/digital-gold"
                className="inline-flex items-center text-[10px] tracking-brand uppercase rounded-full px-3 py-1.5 bg-white text-[var(--gold-dark)]"
              >
                Manage
              </Link>
            </div>
          </div>
        </div>

        <div className="border border-[var(--border)] p-5">
          <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)] mb-3">
            Quick Actions
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] tracking-brand uppercase">
            <QA href="/appointment" label="Book Visit" />
            <QA href="/digital-gold" label="Buy Gold" />
            <QA href="/collections" label="Shop" />
            <QA href="/kalpavruksha" label="Kalpavruksha" />
            <QA href="/gift-cards" label="Gift Card" />
            <QA href="/stores" label="Find Store" />
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="mt-12">
        <h2 className="text-2xl mb-4">Profile</h2>
        <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
          <label className="flex-1">
            <span className="text-[11px] tracking-brand uppercase text-[var(--muted)]">
              Display Name
            </span>
            <input
              value={name}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
          </label>
          <button
            onClick={() => {
              setName(name);
              setSavedFlash(true);
              setTimeout(() => setSavedFlash(false), 1600);
            }}
            className="btn-outline"
          >
            Save
          </button>
        </div>
        {savedFlash && (
          <p className="mt-2 text-xs text-[var(--gold-dark)]">Saved.</p>
        )}
      </div>

      {/* Appointments */}
      <div id="appointments" className="mt-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl">My Appointments</h2>
          <Link
            href="/appointment"
            className="text-[11px] tracking-brand uppercase text-[var(--muted)] hover:text-[var(--fg)]"
          >
            + New
          </Link>
        </div>
        {appointments.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">
            You haven&apos;t booked any appointments yet.{" "}
            <Link href="/appointment" className="underline">Book one →</Link>
          </p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((a) => {
              const s = stores.find((x) => x.id === a.storeId);
              const past = new Date(a.date + "T" + a.time) < new Date();
              return (
                <li
                  key={a.id}
                  className="border border-[var(--border)] p-4 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">
                      {a.id.toUpperCase()} {past ? "· past" : "· upcoming"}
                    </p>
                    <p className="mt-0.5">
                      {s?.area}, {s?.city} · {a.date} at {a.time}
                    </p>
                    <p className="text-xs text-[var(--muted)]">Category: {a.category}</p>
                  </div>
                  {!past && (
                    <button
                      onClick={() => cancel(a.id)}
                      className="text-[11px] tracking-brand uppercase text-[var(--muted)] underline hover:text-red-600"
                    >
                      Cancel
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Favorites */}
      <div id="favorites" className="mt-12 scroll-mt-20">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl">My Favorites</h2>
          <span className="text-[11px] tracking-brand uppercase text-[var(--muted)]">
            {wishlist.length} saved
          </span>
        </div>
        {wishlist.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">
            Tap the heart on any piece to save it here.{" "}
            <Link href="/collections" className="underline">Start browsing →</Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlist
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is NonNullable<typeof p> => Boolean(p))
              .map((p) => (
                <div key={p.id} className="group relative">
                  <Link href={`/product/${p.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-[var(--bg-alt)] rounded-xl">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width:768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="pt-2">
                      <p className="text-[10px] tracking-brand uppercase text-[var(--muted)]">
                        {p.type}
                      </p>
                      <p className="text-sm leading-tight mt-0.5 line-clamp-1">{p.name}</p>
                      <p className="text-sm text-[var(--gold-dark)] mt-0.5">
                        {formatINR(p.price)}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => removeWish(p.id)}
                    aria-label={`Remove ${p.name} from favorites`}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 text-[var(--gold-dark)] flex items-center justify-center shadow-sm hover:bg-[var(--gold)] hover:text-white"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Gold transactions */}
      <div className="mt-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl">Recent Gold Activity</h2>
          <Link
            href="/digital-gold"
            className="text-[11px] tracking-brand uppercase text-[var(--muted)] hover:text-[var(--fg)]"
          >
            View all →
          </Link>
        </div>
        {recentGold.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">
            Start your gold journey from{" "}
            <Link href="/digital-gold" className="underline">Digital Gold →</Link>
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {recentGold.map((t) => (
              <li key={t.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm capitalize">
                    {t.type === "reward" ? "Reward credit" : t.type}
                    {t.note ? ` · ${t.note}` : ""}
                  </p>
                  <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mt-0.5">
                    {new Date(t.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm ${
                      t.type === "sell" ? "text-red-600" : "text-[var(--gold-dark)]"
                    }`}
                  >
                    {t.type === "sell" ? "-" : "+"}
                    {t.grams.toFixed(4)} g
                  </p>
                  <p className="text-[11px] tracking-brand uppercase text-[var(--muted)]">
                    {formatINR(t.amountInr)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Activity feed */}
      <div id="activity" className="mt-12 mb-8">
        <h2 className="text-2xl mb-4">Activity</h2>
        {notifs.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">No recent activity.</p>
        ) : (
          <ul className="space-y-3">
            {notifs.slice(0, 6).map((n) => (
              <li
                key={n.id}
                className="flex items-start gap-3 border border-[var(--border)] p-3"
              >
                <span
                  className={`mt-1 w-1.5 h-1.5 rounded-full ${
                    n.read ? "bg-transparent border border-[var(--border)]" : "bg-[var(--gold)]"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm">{n.title}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{n.body}</p>
                  <p className="text-[10px] tracking-brand uppercase text-[var(--muted)] mt-1">
                    {new Date(n.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                {n.href && (
                  <Link
                    href={n.href}
                    className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] self-center"
                  >
                    Open →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-12 mb-6">
        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="w-full py-3 text-[11px] tracking-brand uppercase border border-red-500 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
  href,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  href?: string;
  accent?: boolean;
}) {
  const body = (
    <div
      className={`p-4 h-full ${
        accent
          ? "bg-[var(--bg-alt)] border border-[var(--gold-light)]"
          : "border border-[var(--border)]"
      }`}
    >
      <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">{label}</p>
      <p className={`mt-1 ${accent ? "text-2xl serif" : "text-xl"}`}>{value}</p>
      {sub && <p className="text-[11px] text-[var(--muted)] mt-0.5">{sub}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

function QA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="border border-[var(--border)] py-2.5 text-center hover:border-[var(--gold)] hover:text-[var(--gold-dark)]"
    >
      {label}
    </Link>
  );
}
