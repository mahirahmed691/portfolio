import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mahir Ahmed — Platform Engineer & Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#060e1a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(6,182,212,0.12)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.1)",
            filter: "blur(80px)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Platform engineer · frontend craftsman · since 2018
            </div>
          </div>

          <div
            style={{
              fontSize: "64px",
              fontWeight: "700",
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Mahir Ahmed
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            Building cloud infrastructure and product interfaces that scale.
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {["GCP", "Kubernetes", "Terraform", "React", "Next.js"].map((t) => (
              <div
                key={t}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          mahirahmed.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
