---
title: Real-Time Operations Workstation
subtitle: An operator-facing workstation that brought multi-account state, execution workflows, risk controls, monitoring, and emergency actions into one legible system.
index: 02
tags: real-time systems, operational UX, risk, full-stack
image:
---

## What exists

Operators needed one surface to understand live account state, execution behavior, exposure, limits, and emergency controls without jumping between separate tools. The interface had to support fast action while keeping state inspectable and operational decisions explainable.

## The hard part

The interface had to support fast action without turning an emergency control into an easy accident. Display state and control logic stayed separate; destructive actions remained explicit; fan-out behavior needed to be visible rather than implied.

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

## Evidence

The [public Aikido repository](https://github.com/beejmaxx/aikido-systematic-trading) and [architecture record](/aikido/architecture.html) document the control-plane boundaries behind the workstation. Operational screenshots are withheld because they contain account-level data; the page does not substitute reconstructed mockups for that evidence.

## Limits

The public record can show interface structure and system boundaries, but not private account data, production credentials, or confidential operational history.

## What I would change

I would make command provenance and last-known-good state even more prominent, and treat every emergency action as a reviewable incident artifact from the beginning.
