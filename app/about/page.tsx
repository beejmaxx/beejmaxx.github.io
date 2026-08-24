import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import styles from "./about.module.css";

export const metadata: Metadata = { title:"about",description:"About bijan and the recurring ideas behind the work.",alternates:{canonical:"/about"},openGraph:{title:"about — bijan",description:"Software engineer making hidden systems inspectable.",url:"/about"} };

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
        <header className="pageHero"><h1>About</h1><p className="deck">I’m Bijan, a systems engineer.</p></header>
        <section className={styles.copy}>
          <p>I build agent infrastructure, integration systems, developer tools, market infrastructure, and operational control surfaces.</p>
          <p>The domain changes, but the questions repeat: What state matters? Who owns it? Can the behavior be interrupted and recovered? What evidence survives? What does the operator see?</p>
          <p>Agent Supervisor applies those questions to autonomous agents. Aikido applies them to research, simulation, and execution. Both are prototypes, documented according to what their current implementations actually support.</p>
        </section>
        <section className={styles.section}><h2>Background</h2><ol>{timeline.map(([date, note]) => <li key={date}><span>{date}</span><p>{note}</p></li>)}</ol></section>
        <section className={styles.section}><h2>Links</h2><dl><div><dt>Résumé</dt><dd><a href="/resume.pdf">PDF ↗</a></dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/beejmaxx">beejmaxx ↗</a></dd></div><div><dt>Email</dt><dd><a href="mailto:bijan.pourriahi@gmail.com">bijan.pourriahi@gmail.com</a></dd></div><div><dt>Tools</dt><dd>Rust, Python, TypeScript, Go</dd></div></dl></section>
      </main>
    </SiteShell>
  );
}
