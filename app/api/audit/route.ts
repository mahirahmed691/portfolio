import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Auth check — same cookie hash pattern as other admin routes
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_auth")?.value;
  const adminSecret = process.env.ADMIN_SECRET;
  const expectedToken = adminSecret ? await getSessionToken(adminSecret) : null;

  if (!expectedToken || adminCookie !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url } = body;

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // Validate URL format
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const isHttps = parsedUrl.protocol === "https:";

  // Fetch the page with a 10s timeout
  const start = Date.now();
  let html = "";
  let statusCode = 0;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MahirAuditBot/1.0; +https://mahirahmed.dev)",
      },
    });
    statusCode = response.status;
    html = await response.text();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch URL";
    return NextResponse.json(
      { error: `Fetch failed: ${message}` },
      { status: 502 },
    );
  }

  const responseTime = Date.now() - start;

  // ── Parse HTML with regex / string matching ──────────────────────

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch
    ? titleMatch[1].replace(/\s+/g, " ").trim()
    : null;
  const hasTitle = titleText !== null && titleText.length > 0;
  const titleLength = titleText ? titleText.length : null;

  // Meta description
  const metaDescMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  ) || html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
  );
  const hasMetaDescription = metaDescMatch !== null;
  const metaDescriptionLength = metaDescMatch ? metaDescMatch[1].length : null;

  // Viewport meta
  const hasViewportMeta =
    /<meta[^>]+name=["']viewport["']/i.test(html) ||
    /<meta[^>]+content=["'][^"']*width=device-width[^"']*["']/i.test(html);

  // H1
  const h1Matches = html.match(/<h1[\s>]/gi);
  const hasH1 = h1Matches !== null && h1Matches.length > 0;
  const h1Count = h1Matches ? h1Matches.length : 0;

  // Images without alt
  const allImgMatches = html.match(/<img\b[^>]*>/gi) || [];
  const imagesWithoutAlt = allImgMatches.filter(
    (img) => !/alt=["'][^"']*["']/i.test(img) || /alt=["']["']/i.test(img),
  ).length;

  // Open Graph
  const hasOpenGraph = /<meta[^>]+property=["']og:/i.test(html);

  // Canonical
  const hasCanonical =
    /<link[^>]+rel=["']canonical["']/i.test(html) ||
    /<link[^>]+rel=["'][^"']*canonical[^"']*["']/i.test(html);

  // ── Score calculation ────────────────────────────────────────────
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  if (!hasTitle) {
    score -= 15;
    issues.push("No <title> tag found");
    suggestions.push(
      "Add a descriptive <title> tag (50–60 characters) that includes your primary keyword",
    );
  } else if (titleLength !== null && titleLength < 30) {
    score -= 5;
    issues.push(`Title is too short (${titleLength} chars)`);
    suggestions.push(
      "Expand the title to 50–60 characters to give search engines more context",
    );
  } else if (titleLength !== null && titleLength > 60) {
    score -= 5;
    issues.push(`Title is too long (${titleLength} chars — truncated in SERPs)`);
    suggestions.push("Shorten the title to under 60 characters to avoid SERP truncation");
  }

  if (!hasMetaDescription) {
    score -= 15;
    issues.push("No meta description found");
    suggestions.push(
      "Add a meta description (150–160 characters) summarising the page content",
    );
  }

  if (!hasViewportMeta) {
    score -= 10;
    issues.push("No viewport meta tag — page may not be mobile-friendly");
    suggestions.push(
      'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the <head>',
    );
  }

  if (!isHttps) {
    score -= 20;
    issues.push("Page is served over HTTP, not HTTPS");
    suggestions.push(
      "Enable HTTPS via a free Let's Encrypt certificate or your hosting provider",
    );
  }

  if (!hasH1) {
    score -= 10;
    issues.push("No <h1> tag found");
    suggestions.push(
      "Add a single <h1> tag containing your primary keyword near the top of the page",
    );
  } else if (h1Count > 1) {
    score -= 5;
    issues.push(`${h1Count} <h1> tags found — there should only be one`);
    suggestions.push(
      "Reduce to a single <h1> per page; use <h2>–<h6> for subsections",
    );
  }

  if (imagesWithoutAlt > 0) {
    const deduction = Math.min(imagesWithoutAlt * 3, 15);
    score -= deduction;
    issues.push(
      `${imagesWithoutAlt} image${imagesWithoutAlt > 1 ? "s" : ""} missing alt text`,
    );
    suggestions.push(
      "Add descriptive alt attributes to all images for accessibility and image SEO",
    );
  }

  if (!hasOpenGraph) {
    score -= 5;
    issues.push("No Open Graph tags found");
    suggestions.push(
      "Add og:title, og:description, and og:image tags to improve social sharing previews",
    );
  }

  if (!hasCanonical) {
    score -= 5;
    issues.push("No canonical URL tag found");
    suggestions.push(
      'Add <link rel="canonical" href="[page-url]"> to prevent duplicate content issues',
    );
  }

  score = Math.max(0, score);

  return NextResponse.json({
    url,
    responseTime,
    statusCode,
    checks: {
      hasTitle,
      titleLength,
      titleText,
      hasMetaDescription,
      metaDescriptionLength,
      hasViewportMeta,
      isHttps,
      hasH1,
      h1Count,
      imagesWithoutAlt,
      hasOpenGraph,
      hasCanonical,
    },
    score,
    issues,
    suggestions,
  });
}
