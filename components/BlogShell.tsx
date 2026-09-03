import styles from "./BlogShell.module.css";

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/" aria-label="Bijan's notes, home">bijan&apos;s notes</a>
          <nav aria-label="Main navigation">
            <a href="/">Posts</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
          </nav>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <span>© {new Date().getUTCFullYear()} Bijan Pourriahi</span>
        <a href="https://github.com/beejmaxx">GitHub</a>
      </footer>
    </div>
  );
}
