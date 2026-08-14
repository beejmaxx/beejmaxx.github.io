---
title: The Predicate Sweep
subtitle: A custom research engine for staged, multicore exploration of huge predicate spaces—while keeping exact simulation as the final authority.
index: 00
tags: Rust, search systems, bitsets, multicore, research infrastructure
image:
---

## The research question exceeded the tool

A strategy can emit a useful entry signal and still fire in the wrong market conditions. Here, a **predicate** is one yes/no description of that context—for example, “price is above the session VWAP”—evaluated separately where direction matters. The research question was not merely “does this strategy backtest?” It was:

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

Two measured corrections anchor the implementation story:

| Failure | Before | After |
| --- | --- | --- |
| Strategy-subset lifetime | About **24 GB** retained across 48 subsets | **O(one subset)**; implementation estimate roughly **1–2 GB** |
| Nested parallel verification in the affected Phase 4 path | **3h+**, about **1% CPU**, no Phase 4 result | Roughly **2–5 minutes** after flattening that path |

The sections below explain why those failures occurred and how the corrected work and ownership graphs fit the larger search design.

## 1. Find the actual parallel boundary

Market context is causal. ATR, VWAP, session ranges, prior bars, and other values at bar *N* depend on bars before it. Pretending that part was embarrassingly parallel would have changed the answer.

The cache builder therefore does two different kinds of work:

1. Walk the bars sequentially and update the authoritative `SessionState`.
2. Evaluate independent predicates against captured contexts in parallel with Rayon.

At one recorded operating scale this meant approximately **757,000 bars × 1,200 predicates**. Contexts are now handled in bounded batches of **2,048**, preserving multicore evaluation without keeping every large context snapshot resident at once.

The dependency boundary is explicit: causal state remains serial, while independent predicate evaluation after that boundary uses the multicore path.

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

This research required access to internal predicate truth, strategy-specific causal context, custom exit outcomes, and an explicit approximate-to-exact authority boundary. A third-party backtest API could still sit around the edges, but the search layer itself had to be custom.

## 4. The fastest combination is the one never evaluated

The implementation layers necessary-condition checks so expensive evaluation happens only when a candidate can still qualify. Exact-mask grouping and graph/support bounds preserve the qualifying set; optional near-duplicate grouping is a separate heuristic that deliberately trades completeness for a smaller search.

| Optimization | Work it removes |
| --- | --- |
| Exact mask grouping | Predicates with identical truth masks do not multiply the search space. |
| Optional near-duplicate grouping | A heuristic can merge nearly identical masks when the operator explicitly accepts a non-exhaustive search. |
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

[[visual:pruning]]

## 5. Schedule the shape of the work

The inner loop was not the only place where performance mattered. Pair and triple search are triangular workloads: later outer indices contain much more work than earlier ones. Handing those partitions to the thread pool in simple index order creates a long tail where a few heavy tasks remain after other workers finish.

The scheduler therefore alternates high and low outer indices—heavy, light, next-heavy, next-light—before Rayon distributes them. Each task owns its AND buffers, statistics, progress batching, and bounded Top-K heap. Only compact finalists merge after parallel work finishes.

The evaluation path is specialized too:

- specialized fixed-shape evaluators and reusable triple buffers avoid dynamic predicate dispatch in the hot path;
- `next_unblocked[signal]` jumps directly over signals hidden by an open trade instead of rescanning overlap state;
- dense masks scan contiguous words, while an opt-in sparse kernel intersects sorted lists of non-zero word indices with a two-pointer merge;
- dense and sparse paths have equivalence tests; the sparse benchmark is deliberately a separate workload check rather than an assumption that sparse is always faster;
- deterministic mask grouping uses exact hashes and optional Hamming-distance clustering across every exit, then picks a representative that preserves the strongest minimum support.

Performance depended on designing the work partition, memory ownership, output cardinality, and instruction shape together.

## 6. Grow a supported frontier through seven predicates

The current system extends beyond quads. At 1,200 predicates, the theoretical spaces reach **20.6 trillion quints**, **4.1 quadrillion sexts**, and **698.6 quadrillion septuples**. Exhaustive global evaluation at those arities is not computationally plausible.

