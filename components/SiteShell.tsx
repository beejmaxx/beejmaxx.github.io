import styles from "./SiteShell.module.css";

const navigation = [
  ["home", "/"],
  ["work", "/work"],
  ["books", "/books"],
  ["case studies", "/case-studies"],
  ["about", "/about"],
] as const;

export function SiteShell({ current, children }: { current?: string; children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skip} href="#main">skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="bijan, home">bijan</a>
        <p className={styles.tagline}>software engineer</p>
        <nav aria-label="Main navigation">
          {navigation.map(([label, href]) => <a href={href} key={href} aria-current={current === label ? "page" : undefined}>{label}</a>)}
          <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">github</a>
          <a href="mailto:bijan.pourriahi@gmail.com">email</a>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>built by bijan.</p>
        <nav aria-label="Footer navigation"><a href="mailto:bijan.pourriahi@gmail.com">email</a><a href="https://github.com/beejmaxx">github</a><a href="#top">top</a></nav>
      </footer>
    </div>
  );
}
