import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../portfolio/data";
import { toSlug } from "../../portfolio/utils";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: toSlug(p.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => toSlug(p.name) === slug);
  if (!project) return {};

  const url = `https://mahirahmed.co.uk/work/${slug}`;
  const description = project.summary.slice(0, 160);

  return {
    title: `${project.name} | Mahir Ahmed`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.name,
      description,
      siteName: "Mahir Ahmed",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => toSlug(p.name) === slug);

  if (!project) notFound();

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.name,
    description: project.summary,
    author: {
      "@type": "Person",
      name: "Mahir Ahmed",
      url: "https://mahirahmed.co.uk",
    },
    url: `https://mahirahmed.co.uk/work/${slug}`,
    inLanguage: "en-GB",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#070d1a", color: "white" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full blur-[130px]"
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
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-xs text-white/35">
          <Link href="/" className="hover:text-white/60 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#work" className="hover:text-white/60 transition-colors">
            Work
          </Link>
          <span>/</span>
          <span className="text-white/55">{project.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3">
            Case study
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold leading-[1.05] tracking-tight mb-4">
            {project.name}
          </h1>
          <p className="text-base text-white/45 leading-relaxed max-w-2xl">
            {project.type}
          </p>

          {/* Stack pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg px-2.5 py-1 text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Impact banner */}
        <div
          className="mb-10 rounded-2xl p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(240,171,252,0.08), rgba(129,140,248,0.08), rgba(103,232,249,0.08))",
            border: "1px solid rgba(240,171,252,0.15)",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-1">
            Impact
          </p>
          <p className="text-lg font-semibold text-white/90">
            {project.impact}
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Overview
            </h2>
            <p className="text-base leading-[1.8] text-white/65">
              {project.summary}
            </p>
          </section>

          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Story */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              The story
            </h2>
            <p className="text-base leading-[1.8] text-white/65">
              {project.story}
            </p>
          </section>

          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Role */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Role
            </h2>
            <p className="text-base leading-[1.8] text-white/65">
              {project.role}
            </p>
          </section>

          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Challenge */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              The challenge
            </h2>
            <p className="text-base leading-[1.8] text-white/65">
              {project.challenge}
            </p>
          </section>

          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Approach */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-5">
              Approach
            </h2>
            <div className="space-y-4">
              {project.approach.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(240,171,252,0.2), rgba(103,232,249,0.2))",
                      border: "1px solid rgba(240,171,252,0.2)",
                      color: "rgba(240,171,252,0.9)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-base leading-[1.8] text-white/65">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Outcome */}
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Outcome
            </h2>
            <p className="text-base leading-[1.8] text-white/65">
              {project.outcome}
            </p>
          </section>
        </div>

        {/* CTA footer */}
        <div
          className="mt-16 rounded-2xl p-6 text-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">
            Interested in building something similar?
          </p>
          <p className="text-xs text-white/40 mb-5">
            Let&rsquo;s talk about your infrastructure or product needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#contact"
              className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-semibold text-[#070d1a] transition hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #e879f9, #67e8f9)",
              }}
            >
              Get in touch →
            </a>
            <Link
              href="/#work"
              className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-medium transition"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              ← All projects
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-xs text-white/30 hover:text-white/55 transition-colors"
          >
            Read the blog →
          </Link>
        </div>
      </div>
    </div>
  );
}
