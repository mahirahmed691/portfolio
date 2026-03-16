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
  return (
    <header className={themeClasses.header}>
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
        </nav>

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
