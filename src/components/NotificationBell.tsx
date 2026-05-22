"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useNotifications, Notif } from "./NotificationProvider";

const KIND_BG: Record<Notif["kind"], string> = {
  gold: "bg-[var(--gold-light)] text-[var(--gold-dark)]",
  appointment: "bg-[var(--bg-alt)] text-[var(--gold-dark)] ring-1 ring-[var(--gold-light)]",
  promo: "bg-rose-50 text-rose-600",
  system: "bg-neutral-100 text-neutral-700",
};

const KIND_ICON: Record<Notif["kind"], React.ReactNode> = {
  gold: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <text x="12" y="15.5" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="9" fill="currentColor">au</text>
    </svg>
  ),
  appointment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 10h17M8 3.5v3.5M16 3.5v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  promo: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l1.6 4.6L18 8l-3.4 2.4L16 15l-4-2.6L8 15l1.4-4.6L6 8l4.4-1.4L12 2Z" fill="currentColor" />
    </svg>
  ),
  system: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 8v5M12 16v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

export default function NotificationBell() {
  const { items, unread, markAllRead, markRead, clearAll, permission, requestPermission } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        className="relative p-1.5 -mr-1.5"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[var(--gold)] text-white text-[9px] flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(360px,90vw)] bg-white border border-[var(--border)] shadow-xl z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <p className="text-[11px] tracking-brand uppercase text-[var(--gold-dark)]">
              Notifications
            </p>
            <div className="flex gap-3 text-[10px] tracking-brand uppercase text-[var(--muted)]">
              {unread > 0 && (
                <button onClick={markAllRead} className="hover:text-[var(--fg)]">
                  Mark all read
                </button>
              )}
              {items.length > 0 && (
                <button onClick={clearAll} className="hover:text-[var(--fg)]">Clear</button>
              )}
            </div>
          </div>

          {permission === "default" && (
            <div className="px-4 py-3 bg-[var(--bg-alt)] text-xs flex items-center justify-between gap-3">
              <span className="text-[var(--muted)]">
                Enable browser alerts for boutique updates
              </span>
              <button
                onClick={requestPermission}
                className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] hover:text-[var(--fg)]"
              >
                Enable
              </button>
            </div>
          )}

          <ul className="max-h-[60vh] overflow-y-auto divide-y divide-[var(--border)]">
            {items.length === 0 && (
              <li className="px-4 py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-alt)] mx-auto mb-3 flex items-center justify-center text-[var(--gold)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm">You&apos;re all caught up.</p>
                <p className="text-[11px] tracking-brand uppercase text-[var(--muted)] mt-1">
                  We&apos;ll let you know when something new arrives.
                </p>
              </li>
            )}
            {items.map((n) => {
              const inner = (
                <div
                  className={`flex items-start gap-3 px-4 py-3.5 hover:bg-[var(--bg-alt)] transition relative ${
                    n.read ? "" : "bg-[var(--bg-alt)]/60"
                  }`}
                >
                  {!n.read && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--gold)]" />
                  )}
                  <span
                    className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center ${KIND_BG[n.kind]}`}
                  >
                    {KIND_ICON[n.kind]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className={`text-sm leading-tight truncate ${n.read ? "" : "font-medium"}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] tracking-brand uppercase text-[var(--muted)] shrink-0">
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed line-clamp-2">
                      {n.body}
                    </p>
                    {n.href && (
                      <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)] mt-1.5">
                        Open →
                      </p>
                    )}
                  </div>
                </div>
              );
              const onClick = () => {
                markRead(n.id);
                setOpen(false);
              };
              return (
                <li key={n.id}>
                  {n.href ? (
                    <Link href={n.href} onClick={onClick}>
                      {inner}
                    </Link>
                  ) : (
                    <button onClick={onClick} className="w-full text-left">
                      {inner}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}
