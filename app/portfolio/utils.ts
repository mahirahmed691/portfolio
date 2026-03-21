import { projects, services } from "./data";
import type { ThemeClasses, ThemeMode } from "./types";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("mahir-theme");
  return saved === "light" || saved === "dark" ? saved : "dark";
}

export function getThemeClasses(isLight: boolean): ThemeClasses {
  return {
    page: isLight
      ? "min-h-screen bg-[#f7f3ee] text-slate-900"
      : "min-h-screen bg-[#07111f] text-white",
    header: isLight
      ? "sticky top-0 z-50 border-b border-slate-300/70 bg-[#f7f3ee]/80 backdrop-blur-xl"
      : "sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/70 backdrop-blur-xl",
    shell: isLight
      ? "rounded-[2rem] border border-slate-300/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
      : "rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] shadow-[0_20px_80px_rgba(0,0,0,0.22)]",
    sectionShell: isLight
      ? "rounded-3xl border border-slate-300/70 bg-white/75 shadow-sm"
      : "rounded-3xl border border-white/10 bg-white/[0.04]",
    softCard: isLight
      ? "rounded-2xl border border-slate-200 bg-slate-50/90"
      : "rounded-2xl border border-white/10 bg-white/5",
    muted: isLight ? "text-slate-600" : "text-white/65",
    subtle: isLight ? "text-slate-500" : "text-white/50",
    label: isLight ? "text-slate-500" : "text-white/40",
    nav: isLight ? "text-slate-600" : "text-white/70",
    buttonAlt: isLight
      ? "rounded-full border border-slate-300 bg-white px-6 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-100"
      : "rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10",
  };
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function runDevTests() {
  const theme = getStoredTheme();

  console.assert(
    theme === "light" || theme === "dark",
    "Stored theme should be light or dark.",
  );
  console.assert(
    projects.every((project) => Array.isArray(project.stack)),
    "Each project should have a stack array.",
  );
  console.assert(
    projects.every((project) => Array.isArray(project.approach)),
    "Each project should have an approach array.",
  );
  console.assert(services.length > 0, "Services should be present.");
}
