"use client";

import { useState } from "react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://mahirahmed.co.uk/blog/${slug}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetText = encodeURIComponent(`${title} — ${url}`);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/30">Share:</span>

      <a
        href={`https://twitter.com/intent/tweet?text=${tweetText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.6)",
        }}
        aria-label="Share on X / Twitter"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post
      </a>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
        style={{
          background: copied ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)",
          border: copied
            ? "1px solid rgba(74,222,128,0.2)"
            : "1px solid rgba(255,255,255,0.08)",
          color: copied ? "rgba(74,222,128,0.9)" : "rgba(255,255,255,0.6)",
        }}
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
