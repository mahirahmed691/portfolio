import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ReferralTracker } from "./ReferralTracker";

type Referral = {
  id: string;
  name: string;
  code: string;
  commission: string;
  active: boolean;
};

async function getReferral(code: string): Promise<Referral | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase
    .from("referrals")
    .select("id, name, code, commission, active")
    .eq("code", code)
    .eq("active", true)
    .single();

  return data ?? null;
}

export default async function ReferralPage({
  params,
}: {
  params: { code: string };
}) {
  const referral = await getReferral(params.code);

  if (!referral) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#070d1a" }}
      >
        <div className="text-center px-6">
          <p className="text-white/40 text-sm mb-6">
            This referral link is invalid or no longer active.
          </p>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-white/[0.08] px-6 text-sm font-medium text-white/75 transition-all hover:bg-white/[0.13] hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#070d1a", color: "white" }}
    >
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(232,121,249,0.10) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-[100px]"
          style={{ background: "rgba(34,211,238,0.06)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Track the click */}
      <ReferralTracker code={params.code} />

      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-32">
        {/* Referrer badge */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "#6ee7b7" }}
            />
            <span className="text-white/60">You were referred by</span>
            <span className="font-semibold text-white">{referral.name}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center">
          <div
            className="mb-5 inline-flex rounded-full px-4 py-2 text-xs tracking-[0.18em] uppercase"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Creative developer for founders &amp; brands
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.92] tracking-[-0.06em]">
            Premium websites{" "}
            <span className="bg-gradient-to-r from-rose-300 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              for founders
            </span>{" "}
            and brands
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg leading-7 text-white/50">
            I build digital identities that feel bold, premium, and
            unmistakably personal — turning rough ideas into web experiences
            your clients will actually remember.
          </p>

          {/* Value props */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
            {[
              {
                title: "Fast turnaround",
                desc: "Most projects delivered in 1–2 weeks",
              },
              {
                title: "Conversion-first",
                desc: "Built to turn visitors into enquiries",
              },
              {
                title: "Done-for-you",
                desc: "Design, development, and launch included",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-sm font-semibold text-white mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-white/40 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`/?ref=${params.code}#contact`}
              className="inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-semibold text-[#070d1a] transition hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #f9a8d4, #e879f9, #67e8f9)",
              }}
            >
              Work with me →
            </a>
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-medium text-white/60 transition hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              View portfolio
            </a>
          </div>

          {/* Social proof nudge */}
          <p className="mt-8 text-xs text-white/30">
            Trusted by founders and growing brands — starting from £500
          </p>
        </div>
      </div>
    </div>
  );
}
