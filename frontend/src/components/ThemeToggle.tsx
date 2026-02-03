"use client";

import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  if (theme === undefined) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
