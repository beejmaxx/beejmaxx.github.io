---
title: The Predicate Sweep
subtitle: A custom research engine that turned billions of possible predicate combinations into a staged, multicore search—and kept exact simulation as the final authority.
index: 00
tags: Rust, search systems, bitsets, multicore, research infrastructure
image:
---

## The research question exceeded the tool

A strategy can emit a useful entry signal and still fire in the wrong market conditions. The research question was not merely “does this strategy backtest?” It was:

> Across roughly 1,200 direction-aware market predicates, which combinations isolate repeatable conditions for this strategy—across exits, instruments, directions, and rolling train/validation windows?

At that scale there are **719,400 pairs**, **287,280,400 triples**, and **85,968,659,700 quads** before multiplying by exits, strategies, directions, instruments, parameter points, or time windows.

Running a conventional backtest for every combination was not a performance problem waiting for a faster loop. It was the wrong computational model.

The predicate sweep changed the model.

## The architecture in one line

```text
causal state once
→ predicates in parallel
→ truth as bitsets
→ signals and exits once
→ eliminate impossible combinations
→ exact-backtest only the finalists
```

The important move was to separate **reusable domain computation** from **combinatorial search**. Once predicate truth and candidate outcomes existed as compact data, the hot path no longer rebuilt strategies or repeatedly dispatched predicate objects. It intersected machine words.

## 1. Find the actual parallel boundary

Market context is causal. ATR, VWAP, session ranges, prior bars, and other values at bar *N* depend on bars before it. Pretending that part was embarrassingly parallel would have changed the answer.

The cache builder therefore does two different kinds of work:

1. Walk the bars sequentially and update the authoritative `SessionState`.
2. Evaluate independent predicates against captured contexts in parallel with Rayon.

At one recorded operating scale this meant approximately **757,000 bars × 1,200 predicates**. Contexts are now handled in bounded batches of **2,048**, preserving multicore evaluation without keeping every large context snapshot resident at once.

That is a more meaningful optimization than “use all the cores.” It identifies exactly which dependency must remain serial and moves everything after that boundary onto the multicore path.

## 2. Change predicate truth into a data representation

For each bar, the shared predicate cache stores separate long and short truth masks. Each `u64` holds 64 predicate results. For the sweep itself, that representation is transposed into one bitset per predicate over the captured signal list:

```text
predicate A:  101001000100…
predicate B:  001001010100…
predicate C:  001001000100…

A AND B AND C: 001001000100…
```

The surviving set for a triple is a tight loop of integer `AND`s. Set bits are enumerated with `trailing_zeros`; `remaining &= remaining - 1` clears each match without scanning false positions.

This replaced repeated predicate calls, dynamic strategy construction, Boolean dispatch, and most allocation in the search loop with contiguous, cache-friendly native operations.

Rust mattered here for concrete reasons: explicit layout, cheap `u64` operations, predictable allocation, safe shared reads, and Rayon parallel iterators without introducing a second runtime model.

## 3. Compute signals and exits once

The screening phase captures every potential flat-state entry signal once. Each exit variant is simulated once per signal and reduced to compact arrays containing the outcome, PnL, and the next signal available after that trade would close.

A candidate evaluation can then ask a much cheaper question:

> Which already-simulated opportunities survive this predicate intersection?

The evaluator walks only those surviving bits, respects one-trade-at-a-time blocking, and accumulates approximate PnL, drawdown, trade count, win rate, and concentration-aware score. It does not rebuild the strategy for every candidate.

This is why the system can investigate research surfaces that a generic backtesting product cannot expose through a parameter grid. The search depends on internal predicate truth, strategy-specific causal context, custom exit outcomes, and an explicit approximate-to-exact authority boundary. A third-party backtest API could be one component around the edges; reproducing this research inside it would require rebuilding the predicate sweep itself.

## 4. The fastest combination is the one never evaluated

The implementation layers necessary-condition checks so expensive evaluation happens only when a candidate can still qualify.

| Optimization | Work it removes |
| --- | --- |
| Exact and optional near-duplicate mask grouping | Equivalent predicates do not multiply the search space. |
| Popcount gates | Predicates and partial combinations with insufficient support stop immediately. |
| Pair-support graph | A triple must form a supported triangle; a quad must satisfy the corresponding clique relationships. |
| Common-neighbor pruning | Edges that cannot participate in a higher-order combination are removed before enumeration. |
| Reversed degeneracy ordering | Sparse parts of the support graph are peeled to reduce later intersection work. |
| Reused AND buffers | A partial intersection such as `B & C` is materialized once and reused while testing `A`. |
| Sparse-word lists | Only non-zero bitset words are intersected when masks are sparse. |
| Optimistic suffix PnL bound | If current PnL plus every remaining positive outcome cannot recover above zero, evaluation exits early. |
| Bounded Top-K heaps | Workers retain finalists instead of materializing every passing result. |

