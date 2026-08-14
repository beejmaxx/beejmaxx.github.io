import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import styles from "./books.module.css";

export const metadata: Metadata = {
  title: "books",
  description: "Technical books written by bijan.",
  alternates: { canonical: "/books" },
  openGraph: {
    title: "books — bijan",
    description: "Technical books about Rust, APIs, and systems.",
    url: "/books",
  },
};

const books = [
  {
    id: "platform-integrity",
    title: "Platform Integrity",
    status: "working",
    thesis: "Detecting and responding to bots, fraud, and marketplace abuse.",
    description: "A defensive guide to telemetry, detection, decision systems, interventions, evaluation, and marketplace integrity.",
    demo: "https://beejmaxx.github.io/platform-integrity/",
    source: "https://github.com/beejmaxx/platform-integrity",
  },
  {
    id: "rust-api-gallery",
    title: "Rust API Design Guidebook",
    status: "working",
    thesis: "Consumer-visible API decisions, specimen by specimen.",
    description: "Complete programs and implementation trails from important Rust libraries, organized around API-design questions.",
    demo: "https://beejmaxx.github.io/rust-api-gallery/",
    source: "https://github.com/beejmaxx/rust-api-gallery",
  },
  {
    id: "async-rust-guidebook",
    title: "Async Rust Guidebook",
    status: "working",
    thesis: "A consumer-first guide to asynchronous Rust.",
    description: "Complete programs, observed output, ordering timelines, cancellation, and library-level async design.",
    demo: "https://beejmaxx.github.io/async-rust-guidebook/",
    source: "https://github.com/beejmaxx/async-rust-guidebook",
  },
  {
    id: "building-dependable-data-systems",
    title: "Building Dependable Data Systems",
    status: "local draft",
    thesis: "A practical guide to dependable data-intensive systems.",
    description: "A book in progress. Its repository is currently local and has not been published to GitHub yet.",
  },
  {
    id: "distributed-systems-guidebook",
    title: "Distributed Systems Guidebook",
    status: "local draft",
    thesis: "A practical guide to distributed-systems concepts and design.",
    description: "A book in progress. Its repository is currently local and has not been published to GitHub yet.",
  },
];

export default function BooksPage() {
  return (
    <SiteShell current="books">
      <main className={styles.main} id="main">
        <header className={styles.intro}>
          <p className="eyebrow">books</p>
          <h1>Books I’m writing.</h1>
          <p>Practical, example-led guides to Rust APIs and systems.</p>
        </header>

        <section className={styles.list} aria-label="Books">
          {books.map((book) => (
            <article className={styles.book} key={book.id}>
              <div className={styles.heading}>
                <span>{book.status}</span>
                <h2>{book.title}</h2>
              </div>
              <div className={styles.copy}>
                <p className={styles.thesis}>{book.thesis}</p>
                <p>{book.description}</p>
                <nav aria-label={`${book.title} links`}>
                  {book.demo && <a href={book.demo}>Read the book ↗</a>}
                  {book.source && <a href={book.source}>Source ↗</a>}
                </nav>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
