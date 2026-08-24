import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { getListedCaseStudies } from "@/lib/case-studies";
import styles from "./cases.module.css";

export const metadata: Metadata = { title:"case studies",description:"Engineering records with constraints, evidence, limits, and decisions.",alternates:{canonical:"/case-studies"},openGraph:{title:"case studies — bijan",description:"Engineering records with context and evidence.",url:"/case-studies"} };

const aikidoSlugs = ["predicate-sweep", "one-account-truth", "converge-dont-command", "results-allowed-to-count"];

export default function CasesPage() {
  const studies = getListedCaseStudies();
  const aikido = aikidoSlugs.map((slug) => studies.find((study) => study.slug === slug)).filter(Boolean);
  const other = studies.filter((study) => !aikidoSlugs.includes(study.slug));
  return (
    <SiteShell current="case studies">
      <main className="page" id="main">
        <header className="pageHero">
          <h1>Case studies</h1>
          <p className="deck">Engineering records: what exists, what made it difficult, which decisions mattered, and what the evidence supports.</p>
        </header>
        <section className={styles.group}>
          <header><h2>Aikido</h2><p>Four detailed studies from the flagship research and execution system. <a href="/aikido/">System overview →</a></p></header>
          <ul>{aikido.map((study) => study && <li key={study.slug}><a href={`/case-studies/${study.slug}`}><span>{study.index.replace("00.", "0")}</span><div><h3>{study.title}</h3><p>{study.subtitle}</p></div></a></li>)}</ul>
        </section>
        <section className={styles.group}>
          <header><h2>Other systems</h2></header>
          <ul>{other.map((study) => <li key={study.slug}><a href={`/case-studies/${study.slug}`}><span>{study.index}</span><div><h3>{study.title}</h3><p>{study.subtitle}</p></div></a></li>)}</ul>
        </section>
      </main>
    </SiteShell>
  );
}
