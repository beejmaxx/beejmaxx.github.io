import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { books } from "@/lib/books";
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
                <h2>{book.onePager ? <a href={`/books/${book.id}`}>{book.title}</a> : book.title}</h2>
              </div>
              <div className={styles.copy}>
                <p className={styles.thesis}>{book.thesis}</p>
                <p>{book.description}</p>
                <nav aria-label={`${book.title} links`}>
                  {book.onePager && <a href={`/books/${book.id}`}>Overview →</a>}
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
