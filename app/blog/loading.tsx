export default function BlogLoading() {
  return (
    <div className="min-h-screen" style={{ background: "#070d1a" }}>
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="mb-10 h-3 w-24 rounded-full bg-white/5" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="mb-4 h-24 rounded-xl bg-white/5" />
              <div className="mb-2 h-4 w-3/4 rounded-full bg-white/5" />
              <div className="mb-4 h-3 w-full rounded-full bg-white/[0.03]" />
              <div className="h-3 w-1/2 rounded-full bg-white/[0.03]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
