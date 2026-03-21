"use client";

import { useState } from "react";
import type { ThemeClasses } from "../types";

export function Footer({ themeClasses }: { themeClasses: ThemeClasses }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("hello@mahirahmed.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <footer className="mx-auto mt-6 max-w-7xl rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,15,26,0.96),rgba(5,10,18,0.96))] shadow-[0_18px_70px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">
            Mahir Ahmed
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            Platform engineer. Frontend craftsman. Building end to end since
            2018.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">
            Available for platform engineering contracts, full-stack product
            builds, and technical web work that needs someone who understands
            the whole system.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:text-right">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">
              Explore
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/65">
              <a href="#home" className="block transition hover:text-white">
                Home
              </a>
              <a href="#work" className="block transition hover:text-white">
                Selected Work
              </a>
              <a href="#about" className="block transition hover:text-white">
                About
              </a>
              <a href="/blog" className="block transition hover:text-white">
                Blog
              </a>
              <a href="/services" className="block transition hover:text-white">
                Services
              </a>
              <a href="/uses" className="block transition hover:text-white">
                Uses
              </a>
              <a href="/now" className="block transition hover:text-white">
                Now
              </a>
              <a
                href="/cv"
                className="block transition hover:text-white"
              >
                View CV ↓
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">
              Connect
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/65">
              <div className="flex items-center gap-2">
                <a
                  href="mailto:hello@mahirahmed.co.uk"
                  className="transition hover:text-white"
                >
                  hello@mahirahmed.co.uk
                </a>
                <button
                  onClick={copyEmail}
                  className="text-[10px] transition hover:text-white/80"
                  aria-label="Copy email address"
                  title={copied ? "Copied!" : "Copy email"}
                  style={{ color: copied ? "rgba(74,222,128,0.8)" : "rgba(255,255,255,0.25)" }}
                >
                  {copied ? "✓" : "⎘"}
                </button>
              </div>
              <a
                href="https://github.com/mahirahmed691"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                GitHub
              </a>
              <a href="#contact" className="block transition hover:text-white">
                Book a project
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-xs text-white/35 sm:px-6 md:pb-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Mahir Ahmed. Crafted with Next.js.</p>
          <p>Designed to feel premium, personal, and memorable.</p>
        </div>
      </div>
    </footer>
  );
}
