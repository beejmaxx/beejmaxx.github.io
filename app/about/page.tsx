import type { Metadata } from "next";
import { PersonalSiteShell } from "@/components/PersonalSiteShell";
import styles from "../site-pages.module.css";

export const metadata: Metadata = { title: "About", description: "About bijan." };

const rules = [
  ["01", "show the state", "If a machine knows something important, the person operating it should be able to see it."],
  ["02", "keep the receipts", "Sources, replays, decisions, failed attempts, and weird intermediate artifacts stay attached."],
  ["03", "finish the loop", "Architecture, interface, deployment, debugging, and use are one job."],
] as const;

export default function AboutPage() {
  return (
    <PersonalSiteShell section="about">
      <main>
        <section className={styles.hero} data-mark="@"><p className={styles.overline}>about the person</p><h1><span>bijan.</span></h1><p className={styles.deck}>Software engineer. I like systems that can explain what they are doing.</p></section>
        <section className={styles.split}>
          <ul className={styles.facts}>
            <li><span>github</span><span>beejmaxx</span></li><li><span>since</span><span>2010</span></li><li><span>repos</span><span>126 public</span></li><li><span>usual tools</span><span>Rust / Python / TS</span></li><li><span>contact</span><span><a href="mailto:bijan.pourriahi@gmail.com">email</a></span></li>
          </ul>
          <div className={styles.copy}>
            <p>I build trading infrastructure, developer tools, APIs, browser experiments, data systems, and agent-facing machinery.</p>
            <p>A lot of it is about the same thing: preserving enough evidence to understand what happened, then giving a person a useful way to act on it.</p>
            <p>This site includes the polished work, the small stuff, and the dead ends.</p>
            <div className={styles.rules}>{rules.map(([number,title,copy]) => <div className={styles.rule} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
          </div>
        </section>
      </main>
    </PersonalSiteShell>
  );
}
