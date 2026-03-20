import type { SharedProps } from "../types";

export function AboutSection({
  themeClasses,
}: Pick<SharedProps, "themeClasses">) {
  return (
    <section
      id="about"
      className={`mx-auto mt-6 max-w-7xl ${themeClasses.shell}`}
    >
      <div className="px-4 pb-24 pt-16 sm:px-6 md:p-12">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p
              className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
            >
              About
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              Platform engineer by trade. Frontend craftsman by design.
            </h2>
          </div>

          <div
            className={`space-y-6 text-base leading-8 md:text-lg ${themeClasses.muted}`}
          >
            <p>
              I&apos;ve spent 7 years building the systems most engineers never
              see — cloud infrastructure, CI/CD pipelines, distributed
              services, and the observability that keeps them honest in
              production. That depth changes how I approach everything above it.
            </p>

            <p>
              I also care deeply about what users actually experience. When I
              build a frontend, I&apos;m not guessing what the backend can
              handle — I built it. That end-to-end ownership produces work that
              is faster, more reliable, and easier to scale than anything built
              in isolation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
