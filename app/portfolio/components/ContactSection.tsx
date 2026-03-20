"use client";

import { useEffect, useState } from "react";
import type { SharedProps } from "../types";

type PackageTier = "starter" | "standard" | "premium";

const packages = [
  {
    tier: "starter" as PackageTier,
    name: "Starter",
    price: "From £250",
    note: "Initial payment to begin work",
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
    note: "Initial payment to begin work",
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
    note: "Initial payment to begin work",
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

const recommendationCopy: Record<
  PackageTier,
  { title: string; summary: string }
> = {
  starter: {
    title: "Starter looks like the best fit",
    summary:
      "Best for smaller scopes, focused launches, and quick delivery with a clearer path to getting live fast.",
  },
  standard: {
    title: "Standard looks like the best fit",
    summary:
      "Best for polished websites, stronger brand presence, and more complete digital experiences with room for refinement.",
  },
  premium: {
    title: "Premium looks like the best fit",
    summary:
      "Best for custom product UI, more advanced frontend work, and higher-touch collaboration across a bigger scope.",
  },
};

type BriefForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  projectType: string;
  goal: string;
  budget: string;
  timeline: string;
  urgency: string;
  description: string;
};

const initialForm: BriefForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  projectType: "",
  goal: "",
  budget: "",
  timeline: "",
  urgency: "",
  description: "",
};

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
      {children}
    </span>
  );
}

function InputWrap({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+()\-\s]/g, "");
}

function isValidPhone(phone: string) {
  const cleaned = phone.replace(/\s+/g, "");
  return cleaned.length >= 10;
}

