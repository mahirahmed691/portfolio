"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin/leads", label: "Leads", icon: "◈" },
  { href: "/admin/invoices", label: "Invoices", icon: "◧" },
  { href: "/admin/maintenance", label: "Maintenance", icon: "◉" },
  { href: "/admin/referrals", label: "Referrals", icon: "◎" },
  { href: "/admin/analytics", label: "Analytics", icon: "◬" },
  { href: "/admin/tools", label: "Dev Tools", icon: "⌥" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#060e1a] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-600/6 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-violet-600/6 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-600/5 blur-[80px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Sidebar (desktop) ─────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[200px] z-20 shrink-0"
        style={{
          background: "rgba(6,14,26,0.95)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.9" />
                <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.5" />
                <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.5" />
                <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 leading-none">Admin</p>
              <p className="text-sm font-semibold text-white leading-none mt-0.5">Mahir Ahmed</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all"
                style={
                  active
                    ? {
                        background: "rgba(255,255,255,0.08)",
                        color: "white",
                        boxShadow: "0 0 0 1px rgba(255,255,255,0.07)",
                      }
                    : {
                        color: "rgba(255,255,255,0.45)",
                      }
                }
              >
                <span className="text-base leading-none" style={{ width: 18, textAlign: "center" }}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <span>↗</span>
            <span>View site</span>
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
              window.location.href = "/admin/login";
            }}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors text-left"
          >
            <span>⏻</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile top nav ─────────────────────────────────────────── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(6,14,26,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-md bg-white/10 flex items-center justify-center"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.9" />
              <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.5" />
              <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.5" />
              <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Admin</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                style={
                  active
                    ? { background: "rgba(255,255,255,0.1)", color: "white" }
                    : { color: "rgba(255,255,255,0.4)" }
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 lg:ml-[200px] pt-[52px] lg:pt-0">
        {children}
      </main>
    </div>
  );
}
