import { motion } from "framer-motion";
import { services } from "../data";
import type { SharedProps } from "../types";

export function ServicesSection({
  isLight,
  themeClasses,
  focusMode,
}: Pick<SharedProps, "isLight" | "themeClasses" | "focusMode">) {
  if (focusMode) return null;

  return (
    <section id="services" className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
      <div className={`${themeClasses.shell} px-4 py-16 sm:px-6 sm:py-20`}>
        <div className="mb-12 max-w-2xl">
          <p
            className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
          >
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            I help brands feel sharper, products feel clearer, and launches feel
            more intentional.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`${themeClasses.sectionShell} p-7`}
            >
              <div
                className={
                  isLight
                    ? "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 text-lg text-slate-900"
                    : "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg text-white/90"
                }
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className={`mt-4 text-base leading-7 ${themeClasses.muted}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
