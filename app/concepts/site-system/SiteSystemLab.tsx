"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./site-system.module.css";

type SystemId = "personal" | "dossier" | "hybrid";
type ViewId = "home" | "aikido";

const systems: Array<{ id: SystemId; name: string; note: string }> = [
  { id: "personal", name: "Personal web", note: "warm, expressive, Casa-adjacent" },
  { id: "dossier", name: "Dossier", note: "Aikido’s technical document language" },
  { id: "hybrid", name: "Hybrid", note: "editorial body, technical evidence panels" },
];

const stages = [
  ["01", "market facts", "bars · features · causal state"],
  ["02", "research", "search · score · retain evidence"],
  ["03", "frozen input", "what was knowable then"],
  ["04", "policy", "requested target exposure"],
  ["05", "runtime", "converge observed to desired"],
  ["06", "evaluation", "account path · confidence · verdict"],
];

const dossiers = [
  ["00 / search", "The Predicate Sweep", "Bitsets, graph pruning, staged enumeration, and an exact verification boundary."],
  ["01 / account", "One Account, One Truth", "A deterministic account kernel shared by canonical replay and runtime accounting."],
  ["02 / execution", "Converge, Don’t Command", "Desired-state execution, broker reconciliation, and one protection authority."],
  ["03 / evidence", "When a Result Is Allowed to Count", "Point-in-time inputs, artifact gates, matched trials, and confidence classes."],
];

function PreviewHeader({ current }: { current: ViewId }) {
  return (
    <header className={styles.siteHeader}>
      <button className={styles.brand} type="button" aria-label="Preview homepage"><span>b</span><strong>bijan</strong></button>
      <nav aria-label="Preview navigation">
        <button type="button" data-current={current === "home" || undefined}>work</button>
        <button type="button">library</button><button type="button">attempts</button><button type="button">notes</button><button type="button">archive</button><button type="button">about</button>
      </nav>
      <span className={styles.github}>github ↗</span>
    </header>
  );
}

function SystemFlow({ compact = false }: { compact?: boolean }) {
  return (
    <section className={styles.systemPanel} data-compact={compact || undefined} aria-label="Aikido system flow">
      <header><span>system / 01</span><strong>one project · several truth boundaries</strong></header>
      <ol>{stages.map(([number, title, note]) => <li key={number}><span>{number}</span><strong>{title}</strong><small>{note}</small></li>)}</ol>
      {!compact && <p>Computation can get faster. Authority cannot become ambiguous.</p>}
    </section>
  );
}

function HomePreview({ openAikido }: { openAikido: () => void }) {
  return (
    <>
      <PreviewHeader current="home" />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>software · systems · experiments</p>
          <h1>I build systems that <em>show their work.</em></h1>
          <p>Research engines, browser instruments, execution machinery, technical books, and the evidence needed to understand what they are doing.</p>
          <div><button type="button" onClick={openAikido}>start with Aikido ↓</button><span>map the work ↗</span></div>
        </section>

        <section className={styles.flagship} id="aikido-preview">
          <div className={styles.flagshipIntro}>
            <p className={styles.eyebrow}>flagship project / research + execution</p>
            <h2>Aikido</h2>
            <p>A research and execution system built around one constraint: decisions that can move money must be reproducible, inspectable, and recoverable.</p>
            <div className={styles.flagshipLinks}><button type="button" onClick={openAikido}>enter the system →</button><span>four engineering dossiers ↗</span></div>
          </div>
          <div className={styles.flagshipEvidence}>
            <SystemFlow compact />
            <div className={styles.facts}><div><strong>4</strong><span>subsystem dossiers</span></div><div><strong>Rust</strong><span>account authority</span></div><div><strong>PIT</strong><span>decision inputs</span></div><div><strong>live</strong><span>target convergence</span></div></div>
          </div>
        </section>

        <section className={styles.otherWork}>
          <header><p className={styles.eyebrow}>other work / selected</p><h2>Instruments, books, and smaller systems.</h2></header>
          <div className={styles.workGrid}>
            <article className={styles.depthfield}><Image src="/assets/screenshots/depthfield-live.png" alt="Depthfield market-depth visualization" width={1680} height={955} /><span>01 / live instrument</span><h3>Depthfield</h3><p>An order book rendered as history. Public data, WebGPU, no backend.</p></article>
            <article><span>02 / playable</span><h3>Bells</h3><p>A velocity-sensitive browser instrument written in Rust and WebAssembly.</p></article>
            <article><span>03 / written</span><h3>Rust field guides</h3><p>Executable curricula, API tradeoffs, and several ways through the same material.</p></article>
          </div>
        </section>
      </main>
      <PreviewFooter />
    </>
  );
}

