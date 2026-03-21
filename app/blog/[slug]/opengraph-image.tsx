import { ImageResponse } from "next/og";
import { blogPosts } from "../../portfolio/blog-data";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  const title = post?.title ?? "Blog | Mahir Ahmed";
  const subtitle = post?.subtitle ?? "Platform engineer & frontend developer";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 72px",
          background: "#070d1a",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(232,121,249,0.12) 0%, rgba(99,102,241,0.07) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 8 }}>
              {tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 55 ? 42 : 52,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.5,
              maxWidth: 780,
            }}
          >
            {subtitle.slice(0, 120)}
            {subtitle.length > 120 ? "…" : ""}
          </div>

          {/* Author row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 8,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f0abfc, #818cf8, #67e8f9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#070d1a",
              }}
            >
              MA
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
              Mahir Ahmed · mahirahmed.co.uk
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
