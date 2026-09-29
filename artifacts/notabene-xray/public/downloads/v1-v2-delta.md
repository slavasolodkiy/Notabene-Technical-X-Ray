# Technical X-Ray v1 → v2 delta

Evidence snapshot: 2026-09-24. This compares report editions, not a claim that Notabene deployed an API migration on that date.

| Area | Historical v1 artifact | v2 correction / expansion | Evidence / affected paths |
|---|---|---|---|
| API inventory | 157 published rows: 105 V2 + selected 52 V1 | Full captured specs: **231**, 105 V2 on 85 paths + 126 V1 on 90 paths. Existing IDs preserved; missing 74 V1 operations appended in sorted path then fixed HTTP-method order | `data/endpoints.json`; both captured OpenAPI JSON files |
| Field dictionary | 3,905 records | Count independently rechecked; preserved **scoped extraction**, not newly exhaustive field expansion | `data/fields.json`; report method |
| Amounts | Ambiguous “base-unit integers” prose | V1 **strings** in base units; Transact V2 decimal-unit strings; Flow payout string without decimal regex | `architecture/data-model.md`; schemas |
| Flow payout | “reference” and decimal-pattern assumption | Exact `ref`, documented 409 `existingRef`; asymmetry with mandatory pay-in supported assets/fallback addresses | `architecture/flow.md`; V2 spec |
| Webhooks | 12 main-guide types | **12 + six quickstart-only names**, separate classes; complete Flow payloads/runtime delivery unknown | `data/webhooks.json` |
| Wallet proofs | Institution assigned micro-transfer verification | Confirmation owner **UNKNOWN**, proof pending; screenshot duty is separate | `architecture/onboarding.md`; `data/sdk-inventory.json` |
| Status / policy | Partial undocumented-state discussion | REPLACED/UNREACHABLE added to unresolved transitions; Agent enum/example conflict explicit | `architecture/transact-state-machine.md` |
| Identity | Documented key types | Two live DIDDocs captured; P-256 key type/fragment drift; QA hosts and root document ID mismatch disclosed | `research/sources/v2-did-*.json`; trust/system maps |
| Japan | Exact law unknown | Artifact verified; secondary/vendor alignment recorded without falsely upgrading primary-law completeness | jurisdiction matrix / questions |
| FATF | Fallback statement | FA pseudo-jurisdiction/FA-1000 artifact captured; universal selector still unknown | jurisdiction matrix / questions |
| Jurisdiction index | GB/FR/SG mismatches | 76 entries / 72 keys, duplicates, XX_old legacy flags/link, US variants, near-threshold strings | `data/jurisdiction-index-audit.json` |
| Packages | Four scoped packages inspected | Eight attributable scoped + one scoped anomaly + two unscoped legacy records; support != registry deprecation | `evidence/packages.json`; SDK inventory |
| Repositories | Six GitLab projects, outdated roster | Correct six-project public roster and nine Notabene-id GitHub repos / six archived; current public absence is not deletion | `evidence/repositories.json` |
| Code archaeology | Thin narrative | 19 source-inspected commit records; explicit fact vs interpretation; corrected xpub/TAIP-19 dates; unbenchmarked 14x claim | `evidence/commits.json`; chronology |
| System / actor pages | Duplicate product / ER material | Distinct runtime/trust boundaries and role/authority map with worked identity walk | `architecture/system-map.md`, `architecture/actor-map.md` |
| Diligence | 25 questions | Original 25 narrowed, ten additions; audit N5 retained as report-author acceptance, not vendor Q&A | `QUESTIONS_FOR_NOTABENE.md` |
| Reproducibility | Advertised but unserved archive | Preserve raw original captures; normalized claims/corrections, licensing/availability-aware source manifest and final serving checks required | `evidence/claims.json`, `evidence/corrections.json`, manifest |

## Deterministic count method

Parse each captured OpenAPI JSON. For every entry in `paths`, count only keys in `get, post, put, patch, delete, head, options, trace`; exclude parameters, summaries and extension keys. Count path×method, not operation tags. V2 contains one double-tagged PII operation, so tag counts sum to 106 while unique operations remain 105. Verify dataset coverage by generation + uppercase method + exact path. Do not count aliases as one when measuring the published contract; deprecated operations remain documented operations.

The V1 source is the preserved Redoc-state extraction, not a promise that `doc.notabene.id/openapi.json` works. V1 contains 56 integration operations and no like-for-like published V2 migration contract for several V1 families. Related V2 relationships/discovery capabilities are not proven replacements.

## Corrections to the audit itself

- Japan's “resolved / fully current” wording overcloses secondary evidence; primary Japanese law was not fetched.
- FA-1000 existence proves a published configuration, not a universal automatic fallback.
- Current scoped searches cannot prove “no TAP Parser anywhere public” across all time/private history.
- V1 helper removal and non-deprecation metadata do not establish an API-wide retirement date.
- Live DIDDocs advertise QA hosts and include a root URL/document-ID mismatch; they are not production topology or successful DID-validation evidence.
- Agent status names do not prove terminality. Missing text in fetched prose does not rule out unexamined image content.
- Vendor-pass is broader, not a proper subset of legally compliant EU payloads; a single vendor-accepted field does not satisfy the compound limb.
- Audit GBP850 exchange-rate example is not verified market data or an observed selector outcome.
- Captured xpub and TAIP-19 commit dates are **2025-11-28**; TAIP-20 cited diff proves evolution, not initial creation.
- “14x” is an unreplicated commit-message claim, not a benchmark result.
- The Relationships proof schema has twelve signature type values **plus** screenshot, self-declaration and microtransfer (fifteen total). Optional `xpub` persists in its OpenAPI branches despite SDK removal; neither source implies a uniform deployed rejection policy.

## Boundary of this edition

No production authentication, live transaction, DIDComm endpoint invocation, package execution or legal opinion. Old source captures are preserved; new targeted files are prefixed `v2-`. A correction can be implemented in research while its final UI/download packaging still requires an integration check. See `corrections-register.md` for every OLD → NEW mapping and `unresolved.md` for remaining obligations.