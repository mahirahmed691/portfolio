import { motion } from "framer-motion";
import { testimonials } from "../data";
import type { SharedProps } from "../types";

export function TestimonialsSection({
  isLight,
  themeClasses,
}: Pick<SharedProps, "isLight" | "themeClasses">) {
  return (
    <section
      id="testimonials"
      className={`relative mx-auto mt-6 max-w-7xl ${themeClasses.shell}`}
    >
      <div className="px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p
            className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
          >
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            What founders and teams say after working together.
          </h2>
        </motion.div>

        <div
          className={`grid gap-6 ${
            testimonials.length === 1
              ? "max-w-2xl"
              : testimonials.length === 2
                ? "md:grid-cols-2 max-w-4xl"
                : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`flex flex-col justify-between rounded-2xl border p-6 ${
                isLight
                  ? "border-slate-200 bg-white"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {/* LinkedIn source badge */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "text-amber-400"
                        : isLight
                          ? "text-slate-200"
                          : "text-white/10"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                </div>
                {/* LinkedIn logo */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2" className="opacity-60">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>

              {/* Quote */}
              <p
                className={`mt-5 flex-1 text-sm leading-7 ${themeClasses.muted}`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6">
                <div
                  className={`h-px w-full mb-5 ${isLight ? "bg-slate-100" : "bg-white/5"}`}
                />
                <div className="flex items-center gap-3">
                  {/* Initials avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-400 via-violet-400 to-cyan-400 text-xs font-bold text-slate-950">
                    {testimonial.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white/90"}`}
                    >
                      {testimonial.name}
                    </p>
                    <p className={`mt-0.5 text-xs ${themeClasses.subtle}`}>
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="https://www.linkedin.com/in/mahir-ahmed-84a346149/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition hover:scale-[0.98] ${
              isLight
                ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                : "border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" className="opacity-70">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Leave a recommendation on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
