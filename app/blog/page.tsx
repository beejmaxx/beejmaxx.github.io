import type { Metadata } from "next";
import { SimpleFooter, SiteHeader } from "@/components/SiteHeader";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building software, local-first experiments, product decisions, and the projects that did not ship.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero wrap">
          <p className="eyebrow">Blog · Markdown in this repository</p>
          <h1>Notes on software<br /><span className="serif">and projects.</span></h1>
          <p className="page-deck">
            Build logs, technical decisions, open questions, and postmortems. Each post is a Markdown
            file in the same GitHub repository as the site.
          </p>
        </section>
        <section className="blog-list wrap" aria-label="Articles">
          {posts.map((post) => (
            <a className="blog-row" href={`/blog/${post.slug}`} key={post.slug}>
              <time dateTime={post.date}>{post.displayDate}</time>
              <div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <span className="reading-time">{post.readingTime} ↗</span>
            </a>
          ))}
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}
