# Independent research jobs

Each job is self-contained. Work only from the cited local artifacts and their original URLs in `evidence/source-manifest.json`. A metadata artifact is a provenance pointer, not raw source text. If its underlying capture is unavailable to the researcher, say so rather than reconstructing it. Every conclusion must carry `VERIFIED`, `INFERRED`, or `UNKNOWN`; report contradictions using the four typed forms in `ai/ontology.json`.

## 01 — Entity, agent, and authority ontology

**Question.** Build a role/authority model separating institution, natural/legal person, VASP, customer, agent, PIA, PRA, infrastructure provider, custodian, wallet, Notabene, counterparty and regulator.

**Required artifacts.** `corpus/docs/identity-08.metadata.json`, `corpus/repositories/identity-11.metadata.json`, `corpus/docs/identity-15.metadata.json`, `corpus/docs/api-transfer-payload.metadata.json`, and `ai/ontology.json`.

**Method and output.**
1. Extract only explicitly named roles, identifiers, delegation mechanisms and actions.
2. Produce an authority matrix: actor, may initiate, may authorize, may disclose PII, may settle, credential type, and evidence.
3. Separate protocol `Agent` from organizational agent and from a legal representative.
4. Test every relationship against at least two artifacts where possible.
5. Return a compact ontology plus unresolved collisions. Do not infer legal authority from API write access.

## 02 — API archaeology

**Question.** Reconstruct the captured API surface without collapsing generation, documentation or lifecycle scope.

**Required artifacts.** `corpus/openapi/api-v1-openapi.metadata.json`, `corpus/openapi/api-v2-openapi.metadata.json`, `evidence/endpoints.json`, and `evidence/fields.json`.

**Method and output.**
1. Recount path/method operations mechanically by generation; identify non-operation keys.
2. Group operations by resource, security declaration and lifecycle.
3. Compare operation IDs, request/response schemas and field typing across V1 and V2.
4. Report captured counts as snapshot-scoped, never as the universal live total.
5. Produce a reproducible counting recipe and a contradiction table. Live behavior remains `UNKNOWN` absent authenticated observation.

## 03 — Transact state machine

**Question.** Derive the smallest defensible transfer state machine, including institution-local views and webhook observations.

**Required artifacts.** `corpus/docs/api-statuses.metadata.json`, `corpus/docs/api-webhook-details.metadata.json`, `corpus/docs/api-webhook-flow.metadata.json`, `evidence/webhooks.json`, and `evidence/endpoints.json`.

**Method and output.**
1. Inventory documented statuses separately from schema-only enum values.
2. Build transitions only when a source identifies an action and resulting status/event.
3. Mark undocumented agent statuses and impossible-to-prove transitions `UNKNOWN`.
4. Distinguish a transfer record's state from blockchain settlement state and each institution's local decision.
5. Deliver a transition table, event overlay, terminal-state assumptions, and questions needed to validate retries, reverts and race behavior.

## 04 — DID and DIDComm trust model

**Question.** Explain what DID documents, key material, DIDComm and TAP establish—and what they do not.

**Required artifacts.** `corpus/docs/identity-01.metadata.json`, `corpus/docs/identity-02.metadata.json`, `corpus/repositories/identity-09.metadata.json`, `corpus/repositories/identity-17.metadata.json`, and `ai/trust-boundaries.json`.

**Method and output.**
1. Enumerate identifiers, verification methods, service endpoints and key purposes visible in evidence.
2. Trace resolver, sender, receiver and intermediary trust assumptions.
3. Separate message confidentiality/authentication from counterparty legal identity and regulatory status.
4. Compare documented DIDDoc examples with any captured artifact; describe documentation/live drift explicitly and use `OPENAPI != LIVE ARTIFACT` only for a comparison that actually includes OpenAPI. Never relabel a documentation example as OpenAPI merely to fit a contradiction category.
5. Produce threat assumptions and unresolved rotation, revocation, caching and endpoint-authentication questions.

## 05 — PII and encryption model

**Question.** Compare managed encryption, customer-managed encryption and PII SDK responsibilities.

**Required artifacts.** `corpus/docs/api-pii-encryption.metadata.json`, `corpus/docs/api-self-encryption.metadata.json`, `corpus/docs/identity-06.metadata.json`, `corpus/repositories/identity-19.metadata.json`, and `evidence/fields.json`.

**Method and output.**
1. Trace plaintext, ciphertext, keys, storage and recipients for each documented mode.
2. Identify which statements describe cryptography versus storage policy or transport.
3. Map each PII field's supplier and receiver while preserving conditional requirements.
4. Inspect the permissively licensed SDK only where a cited source path supports implementation claims.
5. Return data-flow diagrams, trust boundaries and unknowns. Never claim production encryption was exercised by this research.

## 06 — SafeConnect and onboarding reconstruction

**Question.** Reconstruct component, backend and token responsibilities in documented onboarding paths.

**Required artifacts.** `corpus/docs/flow-s15.metadata.json`, `corpus/docs/flow-s19.metadata.json`, `corpus/docs/flow-s20.metadata.json`, `corpus/docs/identity-04.metadata.json`, and `corpus/docs/identity-15.metadata.json`.

**Method and output.**
1. Identify browser, institution backend and Notabene calls for each integration choice.
2. Separate customer tokens, institution credentials and delegate tokens.
3. Locate where counterparty selection, relationship confirmation and customer data collection occur.
4. Treat examples as examples, not exhaustive product contracts.
5. Return a sequence model with input, output, controller, trust boundary, public/proprietary designation and source at each step.

