import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Mahir Ahmed",
  description: "View and download the CV of Mahir Ahmed, platform engineer and frontend craftsman.",
};

export default function CVPage() {
  return (
    <div className="fixed inset-0 flex flex-col bg-[#060e1a] text-white">
      {/* Header bar */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6"
        style={{
          background: "rgba(6,14,26,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <a
            href="/"
            className="shrink-0 text-xs text-white/40 transition hover:text-white/70"
          >
            ← Back
          </a>
          <span className="text-white/15">|</span>
          <span className="truncate text-sm font-medium text-white/70">Mahir Ahmed — CV</span>
        </div>

        <a
          href="/Mahir_Ahmed_CV.pdf"
          download
          className="ml-3 shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition active:scale-95"
        >
          Download ↓
        </a>
      </div>

      {/* PDF viewer — fills remaining height, no page scroll */}
      <iframe
        src="/Mahir_Ahmed_CV.pdf"
        className="min-h-0 flex-1 w-full"
        title="Mahir Ahmed CV"
      />
    </div>
  );
}
