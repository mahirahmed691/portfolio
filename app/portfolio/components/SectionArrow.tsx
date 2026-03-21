"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = ["home", "work", "services", "testimonials", "about", "contact"];

export function SectionArrow({ isLight }: { isLight: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTIONS.indexOf(entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-40% 0% -40% 0%", threshold: 0 },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const nextSection = SECTIONS[active + 1];
  if (!nextSection) return null;

  return (
    <motion.a
      href={`#${nextSection}`}
      aria-label="Next section"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 hover:opacity-100 opacity-40"
      style={{
        background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
        border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
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
        style={{ color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.a>
  );
}