## 07 — Jurisdiction engine

**Question.** Determine what public evidence establishes about jurisdiction artifacts and selector behavior.

**Required artifacts.** `evidence/jurisdictions.json`, `corpus/docs/jur-04.metadata.json`, `corpus/docs/jur-11.metadata.json`, `corpus/docs/jur-12.metadata.json`, `corpus/legal/jur-19.metadata.json`, and `corpus/legal/jur-17.metadata.json`.

**Method and output.**
1. Compare legal requirements and vendor presentation definitions as independent layers.
2. Record threshold currency, comparator, direction, counterparty scope and effective date.
3. Investigate index variants and missing-country behavior without treating FA-1000's existence as a universal fallback.
4. Keep Japan below definitive legal verification because fetched primary Japanese law is absent.
5. Deliver anomaly cases and selector questions; mark law/vendor mismatches `VENDOR RULE != CURRENT LAW`.

## 08 — TAP protocol

**Question.** Explain TAP message, agent and authorization semantics and the boundary between open protocol and product implementation.

**Required artifacts.** `corpus/repositories/identity-09.metadata.json`, `corpus/repositories/identity-10.metadata.json`, `corpus/repositories/identity-11.metadata.json`, `corpus/repositories/identity-12.metadata.json`, `corpus/repositories/identity-13.metadata.json`, and `corpus/repositories/identity-20.metadata.json`.

**Method and output.**
1. Inventory message types, roles, authorization concepts and schema references.
2. Distinguish protocol requirements from Notabene documentation and product behavior.
3. Treat a missing public TAP Parser search result as scoped negative evidence, never proof of nonexistence.
4. Identify parser/validator trust boundaries and extension points.
5. Return a protocol sequence, conformance checklist and unknown implementation details, with a citation per message or role.

## 09 — Flow and stablecoin payments

**Question.** Model Flow pay-in/pay-out orchestration while keeping external settlement explicit.

**Required artifacts.** `corpus/docs/flow-s02.metadata.json`, `corpus/docs/flow-s03.metadata.json`, `corpus/docs/flow-s04.metadata.json`, `corpus/docs/flow-s05.metadata.json`, `corpus/docs/flow-s06.metadata.json`, and `evidence/endpoints.json`.

**Method and output.**
1. Identify PIA, PRA and infrastructure-provider actions in the quickstarts.
2. Cross-check every named API operation against the captured endpoint inventory.
3. Separate tutorial events from documented webhook contracts.
4. Trace authorization, external rail execution and settlement evidence; do not assign asset custody to Notabene.
5. Return a state/sequence table and clearly labeled hypotheses about stablecoin and fiat provider integration.

## 10 — V1 to V2 migration

**Question.** Create an evidence-based migration guide, not a superficial endpoint rename list.

**Required artifacts.** `corpus/openapi/api-v1-openapi.metadata.json`, `corpus/openapi/api-v2-openapi.metadata.json`, `evidence/endpoints.json`, `evidence/fields.json`, and `corpus/docs/flow-s21.metadata.json`.

**Method and output.**
1. Compare authentication, identifiers, operation families, payload structures, field types and response states.
2. Verify V1 base-unit amount typing directly from the captured schema.
3. Identify address-book/relationship and transaction-history migration gaps.
4. Separate changelog statements from schema-observed differences.
5. Deliver breaking changes, compatibility unknowns, test cases and rollback questions. Label all generation contradictions `V1 != V2`.

## 11 — Security boundary review

**Question.** Threat-model the public architecture without claiming a penetration test.

**Required artifacts.** `ai/architecture.json`, `ai/trust-boundaries.json`, `corpus/docs/identity-03.metadata.json`, `corpus/docs/identity-14.metadata.json`, `corpus/docs/api-webhook-flow.metadata.json`, and `corpus/repositories/javascript-sdk/LICENSE.md`.

**Method and output.**
1. Enumerate assets, actors, entry points, secrets and trust transitions.
2. Analyze token scope, webhook replay/signature handling, DID key rotation, PII modes and SDK consumer responsibilities.
3. Distinguish documented controls from recommended controls and unknown deployment safeguards.
4. Exclude claims about inaccessible production infrastructure.
5. Return prioritized threats, evidence-backed controls, validation tests and owner assignments; state that source review is not runtime assurance.

## 12 — Proprietary moat versus open standards

**Question.** Separate open standards and permissively licensed implementation assets from documented proprietary product capabilities.

**Required artifacts.** `ai/product-boundaries.json`, `corpus/repositories/javascript-sdk/LICENSE.md`, `corpus/repositories/identity-09.metadata.json`, `corpus/repositories/identity-20.metadata.json`, `corpus/docs/flow-s23.metadata.json`, and `corpus/docs/jur-04.metadata.json`.

**Method and output.**
1. Classify IVMS101, DID/DIDComm, TAP, SDK code, APIs, directory, jurisdiction content, orchestration and integrations.
2. Cite an explicit license before calling code open source; public documentation alone is insufficient.
3. Distinguish interoperability benefit from network effects and operational/product claims.
4. Mark inferred differentiation as `INFERRED`, not verified fact.
5. Return a capability matrix with substitutability, data/network dependency, standards dependency, evidence strength and diligence questions.