function AikidoPreview() {
  return (
    <>
      <PreviewHeader current="aikido" />
      <main className={styles.main}>
        <section className={`${styles.hero} ${styles.aikidoHero}`}>
          <p className={styles.eyebrow}>flagship project / system map</p>
          <h1>Aikido</h1>
          <p>A research and execution system built around one recurring constraint: decisions that can move money must be reproducible, inspectable, and recoverable.</p>
          <div className={styles.aikidoNav}><span>overview</span><span>architecture</span><span>four dossiers</span><span>public repository ↗</span></div>
        </section>

        <SystemFlow />

        <section className={styles.dossierSection}>
          <header><p className={styles.eyebrow}>subsystem records</p><h2>Four dossiers</h2></header>
          <div>{dossiers.map(([label, title, note]) => <article key={label}><span>{label}</span><h3>{title}</h3><p>{note}</p><strong>open dossier →</strong></article>)}</div>
        </section>

        <section className={styles.incidents}>
          <header><span>supporting records / 02</span><strong>smaller failures worth keeping</strong></header>
          <div><article><strong>24 GB</strong><h3>Shared source, unshared subsets</h3><p>Changing object lifetime changed the memory bound.</p></article><article><strong>1% CPU</strong><h3>Workers waiting on workers</h3><p>Flattening one nested work graph changed hours into minutes.</p></article><article><strong>−150</strong><h3>Two owners, one position</h3><p>A practice incident forced one protection authority.</p></article></div>
        </section>
      </main>
      <PreviewFooter />
    </>
  );
}

function PreviewFooter() {
  return <footer className={styles.footer}><p>instruments, evidence, books, and unfinished inquiries.</p><nav><span>email ↗</span><span>github ↗</span><span>up ↑</span></nav></footer>;
}

export function SiteSystemLab() {
  const [system, setSystem] = useState<SystemId>("hybrid");
  const [view, setView] = useState<ViewId>("home");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("portfolio-system-preview");
      if (systems.some((item) => item.id === saved)) setSystem(saved as SystemId);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(next: SystemId) {
    setSystem(next);
    window.localStorage.setItem("portfolio-system-preview", next);
  }

  return (
    <div className={styles.lab} data-system={system} data-ready={ready || undefined}>
      <aside className={styles.controls} aria-label="Site system comparison controls">
        <div><a href="/concepts">← concepts</a><p>site system lab</p></div>
        <fieldset><legend>design</legend>{systems.map((item) => <button type="button" key={item.id} aria-pressed={system === item.id} onClick={() => choose(item.id)}><span>{item.name}</span><small>{item.note}</small></button>)}</fieldset>
        <fieldset className={styles.viewPicker}><legend>page</legend><button type="button" aria-pressed={view === "home"} onClick={() => setView("home")}>homepage</button><button type="button" aria-pressed={view === "aikido"} onClick={() => setView("aikido")}>Aikido</button></fieldset>
      </aside>
      <div className={styles.preview}>
        {view === "home" ? <HomePreview openAikido={() => setView("aikido")} /> : <AikidoPreview />}
      </div>
    </div>
  );
}
