import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../../portfolio/blog-data";

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

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const coverBackground =
    gradientMap[post.coverGradient] ??
    "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(99,102,241,0.15))";

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
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-[1.75] text-white/65"
            >
              {paragraph}
            </p>
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
    </div>
  );
}
