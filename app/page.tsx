import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { bench, getWork, trails, workForTrail } from "@/lib/work";
import styles from "./home.module.css";

const aikido = getWork("aikido")!;
const depthfield = getWork("depthfield")!;

const systemStages = [
  ["01", "market facts", "bars · features · causal state"],
  ["02", "research", "search · score · retain evidence"],
  ["03", "frozen input", "what was knowable then"],
  ["04", "policy", "requested target exposure"],
  ["05", "runtime", "converge observed to desired"],
  ["06", "evaluation", "account path · confidence · verdict"],
];

export default function HomePage() {
  return (
    <SiteShell current="home">
      <main id="main" className={styles.main}>
        <section className={styles.hero}>
          <p className="eyebrow">software · systems · experiments</p>
          <h1>I make hidden systems <em>inspectable.</em></h1>
          <p>I keep building ways to see things that are otherwise hard to see: an order book over time, a trading system’s decisions, a bot policy’s errors, or a Rust API’s tradeoffs.</p>
          <nav aria-label="Homepage shortcuts"><a href="#aikido">start with Aikido ↓</a><a href="/work">map the work ↗</a></nav>
        </section>

        <section className={`${styles.aikidoExhibit} panel`} id="aikido">
          <div className={styles.exhibitTop}><span>01 / flagship system</span><span>research · simulation · execution · evaluation</span></div>
          <div className={styles.aikidoIntro}>
            <div><p className="eyebrow">the largest body of work here</p><h2>{aikido.title}</h2></div>
            <div><strong>{aikido.thesis}</strong><p>{aikido.description}</p><p className={styles.proof}>{aikido.proof}</p><nav><a href="/aikido/">enter the system →</a><a href="/case-studies">four dossiers ↗</a><a href={aikido.source} target="_blank" rel="noreferrer">source ↗</a></nav></div>
          </div>
          <div className={styles.aikidoFlow}>
            <header><span>system / 01</span><strong>one project · several truth boundaries</strong></header>
            <ol>{systemStages.map(([number,title,note])=><li key={number}><span>{number}</span><strong>{title}</strong><small>{note}</small></li>)}</ol>
          </div>
          <div className={styles.aikidoDossiers}>
            <a href="/case-studies/predicate-sweep"><span>00 / search</span><strong>The Predicate Sweep</strong></a>
            <a href="/case-studies/one-account-truth"><span>01 / account</span><strong>One Account, One Truth</strong></a>
            <a href="/case-studies/converge-dont-command"><span>02 / execution</span><strong>Converge, Don’t Command</strong></a>
            <a href="/case-studies/results-allowed-to-count"><span>03 / evidence</span><strong>When a Result Is Allowed to Count</strong></a>
          </div>
        </section>

        <section className={`${styles.depthfieldFeature} panel`}>
          <a href={depthfield.demo} target="_blank" rel="noreferrer"><Image src={depthfield.evidence!} alt={depthfield.evidenceAlt!} width={1680} height={955} sizes="(max-width: 800px) 100vw, 58vw" priority /></a>
          <div><p className="eyebrow">02 / live instrument</p><h2>{depthfield.title}</h2><strong>{depthfield.thesis}</strong><p>{depthfield.description}</p><nav><a href={depthfield.demo} target="_blank" rel="noreferrer">open ↗</a><a href={depthfield.source} target="_blank" rel="noreferrer">source ↗</a></nav></div>
        </section>

        <section className={styles.trails}>
          <header><p className="eyebrow">three ways in</p><h2>Same obsession, different project.</h2><p>The categories overlap. That is the point.</p></header>
          <div className={styles.trailGrid}>
            {trails.map((trail) => (
              <article className="panel" key={trail.id}>
                <span>{trail.number}</span><h3>{trail.title}</h3><p>{trail.description}</p>
                <ol>{workForTrail(trail.id).slice(0,5).map((item) => <li key={item.id}><a href={item.demo ?? item.caseStudy ?? item.source}><strong>{item.title}</strong><span>{item.status}</span></a></li>)}</ol>
                <a href={trail.id === "library" ? "/books" : `/work#${trail.id}`}>follow this trail →</a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.evidenceMode}>
          <p className="sectionLabel">evidence mode</p>
          <div className={`${styles.evidenceGrid} panel`}>
            <div><span>see it</span><strong>Depthfield</strong><p>Watch public liquidity accumulate, disappear, and trade.</p></div>
            <div><span>hear it</span><strong>Bells</strong><p>Strike a synthesized bowl with velocity and position.</p><a href="https://beejmaxx.github.io/bells/">play ↗</a></div>
            <div><span>search it</span><strong>Predicate sweep</strong><p>See how 86 billion possible quads became a staged bitset and graph search.</p><a href="/case-studies/predicate-sweep">open dossier ↗</a></div>
            <div><span>read it four ways</span><strong>Rust API Field Guide</strong><p>One curriculum, reordered around different ways of learning.</p><a href="https://beejmaxx.github.io/rust-api-field-guide/">open ↗</a></div>
          </div>
        </section>

        <section className={styles.bench}>
          <header><p className="eyebrow">on the bench</p><h2>Recent state changes.</h2></header>
          <div>{bench.map(([date,status,note]) => <article key={`${date}-${status}`}><time dateTime={date}>{date}</time><span>{status}</span><p>{note}</p></article>)}</div>
          <p className={styles.benchNote}>Not a feed. Just enough dated state to show what is moving.</p>
        </section>

      </main>
    </SiteShell>
  );
}