Instead, retained triples are extended into quad seeds by intersecting their common pair-supported neighbors. Retained quads generate quints the same way; the process continues through sexts and septs. For every generated candidate, the predicate conjunction is computed exactly by the bitmask kernel. Its fast outcome score still uses the precomputed screening model; only finalists return to the canonical backtester for an authoritative result. The global higher-arity space is intentionally candidate-driven.

This is a useful distinction: **exact candidate evaluation is not the same claim as exhaustive global enumeration**. The engine preserves the former and refuses to imply the latter.

[[visual:pyramid]]

## 7. One cache serves an entire research program

In batch mode, bars load once and one instrument-wide, direction-aware predicate cache serves many strategy profiles. The cache is treated as a versioned computational artifact, not a disposable temporary file.

Its key records a manual cache version, strategy family, instrument, date coverage, requirement bits, and ordered predicate names. The artifacts use zstd-compressed bincode plus a manifest recording bar counts and per-day coverage. This is not a complete semantic identity: predicate implementations and bar values are not content-hashed, so the system relies on immutable input-data discipline and explicit cache-version bumps when semantics change.

That enables several forms of reuse:

- an exact disk-cache hit;
- a date slice when a broad cache covers a narrower window, followed by an owned predicate subset for the requested strategy;
- incremental extension when later bars are appended;
- an incremental predicate-merge path for cache candidates that reach it;
- in-memory strategy subsets from one universal instrument cache;
- cached triple and window artifacts that later quad or rolling-window work can reuse.

Correctness is part of the optimization, but the current implementation has a gap here. Covering-cache reuse accepts at least 99% predicate overlap; that branch can return a reduced subset with a few newly requested predicates dropped before the incremental merge path is reached. The safe fix is to reject or merge that delta rather than silently continue. Until then, cache-version and input discipline do not fully eliminate stale or incomplete reuse risk.

Triple artifacts have a stronger identity. They are content-addressed from the effective strategy, instrument, direction, date range, predicate names, minimum-trade rule, dedupe setting, and the actual masks, PnL arrays, suffix bounds, and overlap-jump data. They are zstd-compressed, written through a temporary file and atomically renamed, registered in ClickHouse, and marked complete or partial so a shallow result cannot masquerade as a deeper search.

The window-result cache is a known weaker boundary. Its key includes exit and pair-through-sept limits, but currently identifies the base configuration by path rather than file contents and omits some settings that can affect a run. Holdout-gated runs disable this cache, but other reuse still depends on operator discipline. It should become a complete semantic content hash before being treated as authoritative across configuration changes.

The practical result is intentionally uneven: predicate and triple artifacts can remove substantial recomputation, while window-result reuse remains an optimization with an explicit lineage limitation.

[[visual:cache-reuse]]

## 8. The 24 GB failure—and the lifetime fix

One optimization exposed a memory-lifetime mistake. The universal cache itself was shared, but `subset()` produced newly owned, strategy-specific mask arrays. Building all subsets eagerly for roughly **48 strategies over 1.1 million bars** retained about **24 GB**.

The fix was not a new compression format. It was ownership discipline:

1. Create lightweight strategy descriptors with an empty cache placeholder.
2. Materialize the current strategy’s subset just before its windows run.
3. Finish that strategy’s sides and windows.
4. Replace the subset with an empty cache and release the owned masks.
5. Continue to the next strategy.

Peak subset memory changed from **O(strategies × subset size)** to **O(one subset)**. The implementation records roughly **1–2 GB** as the expected bound for that path; it is an estimate, not a post-fix benchmark measurement.

This was an important design correction: sharing a source object does not bound the lifetime of its derived artifacts.

## 9. Parallelism belongs at one level at a time

Another optimization failure exposed the same lesson in the work graph. Phase 4 originally parallelized candidate verification while inner bootstrap and cache operations could also enter Rayon. On a recorded 27-worker run, all workers could wind up waiting for inner work: CPU fell to roughly **1%**, no verification results appeared for more than **three hours**, and adding concurrency made the system slower.

