"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

type Msg = {
  id: string;
  from: "bot" | "user";
  text: string;
  links?: { href: string; label: string }[];
};

const SUGGESTIONS = [
  "Show me bridal collections",
  "How do I book an appointment?",
  "What is Kalpavruksha?",
  "Where is the nearest store?",
  "Tell me about digital gold",
];

function botReply(input: string): Msg {
  const q = input.toLowerCase();
  const id = "b_" + Math.random().toString(36).slice(2, 8);

  if (/(bridal|wedding|marriage|shaadi)/.test(q)) {
    return {
      id, from: "bot",
      text: "Our bridal atelier covers Maharashtrian, South Indian temple, and North Indian polki sets. Browse the bridal capsule or book a private preview.",
      links: [
        { href: "/collections/bridal", label: "View Bridal" },
        { href: "/appointment?category=Bridal", label: "Book Preview" },
      ],
    };
  }
  if (/(diamond|solitaire)/.test(q)) {
    return {
      id, from: "bot",
      text: "Every diamond at TBZ is IGI / SGL certified and set in 18kt gold. Solitaires, danglers and tennis bracelets are popular picks.",
      links: [{ href: "/collections/diamond", label: "View Diamonds" }],
    };
  }
  if (/(gold|22kt|necklace|chain|bangle)/.test(q) && !/digital/.test(q)) {
    return {
      id, from: "bot",
      text: "22kt 916 BIS-hallmarked gold, hand-finished by master karigars. Have a piece in mind?",
      links: [
        { href: "/collections/gold", label: "View Gold" },
        { href: "/appointment", label: "Visit a Boutique" },
      ],
    };
  }
  if (/(jadau|polki|kundan|meenakari)/.test(q)) {
    return {
      id, from: "bot",
      text: "Our Jadau pieces use traditional polki and kundan techniques with meenakari reverse - heritage craft, hand by hand.",
      links: [{ href: "/collections/jadau", label: "View Jadau" }],
    };
  }
  if (/(appointment|book|visit|preview|try)/.test(q)) {
    return {
      id, from: "bot",
      text: "You can book a free private preview at any TBZ boutique. We will hold pieces ready for you and a consultant will help.",
      links: [{ href: "/appointment", label: "Book Appointment" }],
    };
  }
  if (/(store|location|near|address|boutique)/.test(q)) {
    return {
      id, from: "bot",
      text: "We have boutiques in Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Ahmedabad and Kolkata. Find your nearest one.",
      links: [{ href: "/stores", label: "Store Locator" }],
    };
  }
  if (/(kalpavruksha|saving|plan|instal)/.test(q)) {
    return {
      id, from: "bot",
      text: "Kalpavruksha is our gold savings plan. Pay 11 instalments, TBZ pays the 12th, then redeem against any jewellery.",
      links: [{ href: "/kalpavruksha", label: "Open Calculator" }],
    };
  }
  if (/(digital gold|24kt|vault|invest)/.test(q)) {
    return {
      id, from: "bot",
      text: "Buy 24kt 999.9 digital gold from ₹100 - stored in an insured vault, redeem in cash or jewellery any time.",
      links: [{ href: "/digital-gold", label: "Open Vault" }],
    };
  }
  if (/(gift|card|present)/.test(q)) {
    return {
      id, from: "bot",
      text: "TBZ Gift Cards are redeemable across the entire collection - in-store and online.",
      links: [{ href: "/gift-cards", label: "Send a Gift Card" }],
    };
  }
  if (/(price|cost|how much|rate)/.test(q)) {
    return {
      id, from: "bot",
      text: "Prices are listed on each product page. They include taxes and are indicative - final price is confirmed at the boutique based on the day's gold rate.",
    };
  }
  if (/(hi|hello|hey|namaste)/.test(q)) {
    return {
      id, from: "bot",
      text: "Hello! I'm your TBZ concierge. How may I help today?",
    };
  }
  if (/(thank)/.test(q)) {
    return {
      id, from: "bot",
      text: "Anytime. Wishing you a sparkling day from all of us at TBZ.",
    };
  }
  return {
    id, from: "bot",
    text: "I can help with collections, appointments, store locations, Kalpavruksha and digital gold. Try one of the suggestions below.",
  };
}

export default function ChatBot() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "welcome",
      from: "bot",
      text: "Welcome to TBZ! I am your jewellery concierge. Ask me anything - collections, visits, gold rate or Kalpavruksha.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  if (pathname.startsWith("/account")) return null;

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || thinking) return;
    const userMsg: Msg = {
      id: "u_" + Math.random().toString(36).slice(2, 8),
      from: "user",
      text: t,
    };
    const history = [...msgs, userMsg].map((m) => ({ from: m.from, text: m.text }));
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { text: string; links?: { href: string; label: string }[] };
      const reply: Msg = {
        id: "b_" + Math.random().toString(36).slice(2, 8),
        from: "bot",
        text: data.text,
        links: data.links,
      };
      setMsgs((m) => [...m, reply]);
    } catch {
      // Network or server failure - fall back to the local keyword bot
      // so the experience never breaks.
      setMsgs((m) => [...m, botReply(t)]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with TBZ"
          className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center ring-2 ring-[var(--gold)]"
        >
          <Logo size={36} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
        </button>
      )}

      {open && (
        <div
          className="fixed z-50 bg-white shadow-2xl border border-[var(--border)] flex flex-col
            bottom-24 lg:bottom-6 right-3 lg:right-6
            w-[calc(100vw-1.5rem)] max-w-[360px] h-[68vh] max-h-[560px]
            rounded-2xl overflow-hidden"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 text-white"
            style={{
              background: "linear-gradient(135deg, #c5a572 0%, #a8884e 100%)",
            }}
          >
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <Logo size={32} />
            </div>
            <div className="flex-1">
              <p className="text-sm leading-tight">TBZ Concierge</p>
              <p className="text-[10px] tracking-brand uppercase opacity-90">Online · usually replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1.5 -mr-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[var(--bg-alt)]">
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-[var(--gold)] text-white rounded-2xl rounded-br-sm"
                      : "bg-white border border-[var(--border)] rounded-2xl rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="text-[10px] tracking-brand uppercase px-2.5 py-1 border border-[var(--gold)] text-[var(--gold-dark)] rounded-full hover:bg-[var(--gold)] hover:text-white"
                        >
                          {l.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-[var(--border)] rounded-2xl rounded-bl-sm px-3.5 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse [animation-delay:160ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse [animation-delay:320ms]" />
                </div>
              </div>
            )}
          </div>

          {msgs.length <= 2 && (
            <div className="px-3 pt-2 pb-1 bg-[var(--bg-alt)] border-t border-[var(--border)]">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="shrink-0 text-[11px] px-2.5 py-1.5 border border-[var(--border)] rounded-full bg-white hover:border-[var(--gold)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-2 border-t border-[var(--border)] bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-sm focus:outline-none py-2"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send"
              className="w-9 h-9 rounded-full bg-[var(--gold)] text-white flex items-center justify-center disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12l16-8-4 16-4-6-8-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
