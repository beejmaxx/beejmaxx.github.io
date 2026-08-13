import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { conceptLinks, conceptProjects, secondaryProjects } from "../concept-data";
import styles from "./hybrid.module.css";

export const metadata: Metadata = { title: "Hybrid homepage concept" };

export default function HybridConcept() {
  const originals = projects.filter((project) => !project.fork).length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.name} href="/concepts">Bijan Pourriahi</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="/archive">Archive</a>
          <a href="/about">About</a>
        </nav>
        <a href="mailto:bijan.pourriahi@gmail.com">Email</a>
      </header>

      <main>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Software engineer</p>
            <h1>Bijan Pourriahi.<br /><span>Work and experiments.</span></h1>
            <p className={styles.intro}>
              I build market systems, developer tools, research infrastructure, and browser
              experiments. This site collects the strongest work and the larger public record.
            </p>
            <div className={styles.heroLinks}>
              <a href="#work">Featured work ↓</a>
              <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <aside className={styles.summary} aria-label="Portfolio summary">
            <div><span>Public work</span><strong>{originals}</strong><small>original repositories</small></div>
            <dl>
              <div><dt>Since</dt><dd>2010</dd></div>
              <div><dt>Current</dt><dd>Rust · Python · TypeScript · Go</dd></div>
              <div><dt>Focus</dt><dd>Systems that are observable and reproducible</dd></div>
            </dl>
          </aside>
        </section>

        <section className={styles.featured} id="work">
          <header className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>Featured work</p><h2>Four projects to start with.</h2></div>
            <p>Selected because each contains a distinct technical idea, constraint, or mode of working.</p>
          </header>
          <div className={styles.featureGrid}>
            {conceptProjects.map((project) => (
              <article className={styles.project} key={project.id}>
                <div className={styles.projectMeta}>
                  <span>{project.number}</span><span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p className={styles.short}>{project.short}</p>
                <p>{project.description}</p>
                <p className={styles.detail}>{project.detail}</p>
                <div className={styles.tags}>{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className={styles.projectLinks}>
                  {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Open project ↗</a>}
                  <a href={project.source} target="_blank" rel="noreferrer">Source ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.evidence}>
          <div className={styles.evidenceCopy}>
            <p className={styles.eyebrow}>Operational systems</p>
            <h2>Interfaces are part of the engineering.</h2>
            <p>
              This trading operations workstation exposes execution state, account health,
              constraints, and emergency controls to the people responsible for the system.
            </p>
            <a href="/case-studies/operations-workstation">Read the case study →</a>
          </div>
          <Image src="/assets/screenshots/live-execution-dashboard.png" alt="Live trading operations workstation" width={2000} height={1253} sizes="(max-width: 800px) 100vw, 70vw" />
        </section>

        <section className={styles.systems} id="systems">
          <header className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>More systems work</p><h2>Other useful threads.</h2></div>
            <a href="/case-studies">All case studies →</a>
          </header>
          <div className={styles.systemList}>
            {secondaryProjects.map(([title, description, href], index) => (
              <a href={href} key={title}><span>{String(index + 5).padStart(2, "0")}</span><strong>{title}</strong><p>{description}</p><i>↗</i></a>
            ))}
          </div>
        </section>

        <section className={styles.archive}>
          <div><p className={styles.eyebrow}>Public archive</p><strong>{projects.length}</strong><span>repositories</span></div>
          <div><h2>The rest of the work stays visible.</h2><p>{originals} original projects, plus forks, small utilities, abandoned ideas, and unfinished experiments.</p><a href="/archive">Browse the archive →</a></div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><p className={styles.eyebrow}>Contact</p><a href="mailto:bijan.pourriahi@gmail.com">bijan.pourriahi@gmail.com</a></div>
        <nav aria-label="Homepage concepts">{conceptLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      </footer>
    </div>
  );
}
