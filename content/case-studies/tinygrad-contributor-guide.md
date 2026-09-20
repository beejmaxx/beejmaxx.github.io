---
title: tinygrad Contributor Field Guide
subtitle: An unofficial, source-linked orientation to tinygrad 0.14.0 and current master.
index: 03
tags: Python, UOps, compiler systems, contribution workflow
image:
---

## Current snapshot

This guide is current to **September 21, 2026** and pins upstream
[`master` at `8ad8f73`](https://github.com/tinygrad/tinygrad/tree/8ad8f738755c3ab157d356aedd5d5c108aa1a642).
The latest tagged release is
[`v0.14.0`](https://github.com/tinygrad/tinygrad/releases/tag/v0.14.0), and the
package currently requires
[Python 3.11 or newer](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/pyproject.toml#L13).

This is not official tinygrad documentation. The upstream
[README](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/README.md),
[`AGENTS.md`](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/AGENTS.md),
code, and CI are authoritative. This public page uses only official repository
material and public GitHub links; private research records are not published.

## What tinygrad is today

tinygrad is an end-to-end deep-learning stack rather than only a tensor library.
Its public surface includes tensors and autograd, neural-network and optimizer
helpers, an IR and compiler, scheduling, JIT and graph execution, renderers,
runtimes, and device support.

The useful mental model is a pipeline:

```text
Tensor operations
      ↓
UOp compute graph
      ↓
scheduler → LINEAR UOp containing CALLs
      ↓
lowering and optimization → linear kernel UOps
      ↓
Renderer → source or target representation
      ↓
Compiler → binary
      ↓
run_linear → kernel / copy / view / graph runner
```

The upstream
[developer overview](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/docs/developer/developer.md)
describes that path directly. In the current tree, the main ownership boundaries
are visible in `tinygrad/uop`, `tinygrad/schedule`, `tinygrad/codegen`,
`tinygrad/renderer`, `tinygrad/runtime`, and `tinygrad/engine`.

When a behavior is wrong, first locate the layer that owns the semantics. A
backend-specific symptom can still originate in a shared UOp rewrite or scheduler
assumption; a tensor-level symptom can still require a runtime or device-path
reproducer. Fixing the visible symptom at the wrong boundary usually adds a
special case while leaving the model inconsistent.

## The current contribution bar

The upstream
[Contributing section](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/README.md#contributing)
is unusually explicit:

- State why the change should merge and how it improves tinygrad.
- New contributors should not submit work that looks AI-written. AI use must be
  disclosed. Agent-authored code should not be submitted unchanged or presented
  as personally authored work.
- Do not send code golf, incidental whitespace, or drive-by documentation edits.
- Benchmark every speedup claim and account for readability and maintenance cost.
- Keep the diff conceptually small. Independent prerequisite refactors should be
  separate clear wins when they can stand alone.
- Bug fixes and features need behavioral regression tests.
- Refactors should be clear simplifications and should pass process replay.
- Non-brittle tests, fuzzers, and deletion of dead code from core are welcome.

Low line count is a direction, not a substitute for design. A tiny unproven patch
can be wrong, while intrinsically bulky hardware support still needs a coherent
boundary and unusually strong proof.

## A contribution workflow that matches the repository

1. Reproduce one observable problem on current `master`.
2. Reduce it to the shortest example that still exercises the real failing path.
3. Identify the owning layer before choosing a fix.
4. Make one claim per change; split independent cleanup and prerequisites.
5. Add a regression that fails before the fix and passes after it.
6. Confirm the test actually reaches the claimed backend, compiler, device, and
   state transition.
7. Benchmark behavior that can affect speed, compilation time, memory, or CI.
8. Read the final diff top to bottom and remove unrelated churn.

A green smoke test is necessary evidence, not architectural proof. The strongest
test demonstrates the exact behavior, on the intended path, and makes the old
failure observable.

## Local setup and checks

```sh
git clone https://github.com/tinygrad/tinygrad.git
cd tinygrad
python3 -m pip install -e '.[testing]'
pre-commit install

# focused regression; AGENTS.md asks agents to use 12 workers
python3 -m pytest path/to/test_file.py -x -q -n12

python3 -m mypy tinygrad/
python3 -m ruff check .
```

Use the focused test first. Expand to the relevant suite and CI surface in
proportion to the change. The current
[`test.yml`](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/.github/workflows/test.yml)
is the source of truth for CI, and the README explains when a refactor or speedup
should opt into
[process replay](https://github.com/tinygrad/tinygrad/blob/8ad8f738755c3ab157d356aedd5d5c108aa1a642/test/external/process_replay/README.md).

## Good starting points

The repository currently calls out six useful classes of work: a bug found in
real use with a regression, an open bounty, a sufficiently valuable feature with
tests, a clear simplification, a non-brittle test or fuzzer, or dead-code removal
from core.

Start with a behavior you can personally reproduce and explain. Before opening a
pull request, be able to answer four questions without a generated narrative:

- What exactly was broken or missing?
- Why does this layer own the change?
- Which test proves it on the real path?
- What measurable cost or tradeoff did the change introduce?

That is a smaller and more durable contribution surface than trying to anticipate
every reviewer concern in prose.

## Primary links

- [Upstream repository](https://github.com/tinygrad/tinygrad)
- [Current documentation](https://docs.tinygrad.org/)
- [Developer overview](https://docs.tinygrad.org/developer/developer/)
- [Environment variables and debug levels](https://docs.tinygrad.org/env_vars/)
- [Bijan's synchronized fork](https://github.com/beejmaxx/tinygrad)

The date and commit at the top are deliberate. tinygrad moves quickly; re-check
the upstream instructions and execution path before relying on this snapshot for
a future change.
