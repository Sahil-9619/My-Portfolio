"use client";

import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed z-50 right-6 top-2  flex gap-2 bg-transparent border border-[var(--border)] p-2 rounded-xl backdrop-blur-sm">

      <button
        onClick={() => setTheme("dark")}
        className={`px-3 py-1 rounded-lg text-sm ${theme === "dark" ? "bg-[var(--accent)] text-white" : "text-[var(--text)]"
          }`}
      >
        🌙
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`px-3 py-1 rounded-lg text-sm ${theme === "light" ? "bg-[var(--accent)] text-white" : "text-[var(--text)]"
          }`}
      >
        ☀️
      </button>

      <button
        onClick={() => setTheme("rose")}
        className={`px-3 py-1 rounded-lg text-sm ${theme === "rose" ? "bg-[var(--accent)] text-white" : "text-[var(--text)]"
          }`}
      >
        🌸
      </button>

      <button
        onClick={() => setTheme("nature")}
        className={`px-3 py-1 rounded-lg text-sm ${theme === "nature" ? "bg-[var(--accent)] text-white" : "text-[var(--text)]"
          }`}
      >
        🌿
      </button>

    </div>
  );
}