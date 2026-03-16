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
    <main className="min-h-screen bg-[#0b1020] text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-[-8%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute right-[-6%] top-[18%] h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-8%] left-[18%] h-[340px] w-[340px] rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[10%] h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,24,40,0.35),rgba(11,16,32,0.9))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1020]/65 backdrop-blur-xl">
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
              Friendly freelance developer for businesses, founders, and growing
              brands
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-7xl">
              I build warm, modern websites and digital products that help
              businesses stand out and feel more human online.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
              I help businesses, startups, and founders turn ideas into polished
              websites and app experiences that feel clear, trustworthy, and
              easy to connect with.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="w-full text-sm text-white/45">
                Friendly, collaborative, and focused on creating work that feels
                as good as it looks.
              </div>
              <a
                href="#work"
                className="rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[0.98]"
              >
                See My Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/15"
              >
                Let’s Build Something
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl gap-5 sm:grid-cols-3">
              <div>
                <p className="text-3xl font-semibold tracking-tight text-fuchsia-300">
                  Fast
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Responsive builds that feel smooth, polished, and welcoming.
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-cyan-300">
                  Modern
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Clean layouts with personality, clarity, and a premium feel.
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight text-amber-300">
                  Scalable
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Built with enough structure to grow as your business grows.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-fuchsia-400/20 via-violet-400/10 to-cyan-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-fuchsia-950/30">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/30" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/10" />
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(21,24,43,0.95),rgba(13,17,31,0.95))] p-6">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-white/40">
                      Featured Build
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      Thoughtful Digital Experience
                    </h2>
                  </div>
                  <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                    Open to projects
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-fuchsia-300/10 bg-fuchsia-300/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      What clients need
                    </p>
                    <p className="mt-3 text-lg text-white/85">
                      Clear messaging, a warm visual identity, and a site that
                      makes people feel comfortable straight away.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-5">
                      <p className="text-sm text-white/40">Build Type</p>
                      <p className="mt-2 font-medium text-white/90">
                        Business Website
                      </p>
                    </div>
                    <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-5">
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
            Built for businesses that want something polished, personal, and
            memorable.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/[0.08] via-violet-400/[0.05] to-cyan-400/[0.08] p-7 transition hover:-translate-y-1 hover:from-fuchsia-400/[0.12] hover:to-cyan-400/[0.12]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-400/20 to-cyan-400/20 text-lg text-fuchsia-100">
                ✦
              </div>
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
              A few examples of the kinds of experiences I can create.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/50">
            These can be swapped for real screenshots, demos, and client work as
            your portfolio grows and evolves.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-violet-950/30 to-cyan-950/30"
            >
              <div className="flex h-56 items-end bg-gradient-to-br from-fuchsia-400/20 via-violet-400/10 to-cyan-400/20 p-6">
                <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
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
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/[0.08] via-slate-900/80 to-cyan-400/[0.08] p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Clean design, thoughtful detail, and a strong technical
              foundation.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-white/65 md:text-lg">
            <p>
              I create websites and app interfaces that balance visual quality
              with real usability. The goal is not just to make something look
              good, but to make it feel approachable, credible, and easy to use.
            </p>
            <p>
              Whether you need a personal brand site, a business website, or the
              first version of a product idea, I can help shape it into
              something polished, inviting, and ready to launch.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-20">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/[0.12] via-violet-400/[0.08] to-cyan-400/[0.12] p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Have a project in mind? Let’s build something people enjoy using.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Need a modern website, a landing page, or an app idea brought to
              life? Get in touch and let’s create something that feels right for
              your brand and your audience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:hello@mahirhamed.co.uk"
                className="rounded-full bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.98]"
              >
                Say Hello
              </a>
              <a
                href="https://github.com/"
                className="rounded-full border border-cyan-200/20 bg-slate-950/25 px-6 py-3 text-sm font-medium text-cyan-50 transition hover:bg-slate-950/40"
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
