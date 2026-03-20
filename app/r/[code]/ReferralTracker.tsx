"use client";

import { useEffect } from "react";

export function ReferralTracker({ code }: { code: string }) {
  useEffect(() => {
    fetch("/api/referral-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }).catch(() => {
      // Silent fail — tracking is best-effort
    });
  }, [code]);

  return null;
}
