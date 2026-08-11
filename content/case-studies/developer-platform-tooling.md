---
title: Developer Platform & Tooling
subtitle: Developer-facing workflows around a complex Rust and Python platform—APIs, CLIs, MCP tools, dashboards, browser tooling, automation, evidence capture, and operational review.
index: 01
tags: Rust, Python, MCP, developer experience
image:
---

## Problem

The platform had no separate product team and I was the primary user, so developer experience directly shaped the architecture. Slow feedback, unclear state, opaque failures, or manual review would have made iteration too expensive.

The system needed to be easy to inspect, easy to run repeatedly, and easy to reason about when behavior diverged from expectations.

## What I built

- CLI workflows for local debugging, repeatable execution, automation, and operational review.
- MCP interfaces so AI agents could interact with internal services where remote or standardized tool access made sense.
- Tmux-based Codex CLI and Claude Code workflows for architecture exploration, implementation, debugging, testing, documentation, and review.
- Dashboards for inspecting runtime state, evidence, results, and operational behavior.
- Browser tooling and automation around repetitive operations and external-service workflows.
- Fast feedback loops around replay, simulation, evaluation, and production review.

## Interface tradeoffs

I did not treat MCP as the answer to every problem. For local workflows, CLIs were often simpler, easier to debug, and easier to operate. MCP was useful where tools needed a standardized interface for agent access or remote execution.

```text
internal services → APIs and command surfaces → CLI / MCP / dashboards
                  → logs, evidence, metrics, and review
```

## What this demonstrates

Developer-tooling judgment, API and interface design, AI-native development workflows, operational UX, debugging discipline, and the ability to make complex systems easier to use and trust.

