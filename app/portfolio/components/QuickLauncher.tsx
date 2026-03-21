import { motion } from "framer-motion";
import { QuickKey } from "./QuickKey";

export function QuickLauncher({
  isLight,
  quickMenuOpen,
  setQuickMenuOpen,
}: {
  isLight: boolean;
  quickMenuOpen: boolean;
  setQuickMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => setQuickMenuOpen((open) => !open)}
      initial={false}
      animate={{ x: 0 }}
      className={
        isLight
          ? "fixed bottom-5 left-5 z-50 hidden md:flex items-center gap-3 rounded-full border border-slate-300 bg-white/95 px-4 py-3 shadow-xl shadow-slate-300/40 backdrop-blur"
          : "fixed bottom-5 left-5 z-50 hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-[#0b1422]/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur"
      }
    >
      <span className="text-sm font-semibold">Quick menu</span>
      <QuickKey label={quickMenuOpen ? "ESC" : "Q"} isLight={isLight} />
    </motion.button>
  );
}
