"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = { id: string; identifier: string; method: "otp" | "email"; name?: string };

type AuthCtx = {
  user: User | null;
  signIn: (u: User) => void;
  signOut: () => void;
  setName: (name: string) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

// Hardcoded demo user. Auth flow is bypassed for now so the app feels
// pre-signed-in.
const DEMO_USER: User = {
  id: "u_demo",
  identifier: "9999999999",
  method: "otp",
  name: "Aanya",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_USER);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tbz.user");
      if (raw) setUser(JSON.parse(raw));
      else localStorage.setItem("tbz.user", JSON.stringify(DEMO_USER));
    } catch {}
  }, []);

  const persist = (u: User | null) => {
    const next = u || DEMO_USER;
    localStorage.setItem("tbz.user", JSON.stringify(next));
    setUser(next);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        signIn: persist,
        signOut: () => persist(DEMO_USER),
        setName: (name) => persist({ ...(user || DEMO_USER), name }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
