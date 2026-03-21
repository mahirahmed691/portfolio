
import { motion } from "framer-motion";
import { founderNotes, heroMetrics } from "../data";
import type { SharedProps } from "../types";
import { SectionArrow } from "./SectionArrow";

export function HeroSection({
  isLight,
  isMobile,
  focusMode,
  shouldReduceMotion,
  themeClasses,
  isAvailable = true,
}: SharedProps & { isAvailable?: boolean }) {
  const cardFloat =
    shouldReduceMotion || isMobile || focusMode
      ? {}
      : {
          y: [0, -8, 0],
          rotateX: [0, 4, 0, -2, 0],
          rotateY: [0, -5, 0, 3, 0],
          scale: [1, 1.01, 1, 1.008, 1],
        };

  return (
    <section
      id="home"
      className={`relative mx-auto mt-4 max-w-7xl overflow-hidden px-4 pb-14 pt-12 sm:mt-6 sm:px-6 sm:pb-24 sm:pt-24 lg:pt-28 ${themeClasses.shell} ${
        focusMode ? "ring-1 ring-fuchsia-400/20" : ""
      }`}
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Availability indicator */}
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
              isAvailable
                ? isLight
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : isLight
                  ? "border border-slate-200 bg-slate-100 text-slate-500"
                  : "border border-white/10 bg-white/5 text-white/40"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {isAvailable && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isAvailable ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
            </span>
            {isAvailable
              ? "Platform engineer · available for new projects"
              : "Platform engineer · not currently available"}
          </div>

          <div
            className={
              isLight
                ? "inline-flex rounded-full border border-fuchsia-200 bg-white px-4 py-2 text-xs tracking-[0.18em] text-slate-600 uppercase backdrop-blur sm:text-sm"
                : "inline-flex rounded-full border border-fuchsia-300/15 bg-white/5 px-4 py-2 text-xs tracking-[0.18em] text-white/70 uppercase backdrop-blur sm:text-sm"
            }
          >
            Platform engineer · frontend craftsman · building since 2018
          </div>

          <p
            className={`mt-6 max-w-xl text-sm leading-6 sm:mt-8 sm:text-base sm:leading-7 ${themeClasses.muted}`}
          >
            Platform engineer with 7 years building scalable systems — and the
            frontend craft to ship the full product, from infrastructure to
            interface.
          </p>

          <h1 className="mt-5 max-w-5xl text-[2.6rem] font-semibold leading-[0.92] tracking-[-0.07em] sm:mt-6 sm:text-6xl lg:text-[5.2rem]">
            I build systems that scale
            <span className="bg-gradient-to-r from-rose-300 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              and interfaces
            </span>{" "}
            people actually use.
          </h1>

          <p
            className={`mt-5 max-w-2xl text-base leading-7 sm:mt-6 sm:text-[1.2rem] sm:leading-8 ${themeClasses.muted}`}
          >
            Most engineers hand off at the API. I go further — building the
            cloud infrastructure, the pipelines, and the polished frontend that
            sits on top of it all.
          </p>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:max-w-xl">
            {founderNotes.map((note) => (
              <div
                key={note}
                className={`${themeClasses.softCard} px-4 py-3 text-sm leading-6 sm:leading-7 ${themeClasses.muted}`}
              >
                {note}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#work"
              className="rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[0.98]"
            >
              View selected work
            </a>
            <a href="#about" className={themeClasses.buttonAlt}>
              Explore more
            </a>
            <a
              href="/cv"
              className={themeClasses.buttonAlt}
            >
              View CV ↓
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {heroMetrics.map((item) => (
              <motion.div
                key={item.label}
                whileHover={
                  shouldReduceMotion || isMobile || focusMode
                    ? {}
                    : { y: -6, scale: 1.02 }
                }
                className={`${themeClasses.sectionShell} p-4 sm:p-5`}
              >
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {item.value}
                </p>
                <p className={`mt-2 text-sm ${themeClasses.subtle}`}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative [perspective:1800px]"
        >
          <motion.div
            animate={
              shouldReduceMotion || isMobile || focusMode
                ? { opacity: 0.8 }
                : { scale: [1, 1.04, 1], rotate: [0, 1, -1, 0] }
            }
            transition={
              shouldReduceMotion || isMobile || focusMode
                ? { duration: 0 }
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
            className={`absolute -inset-4 rounded-[2rem] bg-gradient-to-br blur-2xl ${isLight ? "from-fuchsia-300/25 via-violet-300/15 to-cyan-300/20" : "from-fuchsia-400/20 via-violet-400/10 to-cyan-400/20"}`}
          />
          <motion.div
            animate={cardFloat}
            transition={
              shouldReduceMotion || isMobile || focusMode
                ? { duration: 0 }
                : { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformStyle: "preserve-3d" }}
            className={`${themeClasses.sectionShell} relative overflow-hidden rounded-[1.75rem] p-3 sm:rounded-[2rem] sm:p-6`}
          >
            <div className="mb-4 flex items-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={
                    shouldReduceMotion || isMobile || focusMode
                      ? { opacity: 1 }
                      : { opacity: [0.35, 1, 0.35], scale: [0.92, 1.08, 0.92] }
                  }
                  transition={
                    shouldReduceMotion || isMobile || focusMode
                      ? { duration: 0 }
                      : {
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: dot * 0.22,
                          repeatDelay: 0.2,
                        }
                  }
                  className={
                    dot === 0
                      ? "h-3 w-3 rounded-full bg-emerald-300"
                      : dot === 1
                        ? "h-3 w-3 rounded-full bg-emerald-400/80"
                        : "h-3 w-3 rounded-full bg-emerald-500/70"
                  }
                />
              ))}
            </div>

            <div
              className={`overflow-hidden rounded-[1.5rem] p-5 sm:p-6 ${isLight ? "border border-slate-200 bg-white" : "border border-white/10 bg-[linear-gradient(180deg,rgba(6,18,40,0.97),rgba(5,10,20,0.98))]"}`}
            >
              <div
                className={`flex items-center justify-between gap-4 border-b pb-5 ${isLight ? "border-slate-200" : "border-white/10"}`}
              >
                <div>
                  <p className={`text-xs uppercase tracking-[0.25em] ${themeClasses.label}`}>
                    Production infrastructure
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">GKE Platform</h2>
                </div>
                <span
                  className={
                    isLight
                      ? "rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs text-cyan-900"
                      : "rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
                  }
                >
                  Live · GCP
                </span>
              </div>

              {/* Cluster dashboard mockup */}
              <div
                className={`mt-6 overflow-hidden rounded-[1.35rem] ${isLight ? "border border-slate-200 bg-slate-950" : "border border-cyan-400/10 bg-[#020c1a]"}`}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-white/6 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[11px] text-white/40">cluster · europe-west2</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/25">kubectl get pods</span>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-px border-b border-white/6">
                  {[
                    { label: "Pods", value: "24/24", color: "text-emerald-400" },
                    { label: "CPU", value: "38%", color: "text-cyan-400" },
                    { label: "Memory", value: "61%", color: "text-violet-400" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/[0.02] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-widest text-white/25">{m.label}</p>
                      <p className={`mt-1 text-lg font-semibold font-mono ${m.color}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Pod list */}
                <div className="space-y-0 divide-y divide-white/[0.04]">
                  {[
                    { name: "api-gateway", status: "Running", restarts: 0, age: "12d" },
                    { name: "auth-service", status: "Running", restarts: 0, age: "12d" },
                    { name: "data-processor", status: "Running", restarts: 1, age: "3d" },
                    { name: "cache-layer", status: "Running", restarts: 0, age: "12d" },
                  ].map((pod) => (
                    <div key={pod.name} className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shrink-0" />
                        <span className="font-mono text-[11px] text-white/60">{pod.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] text-white/25">{pod.restarts} restarts</span>
                        <span className="font-mono text-[10px] text-white/35">{pod.age}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
                  <span className="font-mono text-[10px] text-white/25">terraform managed · auto-scaling enabled</span>
                  <span className="font-mono text-[10px] text-emerald-400/70">healthy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <SectionArrow href="#work" isLight={isLight} />
    </section>
  );
}
