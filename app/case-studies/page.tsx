import type { Metadata } from "next";
import { SimpleFooter, SiteHeader } from "@/components/SiteHeader";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Engineering Case Studies",
  description: "Case studies in developer platforms, real-time systems, APIs, data infrastructure, and operational tooling by Bijan Pourriahi.",
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero wrap">
          <p className="eyebrow">Case studies</p>
          <h1>Selected systems<br /><span className="serif">and constraints.</span></h1>
          <p className="page-deck">
            Descriptions of the architecture, interfaces, tradeoffs, failure modes, and operational
            constraints behind six systems.
          </p>
        </section>
        <section className="case-study-index wrap" aria-label="Engineering case studies">
          {studies.map((study) => (
            <a className="case-study-row" href={`/case-studies/${study.slug}`} key={study.slug}>
              <span className="case-study-number">{study.index}</span>
              <div>
                <p>{study.tags.join(" · ")}</p>
                <h2>{study.title}</h2>
                <span>{study.subtitle}</span>
              </div>
              <span className="round-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}
