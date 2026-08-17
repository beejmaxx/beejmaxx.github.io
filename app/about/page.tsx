import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import styles from "./about.module.css";

export const metadata: Metadata = { title:"about",description:"About bijan and the recurring ideas behind the work.",alternates:{canonical:"/about"},openGraph:{title:"about — bijan",description:"Software engineer making hidden systems inspectable.",url:"/about"} };

const timeline = [
  ["2010", "small programs, Ruby, Rails, and learning in public"],
  ["later", "products, integrations, browser automation, and operational systems"],
  ["then", "market data, simulation, execution, and screens for live state"],
  ["now", "Rust, research systems, playable models, books, and source libraries"],
];

export default function AboutPage() {
  return (
    <SiteShell current="about">
      <main className="page" id="main">
        <header className="pageHero"><h1>About</h1><p className="deck">I’m bijan, a software engineer.</p></header>
        <section className={styles.copy}>
          <p>I build market infrastructure, developer tools, browser instruments, data systems, technical books, and research libraries.</p>
          <p>The material changes, but the questions repeat: What state matters? Can the behavior be replayed? What evidence survives? What does the operator see?</p>
          <p>Aikido is the largest project here. It brings those questions together across research, simulation, execution, and evaluation.</p>
        </section>
        <section className={styles.section}><h2>Background</h2><ol>{timeline.map(([date, note]) => <li key={date}><span>{date}</span><p>{note}</p></li>)}</ol></section>
        <section className={styles.section}><h2>Links</h2><dl><div><dt>GitHub</dt><dd><a href="https://github.com/beejmaxx">beejmaxx ↗</a></dd></div><div><dt>Email</dt><dd><a href="mailto:bijan.pourriahi@gmail.com">bijan.pourriahi@gmail.com</a></dd></div><div><dt>Tools</dt><dd>Rust, Python, TypeScript, Go</dd></div></dl></section>
      </main>
    </SiteShell>
  );
}
