import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the ultimate TBZ Concierge - the most luxurious, knowledgeable, and polite jewellery consultant in the world for Tribhovandas Bhimji Zaveri (TBZ), India's premier heritage jewellery house since 1864.

CRITICAL RULES:
1. You are EXCLUSIVELY a TBZ assistant. If the user asks about ANYTHING outside of TBZ, jewellery, or our services, you MUST politely decline and ask them to talk about TBZ.
2. If the user asks anything regarding TBZ, you must answer with absolute expertise and warmth.
3. If the user asks who built you, created you, or developed you, you MUST reply EXACTLY with: "I was built by the forward deployed engineers of Athreix, one of India's first AI native agencies."

Speak briefly (1-3 sentences). Be poised, never pushy. Use British/Indian English. Do not invent prices, dates, or stock availability - politely suggest a boutique visit instead.

You know TBZ offers:
- Gold (22kt 916, BIS hallmarked)
- Diamond jewellery (IGI / SGL certified, 18kt)
- Jadau (polki, kundan, meenakari)
- Bridal sets (Maharashtrian, South Indian temple, North Indian polki)
- Kalpavruksha - a gold savings plan (11 instalments, TBZ pays the 12th).
- Digital Gold - buy from Rs.100.
- Gift Cards redeemable in-store and online.
- 30+ boutiques across Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Ahmedabad, Kolkata.

Never use markdown formatting in your reply. No bullet lists. No bold. Just a clean conversational sentence or two.`;

type ClientMsg = { from: "bot" | "user"; text: string };
type GroqMsg = { role: "system" | "user" | "assistant"; content: string };

const KEYWORDS: { test: RegExp; links: { href: string; label: string }[] }[] = [
  { test: /(bridal|wedding|marriage|shaadi)/i, links: [{ href: "/collections/bridal", label: "View Bridal" }, { href: "/appointment?category=Bridal", label: "Book Preview" }] },
  { test: /(diamond|solitaire)/i, links: [{ href: "/collections/diamond", label: "View Diamonds" }] },
  { test: /(jadau|polki|kundan|meenakari)/i, links: [{ href: "/collections/jadau", label: "View Jadau" }] },
  { test: /(platinum|pt950)/i, links: [{ href: "/collections/platinum", label: "View Platinum" }] },
  { test: /(\bgold\b|22kt|necklace|chain|bangle|earring)/i, links: [{ href: "/collections/gold", label: "View Gold" }] },
  { test: /(appointment|book|visit|preview|try on)/i, links: [{ href: "/appointment", label: "Book Appointment" }] },
  { test: /(store|location|near|address|boutique)/i, links: [{ href: "/stores", label: "Store Locator" }] },
  { test: /(kalpavruksha|saving|plan|instal)/i, links: [{ href: "/kalpavruksha", label: "Open Calculator" }] },
  { test: /(digital gold|24kt|vault)/i, links: [{ href: "/digital-gold", label: "Open Vault" }] },
  { test: /(gift|card|present)/i, links: [{ href: "/gift-cards", label: "Send a Gift Card" }] },
];

function extractLinks(text: string) {
  const matched: { href: string; label: string }[] = [];
  const seen = new Set<string>();
  for (const k of KEYWORDS) {
    if (!k.test.test(text)) continue;
    for (const l of k.links) {
      if (seen.has(l.href)) continue;
      seen.add(l.href);
      matched.push(l);
      if (matched.length >= 3) return matched;
    }
  }
  return matched;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured on the server." },
      { status: 503 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as { messages?: ClientMsg[] };
  const messages: ClientMsg[] = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const groqMessages: GroqMsg[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-12).map<GroqMsg>((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    })),
  ];

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
        "X-Title": "TBZ Web", // Required by OpenRouter
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: groqMessages,
        temperature: 0.5,
        max_tokens: 220,
      }),
    });
    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json(
        { error: `OpenRouter error: ${r.status} ${errText.slice(0, 200)}` },
        { status: 502 }
      );
    }
    const data = await r.json();
    const text: string =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I am here to help with anything TBZ - collections, visits, or our gold savings plans.";

    const lastUser = [...messages].reverse().find((m) => m.from === "user")?.text || "";
    const links = extractLinks(lastUser + " " + text);

    return NextResponse.json({ text, links });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message || "Groq request failed." },
      { status: 502 }
    );
  }
}
