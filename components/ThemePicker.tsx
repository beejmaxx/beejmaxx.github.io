"use client";

import { useEffect, useState } from "react";
import styles from "./ThemePicker.module.css";

type Theme = "light" | "dark";
const storageKey = "site-theme";

export function ThemePicker() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const next = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    setReady(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(storageKey, next);
  }

  return (
    <button
      className={styles.trigger}
      data-ready={ready || undefined}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggle}
    >
      <span aria-hidden="true" />
    </button>
  );
}
