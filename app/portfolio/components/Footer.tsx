"use client";

import { useState } from "react";
import type { ThemeClasses } from "../types";

export function Footer({
  themeClasses,
  isLight,
}: {
  themeClasses: ThemeClasses;
  isLight: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("hello@mahirahmed.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const year = new Date().getFullYear();

  const bg = isLight
    ? "bg-[linear-gradient(180deg,rgba(247,243,238,0.98),rgba(240,237,233,0.98))] border-slate-200/80"
    : "bg-[linear-gradient(180deg,rgba(9,15,26,0.96),rgba(5,10,18,0.96))] border-white/8";

  const heading = isLight ? "text-slate-900" : "text-white";
  const label = isLight ? "text-slate-400" : "text-white/35";
  const muted = isLight ? "text-slate-500" : "text-white/50";
  const link = isLight
    ? "text-slate-500 hover:text-slate-900 transition"
    : "text-white/65 hover:text-white transition";
  const divider = isLight ? "border-slate-200" : "border-white/10";
  const copyright = isLight ? "text-slate-400" : "text-white/35";

  return (
    <footer className={`mx-auto mt-6 max-w-7xl rounded-[2rem] border shadow-[0_18px_70px_rgba(0,0,0,0.1)] ${bg}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className={`text-xs uppercase tracking-[0.28em] ${label}`}>
            Mahir Ahmed
          </p>
          <p className={`mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl ${heading}`}>
            Platform engineer. Frontend craftsman. Building end to end since 2018.
          </p>
          <p className={`mt-4 max-w-lg text-sm leading-7 ${muted}`}>
            Available for platform engineering contracts, full-stack product
            builds, and technical web work that needs someone who understands
            the whole system.
          </p>

          {/* Back to top */}
          <a
            href="#home"
            className={`mt-6 inline-flex items-center gap-2 text-xs font-medium transition hover:opacity-80 ${muted}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Back to top
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:text-right">
          <div>
            <p className={`text-xs uppercase tracking-[0.24em] ${label}`}>
              Explore
            </p>
            <div className={`mt-4 space-y-3 text-sm ${link.split(" ")[0]}`}>
              <a href="#home" className={`block ${link}`}>Home</a>
              <a href="#work" className={`block ${link}`}>Selected Work</a>
              <a href="#about" className={`block ${link}`}>About</a>
              <a href="/blog" className={`block ${link}`}>Blog</a>
              <a href="/services" className={`block ${link}`}>Services</a>
              <a href="/uses" className={`block ${link}`}>Uses</a>
              <a href="/now" className={`block ${link}`}>Now</a>
              <a href="/cv" className={`block ${link}`}>View CV</a>
            </div>
          </div>

          <div>
            <p className={`text-xs uppercase tracking-[0.24em] ${label}`}>
              Connect
            </p>
            <div className={`mt-4 space-y-3 text-sm`}>
              <div className="flex items-center gap-2 lg:justify-end">
                <a href="mailto:hello@mahirahmed.co.uk" className={link}>
                  hello@mahirahmed.co.uk
                </a>
                <button
                  onClick={copyEmail}
                  className={`text-[10px] transition hover:opacity-80`}
                  aria-label="Copy email address"
                  title={copied ? "Copied!" : "Copy email"}
                  style={{ color: copied ? "rgba(74,222,128,0.8)" : isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)" }}
                >
                  {copied ? "✓" : "⎘"}
                </button>
              </div>
              <a
                href="https://github.com/mahirahmed691"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${link}`}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mahir-ahmed-84a346149"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${link}`}
              >
                LinkedIn
              </a>
              <a href="#contact" className={`block ${link}`}>
                Book a project
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t ${divider}`}>
        <div className={`mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-xs md:pb-4 md:flex-row md:items-center md:justify-between ${copyright}`}>
          <p>© {year} Mahir Ahmed. Crafted with Next.js.</p>
          <p>Designed to feel premium, personal, and memorable.</p>
        </div>
      </div>
    </footer>
  );
}
