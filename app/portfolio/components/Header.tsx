"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ThemeClasses } from "../types";

export function Header({
  isLight,
  menuOpen,
  setMenuOpen,
  themeClasses,
}: {
  isLight: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  themeClasses: ThemeClasses;
}) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen, setMenuOpen]);

  return (
    <header ref={headerRef} className={themeClasses.header}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#home"
          className="text-sm font-semibold tracking-[0.22em] uppercase"
        >
          Mahir Ahmed
        </a>

        <nav
          className={`hidden items-center gap-8 text-sm md:flex ${themeClasses.nav}`}
        >
          <a href="#work" className="transition hover:text-inherit">
            Work
          </a>
          <a href="#services" className="transition hover:text-inherit">
            Services
          </a>
          <a href="#about" className="transition hover:text-inherit">
            About
          </a>
          <a href="#contact" className="transition hover:text-inherit">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const calendlyUrl = "https://calendly.com/mahirahmed691";

              if (typeof window !== "undefined" && (window as any).Calendly) {
                (window as any).Calendly.initPopupWidget({
                  url: calendlyUrl,
                });
              } else {
                window.open(calendlyUrl, "_blank", "noopener,noreferrer");
              }
            }}
            className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[0.98]"
          >
            Book a project
          </button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={
              isLight
                ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white md:hidden"
                : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 md:hidden"
            }
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 rounded-full transition ${isLight ? "bg-slate-900" : "bg-white"} ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full transition ${isLight ? "bg-slate-900" : "bg-white"} ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full transition ${isLight ? "bg-slate-900" : "bg-white"} ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={
          menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`overflow-hidden md:hidden ${isLight ? "border-t border-slate-300/70" : "border-t border-white/10"}`}
      >
        <div className="space-y-2 px-4 py-4 sm:px-6">
          {[
            ["Work", "#work"],
            ["Services", "#services"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={
                isLight
                  ? "block rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                  : "block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
              }
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
