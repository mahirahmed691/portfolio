"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  status: string | null;
  recommended_package: string | null;
  lead_score: number | null;
  budget: string | null;
  created_at: string;
};

type StatCard = {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
};

function groupByDate(leads: Lead[]): { date: string; count: number }[] {
  const map: Record<string, number> = {};
  leads.forEach((l) => {
    const d = l.created_at.slice(0, 10);
    map[d] = (map[d] || 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-30)
    .map(([date, count]) => ({ date, count }));
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetch("/api/leads")
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((data) => {
        setLeads(Array.isArray(data) ? data : data.leads ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const total = leads.length;
  const byStatus = leads.reduce<Record<string, number>>((acc, l) => {
    const s = l.status ?? "unknown";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const won = byStatus.won || 0;
  const newLeads = byStatus.new || 0;
  const avgScore =
    leads.length > 0
      ? (
          leads.reduce((s, l) => s + (l.lead_score ?? 0), 0) / leads.length
        ).toFixed(1)
      : "—";

  const packageCounts = leads.reduce<Record<string, number>>((acc, l) => {
    const p = l.recommended_package ?? "none";
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  const dailyData = groupByDate(leads);
  const maxCount = Math.max(...dailyData.map((d) => d.count), 1);

  const stats: StatCard[] = [
    { label: "Total leads", value: total, color: "#818cf8" },
    { label: "New / uncontacted", value: newLeads, color: "#7dd3fc" },
    { label: "Won", value: won, color: "#4ade80" },
    { label: "Avg lead score", value: avgScore, sub: "out of 8", color: "#f0abfc" },
  ];

  const statusOrder = ["new", "contacted", "qualified", "won", "lost"];
  const statusColors: Record<string, string> = {
    new: "#7dd3fc",
    contacted: "#818cf8",
    qualified: "#f0abfc",
    won: "#4ade80",
    lost: "#f87171",
    unknown: "rgba(255,255,255,0.2)",
  };

  return (
    <div className="min-h-screen px-6 py-8 sm:px-8 sm:py-10">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-1">
          Admin
        </p>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="mt-1 text-sm text-white/40">
          Lead pipeline overview from project brief submissions.
        </p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-white/30">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
          Loading…
        </div>
      )}

      {error && (
        <div
          className="rounded-xl px-4 py-3 text-sm text-rose-400 flex items-center gap-3"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <span className="flex-1">Failed to load leads: {error}</span>
          <button
            onClick={load}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-300 transition-colors hover:text-white"
            style={{ background: "rgba(239,68,68,0.15)" }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                  {s.label}
                </p>
                <p
                  className="text-3xl font-semibold"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                {s.sub && (
                  <p className="mt-0.5 text-xs text-white/30">{s.sub}</p>
                )}
              </div>
            ))}
          </div>

          {/* Daily submissions chart */}
          {dailyData.length > 0 && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-5">
                Submissions — last 30 days
              </p>
              <div className="flex items-end gap-1 h-24">
                {dailyData.map((d) => (
                  <div
                    key={d.date}
                    className="group relative flex flex-1 flex-col items-center justify-end"
                  >
                    <div
                      className="w-full rounded-t-sm transition-all"
                      style={{
                        height: `${(d.count / maxCount) * 100}%`,
                        background:
                          "linear-gradient(180deg, rgba(129,140,248,0.7), rgba(129,140,248,0.3))",
                        minHeight: 2,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 hidden whitespace-nowrap rounded-md px-2 py-1 text-[10px] group-hover:block"
                      style={{
                        background: "rgba(6,14,26,0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      {formatDate(d.date)}: {d.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Status breakdown */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-5">
                Status breakdown
              </p>
              <div className="space-y-3">
                {statusOrder
                  .filter((s) => byStatus[s] !== undefined)
                  .map((status) => (
                    <div key={status} className="flex items-center gap-3">
                      <div
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: statusColors[status] }}
                      />
                      <span className="flex-1 text-sm capitalize text-white/65">
                        {status}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: statusColors[status] }}
                      >
                        {byStatus[status]}
                      </span>
                      <div
                        className="w-24 overflow-hidden rounded-full"
                        style={{
                          height: 4,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${((byStatus[status] || 0) / total) * 100}%`,
                            background: statusColors[status],
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Package distribution */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-5">
                Recommended packages
              </p>
              <div className="space-y-3">
                {Object.entries(packageCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([pkg, count]) => (
                    <div key={pkg} className="flex items-center gap-3">
                      <span className="flex-1 text-sm capitalize text-white/65">
                        {pkg === "none" ? "Not recommended" : pkg}
                      </span>
                      <span className="text-sm font-semibold text-white/80">
                        {count}
                      </span>
                      <div
                        className="w-24 overflow-hidden rounded-full"
                        style={{
                          height: 4,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / total) * 100}%`,
                            background:
                              "linear-gradient(90deg, #f0abfc, #818cf8)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
