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
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setTheme(getStoredTheme());
    if (process.env.NODE_ENV === "development") runDevTests();
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
    <main className={themeClasses.page}>
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
      />
      <Header
        isLight={isLight}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        themeClasses={themeClasses}
      />
      <HeroSection {...sharedProps} />
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
      <AboutSection themeClasses={themeClasses} />
      <ContactSection isLight={isLight} themeClasses={themeClasses} />
      <Footer themeClasses={themeClasses} />
    </main>
  );
}
