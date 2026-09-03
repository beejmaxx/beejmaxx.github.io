import type { Metadata } from "next";
import { BlogShell } from "@/components/BlogShell";
import { getAllPosts } from "@/lib/posts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Posts",
  description: "Notes on software, systems, markets, and the work of building them.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "bijan's notes",
    description: "Notes on software, systems, markets, and the work of building them.",
    url: "/blog",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "bijan's notes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "bijan's notes",
    description: "Notes on software, systems, markets, and the work of building them.",
    images: ["/og.png"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <BlogShell>
      <main id="main" className={styles.main}>
        <h1>Posts</h1>
        <ol className={styles.posts}>
          {posts.map((post) => (
            <li key={post.slug}>
              <time dateTime={post.date}>{post.displayDate}</time>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ol>
      </main>
    </BlogShell>
  );
}
