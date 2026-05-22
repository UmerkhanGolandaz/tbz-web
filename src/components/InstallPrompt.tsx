"use client";

import { useEffect, useState } from "react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onBIP = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    const onInstalled = () => setEvt(null);
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!evt || hidden) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[360px] z-50 bg-white border border-[var(--border)] shadow-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-sm bg-[var(--bg-alt)] flex items-center justify-center">
          <span className="serif italic text-xl text-[var(--gold-dark)]">tbz</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">
            Install the App
          </p>
          <p className="text-sm mt-1 leading-snug">
            Add TBZ to your home screen for a faster, offline-friendly experience.
          </p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={async () => {
                await evt.prompt();
                await evt.userChoice;
                setEvt(null);
              }}
              className="btn-gold !py-1.5 !px-3 !text-[10px]"
            >
              Install
            </button>
            <button
              onClick={() => setHidden(true)}
              className="text-[11px] tracking-brand uppercase text-[var(--muted)]"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
