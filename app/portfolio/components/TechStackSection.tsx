import { motion } from "framer-motion";
import type { SharedProps } from "../types";

const STACK = [
  { label: "Kubernetes", category: "Orchestration", color: "#326CE5", icon: "kubernetes" },
  { label: "GCP", category: "Cloud", color: "#4285F4", icon: "googlecloud" },
  { label: "AWS", category: "Cloud", color: "#FF9900", icon: "amazonaws" },
  { label: "Terraform", category: "IaC", color: "#7B42BC", icon: "terraform" },
  { label: "Docker", category: "Containers", color: "#2496ED", icon: "docker" },
  { label: "Jenkins", category: "CI/CD", color: "#D24939", icon: "jenkins" },
  { label: "ArgoCD", category: "GitOps", color: "#EF7B4D", icon: "argo" },
  { label: "Ansible", category: "Config mgmt", color: "#EE0000", icon: "ansible" },
  { label: "Linux", category: "OS", color: "#FCC624", icon: "linux" },
  { label: "Python", category: "Scripting", color: "#3776AB", icon: "python" },
  { label: "Bash", category: "Scripting", color: "#4EAA25", icon: "gnubash" },
  { label: "MySQL", category: "Databases", color: "#4479A1", icon: "mysql" },
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
              className={`relative flex flex-col gap-3 overflow-hidden rounded-2xl border p-4 ${
                isLight
                  ? "border-slate-200 bg-white"
                  : "border-white/8 bg-white/[0.03]"
              }`}
            >
              {/* Brand colour top bar */}
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: item.color }}
              />

              {/* Brand logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${item.icon}/${item.color.replace("#", "")}`}
                alt={item.label}
                width={28}
                height={28}
                loading="lazy"
              />

              <div>
                <p
                  className={`text-[10px] uppercase tracking-[0.18em] ${themeClasses.subtle}`}
                >
                  {item.category}
                </p>
                <p
                  className={`mt-0.5 text-sm font-semibold ${
                    isLight ? "text-slate-900" : "text-white/90"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
