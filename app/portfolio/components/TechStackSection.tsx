import { motion } from "framer-motion";
import type { SharedProps } from "../types";

const STACK = [
  { label: "Kubernetes", category: "Orchestration" },
  { label: "GCP", category: "Cloud" },
  { label: "AWS", category: "Cloud" },
  { label: "Terraform", category: "IaC" },
  { label: "Docker", category: "Containers" },
  { label: "Jenkins", category: "CI/CD" },
  { label: "ArgoCD", category: "GitOps" },
  { label: "Ansible", category: "Config mgmt" },
  { label: "Linux", category: "OS" },
  { label: "Python", category: "Scripting" },
  { label: "Bash", category: "Scripting" },
  { label: "MySQL", category: "Databases" },
];

export function TechStackSection({
  isLight,
  themeClasses,
  focusMode,
}: Pick<SharedProps, "isLight" | "themeClasses" | "focusMode">) {
  if (focusMode) return null;

  return (
    <section
      id="stack"
      className={`mx-auto mt-6 max-w-7xl ${themeClasses.shell}`}
    >
      <div className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-12 max-w-2xl">
          <p
            className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
          >
            Core stack
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
            The tools I work with every day in production.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {STACK.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className={`flex flex-col gap-1 rounded-2xl border p-4 ${
                isLight
                  ? "border-slate-200 bg-white"
                  : "border-white/8 bg-white/[0.03]"
              }`}
            >
              <p
                className={`text-[10px] uppercase tracking-[0.18em] ${themeClasses.subtle}`}
              >
                {item.category}
              </p>
              <p
                className={`text-sm font-semibold ${
                  isLight ? "text-slate-900" : "text-white/90"
                }`}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
