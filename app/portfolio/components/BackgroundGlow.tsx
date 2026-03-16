import { motion } from "framer-motion";
import type { SharedProps } from "../types";

export function BackgroundGlow({
  isLight,
  focusMode,
  isMobile,
  shouldReduceMotion,
}: Pick<
  SharedProps,
  "isLight" | "focusMode" | "isMobile" | "shouldReduceMotion"
>) {
  const floatingAnimation =
    shouldReduceMotion || isMobile || focusMode
      ? { opacity: 0.14 }
      : { y: [0, 18, 0], x: [0, 10, 0] };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={floatingAnimation}
        transition={
          shouldReduceMotion || isMobile || focusMode
            ? { duration: 0 }
            : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
        className={`absolute left-[-10%] top-[-6%] h-[26rem] w-[26rem] rounded-full blur-3xl ${
          isLight ? "bg-fuchsia-300/25" : "bg-fuchsia-500/20"
        }`}
      />
      <motion.div
        animate={
          shouldReduceMotion || isMobile || focusMode
            ? { opacity: 0.12 }
            : { y: [0, -20, 0], x: [0, -12, 0] }
        }
        transition={
          shouldReduceMotion || isMobile || focusMode
            ? { duration: 0 }
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
        className={`absolute right-[-8%] top-[10%] h-[22rem] w-[22rem] rounded-full blur-3xl ${
          isLight ? "bg-cyan-300/25" : "bg-cyan-400/20"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isLight
            ? "bg-[linear-gradient(to_bottom,rgba(247,243,238,0.6),rgba(247,243,238,0.95))]"
            : "bg-[linear-gradient(to_bottom,rgba(7,17,31,0.45),rgba(7,17,31,0.96))]"
        }`}
      />
    </div>
  );
}
