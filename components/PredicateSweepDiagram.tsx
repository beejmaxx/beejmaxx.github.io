import styles from "./PredicateSweepDiagram.module.css";

const stages = [
  ["01", "build state once", "causal · sequential"],
  ["02", "evaluate predicates", "Rayon · multicore"],
  ["03", "encode truth", "64 results / u64"],
  ["04", "eliminate work", "graph · popcount · bounds"],
  ["05", "verify finalists", "exact simulator"],
] as const;

const graphNodes = [
  { id: "A", x: 31, y: 27, active: true },
  { id: "B", x: 69, y: 27, active: true },
  { id: "C", x: 50, y: 68, active: true },
  { id: "D", x: 16, y: 72, active: false },
  { id: "E", x: 84, y: 72, active: false },
] as const;

export function PredicateSweepDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={styles.figure} data-compact={compact || undefined} aria-hidden={compact || undefined} aria-labelledby={compact ? undefined : "predicate-sweep-caption"}>
      <div className={styles.header}>
        <span>predicate sweep / execution plan</span>
        <span>screening guides compute · exact replay decides truth</span>
      </div>
      <div className={styles.scale} role="img" aria-label="Search-space scale: 1,200 predicates, 719 thousand pairs, 287 million triples, and 86 billion quads">
        <div><strong>1,200</strong><span>predicates</span></div>
        <div><strong>719K</strong><span>pairs</span></div>
        <div><strong>287M</strong><span>triples</span></div>
        <div><strong>86B</strong><span>quads</span></div>
      </div>
      <div className={styles.flow}>
        {stages.map(([number, title, detail]) => (
          <div key={number}>
            <span>{number}</span><strong>{title}</strong><small>{detail}</small>
          </div>
        ))}
      </div>
      {!compact && <figcaption id="predicate-sweep-caption">The speedup came from changing the unit of work—not from making the original backtest loop marginally faster.</figcaption>}
    </figure>
  );
}

export function PredicatePruningDiagram() {
  return (
    <figure className={`${styles.figure} ${styles.pruning}`} aria-labelledby="predicate-pruning-caption">
      <div className={styles.header}>
        <span>necessary-condition pruning / proof-preserving cuts</span>
        <span>unsupported structures never enter the expensive evaluator</span>
      </div>
      <div className={styles.pruningStage}>
        <div className={styles.spaceCard}>
          <span>theoretical triple space</span>
          <strong>287,280,400</strong>
          <small>C(1,200, 3) before exits, windows, directions, or instruments</small>
        </div>
        <div className={styles.operator} aria-hidden="true">→</div>
        <div className={styles.graphCard}>
          <span>pair-support graph</span>
          <svg viewBox="0 0 100 92" role="img" aria-label="A supported triangle remains while unsupported edges and nodes are discarded">
            <g className={styles.deadEdges}>
              <line x1="31" y1="27" x2="16" y2="72" />
              <line x1="69" y1="27" x2="84" y2="72" />
              <line x1="16" y1="72" x2="50" y2="68" />
            </g>
            <g className={styles.liveEdges}>
              <line x1="31" y1="27" x2="69" y2="27" />
              <line x1="69" y1="27" x2="50" y2="68" />
              <line x1="50" y1="68" x2="31" y2="27" />
            </g>
            {graphNodes.map((node) => (
              <g key={node.id} className={node.active ? styles.liveNode : styles.deadNode}>
                <circle cx={node.x} cy={node.y} r="9" />
                <text x={node.x} y={node.y + 1}>{node.id}</text>
              </g>
            ))}
          </svg>
          <small>triples must be supported triangles · quads must satisfy clique relationships</small>
        </div>
        <div className={styles.operator} aria-hidden="true">→</div>
        <div className={styles.kernelCard}>
          <span>surviving candidate</span>
          <div className={styles.bitRows} role="img" aria-label="Three predicate masks intersect into one surviving signal mask">
            <code>101101001001</code>
            <code>001101011001</code>
            <code>011101001101</code>
            <strong>001101001001</strong>
          </div>
          <small>u64 ANDs → set bits → simulated outcomes → bounded Top-K</small>
        </div>
      </div>
      <div className={styles.proofStrip}>
        <div><strong>support bound</strong><span>Too few matching signals means a superset cannot recover the minimum trade count.</span></div>
        <div><strong>PnL bound</strong><span>If every remaining winner cannot recover positive PnL, evaluation stops safely.</span></div>
        <div><strong>authority boundary</strong><span>These cuts guide screening. Every finalist still returns to the exact engine.</span></div>
      </div>
      <figcaption id="predicate-pruning-caption">The central optimization was not sampling the space blindly. It was proving that large parts of it could not qualify.</figcaption>
    </figure>
  );
}

const pyramidStages = [
  { arity: "2", count: "719K", label: "pair screen", mode: "screen" },
  { arity: "3", count: "287M", label: "graph-pruned triples", mode: "prune" },
  { arity: "4", count: "86B", label: "supported quad seeds", mode: "seed" },
  { arity: "5", count: "20.6T", label: "retain + extend", mode: "extend" },
  { arity: "6", count: "4.1Q", label: "retain + extend", mode: "extend" },
  { arity: "7", count: "698.6Q", label: "retain + extend", mode: "extend" },
] as const;

