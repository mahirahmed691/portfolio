"use client";

import { useEffect, useMemo, useState } from "react";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

type Invoice = {
  id: string;
  client_name: string;
  client_email: string;
  amount_pence: number;
  description: string | null;
  due_date: string | null;
  status: InvoiceStatus;
  notes: string | null;
  paid_at: string | null;
  created_at: string;
};

// ── Helpers ───────────────────────────────────────────────────────

function formatGBP(pence: number) {
  const pounds = pence / 100;
  return "£" + pounds.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function formatDate(date: string | null) {
  if (!date) return "—";
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

function isOverdue(invoice: Invoice) {
  if (invoice.status === "paid") return false;
  if (!invoice.due_date) return false;
  return new Date(invoice.due_date) < new Date(new Date().toDateString());
}

function getStatusStyle(status: InvoiceStatus | "overdue") {
  switch (status) {
    case "draft":
      return {
        bg: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.45)",
        border: "rgba(255,255,255,0.08)",
        dot: "rgba(255,255,255,0.25)",
      };
    case "sent":
      return {
        bg: "rgba(14,165,233,0.12)",
        color: "#7dd3fc",
        border: "rgba(125,211,252,0.15)",
        dot: "#7dd3fc",
      };
    case "paid":
      return {
        bg: "rgba(52,211,153,0.12)",
        color: "#6ee7b7",
        border: "rgba(110,231,183,0.15)",
        dot: "#6ee7b7",
      };
    case "overdue":
      return {
        bg: "rgba(248,113,113,0.12)",
        color: "#fca5a5",
        border: "rgba(252,165,165,0.15)",
        dot: "#fca5a5",
      };
  }
}

function resolvedStatus(invoice: Invoice): InvoiceStatus | "overdue" {
  if (isOverdue(invoice)) return "overdue";
  return invoice.status;
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
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.25)",
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
    <p className={`text-[10px] uppercase tracking-[0.2em] text-white/35 font-medium ${className}`}>
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
  valueColor,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  valueColor?: string;
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
        <p
          className="text-3xl lg:text-4xl font-bold tracking-tight leading-none"
          style={{ color: valueColor || "white" }}
        >
          {value}
        </p>
        {sub && <p className="mt-1 text-xs text-white/35 hidden sm:block">{sub}</p>}
      </div>
    </BentoCard>
  );
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-2xl"
      style={{
        background: "rgba(12,25,41,0.96)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
        style={{ background: "rgba(52,211,153,0.2)", color: "#6ee7b7" }}
      >
        ✓
      </span>
      {message}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    amount: "",
    description: "",
    due_date: "",
  });

  // ── Fetch invoices ──
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/invoices");
        if (!res.ok) {
          setError("Unauthorized or failed to load invoices.");
          return;
        }
        const data = await res.json();
        setInvoices(Array.isArray(data) ? data : []);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  // ── Stats ──
  const stats = useMemo(() => {
    const totalInvoiced = invoices.reduce((s, i) => s + i.amount_pence, 0);
    const paid = invoices
      .filter((i) => i.status === "paid")
      .reduce((s, i) => s + i.amount_pence, 0);
    const outstanding = invoices
      .filter((i) => i.status === "sent" && !isOverdue(i))
      .reduce((s, i) => s + i.amount_pence, 0);
    const overdueCount = invoices.filter((i) => isOverdue(i)).length;
    return { totalInvoiced, paid, outstanding, overdueCount };
  }, [invoices]);

  // ── Create invoice ──
  const createInvoice = async () => {
    if (!form.client_name.trim()) {
      setFormError("Client name is required.");
      return;
    }
    if (!form.client_email.trim()) {
      setFormError("Client email is required.");
      return;
    }
    const amountPounds = parseFloat(form.amount);
    if (!form.amount || isNaN(amountPounds) || amountPounds <= 0) {
      setFormError("Please enter a valid amount.");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: form.client_name.trim(),
          client_email: form.client_email.trim(),
          amount_pence: Math.round(amountPounds * 100),
          description: form.description.trim() || null,
          due_date: form.due_date || null,
          status: "draft",
        }),
      });
      const data = await res.json();
      if (res.ok && data.invoice) {
        setInvoices((prev) => [data.invoice as Invoice, ...prev]);
        setForm({ client_name: "", client_email: "", amount: "", description: "", due_date: "" });
        setShowCreate(false);
        setToast("Invoice created.");
      } else {
        setFormError(data.error || "Failed to create invoice.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Update invoice ──
  const updateInvoice = async (id: string, fields: Partial<Invoice>) => {
    setUpdatingId(id);
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, ...fields } : i)));
    try {
      const res = await fetch("/api/invoices/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...fields }),
      });
      if (!res.ok) {
        // revert
        const revRes = await fetch("/api/invoices");
        if (revRes.ok) {
          const data = await revRes.json();
          setInvoices(Array.isArray(data) ? data : []);
        }
      }
    } catch {
      /* noop */
    } finally {
      setUpdatingId(null);
    }
  };

  const markSent = (invoice: Invoice) => {
    updateInvoice(invoice.id, { status: "sent" });
    setToast("Marked as sent.");
  };

  const markPaid = (invoice: Invoice) => {
    updateInvoice(invoice.id, { status: "paid", paid_at: new Date().toISOString() });
    setToast("Marked as paid.");
  };

  // ── Delete invoice ──
  const deleteInvoice = async (id: string) => {
    const previous = invoices;
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    setDeletingId(null);
    try {
      const res = await fetch("/api/invoices/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });
      if (!res.ok) {
        setInvoices(previous);
        setToast("Delete failed. Please try again.");
      } else {
        setToast("Invoice deleted.");
      }
    } catch {
      setInvoices(previous);
    }
  };

  // ── Generate & copy Stripe payment link for an invoice ──
  const [generatingLinkId, setGeneratingLinkId] = useState<string | null>(null);

  const copyPaymentLink = async (invoice: Invoice) => {
    try {
      setGeneratingLinkId(invoice.id);
      const res = await fetch("/api/stripe/invoice-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_id: invoice.id,
          client_name: invoice.client_name,
          client_email: invoice.client_email,
          amount_pence: invoice.amount_pence,
          description: invoice.description,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setToast(data.error || "Failed to generate payment link.");
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setToast("Payment link copied!");
    } catch {
      setToast("Could not generate payment link.");
    } finally {
      setGeneratingLinkId(null);
    }
  };

  // ── Loading / error states ──
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
          <p className="text-sm text-white/40 tracking-widest uppercase">Loading invoices</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <BentoCard className="p-8 max-w-sm text-center">
          <p className="text-sm text-rose-400">{error}</p>
          <GhostBtn className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </GhostBtn>
        </BentoCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pb-16">
      <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-8 lg:py-6">
        {/* Page heading */}
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">Admin</p>
          <h1 className="text-xl font-semibold text-white leading-none mt-1">Invoices</h1>
          <p className="text-xs text-white/35 mt-1">Track client invoices and payment status</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3">
          {/* ── Stat cards ── */}
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Total invoiced"
              value={formatGBP(stats.totalInvoiced)}
              sub="All invoices"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Paid"
              value={formatGBP(stats.paid)}
              sub="Received"
              accent="rgba(52,211,153,0.12)"
              valueColor="#6ee7b7"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Outstanding"
              value={formatGBP(stats.outstanding)}
              sub="Sent, awaiting payment"
              accent="rgba(125,211,252,0.12)"
              valueColor="#7dd3fc"
            />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <StatCard
              label="Overdue"
              value={stats.overdueCount}
              sub="Past due date"
              accent="rgba(248,113,113,0.12)"
              valueColor={stats.overdueCount > 0 ? "#fca5a5" : undefined}
            />
          </div>

          {/* ── Action bar ── */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">
                  {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-white/35 mt-0.5">
                  Manage your client invoices and track payment status.
                </p>
              </div>
              <PrimaryBtn
                onClick={() => {
                  setShowCreate(true);
                  setFormError("");
                }}
                className="shrink-0 h-10 px-5"
              >
                + New invoice
              </PrimaryBtn>
            </div>
          </BentoCard>

          {/* ── Create form ── */}
          {showCreate && (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-5 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-40 w-64 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Create invoice</h3>
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
                      onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))}
                      placeholder="Acme Ltd"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Client email *</Label>
                    <Input
                      type="email"
                      value={form.client_email}
                      onChange={(e) => setForm((p) => ({ ...p, client_email: e.target.value }))}
                      placeholder="client@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Amount (£) *</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.amount}
                      onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
                      placeholder="750.00"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Description</Label>
                    <Input
                      value={form.description}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Website build — Phase 1"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Due date</Label>
                    <Input
                      type="date"
                      value={form.due_date}
                      onChange={(e) => setForm((p) => ({ ...p, due_date: e.target.value }))}
                    />
                  </div>
                </div>

                {formError && <p className="mt-3 text-xs text-rose-400">{formError}</p>}

                <div className="mt-4 flex gap-2">
                  <PrimaryBtn onClick={createInvoice} disabled={saving}>
                    {saving ? "Saving…" : "Create invoice"}
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

          {/* ── Invoice list ── */}
          {invoices.length === 0 && !showCreate ? (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 p-12 flex flex-col items-center justify-center text-center">
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="4" y="2" width="14" height="18" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M8 7h6M8 11h6M8 15h4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/50">No invoices yet</p>
              <p className="text-xs text-white/35 mt-1 max-w-xs">
                Create your first invoice to start tracking client payments.
              </p>
              <PrimaryBtn className="mt-5" onClick={() => setShowCreate(true)}>
                Create first invoice
              </PrimaryBtn>
            </BentoCard>
          ) : invoices.length > 0 ? (
            <BentoCard className="col-span-2 md:col-span-4 lg:col-span-12 overflow-hidden">
              {/* Table header */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[720px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {["Client", "Amount", "Description", "Due date", "Status", "Actions"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.18em] text-white/30 font-medium"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => {
                      const display = resolvedStatus(invoice);
                      const style = getStatusStyle(display);
                      const isDraft = invoice.status === "draft";
                      const isSent = invoice.status === "sent";
                      const isOv = isOverdue(invoice);
                      const canMarkPaid = (isSent || isOv) && invoice.status !== "paid";

                      return (
                        <tr
                          key={invoice.id}
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                          className="transition-colors hover:bg-white/[0.02]"
                        >
                          {/* Client */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="h-8 w-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
                              >
                                {invoice.client_name[0].toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-white/85 truncate max-w-[140px]">
                                  {invoice.client_name}
                                </p>
                                <p className="text-[11px] text-white/35 truncate max-w-[140px]">
                                  {invoice.client_email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-5 py-4">
                            <span className="text-sm font-bold text-white tabular-nums">
                              {formatGBP(invoice.amount_pence)}
                            </span>
                          </td>

                          {/* Description */}
                          <td className="px-5 py-4">
                            <span className="text-xs text-white/50 max-w-[160px] truncate block">
                              {invoice.description || "—"}
                            </span>
                          </td>

                          {/* Due date */}
                          <td className="px-5 py-4">
                            <span
                              className="text-xs tabular-nums"
                              style={{ color: isOv ? "#fca5a5" : "rgba(255,255,255,0.5)" }}
                            >
                              {formatDate(invoice.due_date)}
                            </span>
                          </td>

                          {/* Status badge */}
                          <td className="px-5 py-4">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium uppercase"
                              style={{
                                background: style.bg,
                                color: style.color,
                                border: `1px solid ${style.border}`,
                              }}
                            >
                              <span
                                className="inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: style.dot }}
                              />
                              {display}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {isDraft && (
                                <button
                                  onClick={() => markSent(invoice)}
                                  disabled={updatingId === invoice.id}
                                  className="inline-flex h-7 items-center rounded-lg px-3 text-[11px] font-medium transition-all active:scale-95 disabled:opacity-40"
                                  style={{
                                    background: "rgba(14,165,233,0.12)",
                                    color: "#7dd3fc",
                                    border: "1px solid rgba(125,211,252,0.15)",
                                  }}
                                >
                                  Mark sent
                                </button>
                              )}
                              {canMarkPaid && (
                                <button
                                  onClick={() => markPaid(invoice)}
                                  disabled={updatingId === invoice.id}
                                  className="inline-flex h-7 items-center rounded-lg px-3 text-[11px] font-medium transition-all active:scale-95 disabled:opacity-40"
                                  style={{
                                    background: "rgba(52,211,153,0.12)",
                                    color: "#6ee7b7",
                                    border: "1px solid rgba(110,231,183,0.15)",
                                  }}
                                >
                                  Mark paid
                                </button>
                              )}
                              <button
                                onClick={() => copyPaymentLink(invoice)}
                                disabled={generatingLinkId === invoice.id}
                                className="inline-flex h-7 items-center rounded-lg px-3 text-[11px] font-medium transition-all active:scale-95 disabled:opacity-40"
                                style={{
                                  background: "rgba(255,255,255,0.04)",
                                  color: "rgba(255,255,255,0.45)",
                                  border: "1px solid rgba(255,255,255,0.06)",
                                }}
                              >
                                {generatingLinkId === invoice.id ? "Generating…" : "Copy link"}
                              </button>
                              {deletingId === invoice.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => deleteInvoice(invoice.id)}
                                    className="inline-flex h-7 items-center rounded-lg px-3 text-[11px] font-medium text-rose-400 transition-all hover:text-rose-300 active:scale-95"
                                    style={{ background: "rgba(248,113,113,0.1)" }}
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeletingId(null)}
                                    className="inline-flex h-7 items-center rounded-lg px-2 text-[11px] font-medium text-white/40 transition-all hover:text-white/70"
                                    style={{ background: "rgba(255,255,255,0.04)" }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeletingId(invoice.id)}
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[11px] text-white/25 transition-all hover:text-rose-400 active:scale-95"
                                  style={{ background: "rgba(255,255,255,0.04)" }}
                                >
                                  ✕
                                </button>
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
          ) : null}
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
