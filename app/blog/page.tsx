import type { Metadata } from "next";
import { PersonalSiteShell } from "@/components/PersonalSiteShell";
import { getAllPosts } from "@/lib/posts";
import styles from "../site-pages.module.css";

export const metadata: Metadata = { title: "Notes", description: "Notes by Bijan Pourriahi." };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <PersonalSiteShell section="notes" footerNote="nothing invented">
      <main>
        <section className={styles.hero} data-mark="¶"><p className={styles.overline}>notes / eventually</p><h1>things<br /><span>written down.</span></h1><p className={styles.deck}>Build logs, wrong turns, technical notes, and postmortems. Empty for the moment.</p></section>
        {posts.length === 0 ? (
          <section className={styles.empty}><strong>0</strong><div><h2>nothing here yet.</h2><p>The machinery works. The placeholder posts are not public.</p></div></section>
        ) : (
          <section className={styles.index}>{posts.map((post) => <a className={styles.shortRow} href={`/blog/${post.slug}`} key={post.slug}><span>{post.displayDate}</span><h2>{post.title}</h2><p>{post.excerpt}</p><i>↗</i></a>)}</section>
        )}
      </main>
    </PersonalSiteShell>
  );
}
