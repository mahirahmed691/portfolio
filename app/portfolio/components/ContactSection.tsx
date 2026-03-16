import type { SharedProps } from "../types";

export function ContactSection({
  isLight,
  themeClasses,
}: Pick<SharedProps, "isLight" | "themeClasses">) {
  return (
    <section
      id="contact"
      className={`mx-auto mt-6 max-w-7xl ${themeClasses.shell}`}
    >
      <div className="px-4 pb-24 pt-16 sm:px-6 sm:pt-20 md:p-12">
        <div
          className={
            isLight
              ? "overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-fuchsia-100 via-violet-50 to-cyan-100 p-8 md:p-12"
              : "overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/[0.12] via-violet-400/[0.08] to-cyan-400/[0.12] p-8 md:p-12"
          }
        >
          <div className="max-w-3xl">
            <p
              className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
            >
              Contact
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              If you want your portfolio, business site, or product UI to feel
              stronger, let’s talk.
            </h2>

            <p
              className={`mt-6 max-w-2xl text-lg leading-8 ${themeClasses.muted}`}
            >
              I can help you shape a cleaner visual direction, improve your page
              structure, and turn rough ideas into something polished enough to
              launch confidently.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:hello@mahirahmed.co.uk"
                className="rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.98]"
              >
                hello@mahirahmed.co.uk
              </a>

              <a
                href="https://github.com/mahirahmed691"
                className={
                  isLight
                    ? "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                    : "rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                }
              >
                GitHub profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
