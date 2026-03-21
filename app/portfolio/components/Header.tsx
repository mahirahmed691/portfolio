"use client";

import { useEffect, useRef, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      ref={headerRef}
      className={themeClasses.header}
      style={{
        transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        ...(scrolled
          ? {
              backgroundColor: isLight ? "rgba(247,243,238,0.95)" : "rgba(7,17,31,0.92)",
              boxShadow: isLight
                ? "0 1px 0 rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.05)"
                : "0 1px 0 rgba(255,255,255,0.07), 0 4px 16px rgba(0,0,0,0.3)",
            }
          : {}),
      }}
    >
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
          <a
            href="/cv"
            className={`transition hover:opacity-80 ${isLight ? "text-slate-500" : "text-white/40 hover:text-white/70"}`}
          >
            CV
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Social icons — desktop only */}
          <div className="hidden md:flex items-center gap-1.5">
            <a
              href="https://www.linkedin.com/in/mahir-ahmed-84a346149"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition hover:opacity-80 ${isLight ? "text-slate-500 hover:bg-slate-100" : "text-white/40 hover:bg-white/8 hover:text-white/70"}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/mahirahmed691"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition hover:opacity-80 ${isLight ? "text-slate-500 hover:bg-slate-100" : "text-white/40 hover:bg-white/8 hover:text-white/70"}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

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
            className="hidden md:inline-flex rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[0.98]"
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

    </header>
  );
}
