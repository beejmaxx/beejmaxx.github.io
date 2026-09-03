import { BlogShell } from "@/components/BlogShell";
import { getAllPosts } from "@/lib/posts";
import styles from "./home.module.css";

export default function HomePage() {
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