In that affected Phase 4 path, the fix removed nested Rayon and switched candidate-verification loops to sequential iteration. Individual exact backtests were fast enough that a flat queue was dramatically cheaper than workers waiting on workers. The path returned to roughly **2–5 minutes** with visible progress—a recorded wall-clock correction of at least **36×** using the conservative endpoints of the observation. A later windowed verifier has a separate parallel candidate path, so the lesson is about explicit concurrency ownership rather than a rule that all verification must be serial.

[[visual:corrections]]

## 10. Scale out without coordinating the hot path

When one machine was not enough, the orchestration tooling could fan independent research partitions across an elastic Hetzner fleet capped at **ten servers**. Each worker received a consistent binary, configuration, historical data, and compatible caches; systemd managed the process; heartbeats and results flowed to ClickHouse; the tooling canceled completed temporary hosts automatically. The repository establishes that capability and cap, not a recorded ten-host benchmark run.

Workers did not coordinate during hot computation. Instruments and research partitions were coarse, independent jobs. Network coordination stayed outside the sweep; the distributed layer handled reproducible batch orchestration, observable progress, failure isolation, and cleanup.

## 11. Screening spends compute; exact simulation decides truth

The fast phase is intentionally approximate. It captures flat-state opportunities and simulates exits so hundreds of millions of combinations can be screened as data. That approximation is permitted to decide **where computation goes**, never **what is true**.

Finalists return to the canonical strategy and backtest engine. Exact verification computes the fifth percentile of a custom bootstrap score from **500 resamples using 20-trading-day blocks**. That lower bound is one ranking input: under the default holdout gate, validation pass and storage score take precedence before the selection lower bound is used as a later comparator.

The `--validate` diagnostic compares cache-driven and ordinary predicate-filter runs by trade count and entry-time sets, and reports the first entry divergence. It is useful, but it is not a full trade-field parity test. Dense and sparse screening evaluators do have direct equivalence coverage.

The verification record goes beyond one score. It can preserve a train tail and holdout result, validation retention, active-day and active-week counts, top-trade and top-day concentration, worst-trade loss, and cost-stressed metrics. The block-bootstrap series fills zero-trade weekdays between the first and last recorded exits, preserving interior inactivity and temporal clustering. It does not include leading or trailing inactive days outside that span.

```text
fast screen: broad, approximate, disposable ranking
exact verify: narrow, authoritative, reviewable evidence
```

The screening approximation controls where computation goes. The canonical replay remains the authority for what the strategy actually did.

## What this made possible

The predicate sweep turned a search surface too large for per-candidate conventional backtests into a repeatable workflow:

- investigate large predicate neighborhoods rather than hand-picking a few filters;
- grow supported frontiers through seven predicates without materializing the global space;
- reuse market-state computation and compatible artifacts across strategies and windows;
- spend canonical simulation on a bounded shortlist while retaining a diagnostic comparison against the ordinary predicate-filter path.

The advantage was not a single clever instruction or a large server. It was the entire shape of the system: representation, reuse, pruning, parallelism, memory lifetime, distributed execution, and a hard line between screening and truth.

## Evidence and limits

This dossier is based on the predicate-cache and `pred_sweep` implementation, its evaluator tests and diagnostics, and the optimization history retained in the Aikido repository. The exact search-space counts are combinatorial; the 757K-bar/1,200-predicate workload and roughly 24 GB pre-fix memory observation are recorded in commit history. The 1–2 GB post-fix figure is an implementation estimate for the one-subset design bound.

The proof surface includes tests that graph pruning preserves triangle and clique counts, streamed quad candidates match retained exhaustive-triple candidates on fixtures, seeded quads match exhaustive quad results on the test universe, and dense and sparse evaluators agree. Cache tests show date slices equal the corresponding range in the broad cache and incremental appends equal forced fresh builds. Full trade-field parity between cache and ordinary filter paths remains unproven by an automated test.

This is an implementation and optimization-history dossier, not a controlled benchmark against providers or a canonical end-to-end run report. The architectural claim is narrower: this research depended on an internal predicate representation, cache lineage, a custom pruning graph, a strategy-specific screening model, and an exact verification contract. Those were the reasons to build the subsystem.

[See the larger Aikido system →](/aikido/)
