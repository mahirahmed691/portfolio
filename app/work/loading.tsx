export default function WorkLoading() {
  return (
    <div className="min-h-screen" style={{ background: "#070d1a" }}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 animate-pulse">
        <div className="mb-10 h-3 w-40 rounded-full bg-white/5" />
        <div className="mb-4 h-10 w-2/3 rounded-full bg-white/5" />
        <div className="mb-8 h-4 w-1/2 rounded-full bg-white/[0.03]" />
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-7 w-16 rounded-lg bg-white/5" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 rounded-full bg-white/[0.03]" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
