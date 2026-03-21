"use client";

import { motion } from "framer-motion";

export function SectionArrow({ href, isLight }: { href: string; isLight: boolean }) {
  return (
    <a
      href={href}
      aria-label="Next section"
      className="absolute bottom-6 right-6 hidden md:flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110 hover:opacity-80 group"
      style={{
        background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
        border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <motion.svg
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)" }}
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </a>
  );
}
