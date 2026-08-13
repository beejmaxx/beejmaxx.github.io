# Marketplace integrity report notes

## Reporting job

- **Audience:** technical, security, marketplace integrity, risk, and product reviewers
- **Question:** what has been implemented across the four anti-bot repositories, what evidence supports it, and what remains unvalidated?
- **Answer:** the repositories form a reviewable control model from server-side observation through adaptive testing, economic-harm investigation, and reversible intervention; only the HTTP scorer and Red Queen harness are integrated in code.
- **Scope:** deterministic synthetic results committed or documented in the four public repositories as of August 2026.
- **Success criterion:** a technical reader can audit the architecture, metric definitions, evidence boundaries, material risks, and production-validation requirements without encountering promotional claims.

## Technical-report structure

| Required role | Visible report section |
|---|---|
| Title | Marketplace Integrity & Anti-Bot Systems |
| Technical summary | Technical summary |
| Key findings with evidence | Results and limitations |
| Scope, data, and metric definitions | Architecture; Evaluation basis and metric definitions |
| Methodology | Control and decision model; project evidence methods |
| Limitations, uncertainty, and robustness | Adjacent result limitations; Assumptions and unknowns |
| Recommended next steps | Production-validation plan |
| Further questions | Required discovery questions |
| Governance implications | Risk and governance requirements |

## Editorial policy

- No hiring, candidate, capability, or self-promotional framing.
- No first-person claims or calls to contact the author.
- Name implementation status precisely: integrated, independently executable, or conceptual/schema-level.
- Present synthetic results as fixture-specific engineering evidence, never as production efficacy.
- Keep material user, market, privacy, operational, and governance risks visible.

## Source inventory

| Project | Canonical evidence used | Reported synthetic result |
|---|---|---|
| HTTP Bot Defense Lab | `README.md`, `docs/case-study.md`, `docs/adaptive-closure.md` | Seed 42 acceptance fixture plus bounded account/audit state and actual Go scorer integration |
| Red Queen Lab | `evidence/demo/summary.json`, `evidence/go-detector/`, `docs/GO_DETECTOR_EXPERIMENT.md` | Standalone benchmark plus v1→v4 exact replay: 2,819→1,200 credits, 54 later market actions blocked, then a new 34-action frontier |
| Market Integrity Lab | `README.md`, local `artifacts/demo/summary.json`, `docs/METRICS.md` | Offline case evidence threshold at T+385; ring profit 109 to 18 credits; legitimate fill quantity +1.183%; total fill quantity −2.574% |
| Marketplace Intervention Lab | `evidence/demo/summary.json`, `docs/METHOD.md` | DR residual harm 108.784 / 27.226 / 8.402; 94.6% outcome maturity clears 90% gate; shifted canary friction 11.0% versus 6.5% budget |

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
- Cross-repository fresh-strategy profit is not a paired causal comparison; only the 94-action frozen replay uses identical actions.
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
