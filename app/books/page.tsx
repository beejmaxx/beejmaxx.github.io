import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { books } from "@/lib/books";
import styles from "./books.module.css";

export const metadata: Metadata = {
  title: "books",
  description: "Open technical books about systems, electronic markets, and Rust.",
  alternates: { canonical: "/books" },
  openGraph: {
    title: "books — bijan",
    description: "Open technical books about systems, electronic markets, and Rust.",
    url: "/books",
  },
};

export default function BooksPage() {
  const sections = [
    { id: "systems", title: "Systems and markets", books: books.filter((book) => book.area === "systems") },
    { id: "rust", title: "Rust", books: books.filter((book) => book.area === "rust") },
  ];

  return (
    <SiteShell current="books">
      <main className={styles.main} id="main">
        <header className={styles.intro}>
          <p className="eyebrow">books</p>
          <h1>Open books, built in public.</h1>
          <p>Interactive field guides to systems, electronic markets, and Rust. Every listed draft is readable online and has public source.</p>
        </header>

        {sections.map((section) => (
          <section className={styles.section} aria-labelledby={`books-${section.id}`} key={section.id}>
            <div className={styles.sectionHeading}>
              <h2 id={`books-${section.id}`}>{section.title}</h2>
              <span>{section.books.length} {section.books.length === 1 ? "book" : "books"}</span>
            </div>
            <div className={styles.grid}>
              {section.books.map((book) => (
                <article className={styles.book} key={book.id}>
                  <div className={styles.heading}>
                    <span>{book.status}</span>
                    <h3>
                      <a href={book.onePager ? `/books/${book.id}` : book.demo}>{book.title}</a>
                    </h3>
                  </div>
                  <div className={styles.copy}>
                    <p className={styles.thesis}>{book.thesis}</p>
                    <p>{book.description}</p>
                  </div>
                  <nav aria-label={`${book.title} links`}>
                    {book.onePager && <a href={`/books/${book.id}`}>Overview →</a>}
                    {book.demo && <a href={book.demo}>Read ↗</a>}
                    {book.source && <a href={book.source}>Source ↗</a>}
                  </nav>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </SiteShell>
  );
}
