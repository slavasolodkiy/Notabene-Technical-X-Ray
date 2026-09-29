# API findings

**Research date:** 2026-09-24  
**Scope:** Transact V2 versus SafeTransact V1 endpoints, schemas, webhooks, PII/encryption context, and outgoing/incoming states.

## Key Facts

1. **VERIFIED — Raw API specifications are publicly retrievable.** The V2 reference page HTML exposes a raw OpenAPI 3.1 URL at `https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json`. The V1 OpenAPI 3.0 document is embedded in the public Redoc state at `https://doc.notabene.id/`; it was extracted without credentials. Raw copies are archived as `api-09-v2-openapi.json` and `api-10-v1-openapi.json`.

2. **VERIFIED — Endpoint inventory:** script extraction produced 157 operations in `data/endpoints.json`: **all 105 V2 operations** and **52 scoped V1 operations**. V2 comprises 82 current operations plus 23 explicitly deprecated aliases and now includes Flow, customer, delegate-token, and every other operation in the archived specification. V1 includes 21 transaction-tagged operations plus supporting Trust Framework, customer, address book, rules, settings, and jurisdiction operations selected by documented path families.

3. **VERIFIED — V2 create is `POST /entities/{entityDID}/tx`.** It requires originator, beneficiary, asset, decimal-string amount, at least one agent, and client `ref`. Optional creation fields include settlement ID, custom transaction value, and memo tag.

4. **VERIFIED — V1 create is `POST /tx/create`.** Its `transactionAmount` is an integer string in base units. V2 `amount` accepts a decimal asset-unit string. Migrators must not carry V1 base-unit semantics into V2 unchanged.

5. **VERIFIED — V2 uses an agent graph.** `@id` identifies the agent, `for` says whom it represents, and role is one of VASP, Custodian, SettlementAddress, SourceAddress, Gateway, or Unknown in the OpenAPI. The guide shows delegated chains connecting wallet addresses, custodians, VASPs, and customers.

6. **VERIFIED — PII is a separate V2 workflow.** `append` requires IVMS101, validates it against the transfer presentation definition where applicable, and encrypts before storage. `presentation` sends PII to a policy/counterparty and may skip validation. Notabene-managed and customer-managed encryption have materially different storage/forwarding descriptions.

7. **VERIFIED — Structural required fields are not the jurisdiction rule.** Public presentation definitions impose jurisdiction- and threshold-specific paths and can express alternatives. `data/fields.json` therefore distinguishes OpenAPI `REQUIRED` from `OPTIONAL_OR_CONDITIONAL`.

8. **VERIFIED — Extracted significant field audit:** `data/fields.json` contains 3,905 field-path records: 1,157 V2 and 2,748 V1. The V2 set includes 534 Flow/delegate fields from 42 request or successful-response schema surfaces across 31 operations. It preserves references, branch context, enums, patterns, array bounds, required flags, and PII/encryption annotations. Repeated referenced fields under distinct roots are retained for auditability.

9. **VERIFIED — V2 has four status domains:** transfer, agent, relationship, and TAP policy. The transfer OpenAPI enum has 16 values; the guide gives transition details for 14 of them but not `AWAITING-YOURS` or `AWAITING-COUNTERPARTY`.

10. **VERIFIED — Twelve webhook names are evidenced in the event guide**, including five notification events and seven TAP events when the partially-satisfied presentation event shown later on the same page is included. `data/webhooks.json` records exact payload keys from examples. Svix signs and retries deliveries.

11. **VERIFIED — PII fields found:** natural-person structured names, addresses, national ID, customer ID, date/place of birth, residence country; legal-person structured names, addresses, customer ID, national ID, registration country; person/container account numbers. **UNKNOWN:** website, email, and phone do not occur in the scoped IVMS OpenAPI schemas.

12. **VERIFIED — Settlement uses `settlementId`.** The create description says CAIP-220 transaction identifiers are accepted and raw hashes may be normalized when asset context exists. Settle additionally allows an index or revert settlement ID.

## Notable Claims Requiring Cross-Reference

### Singular versus plural paths

**VERIFIED conflict.** Current V2 OpenAPI consistently uses `/entities/{entityDID}/tx...` for current transfer actions. Guides and webhook examples sometimes use `/entity/.../tx...`; relationship examples alternate `/entity/.../relationship` and `/entities/.../relationships`. The V2 OpenAPI also has:

- Deprecated plural-resource aliases under `/entities/{entityDID}/transfers...`.
- A current PII presentation operation under `/entities/{entityDID}/transfers/{transferId}/policies/{policyId}/presentation`.

