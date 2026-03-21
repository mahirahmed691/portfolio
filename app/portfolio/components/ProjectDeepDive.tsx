import { motion } from "framer-motion";
import type { Project, ThemeClasses } from "../types";

export function ProjectDeepDive({
  currentProject,
  deepDiveOpen,
  setDeepDiveOpen,
  isLight,
  focusMode,
  shouldReduceMotion,
  themeClasses,
}: {
  currentProject: Project;
  deepDiveOpen: boolean;
  setDeepDiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLight: boolean;
  focusMode: boolean;
  shouldReduceMotion: boolean | null;
  themeClasses: ThemeClasses;
}) {
  return (
    <div className={`${themeClasses.sectionShell} p-4 sm:p-6`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
          >
            Interactive deep-dive
          </p>
          <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
            {currentProject.name} — behind the thinking
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setDeepDiveOpen((open) => !open)}
          className={
            isLight
              ? "rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100"
              : "rounded-full border border-white/12 bg-white/6 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
          }
        >
          {deepDiveOpen ? "Hide deep dive" : "Open deep dive"}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={
          deepDiveOpen
            ? { height: "auto", opacity: 1, marginTop: 24 }
            : { height: 0, opacity: 0, marginTop: 0 }
        }
        style={{ overflow: "hidden" }}
        transition={{
          duration: shouldReduceMotion || focusMode ? 0 : 0.35,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className={`${themeClasses.softCard} p-5`}>
            <p
              className={`text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
            >
              The challenge
            </p>
            <p className={`mt-3 text-sm leading-7 ${themeClasses.muted}`}>
              {currentProject.challenge}
            </p>
            <p
              className={`mt-6 text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
            >
              Stack / focus
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {currentProject.stack.map((item) => (
                <span
                  key={item}
                  className={
                    isLight
                      ? "rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
                      : "rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/70"
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={`${themeClasses.softCard} p-5`}>
            <p
              className={`text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
            >
              Approach
            </p>
            <div className="mt-3 space-y-3">
              {currentProject.approach.map((item) => (
                <div
                  key={item}
                  className={
                    isLight
                      ? "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700"
                      : "rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-white/65"
                  }
                >
                  {item}
                </div>
              ))}
            </div>
            <p
              className={`mt-6 text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
            >
              Outcome
            </p>
            <p className={`mt-3 text-sm leading-7 ${themeClasses.muted}`}>
              {currentProject.outcome}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
