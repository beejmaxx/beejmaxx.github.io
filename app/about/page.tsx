import type { Metadata } from "next";
import { SimpleFooter, SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About",
  description: "About Bijan Pourriahi, a senior platform engineer working across developer tooling, APIs, real-time systems, and research infrastructure.",
};

const principles = [
  ["01", "Make complex systems legible", "Good interfaces, evidence, and operational visibility turn infrastructure into something people can trust."],
  ["02", "Keep the evidence", "Replay, source, notes, false starts, and decisions are part of the work—not clutter around it."],
  ["03", "Own the whole loop", "Architecture matters, but so do deployment, debugging, operations, and iteration until the system is useful."],
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero wrap">
          <p className="eyebrow">About</p>
          <h1>Bijan Pourriahi.</h1>
          <p className="page-deck">I’m a software engineer working on developer platforms, APIs, integrations, real-time systems, and research infrastructure.</p>
        </section>
        <section className="about-grid wrap">
          <aside className="about-facts" aria-label="Quick facts">
            <div className="about-fact"><span>Role</span><span>Senior platform engineer</span></div>
            <div className="about-fact"><span>Public repositories</span><span>126</span></div>
            <div className="about-fact"><span>GitHub since</span><span>2010</span></div>
            <div className="about-fact"><span>Core stack</span><span>Rust · Python · TypeScript</span></div>
            <div className="about-fact"><span>Long-running thread</span><span>Systems that explain themselves</span></div>
            <div className="about-fact"><span>Contact</span><span>bijan.pourriahi@gmail.com</span></div>
          </aside>
          <div className="about-copy">
            <p>
              I’m Bijan Pourriahi, a senior software engineer focused on platform engineering,
              developer tooling, APIs, integrations, and production systems.
            </p>
            <p>
              I’ve built SaaS products, financial infrastructure, browser automation systems,
              market research platforms, dashboards, CLIs, data pipelines, and agent-facing tools.
              The common thread is making complicated workflows observable and reproducible.
            </p>
            <p>
              This site is the index I wanted: the case studies and the whole public record—forks,
              sandboxes, deep technical builds, abandoned directions, and the lessons connecting them.
            </p>
            <div className="principles">
              {principles.map(([number, title, copy]) => (
                <div className="principle" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}
