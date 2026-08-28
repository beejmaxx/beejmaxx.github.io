import type { Metadata } from "next";
import Image from "next/image";
import { conceptLinks, conceptProjects, secondaryProjects } from "../concept-data";
import styles from "./project-led.module.css";

export const metadata: Metadata = { title: "Project-led homepage concept", robots: { index: false, follow: false } };

export default function ProjectLedConcept() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.name} href="/concepts">bijan</a>
        <nav aria-label="Homepage concepts">
          {conceptLinks.slice(1).map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a href="mailto:beejmaxx@gmail.com">Email</a>
      </header>

      <main>
        <section className={styles.hero}>
          <p>Software engineer in Shanghai</p>
          <h1>I build market systems, developer tools, research infrastructure, and browser experiments.</h1>
          <div className={styles.heroLinks}>
            <a href="#work">Selected work ↓</a>
            <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="/resume.pdf">Résumé ↗</a>
          </div>
        </section>

        <section className={styles.work} id="work">
          {conceptProjects.map((project, index) => (
            <article className={styles.project} key={project.id}>
              <div className={styles.projectHead}>
                <span>{project.number}</span>
                <span>{project.status}</span>
                <span>{project.stack.join(" · ")}</span>
              </div>
              <div className={styles.projectBody}>
                <div>
                  <p className={styles.label}>Selected project</p>
                  <h2>{project.title}</h2>
                  <p className={styles.short}>{project.short}</p>
                </div>
                <div className={styles.explanation}>
                  <p>{project.description}</p>
                  <p>{project.detail}</p>
                  <div className={styles.links}>
                    {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Open project ↗</a>}
                    <a href={project.source} target="_blank" rel="noreferrer">Source ↗</a>
                  </div>
                </div>
              </div>
              {index === 2 && project.image && (
                <Image className={styles.evidence} src={project.image} alt="Strategy research interface" width={2000} height={1200} sizes="100vw" />
              )}
            </article>
          ))}
        </section>

        <section className={styles.more}>
          <div>
            <p className={styles.label}>More systems work</p>
            <h2>Other projects and case studies</h2>
          </div>
          <div className={styles.moreList}>
            {secondaryProjects.map(([title, description, href]) => (
              <a href={href} key={title}>
                <strong>{title}</strong><span>{description}</span><i>↗</i>
              </a>
            ))}
            <a href="/archive"><strong>Repository archive</strong><span>Original work, old projects, forks, and unfinished threads</span><i>→</i></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Concept 01 · Project-led</span>
        <a href="/concepts">Compare concepts →</a>
      </footer>
    </div>
  );
}
