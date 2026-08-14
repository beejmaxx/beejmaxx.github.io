import styles from "./AikidoDossierVisuals.module.css";

function VisualHeader({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <header className={styles.visualHeader}>
      <span>{index}</span>
      <strong>{title}</strong>
      <small>{note}</small>
    </header>
  );
}

export function AccountKernelVisual() {
  return (
    <figure className={styles.visual} aria-labelledby="account-kernel-caption">
      <VisualHeader index="01 / state kernel" title="one transition model" note="different callers · shared account semantics" />
      <div className={styles.kernelMap}>
        <section>
          <h3>canonical replay</h3>
          <p>minute path</p><p>policy targets</p><p>simulated fills</p>
        </section>
        <div className={styles.flowArrow} aria-hidden="true">→</div>
        <section className={styles.kernelCore}>
          <h3>OneAccountState</h3>
          <ul>
            <li>balance + peak</li><li>trailing floor</li><li>exposure</li>
            <li>protection</li><li>pass / bust</li><li>provenance</li>
          </ul>
        </section>
        <div className={styles.flowArrow} aria-hidden="true">←</div>
        <section>
          <h3>live runtime</h3>
          <p>broker observations</p><p>desired exposure</p><p>actual fills</p>
        </section>
      </div>
      <div className={styles.eventRail}>
        {[
          ["01", "day start"], ["02", "desired exposure"], ["03", "fill"],
          ["04", "equity probe"], ["05", "mark to market"], ["06", "day close"],
        ].map(([number, label]) => <div key={number}><span>{number}</span><strong>{label}</strong></div>)}
      </div>
      <figcaption id="account-kernel-caption">Replay and runtime create different event streams, but account transitions pass through the same validated state vocabulary.</figcaption>
    </figure>
  );
}

export function AccountTraceVisual() {
  return (
    <figure className={styles.visual} aria-labelledby="account-trace-caption">
      <VisualHeader index="02 / time matters" title="the close can lie" note="intraday order decides the account outcome" />
      <div className={styles.traceGrid}>
        <section>
          <h3>daily summary</h3>
          <div className={styles.dailyBar}><span>open</span><i /><strong>+$180 close</strong></div>
          <p>One aggregate number appears safe.</p>
        </section>
        <section>
          <h3>exact-minute path</h3>
          <ol className={styles.minutePath}>
            <li><time>09:30</time><span>start</span><b>$50,000</b></li>
            <li><time>10:12</time><span>loss floor crossed</span><b>busted</b></li>
            <li><time>13:45</time><span>later recovery</span><b>cannot undo history</b></li>
            <li><time>16:00</time><span>close</span><b>$50,180</b></li>
          </ol>
        </section>
      </div>
      <div className={styles.verdictStrip}><span>authority</span><strong>the first boundary crossing wins</strong><small>not the prettiest end-of-day aggregate</small></div>
      <figcaption id="account-trace-caption">Exact chronological replay preserves an intraday bust that a positive daily close would conceal.</figcaption>
    </figure>
  );
}

export function ConvergenceVisual() {
  return (
    <figure className={styles.visual} aria-labelledby="convergence-caption">
      <VisualHeader index="01 / control loop" title="command versus target" note="make retries safe by preserving intent" />
      <div className={styles.compareGrid}>
        <section className={styles.beforePanel}>
          <h3>delta command</h3>
          <div className={styles.sequence}>
            <div><span>observe</span><strong>0</strong></div><i>→</i><div><span>buy</span><strong>+1</strong></div>
            <div><span>stale observe</span><strong>0</strong></div><i>→</i><div><span>buy again</span><strong>+1</strong></div>
          </div>
          <p>Broker settles at <b>+2</b>. The retry repeated an action.</p>
        </section>
        <section className={styles.afterPanel}>
          <h3>desired state</h3>
          <div className={styles.sequence}>
            <div><span>target</span><strong>+1</strong></div><i>→</i><div><span>broker 0</span><strong>buy 1</strong></div>
            <div><span>target</span><strong>+1</strong></div><i>→</i><div><span>broker +1</span><strong>no-op</strong></div>
          </div>
          <p>Broker settles at <b>+1</b>. The retry repeated intent.</p>
        </section>
      </div>
      <div className={styles.controlRail}>
        <span>latest target wins</span><span>one order in flight</span><span>executor acknowledges</span><span>reconcile before correcting</span>
      </div>
      <figcaption id="convergence-caption">A target remains meaningful after delay, duplicate delivery, or partial progress; a delta does not.</figcaption>
    </figure>
  );
}

