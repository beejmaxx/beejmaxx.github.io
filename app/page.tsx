import { SiteShell } from "@/components/SiteShell";
import { books } from "@/lib/books";
import { getWork } from "@/lib/work";
import styles from "./home.module.css";

const selectedWork = ["aikido", "depthfield", "bells", "engine-sim", "observatory"]
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
          <h1>Welcome</h1>
          <p>My name is bijan. I’m a software engineer who builds research systems, browser instruments, developer tools, and technical books.</p>
          <p>Most of my work is about making hidden state easier to inspect, replay, and understand. I work mainly in Rust, Python, and TypeScript.</p>
        </section>

        <section className={styles.section}>
          <header><h2>Aikido</h2></header>
          <p className={styles.intro}>A research, simulation, execution, and evaluation system for systematic trading. This is the largest body of work on the site.</p>
          <nav className={styles.inlineLinks}><a href="/aikido/">About Aikido</a><a href="https://github.com/beejmaxx/aikido-systematic-trading">GitHub repository</a></nav>
          <ul className={styles.rows}>
            {aikidoStudies.map(([title, href]) => <li key={href}><a href={href}><strong>{title}</strong></a></li>)}
          </ul>
        </section>

        <section className={styles.section}>
          <header><h2>Selected work</h2></header>
          <ul className={styles.rows}>
            {selectedWork.slice(1).map((item) => item && <li key={item.id}><a href={item.demo ?? item.caseStudy ?? item.source}><strong>{item.title}</strong><span>{item.thesis}</span></a></li>)}
          </ul>
          <p className={styles.more}><a href="/work">All work →</a></p>
        </section>

        <section className={styles.section}>
          <header><h2>Books</h2></header>
          <ul className={styles.rows}>
            {books.slice(0, 3).map((book) => <li key={book.id}><a href={book.onePager ? `/books/${book.id}` : book.demo}><strong>{book.title}</strong><span>{book.thesis}</span></a></li>)}
          </ul>
          <p className={styles.more}><a href="/books">All books →</a></p>
        </section>
      </main>
    </SiteShell>
  );
}
