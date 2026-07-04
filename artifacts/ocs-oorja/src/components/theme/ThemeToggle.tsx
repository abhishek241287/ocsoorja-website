

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded hover:bg-foreground/5"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const isDark = theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      className="inline-flex h-10 w-10 items-center justify-center rounded hover:bg-foreground/5"
    >
      {/* Cross-fade icons for a smooth feel */}
      <span className="grid place-items-center">
        <Sun className={`h-5 w-5 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`} />
        <Moon className={`h-5 w-5 -mt-5 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`} />
      </span>
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
}
