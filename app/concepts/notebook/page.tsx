import type { Metadata } from "next";
import Image from "next/image";
import { conceptLinks, conceptProjects, secondaryProjects } from "../concept-data";
import styles from "./notebook.module.css";

export const metadata: Metadata = { title: "Notebook homepage concept", robots: { index: false, follow: false } };

export default function NotebookConcept() {
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <a className={styles.identity} href="/concepts">b / work log</a>
        <div className={styles.meta}>
          <span>bijan</span>
          <span>Software engineer</span>
          <span>Shanghai · UTC+8</span>
          <span>GitHub since 2010</span>
        </div>
        <nav aria-label="Homepage concepts">
          {conceptLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className={styles.sideLinks}>
          <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="/resume.pdf">Résumé ↗</a>
          <a href="mailto:bijan.pourriahi@gmail.com">Email ↗</a>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.intro}>
          <div className={styles.entryMeta}><span>INDEX</span><time>2026—</time><span>ACTIVE</span></div>
          <h1>Notes on systems I’ve built and the questions behind them.</h1>
          <p>
            Market infrastructure, developer tools, research systems, and browser experiments.
            This version treats the portfolio as a working notebook rather than a finished exhibition.
          </p>
        </header>

        <section className={styles.entries}>
          {conceptProjects.map((project) => (
            <article className={styles.entry} key={project.id}>
              <div className={styles.entryMeta}>
                <span>ENTRY {project.number}</span>
                <span>{project.status}</span>
                <span>{project.stack.join(" / ")}</span>
              </div>
              <h2>{project.title}</h2>
              <p className={styles.question}>{project.short}</p>
              <div className={styles.notes}>
                <p><b>What it is.</b> {project.description}</p>
                <p><b>What interested me.</b> {project.detail}</p>
              </div>
              {project.image && <Image src={project.image} alt="Strategy research results" width={2000} height={1200} sizes="(max-width: 800px) 100vw, 920px" />}
              <div className={styles.entryLinks}>
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Project ↗</a>}
                <a href={project.source} target="_blank" rel="noreferrer">Repository ↗</a>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.appendix}>
          <h2>Appendix: other threads</h2>
          {secondaryProjects.map(([title, description, href], index) => (
            <a href={href} key={title}><span>A.{index + 1}</span><strong>{title}</strong><p>{description}</p><i>↗</i></a>
          ))}
          <a href="/archive"><span>A.5</span><strong>Complete repository archive</strong><p>Originals, forks, experiments, and unfinished projects.</p><i>→</i></a>
        </section>
      </main>
    </div>
  );
}
