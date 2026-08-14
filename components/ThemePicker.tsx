"use client";

import { useEffect, useState } from "react";
import styles from "./ThemePicker.module.css";

const themes = [
  ["personal", "Personal web"],
  ["dossier", "Dossier"],
  ["hybrid", "Hybrid"],
] as const;

export type ThemeId = (typeof themes)[number][0];
const storageKey = "portfolio-theme";

function isTheme(value: string | null): value is ThemeId {
  return themes.some(([id]) => id === value);
}

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("hybrid");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      const nextTheme = isTheme(saved) ? saved : "hybrid";
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(nextTheme: ThemeId) {
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    setOpen(false);
  }

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
  }, [ready, theme]);

  return (
    <div className={styles.picker} data-ready={ready || undefined}>
      {open && (
        <div className={styles.popover} id="theme-options">
          <p>site treatment</p>
          <div>
            {themes.map(([id, label]) => (
              <button type="button" key={id} data-swatch={id} aria-pressed={id === theme} onClick={() => choose(id)}>
                <span aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className={styles.trigger}
        type="button"
        aria-label="Choose site treatment"
        aria-expanded={open}
        aria-controls="theme-options"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
