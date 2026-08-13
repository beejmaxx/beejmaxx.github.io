---
title: Data & Analytics Infrastructure
subtitle: Ingestion, normalization, storage, query, and analysis workflows across PostgreSQL, ClickHouse, SQLite, Python, SQL, and replayable event models.
index: 05
tags: ClickHouse, PostgreSQL, SQL, data systems
image:
---

## Problem

Data-heavy workflows needed reliable ingestion, local and analytical storage, repeatable experiment tracking, and query paths that made comparison and debugging practical at higher volumes.

## What I built

- Event-data ingestion pipelines with normalization and replayable storage.
- SQLite-backed local research workflows for portable inspection and iteration.
- ClickHouse-backed vectorized evaluation paths for high-volume historical analysis.
- PostgreSQL-style runtime and job tracking models for operational workflows.
- Sortable comparison views for experiment, configuration, and performance review.

## Technical challenges

- Designing event models that support both replay and analysis.
- Keeping queries fast enough for iterative research.
- Normalizing messy external data into stable internal representations.
- Making results inspectable instead of returning opaque aggregates.

## Limits and what I would change

This record describes recurring infrastructure rather than one named system. Future versions should include representative schemas, query plans, and before/after latency evidence where those can be published safely.
