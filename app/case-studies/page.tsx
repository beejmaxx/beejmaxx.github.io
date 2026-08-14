import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { PredicateSweepDiagram } from "@/components/PredicateSweepDiagram";
import { getAllCaseStudies } from "@/lib/case-studies";
import styles from "./cases.module.css";

export const metadata: Metadata = {
  title: "dossiers",
  description: "Engineering records with constraints, evidence, limits, and decisions.",
  alternates: { canonical: "/case-studies" },
  openGraph: { title: "dossiers — bijan", description: "Systems, with context and evidence.", url: "/case-studies" },
};

const aikidoSlugs = new Set([
  "predicate-sweep",
  "one-account-truth",
  "converge-dont-command",
  "results-allowed-to-count",
]);

export default function CasesPage() {
  const studies = getAllCaseStudies();
  const lead = studies.find((study) => study.slug === "predicate-sweep") ?? studies[0];
  const aikidoDossiers = studies.filter((study) => aikidoSlugs.has(study.slug) && study.slug !== lead.slug);
  const otherStudies = studies.filter((study) => !aikidoSlugs.has(study.slug));

  return (
    <SiteShell current="case studies">
      <main className="page" id="main">
        <section className="pageHero">
          <p className="eyebrow">engineering records / not capability claims</p>
          <h1>systems,<br/><em>with context.</em></h1>
          <p className="deck">What exists, what made it difficult, which decisions mattered, and what the available evidence can actually support.</p>
        </section>

        <a className={`${styles.lead} panel`} href={`/case-studies/${lead.slug}`}>
          {lead.slug === "predicate-sweep" ? <PredicateSweepDiagram compact /> : lead.image && <Image src={lead.image} alt={`${lead.title} interface`} width={1600} height={900} />}
          <div>
            <p className="eyebrow">Aikido dossier 00 / {lead.tags.join(" · ")}</p>
            <h2>{lead.title}</h2>
            <p>{lead.subtitle}</p>
            <span>open dossier →</span>
          </div>
        </a>

        <section className={`${styles.series} panel`} aria-labelledby="aikido-series-title">
          <header>
            <p className="eyebrow">flagship project / four subsystem dossiers</p>
            <h2 id="aikido-series-title">Aikido</h2>
            <p>Research, account truth, evaluation, and recoverable live execution—documented as separate systems rather than one oversized platform story.</p>
            <a href="/aikido/">open the Aikido system map →</a>
          </header>
          <div>
            {aikidoDossiers.map((study) => (
              <a href={`/case-studies/${study.slug}`} key={study.slug}>
                <span>{study.index.replace("00.", "0")}</span>
                <div><p>{study.tags.slice(1, 3).join(" · ")}</p><h3>{study.title}</h3></div>
                <p>{study.subtitle}</p>
                <i>↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.other} aria-labelledby="other-dossiers-title">
          <header><p className="eyebrow">other systems</p><h2 id="other-dossiers-title">Additional records</h2></header>
          <div className={styles.list}>
            {otherStudies.map((study) => (
              <a href={`/case-studies/${study.slug}`} key={study.slug}>
                <span>{study.index}</span>
                <div><p>{study.tags.join(" · ")}</p><h2>{study.title}</h2></div>
                <p>{study.subtitle}</p>
                <i>↗</i>
              </a>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
