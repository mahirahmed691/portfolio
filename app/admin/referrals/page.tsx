"use client";

import { useEffect, useMemo, useState } from "react";

type Referral = {
  id: string;
  name: string;
  email: string | null;
  code: string;
  commission: string;
  clicks: number;
  leads: number;
  created_at: string;
  active: boolean;
};

type ReferralInsert = {
  name: string;
  email: string | null;
  code: string;
  commission: string;
  clicks: number;
  leads: number;
  active: boolean;
};

function generateCode(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${slug}-${rand}`;
}

function buildLink(code: string, baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  return `${cleanBase}?ref=${code}`;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatDate(date: string) {
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

function BentoCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl bg-[#0c1929] ${className}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.25)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] uppercase tracking-[0.2em] text-white/35 font-medium ${className}`}
    >
      {children}
    </p>
  );
}

function GhostBtn({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      {...props}
      className={`inline-flex h-9 items-center justify-center rounded-xl bg-white/[0.05] px-4 text-xs font-medium text-white/75 transition-all hover:bg-white/[0.1] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function PrimaryBtn({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      {...props}
      className={`inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-xs font-semibold text-[#07111f] transition hover:opacity-90 disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={`h-9 w-full rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/25 transition-colors ${className}`}
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    />
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <BentoCard className="p-4 lg:p-5 flex flex-col justify-between min-h-[90px] relative overflow-hidden">
      {accent && (
        <div
          className="absolute top-0 right-0 h-16 w-16 rounded-full blur-2xl"
          style={{ background: accent }}
        />
      )}
      <Label>{label}</Label>
      <div>
        <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
          {value}
        </p>
        {sub && (
          <p className="mt-1 text-xs text-white/35 hidden sm:block">{sub}</p>
        )}
      </div>
    </BentoCard>
  );
}

function CopyBtn({
  text,
  label = "Copy link",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return <GhostBtn onClick={copy}>{copied ? "✓ Copied" : label}</GhostBtn>;
}

function ShareSheet({
  referral,
  baseUrl,
  onClose,
}: {
  referral: Referral;
  baseUrl: string;
  onClose: () => void;
}) {
  const link = buildLink(referral.code, baseUrl);
  const message = `Hey! I thought you might be interested in working with ${baseUrl.replace(/https?:\/\//, "")} — they do great work. Here's my referral link: ${link}`;

  const channels = [
    {
      label: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    {
      label: "Email",
      icon: "✉️",
      url: `mailto:?subject=You%20should%20check%20this%20out&body=${encodeURIComponent(message)}`,
    },
    {
      label: "LinkedIn",
      icon: "🔗",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    },
    {
      label: "Twitter / X",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <BentoCard className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-white">
              Share referral link
            </h3>
            <p className="text-xs text-white/40 mt-0.5">{referral.name}</p>
          </div>
          <GhostBtn onClick={onClose} className="h-8 w-8 p-0 text-white/50">
            ✕
          </GhostBtn>
        </div>

        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="text-xs text-white/50 truncate flex-1">{link}</span>
          <CopyBtn text={link} label="Copy" />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-white/70 transition-all hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span className="text-base">{c.icon}</span>
              {c.label}
            </a>
          ))}
        </div>

        <div>
          <Label className="mb-2">Pre-written message</Label>
          <div
            className="rounded-xl px-3 py-3 text-xs leading-relaxed text-white/50 mb-2"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {message}
          </div>
          <CopyBtn text={message} label="Copy message" />
        </div>
      </BentoCard>
    </div>
  );
}

const COMMISSION_OPTIONS = [
  "5%",
  "10%",
  "15%",
  "20%",
  "25%",
  "£50 flat",
  "£100 flat",
  "£200 flat",
  "Custom",
];

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState(true);
  const [baseUrl] = useState("https://mahirahmed.co.uk");
  const [showForm, setShowForm] = useState(false);
  const [shareTarget, setShareTarget] = useState<Referral | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    commission: "10%",
    customCommission: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoadingReferrals(true);
      try {
        const res = await fetch("/api/referrals");
        const data = await res.json();
        if (res.ok) setReferrals(data.referrals ?? []);
      } catch (err) {
        console.error("load referrals error:", err);
      } finally {
        setLoadingReferrals(false);
      }
    };

    void load();
  }, []);

  const stats = useMemo(() => {
    const total = referrals.length;
    const active = referrals.filter((r) => r.active).length;
    const totalClicks = referrals.reduce((s, r) => s + r.clicks, 0);
    const totalLeads = referrals.reduce((s, r) => s + r.leads, 0);
    return { total, active, totalClicks, totalLeads };
  }, [referrals]);

  const createReferral = async () => {
    if (!form.name.trim()) {
      setFormError("Name is required");
      return;
    }

    const commission =
      form.commission === "Custom"
        ? form.customCommission.trim()
        : form.commission;

    if (!commission) {
      setFormError("Commission is required");
      return;
    }

    setSaving(true);
    setFormError("");

    const newReferral: ReferralInsert = {
      name: form.name.trim(),
      email: form.email.trim() || null,
      code: generateCode(form.name),
      commission,
      clicks: 0,
      leads: 0,
      active: true,
    };

    const res = await fetch("/api/referrals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReferral),
    });
    const data = await res.json();

    if (res.ok && data.referral) {
      setReferrals((prev) => [data.referral as Referral, ...prev]);
      setForm({ name: "", email: "", commission: "10%", customCommission: "" });
      setFormError("");
      setShowForm(false);
    } else {
      setFormError("Failed to save. Please try again.");
    }

    setSaving(false);
  };

  const toggleActive = async (referral: Referral) => {
    const newActive = !referral.active;
    setReferrals((prev) =>
      prev.map((r) => (r.id === referral.id ? { ...r, active: newActive } : r)),
    );
    const res = await fetch("/api/referrals/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: referral.id, active: newActive }),
    });
    if (!res.ok) {
      setReferrals((prev) =>
        prev.map((r) =>
          r.id === referral.id ? { ...r, active: referral.active } : r,
        ),
      );
    }
  };

  const deleteReferral = async (id: string) => {
    const previous = referrals;
    setReferrals((prev) => prev.filter((r) => r.id !== id));
    setDeletingId(null);
    const res = await fetch("/api/referrals/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "delete" }),
    });
    if (!res.ok) {
      setReferrals(previous);
    }
  };

  const copyLink = async (referral: Referral) => {
    try {
      await navigator.clipboard.writeText(buildLink(referral.code, baseUrl));
      setCopiedId(referral.id);
      setTimeout(() => {
        setCopiedId((c) => (c === referral.id ? null : c));
      }, 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#060e1a] text-white"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-600/8 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-600/5 blur-[80px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 py-5 lg:px-8 lg:py-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.9"
                />
                <rect
                  x="8"
                  y="1"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.5"
                />
                <rect
                  x="1"
                  y="8"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.5"
                />
                <rect
                  x="8"
                  y="8"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                Admin
              </span>
              <h1 className="text-base font-semibold text-white leading-none mt-0.5">
                Referral Links
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin/leads"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-white/[0.05] px-4 text-xs font-medium text-white/75 transition-all hover:bg-white/[0.1] hover:text-white"
            >
              ← Leads
            </a>
            <GhostBtn
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
            >
              Log out
            </GhostBtn>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3">
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Referrers"
              value={stats.total}
              sub="Total created"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Active"
              value={stats.active}
              sub="Currently live"
              accent="rgba(52,211,153,0.12)"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Total clicks"
              value={stats.totalClicks}
              sub="Across all links"
              accent="rgba(125,211,252,0.12)"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Leads generated"
              value={stats.totalLeads}
              sub="From referrals"
              accent="rgba(232,121,249,0.12)"
            />
          </div>

          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <Label>Referral base URL</Label>
                <p className="text-xs text-white/50 font-mono mt-1">
                  {baseUrl}?ref=name-xxxx
                </p>
              </div>
              <PrimaryBtn
                onClick={() => {
                  setShowForm(true);
                  setFormError("");
                }}
                className="shrink-0 h-10 px-5"
              >
                + New referral link
              </PrimaryBtn>
            </div>
          </BentoCard>

          {showForm && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-5 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-40 w-64 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">
                    Create referral link
                  </h3>
                  <GhostBtn
                    onClick={() => {
                      setShowForm(false);
                      setFormError("");
                    }}
                    className="h-7 w-7 p-0 text-xs"
                  >
                    ✕
                  </GhostBtn>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label>Referrer name *</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="e.g. Sarah Jones"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Email (optional)</Label>
                    <Input
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="sarah@example.com"
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Commission</Label>
                    <select
                      value={form.commission}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, commission: e.target.value }))
                      }
                      className="h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {COMMISSION_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  {form.commission === "Custom" && (
                    <div className="flex flex-col gap-1.5">
                      <Label>Custom amount</Label>
                      <Input
                        value={form.customCommission}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            customCommission: e.target.value,
                          }))
                        }
                        placeholder="e.g. £150 or 12%"
                      />
                    </div>
                  )}
                </div>

                {formError && (
                  <p className="mt-3 text-xs text-rose-400">{formError}</p>
                )}

                <div className="mt-4 flex gap-2">
                  <PrimaryBtn onClick={createReferral} disabled={saving}>
                    {saving ? "Saving…" : "Generate link"}
                  </PrimaryBtn>
                  <GhostBtn
                    onClick={() => {
                      setShowForm(false);
                      setFormError("");
                    }}
                  >
                    Cancel
                  </GhostBtn>
                </div>
              </div>
            </BentoCard>
          )}

          {loadingReferrals && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-8 flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border border-white/20 border-t-white/60 animate-spin" />
              <p className="text-sm text-white/40">Loading referrals…</p>
            </BentoCard>
          )}

          {!loadingReferrals && referrals.length === 0 && !showForm && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-12 flex flex-col items-center justify-center text-center">
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M13 3L19 9L13 15"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 9H8C5.24 9 3 11.24 3 14V19"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/50">
                No referral links yet
              </p>
              <p className="text-xs text-white/45 mt-1 max-w-xs">
                Create your first link to start tracking who's sending you
                clients.
              </p>
              <PrimaryBtn className="mt-5" onClick={() => setShowForm(true)}>
                Create first link
              </PrimaryBtn>
            </BentoCard>
          )}

          {!loadingReferrals &&
            referrals.map((referral) => {
              const link = buildLink(referral.code, baseUrl);
              const convRate =
                referral.clicks > 0
                  ? Math.round((referral.leads / referral.clicks) * 100)
                  : 0;

              return (
                <BentoCard
                  key={referral.id}
                  className="col-span-2 md:col-span-4 lg:col-span-6 p-5 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 h-24 w-24 rounded-full blur-2xl pointer-events-none"
                    style={{
                      background: referral.active
                        ? "rgba(52,211,153,0.08)"
                        : "rgba(255,255,255,0.03)",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="h-9 w-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-sm font-semibold text-white shrink-0"
                          style={{
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
                          }}
                        >
                          {referral.name[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {referral.name}
                          </p>
                          {referral.email && (
                            <p className="text-xs text-white/38 truncate">
                              {referral.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleActive(referral)}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all shrink-0"
                        style={
                          referral.active
                            ? {
                                background: "rgba(52,211,153,0.12)",
                                color: "#6ee7b7",
                                border: "1px solid rgba(110,231,183,0.15)",
                              }
                            : {
                                background: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.35)",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }
                        }
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background: referral.active
                              ? "#6ee7b7"
                              : "rgba(255,255,255,0.25)",
                          }}
                        />
                        {referral.active ? "Active" : "Paused"}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: "Clicks", value: referral.clicks },
                        { label: "Leads", value: referral.leads },
                        { label: "Conv.", value: `${convRate}%` },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-xl p-3 text-center"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">
                            {label}
                          </p>
                          <p className="text-lg font-bold text-white leading-none">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex items-center justify-between mb-4"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        paddingBottom: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/45">
                          Commission
                        </span>
                        <span
                          className="rounded-lg px-2 py-0.5 text-xs font-semibold"
                          style={{
                            background: "rgba(251,191,36,0.12)",
                            color: "#fcd34d",
                          }}
                        >
                          {referral.commission}
                        </span>
                      </div>
                      <span className="text-[11px] text-white/45">
                        {formatDate(referral.created_at)} ·{" "}
                        {timeAgo(referral.created_at)}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span className="text-[11px] text-white/40 truncate flex-1 font-mono">
                        {link}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <GhostBtn
                        onClick={() => copyLink(referral)}
                        className="flex-1 sm:flex-none"
                      >
                        {copiedId === referral.id ? "✓ Copied" : "Copy link"}
                      </GhostBtn>
                      <GhostBtn
                        onClick={() => setShareTarget(referral)}
                        className="flex-1 sm:flex-none"
                      >
                        Share
                      </GhostBtn>
                      {deletingId === referral.id ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => deleteReferral(referral.id)}
                            className="inline-flex h-9 items-center rounded-xl px-3 text-xs font-medium text-rose-400 transition-all hover:text-rose-300"
                            style={{ background: "rgba(248,113,113,0.1)" }}
                          >
                            Confirm delete
                          </button>
                          <GhostBtn onClick={() => setDeletingId(null)}>
                            Cancel
                          </GhostBtn>
                        </div>
                      ) : (
                        <GhostBtn
                          onClick={() => setDeletingId(referral.id)}
                          className="text-white/25 hover:text-rose-400"
                        >
                          ✕
                        </GhostBtn>
                      )}
                    </div>
                  </div>
                </BentoCard>
              );
            })}

          {!loadingReferrals && referrals.length > 0 && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-5">
              <Label className="mb-4">How referral tracking works</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    step: "01",
                    title: "Generate a link",
                    desc: "Create a unique ?ref= link for each person referring clients to you.",
                  },
                  {
                    step: "02",
                    title: "They share it",
                    desc: "Your referrer shares their link. Every visit with that ?ref= param is counted as a click automatically.",
                  },
                  {
                    step: "03",
                    title: "You close the deal",
                    desc: "When a referred lead converts, mark it on their lead card — then pay out the agreed commission.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="text-[10px] font-bold text-white/35 mt-0.5 shrink-0 tabular-nums">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white/70">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/35 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 pt-4 flex items-start gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span className="text-[10px] text-white/35 shrink-0 mt-0.5">
                  ℹ
                </span>
                <p className="text-[11px] text-white/45 leading-relaxed">
                  Clicks are tracked automatically via{" "}
                  <code className="text-white/40 bg-white/5 px-1 py-0.5 rounded">
                    /api/referral-click
                  </code>{" "}
                  when someone visits your homepage with a{" "}
                  <code className="text-white/40 bg-white/5 px-1 py-0.5 rounded">
                    ?ref=
                  </code>{" "}
                  param. Make sure your homepage{" "}
                  <code className="text-white/40 bg-white/5 px-1 py-0.5 rounded">
                    useEffect
                  </code>{" "}
                  is calling that route.
                </p>
              </div>
            </BentoCard>
          )}
        </div>
      </div>

      {shareTarget && (
        <ShareSheet
          referral={shareTarget}
          baseUrl={baseUrl}
          onClose={() => setShareTarget(null)}
        />
      )}
    </div>
  );
}
