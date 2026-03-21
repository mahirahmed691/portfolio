"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "../portfolio/blog-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "rgba(255,255,255,0.3)" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search posts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.85)",
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all"
            style={
              activeTag === null
                ? {
                    background:
                      "linear-gradient(135deg, rgba(240,171,252,0.2), rgba(129,140,248,0.2))",
                    border: "1px solid rgba(240,171,252,0.3)",
                    color: "rgba(255,255,255,0.9)",
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.4)",
                  }
            }
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all"
              style={
                activeTag === tag
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(240,171,252,0.2), rgba(129,140,248,0.2))",
                      border: "1px solid rgba(240,171,252,0.3)",
                      color: "rgba(255,255,255,0.9)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.4)",
                    }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl py-12 text-center text-sm"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          No posts match your search.
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl overflow-hidden transition-all hover:scale-[1.01]"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              }}
            >
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${post.coverGradient}`}
              />
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg px-2 py-0.5 text-[10px] uppercase tracking-widest font-medium text-white/40"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug group-hover:text-white/90 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-white/45 leading-relaxed mb-5">
                  {post.subtitle}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-white/30">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
