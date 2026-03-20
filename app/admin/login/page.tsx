"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Incorrect password");
      return;
    }

    window.location.href = "/admin/leads";
  };

  return (
    <div className="min-h-screen bg-[#0b1422] px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-white/40">
          Admin
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
        <p className="mt-3 text-sm leading-7 text-white/65">
          Enter your admin password to view leads.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-password" className="block text-sm text-white/50">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/25"
            />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.98]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