export function PredicatePyramidDiagram() {
  return (
    <figure className={`${styles.figure} ${styles.pyramid}`} aria-labelledby="predicate-pyramid-caption">
      <div className={styles.header}>
        <span>higher-arity frontier / exact supported extensions</span>
        <span>theoretical space is context · not a claim of exhaustive execution</span>
      </div>
      <div className={styles.pyramidStages}>
        {pyramidStages.map((stage) => (
          <div key={stage.arity} className={styles.pyramidStage} data-mode={stage.mode}>
            <span className={styles.arity}>arity {stage.arity}</span>
            <strong>{stage.count}</strong>
            <small>{stage.label}</small>
          </div>
        ))}
      </div>
      <div className={styles.pyramidRules}>
        <div><strong>support graph</strong><span>Every extension must be pair-supported against the full parent combination.</span></div>
        <div><strong>bounded frontier</strong><span>Only retained parents generate the next arity; unsupported global space is never materialized.</span></div>
        <div><strong>same authority</strong><span>Seeded candidates get exact bitmask evaluation, then finalists return to the canonical backtester.</span></div>
      </div>
      <figcaption id="predicate-pyramid-caption">The engine can investigate combinations through seven predicates without enumerating the 699-quadrillion global septuple space.</figcaption>
    </figure>
  );
}

export function PredicateCacheReuseDiagram() {
  return (
    <figure className={`${styles.figure} ${styles.cacheReuse}`} aria-labelledby="predicate-cache-caption">
      <div className={styles.header}>
        <span>cache reuse / constrained by causality</span>
        <span>reuse only when prior state cannot change the answer</span>
      </div>
      <div className={styles.timelineLabels} aria-hidden="true">
        <span>earlier history</span><span>cached coverage</span><span>new tail</span>
      </div>
      <div className={styles.cacheRows}>
        <div className={styles.cacheRow}>
          <strong>broad artifact</strong>
          <div className={styles.cacheTrack}><span className={styles.fullBar}>A ————————————————— Z</span></div>
          <small>build once · versioned mask data + per-day manifest</small>
        </div>
        <div className={styles.cacheRow}>
          <strong>narrow request</strong>
          <div className={styles.cacheTrack}><i className={styles.sliceBar}>B ——————— Y</i></div>
          <small><b>date slice</b> · then allocate requested predicate subset</small>
        </div>
        <div className={styles.cacheRow}>
          <strong>later end date</strong>
          <div className={styles.cacheTrack}><span className={styles.prefixBar}>A ——————— Z</span><i className={styles.tailBar}>new tail</i></div>
          <small><b>incremental append</b> · evaluate unseen bars only</small>
        </div>
        <div className={styles.cacheRow}>
          <strong>earlier start date</strong>
          <div className={styles.cacheTrack}><i className={styles.rebuildBar}>rebuild from the new beginning</i></div>
          <small><b>no unsafe prepend</b> · earlier bars can change every later state</small>
        </div>
      </div>
      <div className={styles.cacheFooter}>
        <span>date subset</span><span>predicate merge path</span><span>expanding-window prefix</span><span>fresh forward replay</span>
      </div>
      <figcaption id="predicate-cache-caption">Date coverage can be sliced or extended causally; semantic identity still depends on explicit version and key discipline.</figcaption>
    </figure>
  );
}

export function PredicateCorrectionsDiagram() {
  return (
    <figure className={`${styles.figure} ${styles.corrections}`} aria-labelledby="predicate-corrections-caption">
      <div className={styles.header}>
        <span>two performance corrections / observed failure, recorded fix</span>
        <span>fix the ownership graph · fix the work graph</span>
      </div>
      <div className={styles.correctionGrid}>
        <section aria-labelledby="memory-lifetime-title">
          <div className={styles.correctionTitle}><h3 id="memory-lifetime-title">memory lifetime</h3><strong>~24 GB</strong><i>→</i><strong>O(1 subset)</strong></div>
          <div className={styles.memoryBefore} role="img" aria-label="Forty-eight eagerly retained strategy cache subsets">
            {Array.from({ length: 48 }, (_, index) => <i key={index} />)}
          </div>
          <div className={styles.memoryAfter}><i /><span>one strategy-local subset resident</span></div>
          <p><b>Before:</b> 48 owned subsets retained across roughly 1.1M bars.<br/><b>After:</b> materialize one, run its windows, release it. Estimated bound: ~1–2 GB.</p>
        </section>
        <section aria-labelledby="parallelism-boundary-title">
          <div className={styles.correctionTitle}><h3 id="parallelism-boundary-title">parallelism boundary</h3><strong>3h+</strong><i>→</i><strong>2–5m</strong></div>
          <div className={styles.threadBefore}>
            <div><span>outer Rayon</span><i /><i /><i /><i /></div>
            <div><span>inner Rayon</span><i /><i /><i /><i /></div>
            <b>workers waiting on workers</b>
          </div>
          <div className={styles.threadAfter}>
            <span>affected Phase 4 path</span>
            <div><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <b>flattened exact checks · parallel sweep stays upstream</b>
          </div>
          <p><b>Before:</b> 27 workers could stall near 1% CPU with no Phase 4 output.<br/><b>Recorded fix:</b> non-nested verification and observable progress.</p>
        </section>
      </div>
      <figcaption id="predicate-corrections-caption">Both wins came from removing excess work and excess lifetime—not from adding hardware.</figcaption>
    </figure>
  );
}
