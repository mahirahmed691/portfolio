import type { SharedProps } from "../types";

export function AboutSection({
  themeClasses,
}: Pick<SharedProps, "themeClasses">) {
  return (
    <section id="about" className="mx-auto mt-6 max-w-7xl px-4 pb-24 sm:px-6">
      <div className={`${themeClasses.shell} p-8 md:p-12`}>
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p
              className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
            >
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              I’m not trying to make websites look nice. I want them to feel
              distinctive.
            </h2>
          </div>
          <div
            className={`space-y-6 text-base leading-8 md:text-lg ${themeClasses.muted}`}
          >
            <p>
              My taste leans bold, polished, and story-led. I like websites with
              atmosphere, interfaces with restraint, and brand moments that make
              people feel something before they start reading.
            </p>
            <p>
              Whether I’m shaping a landing page, a brand-led website, or a
              product interface, I care about visual character just as much as
              structure, usability, and conversion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
