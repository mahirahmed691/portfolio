import { motion } from "framer-motion";
import type { ThemeClasses, ThemeMode } from "../types";
import { QuickKey } from "./QuickKey";

export function QuickMenu({
  isLight,
  quickMenuOpen,
  setQuickMenuOpen,
  focusMode,
  setFocusMode,
  setTheme,
  themeClasses,
  onOpenTerminal,
}: {
  isLight: boolean;
  quickMenuOpen: boolean;
  setQuickMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  focusMode: boolean;
  setFocusMode: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
  themeClasses: ThemeClasses;
  onOpenTerminal: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        x: quickMenuOpen ? 0 : -420,
        opacity: quickMenuOpen ? 1 : 0,
        pointerEvents: quickMenuOpen ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-24 left-5 z-50 hidden md:block w-[calc(100vw-2.5rem)] max-w-md"
    >
      <div
        className={
          isLight
            ? "overflow-hidden rounded-[1.75rem] border border-slate-300 bg-white shadow-2xl"
            : "overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1422]/95 shadow-2xl"
        }
      >
        <div
          className={`flex items-center justify-between border-b px-5 py-4 ${
            isLight ? "border-slate-200" : "border-white/10"
          }`}
        >
          <div>
            <p
              className={`text-xs uppercase tracking-[0.22em] ${themeClasses.subtle}`}
            >
              Keyboard shortcuts
            </p>
            <h2 className="mt-1 text-lg font-semibold">Q, D, and F</h2>
          </div>
          <button
            type="button"
            onClick={() => setQuickMenuOpen(false)}
            className={
              isLight
                ? "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                : "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
            }
          >
            Esc
          </button>
        </div>

        <div className="space-y-3 p-3">
          <div className={`${themeClasses.softCard} px-4 py-3 text-sm`}>
            <p className="font-medium">How to use it</p>
            <p className={`mt-1 text-xs leading-6 ${themeClasses.subtle}`}>
              Press <span className="font-semibold">Q</span> to open or close
              this panel. Press <span className="font-semibold">D</span> to
              toggle theme. Press <span className="font-semibold">F</span> for
              focus mode. Press <span className="font-semibold">T</span> for the
              terminal.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
            className={`${themeClasses.softCard} flex w-full items-center justify-between px-4 py-3 text-left`}
          >
            <span>
              <span className="block text-sm font-medium">Toggle theme</span>
              <span className={`mt-1 block text-xs ${themeClasses.subtle}`}>
                Switch between light and dark mode
              </span>
            </span>
            <QuickKey label="D" isLight={isLight} />
          </button>

          <button
            type="button"
            onClick={() => setFocusMode((current) => !current)}
            className={`${themeClasses.softCard} flex w-full items-center justify-between px-4 py-3 text-left`}
          >
            <span>
              <span className="block text-sm font-medium">
                {focusMode ? "Disable" : "Enable"} focus mode
              </span>
              <span className={`mt-1 block text-xs ${themeClasses.subtle}`}>
                Reduce visual noise across the page
              </span>
            </span>
            <QuickKey label="F" isLight={isLight} />
          </button>

          <button
            type="button"
            onClick={() => {
              setQuickMenuOpen(false);
              onOpenTerminal();
            }}
            className={`${themeClasses.softCard} flex w-full items-center justify-between px-4 py-3 text-left`}
          >
            <span>
              <span className="block text-sm font-medium">Open terminal</span>
              <span className={`mt-1 block text-xs ${themeClasses.subtle}`}>
                Interactive CLI — try <code className="font-mono">sudo hire-me</code>
              </span>
            </span>
            <QuickKey label="T" isLight={isLight} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
