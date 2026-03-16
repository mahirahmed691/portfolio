export function QuickKey({
  label,
  isLight,
}: {
  label: string;
  isLight: boolean;
}) {
  return (
    <span
      className={
        isLight
          ? "rounded-full border border-slate-300 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500"
          : "rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45"
      }
    >
      {label}
    </span>
  );
}
