import Image from "next/image";
import { motion } from "framer-motion";
import { founderNotes, heroMetrics } from "../data";
import type { SharedProps } from "../types";

export function HeroSection({
  isLight,
  isMobile,
  focusMode,
  shouldReduceMotion,
  themeClasses,
}: SharedProps) {
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
              isLight
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Platform engineer · available for new projects
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
              className={`overflow-hidden rounded-[1.5rem] p-5 sm:p-6 ${isLight ? "border border-slate-200 bg-white" : "border border-white/10 bg-[linear-gradient(180deg,rgba(34,19,42,0.94),rgba(10,17,31,0.96))]"}`}
            >
              <div
                className={`flex items-center justify-between gap-4 border-b pb-5 ${isLight ? "border-slate-200" : "border-white/10"}`}
              >
                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.25em] ${themeClasses.label}`}
                  >
                    Signature direction
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Sweet Dezire</h2>
                </div>
                <span
                  className={
                    isLight
                      ? "rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-900"
                      : "rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs text-amber-100"
                  }
                >
                  Hospitality branding
                </span>
              </div>

              <div
                className={`mt-6 overflow-hidden rounded-[1.35rem] ${isLight ? "border border-slate-200 bg-slate-50" : "border border-rose-200/10 bg-[#2a1320]/60"}`}
              >
                <div className="relative">
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.2),transparent_40%)] mix-blend-screen" />
                  <Image
                    src="/sweetdezire.jpg"
                    alt="Sweet Dezire hospitality brand website — custom design and build by Mahir Ahmed"
                    width={800}
                    height={288}
                    className="h-52 w-full object-cover sm:h-72"
                    priority
                  />
                </div>
                <div className="space-y-4 p-5 sm:p-6">
                  <p
                    className={`text-sm uppercase tracking-[0.2em] ${themeClasses.label}`}
                  >
                    Why it matters
                  </p>
                  <h3 className="text-2xl font-semibold">
                    A stronger visual identity with a smoother ordering journey.
                  </h3>
                  <p
                    className={`text-sm leading-7 sm:text-base ${themeClasses.muted}`}
                  >
                    This concept combines rich colours, playful food-led
                    presentation, and a clear menu structure to make the brand
                    feel irresistible without becoming cluttered.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
