import type { Metadata } from "next";
import { PersonalSiteShell } from "@/components/PersonalSiteShell";
import styles from "./work-map.module.css";

export const metadata: Metadata = {
  title: "Stuff I’ve Made",
  description: "Projects, books, systems, experiments, and unfinished things by bijan.",
};

const goodPlaces = [
  {
    mark: "壱",
    title: "Aikido",
    note: "Trading research system. Rust mostly. Big.",
    links: [["overview", "/aikido/"], ["architecture", "/aikido/architecture.html"], ["code", "https://github.com/beejmaxx/aikido-systematic-trading"]],
  },
  {
    mark: "弐",
    title: "Marketplace integrity",
    note: "Four anti-bot labs and the report tying them together.",
    links: [["report", "/case-studies/marketplace-integrity.html"], ["code", "https://github.com/beejmaxx/http-bot-defense-lab"]],
  },
  {
    mark: "参",
    title: "Rust API Field Guide",
    note: "A book about API design, in four different orders.",
    links: [["read", "https://beejmaxx.github.io/rust-api-field-guide/"], ["code", "https://github.com/beejmaxx/rust-api-field-guide"]],
  },
  {
    mark: "肆",
    title: "Browser things",
    note: "Bells, engines, order books. Click them.",
    links: [["bells", "https://beejmaxx.github.io/bells/"], ["engines", "/engine-sim/"], ["depthfield", "https://beejmaxx.github.io/depthfield/"]],
  },
] as const;

const piles = [
  {
    id: "money",
    number: "01",
    title: "money machines",
    note: "feeds / research / backtests / execution / the screens that watch it all",
    projects: [
      ["Aikido / QuantBox", "the large one", "/aikido/"],
      ["Depthfield", "order-book heatmap", "https://beejmaxx.github.io/depthfield/"],
      ["rithmic-rs", "protocol client", "https://github.com/beejmaxx/rithmic-rs"],
      ["Rithmic trade copier", "does what it says", "https://github.com/beejmaxx/rithmic-trade-copier"],
      ["Polymarket MCP", "markets through MCP", "https://github.com/beejmaxx/polymarket-mcp-rs"],
      ["Weather markets", "research + paper trading", "https://github.com/beejmaxx/polymarket-weather-research"],
      ["ORB lab", "opening-range experiments", "https://github.com/beejmaxx/orb-lab"],
    ],
  },
  {
    id: "defense",
    number: "02",
    title: "bots attacking bots",
    note: "detect / evade / investigate / intervene / roll it back if it was wrong",
    projects: [
      ["Marketplace report", "the map", "/case-studies/marketplace-integrity.html"],
      ["HTTP bot defense", "detect + replay", "https://github.com/beejmaxx/http-bot-defense-lab"],
      ["Red team lab", "teach bots to evade", "https://github.com/beejmaxx/bot-defense-red-team-lab"],
      ["Market integrity lab", "follow the money", "https://github.com/beejmaxx/market-integrity-lab"],
      ["Intervention lab", "policy + rollback", "https://github.com/beejmaxx/marketplace-intervention-lab"],
    ],
  },
  {
    id: "rust",
    number: "03",
    title: "rust, repeatedly",
    note: "books / protocols / wasm / simulators / things that should not segfault",
    projects: [
      ["Rust API Field Guide", "book × 4", "https://beejmaxx.github.io/rust-api-field-guide/"],
      ["rithmic-rs", "wire protocol", "https://github.com/beejmaxx/rithmic-rs"],
      ["engine-sim-rs", "vroom", "https://beejmaxx.github.io/engine-sim-rs/"],
      ["Bells", "bong", "https://beejmaxx.github.io/bells/"],
      ["Ironvale", "little city", "https://github.com/beejmaxx/ironvale"],
      ["expandpass-rs", "old thing, safer", "https://github.com/beejmaxx/expandpass-rs"],
    ],
  },
  {
    id: "agents",
    number: "04",
    title: "graphs & agents",
    note: "durable state / APIs / MCP / GraphQL / machines remembering what they did",
    projects: [
      ["ActiveGraph", "stateful agents", "https://activegraph.ai"],
      ["Airline graph", "fake airline, real graph", "https://github.com/beejmaxx/airline-enterprise-graph"],
      ["Airgraph lab", "graph experiments", "https://github.com/beejmaxx/airgraph-lab"],
      ["Apollo knowledgebase", "notes on the territory", "https://github.com/beejmaxx/apollo-knowledgebase"],
      ["Platform case study", "tools around the tools", "/case-studies/developer-platform-tooling"],
    ],
  },
  {
    id: "play",
    number: "05",
    title: "things to poke",
    note: "sound / simulation / geometry / dubious questions with working controls",
    projects: [
      ["Bells", "hit one", "https://beejmaxx.github.io/bells/"],
      ["Engine simulator", "eleven engines", "/engine-sim/"],
      ["Flat Earth Observatory", "measure it", "https://beejmaxx.github.io/flat-earth-observatory/"],
      ["Svasti Turning Mark", "old symbol, many angles", "https://beejmaxx.github.io/svasti-turning-mark/"],
      ["Fire", "fire", "https://github.com/beejmaxx/fire"],
      ["Drums", "drums", "https://github.com/beejmaxx/drums"],
    ],
  },
  {
    id: "books",
    number: "06",
    title: "people, books, evidence",
    note: "source texts / provenance / checksums / rabbit holes with an index",
    projects: [
      ["Napoleon", "primary sources", "https://github.com/beejmaxx/napoleon-bonaparte-library"],
      ["Goethe", "deutsch + english", "https://github.com/beejmaxx/goethe-library"],
      ["Aajonus", "warnings included", "https://github.com/beejmaxx/aajonus-vonderplanitz-library"],
      ["Ken Wheeler", "public archive", "https://github.com/beejmaxx/ken-wheeler-knowledge-library"],
      ["Tesla", "research library", "https://github.com/beejmaxx/tesla-research-library"],
    ],
  },
] as const;

