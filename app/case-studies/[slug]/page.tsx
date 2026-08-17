import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AccountKernelVisual,
  AccountTraceVisual,
  ConfidenceLadderVisual,
  ConvergenceVisual,
  EvidenceGateVisual,
  ProtectionIncidentVisual,
} from "@/components/AikidoDossierVisuals";
import { SiteShell } from "@/components/SiteShell";
import {
  PredicateCacheReuseDiagram,
  PredicateCorrectionsDiagram,
  PredicatePruningDiagram,
  PredicatePyramidDiagram,
  PredicateSweepDiagram,
} from "@/components/PredicateSweepDiagram";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/case-studies";

export const dynamicParams = false;

const caseStudyVisuals: Record<string, Record<string, ReactNode>> = {
  "predicate-sweep": {
    pruning: <PredicatePruningDiagram />,
    pyramid: <PredicatePyramidDiagram />,
    "cache-reuse": <PredicateCacheReuseDiagram />,
    corrections: <PredicateCorrectionsDiagram />,
  },
  "one-account-truth": {
    "account-kernel": <AccountKernelVisual />,
    "account-trace": <AccountTraceVisual />,
  },
  "converge-dont-command": {
    convergence: <ConvergenceVisual />,
    "protection-incident": <ProtectionIncidentVisual />,
  },
  "results-allowed-to-count": {
    "evidence-gate": <EvidenceGateVisual />,
    "confidence-ladder": <ConfidenceLadderVisual />,
  },
};

const aikidoSeries = [
  ["00", "The Predicate Sweep", "predicate-sweep"],
  ["01", "One Account, One Truth", "one-account-truth"],
  ["02", "Converge, Don’t Command", "converge-dont-command"],
  ["03", "When a Result Is Allowed to Count", "results-allowed-to-count"],
] as const;

const caseStudyScreenshots: Record<string, Array<{ src: string; alt: string; caption: string; portrait?: boolean }>> = {
  "operations-workstation": [
    {
      src: "/assets/screenshots/live-execution-dashboard.png",
      alt: "Desktop execution dashboard with a live chart, account table, order controls, and emergency actions",
      caption: "Desktop execution view with account state and explicit emergency controls.",
    },
    {
      src: "/assets/screenshots/mobile-control-surface.png",
      alt: "Mobile trading control surface with chart overlays, recent trades, and emergency actions",
      caption: "The same operational model carried into a narrow mobile control surface.",
      portrait: true,
    },
  ],
};

function CaseStudyMarkdown({ content, slug }: { content: string; slug: string }) {
  const visuals = caseStudyVisuals[slug];
  if (!visuals) {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
  }

  const visualNames = Object.keys(visuals).join("|");
  const visualPattern = new RegExp(`(\\[\\[visual:(?:${visualNames})\\]\\])`, "g");
  return content.split(visualPattern).map((part, index) => {
    const match = part.match(/^\[\[visual:([a-z-]+)\]\]$/);
    if (match) {
      return <div key={`${match[1]}-${index}`}>{visuals[match[1]]}</div>;
    }
    return part.trim() ? <ReactMarkdown key={`copy-${index}`} remarkPlugins={[remarkGfm]}>{part}</ReactMarkdown> : null;
  });
}

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getCaseStudySlugs().includes(slug)) return {};
  const study = getCaseStudyBySlug(slug);
  const socialImage = slug === "predicate-sweep" ? "/predicate-sweep-og.jpg" : study.image;
  return {
    title: study.title,
    description: study.subtitle,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: `${study.title} — bijan`,
      description: study.subtitle,
      url: `/case-studies/${slug}`,
      images: socialImage ? [socialImage] : [],
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: `${study.title} — bijan`,
      description: study.subtitle,
      images: socialImage ? [socialImage] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCaseStudySlugs().includes(slug)) notFound();
  const study = getCaseStudyBySlug(slug);
  const isAikidoDossier = aikidoSeries.some(([, , seriesSlug]) => seriesSlug === slug);
  return (
    <SiteShell current="case studies">
      <main className="page" id="main">
        <article className="article-shell case-article-shell">
          <a className="article-back" href={isAikidoDossier ? "/aikido/" : "/case-studies"}>{isAikidoDossier ? "← Aikido dossiers" : "← all dossiers"}</a>
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
          {caseStudyScreenshots[slug]?.length > 0 && (
            <section className="case-screenshot-gallery" aria-labelledby="interface-screenshots">
              <h2 id="interface-screenshots">Interface screenshots</h2>
              {caseStudyScreenshots[slug].map((screenshot) => (
                <figure className={screenshot.portrait ? "is-portrait" : undefined} key={screenshot.src}>
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.portrait ? 945 : 2000}
                    height={screenshot.portrait ? 2048 : 1200}
                    sizes={screenshot.portrait ? "(max-width: 880px) 82vw, 32rem" : "(max-width: 880px) 100vw, 800px"}
                  />
                  <figcaption>{screenshot.caption}</figcaption>
                </figure>
              ))}
            </section>
          )}
          {study.slug === "predicate-sweep" && <PredicateSweepDiagram />}
          <div className="prose case-prose">
            <CaseStudyMarkdown content={study.content} slug={study.slug} />
          </div>
          {isAikidoDossier && (
            <nav className="case-series" aria-label="Aikido dossier series">
              <p className="eyebrow">Aikido / subsystem dossiers</p>
              {aikidoSeries.map(([index, title, seriesSlug]) => (
                <a href={`/case-studies/${seriesSlug}`} key={seriesSlug} aria-current={seriesSlug === slug ? "page" : undefined}>
                  <span>{index}</span><strong>{title}</strong><i>{seriesSlug === slug ? "current" : "open →"}</i>
                </a>
              ))}
            </nav>
          )}
        </article>
      </main>
    </SiteShell>
  );
}
