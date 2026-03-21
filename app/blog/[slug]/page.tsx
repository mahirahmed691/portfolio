import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../../portfolio/blog-data";
import { ScrollProgress } from "./ScrollProgress";
import { ShareButtons } from "./ShareButtons";
import { BackToTop } from "../../portfolio/components/BackToTop";
import { TableOfContents } from "./TableOfContents";
import { ReadProgress } from "./ReadProgress";
import { NewsletterCta } from "./NewsletterCta";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Gradient map for cover areas — matches the coverGradient values in blog-data.ts
// We use inline styles because Tailwind can't process dynamically-constructed class strings.
const gradientMap: Record<string, string> = {
  "from-rose-500/20 via-fuchsia-500/20 to-violet-500/20":
    "linear-gradient(135deg, rgba(244,63,94,0.20), rgba(217,70,239,0.20), rgba(139,92,246,0.20))",
  "from-cyan-500/20 via-blue-500/20 to-violet-500/20":
    "linear-gradient(135deg, rgba(6,182,212,0.20), rgba(59,130,246,0.20), rgba(139,92,246,0.20))",
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `https://mahirahmed.co.uk/blog/${post.slug}`;
  const description = post.subtitle.slice(0, 160);

  return {
    title: `${post.title} | Mahir Ahmed`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      siteName: "Mahir Ahmed",
      publishedTime: post.date,
      authors: ["Mahir Ahmed"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Mahir Ahmed",
      url: "https://mahirahmed.co.uk",
    },
    publisher: {
      "@type": "Person",
      name: "Mahir Ahmed",
      url: "https://mahirahmed.co.uk",
    },
    url: `https://mahirahmed.co.uk/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "Blog",
      name: "Mahir Ahmed — Blog",
      url: "https://mahirahmed.co.uk/blog",
    },
  };

  const blocks = post.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const headings = blocks
    .filter((b) => b.startsWith("## ") || b.startsWith("### "))
    .map((b) => {
      const level = b.startsWith("### ") ? 3 : 2;
      const text = b.replace(/^#{2,3} /, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { id, text, level };
    });

  const related = blogPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => post.tags.includes(t)),
    )
    .slice(0, 3);

  const coverBackground =
    gradientMap[post.coverGradient] ??
    "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(99,102,241,0.15))";

  return (
    <div
      className="min-h-screen"
      style={{ background: "#070d1a", color: "white" }}
    >
      <ScrollProgress />
      <ReadProgress title={post.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* ToC sidebar — desktop only */}
        {headings.length > 0 && (
          <div className="hidden xl:block fixed top-28 right-[max(2rem,calc(50%-42rem))] w-48">
            <TableOfContents headings={headings} />
          </div>
        )}
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors"
          >
            ← Back to blog
          </Link>
        </div>

        {/* Cover gradient area */}
        <div
          className="rounded-2xl mb-8 h-36 sm:h-48 flex items-end p-5"
          style={{ background: coverBackground }}
        >
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium"
                style={{
                  background: "rgba(0,0,0,0.30)",
                  color: "rgba(255,255,255,0.70)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-semibold leading-[1.1] tracking-tight mb-3">
          {post.title}
        </h1>
        <p className="text-base text-white/45 leading-relaxed mb-6">
          {post.subtitle}
        </p>

        {/* Meta */}
        <div
          className="flex items-center gap-3 text-[11px] text-white/30 mb-10 pb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {blocks.map((block, i) => {
            if (block.startsWith("## ")) {
              const text = block.replace(/^## /, "");
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <h2 key={i} id={id} className="pt-4 text-xl font-semibold tracking-tight text-white/90 scroll-mt-24">
                  {text}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              const text = block.replace(/^### /, "");
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <h3 key={i} id={id} className="pt-2 text-base font-semibold text-white/80 scroll-mt-24">
                  {text}
                </h3>
              );
            }
            return (
              <p key={i} className="text-base leading-[1.75] text-white/65">
                {block}
              </p>
            );
          })}
        </div>

        {/* Share */}
        <div
          className="mt-12 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
          }}
        >
          <ShareButtons title={post.title} slug={post.slug} />
          <a
            href="/blog/rss.xml"
            className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
            title="RSS feed"
          >
            RSS
          </a>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.22em] text-white/30 mb-4">
              Related posts
            </p>
            <div className="space-y-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex items-center justify-between rounded-2xl p-4 transition hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="min-w-0 mr-4">
                    <p className="text-sm font-medium text-white/80 group-hover:text-white truncate">
                      {rel.title}
                    </p>
                    <p className="text-xs text-white/35 mt-0.5">{rel.readTime}</p>
                  </div>
                  <span className="shrink-0 text-xs text-white/30 group-hover:text-white/60 transition-colors">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <NewsletterCta />

        {/* Footer CTA */}
        <div
          className="mt-16 rounded-2xl p-6 text-center"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-sm font-semibold text-white mb-1">
            Enjoyed this?
          </p>
          <p className="text-xs text-white/40 mb-5">
            If you're thinking about your own website or brand, let's talk.
          </p>
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
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-xs text-white/30 hover:text-white/55 transition-colors"
          >
            ← All posts
          </Link>
        </div>
      </div>
      <BackToTop />
      </div>
      </div>
  );
}
