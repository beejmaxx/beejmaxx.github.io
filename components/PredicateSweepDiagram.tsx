import styles from "./PredicateSweepDiagram.module.css";

const stages = [
  ["01", "build state once", "causal · sequential"],
  ["02", "evaluate predicates", "Rayon · multicore"],
  ["03", "encode truth", "64 results / u64"],
  ["04", "eliminate work", "graph · popcount · bounds"],
  ["05", "verify finalists", "exact simulator"],
] as const;

export function PredicateSweepDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={styles.figure} data-compact={compact || undefined} aria-labelledby={compact ? undefined : "predicate-sweep-caption"}>
      <div className={styles.header}>
        <span>predicate sweep / execution plan</span>
        <span>screening guides compute · exact replay decides truth</span>
      </div>
      <div className={styles.scale} aria-label="Search-space scale">
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
