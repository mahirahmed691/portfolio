import type { Project, ThemeClasses } from "../types";
import { ProjectDiagram } from "./ProjectDiagram";

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
      className={`relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] ${themeClasses.sectionShell} p-6 sm:p-8 min-h-[480px] sm:min-h-[520px]`}
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-h-[220px]">
          <ProjectDiagram diagram={currentProject.diagram} accent={currentProject.accent} />
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
