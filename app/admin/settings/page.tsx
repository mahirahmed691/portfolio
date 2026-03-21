"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => setAvailable(d.available ?? true))
      .catch(() => setAvailable(true));
  }, []);

  const toggle = async () => {
    if (available === null) return;
    const next = !available;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setAvailable(next);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 sm:px-8 sm:py-10">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-1">Admin</p>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-white/40">Site-wide configuration.</p>
      </div>

      <div className="max-w-xl space-y-4">
        {/* Availability toggle */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white/90">
                Available for projects
              </p>
              <p className="mt-1 text-xs text-white/40 leading-relaxed">
                Controls the green availability badge in the hero section of the
                portfolio. When off, the badge shows &ldquo;Not currently
                available&rdquo;.
              </p>
            </div>

            <button
              onClick={toggle}
              disabled={saving || available === null}
              className="relative shrink-0 h-7 w-12 rounded-full transition-all focus:outline-none disabled:opacity-50"
              style={{
                background:
                  available
                    ? "linear-gradient(135deg, #4ade80, #22c55e)"
                    : "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              aria-checked={available ?? false}
              role="switch"
              aria-label="Toggle availability"
            >
              <span
                className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all"
                style={{
                  left: available ? "calc(100% - 26px)" : 2,
                }}
              />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs">
            {available === null ? (
              <span className="text-white/30">Loading…</span>
            ) : (
              <>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: available ? "#4ade80" : "rgba(255,255,255,0.25)" }}
                />
                <span style={{ color: available ? "#4ade80" : "rgba(255,255,255,0.35)" }}>
                  {available ? "Currently available" : "Not available"}
                </span>
              </>
            )}
            {saved && <span className="text-emerald-400 ml-2">Saved ✓</span>}
            {error && <span className="text-rose-400 ml-2">{error}</span>}
          </div>

          <div
            className="mt-4 rounded-xl p-3 text-xs"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.6,
            }}
          >
            Requires a <code className="font-mono text-white/40">site_settings</code> table in
            Supabase with columns <code className="font-mono text-white/40">key TEXT PRIMARY KEY</code> and{" "}
            <code className="font-mono text-white/40">value TEXT</code>. Insert{" "}
            <code className="font-mono text-white/40">('available', 'true')</code> to initialise.
          </div>
        </div>
      </div>
    </div>
  );
}
