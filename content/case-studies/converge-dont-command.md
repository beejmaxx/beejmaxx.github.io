---
title: Converge, Don’t Command
subtitle: Replacing fragile order deltas with idempotent desired-state convergence—and redesigning protection after a practice-account runaway.
index: 00.2
tags: Aikido, distributed systems, live execution, reconciliation, incident response
image:
---

## “Buy one” is not an idempotent instruction

The runtime originally translated policy decisions into delta commands:

```text
observed position = 0
desired position  = +1
command           = buy 1
```

That is correct only while the observation remains current.

In a rapid convergence cycle, the broker could fill the first order before the runtime’s observed snapshot reflected it. The next cycle still saw zero and issued another `buy 1`. A retryable control loop had turned an old observation into a **2× position overshoot**.

The deeper problem was not retry timing. It was the command model. “Buy one” describes an action; it does not describe the state the system intends to maintain.

## Change the instruction to a target

The decision runtime moved to one command per instrument carrying `target_signed_qty`:

```text
converge MES to +1
```

Before acting, the executor asks the broker what exists now. It computes the delta from broker truth, not from the snapshot that originally produced the command.

```text
target +1, broker  0 → buy 1
target +1, broker +1 → no-op
target +1, broker +2 → sell 1
target  0, broker -1 → buy 1
```

Sending the same target repeatedly becomes naturally idempotent. The desired state remains stable while the corrective action changes with observation.

[[visual:convergence]]

## Coalesce intent where execution happens

Idempotent commands were necessary but not sufficient. There was still a window between command processing and broker state reflection in which multiple orders for the same contract could be in flight.

The executor added contract-local convergence state:

- the latest pending target;
- the target currently in flight;
- the stable operation identity;
- the observed broker quantity;
- whether a reconcile is required before more actuation.

Only one market order per contract may be in flight. If a newer target arrives, it replaces pending intent instead of immediately placing another order. Reconciliation confirms where the previous order settled, then the executor calculates the remaining difference.

The delivery path was tightened too. A fire-and-forget broadcast became single-target delivery with an executor acknowledgement. Fallback to another sender happens only after channel close or timeout, and failures remain visible.

This produces a more useful control loop:

```text
latest desired state
→ one accountable executor
→ one in-flight correction
→ broker observation
→ recompute the remaining difference
```

## A position mismatch must stop amplification

The runtime also learned that “block entries” is not a sufficient response to state disagreement.

When broker and local state diverge, actions that appear protective can amplify the error:

- a flatten calculated from the wrong side can increase exposure;
- recreating a missing stop can create an extra exit order;
- convergence intent can reopen a position after an emergency flatten;
- a stale protection mode can transfer authority without anyone explicitly choosing it.

The corrected path treats broker state as authoritative for singleton exposure synchronization, clears convergence intent on flatten, suppresses convergence during the end-of-day flatten window and flatten grace period, and preserves protection ownership while synchronizing broker facts.

## The protective-order runaway

On 2026-04-13, a practice account exposed the worst version of this failure class.

The account began long one MES contract. Native bracket child-order adoption failed because the child IDs were not immediately visible. The runtime fell back to engine-managed protection without cancelling the broker’s existing bracket protection.

Two protection authorities now believed they owned the same position.

When the stop level was reached, both stops sold. The account flipped from `+1` to `-1`. Reconciliation interpreted disappearing protective orders as missing orders and placed new sell-side protection against the reversed position. The loop continued until the practice position reached `-150` and margin exhaustion stopped further orders.

No real money was at risk. The incident was still severe: a safety mechanism had become an exposure multiplier.

[[visual:protection-incident]]

## The incident changed the architecture

Three immediate fixes were recorded:

1. Stop protective reconciliation when broker and local exposure disagree.
2. Use plain market entry plus one engine-managed, broker-hosted hard stop as the canonical default.
3. Treat a disappeared tracked stop as a reconciliation event—not permission to blindly recreate it.

The larger rule became:

> One position has one protection authority. Authority never changes implicitly while the position is open.

The runtime’s V1 hard-stop model then made the source chain explicit:

1. an upstream `ProtectionPlan` hard-stop price;
2. an existing valid protective-side stop;
3. an emergency distance derived from the effective runtime risk cap.

The fallback is logged as an emergency, scales with contract quantity, respects current risk overrides, and does not create a resting target. Strategy-driven exposure reduction and hard-stop protection are separate responsibilities.

## Recovery behavior became a first-class feature

The convergence path now accounts for several realities that clean diagrams omit:

- broker fills can arrive before local updates;
- WebSocket delivery can fail after a command was persisted;
- a reconnect can reveal exposure the process did not create;
- manual and end-of-day flattening must cancel pending convergence;
- an operator command needs acknowledgement and a visible blocked reason;
- protection must survive scale-in and scale-out without duplicating orders.

The staging actuation harness exercises signed-quantity sequences, target no-ops, reversal through zero, acknowledgement handling, blocked runtime state, and snapshot readback. A recorded clean verification after the runaway fix completed three consecutive market-entry → engine-stop → clean-exit round trips from a broker-flat practice account, without duplicate stops or target orders.

## Why desired state is the right abstraction

Desired-state convergence does not make a broker API reliable. It gives unreliable delivery and stale observation a stable semantic target.

It also separates three questions that delta commands blur together:

- **Intent:** What exposure should exist?
- **Observation:** What exposure does the broker report?
- **Actuation:** What is the smallest safe correction now?

That separation makes retry, recovery, operator inspection, and incident analysis possible without inventing a second meaning for the command.

## Limits

The runtime remains a live system with active migration seams, broker-specific behavior, and staging requirements. A practice-account verification is meaningful operational evidence, but it is not proof against every broker race or failure mode.

The defensible result is narrower: the system replaced a demonstrably unsafe delta-command loop with broker-reconciled target convergence, local coalescing, acknowledged delivery, explicit protection authority, and regression harnesses for the failure modes that had occurred.

## Source references

- The [protective-order runaway incident record](https://github.com/beejmaxx/aikido-systematic-trading/blob/main/docs/incidents/2026-04-13_protective_order_runaway.md) documents the observed failure and corrective actions.
- The [desired-exposure architecture](https://github.com/beejmaxx/aikido-systematic-trading/blob/main/docs/foundational_desired_exposure_architecture.md) defines the convergence model and its authority boundary.
