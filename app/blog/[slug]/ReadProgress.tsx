"use client";

import { useEffect } from "react";

export function ReadProgress({ title }: { title: string }) {
  useEffect(() => {
    const originalTitle = document.title;

    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);
      document.title = pct > 2 ? `(${pct}%) ${title}` : originalTitle;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.title = originalTitle;
    };
  }, [title]);

  return null;
}
