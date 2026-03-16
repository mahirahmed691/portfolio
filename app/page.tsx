"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [menuOpen]);
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
      name: "Sweet Dezire",
      category: "Dessert Brand Website",
      description:
        "A dessert-inspired business concept with a warm, indulgent visual style, colourful branding, and a layout designed to make the menu and ordering experience feel irresistible.",
    },
    {
      name: "HomeHive",
      category: "Inventory & Task App",
      description:
        "A smart inventory experience with scheduling, reminders, categories, and a mobile-first interface.",
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
        <motion.div
          animate={
            isMobile ? { opacity: 0.18 } : { y: [0, 20, 0], x: [0, 10, 0] }
          }
          transition={
            isMobile
              ? { duration: 0 }
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute left-[-22%] top-[-12%] h-[240px] w-[240px] rounded-full bg-fuchsia-500/25 blur-3xl md:left-[-8%] md:top-[-8%] md:h-[420px] md:w-[420px]"
        />
        <motion.div
          animate={
            isMobile ? { opacity: 0.14 } : { y: [0, -18, 0], x: [0, -12, 0] }
          }
          transition={
            isMobile
              ? { duration: 0 }
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute right-[-18%] top-[12%] h-[220px] w-[220px] rounded-full bg-cyan-400/20 blur-3xl md:right-[-6%] md:top-[18%] md:h-[360px] md:w-[360px]"
        />
        <motion.div
          animate={
            isMobile ? { opacity: 0.12 } : { y: [0, 16, 0], x: [0, -8, 0] }
          }
          transition={
            isMobile
              ? { duration: 0 }
              : { duration: 14, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute bottom-[-6%] left-[6%] h-[200px] w-[200px] rounded-full bg-amber-400/15 blur-3xl md:bottom-[-8%] md:left-[18%] md:h-[340px] md:w-[340px]"
        />
        <motion.div
          animate={
            isMobile ? { opacity: 0.14 } : { y: [0, -22, 0], x: [0, 14, 0] }
          }
          transition={
            isMobile
              ? { duration: 0 }
              : { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute bottom-[-8%] right-[-12%] h-[240px] w-[240px] rounded-full bg-violet-500/20 blur-3xl md:bottom-[-10%] md:right-[10%] md:h-[420px] md:w-[420px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,24,40,0.35),rgba(11,16,32,0.9))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1020]/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <a
            href="#home"
            className="text-sm font-semibold tracking-[0.18em] text-white/90 uppercase sm:text-base"
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

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-white/15 px-3 py-2 text-xs text-white/90 transition hover:bg-white/10 sm:px-4 sm:text-sm md:inline-flex"
            >
              Let’s Talk
            </a>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white transition duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-white transition duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-white transition duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={
            menuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden border-t border-white/10 md:hidden"
        >
          <div className="space-y-2 px-4 py-4 sm:px-6">
            {[
              { label: "Services", href: "#services" },
              { label: "Work", href: "#work" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Let’s Talk
            </a>
          </div>
        </motion.div>
      </header>

      <section
        id="home"
        className="mx-auto max-w-7xl px-4 pb-16 pt-16 overflow-hidden sm:px-6 sm:pb-20 sm:pt-20 md:pb-28 md:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid items-center gap-10 md:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <div>
            <div className="mb-5 inline-flex max-w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur sm:px-4 sm:text-sm">
              Friendly freelance developer for businesses, founders, and growing
              brands
            </div>

            <h1 className="max-w-5xl text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-5xl md:text-7xl lg:text-[5.6rem]">
              I create{" "}
              <span className="bg-gradient-to-r from-rose-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                bold, high-impact
              </span>{" "}
              websites and product experiences that people remember.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:mt-8 sm:text-lg sm:leading-8 md:text-[1.35rem]">
              I help businesses turn ideas into polished digital experiences
              with stronger visual identity, cleaner user journeys, and a
              premium feel from the very first click.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#work"
                className="rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[0.98] sm:px-6"
              >
                Explore My Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-center text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/15 sm:px-6"
              >
                Start Your Project
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/55 sm:mt-10 sm:gap-3 sm:text-xs sm:tracking-[0.22em]">
              {[
                "Web Design",
                "App UI",
                "Brand-Led Builds",
                "Motion",
                "Frontend",
              ].map((item) => (
                <motion.span
                  key={item}
                  whileHover={
                    isMobile ? {} : { y: -4, scale: 1.06, rotate: [-1, 1, 0] }
                  }
                  className="rounded-full border border-white/10 bg-gradient-to-r from-rose-200/20 to-amber-200/20 px-3 py-1 text-[0.62rem] font-medium text-rose-50 shadow-lg shadow-rose-950/10 sm:text-xs"
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <div className="mt-10 grid max-w-2xl gap-5 sm:mt-12 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-fuchsia-300 sm:text-3xl">
                  Fast
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Responsive builds that feel smooth, polished, and welcoming.
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-cyan-300 sm:text-3xl">
                  Distinct
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Design with character, not another forgettable template.
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-amber-300 sm:text-3xl">
                  Scalable
                </p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Built with enough structure to grow as your business grows.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none perspective-[1600px]"
          >
            <motion.div
              animate={
                isMobile
                  ? { opacity: 0.9 }
                  : { rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }
              }
              transition={
                isMobile
                  ? { duration: 0 }
                  : { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }
              className="absolute -inset-5 rounded-[2.2rem] bg-gradient-to-br from-fuchsia-400/25 via-violet-400/15 to-cyan-400/25 blur-2xl"
            />

            <motion.div
              whileHover={isMobile ? {} : { rotateX: 5, rotateY: -7, y: -6 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-fuchsia-950/30 sm:rounded-[2rem] sm:p-5"
            >
              <div className="absolute right-3 top-3 h-20 w-20 rounded-full bg-gradient-to-br from-pink-300/20 to-amber-200/10 blur-2xl sm:right-5 sm:top-5 sm:h-28 sm:w-28" />
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/30" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/10" />
              </div>

              <div className="rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(35,18,34,0.96),rgba(16,18,34,0.96))] p-4 sm:rounded-[1.5rem] sm:p-6">
                <div className="mb-4 flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.52rem] uppercase tracking-[0.18em] text-white/55 sm:gap-3 sm:px-4 sm:text-[0.68rem] sm:tracking-[0.24em]">
                  <motion.div
                    animate={isMobile ? { opacity: 1 } : { x: ["0%", "100%"] }}
                    transition={
                      isMobile
                        ? { duration: 0 }
                        : { duration: 2.4, repeat: Infinity, ease: "linear" }
                    }
                    className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]"
                  />
                  <span>Now crafting bold brand-led experiences</span>
                </div>

                <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-rose-100/50">
                      Featured Build
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-white sm:mt-3 sm:text-2xl">
                      Sweet Dezire
                    </h2>
                  </div>
                  <div className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs text-amber-100">
                    Dessert brand concept
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="overflow-hidden rounded-[1.1rem] border border-rose-200/10 bg-gradient-to-br from-rose-300/10 via-pink-300/10 to-amber-200/10 p-4 sm:rounded-[1.4rem] sm:p-5"
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    {["Waffles", "Brownies", "Milkshakes", "Cookie Dough"].map(
                      (item) => (
                        <motion.span
                          key={item}
                          whileHover={
                            isMobile
                              ? {}
                              : { y: -4, scale: 1.06, rotate: [-1, 1, 0] }
                          }
                          className="rounded-full border border-white/10 bg-gradient-to-r from-rose-200/20 to-amber-200/20 px-3 py-1 text-xs font-medium text-rose-50 shadow-lg shadow-rose-950/10"
                        >
                          {item}
                        </motion.span>
                      ),
                    )}
                  </div>

                  <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-[#2a1320]/70 p-4 sm:rounded-[1.25rem] sm:p-5">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-200/70 to-transparent" />
                    <div className="flex gap-3 sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-rose-100/40">
                          Landing Page Preview
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                          Desserts worth craving
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-rose-50/65">
                          A playful, indulgent brand direction designed to make
                          the menu feel irresistible and encourage quick orders.
                        </p>
                      </div>
                      <motion.div
                        animate={
                          isMobile ? { rotate: 0 } : { rotate: [0, 4, -4, 0] }
                        }
                        transition={
                          isMobile
                            ? { duration: 0 }
                            : {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                        }
                        className="text-2xl sm:text-3xl"
                      >
                        🍓
                      </motion.div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">
                      <div className="rounded-2xl border border-rose-200/10 bg-rose-200/5 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-rose-100/40">
                          Style
                        </p>
                        <p className="mt-2 text-sm font-medium text-rose-50">
                          Warm, colourful, dessert-inspired
                        </p>
                      </div>
                      <div className="rounded-2xl border border-amber-200/10 bg-amber-200/5 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-rose-100/40">
                          Goal
                        </p>
                        <p className="mt-2 text-sm font-medium text-rose-50">
                          Menu discovery and easy ordering
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <motion.button
                        whileHover={
                          isMobile
                            ? {}
                            : {
                                y: -2,
                                scale: 1.03,
                                boxShadow:
                                  "0 18px 35px rgba(251, 113, 133, 0.22)",
                              }
                        }
                        whileTap={{ scale: 0.98 }}
                        className="rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 px-4 py-2 text-center text-sm font-semibold text-[#3b1628]"
                      >
                        View Menu
                      </motion.button>
                      <motion.button
                        whileHover={isMobile ? {} : { y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-center text-sm font-medium text-rose-50"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-rose-200/10 bg-rose-200/5 p-5">
                    <p className="text-sm text-rose-100/45">Build Type</p>
                    <p className="mt-2 font-medium text-white">Brand Website</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200/10 bg-amber-200/5 p-5">
                    <p className="text-sm text-rose-100/45">Focus</p>
                    <p className="mt-2 font-medium text-white">
                      Menu + Ordering Journey
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
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
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={
                isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/[0.08] via-violet-400/[0.05] to-cyan-400/[0.08] p-7 transition md:hover:-translate-y-1 md:hover:from-fuchsia-400/[0.12] md:hover:to-cyan-400/[0.12] md:hover:shadow-xl md:hover:shadow-fuchsia-500/10"
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
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="work"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
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
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={
                isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              whileHover={isMobile ? {} : { y: -4, scale: 1.005 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-violet-950/30 to-cyan-950/30 will-change-transform"
            >
              <div className="relative h-48 overflow-hidden sm:h-56">
                <img
                  src={
                    index === 0
                      ? "/sweetdezire.jpg"
                      : index === 1
                        ? "/homehive.jpg"
                        : "/product-launch.jpg"
                  }
                  alt={project.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 sm:group-hover:scale-110 sm:group-hover:rotate-[1deg] motion-reduce:transform-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.18),transparent_30%)]" />
                <div className="relative flex h-full items-end p-6">
                  <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
                    0{index + 1}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <div className="mb-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-white/40">
                  <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
                  Featured concept
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/35">
                  {project.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{project.name}</h3>
                <p className="mt-4 text-base leading-7 text-white/60">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/[0.08] via-slate-900/80 to-cyan-400/[0.08] p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl" />
          <div className="absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />
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

      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/[0.12] via-violet-400/[0.08] to-cyan-400/[0.12] p-8 md:p-12">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-200/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-200/10 blur-3xl" />
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
