import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteShell } from "@/components/SiteShell";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: `${post.title} — bijan`, description: post.excerpt, url: `/blog/${slug}`, type: "article", images: [] },
    twitter: { card: "summary", title: `${post.title} — bijan`, description: post.excerpt, images: [] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const post = getPostBySlug(slug);

  return (
    <SiteShell current="notes">
      <main className="page" id="main">
        <article className="article-shell">
          <a className="article-back" href="/notes">← all notes</a>
          <header className="article-header">
            <p className="eyebrow">{post.tags.join(" · ")}</p>
            <h1>{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
            <div className="article-byline">
              <span>by bijan</span>
              <span><time dateTime={post.date}>{post.displayDate}</time> · {post.readingTime}</span>
            </div>
          </header>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </SiteShell>
  );
}
