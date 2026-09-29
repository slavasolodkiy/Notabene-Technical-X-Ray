# SDK findings

Research date: 2026-09-24. Scope: public GitLab/npm SDKs and SafeConnect integration behavior. Every claim is marked **VERIFIED**, **INFERRED**, or **UNKNOWN**.

## Key Facts

1. **VERIFIED:** The current public GitLab `notabene/open-source` group exposes six projects; all six were cloned. The technically central SDKs are JavaScript SDK, NodeJS SDK and PII SDK. [SDK-SRC-07]
2. **VERIFIED:** Current public npm versions are JavaScript SDK 2.22.0, NodeJS 1.19.2, PII SDK 1.17.2, and CLI 1.2.1. Exact registry metadata/tarballs were archived. [SDK-SRC-08]
3. **VERIFIED:** The JavaScript SDK is a host-side wrapper around remote SafeConnect UX. It generates `connect.notabene.id` URLs, supplies token/value/options in the URL fragment, renders iframe/modal/popup/redirect modes, and handles messages. [SDK-SRC-01]
4. **UNKNOWN:** Exact exhaustive hosted screen order/content. The open repository has transport, types and transformers—not the remotely hosted screen implementation. Public docs establish supported branches and configuration, but must not be represented as source-level proof of every screen. [SDK-SRC-01, SDK-SRC-02, SDK-SRC-03]
5. **VERIFIED:** Field controls are required (`true`), hidden (`false`) or shown optional (`{optional:true}`), with separate natural/legal schemas. Whole sections can be hidden, but arbitrary per-screen reordering/hiding is not publicly established. [SDK-SRC-01, SDK-SRC-02]
6. **VERIFIED:** Signature, micro-transfer, screenshot and self-declaration proof paths are public. Micro-transfers are not automatically verified by Notabene; screenshot/declaration are documented as insufficient fallback evidence. [SDK-SRC-01, SDK-SRC-04]
7. **VERIFIED:** Counterparty Assist is not standalone; it augments withdrawal/deposit and supports third-party or another-device handoff. Third-party completion can require later refresh/decryption. [SDK-SRC-01, SDK-SRC-03, SDK-SRC-06]
8. **VERIFIED:** Node SDK is a credentialed backend client and PII SDK provides cryptographic/PII helpers. **INFERRED:** Node’s `/tx/*` methods are V1-oriented despite a 2026 release, while JS response transformers support V2 direct API integration. [SDK-SRC-05, SDK-SRC-09, SDK-SRC-10]

## Notable Claims Requiring Cross-Reference

- **INFERRED:** “SafeConnect is open source” needs qualification: the loader/wrapper and data types are public; the hosted UX screen source was not found.
- **INFERRED:** npm recency demonstrates package maintenance, not product-generation preference. Confirm V1/V2 migration strategy with current API documentation/product team.
- **VERIFIED conflict:** JavaScript repo `dev` HEAD is `2.22.0-next.2`; npm stable `2.22.0` is a different tagged commit. Cite exact commit/tag for code claims.
- **VERIFIED conflict:** `@notabene/cli` registry points to a GitLab repository now absent from group inventory and inaccessible anonymously. “Legacy” is an inference, not an npm deprecation status.
- **VERIFIED:** A completion status of `verified` for self-declaration is not equivalent to cryptographic verification; proof semantics and status labels must be cross-read.

## Source Quality Assessment

- **High:** Cloned first-party source with exact commits/tags; public npm registry metadata and tarballs; public GitLab/GitHub API inventories.
- **High:** First-party developer docs archived as focused markdown.
- **Medium:** Repository README statements about hosted behavior. They are authoritative integration guidance but cannot expose private screen internals.
- **Low/supporting only:** Search snippets; retained for discovery and not used when primary evidence was available.
- No credentials, integrations, private endpoints or transactions were used. Downloaded packages were not executed.

## Gaps & Unanswered Questions

1. **UNKNOWN:** Canonical public locations/status of the brief-named schemas, OpenAPI standards, protocol gateway, TAP parser, Node example, React Native example and NextJS widget example. Nearest evidence is the complete current group API snapshot, which does not list them. [SDK-SRC-07]
2. **UNKNOWN:** Hosted SafeConnect source, exact screen state machine, all visible strings, screen-level validations, accessibility behavior and internal API calls. [SDK-SRC-01, SDK-SRC-02]
3. **UNKNOWN:** Reusable-proof server-side matching rules, validity period, revocation and cross-device policy. Public SDK only documents `reuseProof` and stable `customerRef`. [SDK-SRC-01]
4. **UNKNOWN:** Whether Node SDK is officially deprecated for Transact V2; no deprecation marker was found. [SDK-SRC-09, SDK-SRC-12]
5. **UNKNOWN:** CLI roadmap/source after 2023. Public npm remains available, but repository access does not. [SDK-SRC-08]
6. **UNKNOWN:** Exhaustive wallet/chain support at runtime; that catalog belongs to hosted service/registry and may change independently of wrapper package.

## Sources

See `research/sdk-sources.json`. Core sources: SDK-SRC-01 (JavaScript source), SDK-SRC-02/03/04/05/06 (developer docs), SDK-SRC-07 (GitLab inventory), SDK-SRC-08 (npm), SDK-SRC-09/10 (Node/PII source), SDK-SRC-11 (GitHub ownership check), SDK-SRC-12 (developer index).
