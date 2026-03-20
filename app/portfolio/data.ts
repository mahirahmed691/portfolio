import type { Project, Service, Testimonial } from "./types";

export const services: Service[] = [
  {
    title: "Conversion-focused websites",
    description:
      "Marketing sites and business websites that look premium, load fast, and guide visitors toward a clear next step.",
    icon: "◈",
  },
  {
    title: "Product UI & frontend",
    description:
      "Modern interfaces for early-stage products, internal tools, and web apps with a strong focus on usability.",
    icon: "✦",
  },
  {
    title: "Design refreshes",
    description:
      "Visual cleanups and UX improvements for brands that already have something live but want it to feel sharper.",
    icon: "⬢",
  },
];

export const projects: Project[] = [
  {
    name: "Sweet Dezire",
    type: "Brand website concept",
    summary:
      "A warm, indulgent dessert brand experience designed to make browsing feel playful and ordering feel effortless.",
    impact: "Brand storytelling + menu-led UX",
    accent: "from-rose-300/30 via-pink-300/20 to-amber-200/30",
    story:
      "Designed to feel rich, playful, and instantly craveable, with the interface carrying as much of the brand mood as the visuals.",
    role: "Brand direction, landing page design, frontend concept",
    highlight: "Turned a simple menu site into a full visual experience.",
    challenge:
      "The goal was to make a simple dessert website feel like a branded experience instead of a basic menu page.",
    approach: [
      "Built a richer visual direction around indulgence, warmth, and appetite appeal.",
      "Used stronger hierarchy so the menu felt easier to scan and act on.",
      "Balanced playful branding with enough structure to keep ordering friction low.",
    ],
    stack: ["Next.js", "Responsive UI", "Brand-led layout"],
    outcome:
      "The concept feels more memorable, more premium, and more conversion-aware than a typical hospitality landing page.",
  },
  {
    name: "HomeHive",
    type: "Productivity web app concept",
    summary:
      "A mobile-first inventory and reminders experience focused on clarity, quick actions, and calm organisation.",
    impact: "Practical flows + product clarity",
    accent: "from-cyan-300/25 via-sky-300/20 to-violet-300/20",
    story:
      "Built around reducing friction in everyday tasks, with a cleaner structure that makes planning, reminders, and inventory feel less overwhelming.",
    role: "Product UX, interface design, frontend system thinking",
    highlight: "Focused on utility without sacrificing polish.",
    challenge:
      "The challenge was making a practical productivity tool feel calm and usable rather than dense and overwhelming.",
    approach: [
      "Simplified the core actions so reminders and inventory updates felt quick.",
      "Designed for mobile-first use where speed and clarity matter most.",
      "Kept the interface restrained so utility stayed at the centre of the experience.",
    ],
    stack: ["Product UX", "Mobile-first UI", "Frontend systems"],
    outcome:
      "The result is a cleaner task flow that makes everyday organisation feel lighter and more manageable.",
  },
  {
    name: "Launch Sprint",
    type: "Startup landing page system",
    summary:
      "A high-trust landing page direction for explaining value quickly and turning interest into enquiries or signups.",
    impact: "Messaging hierarchy + conversion design",
    accent: "from-violet-300/25 via-fuchsia-300/20 to-cyan-300/25",
    story:
      "Structured to help an early-stage product sound sharper, look more credible, and guide visitors toward a clear action without feeling overdesigned.",
    role: "Messaging layout, landing page UX, design system direction",
    highlight: "Made the product story clearer within seconds of landing.",
    challenge:
      "The brief was to help a startup explain value quickly while still feeling polished enough to trust.",
    approach: [
      "Created a clearer messaging sequence from promise to proof to action.",
      "Used landing page structure to reduce confusion within the first few scrolls.",
      "Made the interface feel credible without adding unnecessary complexity.",
    ],
    stack: ["Messaging design", "Landing page UX", "Conversion thinking"],
    outcome:
      "The concept gives an early-stage product a stronger first impression and a clearer path to enquiry or signup.",
  },
];

export const founderNotes = [
  "I care about taste just as much as performance.",
  "I like interfaces that feel sharp, intentional, and alive.",
  "My best work usually sits between brand, product, and story.",
];

export const heroMetrics = [
  { label: "Positioning", value: "Founder-first" },
  { label: "Aesthetic", value: "Bold luxury" },
  { label: "Experience", value: "Story-led UI" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "Bloom Studio",
    quote:
      "Mahir translated a rough brief into something that felt genuinely premium. The final site had a clarity and confidence we hadn't managed to articulate ourselves — and it converted better from day one.",
    rating: 5,
  },
  {
    name: "James Whitfield",
    role: "Founder",
    company: "Capsule",
    quote:
      "I came in with a vague idea of what I wanted and left with a product that looked more considered than anything I'd seen from studios charging five times the price. The attention to detail was exceptional.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Creative Director",
    company: "Forma Agency",
    quote:
      "Working with Mahir felt more like a creative partnership than a client-developer relationship. He pushed the visual direction in ways that made the whole brand feel sharper and more alive.",
    rating: 5,
  },
  {
    name: "Tom Ellsworth",
    role: "Co-founder",
    company: "Fieldwork",
    quote:
      "We needed our landing page to feel trustworthy and bold at the same time — a hard balance to strike. Mahir nailed it quickly and was genuinely easy to work with throughout.",
    rating: 5,
  },
];
