"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ThemeMode } from "./types";
import { projects } from "./data";
import { getStoredTheme, getThemeClasses, runDevTests } from "./utils";
import { BackgroundGlow } from "./components/BackgroundGlow";
import { QuickLauncher } from "./components/QuickLauncher";
import { QuickMenu } from "./components/QuickMenu";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { WorkSection } from "./components/WorkSection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Terminal } from "./components/Terminal";
import { MobileTabBar } from "./components/MobileTabBar";
import { MobileMenu } from "./components/MobileMenu";

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setTheme(getStoredTheme());
    if (process.env.NODE_ENV === "development") runDevTests();
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d) => setIsAvailable(d.available !== false))
      .catch(() => {});
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mahir-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || deepDiveOpen) return;
    const interval = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, deepDiveOpen]);

  useEffect(() => {
    setDeepDiveOpen(false);
  }, [activeProject]);

  useEffect(() => {
    const handleQuickAccess = (event: KeyboardEvent) => {
      const target = event.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (isTypingTarget) return;

      const key = event.key.toLowerCase();

      if (key === "q") {
        event.preventDefault();
        setQuickMenuOpen((open) => !open);
      }

      if (key === "t") {
        event.preventDefault();
        setTerminalOpen((open) => !open);
      }

      if (key === "d") {
        event.preventDefault();
        setTheme((current) => (current === "dark" ? "light" : "dark"));
      }

      if (key === "f") {
        event.preventDefault();
        setFocusMode((current) => !current);
      }

      if (event.key === "Escape") {
        setQuickMenuOpen(false);
        setTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleQuickAccess);
    return () => window.removeEventListener("keydown", handleQuickAccess);
  }, []);

  const isLight = theme === "light";
  const themeClasses = useMemo(() => getThemeClasses(isLight), [isLight]);

  const sharedProps = {
    isLight,
    isMobile,
    focusMode,
    shouldReduceMotion,
    themeClasses,
  };

  return (
    <main className={`${themeClasses.page} pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0`}>
      <BackgroundGlow {...sharedProps} />
      <QuickLauncher
        isLight={isLight}
        quickMenuOpen={quickMenuOpen}
        setQuickMenuOpen={setQuickMenuOpen}
      />
      <QuickMenu
        isLight={isLight}
        quickMenuOpen={quickMenuOpen}
        setQuickMenuOpen={setQuickMenuOpen}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        setTheme={setTheme}
        themeClasses={themeClasses}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <Header
        isLight={isLight}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        themeClasses={themeClasses}
      />
      <HeroSection {...sharedProps} isAvailable={isAvailable} />
      <WorkSection
        {...sharedProps}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        deepDiveOpen={deepDiveOpen}
        setDeepDiveOpen={setDeepDiveOpen}
      />
      <ServicesSection
        isLight={isLight}
        themeClasses={themeClasses}
        focusMode={focusMode}
      />
      <TestimonialsSection isLight={isLight} themeClasses={themeClasses} />
      <AboutSection isLight={isLight} themeClasses={themeClasses} />
      <ContactSection isLight={isLight} themeClasses={themeClasses} />
      <Footer themeClasses={themeClasses} />

      <Terminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        isLight={isLight}
      />

      <MobileMenu isLight={isLight} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileTabBar isLight={isLight} />

      {/* Keyboard shortcuts hint */}
      {!terminalOpen && !quickMenuOpen && (
        <button
          onClick={() => setQuickMenuOpen(true)}
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6 left-6 z-40 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-mono transition-all hover:opacity-100 opacity-30 hover:scale-105"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.7)",
          }}
          aria-label="Open keyboard shortcuts"
        >
          <span className="text-fuchsia-400">Q</span>
          <span>shortcuts</span>
        </button>
      )}

      {/* Terminal hint pill */}
      {!terminalOpen && (
        <button
          onClick={() => setTerminalOpen(true)}
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-mono transition-all hover:opacity-100 opacity-40 hover:scale-105"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            color: "rgba(255,255,255,0.7)",
          }}
          aria-label="Open terminal"
        >
          <span className="text-emerald-400">$</span>
          <span>press T</span>
        </button>
      )}
    </main>
  );
}
