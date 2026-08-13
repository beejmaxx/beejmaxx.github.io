---
title: Real-Time Operations Workstation
subtitle: An operator-facing workstation that brought multi-account state, execution workflows, risk controls, monitoring, and emergency actions into one legible system.
index: 02
tags: real-time systems, operational UX, risk, full-stack
image: /assets/screenshots/trading-fleet-dashboard.png
---

## What exists

Operators needed one surface to understand live account state, execution behavior, exposure, limits, and emergency controls without jumping between separate tools. The interface had to support fast action while keeping state inspectable and operational decisions explainable.

![Trading fleet dashboard](/assets/screenshots/trading-fleet-dashboard.png)

## The hard part

The interface had to support fast action without turning an emergency control into an easy accident. Display state and control logic stayed separate; destructive actions remained explicit; fan-out behavior needed to be visible rather than implied.

![Strategy explorer](/assets/screenshots/strategy-explorer.png)

## System map

```text
workstation → API/control layer → runtime state → policy/control logic
            → execution workflow → monitoring and event logs
```

## Key decisions

- Keep account-level state visible even when actions originate from a group.
- Treat flatten, cancel, and stop as named commands with explicit scope.
- Preserve event and execution history for review rather than showing only current positions.
- Use the same operational model on desktop and mobile without pretending the surfaces are interchangeable.

![Live execution dashboard](/assets/screenshots/live-execution-dashboard.png)

## Evidence

The screenshots on this page show the fleet overview, experiment comparison surface, and live execution state. They are product artifacts, not reconstructed portfolio mockups.

## Limits

The public record can show interface structure and system boundaries, but not private account data, production credentials, or confidential operational history.

## What I would change

I would make command provenance and last-known-good state even more prominent, and treat every emergency action as a reviewable incident artifact from the beginning.
