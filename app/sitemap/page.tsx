import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { books } from "@/lib/books";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllPosts } from "@/lib/posts";
import styles from "./sitemap.module.css";

export const metadata: Metadata = {
  title: "sitemap",
  description: "An index of pages on bijan’s site.",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  const studies = getAllCaseStudies();
  const posts = getAllPosts();

  return (
    <SiteShell>
      <main className="page" id="main">
        <header className="pageHero">
          <h1>Sitemap</h1>
          <p className="deck">A plain index of the site.</p>
        </header>
        <div className={styles.index}>
          <section>
            <h2>Main</h2>
            <ul><li><a href="/">Home</a></li><li><a href="/work">Work</a></li><li><a href="/about">About</a></li></ul>
          </section>
          <section>
            <h2>Aikido</h2>
            <ul><li><a href="/aikido/">Overview</a></li><li><a href="/aikido/architecture.html">Architecture</a></li></ul>
          </section>
          <section>
            <h2>Case studies</h2>
            <ul>{studies.map((study) => <li key={study.slug}><a href={`/case-studies/${study.slug}`}>{study.title}</a></li>)}</ul>
          </section>
          <section>
            <h2>Books</h2>
            <ul><li><a href="/books">All books</a></li>{books.map((book) => <li key={book.id}>{book.onePager ? <a href={`/books/${book.id}`}>{book.title}</a> : book.demo ? <a href={book.demo}>{book.title}</a> : book.title}</li>)}</ul>
          </section>
          <section>
            <h2>Notes</h2>
            <ul><li><a href="/notes">All notes</a></li>{posts.map((post) => <li key={post.slug}><a href={`/blog/${post.slug}`}>{post.title}</a></li>)}</ul>
          </section>
          <section>
            <h2>Indexes</h2>
            <ul><li><a href="/library">Library</a></li><li><a href="/work-map">Work map</a></li></ul>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
