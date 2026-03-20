import type { SharedProps } from "../types";

export function AboutSection({
  themeClasses,
}: Pick<SharedProps, "themeClasses">) {
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
