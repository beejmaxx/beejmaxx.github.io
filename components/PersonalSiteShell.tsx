import ThemeShell from "@/app/concepts/personal-web/ThemeShell";
import styles from "./PersonalSiteShell.module.css";

export function PersonalSiteShell({
  section,
  children,
  footerNote = "still sorting",
}: {
  section: string;
  children: React.ReactNode;
  footerNote?: string;
}) {
  return (
    <ThemeShell>
      <div className={styles.page} id="top">
        <header className={styles.masthead}>
          <a className={styles.identity} href="/" aria-label="bijan, home"><span>b</span></a>
          <div><a className={styles.name} href="/">bijan</a><p>{section}</p></div>
          <nav aria-label="Main navigation">
            <a href="/work-map">stuff</a>
            <a href="/case-studies">cases</a>
            <a href="/about">about</a>
            <a href="/resume.pdf">résumé</a>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>
          <p>{footerNote}</p>
          <nav aria-label="Footer navigation"><a href="mailto:beejmaxx@gmail.com">email ↗</a><a href="https://github.com/beejmaxx">github ↗</a><a href="#top">up ↑</a></nav>
        </footer>
      </div>
    </ThemeShell>
  );
}
