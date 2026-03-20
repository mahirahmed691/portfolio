"use client";

import { useEffect } from "react";
import { PortfolioPage } from "./portfolio/PortfolioPage";

export default function Page() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!ref) return;

    fetch("/api/referral-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: ref }),
    });
  }, []);

  return <PortfolioPage />;
}
