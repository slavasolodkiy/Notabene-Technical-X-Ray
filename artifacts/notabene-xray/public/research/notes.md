# Notabene Technical X-Ray — research notes

**Status:** complete
**Depth:** Deep

## Plan
- **Question:** What does Notabene implement, what must an integrating institution implement, and what can public evidence establish?
- **Scope:** Public documentation, source repositories, packages and specifications only. No credentials, private data, transactions, or production writes.
- **Audience:** CTOs, integration developers, identity and compliance engineers.
- **Deliverable:** Cited technical dossier, machine-readable evidence, architecture diagrams, and a local-only educational simulator.

## Focus areas
| Area | Status | Sources |
|---|---|---|
| API, data model and state machines | collected | V1/V2 OpenAPI and developer guides |
| Identity, authentication, privacy and TAP | collected | Docs, protocol specifications and code |
| Public SDKs, repositories, UX and chronology | collected | Six public GitLab repositories and four npm packages |
| Jurisdictions, presentation definitions and IVMS101 | cross-checked | Public definitions, legislation and regulators |
| Product inventory, Flow and partner boundaries | collected | Guides, OpenAPI and integration documentation |

## Coverage checklist
- [x] Distinguish current and legacy products and protocol versus service — product map and TAP chapter.
- [x] Extract endpoints, events, schemas and conditional data requirements — all 105 V2 operations, 52 scoped V1 operations, 3,905 contextual field paths.
- [x] Establish actor, identity, token and key-control boundaries — authentication/trust chapters; private production key controls remain UNKNOWN.
- [x] Reconstruct outgoing and incoming transaction workflows — documented edges only; undocumented enum transitions retained as limitations.
- [x] Compare UK, EU, US, Singapore and Japan without inventing legal rules — law and vendor artifacts separated; exhaustive Japan legal mapping UNKNOWN.
- [x] Inspect public SDK implementation and meaningful history — six repositories; hosted iframe screens not publicly available.
- [x] Map Flow and partner custody/settlement responsibilities — detailed Fireblocks V1 boundary and Flow V2 payout schemas.
- [x] Build a source-linked explorer and synthetic simulator; document limits — typechecked and running, with preview checked.

## Findings log
- Agent-readable documentation index archived at research/sources/devx-llms.md.
- Evidence labels: VERIFIED = directly supported; INFERRED = reasoned interpretation; UNKNOWN = public evidence insufficient.
- V2 amount is a decimal asset-unit string; V1 uses base-unit integers. [@api-v2-openapi] [@api-v1-openapi]
- UK current law uses GBP 800 inclusive; vendor GB-1000 remains indexed in EUR. [@GAP-JUR-01] [@JUR-04]
- EU legal conjunction differs from the standalone alternatives allowed by FR-0. Passing that definition is not proof of compliance. [@JUR-02] [@JUR-07]
- Managed and self-encrypted PII deployments have different decryption boundaries. [@identity-07]

## Conflicts and open questions
- Product generations and outdated examples must remain distinguishable.
- Public documentation cannot prove deployed internals or operational guarantees.
- Current OpenAPI plural paths differ from singular guide paths; use exact method-specific specification entries.
- Flow pay-in settlement-address guide and OpenAPI disagree on required fields.
- Webhook summary/detail inventories differ; all 12 evidenced events retained.
- First-party documentation is authoritative for what is documented, not independent proof of production behavior. External three-source corroboration is not possible for proprietary API details.

## Gaps
- Protocol and jurisdiction gap-fill agents completed targeted follow-ups. Current UK law corrected after finding a superseded point-in-time statute.
- Limitations: production key custody, internal services, hosted component screen internals, exact Japan legal field mapping, some partner internals, undocumented state transitions and policy selection are not publicly established.