Pair, triple, and quad work is partitioned across Rayon workers. Each worker uses local buffers, local statistics, and a local Top-K heap; results merge after parallel evaluation. This avoids a shared lock in the hot inner loop.

The combination search became partly a graph problem: support relationships decide which triangles and cliques are even worth touching.

## 5. One cache serves an entire research program

In batch mode, bars load once and one instrument-wide, direction-aware predicate cache serves many strategy profiles. The cache is treated as a versioned computational artifact, not a disposable temporary file.

Its identity includes the inputs that can change predicate truth: cache version, instrument, date coverage, requirement bits, and ordered predicate definitions. The artifacts use zstd-compressed bincode plus a manifest recording bar counts and per-day coverage.

That enables several forms of reuse:

- an exact disk-cache hit;
- a zero-copy `Arc` slice when a broad date cache covers a narrower window;
- incremental extension when later bars are appended;
- incremental construction when new predicates are added;
- in-memory strategy subsets from one universal instrument cache;
- cached triple and window artifacts that later quad or rolling-window work can reuse.

Correctness is part of the optimization. Reusing an incompatible cache would be worse than recomputing: it could produce plausible but false research.

## 6. The 24 GB failure—and the lifetime fix

One optimization exposed a memory-lifetime mistake. The universal cache itself was shared, but `subset()` produced newly owned, strategy-specific mask arrays. Building all subsets eagerly for roughly **48 strategies over 1.1 million bars** retained about **24 GB**.

The fix was not a new compression format. It was ownership discipline:

1. Create lightweight strategy descriptors with an empty cache placeholder.
2. Materialize the current strategy’s subset just before its windows run.
3. Finish that strategy’s sides and windows.
4. Replace the subset with an empty cache and release the owned masks.
5. Continue to the next strategy.

Peak subset memory changed from **O(strategies × subset size)** to **O(one subset)**—roughly **1–2 GB** for that path.

This was an important design correction: sharing a source object does not bound the lifetime of its derived artifacts.

## 7. Screening spends compute; exact simulation decides truth

The fast phase is intentionally approximate. It captures flat-state opportunities and simulates exits so hundreds of millions of combinations can be screened as data. That approximation is permitted to decide **where computation goes**, never **what is true**.

Finalists return to the canonical strategy and backtest engine. The exact phase uses the same predicate-cache mask inside the real strategy path, then ranks verified results with a conservative fifth-percentile lower confidence bound from **500 block-bootstrap resamples using 20-trading-day blocks**.

Dedicated parity tests compare cache-driven trades with the ordinary predicate-filter path—including entry time, exit time, side, prices, contracts, and exit reason. Dense and sparse evaluators also have equivalence coverage.

```text
fast screen: broad, approximate, disposable ranking
exact verify: narrow, authoritative, reviewable evidence
```

The optimization never purchased speed by silently redefining correctness.

## 8. Scale out without putting coordination in the hot path

When one machine was not enough, independent research partitions ran across as many as **ten temporary Hetzner servers**. Each worker received a consistent binary, configuration, historical data, and compatible caches; systemd managed the process; heartbeats and results flowed to ClickHouse; completed temporary hosts were canceled automatically.

Workers did not coordinate during hot computation. Instruments and research partitions were coarse, independent jobs. That kept network synchronization out of the sweep and reduced the distributed problem to reproducible batch orchestration, observable progress, failure isolation, and cleanup.

## What this made possible

The predicate sweep turned research that was combinatorially inaccessible through ordinary tools into a repeatable workflow:

- investigate huge predicate neighborhoods rather than hand-picking a few filters;
- reuse the expensive market-state computation across strategies and windows;
- run millions of candidate evaluations per hour on the optimized search path;
- carry forward compatible caches and intermediate artifacts instead of restarting every experiment;
- spend exact simulation only on a bounded, evidence-backed shortlist;
- preserve parity with the authoritative engine rather than creating a fast but separate research truth.

The advantage was not a single clever instruction or a large server. It was the entire shape of the system: representation, reuse, pruning, parallelism, memory lifetime, distributed execution, and a hard line between screening and truth.

## Evidence and limits

This dossier is based on the predicate-cache and `pred_sweep` implementation, its parity and evaluator tests, and the optimization history retained in the Aikido repository. The exact search-space counts are combinatorial; the 757K-bar/1,200-predicate workload and 24 GB → 1–2 GB memory correction are recorded in the implementation history.

There is no controlled benchmark here against every commercial provider, so this page does not invent one. The defensible claim is architectural: off-the-shelf backtesting platforms do not provide this system’s internal predicate representation, cache lineage, custom pruning graph, approximate screening model, and exact verification contract as a programmable research surface.

[See the larger Aikido system →](/aikido/)
