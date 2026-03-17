"use client";

import { useState } from "react";
import type { SharedProps } from "../types";

type PackageTier = "starter" | "standard" | "premium";

const packages = [
  {
    tier: "starter" as PackageTier,
    name: "Starter",
    price: "From £250",
    note: "Initial deposit to begin work",
    description:
      "A focused option for simple landing pages, smaller sites, and lighter design refreshes.",
    bestFor: "Quick launches and simple websites",
    includes: [
      "Single-page or smaller scope",
      "Responsive frontend build",
      "Fast turnaround",
    ],
  },
  {
    tier: "standard" as PackageTier,
    name: "Standard",
    price: "From £500",
    note: "Initial deposit to begin work",
    description:
      "A stronger fit for polished business websites, portfolios, and more complete branded web experiences.",
    bestFor: "Serious brands and polished web presence",
    includes: [
      "Multi-section website",
      "Stronger visual direction",
      "Responsive frontend build",
    ],
  },
  {
    tier: "premium" as PackageTier,
    name: "Premium",
    price: "From £1000",
    note: "Initial deposit to begin work",
    description:
      "A higher-touch package for custom product UI, premium frontend work, and larger scoped builds.",
    bestFor: "Custom products and high-end builds",
    includes: [
      "Custom UI direction",
      "Advanced frontend work",
      "Higher-touch collaboration",
    ],
  },
];

export function ContactSection({
  isLight,
  themeClasses,
}: Pick<SharedProps, "isLight" | "themeClasses">) {
  const [loadingTier, setLoadingTier] = useState<PackageTier | null>(null);
  const [packageOpen, setPackageOpen] = useState(false);

  const handleCalendly = () => {
    const calendlyUrl = "https://calendly.com/mahirahmed691";

    if (typeof window !== "undefined" && (window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: calendlyUrl,
      });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCheckout = async (tier: PackageTier) => {
    try {
      setLoadingTier(tier);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Stripe API error:", data);
        alert(data?.error || `Checkout failed (${res.status})`);
        return;
      }

      if (!data?.url) {
        console.error("Stripe checkout missing URL:", data);
        alert("Checkout failed: missing redirect URL.");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Sorry, something went wrong starting checkout.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <>
      <section
        id="contact"
        className={`mx-auto mt-6 max-w-7xl ${themeClasses.shell}`}
      >
        <div className="px-4 pb-24 pt-16 sm:px-6 sm:pt-20 md:p-12">
          <div
            className={
              isLight
                ? "overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-fuchsia-100 via-violet-50 to-cyan-100 p-8 md:p-12"
                : "overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/[0.12] via-violet-400/[0.08] to-cyan-400/[0.12] p-8 md:p-12"
            }
          >
            <div className="max-w-3xl">
              <p
                className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
              >
                Contact
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                If you want your portfolio, business site, or product UI to feel
                stronger, let’s talk.
              </h2>

              <p
                className={`mt-6 max-w-2xl text-lg leading-8 ${themeClasses.muted}`}
              >
                I can help you shape a cleaner visual direction, improve your
                page structure, and turn rough ideas into something polished
                enough to launch confidently.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleCalendly}
                  className="rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.98]"
                >
                  Book a call
                </button>

                <button
                  type="button"
                  onClick={() => setPackageOpen(true)}
                  className={
                    isLight
                      ? "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                      : "rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  }
                >
                  Choose a package
                </button>

                <a
                  href="mailto:hello@mahirahmed.co.uk"
                  className={
                    isLight
                      ? "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                      : "rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  }
                >
                  hello@mahirahmed.co.uk
                </a>

                <a
                  href="https://github.com/mahirahmed691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isLight
                      ? "rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                      : "rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  }
                >
                  GitHub profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {packageOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md">
          <div
            className={
              isLight
                ? "w-full max-w-6xl rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_40px_120px_rgba(0,0,0,0.12)] md:p-10"
                : "w-full max-w-6xl rounded-[2.5rem] border border-white/10 bg-[#0b1422]/90 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:p-10"
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
                >
                  Packages
                </p>

                <h3 className="mt-2 text-3xl font-semibold md:text-5xl">
                  Choose your starting point
                </h3>

                <p
                  className={`mt-4 max-w-2xl text-sm leading-7 ${themeClasses.muted}`}
                >
                  Choose the package that best fits your project. Final scope
                  and total pricing can be refined after the initial discussion.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPackageOpen(false)}
                className={
                  isLight
                    ? "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100"
                    : "rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                }
              >
                Close
              </button>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {packages.map((pkg) => {
                const isFeatured = pkg.tier === "standard";

                return (
                  <div
                    key={pkg.tier}
                    className={`relative flex flex-col rounded-[2rem] p-6 transition-all duration-300 ${
                      isFeatured
                        ? isLight
                          ? "scale-[1.03] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-violet-50 to-cyan-50 shadow-[0_20px_80px_rgba(139,92,246,0.16)]"
                          : "scale-[1.03] border border-white/20 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 shadow-[0_20px_80px_rgba(139,92,246,0.25)]"
                        : `${themeClasses.sectionShell}`
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-4 py-1 text-xs font-semibold text-slate-950">
                        Most popular
                      </div>
                    )}

                    <div>
                      <p
                        className={`text-sm uppercase tracking-[0.22em] ${themeClasses.label}`}
                      >
                        {pkg.name}
                      </p>

                      <h4 className="mt-3 text-3xl font-semibold">
                        {pkg.price}
                      </h4>

                      <p className={`mt-2 text-xs ${themeClasses.subtle}`}>
                        {pkg.note}
                      </p>

                      <p
                        className={`mt-4 text-sm leading-7 ${themeClasses.muted}`}
                      >
                        {pkg.description}
                      </p>
                    </div>

                    <div className="mt-5">
                      <p
                        className={`text-xs uppercase tracking-[0.2em] ${themeClasses.label}`}
                      >
                        Best for
                      </p>
                      <p className="mt-2 text-sm font-medium">{pkg.bestFor}</p>
                    </div>

                    <div className="mt-6 space-y-2">
                      {pkg.includes.map((item) => (
                        <div
                          key={item}
                          className={
                            isLight
                              ? "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                              : "rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80"
                          }
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCheckout(pkg.tier)}
                      disabled={loadingTier !== null}
                      className={`mt-6 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                        isFeatured
                          ? "bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 text-slate-950 shadow-lg hover:scale-[0.97]"
                          : isLight
                            ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                            : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      } ${loadingTier !== null ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      {loadingTier === pkg.tier
                        ? "Redirecting..."
                        : "Start project"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
