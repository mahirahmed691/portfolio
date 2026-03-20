import type { SharedProps } from "../types";

const STACK = [
  { label: "Kubernetes", icon: "kubernetes", color: "#326CE5" },
  { label: "GCP", icon: "googlecloud", color: "#4285F4" },
  { label: "AWS", icon: "amazonaws", color: "#FF9900" },
  { label: "Terraform", icon: "terraform", color: "#7B42BC" },
  { label: "Docker", icon: "docker", color: "#2496ED" },
  { label: "Jenkins", icon: "jenkins", color: "#D24939" },
  { label: "ArgoCD", icon: "argo", color: "#EF7B4D" },
  { label: "Ansible", icon: "ansible", color: "#EE0000" },
  { label: "Linux", icon: "linux", color: "#FCC624" },
  { label: "Python", icon: "python", color: "#3776AB" },
  { label: "Bash", icon: "gnubash", color: "#4EAA25" },
  { label: "MySQL", icon: "mysql", color: "#4479A1" },
];

export function AboutSection({
  isLight,
  themeClasses,
}: Pick<SharedProps, "isLight" | "themeClasses">) {
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

            {/* Compact stack pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {STACK.map((item) => (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                    isLight
                      ? "border border-slate-200 bg-white text-slate-700"
                      : "border border-white/10 bg-white/[0.04] text-white/70"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${item.icon}/${isLight ? item.color.replace("#", "") : "ffffff"}`}
                    alt={item.label}
                    width={13}
                    height={13}
                    loading="lazy"
                    className={isLight ? "" : "opacity-70"}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`space-y-6 text-base leading-8 md:text-lg ${themeClasses.muted}`}
          >
            <p>
              I&apos;ve spent 7 years building the platforms that keep
              production services running — Kubernetes clusters on GKE,
              GitOps-driven CI/CD pipelines, Terraform-managed infrastructure
              across GCP and AWS, and the incident response that holds it all
              together when things go wrong. Enterprise clients including HSBC,
              Zurich, and Deutsche Bank. Currently at Betfred.
            </p>

            <p>
              I also build the frontend. Not as an afterthought — as a natural
              extension of understanding the full system. When I design an
              interface, I already know what the API can handle, how the
              infrastructure is shaped, and what will actually hold up under
              load. That end-to-end ownership produces work that is faster,
              more reliable, and easier to scale than anything built in
              isolation.
            </p>

            <p>
              First Class BSc from the University of Salford. Based in
              Manchester.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
