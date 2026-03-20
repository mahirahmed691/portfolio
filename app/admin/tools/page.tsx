"use client";

import { useState, useEffect } from "react";

type Tool =
  | "landing"
  | "components"
  | "scaffold"
  | "contract"
  | "hosting"
  | "seo"
  | "email"
  | "proposal"
  | "quote"
  | "testimonial"
  | "audit"
  | "followup";
type SavedComponent = {
  id: string;
  name: string;
  tag: string;
  code: string;
  createdAt: string;
};

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

const MODEL = "claude-sonnet-4-5";

function ai(body: object) {
  return fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, ...body }),
  }).then((r) => r.json());
}

function extractText(data: { content?: { type: string; text?: string }[] }) {
  return (
    data.content?.map((b) => (b.type === "text" ? b.text : "")).join("") || ""
  );
}

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

function Spinner() {
  return (
    <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <GhostBtn
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="!h-7 !px-3 !text-[11px]"
    >
      {copied ? "✓ Copied" : "Copy"}
    </GhostBtn>
  );
}

// ── Landing Page Generator ────────────────────────────────────────
function LandingPageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("minimal");
  const [palette, setPalette] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedPages, setSavedPages] = useState<
    Array<{ id: string; prompt: string; html: string; createdAt: string }>
  >(() => {
    try {
      return JSON.parse(localStorage.getItem("mahir-tools-history") || "[]");
    } catch {
      return [];
    }
  });
  const [historyOpen, setHistoryOpen] = useState(false);

  // Rebuild blob URL whenever output changes
  useEffect(() => {
    if (!output) {
      setPreviewUrl("");
      return;
    }
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [output]);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");
    setPreview(false);
    try {
      const data = await ai({
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: `Generate a complete, production-ready single-file HTML landing page for: "${prompt}"

Style: ${style} — ${style === "minimal" ? "clean whitespace, sharp type, restrained" : style === "bold" ? "big headlines, strong contrast, energetic" : style === "luxury" ? "elegant, refined, premium" : "technical, monospace, developer-focused"}
Palette: ${palette === "dark" ? "dark background (#0a0a0a), light text" : "light background, dark text"}

Requirements:
- Complete self-contained HTML with embedded CSS + minimal JS
- Google Fonts import for a distinctive font pairing
- Hero, features (3-4), and CTA sections
- Responsive mobile-first, smooth scroll, hover states
- Real compelling copy — no Lorem Ipsum
- No external dependencies except Google Fonts
- Genuinely polished and deployable

Return ONLY raw HTML. No explanation, no markdown, no backticks.`,
          },
        ],
      });
      const html = extractText(data).trim();
      setOutput(html);
      const newEntry = {
        id: Date.now().toString(),
        prompt: prompt.slice(0, 60),
        html,
        createdAt: new Date().toISOString(),
      };
      setSavedPages((prev) => {
        const updated = [newEntry, ...prev].slice(0, 10);
        localStorage.setItem("mahir-tools-history", JSON.stringify(updated));
        return updated;
      });
    } catch {
      setOutput("<!-- Error generating page. Please try again. -->");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([output], { type: "text/html" }));
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `${prompt.slice(0, 30).replace(/\s+/g, "-").toLowerCase()}.html`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
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

      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label>Output</Label>
            <div className="flex gap-2 flex-wrap">
              <GhostBtn
                onClick={() => setPreview((p) => !p)}
                className="!h-8 !px-3 !text-[11px]"
              >
                {preview ? "‹› Code" : "⬡ Preview"}
              </GhostBtn>
              <GhostBtn
                onClick={async () => {
                  await navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="!h-8 !px-3 !text-[11px]"
              >
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
                height: "520px",
              }}
            >
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  title="Preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                  Building preview…
                </div>
              )}
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

      {savedPages.length > 0 && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <button
            onClick={() => setHistoryOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Label>Recent ({savedPages.length})</Label>
            <span className="text-white/30 text-xs">
              {historyOpen ? "▲" : "▼"}
            </span>
          </button>
          {historyOpen && (
            <div className="divide-y divide-white/[0.04]">
              {savedPages.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center justify-between px-4 py-3 gap-3"
                  style={{ background: "rgba(0,0,0,0.15)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 truncate">{page.prompt}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">
                      {new Date(page.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <GhostBtn
                      onClick={() => setOutput(page.html)}
                      className="!h-7 !px-3 !text-[11px]"
                    >
                      Load
                    </GhostBtn>
                    <GhostBtn
                      onClick={() => {
                        setSavedPages((prev) => {
                          const updated = prev.filter((p) => p.id !== page.id);
                          localStorage.setItem(
                            "mahir-tools-history",
                            JSON.stringify(updated),
                          );
                          return updated;
                        });
                      }}
                      className="!h-7 !px-3 !text-[11px] hover:!text-red-400"
                    >
                      Delete
                    </GhostBtn>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Component Library ─────────────────────────────────────────────
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
    const updated = [
      {
        id: Date.now().toString(),
        name,
        tag,
        code,
        createdAt: new Date().toISOString(),
      },
      ...components,
    ];
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
      const data = await ai({
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `Generate a reusable React/TSX component for: "${genPrompt}"\n\nRequirements:\n- Tailwind CSS\n- TypeScript with proper prop types\n- Clean, production-ready, default export\n- No deps beyond React + Tailwind\n\nReturn ONLY raw component code. No explanation, no backticks.`,
          },
        ],
      });
      setCode(extractText(data).trim());
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

// ── Project Scaffolder ────────────────────────────────────────────
function ProjectScaffolder() {
  const [projectName, setProjectName] = useState("");
  const [stack, setStack] = useState("nextjs-supabase");
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const FEATURES = [
    "Authentication (Supabase Auth)",
    "Stripe payments",
    "Email (Resend)",
    "SMS (Twilio)",
    "Admin dashboard",
    "Blog / CMS",
    "API routes",
    "Dark mode",
  ];
  const toggle = (f: string) =>
    setFeatures((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  const generate = async () => {
    if (!projectName.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const data = await ai({
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `Generate a complete project scaffolding guide for "${projectName}".\n\nStack: ${stack}\nFeatures: ${features.length > 0 ? features.join(", ") : "basic setup only"}\n\nProvide:\n1. Exact terminal commands\n2. npm install commands\n3. Required env variable names\n4. Key folder structure\n5. First 3 things to do after setup\n\nFormat with code blocks. Be specific and production-ready.`,
          },
        ],
      });
      setOutput(extractText(data).trim());
    } catch {
      setOutput("Error generating scaffold. Please try again.");
    } finally {
      setLoading(false);
    }
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
          {FEATURES.map((f) => (
            <button
              key={f}
              onClick={() => toggle(f)}
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
            <GhostBtn
              onClick={async () => {
                await navigator.clipboard.writeText(output);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="!h-7 !px-3 !text-[11px]"
            >
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

// ── Contract Generator ────────────────────────────────────────────
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
      const data = await ai({
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `Generate a professional freelance ${type} document.\n\nClient: ${clientName}\nProject: ${projectDesc}\nValue: £${value || "TBD"}\nTimeline: ${timeline || "TBD"}\nDeposit: ${deposit}%\nFreelancer: Mahir Ahmed\nDate: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}\n\n${type === "contract" ? `Include: scope, payment terms (${deposit}% upfront), 2 revision rounds, IP ownership on final payment, 50% kill fee, dispute resolution, signatures.` : ""}${type === "proposal" ? "Include: executive summary, solution, deliverables, timeline, investment, why me, next steps, valid 14 days." : ""}${type === "invoice" ? `Include: invoice INV-${Date.now().toString().slice(-4)}, line items, total, VAT note (not registered), payment due 14 days, bank details placeholder.` : ""}\n\nProfessional British English. Ready to send.`,
          },
        ],
      });
      setOutput(extractText(data).trim());
    } catch {
      setOutput("Error generating document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([output], { type: "text/plain" })),
      download: `${type}-${clientName.replace(/\s+/g, "-").toLowerCase()}.txt`,
    });
    a.click();
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
        {[
          {
            label: "Client name",
            value: clientName,
            set: setClientName,
            placeholder: "Acme Ltd",
          },
          {
            label: "Project value (£)",
            value,
            set: setValue,
            placeholder: "2500",
          },
          {
            label: "Timeline",
            value: timeline,
            set: setTimeline,
            placeholder: "4–6 weeks",
          },
        ].map(({ label, value: v, set, placeholder }) => (
          <div key={label}>
            <Label className="mb-1.5">{label}</Label>
            <input
              value={v}
              onChange={(e) => set(e.target.value)}
              placeholder={placeholder}
              className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            />
          </div>
        ))}
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
          placeholder="Design and develop a full-stack e-commerce site…"
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
              <GhostBtn
                onClick={async () => {
                  await navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="!h-7 !px-3 !text-[11px]"
              >
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

// ── Hosting Estimator ─────────────────────────────────────────────
function HostingEstimator() {
  const [platform, setPlatform] =
    useState<keyof typeof HOSTING_TIERS>("vercel");
  const [traffic, setTraffic] = useState("low");
  const [sites, setSites] = useState(1);

  const tiers = HOSTING_TIERS[platform];
  const rec = Math.min(
    traffic === "low" && sites <= 2
      ? 0
      : traffic === "medium" || sites <= 5
        ? 1
        : 2,
    tiers.length - 1,
  );

  return (
    <div className="space-y-5">
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
            <option value="low">Low (&lt;10k/mo)</option>
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
      <div className="space-y-2">
        <Label>Plan comparison</Label>
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            className="rounded-xl p-4"
            style={{
              background:
                i === rec ? "rgba(110,231,183,0.06)" : "rgba(255,255,255,0.02)",
              border:
                i === rec
                  ? "1px solid rgba(110,231,183,0.2)"
                  : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {tier.name}
                </span>
                {i === rec && (
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
        ))}
      </div>
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
          Charge clients £{((tiers[rec].price * 0.79 + 5) * 1.5).toFixed(0)}+/mo
          to cover costs + margin.
        </p>
      </div>
    </div>
  );
}

// ── SEO Audit ─────────────────────────────────────────────────────
function SEOAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const audit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const data = await ai({
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `Perform a detailed SEO audit for: ${url}\n\nProvide:\n1. **Technical SEO** — page speed, mobile, HTTPS, sitemaps, robots.txt\n2. **On-page SEO** — title tags, meta descriptions, headings, alt text\n3. **Content** — keyword strategy, quality signals, thin content risks\n4. **Links** — internal linking, backlink opportunities\n5. **Quick wins** — top 3 fixes for biggest impact\n6. **Tools** — specific free tools for each area\n\nRate each: ✅ likely good / ⚠️ needs checking / ❌ common issue for this type of site.`,
          },
        ],
      });
      setOutput(extractText(data).trim());
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
          AI analysis based on URL + site type. Also run PageSpeed Insights +
          Screaming Frog for a full audit.
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

// ── Email Copy Writer ─────────────────────────────────────────────
function EmailCopyWriter() {
  const [tone, setTone] = useState("Friendly");
  const [type, setType] = useState("Follow-up");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const data = await ai({
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `Write a ${tone} ${type} email for a freelance web developer. Context: ${context}. Write the subject line first on its own line prefixed with 'Subject:', then the email body. Keep it concise, no more than 150 words for the body.`,
          },
        ],
      });
      setOutput(extractText(data).trim());
    } catch {
      setOutput("Error generating email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[140px]">
          <Label className="mb-1.5">Tone</Label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Bold</option>
          </select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <Label className="mb-1.5">Type</Label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>Cold outreach</option>
            <option>Follow-up</option>
            <option>Proposal</option>
            <option>Thank you</option>
            <option>Re-engagement</option>
          </select>
        </div>
      </div>
      <div>
        <Label className="mb-1.5">Brief context about the client or project</Label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. Spoke to Sarah at Bloom Studio last week, she needs a new e-commerce site by Q2…"
          rows={3}
          className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/25 resize-none"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />
      </div>
      <PrimaryBtn onClick={generate} disabled={loading || !context.trim()}>
        {loading ? (
          <>
            <Spinner /> Generating…
          </>
        ) : (
          "✦ Generate email"
        )}
      </PrimaryBtn>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Generated email</Label>
            <CopyBtn text={output} />
          </div>
          <div
            className="rounded-xl p-4 text-sm text-white/75 leading-relaxed overflow-auto whitespace-pre-wrap"
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

// ── Proposal Writer ───────────────────────────────────────────────
function ProposalWriter() {
  const [clientName, setClientName] = useState("");
  const [projectType, setProjectType] = useState("Landing page");
  const [budget, setBudget] = useState("£500–£1,000");
  const [timeline, setTimeline] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!clientName.trim() || !requirements.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const data = await ai({
        max_tokens: 2500,
        messages: [
          {
            role: "user",
            content: `Write a professional project proposal for a freelance web developer. Client: ${clientName}. Project: ${projectType}. Budget: ${budget}. Timeline: ${timeline || "TBD"}. Requirements: ${requirements}. Include: Executive Summary, Scope of Work, Deliverables, Timeline breakdown, Investment, Next Steps. Keep it professional but warm.`,
          },
        ],
      });
      setOutput(extractText(data).trim());
    } catch {
      setOutput("Error generating proposal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([output], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `proposal-${clientName.replace(/\s+/g, "-").toLowerCase()}.txt`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
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
          <Label className="mb-1.5">Project type</Label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>Landing page</option>
            <option>Business website</option>
            <option>E-commerce</option>
            <option>Web app</option>
            <option>Design refresh</option>
          </select>
        </div>
        <div>
          <Label className="mb-1.5">Budget range</Label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>£500–£1,000</option>
            <option>£1,000–£2,500</option>
            <option>£2,500–£5,000</option>
            <option>£5,000–£10,000</option>
            <option>£10,000+</option>
          </select>
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
      </div>
      <div>
        <Label className="mb-1.5">Key requirements</Label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="e.g. Booking system, multilingual support, Stripe payments, mobile-first design…"
          rows={3}
          className="w-full rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/25 resize-none"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        />
      </div>
      <PrimaryBtn
        onClick={generate}
        disabled={loading || !clientName.trim() || !requirements.trim()}
      >
        {loading ? (
          <>
            <Spinner /> Generating…
          </>
        ) : (
          "✦ Generate proposal"
        )}
      </PrimaryBtn>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label>Generated proposal</Label>
            <div className="flex gap-2">
              <GhostBtn
                onClick={async () => {
                  await navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="!h-7 !px-3 !text-[11px]"
              >
                {copied ? "✓ Copied" : "Copy"}
              </GhostBtn>
              <GhostBtn onClick={download} className="!h-7 !px-3 !text-[11px]">
                ↓ Download .txt
              </GhostBtn>
            </div>
          </div>
          <pre
            className="rounded-xl p-4 text-xs text-white/65 leading-relaxed overflow-auto whitespace-pre-wrap font-mono"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.05)",
              maxHeight: "480px",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Website Audit ─────────────────────────────────────────────────
type AuditResult = {
  url: string;
  responseTime: number;
  statusCode: number;
  checks: {
    hasTitle: boolean;
    titleLength: number | null;
    titleText: string | null;
    hasMetaDescription: boolean;
    metaDescriptionLength: number | null;
    hasViewportMeta: boolean;
    isHttps: boolean;
    hasH1: boolean;
    h1Count: number;
    imagesWithoutAlt: number;
    hasOpenGraph: boolean;
    hasCanonical: boolean;
  };
  score: number;
  issues: string[];
  suggestions: string[];
};

function WebsiteAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [reportCopied, setReportCopied] = useState(false);
  const [pitchCopied, setPitchCopied] = useState(false);

  const runAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Audit failed");
      } else {
        setResult(data as AuditResult);
      }
    } catch {
      setError("Network error — could not reach the audit API");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s: number) =>
    s >= 80 ? "#4ade80" : s >= 60 ? "#fbbf24" : "#f87171";

  const copyReport = async () => {
    if (!result) return;
    const domain = (() => {
      try {
        return new URL(result.url).hostname;
      } catch {
        return result.url;
      }
    })();
    const lines = [
      `Website Audit Report — ${domain}`,
      `Score: ${result.score}/100`,
      `Status: ${result.statusCode}  |  Response: ${result.responseTime}ms`,
      "",
      "Checks:",
      `  ${result.checks.isHttps ? "✓" : "✗"} HTTPS`,
      `  ${result.checks.hasTitle ? "✓" : "✗"} Title tag${result.checks.titleLength ? ` (${result.checks.titleLength} chars)` : ""}`,
      `  ${result.checks.hasMetaDescription ? "✓" : "✗"} Meta description${result.checks.metaDescriptionLength ? ` (${result.checks.metaDescriptionLength} chars)` : ""}`,
      `  ${result.checks.hasViewportMeta ? "✓" : "✗"} Viewport meta`,
      `  ${result.checks.hasH1 ? "✓" : "✗"} H1 tag (${result.checks.h1Count} found)`,
      `  ${result.checks.imagesWithoutAlt === 0 ? "✓" : "✗"} Image alt text (${result.checks.imagesWithoutAlt} missing)`,
      `  ${result.checks.hasOpenGraph ? "✓" : "✗"} Open Graph tags`,
      `  ${result.checks.hasCanonical ? "✓" : "✗"} Canonical tag`,
      "",
      ...(result.issues.length > 0
        ? ["Issues:", ...result.issues.map((i) => `  • ${i}`), ""]
        : []),
      ...(result.suggestions.length > 0
        ? [
            "Suggestions:",
            ...result.suggestions.map((s) => `  • ${s}`),
            "",
          ]
        : []),
      `Audited by Mahir Ahmed — ${new Date().toLocaleDateString("en-GB")}`,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 1800);
  };

  const copyPitch = async () => {
    if (!result) return;
    const domain = (() => {
      try {
        return new URL(result.url).hostname;
      } catch {
        return result.url;
      }
    })();
    const pitch = `Hi ${domain} team,\n\nI ran a quick audit on ${result.url} and found ${result.issues.length} issue${result.issues.length !== 1 ? "s" : ""} that could be hurting your rankings and conversions. I specialise in fixing exactly these problems — want me to send you the full report?\n\n- Mahir`;
    await navigator.clipboard.writeText(pitch);
    setPitchCopied(true);
    setTimeout(() => setPitchCopied(false), 1800);
  };

  type BoolCheck = {
    pass: boolean;
    label: string;
  };
  const CHECK_ROWS: BoolCheck[] = result
    ? [
        { pass: result.checks.isHttps, label: "HTTPS" },
        {
          pass: result.checks.hasTitle,
          label: `Title tag${result.checks.titleLength ? ` (${result.checks.titleLength} chars)` : ""}`,
        },
        {
          pass: result.checks.hasMetaDescription,
          label: `Meta description${result.checks.metaDescriptionLength ? ` (${result.checks.metaDescriptionLength} chars)` : ""}`,
        },
        { pass: result.checks.hasViewportMeta, label: "Viewport meta tag" },
        {
          pass: result.checks.hasH1,
          label: `H1 tag (${result.checks.h1Count} found)`,
        },
        {
          pass: result.checks.imagesWithoutAlt === 0,
          label: `Images with alt text (${result.checks.imagesWithoutAlt} missing)`,
        },
        { pass: result.checks.hasOpenGraph, label: "Open Graph tags" },
        { pass: result.checks.hasCanonical, label: "Canonical URL" },
      ]
    : [];

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1.5">URL to audit</Label>
        <div className="flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runAudit()}
            placeholder="https://"
            className="flex-1 h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30 font-mono"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
          <PrimaryBtn onClick={runAudit} disabled={loading || !url.trim()}>
            {loading ? (
              <>
                <Spinner /> Auditing...
              </>
            ) : (
              "Run audit"
            )}
          </PrimaryBtn>
        </div>
      </div>

      {error && (
        <div
          className="rounded-xl px-4 py-3 text-xs"
          style={{
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            color: "#f87171",
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Score + meta row */}
          <div className="flex items-center gap-4 flex-wrap">
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: 72,
                height: 72,
                background: `rgba(${scoreColor(result.score) === "#4ade80" ? "74,222,128" : scoreColor(result.score) === "#fbbf24" ? "251,191,36" : "248,113,113"},0.1)`,
                border: `2px solid ${scoreColor(result.score)}`,
                flexShrink: 0,
              }}
            >
              <span
                className="text-2xl font-bold"
                style={{ color: scoreColor(result.score) }}
              >
                {result.score}
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-white">
                Score: {result.score}/100
              </p>
              <p className="text-xs text-white/45">
                HTTP {result.statusCode} · {result.responseTime}ms response
              </p>
              <p className="text-[11px] font-mono text-white/30 truncate max-w-xs">
                {result.url}
              </p>
            </div>
          </div>

          {/* Checks */}
          <div
            className="rounded-xl p-4 space-y-2"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Label className="mb-2">Checks</Label>
            {CHECK_ROWS.map(({ pass, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="text-xs font-bold w-4 text-center shrink-0"
                  style={{ color: pass ? "#4ade80" : "#f87171" }}
                >
                  {pass ? "✓" : "✗"}
                </span>
                <span className="text-xs text-white/65">{label}</span>
              </div>
            ))}
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div
              className="rounded-xl p-4 space-y-1.5"
              style={{
                background: "rgba(248,113,113,0.06)",
                border: "1px solid rgba(248,113,113,0.15)",
              }}
            >
              <Label className="mb-2">Issues ({result.issues.length})</Label>
              {result.issues.map((issue, i) => (
                <p key={i} className="text-xs" style={{ color: "#fca5a5" }}>
                  · {issue}
                </p>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div
              className="rounded-xl p-4 space-y-1.5"
              style={{
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.15)",
              }}
            >
              <Label className="mb-2">Suggestions</Label>
              {result.suggestions.map((s, i) => (
                <p key={i} className="text-xs" style={{ color: "#86efac" }}>
                  · {s}
                </p>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <GhostBtn onClick={copyReport} className="!h-8 !px-3 !text-[11px]">
              {reportCopied ? "✓ Report copied" : "Copy report"}
            </GhostBtn>
            <GhostBtn onClick={copyPitch} className="!h-8 !px-3 !text-[11px]">
              {pitchCopied ? "✓ Pitch copied" : "Use as cold outreach"}
            </GhostBtn>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Lead Follow-up Email ───────────────────────────────────────────
type FollowupEntry = {
  id: string;
  clientName: string;
  projectType: string;
  days: number;
  tone: string;
  output: string;
  createdAt: string;
};

function LeadFollowup() {
  const [clientName, setClientName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [days, setDays] = useState(7);
  const [tone, setTone] = useState("Warm");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState<FollowupEntry[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("mahir-followup-history") || "[]",
      );
    } catch {
      return [];
    }
  });
  const [historyOpen, setHistoryOpen] = useState(false);

  const generate = async () => {
    if (!clientName.trim() || !projectType.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const data = await ai({
        max_tokens: 400,
        messages: [
          {
            role: "user",
            content: `Write a short, professional follow-up email from Mahir Ahmed (freelance web developer, Manchester) to ${clientName} who enquired about ${projectType} ${days} days ago. Tone: ${tone}. Keep it under 100 words. No subject line. Sign off as Mahir.`,
          },
        ],
      });
      const text = extractText(data).trim();
      setOutput(text);
      const entry: FollowupEntry = {
        id: Date.now().toString(),
        clientName,
        projectType,
        days,
        tone,
        output: text,
        createdAt: new Date().toISOString(),
      };
      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, 10);
        localStorage.setItem(
          "mahir-followup-history",
          JSON.stringify(updated),
        );
        return updated;
      });
    } catch {
      setOutput("Error generating follow-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="mb-1.5">Client name</Label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Sarah at Bloom Studio"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Project type</Label>
          <input
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            placeholder="e-commerce website"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Days since last contact</Label>
          <input
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Tone</Label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>Warm</option>
            <option>Direct</option>
            <option>Last chance</option>
          </select>
        </div>
      </div>

      <PrimaryBtn
        onClick={generate}
        disabled={loading || !clientName.trim() || !projectType.trim()}
      >
        {loading ? (
          <>
            <Spinner /> Generating…
          </>
        ) : (
          "✦ Generate follow-up"
        )}
      </PrimaryBtn>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Generated email</Label>
            <CopyBtn text={output} />
          </div>
          <div
            className="rounded-xl p-4 text-sm text-white/75 leading-relaxed overflow-auto whitespace-pre-wrap"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.05)",
              maxHeight: "320px",
            }}
          >
            {output}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <button
            onClick={() => setHistoryOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Label>History ({history.length})</Label>
            <span className="text-white/30 text-xs">
              {historyOpen ? "▲" : "▼"}
            </span>
          </button>
          {historyOpen && (
            <div className="divide-y divide-white/[0.04]">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between px-4 py-3 gap-3"
                  style={{ background: "rgba(0,0,0,0.15)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 truncate">
                      {entry.clientName} · {entry.projectType}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5">
                      {entry.tone} · {entry.days}d ·{" "}
                      {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <GhostBtn
                      onClick={() => setOutput(entry.output)}
                      className="!h-7 !px-3 !text-[11px]"
                    >
                      Load
                    </GhostBtn>
                    <GhostBtn
                      onClick={() => {
                        setHistory((prev) => {
                          const updated = prev.filter((e) => e.id !== entry.id);
                          localStorage.setItem(
                            "mahir-followup-history",
                            JSON.stringify(updated),
                          );
                          return updated;
                        });
                      }}
                      className="!h-7 !px-3 !text-[11px] hover:!text-red-400"
                    >
                      Delete
                    </GhostBtn>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Quick Quote Generator ─────────────────────────────────────────
const QUOTE_FEATURES: { label: string; price: number; included?: boolean }[] =
  [
    { label: "Contact form", price: 50 },
    { label: "CMS / editable content", price: 200 },
    { label: "Animations & interactions", price: 150 },
    { label: "Blog / news section", price: 200 },
    { label: "E-commerce / payments", price: 500 },
    { label: "SEO optimisation", price: 150 },
    { label: "Mobile-first design", price: 0, included: true },
    { label: "Custom illustrations", price: 300 },
    { label: "Speed optimisation", price: 100 },
  ];

function calcQuote(
  projectType: string,
  pages: number,
  selectedFeatures: string[],
  timeline: string,
  depositPct: number,
) {
  const basePrices: Record<string, number> = {
    "Landing page": 500,
    "Multi-page website": 500 + Math.max(0, pages - 1) * 200,
    "E-commerce": 1500,
    "Web app": 3000,
    Redesign: 800,
  };
  const base = basePrices[projectType] ?? 500;
  const featureTotal = QUOTE_FEATURES.filter(
    (f) => !f.included && selectedFeatures.includes(f.label),
  ).reduce((sum, f) => sum + f.price, 0);
  const subtotal = base + featureTotal;
  const rushFee =
    timeline === "ASAP (rush +20%)" ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal + rushFee;
  const deposit = Math.round(total * (depositPct / 100));
  return { base, featureTotal, subtotal, rushFee, total, deposit };
}

function buildQuoteText(
  clientName: string,
  projectType: string,
  pages: number,
  selectedFeatures: string[],
  timeline: string,
  depositPct: number,
): string {
  const { base, featureTotal, subtotal, rushFee, total, deposit } = calcQuote(
    projectType,
    pages,
    selectedFeatures,
    timeline,
    depositPct,
  );
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const featureLines = selectedFeatures
    .map((f) => {
      const feat = QUOTE_FEATURES.find((q) => q.label === f);
      if (!feat) return "";
      return feat.included
        ? `  • ${feat.label} — included`
        : `  • ${feat.label} — +£${feat.price.toLocaleString()}`;
    })
    .filter(Boolean)
    .join("\n");

  const timelineLabel =
    timeline === "ASAP (rush +20%)"
      ? "ASAP (approx. 1–2 weeks)"
      : timeline === "2-4 weeks (standard)"
        ? "2–4 weeks"
        : "1–2 months";

  return `QUOTE FOR ${clientName.toUpperCase()}
Date: ${today}
Valid for: 14 days

PROJECT: ${projectType}${["Multi-page website", "E-commerce"].includes(projectType) ? ` (${pages} page${pages !== 1 ? "s" : ""})` : ""}
${featureLines ? `FEATURES SELECTED:\n${featureLines}\n` : ""}
BASE PRICE: £${base.toLocaleString()}
FEATURES: £${featureTotal.toLocaleString()}
SUBTOTAL: £${subtotal.toLocaleString()}${rushFee > 0 ? `\nRUSH FEE (20%): £${rushFee.toLocaleString()}` : ""}
TOTAL: £${total.toLocaleString()}
DEPOSIT (${depositPct}%): £${deposit.toLocaleString()}

Timeline: ${timelineLabel}
Includes: 2 rounds of revisions

To proceed, reply to this email or book a call at calendly.com/mahirahmed691

— Mahir Ahmed | mahirahmed.co.uk`;
}

function QuickQuoteGenerator() {
  const [clientName, setClientName] = useState("");
  const [projectType, setProjectType] = useState("Landing page");
  const [pages, setPages] = useState(3);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("2-4 weeks (standard)");
  const [depositPct, setDepositPct] = useState(50);
  const [quote, setQuote] = useState("");
  const [copied, setCopied] = useState(false);

  const showPages = ["Multi-page website", "E-commerce"].includes(projectType);

  const toggleFeature = (label: string) =>
    setSelectedFeatures((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label],
    );

  const generate = () => {
    if (!clientName.trim()) return;
    const text = buildQuoteText(
      clientName,
      projectType,
      pages,
      selectedFeatures,
      timeline,
      depositPct,
    );
    setQuote(text);

    const entry = {
      id: Date.now().toString(),
      clientName: clientName.slice(0, 60),
      projectType,
      total: calcQuote(
        projectType,
        pages,
        selectedFeatures,
        timeline,
        depositPct,
      ).total,
      text,
      createdAt: new Date().toISOString(),
    };
    const prev: typeof entry[] = (() => {
      try {
        return JSON.parse(
          localStorage.getItem("mahir-quotes-history") || "[]",
        );
      } catch {
        return [];
      }
    })();
    localStorage.setItem(
      "mahir-quotes-history",
      JSON.stringify([entry, ...prev].slice(0, 10)),
    );
  };

  const downloadTxt = () => {
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([quote], { type: "text/plain" })),
      download: `quote-${clientName.replace(/\s+/g, "-").toLowerCase()}.txt`,
    });
    a.click();
  };

  const { base, featureTotal, subtotal, rushFee, total, deposit } = calcQuote(
    projectType,
    pages,
    selectedFeatures,
    timeline,
    depositPct,
  );

  return (
    <div className="space-y-5">
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
          <Label className="mb-1.5">Project type</Label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>Landing page</option>
            <option>Multi-page website</option>
            <option>E-commerce</option>
            <option>Web app</option>
            <option>Redesign</option>
          </select>
        </div>
        {showPages && (
          <div>
            <Label className="mb-1.5">Number of pages (1–20)</Label>
            <input
              type="number"
              min={1}
              max={20}
              value={pages}
              onChange={(e) =>
                setPages(Math.min(20, Math.max(1, Number(e.target.value))))
              }
              className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            />
          </div>
        )}
        <div>
          <Label className="mb-1.5">Timeline</Label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>ASAP (rush +20%)</option>
            <option>2-4 weeks (standard)</option>
            <option>1-2 months (no rush)</option>
          </select>
        </div>
        <div>
          <Label className="mb-1.5">Deposit %</Label>
          <select
            value={depositPct}
            onChange={(e) => setDepositPct(Number(e.target.value))}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option value={25}>25%</option>
            <option value={50}>50%</option>
          </select>
        </div>
      </div>

      <div>
        <Label className="mb-2">Features</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUOTE_FEATURES.map((f) => {
            const checked = f.included || selectedFeatures.includes(f.label);
            return (
              <label
                key={f.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-all"
                style={{
                  background: checked
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(255,255,255,0.02)",
                  border: checked
                    ? "1px solid rgba(16,185,129,0.2)"
                    : "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!!f.included}
                  onChange={() => !f.included && toggleFeature(f.label)}
                  className="accent-emerald-400"
                />
                <span className="text-xs text-white/80 flex-1">{f.label}</span>
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color: f.included ? "#6ee7b7" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {f.included ? "included" : f.price > 0 ? `+£${f.price}` : ""}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div
        className="rounded-xl px-4 py-3 flex flex-wrap gap-4"
        style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.15)",
        }}
      >
        {[
          { label: "Base", value: `£${base.toLocaleString()}` },
          { label: "Features", value: `£${featureTotal.toLocaleString()}` },
          ...(rushFee > 0
            ? [{ label: "Rush fee", value: `£${rushFee.toLocaleString()}` }]
            : []),
          { label: "Total", value: `£${total.toLocaleString()}` },
          {
            label: `Deposit (${depositPct}%)`,
            value: `£${deposit.toLocaleString()}`,
          },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] text-white/35 uppercase tracking-wider">
              {label}
            </p>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <PrimaryBtn onClick={generate} disabled={!clientName.trim()}>
        ✦ Generate quote
      </PrimaryBtn>

      {quote && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label>Quote</Label>
            <div className="flex gap-2 flex-wrap">
              <GhostBtn
                onClick={async () => {
                  await navigator.clipboard.writeText(quote);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="!h-7 !px-3 !text-[11px]"
              >
                {copied ? "✓ Copied" : "Copy quote"}
              </GhostBtn>
              <GhostBtn
                onClick={downloadTxt}
                className="!h-7 !px-3 !text-[11px]"
              >
                ↓ Download .txt
              </GhostBtn>
            </div>
          </div>
          <pre
            className="rounded-xl p-4 text-xs text-white/70 leading-relaxed overflow-auto whitespace-pre-wrap font-mono"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(16,185,129,0.12)",
              maxHeight: "480px",
            }}
          >
            {quote}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Testimonial Request Tool ───────────────────────────────────────
function TestimonialRequestTool() {
  const [clientName, setClientName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!clientName.trim() || !projectDesc.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const data = await ai({
        max_tokens: 400,
        messages: [
          {
            role: "user",
            content: `Write a short, warm email from Mahir Ahmed asking ${clientName} for a testimonial/review on ${platform} about the ${projectDesc} work. Make it easy for them — tell them 2-3 things they could mention (results, working style, quality). Under 120 words. Sign off as Mahir. Email only, no subject line.`,
          },
        ],
      });
      setOutput(extractText(data).trim());
    } catch {
      setOutput("Error generating request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="mb-1.5">Client name</Label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Sarah at Bloom Studio"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
        <div>
          <Label className="mb-1.5">Platform</Label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <option>LinkedIn</option>
            <option>Google</option>
            <option>Both</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label className="mb-1.5">What you built for them</Label>
          <input
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            placeholder="e.g. e-commerce site with custom CMS"
            className="w-full h-9 rounded-xl bg-white/[0.05] px-3 text-xs text-white outline-none placeholder:text-white/30"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>
      <PrimaryBtn
        onClick={generate}
        disabled={loading || !clientName.trim() || !projectDesc.trim()}
      >
        {loading ? (
          <>
            <Spinner /> Generating…
          </>
        ) : (
          "✦ Generate request"
        )}
      </PrimaryBtn>
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Generated email</Label>
            <CopyBtn text={output} />
          </div>
          <div
            className="rounded-xl p-4 text-sm text-white/75 leading-relaxed overflow-auto whitespace-pre-wrap"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(139,92,246,0.15)",
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
  {
    id: "email",
    label: "Email Copy Writer",
    icon: "✉",
    desc: "AI-written cold outreach & follow-ups",
    accent: "rgba(251,146,60,0.15)",
  },
  {
    id: "proposal",
    label: "Proposal Writer",
    icon: "📄",
    desc: "Full project proposals in seconds",
    accent: "rgba(134,239,172,0.15)",
  },
  {
    id: "audit",
    label: "Website Audit",
    icon: "◉",
    desc: "SEO & tech audit for any URL",
    accent: "rgba(6,182,212,0.15)",
  },
  {
    id: "followup",
    label: "Lead Follow-up",
    icon: "↩",
    desc: "AI follow-up emails for cold leads",
    accent: "rgba(245,158,11,0.15)",
  },
  {
    id: "quote",
    label: "Quick Quote",
    icon: "£",
    desc: "Instant scoped quote to send clients",
    accent: "rgba(16,185,129,0.15)",
  },
  {
    id: "testimonial",
    label: "Testimonial Request",
    icon: "★",
    desc: "Send polished review requests",
    accent: "rgba(139,92,246,0.15)",
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
      case "email":
        return <EmailCopyWriter />;
      case "proposal":
        return <ProposalWriter />;
      case "audit":
        return <WebsiteAudit />;
      case "followup":
        return <LeadFollowup />;
      case "quote":
        return <QuickQuoteGenerator />;
      case "testimonial":
        return <TestimonialRequestTool />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#060e1a] text-white pb-10"
      
    >
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

        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-12 lg:gap-2.5"
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