export function ProtectionIncidentVisual() {
  const events = [
    ["11:00:01", "signal", "buy 1 MES"],
    ["11:00:03", "adoption fails", "child order IDs not visible"],
    ["11:00:04", "mixed authority", "duplicate stop + target placed"],
    ["11:00:08", "state diverges", "broker −1 · local +1"],
    ["11:00:09", "runaway begins", "reconcile creates another sell"],
    ["11:23", "margin stops loop", "practice position reaches −150"],
  ];
  return (
    <figure className={styles.visual} aria-labelledby="protection-incident-caption">
      <VisualHeader index="02 / incident" title="two owners, one position" note="practice account · no real money at risk" />
      <ol className={styles.incidentTimeline}>
        {events.map(([time, label, detail], index) => (
          <li key={time}><time>{time}</time><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><p>{detail}</p></li>
        ))}
      </ol>
      <div className={styles.archChange}>
        <section><h3>before</h3><p>broker bracket</p><b>+</b><p>engine fallback</p><small>authority could change implicitly</small></section>
        <div className={styles.flowArrow} aria-hidden="true">→</div>
        <section><h3>after</h3><p>market entry</p><b>+</b><p>one broker-hosted hard stop</p><small>one explicit protection owner</small></section>
      </div>
      <figcaption id="protection-incident-caption">The immediate fixes stopped the loop; the durable fix removed ambiguous protection ownership from the model.</figcaption>
    </figure>
  );
}

export function EvidenceGateVisual() {
  const artifacts = ["eval manifest", "board summary", "replay summary", "MC summary", "raw trials"];
  return (
    <figure className={styles.visual} aria-labelledby="evidence-gate-caption">
      <VisualHeader index="01 / promotion court" title="a result is a bundle" note="a summary cannot outrun its evidence" />
      <div className={styles.artifactStack}>
        {artifacts.map((artifact, index) => <div key={artifact}><span>0{index + 1}</span><strong>{artifact}</strong></div>)}
      </div>
      <div className={styles.gateChecks}>
        <section><h3>identity</h3><p>candidate · policy · scenario · dates</p></section>
        <section><h3>authority</h3><p>exact minute · zero forbidden fallbacks</p></section>
        <section><h3>provenance</h3><p>input hashes · binary hash · revision</p></section>
        <section><h3>agreement</h3><p>manifest · replay · MC · trials</p></section>
      </div>
      <div className={styles.verdicts}>
        <div><span>pass</span><strong>canonical authoritative</strong></div>
        <div><span>hold</span><strong>research only</strong></div>
        <div><span>reject</span><strong>invalid</strong></div>
      </div>
      <figcaption id="evidence-gate-caption">Five artifacts and four classes of checks stand between a run and the board allowed to summarize it.</figcaption>
    </figure>
  );
}

export function ConfidenceLadderVisual() {
  const levels = [
    ["L0", "idea", "mechanism + falsification"],
    ["L1", "plumbing", "runner or fixture works"],
    ["L2", "reproducible", "current-sim artifact reruns"],
    ["L3", "matched", "same contract + randomness"],
    ["L4", "board", "full lineage + robustness"],
    ["L5", "deploy", "runtime + pack closure"],
  ];
  return (
    <figure className={styles.visual} aria-labelledby="confidence-ladder-caption">
      <VisualHeader index="02 / confidence" title="promotion is a ladder" note="utility ranks only after evidence gates" />
      <ol className={styles.ladder}>
        {levels.map(([level, title, detail]) => <li key={level}><span>{level}</span><strong>{title}</strong><small>{detail}</small></li>)}
      </ol>
      <div className={styles.pairingKey}>
        <span>paired comparison key</span>
        <code>environment slot + seed + start anchor</code>
        <strong>candidate Δ baseline</strong>
      </div>
      <figcaption id="confidence-ladder-caption">A fast score can order candidates inside a confidence class; it cannot promote a candidate into a class it has not earned.</figcaption>
    </figure>
  );
}
