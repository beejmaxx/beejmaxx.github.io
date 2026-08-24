import styles from "./SiteShell.module.css";

const navigation = [
  { label: "home", href: "/", current: "home" },
  { label: "work", href: "/work", current: "work" },
  { label: "case studies", href: "/case-studies", current: "case studies" },
  { label: "about", href: "/about", current: "about" },
  { label: "résumé", href: "/resume.pdf", current: "resume" },
] as const;

export function SiteShell({ current, children }: { current?: string; children: React.ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skip} href="#main">skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="bijan, home">bijan</a>
        <p className={styles.tagline}>systems engineer</p>
        <nav aria-label="Main navigation">
          {navigation.map((item) => <a href={item.href} key={item.href} aria-current={current === item.current ? "page" : undefined}>{item.label}</a>)}
          <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">github</a>
          <a href="mailto:bijan.pourriahi@gmail.com">email</a>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>built by bijan.</p>
        <nav aria-label="Footer navigation"><a href="/sitemap">sitemap</a><a href="mailto:bijan.pourriahi@gmail.com">email</a><a href="https://github.com/beejmaxx">github</a><a href="#top">top</a></nav>
      </footer>
    </div>
  );
}
