"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Output line types ──────────────────────────────────────────────
type Line =
  | { type: "input"; text: string }
  | { type: "output"; text: string; color?: string }
  | { type: "blank" }
  | { type: "ascii" };

// ── ASCII art ─────────────────────────────────────────────────────
const ASCII = `
  ███╗   ███╗ █████╗ ██╗  ██╗██╗██████╗
  ████╗ ████║██╔══██╗██║  ██║██║██╔══██╗
  ██╔████╔██║███████║███████║██║██████╔╝
  ██║╚██╔╝██║██╔══██║██╔══██║██║██╔══██╗
  ██║ ╚═╝ ██║██║  ██║██║  ██║██║██║  ██║
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
`.trim();

// ── Command definitions ───────────────────────────────────────────
const COMMANDS: Record<string, (args: string[]) => Line[]> = {
  help: () => [
    { type: "output", text: "Available commands:", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  whoami          — who is this guy?" },
    { type: "output", text: "  experience       — work history" },
    { type: "output", text: "  skills           — tech stack" },
    { type: "output", text: "  projects         — selected work" },
    { type: "output", text: "  services         — what I offer + pricing" },
    { type: "output", text: "  uses             — tools and setup" },
    { type: "output", text: "  now              — what I'm working on" },
    { type: "output", text: "  contact          — get in touch" },
    { type: "output", text: "  kubectl get pods — check the cluster" },
    { type: "output", text: "  terraform plan   — what would change?" },
    { type: "output", text: "  git log          — commit history" },
    { type: "output", text: "  docker ps        — running containers" },
    { type: "output", text: "  ping mahir       — test the connection" },
    { type: "output", text: "  sudo hire-me     — make an offer" },
    { type: "output", text: "  history          — show command history" },
    { type: "output", text: "  clear            — clear terminal" },
    { type: "output", text: "  exit             — close terminal" },
    { type: "blank" },
    { type: "output", text: "Tip: use ↑↓ for command history", color: "text-white/30" },
  ],

  whoami: () => [
    { type: "ascii" },
    { type: "blank" },
    { type: "output", text: "  Mahir Ahmed", color: "text-cyan-400" },
    { type: "output", text: "  Platform Engineer & Frontend Developer" },
    { type: "blank" },
    { type: "output", text: "  📍  Manchester, UK" },
    { type: "output", text: "  🎓  BSc Computer Science, First Class — University of Salford" },
    { type: "output", text: "  🏢  7+ years: GFT, Betfred, HSBC, Zurich, Deutsche Bank" },
    { type: "output", text: "  ⚡  Building cloud infra by day, shipping products by night" },
    { type: "blank" },
    { type: "output", text: "  Run `skills` or `experience` to learn more.", color: "text-white/40" },
  ],

  experience: () => [
    { type: "output", text: "WORK HISTORY", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  GFT UK  ·  2021 – present", color: "text-violet-400" },
    { type: "output", text: "  Senior Platform Engineer" },
    { type: "output", text: "  ↳ GCP · Kubernetes · Terraform · CI/CD for HSBC, Zurich, Deutsche Bank" },
    { type: "blank" },
    { type: "output", text: "  Betfred  ·  2019 – 2021", color: "text-violet-400" },
    { type: "output", text: "  Platform Engineer" },
    { type: "output", text: "  ↳ Real-time betting infrastructure · GCP · Pub/Sub · Dataflow" },
    { type: "blank" },
    { type: "output", text: "  Earlier  ·  2018 – 2019", color: "text-violet-400" },
    { type: "output", text: "  Junior Developer" },
    { type: "output", text: "  ↳ Full-stack web development, React, Node.js" },
  ],

  skills: () => [
    { type: "output", text: "TECH STACK", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  Cloud & Infra", color: "text-emerald-400" },
    { type: "output", text: "  ████████████████████  GCP" },
    { type: "output", text: "  ████████████████░░░░  AWS" },
    { type: "output", text: "  ████████████████████  Kubernetes" },
    { type: "output", text: "  ██████████████████░░  Terraform" },
    { type: "output", text: "  ████████████████████  Docker" },
    { type: "blank" },
    { type: "output", text: "  Frontend", color: "text-fuchsia-400" },
    { type: "output", text: "  ████████████████████  React / Next.js" },
    { type: "output", text: "  ████████████████████  TypeScript" },
    { type: "output", text: "  ██████████████████░░  Tailwind CSS" },
    { type: "blank" },
    { type: "output", text: "  Data & Pipelines", color: "text-amber-400" },
    { type: "output", text: "  █████████████████░░░  Pub/Sub · Dataflow" },
    { type: "output", text: "  ████████████████░░░░  BigQuery · Cloud SQL" },
  ],

  projects: () => [
    { type: "output", text: "SELECTED WORK", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  [1] GKE Microservices Platform", color: "text-white/90" },
    { type: "output", text: "      Multi-client GKE clusters for HSBC, Zurich & Deutsche Bank" },
    { type: "output", text: "      GCP · Kubernetes · Helm · ArgoCD · Terraform" },
    { type: "blank" },
    { type: "output", text: "  [2] Real-time Data Pipeline", color: "text-white/90" },
    { type: "output", text: "      2.4M events/hr for Betfred's real-time betting platform" },
    { type: "output", text: "      Pub/Sub · Dataflow · Cloud SQL · Go" },
    { type: "blank" },
    { type: "output", text: "  [3] Multi-cloud Terraform Platform", color: "text-white/90" },
    { type: "output", text: "      Unified IaC modules for GCP + AWS workloads" },
    { type: "output", text: "      Terraform · GitHub Actions · OPA policy-as-code" },
  ],

  contact: () => [
    { type: "output", text: "GET IN TOUCH", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  📧  hello@mahirahmed.co.uk" },
    { type: "output", text: "  🔗  linkedin.com/in/mahir-ahmed-84a346149" },
    { type: "output", text: "  💻  github.com/mahirahmed691" },
    { type: "output", text: "  🌐  mahirahmed.co.uk" },
    { type: "blank" },
    { type: "output", text: "  Or scroll down and use the contact form →", color: "text-white/40" },
  ],

  "kubectl get pods": () => [
    { type: "output", text: "NAME                          READY   STATUS    RESTARTS   AGE" },
    { type: "output", text: "api-gateway-7d9f8b-xk2p9      1/1     Running   0          12d", color: "text-emerald-400" },
    { type: "output", text: "auth-service-5c6d4f-m8np1     1/1     Running   0          12d", color: "text-emerald-400" },
    { type: "output", text: "data-processor-9b2a1c-j4kw7   1/1     Running   1          3d", color: "text-emerald-400" },
    { type: "output", text: "cache-layer-3e7f2d-p9lq8      1/1     Running   0          12d", color: "text-emerald-400" },
    { type: "output", text: "queue-worker-6a1b8e-r5mt3     1/1     Running   0          5d", color: "text-emerald-400" },
    { type: "output", text: "log-aggregator-2f4c9a-n7wk1   1/1     Running   0          12d", color: "text-emerald-400" },
    { type: "blank" },
    { type: "output", text: "6/6 pods running · cluster: europe-west2 · healthy ✓", color: "text-white/40" },
  ],

  "terraform plan": () => [
    { type: "output", text: "Initializing the backend...", color: "text-white/50" },
    { type: "output", text: "Refreshing state... done.", color: "text-white/50" },
    { type: "blank" },
    { type: "output", text: "Terraform will perform the following actions:" },
    { type: "blank" },
    { type: "output", text: "  # google_container_cluster.main will be updated in-place" },
    { type: "output", text: "  ~ resource \"google_container_cluster\" \"main\" {", color: "text-amber-400" },
    { type: "output", text: "      ~ node_count = 3 -> 5", color: "text-amber-400" },
    { type: "output", text: "    }" },
    { type: "blank" },
    { type: "output", text: "Plan: 0 to add, 1 to change, 0 to destroy.", color: "text-emerald-400" },
    { type: "blank" },
    { type: "output", text: "Run `terraform apply` to scale the cluster.", color: "text-white/30" },
  ],

  "git log": () => [
    { type: "output", text: "commit a3f8c21  (HEAD -> main, origin/main)", color: "text-amber-400" },
    { type: "output", text: "Author: Mahir Ahmed <hello@mahirahmed.co.uk>" },
    { type: "output", text: "Date:   Thu Mar 21 2026" },
    { type: "output", text: "    feat: add interactive terminal to portfolio" },
    { type: "blank" },
    { type: "output", text: "commit 9b2e441", color: "text-amber-400" },
    { type: "output", text: "    fix: blog post pages not loading (async params)" },
    { type: "blank" },
    { type: "output", text: "commit 4c7f882", color: "text-amber-400" },
    { type: "output", text: "    feat: JSON-LD structured data + OG image" },
    { type: "blank" },
    { type: "output", text: "commit 1a9d553", color: "text-amber-400" },
    { type: "output", text: "    feat: revenue tools — invoices, maintenance, audit" },
    { type: "blank" },
    { type: "output", text: "commit 0e3b219", color: "text-amber-400" },
    { type: "output", text: "    feat: rebrand — platform engineer + frontend craftsman" },
    { type: "blank" },
    { type: "output", text: "... 200+ more commits", color: "text-white/30" },
  ],

  "docker ps": () => [
    { type: "output", text: "CONTAINER ID   IMAGE                    STATUS          PORTS" },
    { type: "output", text: "a3f8c21d9b2e   mahir/api-gateway:1.4.2  Up 12 days      0.0.0.0:8080->8080/tcp", color: "text-emerald-400" },
    { type: "output", text: "9b2e441f3c7a   mahir/auth-svc:2.1.0     Up 12 days      0.0.0.0:8081->8081/tcp", color: "text-emerald-400" },
    { type: "output", text: "4c7f8826e1b0   redis:7-alpine           Up 12 days      0.0.0.0:6379->6379/tcp", color: "text-emerald-400" },
    { type: "output", text: "1a9d553a2f4c   postgres:15              Up 12 days      0.0.0.0:5432->5432/tcp", color: "text-emerald-400" },
    { type: "blank" },
    { type: "output", text: "4 containers running", color: "text-white/40" },
  ],

  "ping mahir": () => [
    { type: "output", text: "PING mahirahmed.co.uk (76.76.21.21): 56 data bytes" },
    { type: "output", text: "64 bytes from mahirahmed.co.uk: icmp_seq=0 ttl=64 time=4.2 ms", color: "text-emerald-400" },
    { type: "output", text: "64 bytes from mahirahmed.co.uk: icmp_seq=1 ttl=64 time=3.8 ms", color: "text-emerald-400" },
    { type: "output", text: "64 bytes from mahirahmed.co.uk: icmp_seq=2 ttl=64 time=4.1 ms", color: "text-emerald-400" },
    { type: "blank" },
    { type: "output", text: "--- mahirahmed.co.uk ping statistics ---" },
    { type: "output", text: "3 packets transmitted, 3 received, 0% packet loss", color: "text-emerald-400" },
    { type: "output", text: "round-trip min/avg/max = 3.8/4.0/4.2 ms" },
    { type: "blank" },
    { type: "output", text: "Mahir is responsive. Low latency. Highly available. ✓", color: "text-cyan-400" },
  ],

  services: () => [
    { type: "output", text: "SERVICES & PRICING", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  Frontend & product packages", color: "text-fuchsia-400" },
    { type: "output", text: "  ┌─ Starter   From £500   Landing page or personal site" },
    { type: "output", text: "  ├─ Growth    From £1,500 Multi-page business website" },
    { type: "output", text: "  └─ Premium   From £3,000 Full product or web app" },
    { type: "blank" },
    { type: "output", text: "  Platform engineering", color: "text-emerald-400" },
    { type: "output", text: "  └─ Scoped individually — GKE, Terraform, CI/CD, pipelines" },
    { type: "blank" },
    { type: "output", text: "  → mahirahmed.co.uk/services", color: "text-white/40" },
  ],

  uses: () => [
    { type: "output", text: "DAILY SETUP", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  Editor    VS Code" },
    { type: "output", text: "  Terminal  Warp" },
    { type: "output", text: "  Cloud     GCP (primary) · AWS (secondary)" },
    { type: "output", text: "  Infra     Terraform · Kubernetes · ArgoCD · Helm" },
    { type: "output", text: "  CI/CD     Jenkins · GitHub Actions" },
    { type: "output", text: "  Observe   GCP Operations Suite · Grafana · Prometheus" },
    { type: "output", text: "  Lang      TypeScript · Python · Bash" },
    { type: "output", text: "  Frontend  Next.js · Tailwind CSS · Framer Motion" },
    { type: "output", text: "  Hardware  MacBook Pro (M-series)" },
    { type: "blank" },
    { type: "output", text: "  → mahirahmed.co.uk/uses", color: "text-white/40" },
  ],

  now: () => [
    { type: "output", text: "WHAT I'M DOING NOW", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  Day job   Platform engineer at Betfred" },
    { type: "output", text: "            Real-time infrastructure · GCP · Kubernetes" },
    { type: "blank" },
    { type: "output", text: "  Learning  Multi-cluster K8s · eBPF observability" },
    { type: "output", text: "            Next.js Server Components patterns" },
    { type: "blank" },
    { type: "output", text: "  Location  Manchester, UK" },
    { type: "blank" },
    { type: "output", text: "  → mahirahmed.co.uk/now for the full picture", color: "text-white/40" },
  ],

  "sudo hire-me": () => [
    { type: "output", text: "[sudo] password for recruiter: ••••••••", color: "text-white/50" },
    { type: "blank" },
    { type: "output", text: "✓ Authentication successful", color: "text-emerald-400" },
    { type: "blank" },
    { type: "output", text: "Initialising hire sequence...", color: "text-white/50" },
    { type: "output", text: "→ Checking availability.............. OPEN", color: "text-emerald-400" },
    { type: "output", text: "→ Checking platform eng skills........ STRONG", color: "text-emerald-400" },
    { type: "output", text: "→ Checking frontend skills............ STRONG", color: "text-emerald-400" },
    { type: "output", text: "→ Checking communication.............. EXCELLENT", color: "text-emerald-400" },
    { type: "blank" },
    { type: "output", text: "All checks passed. Ready to deploy to your team.", color: "text-cyan-400" },
    { type: "blank" },
    { type: "output", text: "  → hello@mahirahmed.co.uk", color: "text-fuchsia-400" },
    { type: "output", text: "  → Scroll to #contact to start a project", color: "text-fuchsia-400" },
  ],

  clear: () => [],
};

// Commands that simulate async work with an initial loading line
const SLOW_COMMANDS: Record<string, { loading: string; delay: number }> = {
  "terraform plan": { loading: "Initializing the backend... Refreshing Terraform state...", delay: 1400 },
  "kubectl get pods": { loading: "Fetching pods from cluster europe-west2...", delay: 900 },
};

// ── Fuzzy match closest command ────────────────────────────────────
function findSuggestion(input: string): string | null {
  const keys = Object.keys(COMMANDS);
  const match = keys.find((k) => k.startsWith(input.slice(0, 3)) && k !== input);
  return match ?? null;
}

// ── Welcome message ────────────────────────────────────────────────
const WELCOME: Line[] = [
  { type: "output", text: "mahir@portfolio:~$ — interactive terminal", color: "text-cyan-400" },
  { type: "output", text: "Type `help` to see available commands.", color: "text-white/40" },
  { type: "blank" },
];

// ── Terminal component ─────────────────────────────────────────────
export function Terminal({
  open,
  onClose,
  isLight,
}: {
  open: boolean;
  onClose: () => void;
  isLight: boolean;
}) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [processing, setProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim().toLowerCase();
      const inputLine: Line = { type: "input", text: raw.trim() };

      if (!trimmed) {
        setLines((prev) => [...prev, inputLine, { type: "blank" }]);
        return;
      }

      setCmdHistory((prev) => [raw.trim(), ...prev.slice(0, 49)]);
      setHistoryIdx(-1);

      if (trimmed === "exit") { onClose(); return; }
      if (trimmed === "clear") { setLines(WELCOME); return; }

      // history command — needs access to cmdHistory state
      if (trimmed === "history") {
        setCmdHistory((prev) => {
          const histLines: Line[] = prev.length === 0
            ? [{ type: "output", text: "No command history yet.", color: "text-white/40" }]
            : prev.map((cmd, i) => ({ type: "output" as const, text: `  ${String(i + 1).padStart(3)}  ${cmd}` }));
          setLines((l) => [...l, inputLine, { type: "blank" }, ...histLines, { type: "blank" }]);
          return prev;
        });
        return;
      }

      const handler = COMMANDS[trimmed];

      if (handler) {
        const slow = SLOW_COMMANDS[trimmed];
        if (slow) {
          // Show loading indicator, then reveal full output after delay
          setProcessing(true);
          setLines((prev) => [
            ...prev,
            inputLine,
            { type: "blank" },
            { type: "output", text: slow.loading, color: "text-white/40" },
          ]);
          setTimeout(() => {
            const output = handler([]);
            // Skip lines already shown in the loading message
            setLines((prev) => [...prev, { type: "blank" }, ...output, { type: "blank" }]);
            setProcessing(false);
          }, slow.delay);
        } else {
          const output = handler([]);
          setLines((prev) => [...prev, inputLine, { type: "blank" }, ...output, { type: "blank" }]);
        }
      } else {
        const suggestion = findSuggestion(trimmed);
        const notFound: Line[] = [
          { type: "output", text: `command not found: ${trimmed}`, color: "text-rose-400" },
          ...(suggestion
            ? [{ type: "output" as const, text: `Did you mean: ${suggestion}?`, color: "text-white/40" }]
            : [{ type: "output" as const, text: `Type \`help\` for available commands.`, color: "text-white/40" }]),
        ];
        setLines((prev) => [...prev, inputLine, { type: "blank" }, ...notFound, { type: "blank" }]);
      }
    },
    [onClose],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab completion
      const keys = Object.keys(COMMANDS);
      const match = keys.find((k) => k.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          background: "#0a0f1a",
          border: "1px solid rgba(255,255,255,0.08)",
          maxHeight: "80vh",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0d1424" }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
              aria-label="Close terminal"
            />
            <div className="h-3 w-3 rounded-full bg-amber-400/60" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
          </div>
          <p className="text-[11px] text-white/30 font-mono tracking-widest">
            mahir@portfolio: ~
          </p>
          <div className="w-16" />
        </div>

        {/* Output area */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 font-mono text-[12px] sm:text-[13px] leading-relaxed"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => {
            if (line.type === "blank") return <div key={i} className="h-2" />;
            if (line.type === "ascii") return (
              <pre key={i} className="text-cyan-400/70 text-[8px] sm:text-[10px] leading-tight mb-2 overflow-x-auto">
                {ASCII}
              </pre>
            );
            if (line.type === "input") return (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <span className="text-emerald-400 shrink-0">mahir@portfolio:~$</span>
                <span>{line.text}</span>
              </div>
            );
            return (
              <div key={i} className={`${line.color ?? "text-white/55"} whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div
          className="flex items-center gap-2 px-5 py-3 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="font-mono text-[13px] text-emerald-400 shrink-0">
            mahir@portfolio:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-white/20 caret-emerald-400 disabled:opacity-40"
            placeholder={processing ? "running..." : "type a command..."}
            disabled={processing}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          {/* Blinking cursor effect when empty */}
          {!input && (
            <span
              className="font-mono text-[13px] text-emerald-400 animate-pulse"
              aria-hidden="true"
            >
              ▋
            </span>
          )}
        </div>

        {/* Hint bar */}
        <div
          className="px-5 py-2 flex items-center justify-between shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[10px] text-white/20 font-mono">↑↓ history · Tab autocomplete · Esc close</p>
          <p className="text-[10px] text-white/15 font-mono">press T to toggle</p>
        </div>
      </div>
    </div>
  );
}
