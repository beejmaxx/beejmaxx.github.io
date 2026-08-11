---
title: Rendering market depth without a backend
date: 2026-08-11
excerpt: Depthfield connects directly to public exchange data and turns a sequence-aware order book into a long-running WebGPU heatmap in the browser.
tags: webgpu, real-time systems, depthfield
---

Most depth charts show the order book **now**. A liquidity heatmap adds the missing dimension: where orders rested, when they appeared or disappeared, and how price moved around them.

That makes the problem more than a chart. It is a real-time state machine, a history system, and a GPU renderer sharing one screen.

## The browser is the workstation

Depthfield connects directly to public Binance Spot REST and WebSocket endpoints. There is no account, API key, extension, or application backend in the primary path.

A Web Worker owns the live market state. It starts from a depth snapshot, applies sequenced diffs, detects gaps, tracks best bid and ask, and normalizes trades before sending compact binary frames to the renderer.

```text
REST snapshot + WebSocket diffs / BBO / trades
                    ↓
      sequence-aware market worker
                    ↓
       compact transferable frames
                    ↓
  WebGPU heatmap + interaction overlay
```

If public exchange data is unavailable, the same interface can fall back to a deterministic simulator. That keeps the product explorable without hiding which source is active.

## History should not be rewritten

The live book changes in place. Historical depth must not.

Once a column passes behind the live boundary, Depthfield treats it as evidence. The renderer stores circular history at several resolutions—20 milliseconds, 200 milliseconds, and one second—so the user can move from a few seconds to roughly an hour without shifting every pixel on each update.

Per-column price anchors preserve old depth when the current book recenters. Zoomed-out time before the session began stays empty rather than being stretched or fabricated.

These constraints matter because a convincing visualization can still be wrong. The renderer should make the data easier to inspect, not make missing history look complete.

## A narrow trust boundary

Depthfield reads public market data and does not place orders. It shows when the feed has fallen back to simulation, documents its aggregation behavior, and keeps the implementation open for inspection.

That boundary lets the engineering stay focused: maintain an honest book, preserve its history, and make the result feel immediate under a mouse or trackpad.

The live build is available at [beejmaxx.github.io/depthfield](https://beejmaxx.github.io/depthfield/), with the source in the [Depthfield repository](https://github.com/beejmaxx/depthfield).

