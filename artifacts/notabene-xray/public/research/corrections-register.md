# v2 corrections register

Snapshot: 2026-09-24. Full input audit: [audit-kimi.md](audit-kimi.md), preserved byte-for-byte. This register reconciles all 33 audit table rows, D1–D4, 29 additional findings and 19 commit-level additions (85 records). The audit is evidence to review, not an authority to accept wholesale.

Audit disposition (CONFIRMED / CORRECTED / REFUTED / UNKNOWN) is separate from claim evidence (VERIFIED / INFERRED / UNKNOWN). VERIFIED means supported public artifact, not production observation. A CONFIRMED contradiction is not a resolved runtime contract. Old claims are retained here solely as historical correction context. Claims link by stable ID in evidence/claims.json; machine-readable records include source paths, dates, reference, affected paths and rationale. Null metadata means unrecorded/not applicable, never fabricated.

## Register

### K01 — REFUTED / VERIFIED

- **Audit reference:** Kimi §2 register row 1
- **Claim:** `claim-K01`
- **OLD:** "157 API operations" \= 105 V2 \+ 52 scoped V1
- **NEW:** Full captured specifications contain 105 V2 operations / 85 paths and 126 V1 / 90 paths, total 231. Original 157 was a partial inventory; preserve historical scope rather than asserting no imaginable 52-operation subset exists. All 74 missing V1 rows now included.
- **Affected paths:** `data/endpoints.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** API Explorer, headline stats
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [2](https://doc.notabene.id/); local `research/sources/api-09-v2-openapi.json`, `research/sources/api-10-v1-openapi.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 1
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K02 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 2
- **Claim:** `claim-K02`
- **OLD:** "all 105 operations in the captured V2 specification"
- **NEW:** Exactly 105 path×method operations on 85 paths; all 105 operationIds unique
- **Affected paths:** `data/endpoints.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 2
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K03 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 3
- **Claim:** `claim-K03`
- **OLD:** "3,905 field-path records"
- **NEW:** Preserved data/fields.json contains 3,905 field-path records. Count is verified locally; field coverage remains a scoped extraction, not all fields of the newly completed endpoint inventory.
- **Affected paths:** `data/fields.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** Local report / verification artifact; local `data/fields.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 3
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K04 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 4
- **Claim:** `claim-K04`
- **OLD:** "12 webhook events"
- **NEW:** 12 distinct event types in webhook-details.md (11 in summary tables \+ `tap.requirePresentationPartiallySatisfied` in body); `flow.*` events in pay-in quickstarts sit outside the 12
- **Affected paths:** `data/webhooks.json`, `architecture/transact-state-machine.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/webhook-details.md); local `research/sources/api-03-v2-webhook-details.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 4
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K05 — REFUTED / VERIFIED

- **Audit reference:** Kimi §2 register row 5
- **Claim:** `claim-K05`
- **OLD:** "four public npm packages"
- **NEW:** Eight officially attributable scoped packages, one scoped provenance anomaly (@notabene/appkit) and two attributable unscoped legacy packages are enumerated in captured registry records. No deprecated message in checked scoped versions is not a support guarantee. Discovered/attributed/code-inspected are different counts.
- **Affected paths:** `data/sdk-inventory.json`, `evidence/packages.json`, `research/packages.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://registry.npmjs.org/-/v1/search?text=notabene&size=50); local `evidence/packages.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 5
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K06 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §2 register row 6
- **Claim:** `claim-K06`
- **OLD:** "six publicly exposed GitLab repositories"
- **NEW:** Current group roster has six projects: javascript-sdk, ndar, notabene-encryption-examples, notabene-nodejs, pii-sdk, trusthub-client. cli/react-native-sdk/ops repository URLs are not publicly accessible; private versus deleted is UNKNOWN.
- **Affected paths:** `evidence/repositories.json`, `research/repositories.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://gitlab.com/api/v4/groups/notabene%2Fopen-source/projects?include_subgroups=true&per_page=100); local `evidence/repositories.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 6
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K07 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §2 register row 7
- **Claim:** `claim-K07`
- **OLD:** "V1 uses … base-unit integer amounts"
- **NEW:** V1 `amount` is a base-unit **string** ("satoshi, wei, etc"), example `"10000000000000000"`; V2 is a decimal string with pattern `^\d+(\.\d+)?$`
- **Affected paths:** `architecture/data-model.md`, `research/TECHNICAL_REPORT.draft.md`, `data/fields.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://doc.notabene.id/), [2](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-10-v1-openapi.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 7
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K08 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 8
- **Claim:** `claim-K08`
- **OLD:** V1/V2 IVMS101 person-array field names differ
- **NEW:** `originatorPersons`→`originatorPerson` (plural→singular); additionally `nameIdentifierType`→`naturalPersonNameIdentifierType`
- **Affected paths:** `architecture/data-model.md`, `data/fields.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/embedded-components-v2-api.md); local `research/sources/sdk-05-components-v2.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 8
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K09 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 9
- **Claim:** `claim-K09`
- **OLD:** PII presentation retains a `/transfers` path
- **NEW:** Sole PII-tagged op is `POST /entities/{entityDID}/transfers/{transferId}/policies/{policyId}/presentation`; no `/tx` equivalent exists
- **Affected paths:** `data/endpoints.json`, `architecture/data-model.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 9
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K10 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §2 register row 10
- **Claim:** `claim-K10`
- **OLD:** Payout create requires "reference, currency, decimal-string amount, customer, merchant"
- **NEW:** Required field is named `ref`, not "reference"; payout `amount` is `type: string` with **no** decimal pattern; duplicate `ref` returns 409 with `existingRef`
- **Affected paths:** `architecture/flow.md`, `architecture/data-model.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 10
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K11 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 11
- **Claim:** `claim-K11`
- **OLD:** PRA quickstart vs OpenAPI conflict on pay-in `settlement_address`
- **NEW:** Quickstart: "Send only the asset field. Do not include a settlementAddress"; spec: `required: ["settlementAddress"]`, `asset` optional
- **Affected paths:** `architecture/flow.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md), [2](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/flow-03-pra.md`, `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 11
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K12 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 12
- **Claim:** `claim-K12`
- **OLD:** Token chain: 24 h institution token; 5-min customerToken; delegate JWT TTL not public
- **NEW:** `expires_in: 86400` client\_credentials grant; customerToken "valid for 5 minutes", scope `customer`; delegate token documented as JWT \+ `delegateDid` with no TTL/claims/permission matrix
- **Affected paths:** `architecture/authentication.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/reference/authentication-2.md), [2](https://devx.notabene.id/docs/customertoken.md), [3](https://devx.notabene.id/reference/createdelegatetoken.md); local `research/sources/identity-03-authentication-reference.md`, `research/sources/identity-04-customer-token.md`, `research/sources/identity-15-delegate-token.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 12
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K13 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 13
- **Claim:** `claim-K13`
- **OLD:** Managed vs customer-managed PII encryption; "cannot decrypt" scoped to E2E opt-in
- **NEW:** Managed mode: platform encrypts with entity keys, stores, re-encrypts for counterparties; E2E: "won't be stored on your entity or the Notabene platform"; escrow mode is explicitly "pseudo end-to-end" with a UI decrypt button
- **Affected paths:** `architecture/trust-model.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/encryption-by-notabene.md), [2](https://devx.notabene.id/docs/self-encryption.md), [3](https://devx.notabene.id/docs/key-management.md); local `research/sources/identity-07-self-encryption.md`, `research/sources/flow-21-encryption-managed.md`, `research/sources/identity-18-key-management.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 13
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K14 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 14
- **Claim:** `claim-K14`
- **OLD:** DIDComm profiles: authcrypt sender authentication is not a separate non-repudiable signature
- **NEW:** go-didcomm exposes 5 profiles; authcrypt (ECDH-1PU) is "Repudiable… no inner signature"; `ProfileSignedAnoncrypt` (sign-then-encrypt) is the non-repudiable default
- **Affected paths:** `architecture/trust-model.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://github.com/Notabene-id/go-didcomm); local `research/sources/identity-17-go-didcomm.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 14
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K15 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 15
- **Claim:** `claim-K15`
- **OLD:** did:web identity with Ed25519/X25519/P-256 key split
- **NEW:** Two fetched DIDDocs expose Ed25519/X25519 keys and the Norway document a P-256 JsonWebKey2020 #notabene-pii key. Both advertise QA hosts; the root URL identifies did:web:vasps.id:at. Documentation spelling differs; production profile and standards-valid root resolution are not established.
- **Affected paths:** `architecture/trust-model.md`, `architecture/system-map.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/diddocs-explained.md), [2](https://vasps.id/no/did.json); local `research/sources/v2-did-root.json`, `research/sources/v2-did-no.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 15
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K16 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 16
- **Claim:** `claim-K16`
- **OLD:** Entity DID ≠ end customer; no per-customer resolvable DIDDoc
- **NEW:** Flow customer records are entity-owned natural_person/legal_person records. No per-customer resolvable DIDDoc was evidenced; this is scoped absence, not proof customers can never use DIDs.
- **Affected paths:** `architecture/actor-map.md`, `data/entities.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/reference/getflowcustomer.md); local `research/sources/identity-16-flow-customer.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 16
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K17 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 17
- **Claim:** `claim-K17`
- **OLD:** SafeConnect JS SDK is a wrapper around connect.notabene.id
- **NEW:** Package contains only wrapper/transport/transformer/types; iframe/modal/popup/redirect/link modes; zero screen-UI source
- **Affected paths:** `architecture/onboarding.md`, `data/sdk-inventory.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk); local `research/sources/sdk-01-gitlab-javascript-sdk.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 17
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K18 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 18
- **Claim:** `claim-K18`
- **OLD:** Maintained Node SDK remains V1-shaped
- **NEW:** Node SDK public calls remain V1-shaped; maintenance-only/LEGACY is an inferred activity classification, not official EOL. V1 helper removal in JS SDK does not retire V1 API.
- **Affected paths:** `research/repositories.md`, `architecture/integrations.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/notabene-nodejs); local `research/sources/sdk-10-gitlab-nodejs.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 18
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K19 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 19
- **Claim:** `claim-K19`
- **OLD:** TAP license conflict: repo CC0-1.0 vs README CC BY-SA 4.0
- **NEW:** GitHub API license field and LICENSE file \= CC0 1.0; README badge block \= CC BY-SA 4.0; tap-ts is CC0 in both (no conflict)
- **Affected paths:** `architecture/tap.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs); local `research/sources/gap-protocol-01.md`, `research/sources/gap-protocol-03-repository-metadata.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 19
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K20 — UNKNOWN / UNKNOWN

- **Audit reference:** Kimi §2 register row 20
- **Claim:** `claim-K20`
- **OLD:** "micro-transfers require the institution to verify them"
- **NEW:** Documented micro-transfer proof remains status pending. On-chain confirmation owner is UNKNOWN; only screenshot review is explicitly assigned to a compliance officer.
- **Affected paths:** `architecture/onboarding.md`, `data/sdk-inventory.json`, `QUESTIONS_FOR_NOTABENE.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/self-hosted-wallet-verification-1.md); local `research/sources/v2-proofs.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 20
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Duty unassigned in captured documentation
- **Implementation:** RESEARCH_RECONCILED

### K21 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §2 register row 21
- **Claim:** `claim-K21`
- **OLD:** Q4 premise: a historical "TAP Parser" may equal today's tap-ts validator
- **NEW:** No distinct TAP Parser found in enumerated public organizations and registry searches. This is scoped negative evidence, not proof no private/historical parser exists. Ask which of tap-ts, tap-rs, tap-go or TAIPs schemas/test-vectors is normative.
- **Affected paths:** `architecture/tap.md`, `research/repositories.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs); local `research/repositories.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 21
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K22 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 22
- **Claim:** `claim-K22`
- **OLD:** J1: vendor GB index stale (EUR 1,000 vs current GBP 800\)
- **NEW:** Reg 64C(4) "equal to or exceeds … £800" incl. linked transfers, substituted 30.6.2026 by SI 2026/621; vendor matches the superseded "1,000 euros" text
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C), [2](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json); local `research/sources/gap-jurisdiction-01.md`, `research/sources/v2-jurisdiction-index.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 22
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K23 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 23
- **Claim:** `claim-K23`
- **OLD:** J2: all-UK execution follows a beneficiary-business request
- **NEW:** 64C(2)+(3): para (6) information provided on beneficiary request within three working days; 64C(4) applies only "Where paragraph (3) does not apply"
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C); local `research/sources/gap-jurisdiction-01.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 23
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K24 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 24
- **Claim:** `claim-K24`
- **OLD:** J3/J4: no general EU EUR 1,000 exemption; FR-0 four-way pick broader than Art 14(1)(d)
- **NEW:** Recital (30): "same requirements regardless of their amount"; Art 14(1)(d) is compound (address AND document number AND customer ID) OR (date AND place of birth); FR-0 accepts exactly one of four
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113), [2](https://pd.notabene.id/ivms101/v2/FR-0.json); local `research/sources/JUR-02-eu-regulation-2023-1113.md`, `research/sources/JUR-07-notabene-fr-0-pd.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 24
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K25 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 25
- **Claim:** `claim-K25`
- **OLD:** J5: US Travel Rule at USD 3,000; US-3000 PII subset is not the complete record
- **NEW:** 31 CFR 1010.410(f) "in the amount of $3,000 or more"; US-3000 omits amount, execution date, and both FI identifiers
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-E/section-1010.410), [2](https://pd.notabene.id/ivms101/v2/US-3000.json); local `research/sources/JUR-15-us-ecfr-1010-410.md`, `research/sources/JUR-08-notabene-us-3000-pd.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 25
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K26 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 26
- **Claim:** `claim-K26`
- **OLD:** J6: SG comparator mismatch; no legal-person path in birth alternative
- **NEW:** PSN02 ¶13.4 "below or equal to S$1,500"vs¶13.6"exceedsS$1,500"; SG-1500's `originatorDateAndPlaceOfBirth` descriptor has `"legal": []`
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://www.mas.gov.sg/-/media/amld-amendments---30-june-2025/mas-notice-psn02.pdf), [2](https://pd.notabene.id/ivms101/v2/SG-1500.json); local `research/sources/JUR-16-mas-psn02.md`, `research/sources/JUR-10-notabene-sg-1500-pd.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 26
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K27 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 27
- **Claim:** `claim-K27`
- **OLD:** J7: definitions use JSONPath constraints, all-conjunction, pick/count:1 alternatives
- **NEW:** Mechanics verified across 13 fetched definition files; `"limit_disclosure": "required"` on every descriptor
- **Affected paths:** `architecture/jurisdictions.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json); local `research/sources/v2-FA-1000.json`, `research/sources/JUR-07-notabene-fr-0-pd.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 27
- **Rationale / limit:** Existing source-backed claim retained; corroboration does not prove deployed behavior. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K28 — CORRECTED / UNKNOWN

- **Audit reference:** Kimi §2 register row 28
- **Claim:** `claim-K28`
- **OLD:** Japan jurisdiction scope left UNKNOWN
- **NEW:** JP-0 threshold zero and address OR customer-ID alternative are VERIFIED published artifacts. Vendor narrative and audit secondary corroboration support alignment as INFERRED; definitive current legal scope remains UNKNOWN because primary Japanese law was not fetched.
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/JP-0.json), [2](https://notabene.id/world/japan); local `research/sources/v2-JP-0.json`, `research/sources/v2-japan-vendor.html`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 28
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Artifact VERIFIED; broader legal/runtime conclusion UNKNOWN
- **Implementation:** RESEARCH_RECONCILED

### K29 — CORRECTED / UNKNOWN

- **Audit reference:** Kimi §2 register row 29
- **Claim:** `claim-K29`
- **OLD:** FATF fallback for unlisted jurisdictions left UNKNOWN
- **NEW:** FA pseudo-jurisdiction at USD 1,000 and FA-1000 baseline plus four-way pick:1 are VERIFIED artifacts. Vendor fallback statement is documented. Universal deployed fallback, comparator, precedence and legal absence-of-local-law determination remain UNKNOWN.
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/FA-1000.json), [2](https://devx.notabene.id/docs/pii-requirements.md); local `research/sources/v2-FA-1000.json`, `research/sources/v2-jurisdiction-index.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 29
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Artifact VERIFIED; broader legal/runtime conclusion UNKNOWN
- **Implementation:** RESEARCH_RECONCILED

### K30 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 30
- **Claim:** `claim-K30`
- **OLD:** AWAITING-YOURS / AWAITING-COUNTERPARTY in enum but undocumented
- **NEW:** 16 transfer and seven agent statuses are in the spec. Four status meanings/transitions remain unresolved in captured prose, with images not OCR-verified. Agent policy RequireAuthorization example violates REQUIRE_AUTHORIZATION enum; no inferred terminal states or production behavior.
- **Affected paths:** `architecture/transact-state-machine.md`, `architecture/data-model.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [2](https://devx.notabene.id/docs/statuses-explained.md); local `research/sources/api-09-v2-openapi.json`, `research/sources/v2-statuses.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 30
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### K31 — REFUTED / VERIFIED

- **Audit reference:** Kimi §2 register row 31
- **Claim:** `claim-K31`
- **OLD:** "223 archived pages" evidence corpus
- **NEW:** Original archive claim failed as delivered according to audit. v2 manifest must distinguish raw portable files from metadata-only records, preserve URLs/checksums/licensing decisions and never imply every raw page is redistributed. Final served-artifact verification belongs to integration checks.
- **Affected paths:** `evidence/source-manifest.json`, `corpus/`, `research/verification.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** Local report / verification artifact; local `research/audit-kimi.md`, `evidence/source-manifest.json`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 31
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** CONTENT_FIXED_FINAL_DELIVERY_CHECK_REQUIRED

### K32 — CONFIRMED / VERIFIED

- **Audit reference:** Kimi §2 register row 32
- **Claim:** `claim-K32`
- **OLD:** 16-section X-Ray app coverage
- **NEW:** Distinct system runtime/trust-boundary and actor authority maps now authored. Existing product/ER documents retained. Route mapping, source archive, verification download and UI acceptance must be checked against final built assets.
- **Affected paths:** `architecture/system-map.md`, `architecture/actor-map.md`, `research/verification.md`
- **Affected display:** System Map, Actor Map
- **Evidence:** Local report / verification artifact; local `research/audit-kimi.md`, `architecture/system-map.md`, `architecture/actor-map.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 32
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** CONTENT_FIXED_FINAL_DELIVERY_CHECK_REQUIRED

### K33 — REFUTED / VERIFIED

- **Audit reference:** Kimi §2 register row 33
- **Claim:** `claim-K33`
- **OLD:** Method note: "this draft deliberately omits operation and field-path totals"
- **NEW:** Method now reports exact captured operation counts and scoped field count consistently; removed obsolete omissions language. Historical/audit descriptions remain explicitly historical.
- **Affected paths:** `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked sections and downloads
- **Evidence:** [1](https://replit.com/@identityglobal/Notabene-Technical-X-Ray); local `research/TECHNICAL_REPORT.draft.md`
- **Source date:** 2026-09-24; **reference:** research/audit-kimi.md §2 row 33
- **Rationale / limit:** Reconciled audit against preserved captures; scoped evidence and unknowns retained. Published artifact / documented contract, not authenticated production observation
- **Implementation:** RESEARCH_RECONCILED

### D1 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §1.2.4 D1
- **Claim:** `claim-D1`
- **OLD:** Method omitted totals despite advertising totals
- **NEW:** Method consistently states 231 full operations and scoped 3,905 fields. Historical omissions language removed.
- **Affected paths:** `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** D1
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### D2 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §1.2.4 D2
- **Claim:** `claim-D2`
- **OLD:** Duplicated [3] [3] citation in generated v1 report
- **NEW:** Draft uses source IDs; adjacent identical citations removed/avoided. Generated final report must be checked after merge.
- **Affected paths:** `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** Local report / verification artifact; local `research/TECHNICAL_REPORT.draft.md`
- **Source date:** 2026-09-24; **reference:** D2
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### D3 — CORRECTED / VERIFIED

- **Audit reference:** Kimi §1.2.4 D3
- **Claim:** `claim-D3`
- **OLD:** GitLab/npm listings labeled Tier 1 under law-only taxonomy
- **NEW:** Registry and source artifacts are primary for code/publication facts, not primary law. Source_type plus claim-specific evidence scope separates these roles; numeric tier alone must not imply legal authority.
- **Affected paths:** `research/TECHNICAL_REPORT.draft.md`, `evidence/source-manifest.json`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://registry.npmjs.org/-/v1/search?text=notabene&size=50); local `evidence/packages.json`
- **Source date:** 2026-09-24; **reference:** D3
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### D4 — CONFIRMED / UNKNOWN

- **Audit reference:** Kimi §1.2.4 D4
- **Claim:** `claim-D4`
- **OLD:** Partial link/diagram checks easy to read as full validation
- **NEW:** Historical check: 18/20 HTTP 200, one 202, one anti-bot; seven parsed diagrams and twelve inspected after DOMPurify limitation. These do not validate v2; final build/browser evidence must record fresh results separately.
- **Affected paths:** `research/unresolved.md`, `research/verification.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** Local report / verification artifact; local `research/verification.md`
- **Source date:** 2026-09-24; **reference:** D4
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A01 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A01`
- **OLD:** Only half the transfer-state documentation gap highlighted
- **NEW:** REPLACED and UNREACHABLE are enumerated but transition-undocumented in captured status prose. Do not infer terminality.
- **Affected paths:** `architecture/transact-state-machine.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [2](https://devx.notabene.id/docs/statuses-explained.md); local `research/sources/api-09-v2-openapi.json`, `research/sources/v2-statuses.md`
- **Source date:** 2026-09-24; **reference:** A01
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A02 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A02`
- **OLD:** Agent example treated as valid schema example
- **NEW:** RequireAuthorization example conflicts with REQUIRE_AUTHORIZATION enum; deployed acceptance unknown.
- **Affected paths:** `architecture/data-model.md`, `architecture/transact-state-machine.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** A02
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A03 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A03`
- **OLD:** Only GB index staleness enumerated
- **NEW:** 76 entries / 72 keys; XX_old remains inForce at EUR 1,000 and points to Hong Kong, alongside 27 zero-threshold EU member entries.
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-index-audit.json`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json); local `research/sources/v2-jurisdiction-index.json`
- **Source date:** 2026-09-24; **reference:** A03
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A04 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A04`
- **OLD:** Index treated as unique jurisdiction inventory
- **NEW:** BR ×3, LI_old ×2, IS_old ×2; count entries separately from distinct keys.
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-index-audit.json`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json); local `research/sources/v2-jurisdiction-index.json`
- **Source date:** 2026-09-24; **reference:** A04
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A05 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A05`
- **OLD:** US-3000 treated as sole US variant
- **NEW:** US1-3000, US2-0, US0-0 are published with different field sets; authoritative product variant and below-threshold selector unknown.
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-matrix.json`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json), [2](https://pd.notabene.id/ivms101/v2/US1-3000.json); local `research/sources/v2-jurisdiction-index.json`, `research/sources/v2-US1-3000.json`, `research/sources/v2-US2-0.json`, `research/sources/v2-US0-0.json`
- **Source date:** 2026-09-24; **reference:** A05
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A06 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A06`
- **OLD:** Near-threshold strings imply known comparator semantics
- **NEW:** ID/GI near-1,000 strings and absent comparator fields are verified. Workaround intent is inference; do not round or derive comparator from filename.
- **Affected paths:** `architecture/jurisdictions.md`, `data/jurisdiction-index-audit.json`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json); local `research/sources/v2-jurisdiction-index.json`
- **Source date:** 2026-09-24; **reference:** A06
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A07 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A07`
- **OLD:** Documented PII key spelling generalized to live documents
- **NEW:** Live P-256 JsonWebKey2020 #notabene-pii differs from EcdsaSecp256r1VerificationKey2019 #pii docs. Selection and migration contract unknown.
- **Affected paths:** `architecture/trust-model.md`, `architecture/actor-map.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://vasps.id/no/did.json), [2](https://devx.notabene.id/docs/key-management-in-diddocs.md); local `research/sources/v2-did-no.json`, `research/sources/identity-02-diddoc-keys.md`
- **Source date:** 2026-09-24; **reference:** A07
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A08 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A08`
- **OLD:** Two live DIDDocs establish production topology
- **NEW:** Both captured service hosts are QA. Root URL returns did:web:vasps.id:at, not proof of root-DID resolution validity. No DIDComm service calls made.
- **Affected paths:** `architecture/system-map.md`, `architecture/trust-model.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://vasps.id/.well-known/did.json), [2](https://vasps.id/no/did.json); local `research/sources/v2-did-root.json`, `research/sources/v2-did-no.json`
- **Source date:** 2026-09-24; **reference:** A08
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A09 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A09`
- **OLD:** 12 webhooks read as exhaustive Flow catalog
- **NEW:** 12 main-guide events plus six quickstart-only Flow names; no top-level OpenAPI webhook schemas and no production delivery verified.
- **Affected paths:** `data/webhooks.json`, `architecture/flow.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/webhook-details.md), [2](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md); local `research/sources/api-03-v2-webhook-details.md`, `research/sources/flow-02-pia.md`, `research/sources/flow-03-pra.md`, `research/sources/flow-04-ip.md`
- **Source date:** 2026-09-24; **reference:** A09
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A10 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A10`
- **OLD:** Callback examples assumed to match path templates
- **NEW:** Singular/plural callback examples conflict; API uses plural except baseline-security. Treat received callbacks as opaque and validate destination, not reconstructed path templates.
- **Affected paths:** `architecture/transact-state-machine.md`, `architecture/data-model.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [2](https://devx.notabene.id/docs/webhook-details.md); local `research/sources/api-09-v2-openapi.json`, `research/sources/api-03-v2-webhook-details.md`
- **Source date:** 2026-09-24; **reference:** A10
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A11 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A11`
- **OLD:** Payout and pay-in required sets implicitly symmetric
- **NEW:** Pay-in additionally requires supportedAssets/fallbackSettlementAddresses. Payout authorization requires authorizationUrl with optional expires documented default one hour.
- **Affected paths:** `architecture/flow.md`, `architecture/data-model.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** A11
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A12 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A12`
- **OLD:** V1 migration surface incomplete
- **NEW:** 126 full V1 operations include 56 integration paths; address-book/rules/integrations/webhook-registration lack like-for-like public V2 contracts. Related Relationships/discover are not proven substitutes.
- **Affected paths:** `data/endpoints.json`, `architecture/integrations.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://doc.notabene.id/), [2](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-10-v1-openapi.json`, `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** A12
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A13 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A13`
- **OLD:** V2 other operation groups not enumerated
- **NEW:** Inventory covers Relationships 8, Members 7, Flow Internal 5, Network 4, Transfer Checks 2, delegateToken, public-keys, discovery, audit-log and transfer helpers. Tags double-count PII; total remains 105.
- **Affected paths:** `data/endpoints.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** A13
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A14 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A14`
- **OLD:** Bank A / Alice / Exchange B / Bob absent from report narrative
- **NEW:** Actor Map supplies worked role/authority walk and report links it; customer reference, DID, representation and custody authority separated.
- **Affected paths:** `architecture/actor-map.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://devx.notabene.id/docs/transfer-payload-structure.md); local `research/sources/api-05-v2-payload.md`
- **Source date:** 2026-09-24; **reference:** A14
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A15 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A15`
- **OLD:** Status enums and diagram prose conflated
- **NEW:** TAP policy COMPLETED and check COMPLETE concern distinct status domains. Guide images were not OCR-verified; absence finding is scoped to captured prose.
- **Affected paths:** `architecture/transact-state-machine.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [2](https://devx.notabene.id/docs/statuses-explained.md); local `research/sources/api-09-v2-openapi.json`, `research/sources/v2-statuses.md`
- **Source date:** 2026-09-24; **reference:** A15
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A16 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A16`
- **OLD:** All token placement answered by SDK parameter
- **NEW:** V2 transformer delegateToken parameter narrows code path only; TTL, claims, audience, scopes, CORS, revocation and safe placement unknown.
- **Affected paths:** `architecture/authentication.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk); local `research/sources/sdk-01-gitlab-javascript-sdk.md`
- **Source date:** 2026-09-24; **reference:** A16
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A17 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A17`
- **OLD:** E2E label treated as a universal encryption mode
- **NEW:** Managed, customer E2E, escrow/HYBRID and legacy did:key-to-Web-DID generations are distinct. Library default and source capability do not establish deployed profiles.
- **Affected paths:** `architecture/trust-model.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/Notabene-id/go-didcomm), [2](https://devx.notabene.id/docs/key-management.md); local `research/sources/identity-17-go-didcomm.md`, `research/sources/identity-18-key-management.md`
- **Source date:** 2026-09-24; **reference:** A17
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A18 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A18`
- **OLD:** GitHub peripheral or mirror-only
- **NEW:** Notabene-id has nine public repos, six archived; go-didcomm is a GitHub primary. Unrelated notabene account and unverifiable organizations are not attribution evidence.
- **Affected paths:** `research/repositories.md`, `evidence/repositories.json`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://api.github.com/orgs/Notabene-id/repos?per_page=100); local `evidence/repositories.json`
- **Source date:** 2026-09-24; **reference:** A18
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A19 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A19`
- **OLD:** Unavailable repo URLs imply deleted official source
- **NEW:** cli/reactnative/ops URLs unavailable publicly; private vs deleted unresolved. verify-proof lacks repo metadata. appkit scope/publisher and Reown content conflict is a provenance question, not misconduct.
- **Affected paths:** `research/packages.md`, `data/sdk-inventory.json`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://registry.npmjs.org/-/v1/search?text=notabene&size=50); local `evidence/packages.json`
- **Source date:** 2026-09-24; **reference:** A19
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A20 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A20`
- **OLD:** Public activity and non-deprecation imply active support
- **NEW:** Registry flags, commit activity, default-branch change and deployment/support are distinct. Node LEGACY is inferred maintenance classification; no official API EOL date established.
- **Affected paths:** `research/repositories.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/notabene-nodejs); local `evidence/repositories.json`, `evidence/commits.json`
- **Source date:** 2026-09-24; **reference:** A20
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A21 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A21`
- **OLD:** UI filters imply uncertainty assessment on every schema field
- **NEW:** Schema VERIFIED means present in public specification, not operationally verified. Fields remain documented extraction with conditional semantics; unknowns live in claims and contract gaps, not fabricated invalid endpoint rows.
- **Affected paths:** `data/fields.json`, `evidence/claims.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local `research/sources/api-09-v2-openapi.json`
- **Source date:** 2026-09-24; **reference:** A21
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A22 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A22`
- **OLD:** Delivery minors omitted from correction tracking
- **NEW:** Final acceptance must check structured downloads, archive/verification URLs, state/data source lists, six proof selections, per-section badges, readable inline code, non-placeholder meta description and static/subpath behavior. Distinct maps and source lists authored; final UI validation owned by integration.
- **Affected paths:** `research/unresolved.md`, `architecture/data-model.md`, `architecture/transact-state-machine.md`, `architecture/system-map.md`, `architecture/actor-map.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** Local report / verification artifact; local `research/audit-kimi.md`, `research/verification.md`
- **Source date:** 2026-09-24; **reference:** A22
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A23 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A23`
- **OLD:** Audit Japan fully current / FATF executable selector conclusions accepted verbatim
- **NEW:** Japan legal completeness remains UNKNOWN without primary text; FA artifact existence does not prove universal selector. Vendor configuration must not substitute for legal watch.
- **Affected paths:** `data/jurisdiction-matrix.json`, `research/unresolved.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://notabene.id/world/japan), [2](https://pd.notabene.id/ivms101/v2/FA-1000.json); local `research/sources/v2-JP-0.json`, `research/sources/v2-FA-1000.json`
- **Source date:** 2026-09-24; **reference:** A23
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A24 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A24`
- **OLD:** Audit xpub and TAIP-19 dates / TAIP-20 creation treated as authoritative
- **NEW:** Captured committed date for xpub removal and initial TAIP-19 is 2025-11-28; TAIP-20 cited diff establishes memo evolution, not initial creation. Full hashes supersede audit abbreviations.
- **Affected paths:** `research/chronology.md`, `research/code-archaeology.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs/commit/65b1cf2d), [2](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/e32555ea); local `evidence/commits.json`
- **Source date:** 2026-09-24; **reference:** A24
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A25 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A25`
- **OLD:** Commit message 14x boost or source change proves production behavior
- **NEW:** Public crypto changes are verified; 14x performance remains unbenchmarked UNKNOWN, recovery intent INFERRED, production deployment UNKNOWN.
- **Affected paths:** `research/code-archaeology.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/pii-sdk/-/commit/42a4efc0); local `evidence/commits.json`
- **Source date:** 2026-09-24; **reference:** A25
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A26 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A26`
- **OLD:** No public TAP Parser / missing historical repos proves nonexistence
- **NEW:** Negative findings scoped to current public searches. Normative conformance artifact, private history and TAP governance/license remain questions; do not rely on organization verification flag alone as cryptographic ownership proof.
- **Affected paths:** `architecture/tap.md`, `research/repositories.md`, `QUESTIONS_FOR_NOTABENE.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs); local `research/repositories.md`
- **Source date:** 2026-09-24; **reference:** A26
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A27 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A27`
- **OLD:** EU presentation success equated to legal compliance
- **NEW:** Vendor accepts a broader set of payloads: legally sufficient payloads may satisfy vendor structure, but vendor-pass does not imply legal compliance. Audit sentence calling vendor-pass a proper subset of legally compliant reverses this relation and is not adopted.
- **Affected paths:** `architecture/jurisdictions.md`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113), [2](https://pd.notabene.id/ivms101/v2/FR-0.json); local `research/sources/JUR-02-eu-regulation-2023-1113.md`, `research/sources/JUR-07-notabene-fr-0-pd.md`
- **Source date:** 2026-09-24; **reference:** A27
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### A28 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-A28`
- **OLD:** Audit illustrative GBP850 exchange rate proves selector breach
- **NEW:** No current market rate or actual selector call was made. GB legal/vendor trigger mismatch is evidenced; any monetary worked example must use explicit synthetic valuation, not assert plausible 2026 FX as fact.
- **Affected paths:** `data/jurisdiction-matrix.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json), [2](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C); local `research/sources/v2-jurisdiction-index.json`, `research/sources/gap-jurisdiction-01.md`
- **Source date:** 2026-09-24; **reference:** A28
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-secure-channel-918a87ff — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-secure-channel-918a87ff`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public four-file diff changes the iframe/message-channel handshake and associated types, demo and README. INFERRED: channel initiation moved toward the hosted frame, changing the host/iframe transport boundary; this does not prove cryptographic confidentiality of application payloads.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/918a87ffea1b39aa867ae755c6622c80ac937f27); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-918a87ff-diff.json`
- **Source date:** 2026-09-24; event date 2024-07-17; **reference:** src/notabene.ts; src/types.ts; README.md; public/index.html
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-v1-removal-5b0a15d — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-v1-removal-5b0a15d`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public commit diff deletes the V1 transformer export, implementation, mapper helpers, V1 types, tests/references, and README instructions. INFERRED: the active browser SDK is narrowing around V2 request transformation; this is not an API-wide V1 deprecation notice.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/5b0a15ddc8006bb6a9f67a02df008d966f9068a4); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-5b0a15d-diff.json`
- **Source date:** 2026-09-24; event date 2026-06-30; **reference:** src/responseTransformer/
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-account-number-2ceb201 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-account-number-2ceb201`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The diff maps withdrawal beneficiary accountNumber from transaction.destination and deposit originator accountNumber from transaction.source, replacing config IDs that could fall back to generated URNs. INFERRED: the fix closes leakage between internal component identifiers and the regulatory account/address field; historical pre-fix transformed payloads may require review.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/2ceb2018a8c28e71f5ad1e8622582d3f2969ccf2); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-2ceb201-diff.json`
- **Source date:** 2026-09-24; event date 2026-06-30; **reference:** src/responseTransformer/mappers.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-ivms-eed7a64 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-ivms-eed7a64`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The three-line type diff removes customerIdentification from PersonV2 and adds it to NaturalPersonV2; the commit title states this aligns with IVMS validation. INFERRED: V2 client types were corrected to track person-kind validation rather than a generic person container.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/eed7a64202a8cc6a88baa531e5335625b08848ae); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-eed7a64-diff.json`
- **Source date:** 2026-09-24; event date 2026-04-13; **reference:** src/ivms/v2Types.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-proof-xpub-e32555e — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-proof-xpub-e32555e`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public diff removes the xpub property from src/types.ts. INFERRED: the public proof model narrowed away from extended-public-key evidence; the diff alone does not establish server rejection or migration policy.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/e32555ea9ffe42274db4d8badf8696fc38b38413); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-e32555e-diff.json`
- **Source date:** 2026-09-24; event date 2025-11-28; **reference:** src/types.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-counterparty-webhook-f448d87 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-counterparty-webhook-f448d87`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public diff adds webhookUrl typing and passes it into connection metadata. INFERRED: assisted handoffs gained asynchronous callback correlation; no delivery or security guarantee follows from this type addition.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/f448d8794b30dea1f0515e241f82d64d7429ee38); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-f448d87-diff.json`
- **Source date:** 2026-09-24; event date 2026-07-09; **reference:** src/types.ts; src/utils/connections.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-counterparty-decrypt-b573f47 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-counterparty-decrypt-b573f47`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public diff exports the helper and adds tests/API documentation. INFERRED: decryption of returned assisted-handoff payloads became an explicit integrator responsibility.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/b573f473db84a88e42c496d4aec92d9a72f7e0e1); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-b573f47-diff.json`
- **Source date:** 2026-09-24; event date 2026-07-09; **reference:** src/utils/connections.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-js-counterparty-correlation-1603b8c — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-js-counterparty-correlation-1603b8c`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public diff adds connectionId to RefreshSource and generated API documentation. INFERRED: webhook results can be joined to a stored connection record; operational retry semantics remain UNKNOWN.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/1603b8c4a26f795d17e21c53cef8ace9b3adab83); local `research/corpus/v2-archaeology/diffs/gitlab-javascript-sdk-1603b8c-diff.json`
- **Source date:** 2026-09-24; event date 2026-07-10; **reference:** src/types.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-pii-ecdh1pu-42a4efc — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-pii-ecdh1pu-42a4efc`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The nine-file public diff adds provider selection, a sodium provider, ECDH-1PU encryption/decryption paths, and tests. The commit message claims a 14x performance boost. INFERRED: provider abstraction supports cryptographic migration. The 14x number is an author claim in commit metadata, not an independently reproduced benchmark.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/pii-sdk/-/commit/42a4efc0cd9bd8d29873e3f4db2269e523321c18); local `research/corpus/v2-archaeology/diffs/gitlab-pii-sdk-42a4efc-diff.json`
- **Source date:** 2026-09-24; event date 2025-10-15; **reference:** src/cryptography/providers/sodium-provider.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-pii-hybrid-3ea4e3a — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-pii-hybrid-3ea4e3a`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public diff changes src/index.ts, built output, and adds a hybrid-mode integration test exercising two escrow recipients. INFERRED: HYBRID is an escrow interoperability/recovery path. The diff does not establish production key custody, retention, or plaintext-access policy.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://gitlab.com/notabene/open-source/pii-sdk/-/commit/3ea4e3a30efe11331744665dad7cd11c8c435192); local `research/corpus/v2-archaeology/diffs/gitlab-pii-sdk-3ea4e3a-diff.json`
- **Source date:** 2026-09-24; event date 2025-11-20; **reference:** src/index.ts
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-taip17-lock-f8207e3e — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-taip17-lock-f8207e3e`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** GitHub's public commit object and file patches show the Escrow-to-Lock vocabulary change. INFERRED: Lock is a more general protocol primitive than the use-case-specific Escrow name.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs/commit/f8207e3e4004d7ab8780120e9cfc4ed6b18325c4); local `research/corpus/v2-archaeology/commits/github-TransactionAuthorizationProtocol-TAIPs-f8207e3e.json`
- **Source date:** 2026-09-24; event date 2026-05-01; **reference:** TAIP-17.md and schemas
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-taip18-rfq-e1a351b1 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-taip18-rfq-e1a351b1`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** GitHub's public commit object and patches show the Exchange-to-RFQ vocabulary change. INFERRED: RFQ separates the request primitive from a particular exchange execution model.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs/commit/e1a351b1be4b0289eedcad5857b787d9ab1efbdf); local `research/corpus/v2-archaeology/commits/github-TransactionAuthorizationProtocol-TAIPs-e1a351b1.json`
- **Source date:** 2026-09-24; event date 2026-05-01; **reference:** TAIP-18.md and schemas
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-taip19-iso20022-65b1cf2d — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-taip19-iso20022-65b1cf2d`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit adds TAIP-19 material; its committed date is 2025-11-28, not the audit table's 2025-11-25. INFERRED: TAP is being mapped toward conventional payment-message interoperability; this does not prove deployed ISO 20022 integration.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs/commit/65b1cf2d391dca911bfd5dfde872b08ffbc14ef9); local `research/corpus/v2-archaeology/commits/github-TransactionAuthorizationProtocol-TAIPs-65b1cf2d.json`
- **Source date:** 2026-09-24; event date 2025-11-28; **reference:** TAIP-19.md
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-taip20-memo-ed644e3d — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-taip20-memo-ed644e3d`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit modifies TAIP-20's blockchain-memo references. It is evidence of TAIP-20 evolution, not evidence that this commit initially created TAIP-20. INFERRED: TAIP-20 was being hardened against chain-specific memo/reference conventions.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs/commit/ed644e3d808f075145333d6349a5543072cb1506); local `research/corpus/v2-archaeology/commits/github-TransactionAuthorizationProtocol-TAIPs-ed644e3d.json`
- **Source date:** 2026-09-24; event date 2026-03-17; **reference:** TAIP-20.md
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-tap-ts-extraction-d9ef6185 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-tap-ts-extraction-d9ef6185`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit removes TypeScript package content from TAIPs and points readers to the separate tap-ts repository. INFERRED: normative prose/schemas and language bindings acquired separate release lifecycles, increasing the need to pin both.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/TransactionAuthorizationProtocol/TAIPs/commit/d9ef61850f999c058a47b311245bec3436cb103f); local `research/corpus/v2-archaeology/commits/github-TransactionAuthorizationProtocol-TAIPs-d9ef6185.json`
- **Source date:** 2026-09-24; event date 2026-05-01; **reference:** typescript package and repository links
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-go-didcomm-ecdh1pu-383a8172 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-go-didcomm-ecdh1pu-383a8172`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit includes ECDH-1PU code and tests; the title misspells it EDCH-1PU. INFERRED: the Go messaging stack was brought toward authenticated-encryption parity; production profile selection remains UNKNOWN.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/Notabene-id/go-didcomm/commit/383a8172a40a5c895d3ac34cc92b8ee667f0f2b1); local `research/corpus/v2-archaeology/commits/github-Notabene-id-go-didcomm-383a8172.json`
- **Source date:** 2026-09-24; event date 2026-07-08; **reference:** Go source and tests
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-go-didcomm-xchacha-b08fac2a — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-go-didcomm-xchacha-b08fac2a`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit adds XChaCha20 encryption support and tests. INFERRED: the library broadened content-encryption options; no deployed cipher-suite policy is public.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/Notabene-id/go-didcomm/commit/b08fac2ad0124995aebb44a74b9f2db4e069270e); local `research/corpus/v2-archaeology/commits/github-Notabene-id-go-didcomm-b08fac2a.json`
- **Source date:** 2026-09-24; event date 2026-07-14; **reference:** Go source and tests
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-go-didcomm-x25519-7f02e744 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-go-didcomm-x25519-7f02e744`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit changes recipient key selection and multi-recipient handling. INFERRED: DIDDoc interoperability was hardened against mixed key sets.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/Notabene-id/go-didcomm/commit/7f02e7448b7c49662448d169b35798c0514b75cd); local `research/corpus/v2-archaeology/commits/github-Notabene-id-go-didcomm-7f02e744.json`
- **Source date:** 2026-09-24; event date 2026-07-16; **reference:** Go DID/key resolution source
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

