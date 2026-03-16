import type { Project, ThemeClasses } from "../types";

export function ProjectCard({
  currentProject,
  activeProject,
  themeClasses,
}: {
  currentProject: Project;
  activeProject: number;
  themeClasses: ThemeClasses;
}) {
  return (
    <div
      className={`relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] ${themeClasses.sectionShell} p-6 sm:p-8`}
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          className={`rounded-[1.6rem] bg-gradient-to-br p-6 ${currentProject.accent}`}
        >
          <div className="flex h-full flex-col justify-between rounded-[1.4rem] border border-white/20 bg-black/20 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.24em] text-white/70">
                0{activeProject + 1}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/80">
                {currentProject.type}
              </span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/60">
                Core value
              </p>
              <p className="mt-3 text-xl font-semibold leading-8 text-white">
                {currentProject.impact}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {currentProject.name}
              </h3>
              <p
                className={`mt-3 text-sm leading-7 sm:mt-4 sm:text-base sm:leading-8 ${themeClasses.muted}`}
              >
                {currentProject.summary}
              </p>
            </div>
            <div
              className={`${themeClasses.softCard} px-4 py-3 text-sm ${themeClasses.muted} lg:max-w-xs`}
            >
              {currentProject.highlight}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2">
            <div className={`${themeClasses.softCard} p-5`}>
              <p
                className={`text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
              >
                Story
              </p>
              <p
                className={`mt-3 text-sm leading-7 sm:text-base ${themeClasses.muted}`}
              >
                {currentProject.story}
              </p>
            </div>
            <div className={`${themeClasses.softCard} p-5`}>
              <p
                className={`text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
              >
                What I focused on
              </p>
              <p
                className={`mt-3 text-sm leading-7 sm:text-base ${themeClasses.muted}`}
              >
                {currentProject.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
