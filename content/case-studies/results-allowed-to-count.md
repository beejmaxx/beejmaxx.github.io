---
title: When a Result Is Allowed to Count
subtitle: A point-in-time evidence and certification system that can reject attractive research results when their provenance, replay, or uncertainty is not good enough.
index: 00.3
tags: Aikido, research systems, reproducibility, evaluation, statistical rigor
image:
---

## A board row is not evidence

Research systems are good at producing numbers that look finished. A pass rate, drawdown, or ranked candidate can be internally consistent while answering the wrong historical question, using a stale evaluator, leaking future labels, or hiding a simulator fallback.

Aikido treats evaluation as a release-quality subsystem. A result earns authority only when its input history, executable semantics, artifacts, provenance, and uncertainty all clear explicit gates.

The governing question is not:

> What score did the run produce?

It is:

> What was knowable at the decision time, what exact program consumed it, what path did that program produce, and what evidence justifies trusting the comparison?

## Freeze what was knowable

The historical candidate universe is materialized as immutable point-in-time snapshot batches rather than reconstructed from mutable “current” views.

A snapshot records:

- the effective historical decision date;
- the evidence cutoff available on that date;
- candidate membership and identity;
- point-in-time features;
- the batch and publication lineage;
- forward outcomes only when they would have resolved historically.

An explicit publication pointer chooses the active batch for a snapshot kind. Consumers load the published batch rather than silently asking for the latest matching rows.

This distinction prevents a common form of research leakage: training a historical decision using a label that was calculated later but happens to exist in the warehouse now.

The snapshot scoring path enforces historical availability around optimized-through dates and rolling windows. A later hygiene correction made weekly selectors train only on resolved 20-day labels available before each snapshot date.

The principle is simple:

```text
today’s database contents ≠ what the policy knew on historical Monday
```

## Separate screening truth from account truth

Aikido does not allow every useful projection to become a deploy verdict.

- Snapshot outcomes can measure whether a selector has signal.
- Approximate or proxy Monte Carlo can rank research directions.
- Exact-minute replay determines the realized account path under the canonical rules.
- Deployment requires additional runtime, package, selector, and protection closure.

The system explicitly calls short or incomplete runs **plumbing**. Its current invariant requires at least **126 out-of-sample trading days** before a run can support a promote, restate, or kill decision; the target is 189 days.

A clean 20-day pass can prove that a harness works. It cannot, by itself, prove that a policy works.

## The canonical evaluation bundle

An authoritative evaluation root must contain five mutually consistent artifacts:

| Artifact | Responsibility |
| --- | --- |
| `eval_manifest.json` | Input, evaluator, source, hash, seed, and authority identity. |
| `board_summary.tsv` | The compact result permitted to enter a leaderboard. |
| `replay_summary.tsv` | Exact chronological replay facts. |
| `mc_summary.tsv` | Trial distribution and uncertainty summaries. |
| `trials.ndjson` | The raw trial-level record from which aggregate claims can be audited. |

The files must agree on candidate, policy, scenario, date range, trial count, seed, exact-minute outcome, and authority status.

Board registration rejects evidence rows without their scenario-local artifacts. A polished summary is not allowed to outlive the evidence bundle that produced it.

[[visual:evidence-gate]]

## Authority is a classification, not a tone of voice

Every run root belongs to one of three trust classes:

- `canonical_authoritative` — exact-minute artifacts exist, forbidden fallbacks are zero, canonical inputs are satisfied, and the bundle agrees;
- `research_only` — useful current-simulator output with a stated authority limitation;
- `invalid` — missing, inconsistent, fallback-contaminated, or provenance-mismatched output.

Promotion and deployment may use only the first class. Research can use the second as long as it remains labelled. The third does not become valid because its headline is attractive.

The authority gate checks details that ordinary reporting usually discards:

- exact-minute replay fields are present;
- root-bar fallback count is zero;
- runtime contract resolution is zero for stamped canonical inputs;
- sparse-window behavior is explicit;
- proxy and exact outcomes do not contradict one another;
- evaluator commit and binary hash are current for the comparison.

If exact replay says the account busted while a proxy says it passed, the proxy does not get a vote.

## Determinism closes the provenance loop

The artifact contract requires identical candidate inputs, policy state, minute pack, seed, Monte Carlo settings, and evaluator binary to reproduce byte-identical scored artifacts.

Manifest timestamps and output paths may differ. The decision artifacts may not.

The provenance closure includes:

- Git revision and dirty state;
- evaluator binary hash;
- canonical input hash;
- minute-trade and policy-state pack hashes;
- trial count and seed stream;
- evaluator profile and source class.

If those inputs match and scored artifacts differ, the evaluator contains hidden state or nondeterminism and fails certification.

## Compare policies on matched randomness

Two Monte Carlo summaries with different seeds are not a clean paired experiment. The certification tooling therefore compares candidate and baseline trials using matched `(environment slot, seed, start anchor)` identities.

The comparison reports paired changes in pass speed, bust probability, and drawdown rather than merely placing two unrelated confidence intervals beside one another. It rejects or warns on mismatched contract, denominator, source hashes, evaluator build, or trial stream.

Recent hardening added:

- paired candidate-versus-baseline confidence intervals;
- a seed-stability ladder with trial-hash and first-seed guardrails;
- a confidence scorecard joining audit, exact replay, Monte Carlo, and coverage artifacts;
- confidence-first ranking before fast-pass utility.

The fast screen uses three seed streams. The repository’s audited backlog still lists a ten-seed finalist certificate, block bootstrap, fuller coverage gates, and tail-stress work as incomplete. That distinction belongs on the page: implemented safeguards and intended safeguards are not the same thing.

[[visual:confidence-ladder]]

## The system records when it was wrong

Some of the strongest evidence for this design is not a winning policy. It is the record of claims being downgraded.

The repository contains retraction notes for attractive pass-rate improvements that were initially described as meaningful, then reclassified after a trailing-drawdown fidelity gap was identified. The numbers remained useful as current-simulator artifacts but lost their deployment status.

That is exactly what the authority model is supposed to do:

```text
new simulator fact
→ old comparison no longer satisfies the contract
→ confidence class drops
→ board truth is rebuilt
```

A research platform that can only publish conclusions is incomplete. It also needs a reliable way to withdraw them.

## Confidence is staged

The policy program uses a six-level confidence ladder:

| Level | Meaning |
| --- | --- |
| L0 · idea | A mechanism and falsification condition exist. |
| L1 · plumbing | A runner or fixture works; no research claim yet. |
| L2 · reproducible artifact | The candidate reruns under the current simulator. |
| L3 · fair matched comparison | Candidate and baseline share the same contract and randomness. |
| L4 · board candidate | Full-lineage evidence and robustness gates pass. |
| L5 · deploy-trustworthy | Runtime replay, package closure, selector binding, and protection parity also pass. |

Ranking happens only after gates. One composite score is not promotion logic.

## Why this matters

The result of this system is not a perfectly objective judge. It is a smaller and more visible set of ways to fool yourself.

Point-in-time publication prevents one class of historical leakage. Exact-minute replay prevents daily aggregation from hiding intraday account death. Artifact consistency prevents summaries from becoming detached from raw trials. Matched seeds reduce noise in comparisons. Confidence classes prevent research utility from being mistaken for deployment authority.

Each mechanism turns an implicit assumption into something inspectable.

## Limits

The audited repository documents open work: exact-minute Monte Carlo calibration, expanded seed certification, block bootstrap, coverage enforcement, stop-loss parity, and full single-simulator cutover are not all complete.

This is therefore not a claim that Aikido’s evaluation is infallible. It is a case study in building an evaluation system that identifies its authority boundary, retains the evidence required to audit it, and can demote its own conclusions when that boundary moves.