export function ContactSection({
  isLight,
  themeClasses,
}: Pick<SharedProps, "isLight" | "themeClasses">) {
  const [loadingTier, setLoadingTier] = useState<PackageTier | null>(null);
  const [packageOpen, setPackageOpen] = useState(false);

  const [showBrief, setShowBrief] = useState(false);
  const [briefLoading, setBriefLoading] = useState(false);
  const [briefResult, setBriefResult] = useState<PackageTier | null>(null);
  const [leadScore, setLeadScore] = useState<number | null>(null);

  const [form, setForm] = useState<BriefForm>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [referralCode, setReferralCode] = useState<string>("");

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const markTouched = (key: keyof BriefForm) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const emailError =
    touched.email && !isValidEmail(form.email || "")
      ? "Enter a valid email address"
      : "";

  const phoneError =
    touched.phone && !isValidPhone(form.phone || "")
      ? "Enter a valid phone number"
      : "";

  const canSubmit =
    Boolean(form.name?.trim()) &&
    Boolean(form.email?.trim()) &&
    Boolean(form.phone?.trim()) &&
    Boolean(form.projectType?.trim()) &&
    Boolean(form.budget?.trim()) &&
    Boolean(form.timeline?.trim()) &&
    isValidEmail(form.email || "") &&
    isValidPhone(form.phone || "");

  useEffect(() => {
    if (!packageOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [packageOpen]);

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
        body: JSON.stringify({
          tier,
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          website: form.website,
          projectType: form.projectType,
          goal: form.goal,
          budget: form.budget,
          timeline: form.timeline,
          urgency: form.urgency,
          description: form.description,
          referral_code: referralCode,
        }),
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

  const handleBriefSubmit = async () => {
    try {
      setBriefLoading(true);
      setBriefResult(null);
      setLeadScore(null);

      const res = await fetch("/api/brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, referralCode }),
      });

      const text = await res.text();
      let data: any = null;

      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!res.ok) {
        console.error("Brief API error:", {
          status: res.status,
          raw: text,
          parsed: data,
        });

        alert(data?.error || `Brief failed (${res.status})`);
        return;
      }

      if (
        data?.recommendedPackage !== "starter" &&
        data?.recommendedPackage !== "standard" &&
        data?.recommendedPackage !== "premium"
      ) {
        alert("Could not generate a recommendation.");
        return;
      }

      setBriefResult(data.recommendedPackage);
      setLeadScore(typeof data?.leadScore === "number" ? data.leadScore : null);
    } catch (error) {
      console.error("Brief submission error:", error);
      alert("Sorry, something went wrong generating your recommendation.");
    } finally {
      setBriefLoading(false);
    }
  };

  const handleRecommendedCheckout = () => {
    if (!briefResult) return;
    void handleCheckout(briefResult);
  };

  const updateField = <K extends keyof BriefForm>(
    key: K,
    value: BriefForm[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const inputBase = isLight
    ? "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
    : "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/25";

  const inputWithIcon = `${inputBase} pl-12`;

  const errorClass = isLight
    ? "border-rose-300 focus:border-rose-400"
    : "border-rose-400/40 focus:border-rose-400";

  const helperCard = isLight
    ? "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
    : "rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70";

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
                ? "relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-fuchsia-100 via-violet-50 to-cyan-100 p-6 md:p-10"
                : "relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_32%),linear-gradient(135deg,rgba(91,33,182,0.24),rgba(15,23,42,0.88)_55%,rgba(8,47,73,0.78))] p-6 md:p-10"
            }
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="max-w-4xl">
                <p
                  className={`text-sm uppercase tracking-[0.28em] ${themeClasses.label}`}
                >
                  Contact
                </p>

                <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  Let’s turn your next website or product UI into something more
                  polished, memorable, and ready to ship.
                </h2>

                <p
                  className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${themeClasses.muted}`}
                >
                  Share a few details about what you’re building and I’ll point
                  you toward the package that fits best, then you can move
                  straight into the next step.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowBrief((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(168,85,247,0.25)] transition-all duration-300 hover:scale-[0.98]"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h10"
                    />
                  </svg>
                  <span>
                    {showBrief ? "Hide project brief" : "Start your project"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCalendly}
                  className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isLight
                      ? "bg-white/80 text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                      : "border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-400/20 via-violet-400/20 to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
                  <svg
                    className="relative h-4 w-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="relative">Book a call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPackageOpen(true)}
                  className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isLight
                      ? "bg-white/80 text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                      : "border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-400/20 via-violet-400/20 to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
                  <svg
                    className="relative h-4 w-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h10.5"
                    />
                  </svg>
                  <span className="relative">View packages</span>
                </button>

                <a
                  href="mailto:mahirahmed691@gmail.com"
                  className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isLight
                      ? "bg-white/80 text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                      : "border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-400/20 via-violet-400/20 to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
                  <svg
                    className="relative h-4 w-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0l-9.75 6.5-9.75-6.5m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75"
                    />
                  </svg>
                  <span className="relative">mahirahmed691@gmail.com</span>
                </a>

                <a
                  href="https://github.com/mahirahmed691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isLight
                      ? "bg-white/80 text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                      : "border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-400/20 via-violet-400/20 to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
                  <svg
                    className="relative h-4 w-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.59 2 12.253c0 4.53 2.865 8.374 6.839 9.73.5.094.683-.221.683-.49 0-.242-.009-.884-.014-1.734-2.782.615-3.369-1.37-3.369-1.37-.455-1.18-1.11-1.494-1.11-1.494-.908-.636.069-.623.069-.623 1.004.072 1.532 1.053 1.532 1.053.892 1.566 2.341 1.114 2.91.852.091-.664.349-1.114.635-1.37-2.221-.259-4.555-1.137-4.555-5.062 0-1.118.389-2.033 1.029-2.75-.103-.26-.446-1.306.098-2.723 0 0 .84-.276 2.75 1.05A9.303 9.303 0 0112 6.844c.85.004 1.705.118 2.504.346 1.909-1.326 2.748-1.05 2.748-1.05.546 1.417.202 2.463.1 2.723.64.717 1.028 1.632 1.028 2.75 0 3.935-2.337 4.8-4.566 5.055.359.317.678.942.678 1.898 0 1.37-.012 2.475-.012 2.812 0 .271.18.588.688.488C19.138 20.623 22 16.78 22 12.253 22 6.59 17.523 2 12 2z" />
                  </svg>
                  <span className="relative">GitHub profile</span>
                </a>
              </div>

              {showBrief && (
                <div
                  className={
                    isLight
                      ? "mt-8 max-w-5xl rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-6"
                      : "mt-8 max-w-5xl rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:p-6"
                  }
                >
                  <div className={`${helperCard} md:flex md:items-center`}>
                    Higher budgets, tighter timelines, and clearer goals help me
                    recommend the strongest starting point faster.
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <InputWrap>
                      <FieldIcon>
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                          />
                        </svg>
                      </FieldIcon>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name || ""}
                        onChange={(e) => updateField("name", e.target.value)}
                        onBlur={() => markTouched("name")}
                        className={inputWithIcon}
                      />
                    </InputWrap>

                    <div>
                      <InputWrap>
                        <FieldIcon>
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0l-9.75 6.5-9.75-6.5"
                            />
                          </svg>
                        </FieldIcon>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={form.email || ""}
                          onChange={(e) => updateField("email", e.target.value)}
                          onBlur={() => markTouched("email")}
                          className={`${inputWithIcon} ${emailError ? errorClass : ""}`}
                        />
                      </InputWrap>
                      {emailError && (
                        <p className="mt-2 text-xs text-rose-400">
                          {emailError}
                        </p>
                      )}
                    </div>

                    <div>
                      <InputWrap>
                        <FieldIcon>
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L7.091 3.102A1.125 1.125 0 005.999 2.25H4.627A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                          </svg>
                        </FieldIcon>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone || ""}
                          onChange={(e) =>
                            updateField("phone", normalizePhone(e.target.value))
                          }
                          onBlur={() => markTouched("phone")}
                          className={`${inputWithIcon} ${phoneError ? errorClass : ""}`}
                        />
                      </InputWrap>
                      {phoneError && (
                        <p className="mt-2 text-xs text-rose-400">
                          {phoneError}
                        </p>
                      )}
                    </div>

                    <InputWrap>
                      <FieldIcon>
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 21h16.5M4.5 3h15a.75.75 0 01.75.75v16.5H3.75V3.75A.75.75 0 014.5 3zm3 4.5h9m-9 3h9m-9 3h6"
                          />
                        </svg>
                      </FieldIcon>
                      <input
                        type="text"
                        placeholder="Company / brand"
                        value={form.company || ""}
                        onChange={(e) => updateField("company", e.target.value)}
                        className={inputWithIcon}
                      />
                    </InputWrap>

                    <div className="md:col-span-2">
                      <InputWrap>
                        <FieldIcon>
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.25 0 4.5-4.03 4.5-9S14.25 3 12 3m0 18c-2.25 0-4.5-4.03-4.5-9S9.75 3 12 3m-9 9h18"
                            />
                          </svg>
                        </FieldIcon>
                        <input
                          type="url"
                          placeholder="Website (optional)"
                          value={form.website || ""}
                          onChange={(e) =>
                            updateField("website", e.target.value)
                          }
                          className={inputWithIcon}
                        />
                      </InputWrap>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <select
                      value={form.projectType || ""}
                      onChange={(e) =>
                        updateField("projectType", e.target.value)
                      }
                      className={inputBase}
                    >
                      <option value="">Project type</option>
                      <option value="landing">Landing page</option>
                      <option value="website">Business / brand website</option>
                      <option value="portfolio">Portfolio site</option>
                      <option value="product">Product / app UI</option>
                    </select>

                    <select
                      value={form.goal || ""}
                      onChange={(e) => updateField("goal", e.target.value)}
                      className={inputBase}
                    >
                      <option value="">Primary goal</option>
                      <option value="Launch">Launch something new</option>
                      <option value="Redesign">Redesign existing</option>
                      <option value="Conversions">Improve conversions</option>
                      <option value="MVP">Build an MVP</option>
                    </select>

                    <select
                      value={form.budget || ""}
                      onChange={(e) => updateField("budget", e.target.value)}
                      className={inputBase}
                    >
                      <option value="">Budget</option>
                      <option value="0-500">£0–£500</option>
                      <option value="500-1000">£500–£1000</option>
                      <option value="1000+">£1000+</option>
                    </select>

                    <select
                      value={form.timeline || ""}
                      onChange={(e) => updateField("timeline", e.target.value)}
                      className={inputBase}
                    >
                      <option value="">Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="2-4 weeks">2–4 weeks</option>
                      <option value="1-2 months">1–2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>

                    <select
                      value={form.urgency || ""}
                      onChange={(e) => updateField("urgency", e.target.value)}
                      className={inputBase}
                    >
                      <option value="">Urgency</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>

                    <div className={helperCard}>
                      Higher budgets, tighter timelines, and clearer goals help
                      me recommend the strongest starting point faster.
                    </div>
                  </div>

                  <textarea
                    placeholder="Describe the project, what success looks like, and anything important I should know..."
                    value={form.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                    className={`${inputBase} mt-4 min-h-[140px] resize-none`}
                  />

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleBriefSubmit}
                      disabled={briefLoading || !canSubmit}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {briefLoading ? "Analysing..." : "Get recommendation"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialForm);
                        setBriefResult(null);
                        setLeadScore(null);
                      }}
                      className={
                        isLight
                          ? "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900"
                          : "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white"
                      }
                    >
                      Reset
                    </button>
                  </div>

                  {briefResult && (
                    <div
                      className={
                        isLight
                          ? "mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5"
                          : "mt-5 rounded-[1.25rem] border border-white/10 bg-black/10 p-5"
                      }
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p
                            className={`text-xs uppercase tracking-[0.22em] ${themeClasses.label}`}
                          >
                            Recommendation
                          </p>

                          <h4 className="mt-2 text-xl font-semibold">
                            {recommendationCopy[briefResult].title}
                          </h4>

                          {leadScore !== null && (
                            <p
                              className={`mt-2 text-sm ${themeClasses.subtle}`}
                            >
                              Lead score: {leadScore}/8
                            </p>
                          )}
                        </div>
                      </div>

                      <p
                        className={`mt-3 text-sm leading-7 ${themeClasses.muted}`}
                      >
                        {recommendationCopy[briefResult].summary}
                      </p>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={handleRecommendedCheckout}
                          disabled={loadingTier !== null}
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {loadingTier === briefResult
                            ? "Redirecting..."
                            : "Continue"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPackageOpen(true)}
                          className={
                            isLight
                              ? "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900"
                              : "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white"
                          }
                        >
                          Compare all packages
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div
                className={
                  isLight
                    ? "mt-8 grid gap-3 rounded-[1.5rem] border border-slate-200 bg-white/70 p-4 sm:grid-cols-3"
                    : "mt-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/10 p-4 backdrop-blur-sm sm:grid-cols-3"
                }
              >
                {[
                  "Frontend craft with production-ready thinking",
                  "Fast, polished, responsive delivery",
                  "Clear communication from direction to launch",
                ].map((item) => (
                  <div
                    key={item}
                    className={
                      isLight
                        ? "rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700"
                        : "rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {packageOpen && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm">
          <div className="hidden h-full items-center justify-center px-4 py-6 md:flex">
            <div
              className={
                isLight
                  ? "w-full max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.12)]"
                  : "w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#0b1422]/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
              }
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p
                    className={`text-sm uppercase tracking-[0.25em] ${themeClasses.label}`}
                  >
                    Packages
                  </p>
                  <h3 className="mt-2 text-5xl font-semibold">
                    Choose your starting point
                  </h3>
                  <p className={`mt-4 text-sm leading-7 ${themeClasses.muted}`}>
                    Pick the package that best fits your project. Final scope
                    and total pricing can be refined after the initial
                    discussion.
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

              <div className="grid gap-4 md:grid-cols-3">
                {packages.map((pkg) => {
                  const isFeatured = pkg.tier === "standard";

                  return (
                    <div
                      key={pkg.tier}
                      className={`relative flex flex-col rounded-[2rem] p-6 ${
                        isFeatured
                          ? isLight
                            ? "scale-[1.01] border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-violet-50 to-cyan-50 shadow-[0_20px_80px_rgba(139,92,246,0.16)]"
                            : "scale-[1.01] border border-white/20 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 shadow-[0_20px_80px_rgba(139,92,246,0.25)]"
                          : `${themeClasses.sectionShell}`
                      }`}
                    >
                      {isFeatured && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-4 py-1 text-xs font-semibold text-slate-950">
                          Most popular
                        </div>
                      )}

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

                      <div className="mt-5">
                        <p
                          className={`text-xs uppercase tracking-[0.2em] ${themeClasses.label}`}
                        >
                          Best for
                        </p>
                        <p className="mt-2 text-sm font-medium">
                          {pkg.bestFor}
                        </p>
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
                        } ${
                          loadingTier !== null
                            ? "cursor-not-allowed opacity-60"
                            : ""
                        }`}
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

          <div className="md:hidden">
            <div
              className={
                isLight
                  ? "fixed inset-x-0 bottom-0 top-[8%] rounded-t-[2rem] border-t border-slate-200 bg-white shadow-[0_-20px_80px_rgba(0,0,0,0.16)]"
                  : "fixed inset-x-0 bottom-0 top-[8%] rounded-t-[2rem] border-t border-white/10 bg-[#0b1422]/98 shadow-[0_-20px_80px_rgba(0,0,0,0.5)]"
              }
            >
              <div className="flex h-full flex-col">
                <div
                  className={`shrink-0 rounded-t-[2rem] px-5 pb-4 pt-4 ${
                    isLight ? "bg-white" : "bg-[#0b1422]/98"
                  }`}
                >
                  <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p
                        className={`text-xs uppercase tracking-[0.25em] ${themeClasses.label}`}
                      >
                        Packages
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold leading-tight">
                        Choose your package
                      </h3>
                      <p
                        className={`mt-2 text-sm leading-6 ${themeClasses.muted}`}
                      >
                        Swipe to compare options and start the right project.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPackageOpen(false)}
                      className={
                        isLight
                          ? "shrink-0 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100"
                          : "shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="h-full overflow-x-auto overflow-y-hidden px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex h-full snap-x snap-mandatory gap-4 pr-5">
                      {packages.map((pkg) => {
                        const isFeatured = pkg.tier === "standard";

                        return (
                          <div
                            key={pkg.tier}
                            className={`w-[84vw] shrink-0 snap-start self-start rounded-[2rem] p-6 ${
                              isFeatured
                                ? isLight
                                  ? "border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-violet-50 to-cyan-50 shadow-[0_20px_80px_rgba(139,92,246,0.16)]"
                                  : "border border-white/20 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 shadow-[0_20px_80px_rgba(139,92,246,0.25)]"
                                : `${themeClasses.sectionShell}`
                            }`}
                          >
                            {isFeatured && (
                              <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-4 py-1 text-xs font-semibold text-slate-950">
                                Most popular
                              </div>
                            )}

                            <p
                              className={`text-sm uppercase tracking-[0.22em] ${themeClasses.label}`}
                            >
                              {pkg.name}
                            </p>

                            <h4 className="mt-3 text-3xl font-semibold">
                              {pkg.price}
                            </h4>

                            <p
                              className={`mt-2 text-xs ${themeClasses.subtle}`}
                            >
                              {pkg.note}
                            </p>

                            <p
                              className={`mt-4 text-sm leading-7 ${themeClasses.muted}`}
                            >
                              {pkg.description}
                            </p>

                            <div className="mt-5">
                              <p
                                className={`text-xs uppercase tracking-[0.2em] ${themeClasses.label}`}
                              >
                                Best for
                              </p>
                              <p className="mt-2 text-sm font-medium">
                                {pkg.bestFor}
                              </p>
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
                              className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                                isFeatured
                                  ? "bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 text-slate-950 shadow-lg"
                                  : isLight
                                    ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                              } ${
                                loadingTier !== null
                                  ? "cursor-not-allowed opacity-60"
                                  : ""
                              }`}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
