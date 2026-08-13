---
title: Why a depth heatmap needs a price anchor for every column
date: 2026-08-14
excerpt: A small rendering shortcut made old liquidity appear to move. The fix was to preserve the coordinate system with the data.
tags: Depthfield, WebGPU, market data
---

An order-book heatmap looks like a picture, but it is really a history of coordinate systems.

Each vertical column records the liquidity that existed at one moment. The rows are prices. That sounds stable until the live market moves far enough that the visible price window has to recenter.

My first useful version of Depthfield treated the price axis as one shared, current transform. Historical columns stored liquidity intensities, while the renderer decided where every row belonged using the latest center price.

That shortcut was wrong.

## The visible failure

Suppose a column is recorded while the book is centered near 100. Later, the market moves and the live window recenters near 110. If the old column is drawn with the new transform, its liquidity appears ten units away from where it actually rested.

Nothing in the recorded book changed. The coordinate system did. On screen, the past slid vertically.

The failure was especially deceptive because the heatmap still looked smooth. It produced a plausible picture with false history—the dangerous kind of visualization bug.

## Preserve the frame with the observation

The fix was to store a price anchor with every historical column. A column now means:

```text
timestamp
liquidity buckets
price center
bucket size
```

The renderer reconstructs each column in its original price frame, then maps that frame into the current viewport. Recentering the live book no longer rewrites where old orders appeared.

This costs a little more storage and shader work. It also turns the recording into an honest description of what was visible at the time.

## History should be immutable

The same rule shapes the rest of the renderer: once a depth column crosses behind the live boundary, it is never rewritten. Only the live-book texture remains mutable.

That boundary makes several behaviors easier to reason about:

- a reconnect cannot silently repaint earlier liquidity;
- changing the live aggregation does not reinterpret an existing recording;
- zooming chooses among recorded resolutions instead of stretching one image;
- time spent offline remains an empty gap instead of becoming invented continuity.

The browser still cannot show market depth from before it connected. The exchange does not provide that history. Depthfield says so by leaving the space empty.

## The broader lesson

When a visualization records values whose meaning depends on a changing frame, preserve the frame too.

The principle applies beyond market prices: map projections, sensor calibration, camera transforms, units, reference clocks, schema versions. Saving the values without the context may produce a compact record, but not a reliable one.

[Open Depthfield](https://beejmaxx.github.io/depthfield/) or [inspect the renderer](https://github.com/beejmaxx/depthfield).
