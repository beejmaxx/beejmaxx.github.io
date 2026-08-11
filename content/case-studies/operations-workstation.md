---
title: Real-Time Operations Workstation
subtitle: An operator-facing workstation that brought multi-account state, execution workflows, risk controls, monitoring, and emergency actions into one legible system.
index: 02
tags: real-time systems, operational UX, risk, full-stack
image: /assets/screenshots/trading-fleet-dashboard.png
---

## Problem

Operators needed one surface to understand live account state, execution behavior, exposure, limits, and emergency controls without jumping between separate tools. The interface had to support fast action while keeping state inspectable and operational decisions explainable.

![Trading fleet dashboard](/assets/screenshots/trading-fleet-dashboard.png)

## What I built

- Frontend dashboards for live account, balance, position, and risk visibility.
- Backend coordination for multi-account fan-out workflows.
- Operator controls for flatten, cancel, emergency stops, and risk limits.
- Monitoring views and explanations designed for fast operational review.
- Mobile and desktop control surfaces for the same operational model.

![Strategy explorer](/assets/screenshots/strategy-explorer.png)

## Architecture

```text
workstation → API/control layer → runtime state → policy/control logic
            → execution workflow → monitoring and event logs
```

## Technical challenges

- Keeping real-time state readable and trustworthy under operational pressure.
- Separating display state from control logic so actions remained explicit.
- Designing emergency controls that were available without being easy to misuse.
- Making multi-account fan-out behavior visible enough to debug and operate.

![Live execution dashboard](/assets/screenshots/live-execution-dashboard.png)

## What this demonstrates

Platform ownership, real-time systems, operational UX, backend architecture, data modeling, monitoring, reliability-aware interface design, and the ability to turn complex runtime behavior into an operator-usable product.

