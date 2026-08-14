import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { getBook, getOnePagerBookIds } from "@/lib/books";
import styles from "./one-pager.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getOnePagerBookIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book?.onePager) return {};
  return {
    title: book.title,
    description: book.onePager.promise,
    alternates: { canonical: `/books/${slug}` },
    openGraph: { title: `${book.title} — bijan`, description: book.onePager.promise, url: `/books/${slug}`, images: [] },
    twitter: { card: "summary", title: `${book.title} — bijan`, description: book.onePager.promise, images: [] },
  };
}

export default async function BookOnePager({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book?.onePager) notFound();
  const page = book.onePager;

  return (
    <SiteShell current="books">
      <main className={styles.main} id="main">
        <a className={styles.back} href="/books">All books</a>

        <div className={styles.masthead}>
          <div className={styles.cover} aria-label={`${book.title} book cover`}>
            <p>{page.kicker}</p>
            <div>
              <h1>Platform<br />Integrity</h1>
              <span aria-hidden="true" />
              <p>{book.thesis}</p>
            </div>
            <strong>Bijan</strong>
          </div>

          <header className={styles.introduction}>
            <p className={styles.status}>{book.status}</p>
            <h2>Most platforms start with the wrong question.</h2>
            <p className={styles.lede}>{page.problem}</p>
            <blockquote>“What behavior threatens the ecosystem, what evidence do we have, and what intervention is justified?”</blockquote>
            <nav className={styles.links} aria-label={`${book.title} actions`}>
              {book.demo && <a href={book.demo}>Read the public draft</a>}
              <a href="mailto:bijan.pourriahi@gmail.com?subject=Platform%20Integrity">Discuss the work</a>
            </nav>
          </header>
        </div>

        <section className={styles.briefing} aria-labelledby="what-it-does">
          <header>
            <p>What it does</p>
            <h2 id="what-it-does">A field guide for decisions that detectors cannot make.</h2>
          </header>
          <div>
            <p className={styles.standfirst}>{page.promise}</p>
            <ul>
              {page.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
            </ul>
          </div>
        </section>

        <section className={styles.argument} aria-labelledby="argument">
          <h2 id="argument">The argument</h2>
          <div>
            {page.decisions.map((decision, index) => (
              <article key={decision.label}>
                <span>{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className={styles.thesis}>
          <p>ecosystem</p><i>→</i><p>evidence</p><i>→</i><p>decision</p><i>→</i><p>recourse</p>
        </aside>

        <section className={styles.notes}>
          <div>
            <h2>Who it is for</h2>
            <p>The people who are accountable for more than a model score.</p>
            <ul>{page.audience.map((audience) => <li key={audience}>{audience}</li>)}</ul>
          </div>
          <div>
            <h2>How it is being built</h2>
            <p>{page.evidence}</p>
            {book.demo && <a href={`${book.demo}research/README.html`}>See the research notes</a>}
          </div>
        </section>

        <footer className={styles.closing}>
          <p>The manuscript is unfinished and public. Read it, challenge it, or use the framework on a system you are responsible for.</p>
          <nav className={styles.links} aria-label="Final actions">
            {book.demo && <a href={book.demo}>Open the book</a>}
            {book.source && <a href={book.source}>View the repository</a>}
            <a href="mailto:bijan.pourriahi@gmail.com?subject=Platform%20Integrity">Work with Bijan</a>
          </nav>
        </footer>
      </main>
    </SiteShell>
  );
}
