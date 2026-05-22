"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = {
  items: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => boolean; // returns true if now saved
  remove: (id: string) => void;
};

const C = createContext<Ctx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tbz.wishlist");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    localStorage.setItem("tbz.wishlist", JSON.stringify(next));
    setItems(next);
  };

  return (
    <C.Provider
      value={{
        items,
        has: (id) => items.includes(id),
        toggle: (id) => {
          if (items.includes(id)) {
            persist(items.filter((x) => x !== id));
            return false;
          }
          persist([id, ...items]);
          return true;
        },
        remove: (id) => persist(items.filter((x) => x !== id)),
      }}
    >
      {children}
    </C.Provider>
  );
}

export function useWishlist() {
  const v = useContext(C);
  if (!v) throw new Error("useWishlist must be used inside WishlistProvider");
  return v;
}
