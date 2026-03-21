import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data";
import { toSlug } from "../utils";
import type { SharedProps } from "../types";
import { ProjectCard } from "./ProjectCard";
import { ProjectDeepDive } from "./ProjectDeepDive";
import { useSwipe } from "../hooks/useSwipe";

export function WorkSection({
  isLight,
  focusMode,
  shouldReduceMotion,
  themeClasses,
  activeProject,
  setActiveProject,
  deepDiveOpen,
  setDeepDiveOpen,
}: SharedProps & {
  activeProject: number;
  setActiveProject: React.Dispatch<React.SetStateAction<number>>;
  deepDiveOpen: boolean;
  setDeepDiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const currentProject = projects[activeProject];
  const swipe = useSwipe(
    () => setActiveProject((activeProject + 1) % projects.length),
    () => setActiveProject((activeProject - 1 + projects.length) % projects.length),
  );

  return (
    <section
      id="work"
      className={`relative mx-auto mt-6 max-w-7xl ${themeClasses.shell} ${
        focusMode ? "opacity-90" : ""
      }`}
    >
      <div className="px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl">
            <p
              className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
            >
              Selected work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Work that feels more like a point of view than a template.
            </h2>
          </div>

          <p className={`max-w-md text-sm leading-7 ${themeClasses.subtle}`}>
            These are the kinds of concepts and interfaces I like making:
            stylish, conversion-aware, and distinct enough to actually be
            remembered.
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  type="button"
                  onClick={() => setActiveProject(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeProject === index
                      ? "w-10 bg-current"
                      : isLight
                        ? "w-2.5 bg-slate-300 hover:bg-slate-500"
                        : "w-2.5 bg-white/25 hover:bg-white/45"
                  }`}
                  aria-label={`View ${project.name}`}
                  aria-pressed={activeProject === index}
                />
              ))}
            </div>

            <div className="flex gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() =>
                  setActiveProject(
                    (activeProject - 1 + projects.length) % projects.length,
                  )
                }
                className={
                  isLight
                    ? "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
                    : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                }
              >
                Prev
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveProject((activeProject + 1) % projects.length)
                }
                className={
                  isLight
                    ? "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
                    : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                }
              >
                Next
              </button>
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" aria-label={`Now showing: ${currentProject.name}`} {...swipe}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <ProjectCard
                  currentProject={currentProject}
                  activeProject={activeProject}
                  themeClasses={themeClasses}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <ProjectDeepDive
            currentProject={currentProject}
            deepDiveOpen={deepDiveOpen}
            setDeepDiveOpen={setDeepDiveOpen}
            isLight={isLight}
            focusMode={focusMode}
            shouldReduceMotion={shouldReduceMotion}
            themeClasses={themeClasses}
          />

          <div className="flex justify-end">
            <Link
              href={`/work/${toSlug(currentProject.name)}`}
              className={`text-sm transition hover:opacity-80 ${themeClasses.subtle}`}
            >
              Full case study →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
