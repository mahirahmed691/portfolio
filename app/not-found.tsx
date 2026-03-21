import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#070d1a", color: "white" }}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)",
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

      <div className="relative text-center px-6">
        <p
          className="text-[10px] uppercase tracking-[0.3em] mb-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          404
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
          Page not found
        </h1>
        <p
          className="text-sm sm:text-base max-w-sm mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          This page doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-semibold transition hover:opacity-90"
            style={{
              background: "white",
              color: "#070d1a",
            }}
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-xl px-6 text-sm font-medium transition"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  );
}
