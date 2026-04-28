"use client";

import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed z-50 right-3 sm:right-4 md:right-6 top-3 md:top-2 flex overflow-x-auto no-scrollbar w-auto max-w-fit gap-0.5 md:gap-2 bg-[var(--card)] border border-[var(--border)] p-1 md:p-2 rounded-2xl backdrop-blur-xl shadow-lg scale-[0.88] sm:scale-95 md:scale-100 origin-top-right">
      <button
        onClick={() => setTheme("dark")}
        className={`px-1.5 md:px-3 py-1 md:py-1 rounded-lg text-[10px] md:text-sm ${theme === "dark"
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--text)]"
          }`}
      >
        🌙
      </button>

      <button
        onClick={() => setTheme("neon")}
        className={`px-1.5 md:px-3 py-1 md:py-1 rounded-lg text-[10px] md:text-sm ${theme === "neon"
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--text)]"
          }`}
      >
        💎
      </button>

      <button
        onClick={() => setTheme("rose")}
        className={`px-1.5 md:px-3 py-1 md:py-1 rounded-lg text-[10px] md:text-sm ${theme === "rose"
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--text)]"
          }`}
      >
        🌸
      </button>

      <button
        onClick={() => setTheme("nature")}
        className={`px-1.5 md:px-3 py-1 md:py-1 rounded-lg text-[10px] md:text-sm ${theme === "nature"
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--text)]"
          }`}
      >
        🌿
      </button>

    </div>
  );
}