### CODE-commit-go-didcomm-canonical-diddoc-d6dbc6f2 — CORRECTED / VERIFIED

- **Audit reference:** Kimi additional finding; v2 reconciliation
- **Claim:** `claim-CODE-commit-go-didcomm-canonical-diddoc-d6dbc6f2`
- **OLD:** Commit-level evidence absent/thin in v1 report
- **NEW:** The public GitHub commit changes DIDDoc emission and tests. INFERRED: deterministic DIDDoc serialization reduces cross-implementation drift; the commit does not resolve documented-versus-live Notabene PII key naming drift.
- **Affected paths:** `research/code-archaeology.md`, `research/chronology.md`, `evidence/commits.json`, `research/TECHNICAL_REPORT.draft.md`
- **Affected display:** source-linked research and downloads
- **Evidence:** [1](https://github.com/Notabene-id/go-didcomm/commit/d6dbc6f2837d7a7b805b9a4277d41ae60a51d780); local `research/corpus/v2-archaeology/commits/github-Notabene-id-go-didcomm-d6dbc6f2.json`
- **Source date:** 2026-09-24; event date 2026-07-28; **reference:** Go DIDDoc source and tests
- **Rationale / limit:** Targeted recheck separates observed artifact from inference and deployment unknowns. Public artifact; runtime unknown unless separately evidenced
- **Implementation:** RESEARCH_RECONCILED

## Integration acceptance remains separate

Regenerate research/TECHNICAL_REPORT.md, root compatibility report, normalized datasets, public evidence, source manifest, AI indexes and downloads from these corrected authoring inputs. Confirm 231 endpoints and 18 documented webhook names (12 main-guide + 6 quickstart-only), distinct map routes, corrections/claims download availability and licensing-specific local-copy behavior. See unresolved.md. No production endpoint or vendor package was executed.

### A29 — CORRECTED / VERIFIED

- **Claim:** claim-A29
- **OLD:** Audit relationship proof-type shorthand and SDK xpub removal imply uniform contract
- **NEW:** Relationships schema contains twelve cryptographic signature types plus screenshot, self-declaration and microtransfer branches (15 type values in total); all four branches still include optional xpub. SDK xpub removal is source-specific, not proof the API rejects xpub.
- **Affected paths:** architecture/data-model.md, research/TECHNICAL_REPORT.draft.md, research/v1-v2-delta.md
- **Evidence:** [V2 OpenAPI](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json); local research/sources/api-09-v2-openapi.json; source date 2026-09-24; Relationships POST proof.anyOf branches.
- **Rationale:** source-specific removal is not API-wide rejection.
