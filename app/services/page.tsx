import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services & Pricing | Mahir Ahmed",
  description:
    "Platform engineering contracts, full-stack product builds, and frontend development. Clear pricing from £500 to £3,000+.",
  alternates: { canonical: "https://mahirahmed.co.uk/services" },
  openGraph: {
    type: "website",
    url: "https://mahirahmed.co.uk/services",
    title: "Services & Pricing | Mahir Ahmed",
    description:
      "Platform engineering contracts, full-stack product builds, and frontend development.",
    siteName: "Mahir Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing | Mahir Ahmed",
    description:
      "Platform engineering contracts, full-stack product builds, and frontend development.",
  },
};

const packages = [
  {
    name: "Starter",
    price: "From £500",
    note: "One-page or landing page",
    description:
      "A fast, polished single page — landing page, portfolio, or personal site. Clean design, mobile-first, and ready to launch quickly.",
    bestFor: "Landing pages, personal sites, simple launches",
    includes: [
      "1-page design and build",
      "Mobile-responsive layout",
      "Basic contact form",
      "Performance optimisation",
      "1 round of revisions",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "From £1,500",
    note: "Multi-page website",
    description:
      "A full website for a business, brand, or product — multiple pages, polished design, CMS integration if needed, and built to convert.",
    bestFor: "Business sites, product launches, brand websites",
    includes: [
      "Up to 5 pages",
      "Custom design and animations",
      "CMS or contact integrations",
      "SEO fundamentals",
      "2 rounds of revisions",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "From £3,000",
    note: "Full product or web app",
    description:
      "A complete web product — custom UI, backend integration, authentication, and anything that needs serious frontend engineering behind it.",
    bestFor: "Web apps, dashboards, client portals, full products",
    includes: [
      "Full product design and build",
      "API and backend integration",
      "Auth and user flows",
      "Ongoing support available",
      "Unlimited revisions",
    ],
    featured: false,
  },
];

const platformServices = [
  {
    title: "Platform engineering",
    description:
      "Kubernetes clusters on GKE/EKS, CI/CD pipelines, GitOps with ArgoCD, infrastructure as code with Terraform, cloud architecture across GCP and AWS.",
    icon: "⬡",
    tags: ["Kubernetes", "GKE", "Terraform", "CI/CD", "GitOps"],
  },
  {
    title: "Data pipelines",
    description:
      "Real-time data pipelines on GCP using Pub/Sub and Dataflow, stream processing, Cloud SQL integration, monitoring and alerting.",
    icon: "◈",
    tags: ["Pub/Sub", "Dataflow", "Cloud SQL", "GCP", "Python"],
  },
  {
    title: "Infrastructure as Code",
    description:
      "Reusable Terraform modules, multi-cloud provisioning, environment consistency, configuration drift prevention.",
    icon: "◎",
    tags: ["Terraform", "GCP", "AWS", "IaC", "Multi-cloud"],
  },
];

const faqs = [
  {
    q: "How does the process work?",
    a: "Start by filling in the project brief on the contact page. I'll review your requirements and recommend the best starting point. Once scope is agreed, you pay a 50% deposit and we begin.",
  },
  {
    q: "What if my project doesn't fit a fixed package?",
    a: "Most projects are scoped individually. The packages are a starting point — final pricing reflects the actual scope after our initial discussion.",
  },
  {
    q: "Do you work on platform engineering contracts?",
    a: "Yes. Platform engineering, DevOps, and infrastructure work is available on a project or contract basis. Get in touch with details about your team and requirements.",
  },
  {
    q: "How quickly can you start?",
    a: "Availability varies. Book a call to discuss timelines and I'll give you a realistic start date.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes, ongoing support and retainer arrangements are available after project completion. The Premium package includes support options.",
  },
];

export default function ServicesPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#070d1a", color: "white" }}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full blur-[140px]"
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

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
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
            Services
          </p>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[0.95] mb-5">
            What I build,
            <br />
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              and what it costs.
            </span>
          </h1>
          <p className="text-base text-white/45 max-w-xl leading-relaxed">
            Platform engineering, full-stack products, and polished frontend
            work — from infrastructure to interface.
          </p>
        </div>

        {/* Pricing packages */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-8">
            Frontend & product packages
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="relative flex flex-col rounded-2xl p-6"
                style={
                  pkg.featured
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(240,171,252,0.1), rgba(129,140,248,0.1), rgba(103,232,249,0.08))",
                        border: "1px solid rgba(240,171,252,0.25)",
                        boxShadow: "0 20px 60px rgba(139,92,246,0.15)",
                      }
                    : {
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                {pkg.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-slate-950"
                    style={{
                      background:
                        "linear-gradient(135deg, #f0abfc, #818cf8, #67e8f9)",
                    }}
                  >
                    Most popular
                  </div>
                )}
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-2">
                  {pkg.name}
                </p>
                <p className="text-3xl font-semibold mb-1">{pkg.price}</p>
                <p className="text-xs text-white/35 mb-4">{pkg.note}</p>
                <p className="text-sm text-white/55 leading-relaxed mb-6">
                  {pkg.description}
                </p>
                <div className="mt-auto space-y-2">
                  {pkg.includes.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs text-fuchsia-400">✓</span>
                      <span className="text-sm text-white/65">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/#contact"
                  className="mt-6 block rounded-xl py-2.5 text-center text-sm font-semibold transition-all hover:opacity-90"
                  style={
                    pkg.featured
                      ? {
                          background:
                            "linear-gradient(135deg, #f0abfc, #818cf8, #67e8f9)",
                          color: "#070d1a",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.8)",
                        }
                  }
                >
                  Start project →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Platform engineering services */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-8">
            Platform engineering
          </h2>
          <p className="text-sm text-white/45 mb-8 max-w-2xl leading-relaxed">
            Platform engineering work is scoped individually based on team size,
            existing infrastructure, and project complexity. Get in touch with
            details and I&rsquo;ll put together a proposal.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {platformServices.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-base"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {svc.icon}
                </div>
                <h3 className="text-base font-semibold mb-2">{svc.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {svc.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md px-2 py-0.5 text-[10px] text-white/40"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-sm font-semibold text-white/90 mb-2">
                  {faq.q}
                </p>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(240,171,252,0.08), rgba(129,140,248,0.08))",
            border: "1px solid rgba(240,171,252,0.15)",
          }}
        >
          <p className="text-lg font-semibold mb-2">Ready to get started?</p>
          <p className="text-sm text-white/45 mb-6 max-w-md mx-auto">
            Fill in a brief and I&rsquo;ll recommend the best starting point for
            your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#contact"
              className="inline-flex h-11 items-center justify-center rounded-xl px-8 text-sm font-semibold text-[#070d1a] transition hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #e879f9, #67e8f9)",
              }}
            >
              Start your project →
            </a>
            <a
              href="https://calendly.com/mahirahmed691"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-medium transition"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
