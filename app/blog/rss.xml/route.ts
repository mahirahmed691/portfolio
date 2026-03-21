import { blogPosts } from "../../portfolio/blog-data";

const BASE = "https://mahirahmed.co.uk";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = blogPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${post.slug}</guid>
      <description>${escapeXml(post.subtitle)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.tags.map(escapeXml).join(", ")}</category>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mahir Ahmed — Blog</title>
    <link>${BASE}/blog</link>
    <description>Writing on platform engineering, cloud infrastructure, and frontend development.</description>
    <language>en-GB</language>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>hello@mahirahmed.co.uk (Mahir Ahmed)</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
