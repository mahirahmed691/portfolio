"use client";

import { motion } from "framer-motion";

export function SectionArrow({ href, isLight }: { href: string; isLight: boolean }) {
  return (
    <div className="flex justify-center pb-2 pt-6">
      <motion.a
        href={href}
        aria-label="Next section"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="group flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110"
        style={{
          background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
          border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)" }}
          className="group-hover:opacity-80 transition-opacity"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>
    </div>
  );
}
