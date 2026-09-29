# Research verification

## 2026-09-29 completion verification

The historical research-only pass below is preserved, not a statement that the app remains untested. Current completion checks:

- Clean canonical npm install passed; inherited build failed on missing JUR-19 capture. A newly retrieved, honestly dated primary-source replacement repaired the failure.
- Regeneration passed: 231 captured operations, 3,905 scoped fields, 35 questions, 18 sections; final reports/questions synchronized.
- Offline ZIP: 616 entries, all 370 manifest checksums verified; metadata-only withholding preserved.
- App TypeScript passed; simulator regression tests cover 7,200 scenario combinations.
- Browser acceptance after Markdown nesting fix: 111/111 checks, zero browser errors, for managed preview and each production static base (`/` and `/notabene/`).
- Each static base passed 316 source/download file-and-MIME checks, built asset requests, and missing-file 404 checks; all 21 Mermaid diagrams rendered.
- Clean public export npm install and production builds passed; fresh npm dependency audit reported zero vulnerabilities.
- Public-export heuristic secret scan passed; internal captures are separately flagged and excluded. See security-verification.md for scope and limitations.

Details and machine results: browser-verification.md, browser-verification-*-results.json, simulator-verification.md, evidence-repair.md, security-verification.md, and final-handoff.md.

**Verification date:** 2026-09-24  
**Target:** `research/TECHNICAL_REPORT.draft.md` and the Mermaid blocks in `architecture/*.md`  
**Method:** local saved evidence and exact archived OpenAPI documents were treated as authoritative for this pass. Public link probes were read-only `GET` requests. No authenticated or private endpoint was requested, no package was executed, and no end-to-end test was run.

## Result

The report's major claims checked below are supported with the stated qualifications. One unequivocal documentation error was corrected: the Flow customer-registration path used singular `/entity`; the archived V2 OpenAPI has `POST /entities/{entityDID}/flow/customers`. Endpoint labels in the pay-in and payout sequence diagrams were expanded to exact archived paths. The matching public-download copy was corrected too. No factual change to the report itself was required.

## Major claim checks

| Check | Result | Evidence and qualification |
|---|---|---|
| UK GBP 800 rule and conjunction | **Verified** | Current regulation 64C(4) says “equal to or exceeds” GBP 800 and aggregates apparently linked transfers. Paragraphs 64C(2)–(4) make the branches conjunctive: when every executing business is carrying on business in the UK, paragraph (6) follows a beneficiary-business request; otherwise paragraph (6) accompanies a GBP 800-or-more transfer. Saved `GAP-JUR-01`, lines 243–249, also records the 30 June 2026 substitution. The report correctly does not apply the threshold to the all-UK branch. |
| Vendor UK mismatch | **Verified** | The saved current-law text is GBP 800/`>=`; the saved vendor index/definition remains EUR-denominated `GB-1000` and does not expose a comparator. Production selection, FX source/time, and linked-transfer implementation remain unknown. |
| EU Article 14 conjunction | **Verified** | Saved EU Regulation 2023/1113 Article 14(1)(d) states address including country **and** official personal document number **and** customer identification number, **or alternatively** date and place of birth. The report's parenthesization is accurate. The EUR 1,000 rule found in Articles 14(5) and 16(2) concerns self-hosted-address ownership/control assessment, not a general Travel Rule exemption. |
| V1 versus V2 amount units | **Verified** | Archived V1 schemas define `transactionAmount` as a positive integer string in the asset base unit (“satoshi, wei, etc”). Archived V2 transfer create defines `amount` as a decimal string matching `^\d+(\.\d+)?$`, with example `1.5`. The report's unit warning is accurate. Flow payout amounts are string-typed but the OpenAPI description alone does not independently define their unit; the report avoids calling them base units. |
| Current versus legacy PII key generations | **Verified** | Current DID-document evidence distinguishes Ed25519 signing, X25519 agreement, and a P-256 `#pii` key. Legacy PII SDK evidence creates an Ed25519 `did:key` and converts Ed25519 material to X25519. The report correctly warns that these are not one cryptosystem. Which production path uses which generation remains unknown. |
| Managed SaaS decryption boundary | **Verified, wording is an inference from documented processing** | The managed-encryption guide says plaintext PII is submitted for Notabene to encrypt/store and that Notabene re-encrypts it for allowed requesting counterparties. This necessarily puts the service in the plaintext processing boundary, but does not establish operator access, HSM/KMS design, or retention. |
| Customer-managed decryption boundary | **Verified, narrowly scoped** | The self-encryption guide says nested encrypted PII is forwarded and not stored on the entity or Notabene platform. DID-key guidance says customers can retain a receiver PII private key so Notabene cannot decrypt on their behalf. The report correctly limits this statement to that PII mode and allows outer DIDComm/routing processing. |
| Hybrid/escrow limitation | **Verified** | Legacy key-management evidence calls escrow “pseudo end-to-end” and says both parties can decrypt through the UI when the Notabene escrow key is used. The report correctly separates this from customer-only E2E. |
| Flow payout surface | **Verified** | The archived V2 OpenAPI contains entity- and customer-scoped create/list/detail payout operations, incoming/outgoing reads, and `POST` operations for `authorization_required` and `settlement_asset`. Required create and selection fields reported in the draft match the schemas. |
| Exact API scope | **Verified locally** | Archived V2 OpenAPI: 85 path items, 105 HTTP operations, 23 deprecated and 82 current. Archived V1 OpenAPI: 90 path items and 126 total HTTP operations; the project deliberately scopes 52 V1 operations into its inventory. Therefore “157 operations” is a project extraction scope, not the total operations in both raw specifications. The report wisely omits operation/field totals. |
| Corpus scope counts | **Verified with definition caveat** | `research/corpus/docs` contains 223 Markdown pages plus one manifest; the public GitLab inventory contains six projects and six corresponding local repository directories; the npm archive contains four package directories. The separate GitHub organization inventory lists nine repositories but those are inventory metadata, not six additional GitLab clones. |
| TAP/settlement boundary | **Verified** | Saved TAP and Flow evidence separates authorization/messaging from wallet, custodian, blockchain, or fiat execution. The report's “does not itself move funds” boundary is supported. |

