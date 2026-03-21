"use client";

import { useState } from "react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog-newsletter", name: "" }),
      });
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div
      className="mt-12 rounded-2xl p-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(232,121,249,0.07), rgba(99,102,241,0.07), rgba(103,232,249,0.07))",
        border: "1px solid rgba(240,171,252,0.12)",
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.24em] text-white/30 mb-2">
        Stay in the loop
      </p>
      {state === "done" ? (
        <p className="text-sm text-emerald-400 font-medium">
          You&apos;re in. I&apos;ll send new posts your way.
        </p>
      ) : (
        <>
          <p className="text-base font-semibold text-white mb-1">
            Get new posts delivered to your inbox
          </p>
          <p className="text-xs text-white/40 mb-4">
            Platform engineering, frontend craft, and systems thinking. No spam.
          </p>
          <form onSubmit={submit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 rounded-xl px-3 py-2 text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #e879f9, #67e8f9)",
              }}
            >
              {state === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {state === "error" && (
            <p className="mt-2 text-xs text-rose-400">Something went wrong. Try again.</p>
          )}
        </>
      )}
    </div>
  );
}
