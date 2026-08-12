# Marketplace integrity report notes

## Reporting job

- **Audience:** product, engineering, security, marketplace, and hiring leadership
- **Question:** what do the four independent portfolio projects collectively demonstrate about owning a marketplace anti-bot function?
- **Answer:** they form a reviewable operating model from server-side observation through adaptive testing, economic-harm investigation, and reversible intervention.
- **Scope:** deterministic synthetic results committed or documented in the four public repositories as of August 12, 2026.
- **Success criterion:** a reader can distinguish demonstrated mechanics from assumptions and production claims that remain unsupported.

## Executive-report structure

| Required role | Visible report section |
|---|---|
| Title | Marketplace Integrity & Anti-Bot Systems |
| Executive summary | Executive Summary |
| Key findings with evidence | Four project evidence cards |
| Recommended next steps | 0–30 / 31–60 / 61–90 production path |
| Further questions | Questions I would ask internally |
| Caveats and assumptions | Caveats and assumptions |

## Source inventory

| Project | Canonical evidence used | Reported synthetic result |
|---|---|---|
| HTTP Bot Defense Lab | `README.md`, `docs/case-study.md` | Seed 42; 74 accounts; 2,680 requests; request-time recall 41.67%; layered TP=24, FP=0, TN=50, FN=0 at threshold 60 |
| Red Queen Lab | `evidence/demo/summary.json`, `README.md` | 240 evaluations per method; 23.779% search-objective uplift; adaptive holdout detection 0%; retained harm 100%; replay reduced from 2,317 to 424 actions |
| Market Integrity Lab | `README.md`, local `artifacts/demo/summary.json`, `docs/METRICS.md` | Ring case at 385 seconds; ring profit 109 to 18 credits; legitimate fill quantity +1.183%; total fill quantity −2.574% |
| Marketplace Intervention Lab | `evidence/demo/summary.json`, `docs/METHOD.md` | DR residual harm 108.784 / 27.226 / 8.402; aggressive policy rejected; shifted canary friction 11.0% versus 6.5% budget after 300 episodes |

The market-integrity full `summary.json` is locally reproducible but not committed. The reader-facing citation therefore links to the public README section that documents the same default-seed result and to the committed metric definitions.

## Chart map

| Report segment | Question | Form | Fields | Supported takeaway |
|---|---|---|---|---|
| HTTP detection | What changes when longer-window evidence is added? | Two horizontal bars | layer, constructed account recall | Bounded request-time scoring is incomplete in the acceptance fixture |
| Market integrity | Does the targeted intervention alter ring profit, and at what market cost? | Two horizontal bars plus guardrail note | policy world, ring profit | Economic harm and player-market guardrails belong together |
| Red Queen | Does the scripted test survive adaptive evaluation? | Three exact-value cards | control detection, adaptive detection, replay size | Known-test success can coexist with an adaptive failure |
| Intervention | Which policies are supported and what happens in canary? | Three policy cards plus rollout comparison | residual harm, gate status, friction | Attractive unsupported estimates must be rejected; canary approval must be reversible |

Colors are categorical and semantic: blue for baseline/observation, mint for supported improvement, coral for failure/rejection, and amber for caution or a declared budget. Labels and text carry the meaning without relying on color alone.

## Metric interpretation

- Percentages are descriptive values for specific deterministic synthetic fixtures, not generalized accuracy estimates.
- Credits are scenario units, not money.
- Ring profit reduction is `(baseline ring profit - treatment ring profit) / abs(baseline ring profit)`.
- Red Queen retained harm compares realized profit under the reference detector with the identical strategy under a no-op detector.
- Intervention residual harm is an offline policy-value outcome; the report identifies the doubly robust point estimate and separates support/guardrail gates from policy performance.
- The 90-day plan is a recommendation, not evidence from the synthetic labs.

## Caveat policy

The report must retain all of the following on future edits:

1. a top-of-page statement that no Sony or PlayStation production information is represented;
2. a clear synthetic qualifier before quantitative evidence;
3. project-level interpretation adjacent to every quantitative result;
4. explicit excluded claims;
5. a distinction between reasonable prototype presumptions and internal unknowns;
6. direct links to the public source repositories and supporting evidence.
