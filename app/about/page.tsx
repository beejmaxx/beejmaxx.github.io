import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import styles from "./about.module.css";

export const metadata: Metadata = { title:"about",description:"About Bijan Pourriahi and his work on runtimes, integrations, and tools for complex, stateful systems.",alternates:{canonical:"/about"},openGraph:{title:"about — Bijan Pourriahi",description:"Systems engineer building runtimes, integrations, and tools for complex, stateful systems.",url:"/about"} };

const timeline = [
  ["2010", "small programs, Ruby, Rails, and learning in public"],
  ["later", "products, integrations, browser automation, and operational systems"],
  ["then", "market data, simulation, execution, and screens for live state"],
  ["now", "reliable agent infrastructure, Rust systems, and developer tooling"],
];

export default function AboutPage() {
  return (
    <SiteShell current="about">
      <main className="page" id="main">
        <header className="pageHero"><h1>About</h1></header>
        <section className={styles.copy}>
          <p>I build agent infrastructure, integration systems, developer tools, market infrastructure, and operational control surfaces.</p>
          <p>The domain changes, but the questions repeat: What state matters? Who owns it? Can the behavior be interrupted and recovered? What evidence survives? What does the operator see?</p>
          <p>Agent Supervisor applies those questions to external AI agents. Aikido applies them to research, simulation, and execution. Both are prototypes, documented according to what their current implementations actually support.</p>
        </section>
        <section className={styles.section}><h2>Background</h2><ol>{timeline.map(([date, note]) => <li key={date}><span>{date}</span><p>{note}</p></li>)}</ol></section>
        <section className={styles.section}><h2>Links</h2><dl><div><dt>Résumé</dt><dd><a href="/resume.pdf">PDF ↗</a></dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/beejmaxx">beejmaxx ↗</a></dd></div><div><dt>Email</dt><dd><a href="mailto:beejmaxx@gmail.com">beejmaxx@gmail.com</a></dd></div><div><dt>Tools</dt><dd>Rust, Python, TypeScript, Go</dd></div></dl></section>
      </main>
    </SiteShell>
  );
}
