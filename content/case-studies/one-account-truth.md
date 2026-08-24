---
title: One Account, One Truth
subtitle: Extracting account rules into one deterministic state machine shared by canonical replay and the live runtime accounting path.
index: 00.1
tags: Aikido, Rust, state machines, simulation, runtime correctness
image:
---

## The system had more than one version of the truth

A trading policy does not act on an abstract score. It acts on an account with a balance, a trailing loss floor, open exposure, protection, a pass target, and a history that changes what is legal next.

Those rules had accumulated in several places: historical simulation, policy evaluation, runtime accounting, reporting, and broker reconciliation. Each implementation could look reasonable in isolation while disagreeing at a boundary that mattered.

The dangerous questions were ordinary ones:

- Did an intraday equity touch bust the account even if the daily close recovered?
- Is passing a permanent historical fact or only true while balance stays above the target?
- Does the trailing floor advance from realized balance, marked equity, or end-of-day balance?
- What happens to policy state when the broker reports a fill before local state catches up?
- Can replay and live execution explain the same account path using the same events?

The solution was to stop asking several systems to independently interpret the rules.

## The kernel

`policy-kernel` introduced a pure `OneAccountState` transition model. It receives explicit events and produces a new validated state.

```text
stateₙ + eventₙ → stateₙ₊₁
```

The state contains the facts required to explain the account:

- starting, current, peak, and highest end-of-day balance;
- pass balance and recorded outcome;
- trailing threshold, current drawdown cushion, and minimum cushion;
- realized and marked-to-market daily PnL;
- current and requested quantity by instrument;
- open risk and largest instrument risk;
- stop ownership and protection state;
- controller scale, book sizing, and active-book provenance.

Its event vocabulary is deliberately small:

| Event | Meaning |
| --- | --- |
| `DayStart` | Establish the new trading-day boundary. |
| `DesiredExposureUpdate` | Record what the policy wants to hold and why. |
| `Fill` | Apply signed quantity and realized-PnL changes. |
| `EquityProbe` | Evaluate an intraday equity observation against account boundaries. |
| `MarkToMarket` | Update current unrealized account pressure. |
| `DayClose` | Apply end-of-day rules and advance daily state. |
| `AccountAdjustment` | Record an external cash change with an explicit reason. |

The kernel has no market-data lookup, broker client, Monte Carlo scheduler, artifact writer, or leaderboard logic. That separation is what makes the transition rules reusable and testable.

[[visual:account-kernel]]

## Validation is part of the state model

`OneAccountState::validate()` checks relationships rather than merely checking field types.

Among the enforced conditions:

- pass balance equals starting balance plus the profit target;
- the trailing threshold cannot move above peak balance or below its initial floor;
- drawdown cushion must equal balance minus trailing threshold;
- minimum cushion cannot exceed current cushion;
- maximum single-instrument risk cannot exceed total open risk;
- a busted state must have crossed the loss boundary;
- a passed state must have reached the pass boundary at some point.

That last rule exposed a subtle modeling error. An earlier invariant required the **current balance** of a passed account to remain above the pass target. That made a historical outcome disappear after later adverse movement. The corrected invariant uses peak balance: once the account has reached the target, passing remains a fact about the path even if a continuation replay later moves below it.

This was not presentation logic. It changed which trajectories the state machine could honestly represent.

## One transition model, two callers

The simulator and runtime do different work around the kernel.

The simulator owns chronological replay, minute-path construction, Monte Carlo scheduling, and evaluation artifacts. It converts a frozen policy and point-in-time input into a stream of account events.

The runtime owns broker observations, command delivery, convergence, and live safety. It maintains a kernel-backed accounting shadow, synchronizes it from observed state, and applies immediate fill and exposure events.

Both can therefore use the same vocabulary for balance, exposure, protection, pass, bust, and drawdown.

```text
canonical minute path                 live broker observations
          │                                      │
          ├── account events ──┐  ┌── account events ──┤
                              ▼  ▼
                         OneAccountState
                              │
                       validated account facts
```

The important boundary is narrow: sharing the kernel does not mean replay and live execution are the same program. It means the rules they are allowed to disagree about have been reduced.

## Exact-minute replay uses the same account vocabulary

Daily PnL can conceal the order of events inside a session. An account can cross its trailing loss boundary at 10:12 and recover by the close; a daily-only evaluator would incorrectly describe that day as safe.

The canonical evaluator therefore constructs an exact-minute path and feeds equity changes through the account kernel in chronological order. Authoritative runs require:

- canonical minute inputs;
- stamped contract identity rather than runtime guessing;
- zero root-bar fallbacks;
- zero runtime contract-resolution fallbacks for canonical inputs;
- explicit sparse-window behavior;
- agreement between exact replay fields and the emitted board row.

The kernel is the rule surface. Minute replay determines the sequence presented to it.

[[visual:account-trace]]

## What the refactor changed

The extraction replaced duplicated accounting transitions with a shared event model and adapter boundary. The recorded refactor preserved deterministic simulation results while connecting runtime accounting to the same state machine.

It also made disagreement easier to locate:

- If replay constructs the wrong sequence, inspect minute-path construction.
- If live state is stale, inspect observation and reconciliation adapters.
- If both receive the same events and disagree, the kernel or its invariant tests are wrong.
- If a report disagrees with kernel state, the report is a projection—not an alternate authority.

That diagnostic partition is nearly as important as code reuse.

## Evidence

The implementation includes hand-built and regression fixtures around pass, bust, drawdown movement, daily boundaries, exposure updates, and event ordering. The canonical evaluation contract requires the kernel, exact-minute replay, and environment runtime to agree on critical cases such as:

- intraday pass before later adverse movement;
- intraday bust before later recovery;
- minute-path bust while the daily close appears safe;
- daily profit caps and end-of-day floor movement;
- forced flatness at 16:00 ET;
- post-cutoff entries that must not count.

The repository also retains a selected-path parity lane and canonical fixtures so architectural changes can be compared against locked behavior rather than memory.

## Limits

This is an implemented shared kernel inside an active migration, not a claim that every historical simulator or every runtime path has already disappeared. The audited architecture still identifies legacy compatibility surfaces and work required to finish the single-simulator cutover.

The case study therefore supports a precise claim: Aikido has extracted its central one-account transitions into a reusable, validated Rust state machine and connected the canonical simulator and runtime accounting path to it. It does not claim that all surrounding systems are identical.

## Source references

- [`OneAccountStateV0`, `OneAccountEventV0`, reducers, and invariant tests](https://github.com/beejmaxx/aikido-systematic-trading/blob/main/crates/policy-kernel/src/one_account.rs) are the implemented shared state-machine surface.
- The [one-account state specification](https://github.com/beejmaxx/aikido-systematic-trading/blob/main/docs/research/policy_kernel_one_account_state_spec_v1.md) records the intended boundaries and parity contract.
