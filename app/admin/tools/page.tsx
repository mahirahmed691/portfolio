"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────
type Tool =
  | "landing"
  | "components"
  | "scaffold"
  | "contract"
  | "hosting"
  | "seo";

type SavedComponent = {
  id: string;
  name: string;
  tag: string;
  code: string;
  createdAt: string;
};

// ── Hosting pricing data ──────────────────────────────────────────
const HOSTING_TIERS = {
  vercel: [
    {
      name: "Hobby",
      price: 0,
      builds: "Unlimited",
      bandwidth: "100GB",
      functions: "100GB-hrs",
    },
    {
      name: "Pro",
      price: 20,
      builds: "Unlimited",
      bandwidth: "1TB",
      functions: "1000GB-hrs",
    },
    {
      name: "Team",
      price: 20,
      builds: "Unlimited",
      bandwidth: "1TB",
      functions: "1000GB-hrs",
    },
  ],
  netlify: [
    {
      name: "Starter",
      price: 0,
      builds: "300 min/mo",
      bandwidth: "100GB",
      functions: "125k req",
    },
    {
      name: "Pro",
      price: 19,
      builds: "25000 min/mo",
      bandwidth: "400GB",
      functions: "2M req",
    },
    {
      name: "Business",
      price: 99,
      builds: "Unlimited",
      bandwidth: "1TB",
      functions: "10M req",
    },
  ],
  railway: [
    {
      name: "Starter",
      price: 5,
      builds: "Unlimited",
      bandwidth: "Included",
      functions: "N/A",
    },
    {
      name: "Pro",
      price: 20,
      builds: "Unlimited",
      bandwidth: "Included",
      functions: "N/A",
    },
  ],
};

