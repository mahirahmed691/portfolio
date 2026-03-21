import type { Project, Service, Testimonial } from "./types";

export const services: Service[] = [
  {
    title: "Platform engineering",
    description:
      "Scalable cloud infrastructure, CI/CD pipelines, Kubernetes, microservices, and distributed systems — built to stay reliable under real load.",
    icon: "⬡",
  },
  {
    title: "Product UI & frontend",
    description:
      "Modern interfaces for products, internal tools, and web apps — built with the systems depth to know what the backend actually needs.",
    icon: "✦",
  },
  {
    title: "End-to-end builds",
    description:
      "From infrastructure to interface. If you need someone who can own the full stack and ship something that works in production, that's the sweet spot.",
    icon: "◈",
  },
];

export const projects: Project[] = [
  {
    name: "GKE Microservices Platform",
    type: "Production platform engineering · GFT",
    summary:
      "Designed and operated production Kubernetes clusters on Google Kubernetes Engine supporting microservices workloads for enterprise clients including HSBC, Zurich, and Deutsche Bank.",
    impact: "Enterprise-grade reliability at scale",
    accent: "from-cyan-300/25 via-blue-300/20 to-violet-300/20",
    diagram: "kubernetes" as const,
    story:
      "High-stakes production platform work across some of the UK's largest financial institutions — where reliability isn't optional and every incident has real consequences.",
    role: "Platform engineering, GKE operations, incident response",
    highlight: "Kept mission-critical microservices stable for HSBC, Zurich, and Deutsche Bank.",
    challenge:
      "Maintaining platform reliability and performance for enterprise-grade microservices workloads where downtime directly impacts regulated financial services.",
    approach: [
      "Managed Kubernetes deployments, pod lifecycle, and cluster networking on GKE to maintain platform health.",
      "Troubleshot incidents across pods, services, and cluster networking under production pressure.",
      "Supported platform stability through structured incident investigation and root cause resolution.",
    ],
    stack: ["GKE", "Kubernetes", "Docker", "GCP", "Jenkins", "Linux"],
    outcome:
      "Stable, scalable container platform serving multiple enterprise financial clients in production with consistent reliability.",
  },
  {
    name: "Real-time Data Pipeline",
    type: "Data platform engineering · GCP",
    summary:
      "Built and operated real-time data pipelines on GCP using Pub/Sub and Dataflow, enabling high-throughput stream ingestion and processing integrated with Cloud SQL and backend services.",
    impact: "High-throughput ingestion, zero data loss",
    accent: "from-fuchsia-300/25 via-violet-300/20 to-cyan-300/20",
    diagram: "pipeline" as const,
    story:
      "Streaming data at volume across distributed systems, where a pipeline failure means lost data or broken downstream services — so reliability and observability had to be built in from the start.",
    role: "Pipeline engineering, GCP data services, distributed systems",
    highlight: "Kept high-volume data streams reliable across a distributed GCP architecture.",
    challenge:
      "Keeping high-throughput ingestion and processing reliable across distributed systems while integrating cleanly with Cloud SQL and multiple backend services.",
    approach: [
      "Built and maintained Pub/Sub topics and Dataflow jobs for real-time stream processing.",
      "Integrated pipelines with Cloud SQL and backend services to ensure consistent data flow.",
      "Implemented monitoring and alerting with GCP Operations Suite to catch and resolve issues fast.",
    ],
    stack: ["GCP Pub/Sub", "Dataflow", "Cloud SQL", "Python", "GCP Operations Suite"],
    outcome:
      "Reliable real-time data processing pipeline handling high-volume streams with integrated monitoring and fast incident resolution.",
  },
  {
    name: "Multi-cloud Terraform Platform",
    type: "Infrastructure as Code · GCP & AWS",
    summary:
      "Designed and provisioned infrastructure across GCP and AWS using Terraform, building reusable modules that standardised multi-environment deployments and eliminated configuration drift.",
    impact: "Consistent infra across cloud providers",
    accent: "from-amber-300/20 via-orange-300/15 to-rose-300/20",
    diagram: "terraform" as const,
    story:
      "Infrastructure that teams can trust — where provisioning a new environment means running a plan, not writing it from scratch. Built to reduce drift, speed up delivery, and make changes auditable.",
    role: "Infrastructure design, Terraform, multi-cloud operations",
    highlight: "Eliminated environment drift across GCP and AWS with reusable IaC modules.",
    challenge:
      "Reducing configuration drift and enforcing consistency across multiple cloud environments while keeping infrastructure changes safe and auditable.",
    approach: [
      "Designed reusable Terraform modules to support consistent deployments across all environments.",
      "Applied Infrastructure as Code best practices to make provisioning repeatable and reduce manual risk.",
      "Managed infrastructure changes with careful validation to prevent drift and deployment failures.",
    ],
    stack: ["Terraform", "GCP", "AWS", "IaC", "CI/CD", "Linux"],
    outcome:
      "Faster, more consistent infrastructure delivery with reduced drift and a clear audit trail for every change.",
  },
  {
    name: "Fintech Dashboard",
    type: "Full-stack product build · React & Next.js",
    summary:
      "Built a real-time financial operations dashboard for an early-stage fintech, covering transaction monitoring, account management, and role-based access control — from API design through to polished UI.",
    impact: "Reduced ops team reporting time by 60%",
    accent: "from-emerald-300/25 via-teal-300/20 to-cyan-300/20",
    diagram: "pipeline" as const,
    story:
      "A fast-moving fintech team needed internal tooling that matched the quality of their consumer product. The dashboard had to be fast, accurate, and usable by non-technical staff — which meant design and engineering had to work together from the start.",
    role: "Full-stack engineering, UI/UX design, API design",
    highlight: "Shipped a production-grade financial dashboard in 6 weeks.",
    challenge:
      "Building a reliable real-time dashboard where stale data or incorrect figures could have direct financial consequences — while keeping the interface simple enough for non-technical ops staff.",
    approach: [
      "Designed a clean component system in React with role-based views so different user types see only what's relevant to them.",
      "Built a Next.js API layer that aggregated data from multiple upstream services and normalised it into a consistent shape.",
      "Implemented optimistic updates and real-time polling to keep the dashboard accurate without overwhelming the backend.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    outcome:
      "Operations team reporting time dropped by 60%. The dashboard became the primary tool for daily financial reconciliation within two weeks of launch.",
  },
  {
    name: "CI/CD Platform Modernisation",
    type: "Platform engineering · Jenkins to GitHub Actions",
    summary:
      "Led the migration of a legacy Jenkins-based CI/CD setup to a modern GitHub Actions pipeline, reducing build times, eliminating flaky tests, and giving developers confidence in the deployment process.",
    impact: "Build times cut by 55%, zero flaky deploys",
    accent: "from-violet-300/25 via-purple-300/20 to-fuchsia-300/20",
    diagram: "pipeline" as const,
    story:
      "The team had inherited a Jenkins setup that nobody fully understood, where builds would randomly fail and deploys required a senior engineer to babysit. Migrating it was partly a technical challenge and partly a trust-rebuilding exercise.",
    role: "Platform engineering, CI/CD design, developer experience",
    highlight: "Eliminated unreliable builds and gave the team confidence to deploy daily.",
    challenge:
      "Replacing a working (if fragile) CI system without disrupting ongoing development, while building something the whole team could understand and maintain.",
    approach: [
      "Audited the existing Jenkins pipelines and identified the real failure modes — mostly implicit environment dependencies and shared mutable state.",
      "Designed GitHub Actions workflows around isolated, declarative steps with explicit dependencies and artifact caching.",
      "Migrated services incrementally with parallel runs, so the team could validate the new pipeline before committing to it.",
    ],
    stack: ["GitHub Actions", "Docker", "GCP", "Terraform", "Jest", "Node.js"],
    outcome:
      "Build times reduced by 55%. Flaky deploys eliminated. Developers now ship to production multiple times a day without a babysitter.",
  },
];

export const founderNotes = [
  "I understand what's running under the hood — because I built it.",
  "Systems thinking shapes everything I design and ship.",
  "My best work sits where infrastructure, product, and craft meet.",
];

export const heroMetrics = [
  { label: "Platform engineering", value: "Since 2018" },
  { label: "Depth", value: "Infra → UI" },
  { label: "Approach", value: "Full stack" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Bahar Khorram",
    role: "Independent Cloud Strategy Consultant & GCP Architect",
    company: "GFT",
    quote:
      "Mahir was a key team member who hugely contributed to the project's success. He could easily find solutions and workarounds using different software products. He is eager to help colleagues and has gone to great lengths to ensure that everything was clear and that we delivered the solution — receiving fantastic feedback from the client. He is super intelligent and knows his stuff; when you assign him a task, you know it is in good hands.",
    rating: 5,
  },
];
