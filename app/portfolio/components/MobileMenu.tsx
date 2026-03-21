"use client";

import { motion, AnimatePresence } from "framer-motion";

export function MobileMenu({
  isLight,
  menuOpen,
  setMenuOpen,
}: {
  isLight: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[60] md:hidden"
          style={{
            background: isLight ? "rgba(247,243,238,0.98)" : "rgba(7,17,31,0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header row */}
          <div
            className="flex items-center justify-between px-4 py-4 sm:px-6"
            style={{
              borderBottom: isLight
                ? "1px solid rgba(0,0,0,0.08)"
                : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-sm font-semibold tracking-[0.22em] uppercase">
              Mahir Ahmed
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                isLight
                  ? "border border-slate-300 bg-white"
                  : "border border-white/15 bg-white/8"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav grid */}
          <div className="px-4 pt-4 pb-8 sm:px-6">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Work", "#work"],
                ["Services", "#services"],
                ["About", "#about"],
                ["Contact", "#contact"],
                ["Blog", "/blog"],
                ["CV", "/cv"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center rounded-2xl px-4 py-4 text-base font-medium transition active:scale-95 ${
                    isLight
                      ? "border border-slate-200 bg-slate-50 text-slate-700"
                      : "border border-white/8 bg-white/[0.04] text-white/80"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                const url = "https://calendly.com/mahirahmed691";
                if (typeof window !== "undefined" && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({ url });
                } else {
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
              className="mt-3 w-full rounded-2xl bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition active:scale-95"
            >
              Book a project
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
