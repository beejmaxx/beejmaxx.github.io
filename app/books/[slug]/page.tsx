import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { getBook, getOnePagerBookIds } from "@/lib/books";
import styles from "./one-pager.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return getOnePagerBookIds().map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const book = getBook(slug); if (!book?.onePager) return {};
  return { title:book.title,description:book.onePager.promise,alternates:{canonical:`/books/${slug}`},openGraph:{title:`${book.title} — bijan`,description:book.onePager.promise,url:`/books/${slug}`,images:[]},twitter:{card:"summary",title:`${book.title} — bijan`,description:book.onePager.promise,images:[]} };
}

export default async function BookOnePager({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const book = getBook(slug); if (!book?.onePager) notFound(); const page = book.onePager;
  return (
    <SiteShell current="books">
      <main className={styles.main} id="main">
        <a className={styles.back} href="/books">← all books</a>
        <header className={styles.header}><p>{book.status}</p><h1>{book.title}</h1><strong>{book.thesis}</strong><p>{page.problem}</p><nav>{book.demo && <a href={book.demo}>read the public draft →</a>}{book.source && <a href={book.source}>source ↗</a>}</nav></header>
        <section><h2>What it does</h2><p className={styles.lede}>{page.promise}</p><ul>{page.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>
        <section><h2>The argument</h2><ol className={styles.decisions}>{page.decisions.map((decision) => <li key={decision.label}><span>{decision.label}</span><div><h3>{decision.title}</h3><p>{decision.description}</p></div></li>)}</ol></section>
        <section><h2>Who it is for</h2><ul>{page.audience.map((audience) => <li key={audience}>{audience}</li>)}</ul></section>
        <section><h2>How it is being built</h2><p>{page.evidence}</p></section>
      </main>
    </SiteShell>
  );
}
