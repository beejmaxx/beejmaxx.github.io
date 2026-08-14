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
    openGraph: {
      title: `${book.title} — bijan`,
      description: book.onePager.promise,
      url: `/books/${slug}`,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${book.title} — bijan`,
      description: book.onePager.promise,
      images: [],
    },
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
        <a className={styles.back} href="/books">← all books</a>

        <header className={styles.hero}>
          <p className="eyebrow">{page.kicker}</p>
          <p className={styles.status}>{book.status}</p>
          <h1>{book.title}</h1>
          <p className={styles.subtitle}>{book.thesis}</p>
          <p className={styles.promise}>{page.promise}</p>
          <nav className={styles.actions} aria-label={`${book.title} actions`}>
            {book.demo && <a className={styles.primary} href={book.demo}>Read the working draft ↗</a>}
            <a href="mailto:bijan.pourriahi@gmail.com?subject=Platform%20Integrity">Discuss an engagement ↗</a>
          </nav>
        </header>

        <section className={styles.problem} aria-labelledby="category-error">
          <p className="eyebrow">the category error</p>
          <h2 id="category-error">Don’t ask “Is this a bot?” first.</h2>
          <p>{page.problem}</p>
          <blockquote>What behavior threatens the ecosystem, what evidence do we have, and what intervention is justified?</blockquote>
        </section>

        <section className={styles.outcomes} aria-labelledby="reader-outcomes">
          <header>
            <p className="eyebrow">what readers can do</p>
            <h2 id="reader-outcomes">From detector thinking to defensible decisions.</h2>
          </header>
          <ol>
            {page.outcomes.map((outcome, index) => <li key={outcome}><span>0{index + 1}</span><p>{outcome}</p></li>)}
          </ol>
        </section>

        <section className={styles.framework} aria-labelledby="framework">
          <header>
            <p className="eyebrow">the operating model</p>
            <h2 id="framework">One framework across the integrity lifecycle.</h2>
          </header>
          <div className={styles.decisionGrid}>
            {page.decisions.map((decision) => (
              <article key={decision.label}>
                <span>{decision.label}</span>
                <h3>{decision.title}</h3>
                <p>{decision.description}</p>
              </article>
            ))}
          </div>
          <p className={styles.chain}>ecosystem → harm → policy → evidence → inference → intervention → recourse → adaptation</p>
        </section>

        <section className={styles.fit}>
          <div>
            <p className="eyebrow">written for</p>
            <h2>People accountable for the whole decision.</h2>
            <ul>{page.audience.map((audience) => <li key={audience}>{audience}</li>)}</ul>
          </div>
          <div className={styles.evidence}>
            <p className="eyebrow">built to withstand scrutiny</p>
            <h2>Research with the receipts attached.</h2>
            <p>{page.evidence}</p>
            {book.demo && <a href={`${book.demo}research/README.html`}>Inspect the research library ↗</a>}
          </div>
        </section>

        <section className={styles.cta}>
          <p className="eyebrow">read it · challenge it · apply it</p>
          <h2>Build integrity systems that deserve authority.</h2>
          <p>The manuscript is being researched and written in public. Use it as a field guide, a review framework, or a common language across engineering, product, policy, and operations.</p>
          <nav className={styles.actions} aria-label="Final actions">
            {book.demo && <a className={styles.primary} href={book.demo}>Start reading ↗</a>}
            {book.source && <a href={book.source}>Follow the source ↗</a>}
            <a href="mailto:bijan.pourriahi@gmail.com?subject=Platform%20Integrity">Work with Bijan ↗</a>
          </nav>
        </section>
      </main>
    </SiteShell>
  );
}
