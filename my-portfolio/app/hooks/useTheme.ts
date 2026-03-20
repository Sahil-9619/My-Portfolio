"use client";

import { useEffect, useState } from "react";
import { themes } from "../lib/theme";

type ThemeName = keyof typeof themes;

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    const root = document.documentElement;

    const selectedTheme = themes[theme];

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  return { theme, setTheme };
}