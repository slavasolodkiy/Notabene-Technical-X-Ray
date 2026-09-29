# Simulator verification

Scope: `artifacts/notabene-xray/src/lib/simulator.ts` and focused local tests. Reviewed against the saved V2 OpenAPI and `research/api-findings.md`, `research/v1-v2-delta.md`, `research/flow-findings.md`, `research/gap-protocol.md`, and the continuation brief; no new public research or production API calls.

## Corrections

- All 14 trace stages and all eight facet fields remain present. The existing wallet, person, jurisdiction, proof, policy, counterparty and fiat-value controls/types remain intact.
- Replaced the erroneous “V1 amount string and payout ref” wording: this example is a Transact V2 transfer with a decimal asset-unit string (`amount: "1"`) and a client `ref`, **not** a Flow payout or a V1 base-unit amount. The TAP object is explicitly an unvalidated conceptual illustration, not a claimed production wire payload.
- Replaced “does not verify hash on chain (usually)” with **UNKNOWN** production chain-verification behavior. No chain lookup or settlement occurs in the local model.
- Reworded every step’s description and eight facets to distinguish the public API, hypothetical roles, synthetic data and local model from observed production behavior. No successful HTTP response, encrypted envelope, delivered webhook, verified proof, network authorization or settled status is represented as an actual occurrence.
- Previously an “authorized” branch simultaneously claimed external execution and `SETTLED` despite `broadcast: false`. It now ends in the local-only `AUTHORIZED_NOT_SETTLED` stage, with the final artifact's decision explicitly labeled a selected policy rather than an observed network status; no settlementId is reported. Reject, flag, missing-counterparty and unresolved-PD cases never settle. Missing counterparty and unresolved rule branches block policy decisions and suppress downstream conceptual counterparty messages. The selected proof is never marked proven/confirmed. Micro-transfer confirmation responsibility remains **UNKNOWN**.
- GB-0/GB-1000 exist but a EUR input cannot establish current GBP-rule selection or production FX/comparator: result **UNKNOWN**. JP-0 exists but does not establish production selector/legal completeness: **UNKNOWN**. At exactly SGD 1,500, the statutory lower branch is known but vendor-index equality is **UNKNOWN**; do not silently pick SG-0. US below USD 3,000 remains **UNKNOWN**. Remaining EU/US/SG branches are local vendor-PD illustrations, never legal compliance verdicts.
- Invalid nonfinite, zero and negative fiat values throw before generating a trace.

## Deterministic checks

Command: `node --experimental-strip-types --test artifacts/notabene-xray/src/lib/simulator.test.ts` — **3 tests passed**. Exhaustively checked **7,200** combinations: 2 wallets × 2 person types × 5 jurisdictions × 6 proof choices × 3 policies × 2 counterparty states × 10 values (including thresholds). Asserts stable output, 14 unique steps, eight nonempty facets per stage, branch outcomes, no claimed settlement, never-sent REST examples, no generated proof, missing-counterparty suppression, jurisdiction uncertainty, V2 wording and finite positive input validation. A throwing replacement for global `fetch` detected no network call.

Command: `./node_modules/.bin/tsc -p artifacts/notabene-xray/tsconfig.json --noEmit` — **passed**. No app workflow or production service was started.

## Remaining limits

No live transaction or DIDComm/TAP payload validation was performed. The published PD artifacts do not resolve production jurisdiction selector precedence, GB FX rules, JP legal completeness, SG equality selection, micro-transfer confirmer or settlement chain verification. A local policy selection is not an institutional approval, and a conceptual webhook is not evidence of delivery.