"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./personal-web.module.css";

const themes = [
  { id: "field-manual", name: "Field manual" },
  { id: "newsprint", name: "Newsprint" },
  { id: "terminal", name: "Terminal" },
  { id: "blueprint", name: "Blueprint" },
  { id: "monochrome", name: "Monochrome" },
  { id: "desert", name: "Desert" },
  { id: "arctic", name: "Arctic" },
  { id: "casa", name: "Casa" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

const storageKey = "portfolio-personal-web-theme";

function isThemeId(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export default function ThemeShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("field-manual");

  const cycleTheme = useCallback((direction: number) => {
    setTheme((current) => {
      const currentIndex = themes.findIndex((item) => item.id === current);
      const nextIndex = (currentIndex + direction + themes.length) % themes.length;
      return themes[nextIndex].id;
    });
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (!isThemeId(savedTheme)) return;
    const restoreTheme = window.setTimeout(() => setTheme(savedTheme), 0);
    return () => window.clearTimeout(restoreTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      cycleTheme(event.key === "ArrowRight" ? 1 : -1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cycleTheme]);

  const themeIndex = themes.findIndex((item) => item.id === theme);

  return (
    <div className={styles.page} data-theme={theme}>
      {children}
      <aside className={styles.themeSwitcher} aria-label="Theme switcher">
        <button type="button" onClick={() => cycleTheme(-1)} aria-label="Previous theme">
          ←
        </button>
        <label>
          <span>
            Theme {themeIndex + 1}/{themes.length}
          </span>
          <select value={theme} onChange={(event) => setTheme(event.target.value as ThemeId)}>
            {themes.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => cycleTheme(1)} aria-label="Next theme">
          →
        </button>
        <div className={styles.themeDots} aria-label="Choose a theme">
          {themes.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={styles[`swatch${index + 1}`]}
              aria-label={`Use ${item.name} theme`}
              aria-pressed={item.id === theme}
              title={item.name}
              onClick={() => setTheme(item.id)}
            />
          ))}
        </div>
        <small>Use ← → keys</small>
      </aside>
    </div>
  );
}
