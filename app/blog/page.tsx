import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "../portfolio/blog-data";
import { BlogList } from "./BlogList";



export const metadata: Metadata = {
  title: "Blog | Mahir Ahmed",
  description:
    "Thoughts on platform engineering, cloud infrastructure, and frontend development — written by Mahir Ahmed.",
  alternates: { canonical: "https://mahirahmed.co.uk/blog" },
  openGraph: {
    type: "website",
    url: "https://mahirahmed.co.uk/blog",
    title: "Blog | Mahir Ahmed",
    description:
      "Thoughts on platform engineering, cloud infrastructure, and frontend development.",
    siteName: "Mahir Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Mahir Ahmed",
    description:
      "Thoughts on platform engineering, cloud infrastructure, and frontend development.",
  },
};

export default function BlogPage() {
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
              "radial-gradient(ellipse, rgba(232,121,249,0.08) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)",
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

      <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>

        <div className="mb-12 sm:mb-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-2">
                Writing
              </p>
              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[0.95]">
                Writing on platform engineering,{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  infrastructure, and the web
                </span>
              </h1>
              <p className="mt-4 text-base text-white/45 max-w-xl">
                Practical perspectives on cloud infrastructure, developer tooling,
                and building things that actually ship.
              </p>
            </div>
            <a
              href="/blog/rss.xml"
              className="shrink-0 mt-1 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
              }}
              title="RSS feed"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
              </svg>
              RSS
            </a>
          </div>
        </div>

        {/* Post grid with search */}
        <BlogList posts={blogPosts} />
      </div>
    </div>
  );
}
