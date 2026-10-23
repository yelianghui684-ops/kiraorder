import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ intro = false }: { intro?: boolean }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  const light = theme === "light";
  const label = light ? "Switch to dark mode" : "Switch to light mode";
  return (
    <button className={`theme-toggle${intro ? " theme-toggle-intro" : ""}`} title={label} aria-label={label} aria-pressed={light} onClick={() => {
      const next = light ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f4f6f5" : "#090e15");
      try { localStorage.setItem("kiraorder-theme", next); } catch { /* Theme remains available when storage is restricted. */ }
      setTheme(next);
    }}>
      {light ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
      <span className="theme-toggle-label">{light ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
