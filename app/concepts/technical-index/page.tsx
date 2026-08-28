import type { Metadata } from "next";
import { conceptLinks, conceptProjects, secondaryProjects } from "../concept-data";
import styles from "./technical-index.module.css";

export const metadata: Metadata = { title: "Technical index homepage concept", robots: { index: false, follow: false } };

export default function TechnicalIndexConcept() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div><b>bijan</b><span>SOFTWARE ENGINEER</span></div>
        <nav aria-label="Homepage concepts">{conceptLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <div className={styles.status}><span>OPEN TO INTERESTING WORK</span><i /></div>
      </header>

      <main>
        <section className={styles.summary}>
          <div className={styles.summaryLead}>
            <span>PROFILE / 001</span>
            <h1>Systems engineering across markets, tools, data, and the browser.</h1>
          </div>
          <dl>
            <div><dt>Primary work</dt><dd>Real-time systems, developer platforms, research infrastructure</dd></div>
            <div><dt>Languages</dt><dd>Rust, Python, TypeScript, Go</dd></div>
            <div><dt>Public history</dt><dd>63 original repositories since 2010</dd></div>
            <div><dt>Contact</dt><dd><a href="mailto:beejmaxx@gmail.com">email</a></dd></div>
          </dl>
        </section>

        <section className={styles.work}>
          <div className={styles.sectionBar}><span>FEATURED SYSTEMS</span><span>4 RECORDS</span></div>
          {conceptProjects.map((project) => (
            <article className={styles.record} key={project.id}>
              <div className={styles.recordId}><span>{project.number}</span><small>{project.status}</small></div>
              <div className={styles.recordTitle}><h2>{project.title}</h2><p>{project.short}</p></div>
              <p className={styles.recordDescription}>{project.description} {project.detail}</p>
              <div className={styles.stack}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <div className={styles.recordLinks}>
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">RUN ↗</a>}
                <a href={project.source} target="_blank" rel="noreferrer">SRC ↗</a>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.secondary}>
          <div className={styles.sectionBar}><span>ADDITIONAL WORK</span><span>SELECTED</span></div>
          <div className={styles.secondaryGrid}>
            {secondaryProjects.map(([title, description, href], index) => (
              <a href={href} key={title}><span>{String(index + 5).padStart(2,"0")}</span><strong>{title}</strong><p>{description}</p><i>↗</i></a>
            ))}
            <a href="/case-studies"><span>09</span><strong>Case studies</strong><p>Six accounts of platform, operational, API, and analytics work</p><i>→</i></a>
            <a href="/archive"><span>10</span><strong>Complete archive</strong><p>Originals, forks, experiments, and unfinished projects</p><i>→</i></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>CONCEPT 03 / TECHNICAL INDEX</span>
        <div><a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="/resume.pdf">RÉSUMÉ ↗</a><a href="/concepts">COMPARE →</a></div>
      </footer>
    </div>
  );
}
