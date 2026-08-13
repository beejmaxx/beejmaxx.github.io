"use client";

import { useEffect, useState } from "react";
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

export type ThemeId = (typeof themes)[number]["id"];

const storageKey = "portfolio-personal-web-theme";

function isThemeId(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export default function ThemeShell({ children, fixedTheme }: { children: React.ReactNode; fixedTheme?: ThemeId }) {
  const [theme, setTheme] = useState<ThemeId>(fixedTheme ?? "arctic");
  const [hasRestoredTheme, setHasRestoredTheme] = useState(Boolean(fixedTheme));

  useEffect(() => {
    if (fixedTheme) return;
    const restoreTheme = window.setTimeout(() => {
      const savedTheme = window.localStorage.getItem(storageKey);
      if (isThemeId(savedTheme)) setTheme(savedTheme);
      setHasRestoredTheme(true);
    }, 0);
    return () => window.clearTimeout(restoreTheme);
  }, [fixedTheme]);

  useEffect(() => {
    if (fixedTheme || !hasRestoredTheme) return;
    window.localStorage.setItem(storageKey, theme);
  }, [fixedTheme, hasRestoredTheme, theme]);

  const themeIndex = themes.findIndex((item) => item.id === theme);

  return (
    <div className={styles.page} data-theme={theme}>
      {children}
      {!fixedTheme && <aside className={styles.themeSwitcher} aria-label="Theme switcher">
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
        <small>Saved across pages</small>
      </aside>}
    </div>
  );
}
