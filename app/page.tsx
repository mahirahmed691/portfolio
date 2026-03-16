export default function Home() {
  const services = [
    {
      title: "Web Development",
      description:
        "High-converting business websites, landing pages, and custom builds designed to look premium and perform properly on every device.",
    },
    {
      title: "App Development",
      description:
        "Modern web apps and product interfaces built for startups, service businesses, and founders who need something clean and usable.",
    },
    {
      title: "Ongoing Support",
      description:
        "Maintenance, improvements, fixes, and iterative development to keep your product sharp after launch.",
    },
  ];

  const projects = [
    {
      name: "HomeHive",
      category: "Inventory & Task App",
      description:
        "A smart inventory experience with scheduling, reminders, categories, and a mobile-first interface.",
    },
    {
      name: "Service Business Site",
      category: "Lead Generation Website",
      description:
        "A polished marketing site focused on trust, clear calls to action, and conversion-friendly structure.",
    },
    {
      name: "Product Launch Page",
      category: "Startup Landing Page",
      description:
        "A modern product page designed to explain value quickly and drive enquiries or signups.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="text-base font-semibold tracking-[0.2em] text-white/90 uppercase"
          >
            Mahir Ahmed
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#work" className="transition hover:text-white">
              Work
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
          >
            Let’s Talk
          </a>
        </div>
      </header>

      <section
        id="home"
        className="mx-auto max-w-7xl px-6 pb-20 pt-24 md:pb-28 md:pt-32"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              Freelance Web Developer & App Builder
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-7xl">
              I build sleek websites and digital products that make businesses
              look serious online.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
              I help businesses, startups, and founders launch modern websites
              and app experiences with clean design, strong structure, and a
              polished user experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[0.98]"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Start a Project
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl gap-5 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold tracking-tight">Fast</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Responsive builds with a strong visual finish.
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">Modern</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Minimal, premium layouts that feel current.
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  Scalable
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Built to grow beyond a one-page brochure site.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/40">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/30" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/10" />
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-6">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/40">
                      Featured Build
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      Premium Portfolio Experience
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Available for work
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      What clients need
                    </p>
                    <p className="mt-3 text-lg text-white/85">
                      Clear messaging, a premium look, and a site that feels
                      trustworthy from the first second.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                      <p className="text-sm text-white/40">Build Type</p>
                      <p className="mt-2 font-medium text-white/90">
                        Business Website
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
                      <p className="text-sm text-white/40">Focus</p>
                      <p className="mt-2 font-medium text-white/90">
                        Design + Conversion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Built for businesses that need more than a generic template.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <div className="mb-6 h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />
              <h3 className="text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              Selected Work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              A few examples of the type of work I can create.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/50">
            These can be replaced with real screenshots, demos, and client work
            as your portfolio grows.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="flex h-56 items-end bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent p-6">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  0{index + 1}
                </span>
              </div>
              <div className="p-7">
                <p className="text-sm uppercase tracking-[0.18em] text-white/35">
                  {project.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{project.name}</h3>
                <p className="mt-4 text-base leading-7 text-white/60">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Clean design, practical builds, and a strong technical foundation.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-white/65 md:text-lg">
            <p>
              I create websites and app interfaces that balance aesthetics with
              real usability. The goal is not just to make something look good,
              but to make it feel credible, modern, and easy to use.
            </p>
            <p>
              Whether you need a personal brand site, a business website, or the
              first version of a product idea, I can help shape it into
              something polished and launch-ready.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-20">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Have a project in mind? Let’s build something sharp.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Need a modern website, a landing page, or an app concept turned
              into something real? Get in touch and let’s discuss what you need.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:hello@mahirhamed.co.uk"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[0.98]"
              >
                Email Me
              </a>
              <a
                href="https://github.com/"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
