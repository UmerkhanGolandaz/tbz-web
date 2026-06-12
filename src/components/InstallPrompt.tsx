"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "tbz-install-prompt-dismissed";

export default function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [hidden, setHidden] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(DISMISSED_KEY) === "1") {
      setHidden(true);
    }

    const onBIP = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    const onInstalled = () => {
      setEvt(null);
      setHidden(true);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!evt || hidden) return null;

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setHidden(true);
  };

  const install = async () => {
    setInstalling(true);
    await evt.prompt();
    await evt.userChoice;
    setInstalling(false);
    setEvt(null);
  };

  return (
    <aside
      aria-label="Install TBZ app"
      className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-4 right-4 md:bottom-5 md:left-auto md:right-6 md:w-[380px] z-50 overflow-hidden rounded-lg bg-white border border-[var(--border)] shadow-[0_18px_45px_rgba(26,26,26,0.16)]"
    >
      <div className="flex items-start gap-3 p-4">
        <div className="w-12 h-12 rounded-md bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center shrink-0">
          <Logo size={34} />
        </div>
        <div className="flex-1 min-w-0 pr-7">
          <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">
            Install TBZ
          </p>
          <p className="text-sm mt-1 leading-relaxed text-[var(--fg)]">
            Add TBZ to your home screen for quicker browsing, saved visits, and offline access.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={install}
              disabled={installing}
              className="btn-gold !py-2 !px-4 !text-[10px] disabled:opacity-60 disabled:cursor-wait"
            >
              {installing ? "Opening" : "Install"}
            </button>
            <button
              onClick={dismiss}
              className="min-h-10 px-1 text-[11px] tracking-brand uppercase text-[var(--muted)] hover:text-[var(--fg)]"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="absolute right-3 top-3 p-2 text-[var(--muted)] hover:text-[var(--fg)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
