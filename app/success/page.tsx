export default function SuccessPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070d1a] px-6 py-24 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.1),transparent_65%)]" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(167,139,250,0.2),rgba(232,121,249,0.1))] shadow-[0_0_40px_rgba(167,139,250,0.25)]">
          <svg
            className="h-7 w-7 text-violet-300"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Label */}
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/35">
          Payment confirmed
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Deposit{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            received
          </span>
        </h1>

        {/* Body */}
        <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-white/50">
          Your payment went through. I&apos;ll be in touch shortly to confirm
          the next steps and kick off your project.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* What happens next */}
        <div className="mt-10 space-y-4 text-left">
          {[
            { step: "01", text: "You'll receive a confirmation email within a few minutes." },
            { step: "02", text: "I'll review your brief and reach out within 1 business day." },
            { step: "03", text: "We'll schedule a kickoff call to align on goals and timeline." },
          ].map(({ step, text }) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4"
            >
              <span className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums tracking-widest text-white/25">
                {step}
              </span>
              <p className="text-sm leading-6 text-white/60">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to site
        </a>
      </div>
    </main>
  );
}
