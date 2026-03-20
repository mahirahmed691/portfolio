"use client";

import { useEffect, useMemo, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────

type MaintenanceStatus = "active" | "paused" | "cancelled";

type MaintenanceClient = {
  id: string;
  client_name: string;
  client_email: string;
  website_url: string | null;
  plan: "Basic" | "Standard" | "Pro";
  status: MaintenanceStatus;
  notes: string | null;
  next_renewal: string | null;
  created_at: string;
};

// ── Constants ─────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Basic",
    price: 99,
    description: "Hosting monitoring, monthly backups, uptime alerts",
  },
  {
    name: "Standard",
    price: 149,
    description: "Basic + monthly content updates (up to 1hr)",
  },
  {
    name: "Pro",
    price: 199,
    description: "Standard + priority support, quarterly design tweaks",
  },
] as const;

const PLAN_PRICE: Record<string, number> = { Basic: 99, Standard: 149, Pro: 199 };

// ── Helpers ───────────────────────────────────────────────────────

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function isWithinDays(dateStr: string | null, days: number): boolean {
  const d = daysUntil(dateStr);
  return d !== null && d >= 0 && d <= days;
}

// ── Sub-components ────────────────────────────────────────────────

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
      className={`inline-flex h-9 items-center justify-center rounded-xl bg-white/[0.05] px-4 text-xs font-medium text-white/75 transition-all hover:bg-white/[0.1] hover:text-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
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
      className={`inline-flex h-9 items-center justify-center rounded-xl bg-white px-4 text-xs font-semibold text-[#07111f] transition hover:opacity-90 active:scale-95 disabled:opacity-40 ${className}`}
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

function getStatusStyle(status: MaintenanceStatus) {
  switch (status) {
    case "active":
      return {
        dot: "#6ee7b7",
        bg: "rgba(52,211,153,0.12)",
        color: "#6ee7b7",
        border: "rgba(110,231,183,0.15)",
        label: "Active",
      };
    case "paused":
      return {
        dot: "#fcd34d",
        bg: "rgba(251,191,36,0.12)",
        color: "#fcd34d",
        border: "rgba(252,211,77,0.15)",
        label: "Paused",
      };
    case "cancelled":
      return {
        dot: "#fca5a5",
        bg: "rgba(248,113,113,0.12)",
        color: "#fca5a5",
        border: "rgba(252,165,165,0.15)",
        label: "Cancelled",
      };
  }
}

function getPlanStyle(plan: string) {
  switch (plan) {
    case "Pro":
      return {
        bg: "rgba(167,139,250,0.12)",
        color: "#c4b5fd",
        border: "rgba(196,181,253,0.15)",
      };
    case "Standard":
      return {
        bg: "rgba(125,211,252,0.12)",
        color: "#7dd3fc",
        border: "rgba(125,211,252,0.15)",
      };
    default:
      return {
        bg: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.55)",
        border: "rgba(255,255,255,0.08)",
      };
  }
}

// ── Main Page ─────────────────────────────────────────────────────

export default function MaintenancePage() {
  const [clients, setClients] = useState<MaintenanceClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedReminderId, setCopiedReminderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    website_url: "",
    plan: "Basic",
    next_renewal: "",
  });

  // ── Load clients ──────────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/maintenance");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load clients");
          return;
        }
        setClients(data.clients ?? []);
      } catch {
        setError("Network error — could not load clients.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  // ── Stats ─────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const activeClients = clients.filter((c) => c.status === "active");
    const totalActive = activeClients.length;
    const mrr = activeClients.reduce(
      (sum, c) => sum + (PLAN_PRICE[c.plan] ?? 0),
      0,
    );
    const arr = mrr * 12;
    const dueThisMonth = clients.filter((c) =>
      isWithinDays(c.next_renewal, 30),
    ).length;
    return { totalActive, mrr, arr, dueThisMonth };
  }, [clients]);

  const planBreakdown = useMemo(() => {
    return PLANS.map((p) => {
      const planClients = clients.filter(
        (c) => c.plan === p.name && c.status === "active",
      );
      return {
        ...p,
        count: planClients.length,
        revenue: planClients.length * p.price,
      };
    });
  }, [clients]);

  // ── Actions ───────────────────────────────────────────────────

  const createClient = async () => {
    if (!form.client_name.trim()) {
      setFormError("Client name is required");
      return;
    }
    if (!form.client_email.trim()) {
      setFormError("Client email is required");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: form.client_name.trim(),
          client_email: form.client_email.trim(),
          website_url: form.website_url.trim() || null,
          plan: form.plan,
          next_renewal: form.next_renewal || null,
        }),
      });
      const data = await res.json();

      if (res.ok && data.client) {
        setClients((prev) => [data.client as MaintenanceClient, ...prev]);
        setForm({
          client_name: "",
          client_email: "",
          website_url: "",
          plan: "Basic",
          next_renewal: "",
        });
        setShowCreate(false);
      } else {
        setFormError(data.error || "Failed to save. Please try again.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (
    client: MaintenanceClient,
    newStatus: MaintenanceStatus,
  ) => {
    const previous = clients;
    setClients((prev) =>
      prev.map((c) =>
        c.id === client.id ? { ...c, status: newStatus } : c,
      ),
    );
    setUpdatingId(client.id);
    try {
      const res = await fetch("/api/maintenance/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, status: newStatus }),
      });
      if (!res.ok) setClients(previous);
    } catch {
      setClients(previous);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteClient = async (id: string) => {
    const previous = clients;
    setClients((prev) => prev.filter((c) => c.id !== id));
    setDeletingId(null);
    try {
      const res = await fetch("/api/maintenance/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });
      if (!res.ok) setClients(previous);
    } catch {
      setClients(previous);
    }
  };

  const sendRenewalReminder = async (client: MaintenanceClient) => {
    const price = PLAN_PRICE[client.plan] ?? 0;
    const date = formatDate(client.next_renewal);
    const text = `Hi ${client.client_name}, just a reminder that your website care plan (£${price}/mo) renews on ${date}. If you'd like to make any changes or have any questions, reply to this email. Thanks, Mahir`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedReminderId(client.id);
      setTimeout(
        () => setCopiedReminderId((c) => (c === client.id ? null : c)),
        1800,
      );
    } catch {
      // noop
    }
  };

  // ── Render ────────────────────────────────────────────────────

  return (
    <div className="min-h-screen text-white pb-16">
      <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-8 lg:py-6">
        {/* Page heading */}
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">Admin</p>
          <h1 className="text-xl font-semibold text-white leading-none mt-1">Maintenance Clients</h1>
          <p className="text-xs text-white/35 mt-1">Recurring retainer clients and renewal tracking</p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3">
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Active clients"
              value={stats.totalActive}
              sub="On a care plan"
              accent="rgba(52,211,153,0.12)"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Monthly recurring"
              value={`£${stats.mrr}`}
              sub="MRR from active plans"
              accent="rgba(125,211,252,0.12)"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Annual recurring"
              value={`£${stats.arr.toLocaleString()}`}
              sub="ARR (MRR × 12)"
              accent="rgba(167,139,250,0.12)"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Due for renewal"
              value={stats.dueThisMonth}
              sub="Within 30 days"
              accent="rgba(251,191,36,0.12)"
            />
          </div>

          {/* ── Revenue by plan ── */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-5">
            <Label className="mb-4">Revenue by plan</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {planBreakdown.map((p) => {
                const style = getPlanStyle(p.name);
                return (
                  <div
                    key={p.name}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="rounded-lg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: style.bg,
                          color: style.color,
                          border: `1px solid ${style.border}`,
                        }}
                      >
                        {p.name}
                      </span>
                      <span className="text-xs text-white/40">
                        £{p.price}/mo
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white leading-none mb-1">
                      {p.count}
                      <span className="text-sm font-normal text-white/35 ml-1">
                        clients
                      </span>
                    </p>
                    <p className="text-xs text-white/40">
                      £{p.revenue}/mo contribution
                    </p>
                    <p className="text-[10px] text-white/25 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </BentoCard>

          {/* ── Create client toggle ── */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Label>Care plan clients</Label>
                <p className="text-xs text-white/40 mt-1">
                  {clients.length} total ·{" "}
                  {clients.filter((c) => c.status === "active").length} active
                </p>
              </div>
              <PrimaryBtn
                onClick={() => {
                  setShowCreate(true);
                  setFormError("");
                }}
                className="shrink-0 h-10 px-5"
              >
                + Add client
              </PrimaryBtn>
            </div>
          </BentoCard>

          {/* ── Create form ── */}
          {showCreate && (
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
                    Add maintenance client
                  </h3>
                  <GhostBtn
                    onClick={() => {
                      setShowCreate(false);
                      setFormError("");
                    }}
                    className="h-7 w-7 p-0 text-xs"
                  >
                    ✕
                  </GhostBtn>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label>Client name *</Label>
                    <Input
                      value={form.client_name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, client_name: e.target.value }))
                      }
                      placeholder="e.g. Acme Ltd"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={form.client_email}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          client_email: e.target.value,
                        }))
                      }
                      placeholder="client@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Website URL</Label>
                    <Input
                      type="url"
                      value={form.website_url}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, website_url: e.target.value }))
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Plan</Label>
                    <select
                      value={form.plan}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, plan: e.target.value }))
                      }
                      className="h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <option value="Basic">Basic — £99/mo</option>
                      <option value="Standard">Standard — £149/mo</option>
                      <option value="Pro">Pro — £199/mo</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Next renewal</Label>
                    <Input
                      type="date"
                      value={form.next_renewal}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          next_renewal: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {formError && (
                  <p className="mt-3 text-xs text-rose-400">{formError}</p>
                )}

                <div className="mt-4 flex gap-2">
                  <PrimaryBtn onClick={createClient} disabled={saving}>
                    {saving ? "Saving…" : "Add client"}
                  </PrimaryBtn>
                  <GhostBtn
                    onClick={() => {
                      setShowCreate(false);
                      setFormError("");
                    }}
                  >
                    Cancel
                  </GhostBtn>
                </div>
              </div>
            </BentoCard>
          )}

          {/* ── Loading ── */}
          {loading && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-8 flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border border-white/20 border-t-white/60 animate-spin" />
              <p className="text-sm text-white/40">Loading clients…</p>
            </BentoCard>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-6">
              <p className="text-sm text-rose-400">{error}</p>
            </BentoCard>
          )}

          {/* ── Empty state ── */}
          {!loading && !error && clients.length === 0 && !showCreate && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-12 flex flex-col items-center justify-center text-center">
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="12"
                    y="2"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="2"
                    y="12"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="12"
                    y="12"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/50">
                No maintenance clients yet
              </p>
              <p className="text-xs text-white/30 mt-1 max-w-xs">
                Add your first care plan client to start tracking recurring
                revenue.
              </p>
              <PrimaryBtn className="mt-5" onClick={() => setShowCreate(true)}>
                Add first client
              </PrimaryBtn>
            </BentoCard>
          )}

          {/* ── Client table ── */}
          {!loading && !error && clients.length > 0 && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      {[
                        "Client",
                        "Website",
                        "Plan",
                        "Status",
                        "Next renewal",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5 text-left text-[10px] uppercase tracking-[0.18em] text-white/30 font-medium whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => {
                      const statusStyle = getStatusStyle(client.status);
                      const planStyle = getPlanStyle(client.plan);
                      const days = daysUntil(client.next_renewal);
                      const renewalSoon = isWithinDays(client.next_renewal, 14);
                      const isUpdating = updatingId === client.id;
                      const isDeleting = deletingId === client.id;

                      return (
                        <tr
                          key={client.id}
                          className="transition-colors hover:bg-white/[0.015]"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                          }}
                        >
                          {/* Client name + email */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="h-8 w-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-xs font-semibold text-white shrink-0"
                                style={{
                                  boxShadow:
                                    "0 0 0 1px rgba(255,255,255,0.06)",
                                }}
                              >
                                {client.client_name[0].toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-white/90 truncate max-w-[160px]">
                                  {client.client_name}
                                </p>
                                <p className="text-white/38 truncate max-w-[160px]">
                                  {client.client_email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Website */}
                          <td className="px-5 py-4">
                            {client.website_url ? (
                              <a
                                href={client.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-300 hover:text-cyan-200 truncate max-w-[160px] inline-block"
                              >
                                {client.website_url.replace(/^https?:\/\//, "")}
                              </a>
                            ) : (
                              <span className="text-white/25">—</span>
                            )}
                          </td>

                          {/* Plan badge */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className="rounded-lg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                              style={{
                                background: planStyle.bg,
                                color: planStyle.color,
                                border: `1px solid ${planStyle.border}`,
                              }}
                            >
                              {client.plan} — £{PLAN_PRICE[client.plan]}/mo
                            </span>
                          </td>

                          {/* Status badge */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium"
                              style={{
                                background: statusStyle.bg,
                                color: statusStyle.color,
                                border: `1px solid ${statusStyle.border}`,
                              }}
                            >
                              <span
                                className="inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: statusStyle.dot }}
                              />
                              {statusStyle.label}
                            </span>
                          </td>

                          {/* Next renewal — amber highlight if within 14 days */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            {client.next_renewal ? (
                              <span
                                className="inline-flex items-center gap-1.5"
                                style={
                                  renewalSoon
                                    ? { color: "#fcd34d" }
                                    : { color: "rgba(255,255,255,0.5)" }
                                }
                              >
                                {renewalSoon && (
                                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                )}
                                {formatDate(client.next_renewal)}
                                {days !== null && days >= 0 && (
                                  <span
                                    className="text-[10px]"
                                    style={
                                      renewalSoon
                                        ? { color: "#fcd34d" }
                                        : { color: "rgba(255,255,255,0.3)" }
                                    }
                                  >
                                    ({days}d)
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span className="text-white/25">—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {/* Send renewal reminder */}
                              <GhostBtn
                                onClick={() => sendRenewalReminder(client)}
                                className="text-[10px] h-7 px-2.5 whitespace-nowrap"
                              >
                                {copiedReminderId === client.id
                                  ? "✓ Copied"
                                  : "Reminder"}
                              </GhostBtn>

                              {/* Pause / Resume */}
                              {client.status !== "cancelled" && (
                                <GhostBtn
                                  onClick={() =>
                                    updateStatus(
                                      client,
                                      client.status === "active"
                                        ? "paused"
                                        : "active",
                                    )
                                  }
                                  disabled={isUpdating}
                                  className="text-[10px] h-7 px-2.5"
                                >
                                  {client.status === "active"
                                    ? "Pause"
                                    : "Resume"}
                                </GhostBtn>
                              )}

                              {/* Cancel */}
                              {client.status !== "cancelled" && (
                                <GhostBtn
                                  onClick={() =>
                                    updateStatus(client, "cancelled")
                                  }
                                  disabled={isUpdating}
                                  className="text-[10px] h-7 px-2.5 text-white/30 hover:text-yellow-400"
                                >
                                  Cancel
                                </GhostBtn>
                              )}

                              {/* Delete */}
                              {isDeleting ? (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => deleteClient(client.id)}
                                    className="inline-flex h-7 items-center rounded-xl px-2.5 text-[10px] font-medium text-rose-400 transition-all hover:text-rose-300"
                                    style={{
                                      background: "rgba(248,113,113,0.1)",
                                    }}
                                  >
                                    Confirm
                                  </button>
                                  <GhostBtn
                                    onClick={() => setDeletingId(null)}
                                    className="h-7 px-2.5 text-[10px]"
                                  >
                                    ✕
                                  </GhostBtn>
                                </div>
                              ) : (
                                <GhostBtn
                                  onClick={() => setDeletingId(client.id)}
                                  className="text-[10px] h-7 w-7 p-0 text-white/20 hover:text-rose-400"
                                >
                                  ✕
                                </GhostBtn>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </BentoCard>
          )}
        </div>
      </div>
    </div>
  );
}