const recurring = [
  ["replay it", "Aikido · Depthfield · bot labs · ORB"],
  ["put rust in the browser", "Bells · Engine Sim · Depthfield"],
  ["show the operator what the machine knows", "workstation · copier · interventions · ActiveGraph"],
  ["keep the receipts", "field guide · integrity report · observatory · libraries"],
] as const;

export default function WorkMapPage() {
  return (
    <PersonalSiteShell section="stuff">
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.overline}>projects / 2010—now</p>
          <h1>stuff<br />I’ve made<span>.</span></h1>
          <p className={styles.deck}>Systems, books, instruments, failed ideas, useful fragments, and a surprising number of trading engines.</p>
          <a className={styles.down} href="#piles">keep scrolling ↓</a>
        </section>

        <section className={styles.goodPlaces}>
          <p className={styles.vertical}>good places to start</p>
          <div className={styles.placeGrid}>
            {goodPlaces.map((item) => (
              <article key={item.title}>
                <span className={styles.mark}>{item.mark}</span>
                <h2>{item.title}</h2>
                <p>{item.note}</p>
                <div>{item.links.map(([label, href]) => <a href={href} key={href}>{label} ↗</a>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.piles} id="piles">
          <header><span>06 piles</span><p>Some things belong in more than one. That’s fine.</p></header>
          {piles.map((pile) => (
            <article className={`${styles.pile} ${styles[pile.id]}`} key={pile.id}>
              <div className={styles.pileTitle}><span>{pile.number}</span><h2>{pile.title}</h2><p>{pile.note}</p></div>
              <ol>
                {pile.projects.map(([title, note, href]) => (
                  <li key={`${pile.id}-${title}`}><a href={href}><strong>{title}</strong><span>{note}</span><i>↗</i></a></li>
                ))}
              </ol>
            </article>
          ))}
        </section>

        <section className={styles.recurring} id="recurring">
          <p className={styles.overline}>same obsession, different project</p>
          <h2>things I keep doing</h2>
          <div>
            {recurring.map(([title, items], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{items}</p></article>
            ))}
          </div>
        </section>

        <section className={styles.bottom}>
          <p className={styles.huge}>126</p>
          <div><p>repos, including the dead ones</p><a href="/archive">open the unfiltered pile ↗</a></div>
        </section>
      </main>
    </PersonalSiteShell>
  );
}
