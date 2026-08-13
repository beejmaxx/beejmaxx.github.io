import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SimpleFooter, SiteHeader } from "@/components/SiteHeader";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const post = getPostBySlug(slug);
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const post = getPostBySlug(slug);

  return (
    <>
      <SiteHeader />
      <main className="page-main wrap">
        <article className="article-shell">
          <a className="article-back" href="/blog">← All blog posts</a>
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
      <SimpleFooter />
    </>
  );
}
