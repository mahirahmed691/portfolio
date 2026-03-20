"use client";

import { useEffect, useMemo, useState } from "react";

type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

type ActivityEvent = {
  id: string;
  type: "status_change" | "note_saved" | "contacted" | "created";
  label: string;
  timestamp: string;
};

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  website: string | null;
  project_type: string | null;
  goal: string | null;
  budget: string | null;
  timeline: string | null;
  urgency: string | null;
  description: string | null;
  recommended_package: string | null;
  lead_score: number | null;
  status: LeadStatus | null;
  created_at: string;
  notes: string | null;
  stripe_payment_status: string | null;
  stripe_session_id: string | null;
};

const statusOptions: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
];

function getPriority(lead: Lead) {
  const score = lead.lead_score || 0;
  if (score >= 6) return "hot";
  if (score >= 4) return "warm";
  return "cold";
}

function getStatusStyle(status: string | null) {
  switch (status) {
    case "new":
      return {
        dot: "#7dd3fc",
        bg: "rgba(14,165,233,0.12)",
        color: "#7dd3fc",
        border: "rgba(125,211,252,0.15)",
      };
    case "contacted":
      return {
        dot: "#fcd34d",
        bg: "rgba(251,191,36,0.12)",
        color: "#fcd34d",
        border: "rgba(252,211,77,0.15)",
      };
    case "qualified":
      return {
        dot: "#c4b5fd",
        bg: "rgba(167,139,250,0.12)",
        color: "#c4b5fd",
        border: "rgba(196,181,253,0.15)",
      };
    case "won":
      return {
        dot: "#6ee7b7",
        bg: "rgba(52,211,153,0.12)",
        color: "#6ee7b7",
        border: "rgba(110,231,183,0.15)",
      };
    case "lost":
      return {
        dot: "#fca5a5",
        bg: "rgba(248,113,113,0.12)",
        color: "#fca5a5",
        border: "rgba(252,165,165,0.15)",
      };
    default:
      return {
        dot: "#ffffff30",
        bg: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.4)",
        border: "rgba(255,255,255,0.08)",
      };
  }
}

function getPaymentStyle(paymentStatus: string | null) {
  switch (paymentStatus?.toLowerCase()) {
    case "paid":
    case "complete":
      return {
        bg: "rgba(52,211,153,0.12)",
        color: "#6ee7b7",
        border: "rgba(110,231,183,0.15)",
      };
    case "pending":
    case "unpaid":
      return {
        bg: "rgba(251,191,36,0.12)",
        color: "#fcd34d",
        border: "rgba(252,211,77,0.15)",
      };
    case "failed":
    case "cancelled":
      return {
        bg: "rgba(248,113,113,0.12)",
        color: "#fca5a5",
        border: "rgba(252,165,165,0.15)",
      };
    default:
      return {
        bg: "rgba(167,139,250,0.12)",
        color: "#c4b5fd",
        border: "rgba(196,181,253,0.15)",
      };
  }
}

function getPriorityInlineStyle(priority: "hot" | "warm" | "cold") {
  switch (priority) {
    case "hot":
      return {
        background: "rgba(217,70,239,0.15)",
        color: "#e879f9",
        border: "1px solid rgba(232,121,249,0.15)",
      };
    case "warm":
      return {
        background: "rgba(249,115,22,0.15)",
        color: "#fb923c",
        border: "1px solid rgba(251,146,60,0.15)",
      };
    default:
      return {
        background: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
      };
  }
}

function getNextAction(lead: Lead) {
  if (!lead.status || lead.status === "new") return "Contact ASAP";
  if (lead.status === "contacted") return "Follow up";
  if (lead.status === "qualified") return "Send proposal";
  if (lead.status === "won") return "Onboard client";
  return "Closed";
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
    return new Date(date).toLocaleString();
  } catch {
    return date;
  }
}

function normaliseWhatsapp(phone: string | null) {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "");
}

function estimatedValue(pkg: string | null) {
  if (pkg === "premium") return "£1,000+";
  if (pkg === "standard") return "£500–1k";
  return "£250+";
}

