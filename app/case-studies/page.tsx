import type { Metadata } from "next";
import { PersonalSiteShell } from "@/components/PersonalSiteShell";
import { getAllCaseStudies } from "@/lib/case-studies";
import styles from "../site-pages.module.css";

export const metadata: Metadata = { title: "Cases", description: "Systems, with context." };

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  return (
    <PersonalSiteShell section="cases">
      <main>
        <section className={styles.hero} data-mark="↳"><p className={styles.overline}>six longer explanations</p><h1>systems,<br /><span>with context.</span></h1><p className={styles.deck}>What the thing had to do, what made it difficult, and how it was put together.</p></section>
        <section className={styles.index} aria-label="Case studies">
          <div className={styles.shortList}>{studies.map((study) => <a className={styles.shortRow} href={`/case-studies/${study.slug}`} key={study.slug}><span>{study.index}</span><h2>{study.title}</h2><p>{study.subtitle}</p><i>↗</i></a>)}</div>
        </section>
      </main>
    </PersonalSiteShell>
  );
}