## Mermaid and endpoint review

Nineteen Mermaid blocks across ten architecture files were inspected: one authentication sequence, two ER diagrams, four Flow sequences/flowcharts, two integration diagrams, five onboarding flowcharts, one product map, one TAP sequence, three state diagrams, and one trust-boundary flowchart.

- All 19 have balanced fences, a recognized diagram declaration, stable node/state identifiers, and balanced branch constructs.
- Seven sequence/ER blocks completed `mermaid.parse` with the locally installed Mermaid 12 parser.
- The remaining flowchart/state blocks reached Mermaid's sanitizer and then hit a Node-only `DOMPurify.addHook` runtime incompatibility. That is not a diagram parse error, but it prevents claiming a full renderer validation. They were therefore checked conservatively by inspection.
- Exact paths and methods shown in architecture prose/diagrams were compared to the archived OpenAPI. The corrected Flow paths are now exact. Ellipsized table entries such as `POST .../{payoutId}/settlement_asset` are explicitly shorthand under a table that provides the full entity path and are not represented as literal endpoints.
- Guide examples using singular `/entity` remain documented conflicts, not recommended OpenAPI paths. Callback URLs should remain opaque.

## Public URL probes

Twenty major cited public URLs were probed once with redirect-following `GET`, a 7-second connect timeout, and a 15-second overall timeout. Results establish reachability only, not content correctness or future availability.

| Result | Count | Notes |
|---|---:|---|
| Reachable HTTP 200 | 18 | Notabene OpenAPI/docs/definitions, UK legislation, GitHub/GitLab, and npm URLs returned 200. |
| Reachable HTTP 202 | 1 | EUR-Lex returned 202; treated as reachable, not as proof that the full document body was delivered in this probe. |
| Inconclusive | 1 | eCFR redirected to `unblock.federalregister.gov`; the final 200 is an anti-bot page, so the cited legal content was not validated live. |
| Timeout/network failure | 0 | None in this pass. A timeout would have been recorded as inconclusive, never valid. |

Machine-readable per-URL status, elapsed time, and final URL are in `research/verification.json`.

## Unresolved limitations

1. Live link success does not verify page content, historical equivalence to the saved snapshot, or production behavior.
2. The eCFR live probe is inconclusive; the claim remains grounded in saved local evidence.
3. Vendor documentation cannot establish production internals, SLA, key custody, operator access, retention, regional parity, or legal correctness.
4. Customer-managed PII opacity does not imply that routing metadata or an outer DIDComm envelope is opaque to hosted Nodes.
5. Flow `flowState`, payout webhook completeness, current token compatibility, and the pay-in `settlement_address` guide/OpenAPI conflict remain unresolved.
6. Mermaid's local Node parser could not complete sanitizer-dependent flowchart/state validation; no browser renderer or application test was run.
7. Scope totals depend on explicit definitions: 223 archived Markdown docs excludes the manifest; six repositories means GitLab projects cloned locally; 157 endpoints is the project's scoped inventory, not all 231 raw V1+V2 operations.