function getEstimatedValueNumber(pkg: string | null) {
  if (pkg === "premium") return 1000;
  if (pkg === "standard") return 750;
  return 250;
}

function buildActivityLog(
  lead: Lead,
  localEvents: ActivityEvent[],
): ActivityEvent[] {
  const base: ActivityEvent[] = [
    {
      id: "created",
      type: "created",
      label: "Lead submitted",
      timestamp: lead.created_at,
    },
  ];
  return [...base, ...localEvents].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

function getQuickReplies(lead: Lead) {
  const name = lead.name?.split(" ")[0] || "there";
  const company = lead.company || "your company";
  const pkg = lead.recommended_package || "our services";
  const goal = lead.goal || "your project";
  return [
    {
      label: "Outreach",
      icon: "👋",
      subject: `Working with ${company}`,
      body: `Hi ${name},\n\nI came across your enquiry and wanted to reach out personally. Based on what you've shared about ${goal}, I think we'd be a great fit.\n\nWould you be open to a quick 20-minute call this week?\n\nBest,`,
    },
    {
      label: "Proposal",
      icon: "📄",
      subject: `Proposal for ${company} — ${pkg} package`,
      body: `Hi ${name},\n\nThank you for your time — it was great learning more about ${company}.\n\nI've put together a proposal based on our conversation. I'd recommend our ${pkg} package, which aligns with your goals around ${goal}.\n\nBest,`,
    },
    {
      label: "Follow up",
      icon: "🔁",
      subject: `Following up — ${company}`,
      body: `Hi ${name},\n\nJust following up on my previous message. I know things get busy — did you get a chance to look it over?\n\nHappy to answer any questions.\n\nBest,`,
    },
    {
      label: "Closing",
      icon: "✅",
      subject: `Ready to get started?`,
      body: `Hi ${name},\n\nI wanted to circle back — we have availability opening up soon and I'd love to secure your spot.\n\nIf now isn't the right time, no worries at all. Just let me know either way.\n\nBest,`,
    },
  ];
}

// ── Collapsible Section ───────────────────────────────────────────
function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#0c1929",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.25)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5"
        style={{
          borderBottom: open ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
          {title}
        </span>
        <span
          className="text-white/30 text-xs transition-transform"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────
function ScoreRing({ score }: { score: number | null }) {
  const s = Math.max(0, Math.min(score || 0, 8));
  const pct = s / 8;
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const color = pct >= 0.75 ? "#e879f9" : pct >= 0.5 ? "#fb923c" : "#94a3b8";
  return (
    <div className="relative flex items-center justify-center">
      <svg width={56} height={56} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={28}
          cy={28}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={4}
        />
        <circle
          cx={28}
          cy={28}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="block text-sm font-bold leading-none text-white">
          {s}
        </span>
        <span className="block text-[8px] text-white/35 uppercase tracking-wider">
          /8
        </span>
      </div>
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

function AISummaryPanel({ lead }: { lead: Lead }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    setSummary(null);
    setGenerated(false);
  }, [lead.id]);

  const generate = async () => {
    setLoading(true);
    setSummary(null);
    try {
      const prompt = `You are a CRM assistant. Given this lead, write a concise 2-3 sentence sales summary and suggest one specific, personalised next step. Be direct and practical. No headers, no bullet points, just a short paragraph.\n\nLead:\n- Name: ${lead.name || "Unknown"}\n- Company: ${lead.company || "Unknown"}\n- Project type: ${lead.project_type || "Unknown"}\n- Goal: ${lead.goal || "Unknown"}\n- Budget: ${lead.budget || "Unknown"}\n- Timeline: ${lead.timeline || "Unknown"}\n- Urgency: ${lead.urgency || "Unknown"}\n- Recommended package: ${lead.recommended_package || "Unknown"}\n- Lead score: ${lead.lead_score ?? "Unknown"}/8\n- Description: ${lead.description || "None"}`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text =
        data.content
          ?.map((b: { type: string; text?: string }) =>
            b.type === "text" ? b.text : "",
          )
          .join("") || "Could not generate summary.";
      setSummary(text);
      setGenerated(true);
    } catch {
      setSummary("Failed to generate summary. Please try again.");
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        background: "#0c1929",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="absolute top-0 left-0 h-32 w-56 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="flex h-5 w-5 items-center justify-center rounded-md"
              style={{ background: "rgba(99,102,241,0.2)" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 0.5L6.3 3.7L9.5 4.5L7.2 6.7L7.8 10L5 8.5L2.2 10L2.8 6.7L0.5 4.5L3.7 3.7L5 0.5Z"
                  fill="#818cf8"
                />
              </svg>
            </div>
            <Label>AI Summary</Label>
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex h-7 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium transition-all disabled:opacity-60 active:scale-95"
            style={{
              background: "rgba(99,102,241,0.15)",
              color: "#818cf8",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            {loading ? (
              <>
                <span className="inline-block h-3 w-3 rounded-full border border-indigo-400/40 border-t-indigo-400 animate-spin" />
                Thinking…
              </>
            ) : generated ? (
              "Regenerate"
            ) : (
              "Generate"
            )}
          </button>
        </div>
        {!summary && !loading && (
          <p className="text-xs text-white/28 leading-relaxed italic">
            Click generate for an AI-powered read on this lead.
          </p>
        )}
        {loading && (
          <div className="space-y-2.5 mt-1">
            {[95, 80, 55].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded-full animate-pulse"
                style={{
                  width: `${w}%`,
                  background: "rgba(255,255,255,0.05)",
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
        )}
        {summary && !loading && (
          <p className="text-sm text-white/68 leading-relaxed">{summary}</p>
        )}
      </div>
    </div>
  );
}

function ActivityTimeline({ events }: { events: ActivityEvent[] }) {
  const iconFor = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "created":
        return { bg: "rgba(99,102,241,0.2)", color: "#818cf8" };
      case "status_change":
        return { bg: "rgba(251,191,36,0.15)", color: "#fcd34d" };
      case "note_saved":
        return { bg: "rgba(52,211,153,0.15)", color: "#6ee7b7" };
      case "contacted":
        return { bg: "rgba(125,211,252,0.15)", color: "#7dd3fc" };
    }
  };
  const dotChar = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "created":
        return "✦";
      case "status_change":
        return "⟳";
      case "note_saved":
        return "✎";
      case "contacted":
        return "↗";
    }
  };
  return (
    <div className="space-y-1">
      {events.map((event, i) => {
        const icon = iconFor(event.type);
        const isLast = i === events.length - 1;
        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px]"
                style={{ background: icon.bg, color: icon.color }}
              >
                {dotChar(event.type)}
              </div>
              {!isLast && (
                <div
                  className="w-px flex-1 mt-1"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    minHeight: "14px",
                  }}
                />
              )}
            </div>
            <div className="pb-3 min-w-0">
              <p className="text-xs text-white/65 leading-snug">
                {event.label}
              </p>
              <p className="text-[10px] text-white/25 mt-0.5">
                {timeAgo(event.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuickReplyPanel({ lead }: { lead: Lead }) {
  const replies = getQuickReplies(lead);
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const r = replies[selected];
    await navigator.clipboard.writeText(`Subject: ${r.subject}\n\n${r.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const openMail = () => {
    const r = replies[selected];
    if (lead.email)
      window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.body)}`;
  };

  return (
    <div>
      <div
        className="flex gap-1.5 mb-3 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {replies.map((r, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all shrink-0 active:scale-95"
            style={
              selected === i
                ? {
                    background: "rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.88)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.38)",
                    border: "1px solid transparent",
                  }
            }
          >
            <span>{r.icon}</span>
            {r.label}
          </button>
        ))}
      </div>
      <div
        className="rounded-xl px-4 py-3 text-xs leading-relaxed text-white/50 whitespace-pre-line"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
          minHeight: "100px",
        }}
      >
        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2.5">
          Subject — {replies[selected].subject}
        </p>
        <span className="text-white/60">{replies[selected].body}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <GhostBtn onClick={copy}>{copied ? "✓ Copied" : "Copy"}</GhostBtn>
        {lead.email && <GhostBtn onClick={openMail}>Open in Mail</GhostBtn>}
      </div>
    </div>
  );
}

// ── Lead List (mobile drawer) ─────────────────────────────────────
function LeadListDrawer({
  leads,
  currentIndex,
  onSelect,
  onClose,
}: {
  leads: Lead[];
  currentIndex: number;
  onSelect: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#060e1a" }}
    >
      <div
        className="flex items-center justify-between px-4 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="text-sm font-semibold text-white">
          All Leads ({leads.length})
        </span>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 text-sm"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {leads.map((l, i) => {
          const st = getStatusStyle(l.status);
          const priority = getPriority(l);
          return (
            <button
              key={l.id}
              onClick={() => {
                onSelect(i);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-white/[0.04]"
              style={{
                background:
                  i === currentIndex ? "rgba(255,255,255,0.04)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <div className="h-9 w-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-sm font-semibold text-white shrink-0">
                {(l.name || "?")[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {l.name || "Unnamed"}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {l.company || l.email || "—"}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                  style={{ background: st.bg, color: st.color }}
                >
                  {l.status || "new"}
                </span>
                {priority === "hot" && (
                  <span className="text-[9px] text-fuchsia-400">🔥 hot</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [savingLeadId, setSavingLeadId] = useState<string | null>(null);
  const [notesDrafts, setNotesDrafts] = useState<Record<string, string>>({});
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityLogs, setActivityLogs] = useState<
    Record<string, ActivityEvent[]>
  >({});
  const [showList, setShowList] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const fetchedLeads: Lead[] = data.leads || [];
        setLeads(fetchedLeads);
        const notesMap: Record<string, string> = {};
        fetchedLeads.forEach((lead) => {
          notesMap[lead.id] = lead.notes || "";
        });
        setNotesDrafts(notesMap);
        const hotIdx = fetchedLeads.findIndex((l) => (l.lead_score || 0) >= 6);
        setCurrentIndex(hotIdx >= 0 ? hotIdx : 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const hot = leads.filter((l) => (l.lead_score || 0) >= 5).length;
    const won = leads.filter((l) => l.status === "won").length;
    const conversion = total > 0 ? Math.round((won / total) * 100) : 0;
    const pipeline = leads.reduce(
      (s, l) => s + getEstimatedValueNumber(l.recommended_package),
      0,
    );
    return { total, hot, won, conversion, pipeline };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const sorted = [...leads].sort((a, b) => {
      const d = (b.lead_score || 0) - (a.lead_score || 0);
      if (d !== 0) return d;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    return sorted.filter((lead) => {
      const matchFilter =
        filter === "all"
          ? true
          : filter === "hot"
            ? (lead.lead_score || 0) >= 5
            : lead.status === filter;
      const hay = [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.website,
        lead.project_type,
        lead.goal,
        lead.budget,
        lead.timeline,
        lead.urgency,
        lead.recommended_package,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchFilter && hay.includes(search.toLowerCase());
    });
  }, [leads, filter, search]);

  useEffect(() => {
    if (filteredLeads.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= filteredLeads.length) setCurrentIndex(0);
  }, [filteredLeads, currentIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentIndex((p) => Math.max(p - 1, 0));
      if (e.key === "ArrowRight")
        setCurrentIndex((p) => Math.min(p + 1, filteredLeads.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filteredLeads.length]);

  const lead = filteredLeads[currentIndex] || null;

  const addActivity = (
    leadId: string,
    event: Omit<ActivityEvent, "id" | "timestamp">,
  ) => {
    setActivityLogs((prev) => ({
      ...prev,
      [leadId]: [
        ...(prev[leadId] || []),
        { ...event, id: `${Date.now()}`, timestamp: new Date().toISOString() },
      ],
    }));
  };

  const updateLead = async (
    id: string,
    payload: { status?: LeadStatus; notes?: string },
  ) => {
    try {
      setSavingLeadId(id);
      const res = await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        return;
      }
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...payload } : l)),
      );
      if (payload.status)
        addActivity(id, {
          type: "status_change",
          label: `Status → "${payload.status}"`,
        });
      if (typeof payload.notes === "string")
        addActivity(id, { type: "note_saved", label: "Notes updated" });
    } catch (err) {
      console.error(err);
    } finally {
      setSavingLeadId(null);
    }
  };

  const copyLead = async (l: Lead) => {
    try {
      await navigator.clipboard.writeText(
        `Name: ${l.name || "—"}\nEmail: ${l.email || "—"}\nPhone: ${l.phone || "—"}\nCompany: ${l.company || "—"}\nProject: ${l.project_type || "—"}\nBudget: ${l.budget || "—"}\nScore: ${l.lead_score ?? "—"}`,
      );
      setCopySuccessId(l.id);
      setTimeout(() => setCopySuccessId((c) => (c === l.id ? null : c)), 1600);
    } catch {
      /* noop */
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
          <p className="text-sm text-white/40 tracking-widest uppercase">
            Loading leads
          </p>
        </div>
      </div>
    );
  }

  const priority = lead ? getPriority(lead) : "cold";
  const statusStyle = lead ? getStatusStyle(lead.status) : getStatusStyle(null);
  const paymentStyle = lead
    ? getPaymentStyle(lead.stripe_payment_status)
    : getPaymentStyle(null);
  const activityEvents = lead
    ? buildActivityLog(lead, activityLogs[lead.id] || [])
    : [];

  return (
    <div
      className="min-h-screen bg-[#060e1a] text-white pb-24 lg:pb-8"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Background ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-600/8 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-600/6 blur-[80px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Mobile lead list drawer */}
      {showList && (
        <LeadListDrawer
          leads={filteredLeads}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
          onClose={() => setShowList(false)}
        />
      )}

      <div className="relative mx-auto max-w-[1440px] px-4 pt-4 lg:px-8 lg:pt-6">
        {/* ── Top bar ── */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0"
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
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                Admin
              </span>
              <h1 className="text-sm font-semibold text-white leading-none mt-0.5">
                Lead Desk
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearch((s) => !s)}
              className="lg:hidden h-8 w-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/50 text-xs"
            >
              🔍
            </button>
            <GhostBtn
              className="hidden lg:inline-flex"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
            >
              Log out
            </GhostBtn>
            <GhostBtn
              className="lg:hidden !px-3 !text-[11px]"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
            >
              Out
            </GhostBtn>
          </div>
        </div>

        {/* ── Mobile search bar ── */}
        {showSearch && (
          <div className="mb-3 lg:hidden">
            <div
              className="flex h-10 items-center rounded-xl bg-white/[0.05] px-3 gap-2"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <svg
                className="text-white/30 shrink-0"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle
                  cx="5.5"
                  cy="5.5"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8.5 8.5L11 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentIndex(0);
                }}
                placeholder="Search leads…"
                className="h-full w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/30 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Stats row (horizontal scroll on mobile) ── */}
        <div
          className="flex gap-2.5 mb-4 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-3"
          style={{ scrollbarWidth: "none" }}
        >
          {[
            {
              label: "Total leads",
              value: stats.total,
              sub: "All enquiries",
              color: "text-white",
              glow: null,
            },
            {
              label: "Hot leads",
              value: stats.hot,
              sub: "Score 5+",
              color: "text-fuchsia-300",
              glow: "bg-fuchsia-500/10",
            },
            {
              label: "Won deals",
              value: stats.won,
              sub: `${stats.conversion}% conversion`,
              color: "text-emerald-300",
              glow: "bg-emerald-500/10",
            },
            {
              label: `£${(stats.pipeline / 1000).toFixed(1)}k`,
              value: null,
              sub: "Est. pipeline",
              color: "text-cyan-300",
              glow: "bg-cyan-500/10",
              isText: true,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 relative overflow-hidden shrink-0 w-36 lg:w-auto"
              style={{
                background: "#0c1929",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {stat.glow && (
                <div
                  className={`absolute top-0 right-0 h-16 w-16 rounded-full blur-xl ${stat.glow}`}
                />
              )}
              <Label>{stat.label}</Label>
              <p
                className={`text-3xl font-bold tracking-tight leading-none mt-2 ${stat.color}`}
              >
                {stat.isText ? stat.label : stat.value}
              </p>
              <p className="mt-1 text-xs text-white/35">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Nav bar (filter + prev/next) ── */}
        <div
          className="mb-4 rounded-2xl p-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          style={{
            background: "#0c1929",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div className="flex items-center gap-2">
            <select
              aria-label="Filter leads"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentIndex(0);
              }}
              className="h-9 flex-1 sm:flex-none rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <option value="all">All leads</option>
              <option value="hot">Hot leads</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            {/* Desktop search */}
            <div
              className="hidden lg:flex h-9 min-w-[16rem] items-center rounded-xl bg-white/[0.05] px-3 gap-2"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <svg
                className="text-white/30 shrink-0"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle
                  cx="5.5"
                  cy="5.5"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8.5 8.5L11 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentIndex(0);
                }}
                placeholder="Search leads…"
                className="h-full w-full bg-transparent text-xs text-white outline-none placeholder:text-white/30"
              />
            </div>
            {/* Mobile: show list button */}
            <button
              onClick={() => setShowList(true)}
              className="lg:hidden h-9 flex items-center gap-1.5 rounded-xl bg-white/[0.05] px-3 text-xs text-white/70"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <span>☰</span>
              <span>List</span>
            </button>
          </div>
          <div className="flex items-center gap-2 justify-between sm:justify-end">
            <GhostBtn
              onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}
              disabled={currentIndex === 0}
            >
              ← Prev
            </GhostBtn>
            <span
              className="rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-white/50 tabular-nums"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            >
              {filteredLeads.length > 0
                ? `${currentIndex + 1} / ${filteredLeads.length}`
                : "—"}
            </span>
            <GhostBtn
              onClick={() =>
                setCurrentIndex((p) =>
                  Math.min(p + 1, filteredLeads.length - 1),
                )
              }
              disabled={currentIndex >= filteredLeads.length - 1}
            >
              Next →
            </GhostBtn>
          </div>
        </div>

        {/* ── Lead detail ── */}
        {!lead ? (
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#0c1929",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <p className="text-white/40 text-sm">
              No leads match your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Identity card */}
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "#0c1929",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.25)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 80% -10%, ${priority === "hot" ? "rgba(232,121,249,0.07)" : priority === "warm" ? "rgba(251,146,60,0.07)" : "rgba(148,163,184,0.04)"} 0%, transparent 60%)`,
                }}
              />
              <div className="relative">
                {/* Header row */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="h-12 w-12 rounded-2xl bg-white/[0.06] flex items-center justify-center text-xl font-semibold text-white shrink-0"
                    style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
                  >
                    {(lead.name || "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold tracking-tight text-white leading-tight truncate">
                      {lead.name || "Unnamed"}
                    </h2>
                    <p className="text-sm text-white/45">
                      {lead.company || "No company"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className="rounded-lg px-2.5 py-1 text-[10px] font-medium uppercase"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.border}`,
                      }}
                    >
                      {lead.status || "new"}
                    </span>
                    {lead.stripe_payment_status ? (
                      <span
                        className="rounded-lg px-2.5 py-1 text-[10px] font-medium uppercase"
                        style={{
                          background: paymentStyle.bg,
                          color: paymentStyle.color,
                          border: `1px solid ${paymentStyle.border}`,
                        }}
                      >
                        {lead.stripe_payment_status}
                      </span>
                    ) : (
                      <span
                        className="rounded-lg px-2.5 py-1 text-[10px] font-medium"
                        style={getPriorityInlineStyle(priority)}
                      >
                        {priority}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score + Package row */}
                <div
                  className="flex items-center gap-4 mb-4 p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <ScoreRing score={lead.lead_score} />
                  <div className="flex-1">
                    <Label>Quality</Label>
                    <p className="text-sm font-semibold text-white/80 capitalize mt-0.5">
                      {priority} lead
                    </p>
                  </div>
                  <div className="text-right">
                    <Label>Package</Label>
                    <p className="text-base font-bold text-white uppercase tracking-wider mt-0.5">
                      {lead.recommended_package || "—"}
                    </p>
                    <p className="text-sm font-bold text-emerald-300">
                      {estimatedValue(lead.recommended_package)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {lead.description && (
                  <p className="text-sm text-white/55 leading-relaxed line-clamp-3 mb-3">
                    {lead.description}
                  </p>
                )}
                <p className="text-[11px] text-white/30">
                  Submitted {formatDate(lead.created_at)} ·{" "}
                  {timeAgo(lead.created_at)}
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div
              className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              {lead.email && (
                <button
                  onClick={() => {
                    if (lead.status === "new")
                      updateLead(lead.id, { status: "contacted" });
                    window.location.href = `mailto:${lead.email}`;
                  }}
                  className="flex items-center gap-2 h-10 rounded-xl px-4 text-xs font-medium shrink-0 active:scale-95 transition-all"
                  style={{
                    background: "rgba(125,211,252,0.12)",
                    color: "#7dd3fc",
                    border: "1px solid rgba(125,211,252,0.15)",
                  }}
                >
                  ✉ Email
                </button>
              )}
              {lead.phone && (
                <button
                  onClick={() => {
                    if (lead.status === "new")
                      updateLead(lead.id, { status: "contacted" });
                    window.location.href = `tel:${lead.phone}`;
                  }}
                  className="flex items-center gap-2 h-10 rounded-xl px-4 text-xs font-medium shrink-0 active:scale-95 transition-all"
                  style={{
                    background: "rgba(110,231,183,0.12)",
                    color: "#6ee7b7",
                    border: "1px solid rgba(110,231,183,0.15)",
                  }}
                >
                  📞 Call
                </button>
              )}
              {lead.phone && (
                <a
                  href={`https://wa.me/${normaliseWhatsapp(lead.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (lead.status === "new")
                      updateLead(lead.id, { status: "contacted" });
                  }}
                  className="flex items-center gap-2 h-10 rounded-xl px-4 text-xs font-medium shrink-0 active:scale-95 transition-all"
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    color: "#6ee7b7",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  💬 WhatsApp
                </a>
              )}
              <button
                onClick={() => copyLead(lead)}
                className="flex items-center gap-2 h-10 rounded-xl px-4 text-xs font-medium shrink-0 active:scale-95 transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {copySuccessId === lead.id ? "✓ Copied" : "⎘ Copy"}
              </button>
            </div>

            {/* AI Summary */}
            <AISummaryPanel lead={lead} />

            {/* Pipeline stage */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "#0c1929",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <Label className="mb-3">Pipeline stage</Label>
              <div className="flex flex-wrap gap-1.5">
                {statusOptions.map((s) => {
                  const st = getStatusStyle(s);
                  const active = (lead.status || "new") === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateLead(lead.id, { status: s })}
                      className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium capitalize transition-all active:scale-95"
                      style={
                        active
                          ? {
                              background: st.bg,
                              color: st.color,
                              border: `1px solid ${st.border}`,
                            }
                          : {
                              background: "rgba(255,255,255,0.03)",
                              color: "rgba(255,255,255,0.38)",
                              border: "1px solid transparent",
                            }
                      }
                    >
                      {active && (
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ background: st.dot }}
                        />
                      )}
                      {s}
                    </button>
                  );
                })}
              </div>
              {lead.stripe_payment_status && (
                <div
                  className="mt-4 pt-4 flex items-center gap-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <Label>Payment</Label>
                  <span
                    className="rounded-lg px-2.5 py-1 text-xs font-medium"
                    style={{
                      background: paymentStyle.bg,
                      color: paymentStyle.color,
                      border: `1px solid ${paymentStyle.border}`,
                    }}
                  >
                    {lead.stripe_payment_status}
                  </span>
                </div>
              )}
            </div>

            {/* Contact details — collapsible */}
            <Section title="Contact details" defaultOpen={true}>
              <div className="space-y-0">
                {[
                  { label: "Email", value: lead.email },
                  { label: "Phone", value: lead.phone },
                  { label: "Company", value: lead.company },
                  { label: "Website", value: lead.website },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-white/28 shrink-0">
                      {label}
                    </span>
                    {label === "Website" && value ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 hover:text-cyan-200 truncate max-w-[60vw]"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-xs font-medium text-white/75 truncate max-w-[60vw]">
                        {value || "—"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* Project details — collapsible */}
            <Section title="Project details">
              <div className="space-y-0">
                {[
                  { label: "Type", value: lead.project_type },
                  { label: "Goal", value: lead.goal },
                  { label: "Budget", value: lead.budget },
                  { label: "Timeline", value: lead.timeline },
                  { label: "Urgency", value: lead.urgency },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-white/28 shrink-0">
                      {label}
                    </span>
                    <span className="text-xs font-medium text-white/75 truncate max-w-[60vw]">
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Quick replies — collapsible */}
            <Section title="Quick reply templates">
              <QuickReplyPanel lead={lead} />
            </Section>

            {/* Activity — collapsible */}
            <Section title="Activity">
              <ActivityTimeline events={activityEvents} />
            </Section>

            {/* Notes */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: "#0c1929",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <Label>Internal notes</Label>
                {savingLeadId === lead.id && (
                  <span className="text-[10px] text-white/30 animate-pulse">
                    Saving…
                  </span>
                )}
              </div>
              <textarea
                value={notesDrafts[lead.id] || ""}
                onChange={(e) =>
                  setNotesDrafts((prev) => ({
                    ...prev,
                    [lead.id]: e.target.value,
                  }))
                }
                placeholder="Add follow-up notes, objections, next steps…"
                rows={4}
                className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white/80 outline-none placeholder:text-white/25 resize-none transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
              />
              <div className="mt-3 flex gap-2">
                <PrimaryBtn
                  onClick={() =>
                    updateLead(lead.id, { notes: notesDrafts[lead.id] || "" })
                  }
                >
                  Save notes
                </PrimaryBtn>
                <GhostBtn
                  onClick={() =>
                    setNotesDrafts((prev) => ({
                      ...prev,
                      [lead.id]: lead.notes || "",
                    }))
                  }
                >
                  Reset
                </GhostBtn>
              </div>
            </div>

            {/* Extra bottom padding for mobile */}
            <div className="h-4 lg:hidden" />
          </div>
        )}
      </div>

      {/* ── Mobile bottom action bar ── */}
      {lead && (
        <div
          className="fixed bottom-0 inset-x-0 lg:hidden z-40"
          style={{
            background: "rgba(6,14,26,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}
                disabled={currentIndex === 0}
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white/60 disabled:opacity-30 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                ←
              </button>
              <button
                onClick={() => setShowList(true)}
                className="h-10 rounded-xl px-3 flex items-center gap-1.5 text-xs font-medium text-white/60 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span>☰</span>
                <span className="tabular-nums">
                  {currentIndex + 1}/{filteredLeads.length}
                </span>
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((p) =>
                    Math.min(p + 1, filteredLeads.length - 1),
                  )
                }
                disabled={currentIndex >= filteredLeads.length - 1}
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white/60 disabled:opacity-30 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                →
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-white/40 truncate max-w-[120px]">
                {lead.name || "Unnamed"}
              </span>
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                style={{ background: statusStyle.bg, color: statusStyle.color }}
              >
                {lead.status || "new"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
