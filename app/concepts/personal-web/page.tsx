import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { conceptLinks, conceptProjects, secondaryProjects } from "../concept-data";
import ThemeShell from "./ThemeShell";
import type { ThemeId } from "./ThemeShell";
import styles from "./personal-web.module.css";

export const metadata: Metadata = {
  title: "Personal web homepage concept",
  description: "An independent, personal-web-inspired portfolio concept for bijan.",
  robots: { index: false, follow: false },
};

export function PersonalWebHomepage({ showConceptNavigation = true, fixedTheme }: { showConceptNavigation?: boolean; fixedTheme?: ThemeId }) {
  const originalProjects = projects.filter((project) => !project.fork).length;

  return (
    <ThemeShell fixedTheme={fixedTheme}>
      <header className={styles.masthead}>
        {showConceptNavigation && (
          <a className={styles.conceptBack} href="/concepts">
            ← all homepage versions
          </a>
        )}
        <div className={styles.identity} aria-hidden="true">
          <span>b</span>
        </div>
        <h1>bijan</h1>
        <p className={styles.subtitle}>software · systems · experiments</p>
        <nav aria-label="Primary navigation" className={styles.iconNav}>
          <a href="#work">work</a>
          <a href="/archive">archive</a>
          <a href="/blog">blog</a>
          <a href="/about">about</a>
          <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">
            github ↗
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <article className={`${styles.panel} ${styles.intro}`}>
          <p>
            I’m a software engineer who likes systems you can inspect, replay, and understand. I
            build market infrastructure, research tools, browser experiments, and small things
            that teach me how a medium works.
          </p>
          <p>
            This is the useful part of my GitHub: the projects worth starting with, the rest of
            the public record, and—eventually—notes about what I learned making it.
          </p>
        </article>

        <section className={styles.section} id="work">
          <h2>Start here</h2>
          <p className={styles.sectionNote}>Four projects, each interesting for a different reason.</p>
          <div className={styles.projects}>
            {conceptProjects.map((project) => (
              <article className={styles.project} key={project.id}>
                <header>
                  <span>{project.number}</span>
                  <span>{project.status}</span>
                </header>
                <h3>{project.title}</h3>
                <p className={styles.projectThesis}>{project.short}</p>
                <p>{project.description}</p>
                <details>
                  <summary>Why it’s here</summary>
                  <p>{project.detail}</p>
                </details>
                <footer>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        open ↗
                      </a>
                    )}
                    <a href={project.source} target="_blank" rel="noreferrer">
                      source ↗
                    </a>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>More things I’ve made</h2>
          <article className={`${styles.panel} ${styles.moreWork}`}>
            <ul>
              {secondaryProjects.map(([title, description, href]) => (
                <li key={title}>
                  <a href={href}>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p>
              There are <strong>{originalProjects} original repositories</strong> in the full
              inventory, including utilities, abandoned ideas, and projects that never became a
              polished thing.
            </p>
            <a className={styles.bigLink} href="/archive">
              Browse the whole archive →
            </a>
          </article>
        </section>

        <section className={styles.section}>
          <h2>Rust API Field Guide</h2>
          <p className={styles.sectionNote}>One book, four complete ways through the same curriculum.</p>
          <article className={`${styles.panel} ${styles.book}`}>
            <div className={styles.bookCopy}>
              <p className={styles.bookLabel}>Book · 19 chapters · 12 production case studies</p>
              <h3>Idiomatic Rust API design, learned from real libraries.</h3>
              <p>
                A source-reading book built from the standard library, a reproducible study of
                GitHub’s top 100 Rust repositories, and a curated cohort of 40 libraries.
              </p>
              <div className={styles.bookLinks}>
                <a href="https://beejmaxx.github.io/rust-api-field-guide/" target="_blank" rel="noreferrer">Read the book ↗</a>
                <a href="https://github.com/beejmaxx/rust-api-field-guide" target="_blank" rel="noreferrer">Source ↗</a>
              </div>
            </div>
            <ol className={styles.editions}>
              <li><a href="https://beejmaxx.github.io/rust-api-field-guide/" target="_blank" rel="noreferrer"><strong>Classic</strong><span>Principles first, then production cases.</span></a></li>
              <li><a href="https://beejmaxx.github.io/rust-api-field-guide/editions/problem-first/" target="_blank" rel="noreferrer"><strong>Problem-first</strong><span>Start reasonable; add requirements until the API breaks.</span></a></li>
              <li><a href="https://beejmaxx.github.io/rust-api-field-guide/editions/example-led/" target="_blank" rel="noreferrer"><strong>Example-led</strong><span>Begin with decisions from mature Rust libraries.</span></a></li>
              <li><a href="https://beejmaxx.github.io/rust-api-field-guide/editions/workshop/" target="_blank" rel="noreferrer"><strong>Workshop</strong><span>Design signatures at guided checkpoints.</span></a></li>
            </ol>
          </article>
        </section>

        <section className={styles.twoUp}>
          <div>
            <h2>Things that didn’t work</h2>
            <article className={`${styles.panel} ${styles.failures}`}>
              <p>
                I don’t want this to be a museum of clean outcomes. Failed approaches, wrong
                assumptions, and unfinished projects belong here too—when there’s something useful
                to say about them.
              </p>
              <a href="/archive">See unfinished and archived work →</a>
            </article>
          </div>
          <div>
            <h2>Writing</h2>
            <article className={`${styles.panel} ${styles.writing}`}>
              <p className={styles.emptyLabel}>0 posts published</p>
              <p>
                The blog is wired up, but I’m not publishing placeholder posts just to make it
                look occupied.
              </p>
              <a href="/blog">Visit the empty blog →</a>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <nav aria-label="Useful links">
          <a href="/archive" title="Project archive">
            <span aria-hidden="true">⌘</span> Archive
          </a>
          <a href="/blog" title="Blog">
            <span aria-hidden="true">¶</span> Blog
          </a>
          <a href="/resume.pdf" title="Resume">
            <span aria-hidden="true">↓</span> Résumé
          </a>
          <a href="mailto:bijan.pourriahi@gmail.com" title="Email bijan">
            <span aria-hidden="true">@</span> Email
          </a>
        </nav>
        <p>Built from the work itself. No invented case studies, no invented blog posts.</p>
        {showConceptNavigation && (
          <nav className={styles.versions} aria-label="Homepage concepts">
            {conceptLinks.map(([label, href]) => (
              <a href={href} key={href} aria-current={href === "/concepts/personal-web" ? "page" : undefined}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </footer>
    </ThemeShell>
  );
}

export default function PersonalWebConcept() {
  return <PersonalWebHomepage />;
}
