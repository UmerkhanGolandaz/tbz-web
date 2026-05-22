"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Notif = {
  id: string;
  title: string;
  body: string;
  kind: "appointment" | "gold" | "system" | "promo";
  href?: string;
  read: boolean;
  createdAt: string;
};

type Ctx = {
  items: Notif[];
  unread: number;
  push: (n: Omit<Notif, "id" | "read" | "createdAt">) => Notif;
  markAllRead: () => void;
  markRead: (id: string) => void;
  clearAll: () => void;
  permission: NotificationPermission | "unsupported";
  requestPermission: () => Promise<void>;
};

const C = createContext<Ctx | null>(null);

const seed = (): Notif[] => [
  {
    id: "seed-welcome",
    title: "Welcome to TBZ",
    body: "Explore heritage collections, try on at home, and earn digital gold with every visit.",
    kind: "system",
    href: "/collections",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-promo",
    title: "Festive preview is open",
    body: "Discover the Sahej bridal capsule. Visit a boutique or book a private preview.",
    kind: "promo",
    href: "/collections/bridal",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Notif[]>([]);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tbz.notifications");
      if (raw) setItems(JSON.parse(raw));
      else {
        const s = seed();
        localStorage.setItem("tbz.notifications", JSON.stringify(s));
        setItems(s);
      }
    } catch {}
    if (typeof window !== "undefined") {
      setPermission(
        "Notification" in window ? Notification.permission : "unsupported"
      );
    }
  }, []);

  const persist = (next: Notif[]) => {
    localStorage.setItem("tbz.notifications", JSON.stringify(next));
    setItems(next);
  };

  return (
    <C.Provider
      value={{
        items,
        unread: items.filter((x) => !x.read).length,
        push(n) {
          const notif: Notif = {
            ...n,
            id: "n_" + Math.random().toString(36).slice(2, 9),
            read: false,
            createdAt: new Date().toISOString(),
          };
          persist([notif, ...items]);
          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            try {
              new Notification(n.title, { body: n.body, icon: "/icons/icon-192.svg" });
            } catch {}
          }
          return notif;
        },
        markAllRead() {
          persist(items.map((x) => ({ ...x, read: true })));
        },
        markRead(id) {
          persist(items.map((x) => (x.id === id ? { ...x, read: true } : x)));
        },
        clearAll() {
          persist([]);
        },
        permission,
        async requestPermission() {
          if (typeof window === "undefined" || !("Notification" in window)) return;
          const p = await Notification.requestPermission();
          setPermission(p);
        },
      }}
    >
      {children}
    </C.Provider>
  );
}

export function useNotifications() {
  const v = useContext(C);
  if (!v) throw new Error("useNotifications must be used inside NotificationProvider");
  return v;
}
