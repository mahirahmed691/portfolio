import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Mahir Ahmed",
  description: "View and download the CV of Mahir Ahmed, platform engineer and frontend craftsman.",
};

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#060e1a] text-white">
      {/* Header bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 sm:px-6"
        style={{
          background: "rgba(6,14,26,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs text-white/40 transition hover:text-white/70"
          >
            ← Back
          </a>
          <span className="text-white/15">|</span>
          <span className="text-sm font-medium text-white/70">Mahir Ahmed — CV</span>
        </div>

        <a
          href="/mahir-ahmed-cv.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[0.98]"
        >
          Download PDF ↓
        </a>
      </div>

      {/* PDF viewer */}
      <div className="flex justify-center px-2 py-6 sm:px-4 sm:py-8">
        <div
          className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <iframe
            src="/mahir-ahmed-cv.pdf"
            className="h-[80vh] w-full sm:h-[90vh]"
            title="Mahir Ahmed CV"
          />
        </div>
      </div>
    </div>
  );
}
