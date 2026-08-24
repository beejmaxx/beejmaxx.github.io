---
title: Agent Supervisor
subtitle: A Rust experiment in supervising external AI agents as long-running, unreliable processes.
index: 00
tags: Rust, ACP, SQLite, agent infrastructure
image:
---

## Problem

An external AI agent can stream output, mutate a workspace, request permission, stop responding, or disappear after an effect may already have happened. A chat transcript alone cannot answer the operational questions that follow:

- Which durable attempt owned the work?
- What authority did the host actually have?
- Was the attempt completed, interrupted, failed before acting, or left ambiguous?
- Can a replacement agent continue without treating uncommitted worker state as truth?

Agent Supervisor explores the narrow host layer around those questions. It does not try to become a better coding agent or a universal model framework.

## Boundary

```text
client command
      |
      v
Agent Supervisor
  attempt identity
  lifecycle + recovery
  authority + approvals
  evidence + receipts
      |
      +---- hosted model loop
      +---- managed Codex app-server
      +---- external ACP process
```

The implementation reports three trust tiers instead of inferring guarantees from an agent's name:

- **hosted** — the supervisor owns the model loop and model-visible effects;
- **managed** — cognition is external, while model-visible tools cross the supervisor's tool host;
- **external** — the supervisor owns attempt lifecycle and observations, while the agent retains its own tools and effects.

This distinction prevents the control plane from claiming authority over actions it merely observed.

## Implemented evidence

- [`ForegroundTurnTerminal`](https://github.com/beejmaxx/agent-supervisor/blob/main/crates/domain/src/foreground.rs) distinguishes completed, interrupted, failed, and `outcome_unknown` attempts.
- [`PlannedToolCall`](https://github.com/beejmaxx/agent-supervisor/blob/main/crates/domain/src/effect.rs) separates provider call IDs from supervisor-issued invocation identity and carries effect and approval policy before dispatch.
- The [SQLite foreground store](https://github.com/beejmaxx/agent-supervisor/blob/main/apps/agent-supervisor/src/adapters/sqlite_foreground.rs) uses expected owner generations when committing lifecycle transitions.
- The [ACP adapter](https://github.com/beejmaxx/agent-supervisor/blob/main/apps/agent-supervisor/src/adapters/acp.rs) launches external agents with exact arguments, streams their events, handles cooperative cancellation, and preserves the weaker external-agent guarantee.
- [ACP integration tests](https://github.com/beejmaxx/agent-supervisor/blob/main/apps/agent-supervisor/tests/acp_turn_engine.rs) exercise process loss, unknown outcomes, permissions, restart recovery, and replacement-agent continuity.
- [Workspace evidence](https://github.com/beejmaxx/agent-supervisor/blob/main/apps/agent-supervisor/src/adapters/workspace_evidence.rs) records bounded before/after Git observations separately from the worker's claims.

## Architectural decisions

The supervisor owns durable identity, authoritative lifecycle transitions, and the description of its guarantee. It deliberately delegates cognition and, for external agents, tool execution.

This avoids rebuilding Codex, Goose, OpenCode, or OpenHands. It also avoids pretending ACP is a sandbox: an ACP process can retain ambient capabilities outside the supervisor's tool ledger.

Session manifests and worker bindings are immutable or generation-fenced so that a stale process cannot commit against newer ownership. Unknown outcomes are retained for reconciliation instead of being converted into an automatic retry.

## Limits

Agent Supervisor is a research prototype. It is not a production security boundary, distributed scheduler, workspace-isolation platform, or general workflow engine. The ACP experiment demonstrates lifecycle supervision and honest attribution; it does not prove that external agent effects are contained.

The value of this project is therefore the systems boundary it makes testable: **who acted, under what authority, which outcome is known, and which outcome remains uncertain.**