// ── Shared UI ─────────────────────────────────────────────────────
function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] uppercase tracking-[0.2em] text-white/35 font-medium ${className}`}
    >
      {children}
    </p>
  );
}

function GhostBtn({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      {...props}
      className={`inline-flex h-9 items-center justify-center rounded-xl bg-white/[0.05] px-4 text-xs font-medium text-white/75 transition-all hover:bg-white/[0.1] hover:text-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function PrimaryBtn({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      {...props}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold text-[#07111f] transition hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-[#0c1929] ${className}`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <GhostBtn onClick={copy} className="!h-7 !px-3 !text-[11px]">
      {copied ? "✓ Copied" : "Copy"}
    </GhostBtn>
  );
}

// ── Tool: Landing Page Generator ──────────────────────────────────
function LandingPageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("minimal");
  const [palette, setPalette] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");
    setPreview(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate a complete, production-ready single-file HTML landing page for: "${prompt}"

Style direction: ${style} (${style === "minimal" ? "clean whitespace, sharp type, restrained" : style === "bold" ? "big headlines, strong contrast, energetic" : style === "luxury" ? "elegant, refined, premium feel" : "technical, developer-focused, monospace"})
Color palette: ${palette === "dark" ? "dark background (#0a0a0a or similar), light text" : "light background, dark text"}

Requirements:
- Complete self-contained HTML with embedded CSS and minimal JS
- Google Fonts import for a distinctive font pairing
- Hero section with headline, subheadline, CTA button
- Features/benefits section (3–4 items)
- Simple CTA section at bottom
- Responsive mobile-first design
- Smooth scroll, subtle hover states
- No placeholder Lorem Ipsum — write real compelling copy based on the prompt
- No external dependencies except Google Fonts
- The page must look genuinely polished and deployable

Return ONLY the raw HTML. No explanation, no markdown, no backticks.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const html =
        data.content
          ?.map((b: { type: string; text?: string }) =>
            b.type === "text" ? b.text : "",
          )
          .join("") || "";
      setOutput(html.trim());
    } catch {
      setOutput("<!-- Error generating page. Please try again. -->");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prompt.slice(0, 30).replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div>
        <Label className="mb-2">Describe the page</Label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A SaaS landing page for a project management tool aimed at freelancers. Focus on simplicity and speed."
          rows={3}
          className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/25 resize-none"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />
      </div>

      {/* Options row */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[140px]">
          <Label className="mb-1.5">Style</Label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value="minimal">Minimal</option>
            <option value="bold">Bold & expressive</option>
            <option value="luxury">Luxury / premium</option>
            <option value="dev">Dev / technical</option>
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <Label className="mb-1.5">Palette</Label>
          <select
            value={palette}
            onChange={(e) => setPalette(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="flex items-end">
          <PrimaryBtn onClick={generate} disabled={loading || !prompt.trim()}>
            {loading ? (
              <>
                <Spinner /> Generating…
              </>
            ) : (
              "✦ Generate page"
            )}
          </PrimaryBtn>
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="space-y-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label>Output</Label>
            <div className="flex gap-2 flex-wrap">
              <GhostBtn
                onClick={() => setPreview((p) => !p)}
                className="!h-8 !px-3 !text-[11px]"
              >
                {preview ? "‹› Code" : "⬡ Preview"}
              </GhostBtn>
              <GhostBtn onClick={copy} className="!h-8 !px-3 !text-[11px]">
                {copied ? "✓ Copied" : "Copy HTML"}
              </GhostBtn>
              <PrimaryBtn
                onClick={download}
                className="!h-8 !px-4 !text-[11px]"
              >
                ↓ Download
              </PrimaryBtn>
            </div>
          </div>

          {preview ? (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                height: "480px",
              }}
            >
              <iframe
                srcDoc={output}
                className="w-full h-full bg-white"
                title="Preview"
                sandbox="allow-scripts"
              />
            </div>
          ) : (
            <pre
              className="rounded-xl p-4 text-[11px] text-white/55 overflow-auto font-mono leading-relaxed"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.05)",
                maxHeight: "400px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {output.slice(0, 2000)}
              {output.length > 2000
                ? "\n\n… (truncated — download for full file)"
                : ""}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ── Tool: Component Library ───────────────────────────────────────
function ComponentLibrary() {
  const [components, setComponents] = useState<SavedComponent[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("dev_components") || "[]");
    } catch {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [tag, setTag] = useState("button");
  const [code, setCode] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genPrompt, setGenPrompt] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const save = () => {
    if (!name.trim() || !code.trim()) return;
    const newComp: SavedComponent = {
      id: Date.now().toString(),
      name,
      tag,
      code,
      createdAt: new Date().toISOString(),
    };
    const updated = [newComp, ...components];
    setComponents(updated);
    localStorage.setItem("dev_components", JSON.stringify(updated));
    setName("");
    setCode("");
  };

  const remove = (id: string) => {
    const updated = components.filter((c) => c.id !== id);
    setComponents(updated);
    localStorage.setItem("dev_components", JSON.stringify(updated));
  };

  const generateComponent = async () => {
    if (!genPrompt.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate a reusable React/TSX component for: "${genPrompt}"\n\nRequirements:\n- Tailwind CSS for styling\n- TypeScript with proper prop types\n- Clean, production-ready code\n- Export as default\n- No external dependencies beyond React and Tailwind\n\nReturn ONLY the raw component code. No explanation, no markdown backticks.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const result =
        data.content
          ?.map((b: { type: string; text?: string }) =>
            b.type === "text" ? b.text : "",
          )
          .join("") || "";
      setCode(result.trim());
      setName(genPrompt.slice(0, 40));
    } catch {
      /* noop */
    } finally {
      setGenerating(false);
    }
  };

  const TAG_COLORS: Record<string, { bg: string; color: string }> = {
    button: { bg: "rgba(125,211,252,0.12)", color: "#7dd3fc" },
    card: { bg: "rgba(196,181,253,0.12)", color: "#c4b5fd" },
    form: { bg: "rgba(110,231,183,0.12)", color: "#6ee7b7" },
    nav: { bg: "rgba(252,211,77,0.12)", color: "#fcd34d" },
    hero: { bg: "rgba(232,121,249,0.12)", color: "#e879f9" },
    other: { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" },
  };

  return (
    <div className="space-y-5">
      {/* AI Generator */}
      <div
        className="rounded-xl p-4 space-y-3"
        style={{
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.15)",
        }}
      >
        <Label>AI generate a component</Label>
        <div className="flex gap-2">
          <input
            value={genPrompt}
            onChange={(e) => setGenPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateComponent()}
            placeholder="e.g. pricing card with toggle, testimonial carousel…"
            className="flex-1 h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
          <GhostBtn
            onClick={generateComponent}
            disabled={generating || !genPrompt.trim()}
          >
            {generating ? (
              <>
                <Spinner />
                Generating
              </>
            ) : (
              "Generate"
            )}
          </GhostBtn>
        </div>
      </div>

      {/* Manual save */}
      <div className="space-y-3">
        <Label>Save a snippet</Label>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Component name"
            className="flex-1 h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {Object.keys(TAG_COLORS).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your component code here…"
          rows={5}
          className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-xs text-white/80 font-mono outline-none placeholder:text-white/25 resize-none"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />
        <PrimaryBtn onClick={save} disabled={!name.trim() || !code.trim()}>
          Save component
        </PrimaryBtn>
      </div>

      {/* Library */}
      {components.length > 0 && (
        <div className="space-y-2">
          <Label>
            {components.length} saved{" "}
            {components.length === 1 ? "component" : "components"}
          </Label>
          {components.map((c) => {
            const tc = TAG_COLORS[c.tag] || TAG_COLORS.other;
            return (
              <div
                key={c.id}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: tc.bg, color: tc.color }}
                    >
                      {c.tag}
                    </span>
                    <span className="text-sm font-medium text-white/80">
                      {c.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyBtn text={c.code} />
                    <GhostBtn
                      onClick={() => remove(c.id)}
                      className="!h-7 !px-3 !text-[11px] hover:!text-red-400"
                    >
                      Delete
                    </GhostBtn>
                    <span className="text-white/30 text-xs">
                      {expanded === c.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
                {expanded === c.id && (
                  <pre
                    className="px-4 py-3 text-[11px] text-white/50 font-mono overflow-auto leading-relaxed"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      maxHeight: "200px",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                    }}
                  >
                    {c.code}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      )}

      {components.length === 0 && (
        <p className="text-xs text-white/25 italic">
          No components saved yet. Generate or paste one above.
        </p>
      )}
    </div>
  );
}

// ── Tool: Project Scaffolder ──────────────────────────────────────
function ProjectScaffolder() {
  const [projectName, setProjectName] = useState("");
  const [stack, setStack] = useState("nextjs-supabase");
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const FEATURE_OPTIONS = [
    "Authentication (Supabase Auth)",
    "Stripe payments",
    "Email (Resend)",
    "SMS (Twilio)",
    "Admin dashboard",
    "Blog / CMS",
    "API routes",
    "Dark mode",
  ];

  const toggleFeature = (f: string) => {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  const generate = async () => {
    if (!projectName.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate a complete project scaffolding guide for a project called "${projectName}".

Stack: ${stack}
Features needed: ${features.length > 0 ? features.join(", ") : "basic setup only"}

Provide:
1. Exact terminal commands to scaffold the project (npm create, npx, etc.)
2. Required package installs (npm install ...)
3. Essential env variables needed (just the KEY names, not values)
4. Folder structure (key files/folders to create)
5. First 3 things to do after setup

Format as clear sections with code blocks. Be specific and production-ready. No fluff.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const result =
        data.content
          ?.map((b: { type: string; text?: string }) =>
            b.type === "text" ? b.text : "",
          )
          .join("") || "";
      setOutput(result.trim());
    } catch {
      setOutput("Error generating scaffold. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[180px]">
          <Label className="mb-1.5">Project name</Label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-client-project"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30 font-mono"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <Label className="mb-1.5">Stack</Label>
          <select
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value="nextjs-supabase">Next.js + Supabase</option>
            <option value="nextjs-postgres">Next.js + Postgres</option>
            <option value="nextjs-firebase">Next.js + Firebase</option>
            <option value="react-vite">React + Vite</option>
            <option value="html-css-js">Vanilla HTML/CSS/JS</option>
          </select>
        </div>
      </div>

      <div>
        <Label className="mb-2">Features</Label>
        <div className="flex flex-wrap gap-1.5">
          {FEATURE_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => toggleFeature(f)}
              className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all active:scale-95"
              style={
                features.includes(f)
                  ? {
                      background: "rgba(110,231,183,0.15)",
                      color: "#6ee7b7",
                      border: "1px solid rgba(110,231,183,0.2)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.45)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
              }
            >
              {features.includes(f) ? "✓ " : ""}
              {f}
            </button>
          ))}
        </div>
      </div>

      <PrimaryBtn onClick={generate} disabled={loading || !projectName.trim()}>
        {loading ? (
          <>
            <Spinner />
            Generating scaffold…
          </>
        ) : (
          "⚡ Generate scaffold"
        )}
      </PrimaryBtn>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Scaffold guide</Label>
            <GhostBtn onClick={copy} className="!h-7 !px-3 !text-[11px]">
              {copied ? "✓ Copied" : "Copy all"}
            </GhostBtn>
          </div>
          <div
            className="rounded-xl p-4 text-xs text-white/65 leading-relaxed overflow-auto font-mono whitespace-pre-wrap"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.05)",
              maxHeight: "400px",
            }}
          >
            {output}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tool: Contract Generator ──────────────────────────────────────
function ContractGenerator() {
  const [clientName, setClientName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [value, setValue] = useState("");
  const [timeline, setTimeline] = useState("");
  const [deposit, setDeposit] = useState("50");
  const [type, setType] = useState("contract");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!clientName.trim() || !projectDesc.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Generate a professional freelance ${type} document.

Client name: ${clientName}
Project: ${projectDesc}
Project value: £${value || "TBD"}
Timeline: ${timeline || "TBD"}
Deposit: ${deposit}%
Freelancer: Mahir Ahmed (Mahir Portfolio)
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

${type === "contract" ? `Include: scope of work, payment terms (${deposit}% deposit upfront, remainder on completion), revision policy (2 rounds included), IP ownership (transfers on final payment), kill fee clause (50% if cancelled mid-project), dispute resolution, signatures section.` : ""}
${type === "proposal" ? `Include: executive summary, proposed solution, deliverables, timeline breakdown, investment (with payment schedule), why choose me section, next steps, expiry date (valid 14 days).` : ""}
${type === "invoice" ? `Include: invoice number (INV-${Date.now().toString().slice(-4)}), line items for the project, subtotal, VAT note (not VAT registered), total, payment terms (due within 14 days), bank details placeholder.` : ""}

Write in professional British English. Make it ready to send. Use clear sections and formatting.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const result =
        data.content
          ?.map((b: { type: string; text?: string }) =>
            b.type === "text" ? b.text : "",
          )
          .join("") || "";
      setOutput(result.trim());
    } catch {
      setOutput("Error generating document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-${clientName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(["contract", "proposal", "invoice"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className="h-9 rounded-xl px-4 text-xs font-medium capitalize transition-all active:scale-95"
            style={
              type === t
                ? {
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }
                : {
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid transparent",
                  }
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="mb-1.5">Client name</Label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Acme Ltd"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Project value (£)</Label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="2500"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Timeline</Label>
          <input
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            placeholder="4–6 weeks"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Deposit %</Label>
          <select
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="100">100% upfront</option>
          </select>
        </div>
      </div>

      <div>
        <Label className="mb-1.5">Project description</Label>
        <textarea
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
          placeholder="Design and develop a full-stack e-commerce site with product listings, cart, and Stripe checkout…"
          rows={3}
          className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/25 resize-none"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />
      </div>

      <PrimaryBtn
        onClick={generate}
        disabled={loading || !clientName.trim() || !projectDesc.trim()}
      >
        {loading ? (
          <>
            <Spinner />
            Generating…
          </>
        ) : (
          `✦ Generate ${type}`
        )}
      </PrimaryBtn>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label>Generated {type}</Label>
            <div className="flex gap-2">
              <GhostBtn onClick={copy} className="!h-7 !px-3 !text-[11px]">
                {copied ? "✓ Copied" : "Copy"}
              </GhostBtn>
              <GhostBtn onClick={download} className="!h-7 !px-3 !text-[11px]">
                ↓ Download .txt
              </GhostBtn>
            </div>
          </div>
          <div
            className="rounded-xl p-4 text-xs text-white/65 leading-relaxed overflow-auto whitespace-pre-wrap"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.05)",
              maxHeight: "400px",
            }}
          >
            {output}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tool: Hosting Estimator ───────────────────────────────────────
function HostingEstimator() {
  const [platform, setPlatform] =
    useState<keyof typeof HOSTING_TIERS>("vercel");
  const [traffic, setTraffic] = useState("low");
  const [sites, setSites] = useState(1);

  const tiers = HOSTING_TIERS[platform];

  const getRecommendation = () => {
    if (traffic === "low" && sites <= 2) return 0;
    if (traffic === "medium" || sites <= 5) return 1;
    return 2;
  };

  const rec = getRecommendation();

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <Label className="mb-1.5">Platform</Label>
          <select
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value as keyof typeof HOSTING_TIERS)
            }
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value="vercel">Vercel</option>
            <option value="netlify">Netlify</option>
            <option value="railway">Railway</option>
          </select>
        </div>
        <div>
          <Label className="mb-1.5">Expected traffic</Label>
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value="low">Low (&lt;10k visits/mo)</option>
            <option value="medium">Medium (10k–100k/mo)</option>
            <option value="high">High (100k+/mo)</option>
          </select>
        </div>
        <div>
          <Label className="mb-1.5">Number of sites</Label>
          <input
            type="number"
            min={1}
            max={20}
            value={sites}
            onChange={(e) => setSites(Number(e.target.value))}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>

      {/* Tier comparison */}
      <div className="space-y-2">
        <Label>Plan comparison</Label>
        {tiers.map((tier, i) => {
          const isRec = i === rec;
          return (
            <div
              key={tier.name}
              className="rounded-xl p-4"
              style={{
                background: isRec
                  ? "rgba(110,231,183,0.06)"
                  : "rgba(255,255,255,0.02)",
                border: isRec
                  ? "1px solid rgba(110,231,183,0.2)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">
                    {tier.name}
                  </span>
                  {isRec && (
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: "rgba(110,231,183,0.15)",
                        color: "#6ee7b7",
                      }}
                    >
                      Recommended
                    </span>
                  )}
                </div>
                <span className="text-lg font-bold text-white">
                  {tier.price === 0 ? "Free" : `$${tier.price}/mo`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Builds", value: tier.builds },
                  { label: "Bandwidth", value: tier.bandwidth },
                  {
                    label: platform === "railway" ? "Memory" : "Functions",
                    value: tier.functions,
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-xs font-medium text-white/70 mt-0.5">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost summary */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Label className="mb-2">Monthly cost estimate</Label>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-white">
            {tiers[rec].price === 0
              ? "£0"
              : `£${(tiers[rec].price * sites * 0.79).toFixed(0)}`}
          </span>
          <span className="text-xs text-white/40 mb-1">
            /month · {sites} {sites === 1 ? "site" : "sites"} on{" "}
            {tiers[rec].name}
          </span>
        </div>
        <p className="text-xs text-white/35 mt-1">
          USD converted to GBP approx. Charge your clients £
          {((tiers[rec].price * 0.79 + 5) * 1.5).toFixed(0)}+/mo to cover costs
          + margin.
        </p>
      </div>
    </div>
  );
}

// ── Tool: SEO Audit ───────────────────────────────────────────────
function SEOAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const audit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Perform a detailed SEO audit checklist for the website: ${url}

Based on the URL and what you can infer about the site, provide:

1. **Technical SEO** — likely issues (page speed, mobile, HTTPS, sitemaps, robots.txt)
2. **On-page SEO** — title tags, meta descriptions, heading structure, image alt text
3. **Content** — keyword strategy, content quality signals, thin content risks
4. **Links** — internal linking, backlink building opportunities
5. **Quick wins** — top 3 things to fix immediately for the biggest impact
6. **Tools to use** — specific free tools to audit each area

Be practical and specific. Rate each area: ✅ likely good / ⚠️ needs checking / ❌ common issue for this type of site.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const result =
        data.content
          ?.map((b: { type: string; text?: string }) =>
            b.type === "text" ? b.text : "",
          )
          .join("") || "";
      setOutput(result.trim());
    } catch {
      setOutput("Error running audit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1.5">Website URL</Label>
        <div className="flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && audit()}
            placeholder="https://client-site.com"
            className="flex-1 h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30 font-mono"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
          <PrimaryBtn onClick={audit} disabled={loading || !url.trim()}>
            {loading ? (
              <>
                <Spinner />
                Auditing…
              </>
            ) : (
              "Run audit"
            )}
          </PrimaryBtn>
        </div>
        <p className="text-[11px] text-white/30 mt-1.5">
          AI-powered analysis based on URL + site type. For a full audit also
          run PageSpeed Insights + Screaming Frog.
        </p>
      </div>

      {output && (
        <div
          className="rounded-xl p-4 text-sm text-white/65 leading-relaxed overflow-auto whitespace-pre-wrap"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.05)",
            maxHeight: "480px",
          }}
        >
          {output}
        </div>
      )}
    </div>
  );
}

// ── Tool definitions ──────────────────────────────────────────────
const TOOLS: {
  id: Tool;
  label: string;
  icon: string;
  desc: string;
  accent: string;
}[] = [
  {
    id: "landing",
    label: "Landing Page Generator",
    icon: "⬡",
    desc: "Prompt → full deployable HTML page",
    accent: "rgba(125,211,252,0.15)",
  },
  {
    id: "components",
    label: "Component Library",
    icon: "◈",
    desc: "Save & AI-generate reusable snippets",
    accent: "rgba(196,181,253,0.15)",
  },
  {
    id: "scaffold",
    label: "Project Scaffolder",
    icon: "⚡",
    desc: "Generate boilerplate setup guides",
    accent: "rgba(110,231,183,0.15)",
  },
  {
    id: "contract",
    label: "Contract & Proposals",
    icon: "✦",
    desc: "AI-written contracts, proposals, invoices",
    accent: "rgba(252,211,77,0.15)",
  },
  {
    id: "hosting",
    label: "Hosting Estimator",
    icon: "☁",
    desc: "Compare plans & calculate client costs",
    accent: "rgba(251,146,60,0.15)",
  },
  {
    id: "seo",
    label: "SEO Audit",
    icon: "◎",
    desc: "Quick SEO analysis for any URL",
    accent: "rgba(232,121,249,0.15)",
  },
];

// ── Main Page ─────────────────────────────────────────────────────
export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("landing");
  const active = TOOLS.find((t) => t.id === activeTool)!;

  const renderTool = () => {
    switch (activeTool) {
      case "landing":
        return <LandingPageGenerator />;
      case "components":
        return <ComponentLibrary />;
      case "scaffold":
        return <ProjectScaffolder />;
      case "contract":
        return <ContractGenerator />;
      case "hosting":
        return <HostingEstimator />;
      case "seo":
        return <SEOAudit />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#060e1a] text-white pb-10"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-600/6 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-violet-600/6 blur-[120px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 py-5 lg:px-8 lg:py-7">
        {/* ── Header ── */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.9"
                />
                <rect
                  x="8"
                  y="1"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.5"
                />
                <rect
                  x="1"
                  y="8"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.5"
                />
                <rect
                  x="8"
                  y="8"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                Admin
              </span>
              <h1 className="text-base font-semibold text-white leading-none mt-0.5">
                Dev Tools
              </h1>
            </div>
          </div>
          <a
            href="/admin/leads"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-white/[0.05] px-4 text-xs font-medium text-white/75 hover:bg-white/[0.1] transition-all"
          >
            ← Leads
          </a>
        </div>

        {/* ── Tool picker — horizontal scroll on mobile ── */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 lg:gap-2.5"
          style={{ scrollbarWidth: "none" }}
        >
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="flex flex-col gap-2 rounded-2xl p-4 text-left transition-all active:scale-95 shrink-0 w-44 lg:w-auto"
              style={{
                background:
                  activeTool === tool.id
                    ? tool.accent
                    : "rgba(255,255,255,0.02)",
                border:
                  activeTool === tool.id
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(255,255,255,0.05)",
                boxShadow:
                  activeTool === tool.id
                    ? "0 4px 24px rgba(0,0,0,0.2)"
                    : "none",
              }}
            >
              <span className="text-xl">{tool.icon}</span>
              <div>
                <p className="text-xs font-semibold text-white/90 leading-tight">
                  {tool.label}
                </p>
                <p className="text-[10px] text-white/40 mt-0.5 leading-tight">
                  {tool.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Active tool panel ── */}
        <div
          className="rounded-2xl p-5 lg:p-6"
          style={{
            background: "#0c1929",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="flex items-center gap-3 mb-5 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="text-2xl">{active.icon}</span>
            <div>
              <h2 className="text-base font-semibold text-white">
                {active.label}
              </h2>
              <p className="text-xs text-white/40">{active.desc}</p>
            </div>
          </div>
          {renderTool()}
        </div>
      </div>
    </div>
  );
}
