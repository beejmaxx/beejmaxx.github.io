import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { getListedCaseStudies } from "@/lib/case-studies";
import styles from "./sitemap.module.css";

export const metadata: Metadata = {
  title: "sitemap",
  description: "An index of pages on bijan’s site.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  const studies = getListedCaseStudies();

  return (
    <SiteShell>
      <main className="page" id="main">
        <header className="pageHero">
          <h1>Sitemap</h1>
          <p className="deck">A plain index of the site.</p>
        </header>
        <div className={styles.index}>
          <section>
            <h2>Main</h2>
            <ul><li><a href="/">Home</a></li><li><a href="/work">Work</a></li><li><a href="/case-studies">Case studies</a></li><li><a href="/about">About</a></li><li><a href="/resume.pdf">Résumé</a></li></ul>
          </section>
          <section>
            <h2>Aikido</h2>
            <ul><li><a href="/aikido/">Overview</a></li><li><a href="/aikido/architecture.html">Architecture</a></li></ul>
          </section>
          <section>
            <h2>Case studies</h2>
            <ul>{studies.map((study) => <li key={study.slug}><a href={`/case-studies/${study.slug}`}>{study.title}</a></li>)}</ul>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
