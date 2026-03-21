import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uses | Mahir Ahmed",
  description:
    "The tools, software, and hardware I use daily as a platform engineer and frontend developer — editor, terminal, cloud tools, and more.",
  alternates: { canonical: "https://mahirahmed.co.uk/uses" },
  openGraph: {
    type: "website",
    url: "https://mahirahmed.co.uk/uses",
    title: "Uses | Mahir Ahmed",
    description:
      "The tools, software, and hardware I use daily as a platform engineer and frontend developer.",
    siteName: "Mahir Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uses | Mahir Ahmed",
    description:
      "The tools, software, and hardware I use daily as a platform engineer and frontend developer.",
  },
};

const sections = [
  {
    category: "Editor & Terminal",
    items: [
      {
        name: "VS Code",
        description:
          "Primary editor for TypeScript, Python, and frontend work. Clean, fast, and the extension ecosystem is unmatched.",
      },
      {
        name: "Warp",
        description:
          "Terminal with AI-assisted command suggestions and a modern UI. Makes long Terraform outputs and kubectl logs much easier to navigate.",
      },
      {
        name: "iTerm2",
        description:
          "Fallback terminal for when I need split panes and custom profiles. Still the most reliable option.",
      },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      {
        name: "Google Cloud Platform (GCP)",
        description:
          "Primary cloud. GKE, Pub/Sub, Dataflow, Cloud SQL, Cloud Run — most production platform work runs here.",
      },
      {
        name: "Amazon Web Services (AWS)",
        description:
          "Secondary cloud for multi-cloud setups. EKS, S3, IAM, Route53. Used alongside GCP on multi-cloud Terraform projects.",
      },
      {
        name: "Terraform",
        description:
          "Infrastructure as Code for everything. Reusable modules, state management with remote backends, `terraform plan` before every apply.",
      },
      {
        name: "ArgoCD",
        description:
          "GitOps continuous delivery for Kubernetes. Clusters watch the Git repo and converge automatically — makes rollbacks trivial.",
      },
    ],
  },
  {
    category: "Containers & Kubernetes",
    items: [
      {
        name: "Kubernetes",
        description:
          "Container orchestration for production workloads. GKE clusters, Helm charts, pod lifecycle management, HPA, and custom resource definitions.",
      },
      {
        name: "Docker",
        description:
          "Container images for everything. Multi-stage builds to keep images lean, Docker Compose for local development.",
      },
      {
        name: "Helm",
        description:
          "Kubernetes package manager. Templating for environment-specific values, chart versioning, and release management.",
      },
    ],
  },
  {
    category: "CI/CD & DevOps",
    items: [
      {
        name: "Jenkins",
        description:
          "Primary CI/CD at enterprise clients. Pipeline-as-code with Jenkinsfile, shared libraries, and multi-branch pipelines.",
      },
      {
        name: "GitHub Actions",
        description:
          "CI/CD for personal and smaller projects. YAML workflows, reusable actions, and GitHub-native integrations.",
      },
      {
        name: "Ansible",
        description:
          "Configuration management and automation. Idempotent playbooks for server provisioning and application deployment.",
      },
    ],
  },
  {
    category: "Monitoring & Observability",
    items: [
      {
        name: "GCP Operations Suite",
        description:
          "Logging, monitoring, and alerting on GCP. Log-based metrics, uptime checks, and alert policies for production pipelines.",
      },
      {
        name: "Grafana",
        description:
          "Dashboards for Kubernetes cluster metrics and application performance. Connected to Prometheus for real-time monitoring.",
      },
      {
        name: "Prometheus",
        description:
          "Metrics collection and alerting for Kubernetes. Custom scrape configs, recording rules, and Alertmanager integration.",
      },
    ],
  },
  {
    category: "Languages",
    items: [
      {
        name: "TypeScript",
        description:
          "Default for all frontend and Node.js work. Strict mode on, no implicit any. Types as documentation.",
      },
      {
        name: "Python",
        description:
          "Data pipelines, scripting, Dataflow jobs, and automation. Clean, readable code over clever one-liners.",
      },
      {
        name: "Bash",
        description:
          "Shell scripts for automation, CI steps, and infrastructure tasks. Shellcheck for linting.",
      },
    ],
  },
  {
    category: "Frontend & Frameworks",
    items: [
      {
        name: "Next.js",
        description:
          "React framework for everything from portfolio sites to full-stack apps. App Router, server components, and edge rendering.",
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first CSS. Fast to iterate, easy to maintain, and the design system constraints help keep UIs consistent.",
      },
      {
        name: "Framer Motion",
        description:
          "Animations and transitions. Respects `prefers-reduced-motion`, uses spring physics for natural-feeling motion.",
      },
    ],
  },
  {
    category: "Hardware",
    items: [
      {
        name: "MacBook Pro (M-series)",
        description:
          "Build times, terminal performance, and battery life are all significantly better than Intel. Hard to go back.",
      },
      {
        name: "External monitor",
        description:
          "Code on the left, terminal and docs on the right. Hard to work any other way when you're context-switching between infrastructure and frontend.",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#070d1a", color: "white" }}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(232,121,249,0.07) 0%, rgba(99,102,241,0.04) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>

        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3">
            Uses
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[0.95] mb-5">
            Tools I use
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              every day.
            </span>
          </h1>
          <p className="text-base text-white/45 max-w-xl leading-relaxed">
            A breakdown of the editor, cloud tools, languages, and hardware that
            make up my daily setup as a platform engineer and frontend
            developer.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.category}>
              <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-5">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p className="text-sm font-semibold text-white/90 mb-1.5">
                      {item.name}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="mt-16 rounded-2xl p-6 text-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">
            Want to build something together?
          </p>
          <p className="text-xs text-white/40 mb-5">
            Platform engineering, full-stack products, and frontend work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#contact"
              className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-semibold text-[#070d1a] transition hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, #f9a8d4, #e879f9, #67e8f9)",
              }}
            >
              Get in touch →
            </a>
            <Link
              href="/services"
              className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-medium transition"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              View services →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
