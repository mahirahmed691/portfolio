import type { SharedProps } from "../types";
import type React from "react";

// AWS SVG path (inline — not available on Simple Icons CDN)
const AWSSvg = ({ color }: { color: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336c-.072.048-.144.072-.208.072-.08 0-.16-.04-.24-.112a2.478 2.478 0 0 1-.288-.376 6.172 6.172 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104a6.356 6.356 0 0 0-.864.272 2.294 2.294 0 0 1-.28.104.488.488 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.6.6 0 0 1 .224-.168 5.49 5.49 0 0 1 .96-.344 4.612 4.612 0 0 1 1.184-.144c.904 0 1.568.208 2 .624.424.416.64 1.048.64 1.896v2.496zm-3.248.888c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.725 6.725 0 0 0-.736-.136 6.01 6.01 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.864c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.7 6.504a1.41 1.41 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.416 5.576 1.312-5.576c.04-.16.088-.264.152-.312a.53.53 0 0 1 .32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.328 5.648 1.464-5.648c.048-.16.104-.264.16-.312.064-.048.168-.08.312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.2l-2.048 5.892c-.048.16-.104.264-.168.312-.064.048-.168.08-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32l-1.304-5.432-1.296 5.424c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm10.952.216c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.232v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.264.28-.176.424-.432.424-.76 0-.224-.072-.408-.216-.56-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.288-.816a1.951 1.951 0 0 1-.408-1.2c0-.344.072-.648.224-.912.152-.264.352-.496.6-.68.248-.192.528-.336.848-.432.32-.096.656-.144 1.008-.144.176 0 .36.008.536.032.184.024.352.056.512.088.152.04.296.08.432.128.136.048.24.096.312.144.104.064.176.128.216.2.04.064.064.152.064.264v.376c0 .168-.064.256-.184.256a.836.836 0 0 1-.304-.096 3.652 3.652 0 0 0-1.528-.312c-.472 0-.84.08-1.096.24-.256.16-.384.4-.384.728 0 .224.08.416.24.568.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.768.248.328.368.704.368 1.12 0 .352-.072.672-.208.952-.144.28-.336.528-.592.728-.256.208-.56.36-.912.464a4.068 4.068 0 0 1-1.136.152z"/>
  </svg>
);

const STACK: { label: string; icon?: string; color: string; svg?: (c: string) => React.ReactNode }[] = [
  { label: "Kubernetes", icon: "kubernetes", color: "#326CE5" },
  { label: "GCP", icon: "googlecloud", color: "#4285F4" },
  { label: "AWS", color: "#FF9900", svg: (c) => <AWSSvg color={c} /> },
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
                  {item.svg ? (
                    <span className={isLight ? "" : "opacity-70"}>
                      {item.svg(isLight ? item.color : "#ffffff")}
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://cdn.simpleicons.org/${item.icon}/${isLight ? item.color.replace("#", "") : "ffffff"}`}
                      alt={item.label}
                      width={13}
                      height={13}
                      loading="lazy"
                      className={isLight ? "" : "opacity-70"}
                    />
                  )}
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
