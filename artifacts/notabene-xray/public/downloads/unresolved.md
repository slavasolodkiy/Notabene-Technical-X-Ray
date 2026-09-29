# Unresolved evidence and integration obligations

Snapshot: 2026-09-24. **UNKNOWN is a substantive result**, not a failed cosmetic badge. Public schema/documentation verification does not establish deployed behavior. Nearest citations below are context, not answers.

## Production-blocking vendor questions

| Topic | What is established | What remains UNKNOWN | Question / source |
|---|---|---|---|
| PRA contract | Quickstart asset-only conflicts with required settlementAddress | Deployed accepted body and contractual compatibility | Q23; [PRA](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md), [spec](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) |
| Statuses / policies | Four underspecified enum values; invalid policy example | Transitions, terminality, accepted policy spelling, concurrent updates | Q8–9; [status prose](https://devx.notabene.id/docs/statuses-explained.md) |
| Micro-transfer | Proof result is pending | Confirmation owner, depth, timeout, replay/reorg and completion event | Q26; [proof guide](https://devx.notabene.id/docs/self-hosted-wallet-verification-1.md) |
| Tokens | V1 TTLs and V2 delegate-token envelope/SDK parameter | Delegate JWT claims/TTL/audience/revocation/placement and production component requirements | Q11–13; [delegate token](https://devx.notabene.id/reference/createdelegatetoken.md) |
| PII / DID / keys | Managed vs E2E modes and live doc drift | Production selection/profile, rotation, recovery, migration, retention, operator access and HSM/KMS controls | Q14–18/Q32; [live doc](https://vasps.id/no/did.json) |
| Jurisdiction selection | GB mismatch, EU loose field alternative, SG equality issue, duplicate/legacy/US variant artifacts | Authoritative variant, FX/rounding, precedence, aggregation, immutable versioning and change notification | Q19–22/Q27; [index](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json) |
| Japan | Published zero-threshold JP-0 and secondary/vendor alignment | Exact current primary-law scope, reciprocal jurisdictions, completeness | Q34; [JP-0](https://pd.notabene.id/ivms101/v2/JP-0.json) |
| FATF | FA index and FA-1000 artifact | Universal runtime selector and legal determination that local legislation is absent | Q35; [FA-1000](https://pd.notabene.id/ivms101/v2/FA-1000.json) |
| Flow / settlement | Public create, authorization and evidence contracts | Complete flowState, quickstart-event schemas/delivery, regional access, finality/reorg/fiat reversal semantics | Q5/Q23/Q30–31; [V2](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) |
| V1 migration | Full documented inventory and helper removal | Official EOL, compatibility guarantees, missing-family replacements and Flow Internal access | Q3/Q33; [V1](https://doc.notabene.id/) |
| Supply chain / TAP | Registry attribution, public diffs, license conflict | appkit purpose/support, inaccessible package sources, verify-proof source mapping, normative validator and authoritative license | Q4/Q28–29; [TAIPs](https://github.com/TransactionAuthorizationProtocol/TAIPs), [npm](https://registry.npmjs.org/-/v1/search?text=notabene&size=50) |
| Operations / contracts | Integration duties and documented public surfaces | SLA, tenancy, residency, liability, pricing, audit/export rights, private deployment parity | Q1–2/Q24–25 |

## Research limits that must remain visible

- “VERIFIED endpoint/field” means documented in a captured public schema. No endpoint was production-tested.
- 3,905 field-path records remain the preserved dictionary scope; completing 231 endpoints did not create a complete expansion of every V1 field.
- Eighteen webhook names comprise twelve main-guide events and six quickstart-only names. No complete machine-readable webhook specification was discovered.
- New live DIDDocs use QA service URLs. Root URL/document-ID mismatch is captured, not resolved.
- Japan is not definitively legally verified. FATF fallback existence is not observed selection. Near-threshold workaround intent is inferential.
- Public repository visibility, scope attribution, code inspection, support, deployment and licensing are separate dimensions.
- Source code changes do not prove deployment; “14x performance” was not benchmarked.
- Historical audit working papers under `/mnt/agents/` were not supplied in this workspace and are not represented as delivered evidence.
- Original verification debt: 18 of 20 link probes delivered ordinary HTTP 200; one was 202 and one anti-bot. Seven Mermaid parses succeeded and twelve had only conservative inspection after DOMPurify failure. These are historical results, not full v2 validation.

## Final integration acceptance — report author, not Notabene

These require checks on the final combined build. Research authoring alone cannot mark them complete:

1. Regenerate final/root reports from corrected `research/TECHNICAL_REPORT.draft.md`; copy updated questions to research/public compatibility locations.
2. Regenerate normalized/public datasets, AI indexes and downloads: **231 endpoints**, **3,905 scoped fields**, **18 webhook names split 12+6**, **85 correction / claim records**, and expanded package-backed SDK inventory. Do not leave old headline counts in active UI.
3. Ensure System Map and Actor Map routes use their distinct source documents and retain source links. State/data-model citations now exist.
4. Ensure structured research/architecture/data/evidence files and verification are retrievable. Metadata-only licensing records must say raw content is unavailable, never return HTML SPA fallback or imply full raw redistribution.
5. Check archive manifest checksums and exact artifact availability; preserve historical captures without replacing them with undated live content.
6. Confirm unknown filters/badges do not equate documented schemas with production proof. Keep the six quickstart names distinguishable.
7. Review simulator: all six offered proof choices, micro-transfer pending/unknown owner, exact ref/amount semantics, JP/FATF cautions, 14 local-only stages and separate external execution.
8. Test routes/downloads on root and `/notabene/`, responsive/reduced-motion/keyboard behavior, inline-code contrast and final meta description.
9. Record actual fresh install/build, route, download and diagram results with limitations in verification, not inferred success from old checks.

These are acceptance obligations, not an assertion that every item is still broken. The owning integration agent must reconcile each against final test evidence.

### Propagation review at research handoff

The corrected owned authoring inputs contain no unqualified old headline or micro-transfer-duty claims. Generated reports/public copies are intentionally not edited here because their owning build regenerates them. The following non-owned legacy synthesis files also need either correction or an explicit **historical v1 working paper** banner during final integration:

- `research/api-findings.md` — the old 157/52 inventory sentence;
- `research/notes.md` — old scoped inventory checklist;
- `research/sdk-findings.md` — unsupported “not automatically verified by Notabene” micro-transfer statement;
- `research/verification.md` — historical count/method wording and old validation results (preserve the old results, but distinguish current inventory);
- generated root/research/public reports and copied questions — regenerate from the corrected draft/root questions rather than patching generated copies.

Raw source captures and the original audit must not be rewritten to hide their historical wording.