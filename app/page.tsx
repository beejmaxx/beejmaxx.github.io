import { SiteShell } from "@/components/SiteShell";
import { getWork } from "@/lib/work";
import styles from "./home.module.css";

const agentInfrastructure = ["agent-supervisor", "mcphub"]
  .map(getWork)
  .filter(Boolean);

const selectedWork = ["aikido", "depthfield", "operations", "bot-defense"]
  .map(getWork)
  .filter(Boolean);

const aikidoStudies = [
  ["The Predicate Sweep", "/case-studies/predicate-sweep"],
  ["One Account, One Truth", "/case-studies/one-account-truth"],
  ["Converge, Don’t Command", "/case-studies/converge-dont-command"],
  ["When a Result Is Allowed to Count", "/case-studies/results-allowed-to-count"],
] as const;

export default function HomePage() {
  return (
    <SiteShell current="home">
      <main id="main" className={styles.main}>
        <section className={styles.hero}>
          <h1>Reliable systems for agents and operators.</h1>
          <p>I’m Bijan, a systems engineer focused on agent infrastructure, developer tooling, and stateful execution systems.</p>
          <p>I build around unreliable external processes: durable state, cancellation and recovery, protocol boundaries, evidence capture, and operator-facing controls. I work mainly in Rust, Python, and TypeScript.</p>
          <nav className={styles.inlineLinks}><a href="/resume.pdf">Résumé</a><a href="https://github.com/beejmaxx">GitHub</a></nav>
        </section>

        <section className={styles.section}>
          <header><h2>Agent infrastructure</h2></header>
          <p className={styles.intro}>Experiments in supervising external AI agents and their capabilities without pretending the host controls what it cannot observe.</p>
          <ul className={styles.rows}>
            {agentInfrastructure.map((item) => item && <li key={item.id}><a href={item.caseStudy ?? item.source}><strong>{item.title}</strong><span>{item.thesis}</span></a></li>)}
          </ul>
        </section>

        <section className={styles.section}>
          <header><h2>Selected systems</h2></header>
          <ul className={styles.rows}>
            {selectedWork.map((item) => item && <li key={item.id}><a href={item.demo ?? item.caseStudy ?? item.source}><strong>{item.title}</strong><span>{item.thesis}</span></a></li>)}
          </ul>
          <p className={styles.more}><a href="/work">All work →</a></p>
        </section>

        <section className={styles.section}>
          <header><h2>Aikido case studies</h2></header>
          <p className={styles.intro}>Engineering records from a systematic-trading research and execution system: state machines, distributed reconciliation, reproducibility, and evaluation.</p>
          <ul className={styles.rows}>
            {aikidoStudies.map(([title, href]) => <li key={href}><a href={href}><strong>{title}</strong></a></li>)}
          </ul>
          <p className={styles.more}><a href="/aikido/">Aikido system overview →</a></p>
        </section>
      </main>
    </SiteShell>
  );
}
