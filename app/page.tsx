import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { bench, getWork, trails, workForTrail } from "@/lib/work";
import styles from "./home.module.css";

const depthfield = getWork("depthfield")!;

export default function HomePage() {
  return (
    <SiteShell current="home">
      <main id="main" className={styles.main}>
        <section className={styles.hero}>
          <p className="eyebrow">software · systems · experiments</p>
          <h1>I make hidden systems <em>inspectable.</em></h1>
          <p>I keep building ways to see things that are otherwise hard to see: an order book over time, a trading system’s decisions, a bot policy’s errors, or a Rust API’s tradeoffs.</p>
          <nav aria-label="Homepage shortcuts"><a href="#depthfield">start with depthfield ↓</a><a href="/work">map the work ↗</a></nav>
        </section>

        <section className={`${styles.exhibit} panel`} id="depthfield">
          <div className={styles.exhibitTop}><span>01 / live instrument</span><span>public data · no account · no backend</span></div>
          <a className={styles.exhibitImage} href={depthfield.demo} target="_blank" rel="noreferrer">
            <Image src={depthfield.evidence!} alt={depthfield.evidenceAlt!} width={1680} height={955} sizes="(max-width: 1100px) 100vw, 1100px" priority />
            <span>open the live instrument ↗</span>
          </a>
          <div className={styles.exhibitCopy}>
            <div><p className="eyebrow">flagship exhibit</p><h2>{depthfield.title}</h2><strong>{depthfield.thesis}</strong></div>
            <div><p>{depthfield.description}</p><p className={styles.proof}>{depthfield.proof}</p><nav><a href={depthfield.demo} target="_blank" rel="noreferrer">open ↗</a><a href={depthfield.source} target="_blank" rel="noreferrer">source ↗</a></nav></div>
          </div>
        </section>

        <section className={styles.trails}>
          <header><p className="eyebrow">three ways in</p><h2>Same obsession, different project.</h2><p>The categories overlap. That is the point.</p></header>
          <div className={styles.trailGrid}>
            {trails.map((trail) => (
              <article className="panel" key={trail.id}>
                <span>{trail.number}</span><h3>{trail.title}</h3><p>{trail.description}</p>
                <ol>{workForTrail(trail.id).slice(0,5).map((item) => <li key={item.id}><a href={item.demo ?? item.caseStudy ?? item.source}><strong>{item.title}</strong><span>{item.status}</span></a></li>)}</ol>
                <a href={trail.id === "library" ? "/library" : `/work#${trail.id}`}>follow this trail →</a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.evidenceMode}>
          <p className="sectionLabel">evidence mode</p>
          <div className={`${styles.evidenceGrid} panel`}>
            <div><span>see it</span><strong>Depthfield</strong><p>Watch public liquidity accumulate, disappear, and trade.</p></div>
            <div><span>hear it</span><strong>Bells</strong><p>Strike a synthesized bowl with velocity and position.</p><a href="https://beejmaxx.github.io/bells/">play ↗</a></div>
            <div><span>test it</span><strong>Bot defense</strong><p>Read the false-positive gate that rejected an attractive policy.</p><a href="/attempts">inspect ↗</a></div>
            <div><span>read it four ways</span><strong>Rust API Field Guide</strong><p>One curriculum, reordered around different ways of learning.</p><a href="https://beejmaxx.github.io/rust-api-field-guide/">open ↗</a></div>
          </div>
        </section>

        <section className={styles.bench}>
          <header><p className="eyebrow">on the bench</p><h2>Recent state changes.</h2></header>
          <div>{bench.map(([date,status,note]) => <article key={`${date}-${status}`}><time dateTime={date}>{date}</time><span>{status}</span><p>{note}</p></article>)}</div>
          <p className={styles.benchNote}>Not a feed. Just enough dated state to show what is moving.</p>
        </section>

        <section className={`${styles.attemptCallout} panel`}>
          <div><p className="eyebrow">attempt 001 / rejected</p><h2>The detector that caught everything.</h2></div>
          <div><p>It caught the evasion. It also caught every declared hard-negative persona. So I rejected it and kept the failing trace.</p><a href="/attempts">read what survived →</a></div>
        </section>
      </main>
    </SiteShell>
  );
}
