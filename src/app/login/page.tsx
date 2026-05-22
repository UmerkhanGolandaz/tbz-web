"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

type Mode = "phone" | "email";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [mode, setMode] = useState<Mode>("phone");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"input" | "verify">("input");
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, type: mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send OTP");
      setStage("verify");
      const isDemo = /9999999999$/.test(identifier) || identifier.toLowerCase() === "demo@tbz.in";
      setHint(
        isDemo
          ? "Demo mode · enter OTP 123456 to sign in."
          : `OTP sent. For this demo, your code is ${data.devOtp}.`
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      signIn({ id: data.user.id, identifier, method: mode === "phone" ? "otp" : "email" });
      router.push("/account");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-center text-4xl mb-2">Sign In</h1>
      <p className="text-center text-sm text-[var(--muted)] mb-6">
        Welcome to TBZ · heritage jewellery since 1864
      </p>

      <div className="bg-[var(--bg-alt)] border border-[var(--border)] px-4 py-3 mb-8 text-center">
        <p className="text-[10px] tracking-brand uppercase text-[var(--gold-dark)]">
          Demo Sign-In
        </p>
        <p className="text-sm mt-1">
          Phone <strong>9999999999</strong> · Email <strong>demo@tbz.in</strong>
          <br />
          OTP <strong>123456</strong>
        </p>
      </div>
      <div className="gold-divider mb-8" />

      <div className="flex border border-[var(--border)] mb-8">
        <button
          className={`flex-1 py-2.5 text-[11px] tracking-brand uppercase ${
            mode === "phone" ? "bg-[var(--gold)] text-white" : "text-[var(--muted)]"
          }`}
          onClick={() => {
            setMode("phone");
            setStage("input");
            setIdentifier("");
            setHint(null);
            setError(null);
          }}
        >
          Phone OTP
        </button>
        <button
          className={`flex-1 py-2.5 text-[11px] tracking-brand uppercase ${
            mode === "email" ? "bg-[var(--gold)] text-white" : "text-[var(--muted)]"
          }`}
          onClick={() => {
            setMode("email");
            setStage("input");
            setIdentifier("");
            setHint(null);
            setError(null);
          }}
        >
          Email Link
        </button>
      </div>

      {stage === "input" ? (
        <div className="space-y-5">
          <label className="block">
            <span className="text-[11px] tracking-brand uppercase text-[var(--muted)]">
              {mode === "phone" ? "Mobile Number" : "Email Address"}
            </span>
            <input
              type={mode === "phone" ? "tel" : "email"}
              inputMode={mode === "phone" ? "tel" : "email"}
              autoComplete={mode === "phone" ? "tel" : "email"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={mode === "phone" ? "+91 98xxxxxxxx" : "you@example.com"}
              className="mt-2 w-full border-b border-[var(--border)] py-2 focus:outline-none focus:border-[var(--gold)]"
            />
          </label>
          <button
            onClick={sendOtp}
            disabled={loading || !identifier}
            className="btn-gold w-full disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send OTP"}
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-[var(--muted)]">
            Enter the 6-digit code sent to <strong>{identifier}</strong>.{" "}
            <button
              type="button"
              onClick={() => setStage("input")}
              className="underline"
            >
              change
            </button>
          </p>
          <input
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="• • • • • •"
            className="w-full text-center tracking-[0.5em] text-2xl border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)]"
          />
          <button
            onClick={verify}
            disabled={loading || code.length < 6}
            className="btn-gold w-full disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify & Sign In"}
          </button>
          <button
            type="button"
            onClick={sendOtp}
            className="text-[11px] tracking-brand uppercase text-[var(--muted)] underline"
          >
            Resend code
          </button>
        </div>
      )}

      {hint && (
        <p className="mt-6 text-center text-xs text-[var(--gold-dark)]">{hint}</p>
      )}
      {error && (
        <p className="mt-6 text-center text-xs text-red-600">{error}</p>
      )}

      <p className="mt-10 text-center text-[11px] tracking-brand uppercase text-[var(--muted)]">
        By signing in you agree to our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
      </p>
    </section>
  );
}
