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
      className={`mx-auto mt-6 max-w-7xl ${themeClasses.shell}`}
    >
      <div className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-12 max-w-2xl">
          <p
            className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
          >
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            What founders and teams say after working together.
          </h2>
        </div>

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.simpleicons.org/linkedin/0A66C2"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  loading="lazy"
                  className="opacity-60"
                />
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
            href="https://www.linkedin.com/in/mahir-ahmed691/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition hover:scale-[0.98] ${
              isLight
                ? "border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                : "border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80"
            }`}
          >
            <img
              src="https://cdn.simpleicons.org/linkedin/0A66C2"
              alt=""
              width={14}
              height={14}
              className="opacity-70"
            />
            Leave a recommendation on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
