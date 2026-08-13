import { ThemePicker } from "./ThemePicker";
import styles from "./SiteShell.module.css";

const navigation = [
  ["work", "/work"],
  ["library", "/library"],
  ["attempts", "/attempts"],
  ["notes", "/notes"],
  ["archive", "/archive"],
  ["about", "/about"],
] as const;

export function SiteShell({ current, children }: { current?: string; children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skip} href="#main">skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="bijan, home"><span>b</span><strong>bijan</strong></a>
        <nav aria-label="Main navigation">
          {navigation.map(([label, href]) => <a href={href} key={href} aria-current={current === label ? "page" : undefined}>{label}</a>)}
        </nav>
        <a className={styles.github} href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">github ↗</a>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>instruments, evidence, books, and unfinished inquiries.</p>
        <nav aria-label="Footer navigation"><a href="mailto:bijan.pourriahi@gmail.com">email ↗</a><a href="https://github.com/beejmaxx">github ↗</a><a href="#top">up ↑</a></nav>
      </footer>
      <ThemePicker />
    </div>
  );
}
