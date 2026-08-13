import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteShell } from "@/components/SiteShell";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getCaseStudySlugs().includes(slug)) return {};
  const study = getCaseStudyBySlug(slug);
  return { title: study.title, description: study.subtitle, alternates: { canonical: `/case-studies/${slug}` }, openGraph: { title: `${study.title} — bijan`, description: study.subtitle, url: `/case-studies/${slug}`, ...(study.image ? { images: [study.image] } : {}) } };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCaseStudySlugs().includes(slug)) notFound();
  const study = getCaseStudyBySlug(slug);
  return (
    <SiteShell current="work">
      <main className="page" id="main">
        <article className="article-shell case-article-shell">
          <a className="article-back" href="/case-studies">← all dossiers</a>
          <header className="article-header">
            <p className="eyebrow">dossier {study.index} · {study.tags.join(" · ")}</p>
            <h1>{study.title}</h1>
            <p className="article-excerpt">{study.subtitle}</p>
          </header>
          {study.image && (
            <Image
              className="case-hero-image"
              src={study.image}
              alt={`${study.title} interface`}
              width={1600}
              height={900}
              sizes="(max-width: 980px) 100vw, 980px"
              priority
            />
          )}
          <div className="prose case-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </SiteShell>
  );
}