Conclusion: use the exact path attached to the selected OpenAPI operation; treat callback URLs as opaque server-provided values. Do not “correct” a callback by string construction.

### Status-set mismatch

**VERIFIED conflict.** The V2 OpenAPI enum includes `AWAITING-YOURS` and `AWAITING-COUNTERPARTY`, but the status guide's transition table neither lists nor explains them. They are retained in data as valid enum values with transition behavior **UNKNOWN**.

### Event catalog count

**VERIFIED conflict/staleness.** The event summary table lists 11 names, while the detailed page also documents `tap.requirePresentationPartiallySatisfied`, making 12 evidenced names. The detailed example is retained rather than silently discarded.

### Encryption wording and path currency

**VERIFIED conflict.** Encryption guides updated in January 2026 use singular `/entity` paths and some older `/presentation` path variants, while OpenAPI retrieved on the research date uses plural `/entities` and a policy-scoped `/transfers/.../presentation` operation. Encryption behavior is used as evidence for context; operation paths come from OpenAPI.

### V1 “downloadable” specification

**VERIFIED/INFERRED.** The Getting Started page directs readers to `doc.notabene.id` for all V1 endpoints/OpenAPI. The document is embedded in the public page rather than linked as an obvious standalone JSON download. Extracting `__redoc_state.spec.data` is a mechanical public-source extraction, not an authenticated endpoint call.

## Source Quality Assessment

- **Tier 1 — Raw V2 OpenAPI:** strongest source for exact current paths, operation IDs, required arrays, schemas, enums, and deprecation flags. It is generated/current enough to include operations absent from individual index pages, but its `info.version` is generic `1.0.0`; retrieval date is recorded.
- **Tier 1 — Public V1 Redoc/OpenAPI:** strongest source for V1 path and schema details. The public reference page metadata and API naming show legacy terminology. It should not be used to infer V2 behavior.
- **Tier 1 — Individual API-reference OpenAPI blocks:** useful corroboration and human-readable operation descriptions; may lag the complete raw V2 document.
- **Tier 1 — Status and webhook guides:** authoritative for described transitions and event semantics, but internally incomplete/conflicting as noted.
- **Tier 1 — PII/encryption guides:** useful for storage/forwarding behavior and validation conditions; path examples are stale against current OpenAPI.
- **Tier 2 — Search snippets:** retained only as discovery evidence and not used alone for technical claims.

## Gaps & Unanswered Questions

1. **UNKNOWN — `AWAITING-YOURS` and `AWAITING-COUNTERPARTY` transitions.** Nearest evidence is the raw V2 `TransferStatus` enum and the status guide, which omits their transition rows.
2. **UNKNOWN — Complete production event ordering and delivery guarantees.** The webhook guide establishes Svix signatures and exponential-backoff retry, but not ordering, deduplication windows, or exactly-once behavior.
3. **UNKNOWN — Full key-custody and retention controls.** Public encryption guides describe managed versus end-to-end behavior but do not establish HSM use, operator access, backup retention, deletion SLAs, or all key-rotation behavior.
4. **UNKNOWN — Website/email/phone support in Travel Rule PII.** The extracted IVMS schemas omit these fields. This is absence in the scoped schemas, not proof that no other product surface collects them.
5. **UNKNOWN — Exhaustive V1 transition graph.** V1 OpenAPI gives the status enum and several endpoint effects but no complete transition matrix.
6. **UNKNOWN — Atomic behavior across transfer, agent, relationship, and policy updates.** Public schemas expose the views but not transaction isolation or consistency guarantees.
7. **UNKNOWN — Regional parity.** V2 OpenAPI advertises `api.eu1.notabene.id`; public evidence reviewed here does not prove identical endpoint/schema rollout in every region.

## Sources

- `api-v2-openapi` — raw V2 OpenAPI 3.1.
- `api-v1-openapi` — V1 OpenAPI 3.0 extracted from public Redoc.
- `api-statuses` — status definitions and next-state table.
- `api-webhook-details` — event catalog and payload examples.
- `api-webhook-flow` — Svix setup, security, headers, and retry.
- `api-transfer-payload` — agent/role/chain model.
- `api-pii-requirements` — presentation definitions and conditional requirements.
- `api-pii-encryption` — managed encryption/storage/reuse.
- `api-self-encryption` — end-to-end forwarding context.
- `api-getting-started` — product-generation references, Postman and V1 reference links.
