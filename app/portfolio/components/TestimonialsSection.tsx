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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              {/* Stars */}
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
                <p
                  className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white/90"}`}
                >
                  {testimonial.name}
                </p>
                <p className={`mt-0.5 text-xs ${themeClasses.subtle}`}>
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
