import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now | Mahir Ahmed",
  description:
    "What Mahir Ahmed is working on right now — current projects, learning, and focus areas.",
  alternates: { canonical: "https://mahirahmed.co.uk/now" },
  openGraph: {
    type: "website",
    url: "https://mahirahmed.co.uk/now",
    title: "Now | Mahir Ahmed",
    description: "What Mahir Ahmed is working on right now.",
    siteName: "Mahir Ahmed",
  },
};

const LAST_UPDATED = "March 2026";

export default function NowPage() {
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

      <div className="relative mx-auto max-w-2xl px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>

        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3">
            Now
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[0.95] mb-4">
            What I&apos;m doing
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              right now.
            </span>
          </h1>
          <p
            className="text-xs text-white/30"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, marginTop: 16 }}
          >
            Last updated: {LAST_UPDATED} · Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 hover:text-white/65 underline underline-offset-2 transition-colors"
            >
              nownownow.com
            </a>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Day job
            </h2>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-base leading-[1.8] text-white/65">
                Platform engineer at{" "}
                <span className="text-white/85 font-medium">Betfred</span>,
                working on the infrastructure that keeps real-time betting
                services running reliably at scale. GCP, Kubernetes, data
                pipelines — the full platform stack. Enterprise clients have
                included HSBC, Zurich, and Deutsche Bank through previous
                contract work at GFT.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Side projects
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "This portfolio",
                  description:
                    "Continuously iterating — adding case study pages, improving the terminal easter egg, writing new blog posts. Built with Next.js 16, Tailwind CSS 4, and Framer Motion.",
                },
                {
                  title: "Freelance platform engineering",
                  description:
                    "Available for infrastructure contracts and full-stack product builds. If you need someone who can own the platform and the frontend, that's the sweet spot.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-sm font-semibold text-white/90 mb-1.5">
                    {item.title}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Learning
            </h2>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-base leading-[1.8] text-white/65">
                Going deeper on{" "}
                <span className="text-white/85 font-medium">
                  platform engineering patterns
                </span>{" "}
                — specifically around multi-cluster Kubernetes management,
                eBPF-based observability, and cost optimisation at the cloud
                infrastructure level. Also keeping up with the React Server
                Components model and what it means for full-stack architecture.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Reading
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "The Phoenix Project",
                  author: "Gene Kim, Kevin Behr, George Spafford",
                  note: "A novel about DevOps. Still the clearest explanation of why flow matters in software delivery.",
                },
                {
                  title: "Designing Distributed Systems",
                  author: "Brendan Burns",
                  note: "Container patterns from one of the Kubernetes co-founders. Useful for thinking about platform abstractions.",
                },
              ].map((book) => (
                <div
                  key={book.title}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-sm font-semibold text-white/90 mb-0.5">
                    {book.title}
                  </p>
                  <p className="text-xs text-white/35 mb-2">{book.author}</p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {book.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Location
            </h2>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-base leading-[1.8] text-white/65">
                Based in{" "}
                <span className="text-white/85 font-medium">Manchester, UK</span>
                . Occasionally remote-first.
              </p>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div
          className="mt-14 rounded-2xl p-6 text-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">
            Want to work together?
          </p>
          <p className="text-xs text-white/40 mb-5">
            Open to platform engineering contracts and full-stack product builds.
          </p>
          <a
            href="/#contact"
            className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-semibold text-[#070d1a] transition hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #e879f9, #67e8f9)",
            }}
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
}
