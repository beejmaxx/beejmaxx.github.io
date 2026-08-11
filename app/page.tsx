import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";

const selectedProjects = [
  {
    number: "01",
    title: "Depthfield",
    year: "2026",
    label: "TYPESCRIPT · WEBGPU · REAL-TIME",
    description:
      "A fast, open-source market-depth workstation that renders live order-book history directly in the browser.",
    detail: "Public exchange data, sequence-aware state, multi-resolution history, and one-pass WebGPU rendering.",
    href: "https://github.com/beejmaxx/depthfield",
    color: "coral",
  },
  {
    number: "02",
    title: "Bot Defense Lab",
    year: "2026",
    label: "GO · SECURITY · EVALUATION",
    description:
      "A synthetic lab for reasoning about HTTP bot detection, behavioral correlation, and progressive enforcement.",
    detail: "Deterministic traffic, shadow policy, replay evaluation, analyst operations, and explicit tradeoffs.",
    href: "https://github.com/beejmaxx/http-bot-defense-lab",
    color: "acid",
  },
  {
    number: "03",
    title: "Bell / Stillness",
    year: "2026",
    label: "RUST · WASM · GENERATIVE AUDIO",
    description:
      "A velocity-sensitive browser instrument: strike a hand-hammered bell and let physical gesture shape the sound.",
    detail: "Rust and WebAssembly visuals with physically informed modal synthesis in the browser.",
    href: "https://github.com/beejmaxx/bells",
    color: "blue",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const caseStudies = getAllCaseStudies();
  const originals = projects.filter((project) => !project.fork).length;

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Bijan Pourriahi, home">
          <span className="wordmark-mark">BP</span>
          <span>Bijan Pourriahi</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="/case-studies">Case studies</a>
          <a href="/archive">Archive</a>
          <a href="/blog">Blog</a>
          <a href="/about">About</a>
        </nav>
        <a className="availability" href="mailto:bijan.pourriahi@gmail.com">Email</a>
      </header>

      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">Software engineer</p>
            <h1>
              Bijan Pourriahi.<br />
              <em>Work and notes.</em>
            </h1>
            <p className="hero-intro">
              I work on developer platforms, APIs, real-time systems, research tools, and small
              browser experiments. This site is an index of that work.
            </p>
            <div className="hero-actions">
              <a className="text-link" href="/case-studies">Case studies <span aria-hidden="true">→</span></a>
              <a className="text-link" href="/blog">Blog <span aria-hidden="true">→</span></a>
            </div>
          </div>

          <div className="hero-object" aria-label="A visual index of Bijan’s work">
            <div className="object-topline">
              <span>GITHUB / 2010—NOW</span>
              <span>PUBLIC WORK</span>
            </div>
            <div className="object-center">
              <span className="object-kicker">Public repositories</span>
              <strong>{projects.length}</strong>
              <span className="object-caption">originals, forks, and unfinished work</span>
            </div>
            <div className="object-grid">
              <span>RUST</span>
              <span>PYTHON</span>
              <span>TS</span>
              <span>REALTIME</span>
              <span>APIS</span>
              <span>TOOLS</span>
            </div>
          </div>
        </section>

        <section className="case-study-section">
          <div className="wrap">
            <div className="section-heading case-study-heading">
              <div>
                <p className="eyebrow">Case studies</p>
                <h2>Selected systems.</h2>
              </div>
              <p>
                Six descriptions of platform, operations, API, and analytics work, including the
                constraints and tradeoffs involved.
              </p>
            </div>
            <div className="home-case-list">
              {caseStudies.map((study) => (
                <a href={`/case-studies/${study.slug}`} key={study.slug}>
                  <span>{study.index}</span>
                  <strong>{study.title}</strong>
                  <em>{study.tags.slice(0, 2).join(" · ")}</em>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="selected-work wrap section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Recent projects.</h2>
            </div>
            <p>
              Three current public projects. The complete list is in the repository archive below.
            </p>
          </div>

          <div className="project-stack">
            {selectedProjects.map((project) => (
              <a
                className={`project-feature project-${project.color}`}
                href={project.href}
                key={project.title}
                target="_blank"
                rel="noreferrer"
              >
                <div className="project-meta">
                  <span>{project.number}</span>
                  <span>{project.year}</span>
                </div>
                <div className="project-title-wrap">
                  <p>{project.label}</p>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-detail">
                  <span>{project.detail}</span>
                  <span className="round-arrow" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="archive-callout">
          <div className="wrap archive-callout-inner">
            <div className="archive-stamp" aria-hidden="true">
              <span>THE WHOLE</span>
              <strong>{projects.length}</strong>
              <span>REPOSITORIES</span>
            </div>
            <div className="archive-copy">
              <p className="eyebrow">Repository archive</p>
              <h2>All public repositories.</h2>
              <p>
                {originals} original projects plus forks, sandboxes, old utilities, and unfinished
                work, collected from GitHub.
              </p>
              <a className="button button-light" href="/archive">Browse the archive <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="notes-section wrap section-space">
          <div className="section-heading notes-heading">
            <div>
              <p className="eyebrow">Blog</p>
              <h2>Notes and postmortems.</h2>
            </div>
            <a className="text-link" href="/blog">All posts <span aria-hidden="true">→</span></a>
          </div>
          <div className="notes-grid">
            {posts.map((post, index) => (
              <a className="note-card" href={`/blog/${post.slug}`} key={post.slug}>
                <div className={`note-visual note-visual-${index + 1}`} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                </div>
                <div className="note-meta">
                  <time dateTime={post.date}>{post.displayDate}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="note-read">Read post →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="failure-section">
          <div className="wrap failure-grid">
            <p className="failure-index">FAILED AND UNFINISHED WORK</p>
            <div className="failure-copy">
              <h2>Some things<br /><span>didn’t work.</span></h2>
              <p>
                I’m including abandoned prototypes, bad assumptions, and projects that stopped. They
                are part of the work and often explain later decisions.
              </p>
              <a href="/blog/the-things-that-didnt-ship-belong-here">Read the note <span aria-hidden="true">→</span></a>
            </div>
            <blockquote>Failures are documented alongside finished projects.</blockquote>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <div>
          <p className="eyebrow">Contact</p>
          <a className="footer-email" href="mailto:bijan.pourriahi@gmail.com">bijan.pourriahi@gmail.com ↗</a>
        </div>
        <div className="footer-links">
          <a href="https://github.com/beejmaxx" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/resume.pdf">Résumé</a>
          <a href="/engine-sim/">Engine sim</a>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="footer-note">Source code and blog posts are stored on GitHub.</p>
      </footer>
    </>
  );
}
