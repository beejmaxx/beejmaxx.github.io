---
title: Rust / Python Execution Platform
subtitle: Platform infrastructure for replay, simulation, runtime workflows, evidence capture, operational visibility, and shared semantics across historical and live evaluation.
index: 03
tags: Rust, Python, replay, simulation
image: /assets/screenshots/strategy-explorer.png
---

## What exists

Research and runtime workflows needed to be comparable across historical replay, simulation, and live evaluation. The platform needed fast feedback, clear interfaces, reproducible execution, and enough observability to make complex behavior debuggable.

## The hard part

Historical replay, simulation, and live-style execution are easy to make individually. The harder problem is keeping their semantics close enough that a result can be compared without silently changing the rules.

## Key decisions

- Keep frozen inputs and experiment metadata attached to results.
- Treat evidence capture as part of execution, not a reporting task afterward.
- Use Rust where runtime boundaries and performance matter; keep Python useful for inspection and iteration.
- Separate policy evaluation from the bridge that can affect external state.

## Evidence

The public Aikido overview, architecture record, source repository, and strategy explorer show the system from four different distances.

## Limits

The public material documents architecture and interfaces. It does not make private data, credentials, or live trading results public.

## What I would change

I would define the cross-mode semantic contract earlier and make every divergence between replay, simulation, and runtime a first-class test artifact.
