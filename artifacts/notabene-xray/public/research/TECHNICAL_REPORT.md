# Notabene X-Ray: technical report — v2

**Evidence snapshot:** 2026-09-24  
**Status:** v2 research synthesis; public-artifact verification, not authenticated production testing  
**Scope:** public, unauthenticated evidence. No package was executed, no credentials were used, and no production transaction was submitted.

## Method, labels, and source quality

This report asks a narrow engineering question: what does Notabene appear to implement, what must an integrating institution implement, and what cannot be established from public material? **VERIFIED** means a claim is directly supported by the cited public artifact; **INFERRED** means it is a reasoned architectural conclusion; **UNKNOWN** means the public record is insufficient. These labels do not certify deployed behavior.

Citations are numbered mechanically from the source registry. The report merges the original seven parent registries plus v2 and archaeology registries in `research/*-sources.json` (API, Flow, identity, jurisdiction, SDK, jurisdiction gap, and protocol gap); a repeated document keeps the registry ID nearest the claim rather than being counted as an independent source. Thus the same Notabene page appearing as `api-transfer-payload`, `flow-S16`, and `identity-08` is one first-party document, not three-source triangulation. The original capture contained 223 documentation/index Markdown pages; that historical count is not a claim that all raw pages are redistributed. Current portable availability and checksums are recorded in `evidence/source-manifest.json`. The expanded registry inventory identifies eight officially attributable scoped npm packages, one scoped provenance anomaly (`@notabene/appkit`) and two unscoped legacy packages. Six public GitLab projects remain visible, but their roster differs from the original inventory; nine Notabene-id GitHub repositories include six archived projects. Registry discovery is distinct from cloned or code-inspected coverage. Packages were inspected as files, never executed. See `research/packages.md`, `research/repositories.md`, and `research/code-archaeology.md`. [[1]](https://gitlab.com/api/v4/groups/notabene%2Fopen-source/projects?include_subgroups=true&per_page=100) [[2]](https://registry.npmjs.org/@notabene%2fjavascript-sdk)

For this synthesis, primary law and official regulator text are **tier 1** for legal requirements; protocol specifications and pinned source are **tier 2** for their published formats; company documentation is **tier 3**—primary and useful for documented API behavior, but not independent proof of production internals, availability, security controls, legal correctness, or adoption. Company news establishes that an announcement occurred, not that an integration shipped. Search snippets are discovery evidence only. The raw OpenAPI is preferred over prose for paths and schemas, while prose is used for intended workflow. The captured specifications deterministically contain **231 path×method operations: 105 V2 on 85 paths and 126 V1 on 90 paths**. `data/endpoints.json` now covers both complete captured specifications, preserving old record IDs and appending the 74 missing V1 operations. The existing **3,905 field-path records** are the preserved dictionary extraction, not a claim of exhaustive field expansion across the newly included V1 endpoints. The main webhook guide documents **12 events**; six additional Flow quickstart event names are separately classified. The V1 JSON is preserved from the Redoc state at doc.notabene.id; the advertised standalone download cannot be assumed available. [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json)

## Executive technical conclusion

**VERIFIED:** Notabene exposes a coordination system around Travel Rule exchange and stablecoin payment authorization. Transact V2 models transfers, parties, delegated agents, policies, relationships, PII presentations, decisions, and settlement evidence. Flow adds pay-in and payout orchestration. TAP supplies open message semantics over DIDComm. None of these layers, by itself, moves funds: the institution, wallet, custodian, or infrastructure provider executes on a blockchain or fiat rail and reports a settlement identifier. [[4]](https://devx.notabene.id/docs/introduction.md) [[5]](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/tap-overview.md) [[6]](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/authorization.md)

The integration boundary is therefore substantial. A customer must still own KYC/KYB, customer and beneficiary records, sanctions and blockchain-risk decisions, custody/wallet signing, Travel Rule legal interpretation, reconciliation, incident response, and data-governance controls. Notabene supplies network discovery/routing, hosted or API-mediated collection, policy/presentation coordination, messaging, status/webhook surfaces, and optionally managed PII processing. **UNKNOWN:** public evidence does not establish production SLAs, liability allocation, regional parity, tenant isolation, key custody, full retention schedules, or settlement finality guarantees.

The proprietary difficulty is not basic JSON transport. It is the hosted network and directory, counterparty reach, remotely hosted SafeConnect experience, jurisdiction/presentation-definition operations, policy orchestration, managed PII re-encryption, operational routing, and support around heterogeneous counterparties. The public “glue” includes TAP/TAIPs, DIDComm concepts, Web DIDs, CAIP identifiers, IVMS101-shaped payloads, public schemas/types, OpenAPI, Svix delivery conventions, and SDK wrappers. **INFERRED:** a technically capable institution could implement protocol messages and validation from public artifacts, but could not recreate Notabene’s commercial network, hosted UI, current policy operations, or service assurances from those artifacts alone. TAP is public and attributed to Notabene; public evidence does not establish governance independent of Notabene. Its repository also conflicts internally: GitHub identifies the root license as CC0-1.0 while the rendered README says CC BY-SA 4.0, so adopters need authoritative licensing clarification. [[7]](https://github.com/TransactionAuthorizationProtocol/TAIPs) [[8]](https://api.github.com/repos/TransactionAuthorizationProtocol/TAIPs) [[9]](https://github.com/TransactionAuthorizationProtocol/tap-ts/blob/main/src/tap.ts) [[10]](https://gitlab.com/notabene/open-source/javascript-sdk)

## Product and commercial boundaries

**Transact V2 — VERIFIED.** The current model creates a transfer with originator, beneficiary, decimal-string asset amount, at least one agent, and a client reference. `Agent.for` forms a representation chain among customers, VASPs, custodians, source addresses, and settlement addresses. PII is appended or presented separately, then parties authorize, reject, flag, settle, clear, or revert according to local state and policy. [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) [[11]](https://devx.notabene.id/docs/transfer-payload-structure)

**SafeTransact/Transact V1 — VERIFIED, still documented.** V1 uses `/tx/*`, base-unit string amounts, a different status model, and older PII conventions. The maintained Node SDK remains V1-shaped, and the documented Fireblocks integration explicitly targets V1. “Deprecated product” is not established merely because V2 exists. [[12]](https://doc.notabene.id/) [[13]](https://gitlab.com/notabene/open-source/notabene-nodejs) [[14]](https://devx.notabene.id/docs/using-notabene-and-fireblocks.md)

**Flow — VERIFIED.** Flow coordinates payment context and authorization across a Payment Initiation Agent (PIA), Payment Receiving Agent (PRA), and optional Infrastructure Provider (IP). For pay-ins, the PIA represents the merchant/payee and the PRA represents the payer; for payouts the economic roles reverse. The IP may provide wallet, custody, liquidity, banking, or execution under contract, but does not acquire the customer relationship merely by being an IP. Flow does not replace KYC/KYB or hold funds. Pay-in and payout operations are present in the public V2 material. Payout create requires `ref`, `currency`, string `amount`, `customer`, and `merchant`; unlike Transact, payout amount has no decimal regex; optional data includes supported assets, memo, and invoice. The payout surface includes incoming/outgoing reads, web-authorization URL/expiry, and CAIP-19 settlement-asset selection with optional CAIP-10 or PayTo address. Recurring and agentic payments are documented at narrative or announcement level, not yet as a complete public contract. [[4]](https://devx.notabene.id/docs/introduction.md) [[15]](https://devx.notabene.id/docs/quickstart-pia-create-pay-ins.md) [[16]](https://devx.notabene.id/docs/infrastructure-provider-ip.md) [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) [[17]](https://notabene.id/post/notabene-announces-strategic-investment-from-ripple)

**SafeConnect — VERIFIED boundary.** The public JavaScript package is a wrapper, type surface, transformer, and transport around `connect.notabene.id`. It renders iframe/modal/popup/redirect/link modes and receives structured events. The hosted screen source is not in the repository; exact screen order, strings, accessibility, internal requests, and all validation logic remain proprietary or unpublished. It can collect natural/legal-person data, counterparty selection, and wallet proof through signature, micro-transfer, screenshot, declaration, or handoff. Screenshot and declaration are fallback evidence, not cryptographic ownership proof; micro-transfer proofs return pending; who confirms the on-chain payment is UNKNOWN. [[10]](https://gitlab.com/notabene/open-source/javascript-sdk) [[18]](https://devx.notabene.id/docs/self-hosted-wallet-verification-1) [[19]](https://devx.notabene.id/docs/using-the-safeconnect-component-response)

**Partners — mixed evidence.** Fireblocks V1 and TRUSThub have documented operational flows. Blockchain analytics and sanctions vendors are named, but exact payloads are not public. DFNS and Ripple Custody are named without technical contracts. The RLUSD/Ripple Payments statement describes intent/exploration and does not prove production completion. [[14]](https://devx.notabene.id/docs/using-notabene-and-fireblocks.md) [[20]](https://devx.notabene.id/docs/fireblocks-and-blockchain-analytics.md) [[21]](https://devx.notabene.id/docs/trusthub.md) [[17]](https://notabene.id/post/notabene-announces-strategic-investment-from-ripple) [[22]](https://devx.notabene.id/docs/common-usecases.md)

Commercially, public evidence does not disclose pricing, support tiers, uptime/error budgets, data-processing terms, breach obligations, indemnities, insurance, audit rights, subprocessor lists, exit/export guarantees, or custody liability. These are procurement gates, not implementation details.

## Identity, authentication, and authority

**VERIFIED:** an onboarded entity receives a `did:web` identity. Its DID document can be hosted on the institution’s domain or redirected to a Notabene-hosted copy and advertises signing, key-agreement, PII, and DIDComm service material. Current docs distinguish Ed25519 authentication/signing, X25519 key agreement, and a P-256 `#pii` key. A sender resolves the receiver’s DID document; the receiver validates/authenticates and decrypts according to the selected DIDComm profile. Signed plaintext, sign-then-encrypt, authenticated encryption (`authcrypt`), and anonymous encryption (`anoncrypt`) are distinct guarantees: authcrypt sender authentication is not automatically a separate non-repudiable signature. The public `go-didcomm` implementation exposes these profiles, but does not prove which one every production message uses. [[23]](https://devx.notabene.id/docs/diddocs-explained.md) [[24]](https://devx.notabene.id/docs/key-management-in-diddocs.md) [[25]](https://github.com/Notabene-id/go-didcomm)

An entity DID is not the same as an end customer. Flow customer records are entity-owned and typed natural or legal person; public evidence does not show an independent resolvable DID document for every customer. Likewise, a valid DIDComm signature authenticates key control, while `for`, relationship, and policy state express business authority. **UNKNOWN:** whether every delegated relationship carries an independently verifiable delegation credential. [[11]](https://devx.notabene.id/docs/transfer-payload-structure) [[26]](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/agents.md) [[27]](https://devx.notabene.id/reference/getflowcustomer.md)

**VERIFIED token chain:** server-held OAuth client credentials mint a 24-hour institution bearer token. A documented V1 flow uses that bearer to mint a five-minute, customer-scoped browser token. A separate V2 entity delegate JWT exists, but its TTL, revocation, claims, and complete permission matrix are not public. Client secrets, institution tokens, private DID/PII keys, and webhook secrets must remain backend-only; only a documented, narrowly scoped frontend token should cross into the browser. [[28]](https://devx.notabene.id/reference/authentication-2.md) [[29]](https://devx.notabene.id/docs/customertoken.md) [[30]](https://devx.notabene.id/reference/createdelegatetoken.md)

**UNKNOWN:** OAuth secret rotation, RBAC, organization-to-entity binding, domain-control ceremony, compromise recovery, key overlap during rotation, and regional authorization parity. These omissions prevent a production security design from being completed solely from the public docs.

## Frontend, backend, API, and webhook integration

### Minimal integration

A minimal hosted-UX path is:

1. Onboard one entity and publish/redirect its Web DID document.
2. Keep OAuth credentials on the backend; mint the documented component/customer token appropriate to the selected product generation.
3. Embed SafeConnect for withdrawal/deposit collection, VASP selection, natural/legal-person fields, and any selected wallet proof.
4. Transform completion output server-side; create the V2 transfer, append or present required PII, and persist Notabene transfer ID plus the institution’s unique `ref`.
5. Verify Svix-signed webhooks, fetch authoritative state after callbacks, and make compliance decisions.
6. Gate the institution’s wallet/custodian execution on its own policy; report `settlementId`; reconcile final state.

This minimizes frontend work but does not outsource KYC, custody, legal determination, sanctions/risk decisioning, or incident ownership. **UNKNOWN:** whether the legacy five-minute customer token is the recommended token for every current V2 SafeConnect component; resolve this before implementation. [[31]](https://devx.notabene.id/docs/embedded-components-v2-api.md) [[29]](https://devx.notabene.id/docs/customertoken.md)

### Full-control integration

A full integration replaces most hosted collection with institution UI and backend orchestration. It directly models customers and IVMS101, evaluates presentation definitions, constructs agent chains, manages addresses/relationships, chooses managed versus customer encryption, handles authorization callbacks, consumes webhooks idempotently, and integrates custody plus analytics providers. It should maintain a local append-only decision/audit record because public API logs do not establish the institution’s regulatory recordkeeping obligations.

V2 create uses decimal asset units, unlike V1 base-unit string quantities. Structural OpenAPI `required` fields are not the same as jurisdiction-required PII. Current OpenAPI generally uses plural `/entities`; several guides use singular `/entity`, and PII presentation retains a `/transfers` path. Use the selected OpenAPI operation verbatim and treat callback URLs as opaque rather than reconstructing them. A further Flow conflict is unresolved: the dated PRA quickstart says to submit only `asset` to pay-in `settlement_address`, while the public OpenAPI requires `settlementAddress` and makes `asset` optional. Integrators need a deployed-contract answer rather than guessing from either artifact. [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) [[12]](https://doc.notabene.id/) [[32]](https://devx.notabene.id/docs/pii-requirements) [[33]](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md) [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json)

**VERIFIED:** V2 has transfer, agent, relationship, and TAP-policy status domains. Webhooks include transfer/agent notifications and TAP requirement events. Svix signs callbacks and retries non-2xx responses with exponential backoff. **UNKNOWN:** ordering, atomicity across domains, duplicate windows, replay policy, maximum delay, and exactly-once semantics. Consequently handlers must authenticate first, store the event ID, be idempotent, tolerate reordering, and re-read current state before moving funds. `AWAITING-YOURS` and `AWAITING-COUNTERPARTY` appear in the OpenAPI enum but lack documented transitions. [[34]](https://devx.notabene.id/docs/statuses-explained) [[35]](https://devx.notabene.id/docs/webhook-details) [[36]](https://devx.notabene.id/docs/webhook-flow)

## PII, KYC, encryption, and keys

Notabene coordinates Travel Rule data; it does not perform or replace the institution’s KYC/KYB. V2 IVMS101 includes structured natural/legal names, addresses, national identifiers, customer IDs, birth data, residence/registration country, and account-number containers. Website, email, and phone are absent from the scoped IVMS schemas; that absence does not prove no hosted/product surface collects them. [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) [[32]](https://devx.notabene.id/docs/pii-requirements)

**Managed mode — VERIFIED documented behavior:** Notabene encrypts submitted PII using entity keys, stores it on platform, and can re-encrypt it for an allowed requesting counterparty. Reuse applies only to PII the institution created and requires party references. This places Notabene inside the plaintext/data-processing trust boundary. [[37]](https://devx.notabene.id/docs/encryption-by-notabene)

**Customer-managed mode — VERIFIED documented behavior, narrowly scoped:** where the sender encrypts IVMS101 to a receiver-controlled PII key whose private key Notabene does not hold, Notabene says it forwards the nested ciphertext without platform/entity storage and cannot decrypt that PII on the customer’s behalf. This is not a product-wide “Notabene cannot decrypt” claim. A hosted Node may unwrap the outer DIDComm envelope and process routing metadata while nested PII remains opaque; managed mode can process plaintext, and hybrid/escrow recipient sets grant different access. Older PII SDK material describes hosted, E2E, and hybrid/escrow modes using a different key generation. Escrow permitting UI decryption is explicitly “pseudo end-to-end,” not customer-only E2E. Current Web-DID P-256/X25519 documentation and legacy `did:key` Ed25519-to-X25519 SDK behavior must not be treated as one cryptosystem. [[24]](https://devx.notabene.id/docs/key-management-in-diddocs.md) [[38]](https://devx.notabene.id/docs/self-encryption) [[39]](https://devx.notabene.id/docs/key-management.md) [[37]](https://devx.notabene.id/docs/encryption-by-notabene)

**UNKNOWN:** HSM/KMS backing, operator access, at-rest envelope encryption, key export, rotation and overlap, backup destruction, PII/ciphertext/metadata retention, deletion SLAs, legal holds, tenant isolation, and whether all V2/Flow paths share identical encryption semantics. A full integration should threat-model DNS, DID signing keys, DIDComm keys, PII keys, OAuth secrets, webhook secrets, and custody keys separately.

## Jurisdiction logic and legal limits

Notabene publishes a threshold index and presentation definitions using JSONPath constraints, `all` conjunctions, and `pick/count:1` alternatives. These are executable vendor implementation artifacts, not law. A production engine must retain jurisdiction, direction, counterparty type, valuation source/time/rate, comparator, linked-transfer treatment, selected definition version, and the primary legal source. It must never equate “definition passed” with “legally compliant.” [[32]](https://devx.notabene.id/docs/pii-requirements) [[40]](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json)

The public matrix includes GB, France/EU, US, Singapore, Japan, and a FATF fallback. EU law has no general EUR 1,000 crypto Travel Rule exemption; the threshold relates to self-hosted-address ownership/control assessment. Article 14(1)(d) requires **(address including country AND official personal document number AND customer identification number) OR (date AND place of birth)**. By contrast, vendor `FR-0` accepts exactly one of address, national identification, customer identification, or date-and-place-of-birth. The vendor OR is materially broader and passing `FR-0` alone does not establish Article 14 compliance. The US rule applies at USD 3,000 or more, but Notabene’s `US-3000` PII subset is not the complete regulatory record. [[41]](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113) [[42]](https://pd.notabene.id/ivms101/v2/FR-0.json) [[43]](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-E/section-1010.410)

**VERIFIED conflict/currentness limit:** current UK regulation 64C, effective 30 June 2026, requires additional paragraph (6) information for the relevant non-all-UK branch at **GBP 800 or more**, including apparently linked transfers. The public Notabene index still labels GB in EUR and exposes `GB-1000`; it publishes neither comparator nor explanation of the amendment. The current-law branch therefore cannot be derived from the vendor artifact without inventing FX, valuation, and selection behavior. For all-UK execution, paragraph (6) instead follows a beneficiary-business request. Legal primary text controls; counsel and Notabene must confirm production selector behavior. [[44]](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C) [[40]](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json) [[45]](https://pd.notabene.id/ivms101/v2/GB-1000.json)

**VERIFIED Singapore mismatch:** current PSN02 keeps equality in the lower branch (`<= SGD 1,500`) and applies enhanced identity data only above it. Vendor filenames do not encode that comparator. PSN02 also permits date/place of birth, incorporation, or registration as appropriate, while `SG-1500` has no legal-person path in that alternative. [[46]](https://www.mas.gov.sg/-/media/annex-a8-mas-notice-psn02.pdf) [[47]](https://pd.notabene.id/ivms101/v2/SG-1500.json)

**UNKNOWN:** definition precedence across both parties’ jurisdictions, exchange-rate provider and timestamp, aggregation, immutable versioning, US below-threshold behavior, account/address normalization, EU DLT-address/LEI placement, and primary-law verification of current Japanese scope (secondary/vendor material supports a no-de-minimis reading but is not definitive). The simulator is educational and local-only; it cannot determine compliance.

## Transaction and payment lifecycle

**Outgoing V2:** create produces an outgoing local view; discovery and policy may request presentation, relationship confirmation, or authorization. The institution may authorize/reject/flag, then its separate custody path settles and reports proof. **Incoming V2:** the beneficiary sees an incoming view, evaluates identity/PII and authorizes or rejects; settlement without authorization can produce `FLAGGED-SETTLEMENT`, after which clear/freeze/revert paths apply. Revert messages coordinate state; they do not reverse a blockchain transaction by themselves. [[34]](https://devx.notabene.id/docs/statuses-explained) [[6]](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/authorization.md)

**Flow pay-in:** PIA creates a customer pay-in and distributes a payment link; PRA joins for the payer, may provide an authorization URL, chooses an offered asset, and receives the PIA settlement address. Both institutions run policy; the PRA or IP moves value and reports a blockchain hash or bank reference. [[15]](https://devx.notabene.id/docs/quickstart-pia-create-pay-ins.md) [[33]](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md) [[16]](https://devx.notabene.id/docs/infrastructure-provider-ip.md)

**Flow payout:** the V2 specification defines entity/customer create; list, detail, incoming and outgoing views; web authorization; and settlement-asset/address operations. Create accepts structured invoice data and duplicate references may return HTTP 409 with `existingRef`. Payout objects reuse the shared transfer-status enum, but `flowState` is only a string and the complete payout webhook catalog is not public. The PIA represents the payer and the PRA the payee; sender-side infrastructure executes. Event parity, state transitions, failure behavior, and commercial rollout still require confirmation—payload/schema existence is no longer an open question. [[4]](https://devx.notabene.id/docs/introduction.md) [[3]](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json)

**Recurring and agentic phases:** recurring agreements, cancellation, retry, renewal, and revocation are not a complete public API contract. “Agentic stablecoin transactions” is an announcement without a public delegation/consent schema. These cannot be accepted into a production scope without private documentation. [[48]](https://devx.notabene.id/docs/end-to-end-examples.md) [[17]](https://notabene.id/post/notabene-announces-strategic-investment-from-ripple)

## Operations, custody, and production acceptance

The customer must operate an idempotent webhook inbox, dead-letter/replay tooling, reconciliation by `ref` and settlement ID, metrics by state age, manual review queues, custody-policy gates, key/secret rotation, jurisdiction-rule change control, data-subject workflows, and incident runbooks. It must define chain confirmation depth, reorg handling, duplicate settlement behavior, memo/tag validation, fiat failure/reversal, and who can force or override authorization. Notabene’s public status model does not answer these operational questions.

Custody remains outside Notabene’s evidenced responsibility. Fireblocks can gate execution using a selected Notabene V1 status, but selecting an early status such as `NEW` does not mean counterparty acceptance. DFNS/Ripple details are unknown. Never let a webhook alone sign or release funds; combine verified callback, authoritative API state, internal policy, and custody controls. [[14]](https://devx.notabene.id/docs/using-notabene-and-fireblocks.md) [[49]](https://devx.notabene.id/docs/integrating-notabene-into-your-fireblocks-decisions.md) [[22]](https://devx.notabene.id/docs/common-usecases.md)

Production acceptance should require contractual SLA/DR evidence, region and subprocessor mapping, penetration/SOC evidence under NDA, key architecture, retention/deletion schedules, sandbox-to-production parity, rate limits, webhook guarantees, maintenance policy, legal-rule update ownership, data export, and exit procedures. None is proven by this corpus.

## Phased CTO recommendation

**Phase 0 — diligence.** Freeze V1/V2/Flow scope; answer the 25 companion questions; obtain private security, compliance, pricing, and SLA material; validate the UK rule update and payout availability.

**Phase 1 — sandbox/minimal.** One entity, hosted SafeConnect, managed PII only if privacy approves, outbound VASP-to-VASP transfers, verified webhooks, no automated custody release. Reconcile every transfer manually.

**Phase 2 — controlled production.** Add incoming flows, relationship proof, sanctions/analytics, custody gating, idempotent event processing, audit export, key rotation, data lifecycle, and jurisdiction version pinning. Introduce a human approval ceiling and staged asset/jurisdiction allowlists.

**Phase 3 — privacy/full control.** Evaluate customer-managed encryption, custom UI, direct V2 orchestration, multi-entity RBAC, Flow pay-ins and payouts, IP/custodian integration, automated reconciliation, and disaster recovery. Promote only after failure/replay/reorg tests and legal sign-off.

**Phase 4 — advanced products.** Recurring, agentic, announced Ripple capabilities, and additional corridors remain gated on implementable private contracts and production evidence—not press language.

## Limitations and verification

This is a public-evidence reconstruction, not legal advice, a security audit, a penetration test, or proof of Notabene’s deployed architecture. Documentation may lag production; public source may not be the deployed commit; regional behavior may differ; vendor claims are not independent validation. The local X-Ray simulator uses synthetic scenarios, performs no production call, and must not claim security, compliance, custody, or legal correctness.

Application delivery checks are separate from these public-artifact findings. Consult `research/verification.md` and `evidence/portable-validation.json` for the recorded checks and their dates; old partial diagram/link checks are not equivalent to full validation of this v2 revision.

## v2 correction layer and reproducible inventory

The full independent audit is retained unchanged in `research/audit-kimi.md`, including its own overstatements. `research/corrections-register.md` and `evidence/corrections.json` account for all 33 register rows, D1–D4, and additional findings. Audit dispositions (CONFIRMED / CORRECTED / REFUTED / UNKNOWN) are separate from platform evidence labels (VERIFIED / INFERRED / UNKNOWN).

**VERIFIED:** counting only OpenAPI HTTP-method keys at each path gives V2 **105 / 85 paths** and V1 **126 / 90 paths**; total **231**. The old 157 was a partial published inventory, not a full-spec total. The 3,905-field dictionary remains a preserved scoped extraction, not newly exhaustive coverage of all operations. Main-guide webhooks number 12; six quickstart-only Flow event names are additional. The V2 tag-operation sum is 106 because the PII operation has two tags; tags are not unique operations.

**VERIFIED:** V1 has 56 `/integrations/*` operations. Public V2 does not expose like-for-like address-book, V1 rules, webhook registration or integration path families. V2 separately contains eight relationship operations (plural and singular aliases), seven Members operations, five Flow Internal operations, four Network operations, two Transfer Checks, delegate-token issuance, address-ownership discovery, public keys, audit log, assess/simple/export/match/search and policy operations. Published “Flow Internal” paths do not establish customer availability. Migration substitutes and production access are **UNKNOWN**. [V1](https://doc.notabene.id/), [V2](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json).

### Explicit contract contradictions

| Type | Documented evidence | Integration consequence |
|---|---|---|
| DOCS != OPENAPI | PRA asset-only instruction versus required `settlementAddress` | Obtain deployed pay-in contract; do not silently choose one |
| DOCS != OPENAPI | Agent example `RequireAuthorization` versus enum `REQUIRE_AUTHORIZATION` | Schema-generated validators reject the example |
| DOCS != OPENAPI | AWAITING-YOURS / AWAITING-COUNTERPARTY and REPLACED / UNREACHABLE have no explained transitions in captured status prose | Unknown-state handling; do not infer terminal states from names |
| DOCS != OPENAPI | Singular callback `/entity` examples versus predominantly plural API paths | Treat returned callbacks as opaque; authenticate and constrain their destination before use |
| DOCS != LIVE ARTIFACT | PII sample `EcdsaSecp256r1VerificationKey2019` / `#pii` versus live `JsonWebKey2020` / `#notabene-pii` (same P-256 curve) | Exact type/fragment assumptions can fail; deployed selection policy UNKNOWN |
| VENDOR RULE != CURRENT LAW | GB EUR 1,000 index versus GBP 800 under SI 2026/621; EU four-way pick versus compound limb | Version and audit the legal overlay separately |
| V1 != V2 | Base-unit strings versus decimal asset-unit strings; IVMS property renames; missing migration equivalents | Explicit mapping and decimal-safe handling |

Sources: [PRA quickstart](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md), [V2 spec](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [status prose](https://devx.notabene.id/docs/statuses-explained.md), [live DIDDoc](https://vasps.id/no/did.json), [key guide](https://devx.notabene.id/docs/key-management-in-diddocs.md), [64C](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C).

**VERIFIED:** entity pay-in create requires `supportedAssets` and `fallbackSettlementAddresses` in addition to `ref`, `currency`, `amount`, `customer`, `merchant`. Payout does not share that required set and its `amount` has no decimal regex. Payout web authorization requires URI `authorizationUrl`; optional `expires` is documented as defaulting to one hour. These are schema facts, not tested runtime guarantees.

### Jurisdiction findings without overclosing uncertainty

**VERIFIED artifact:** the re-fetched index contains 76 entries and 72 distinct keys: BR occurs three times, LI_old twice, IS_old twice. `XX_old` remains `inForce` at EUR 1,000 and links to the Hong Kong narrative, while 27 individual EU states are published at threshold zero. US1-3000, US2-0 and US0-0 differ from US-3000; authoritative product selection remains **UNKNOWN**. ID/GI threshold strings near 1,000 and the absence of comparator fields are observable; a deliberate comparator workaround is **INFERRED**, not a proven design intent. [Index](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json).

**VERIFIED artifact / UNKNOWN primary-law completeness:** JP-0 requests base fields plus address OR customer ID at threshold zero. Vendor narrative and the audit's secondary corroboration support a no-de-minimis reading, but the audit did not fetch primary Japanese text. Its “resolved” or “fully current” conclusion is not adopted as definitive legal verification. [JP-0](https://pd.notabene.id/ivms101/v2/JP-0.json), [vendor Japan page](https://notabene.id/world/japan).

**VERIFIED artifact / UNKNOWN universal runtime selection:** FA-1000 and the FA pseudo-jurisdiction are published at USD 1,000 with base fields plus four-way pick:1. Documentation says FATF is used absent specific legislation. Neither the artifact nor that statement proves a universal production fallback or legal determination that local rules are absent. [FA-1000](https://pd.notabene.id/ivms101/v2/FA-1000.json), [PII requirements](https://devx.notabene.id/docs/pii-requirements.md).

### Identity and responsibility refinements

**VERIFIED live capture:** both public vasps.id DIDDocs advertise QA service hosts, not demonstrated production endpoints. The root URL returns document ID `did:web:vasps.id:at`; this is not proof that root-DID validation succeeds. No service endpoint was invoked. Public key material is not a credential. Do not infer production DIDComm profile, key custody or rotation from these samples.

**UNKNOWN:** micro-transfer confirmation duty. The documented proof is pending; screenshot review is assigned to a compliance officer, but that duty cannot be generalized to micro-transfers. Escrow/hybrid and legacy Ed25519-derived PII are not equivalent to customer-managed P-256 E2E. Production interoperation, key selection and recovery remain questions.

The separate System Map now describes runtime trust boundaries; the Actor Map describes authority and includes the Bank A → Alice → Exchange B → Bob walk. An entity DID, customer reference, agent representation and custody signing authority are four different concepts.

### Code archaeology changes the estimate, not the deployment claim

**VERIFIED source changes:** V1 transformer removal (`5b0a15dd`, 2026-06-30); blockchain address `accountNumber` fix (`2ceb2018`, same date); `customerIdentification` moved into NaturalPersonV2 (`eed7a642`, 2026-04-13); xpub proof removal (`e32555ea`, **2025-11-28**, correcting the audit); CounterpartyAssist webhook/decrypt/correlation additions (July 2026); PII ECDH-1PU (`42a4efc0`, 2025-10-15) and both-escrow-key HYBRID mode (`3ea4e3a3`, 2025-11-20); TAIP-17 Lock / TAIP-18 RFQ and tap-ts extraction (2026-05-01); initial TAIP-19 (`65b1cf2d`, **2025-11-28**, correcting the audit); TAIP-20 memo evolution (2026-03-17, not proof of initial creation); go-didcomm ECDH-1PU, XChaCha20, X25519 handling and canonical DIDDoc work (July 2026). Full hashes, changed paths and inspected public diffs are in `evidence/commits.json` and [Code Archaeology](code-archaeology.md).

**INFERRED:** engineering attention is shifting toward V2/SafeConnect and protocol/PII interoperability. **UNKNOWN:** production deployment dates, V1 end-of-life commitment and the commit-message “14x” performance claim. A removed helper is not an API-wide deprecation notice. npm non-deprecation is not a promise of support. The @notabene/appkit provenance anomaly, inaccessible package repository URLs and TAP license conflict remain diligence items.

**VERIFIED SDK != OPENAPI:** Relationships POST proof branches contain twelve cryptographic signature types (eip-191, eip-712, eip-1271, bip-137, bip-322, tip-191, ed25519, xrp-ed25519, xlm-ed25519, cip-8, siwe, siwx), plus screenshot, self-declaration and microtransfer: fifteen type values, not twelve total proof methods. Optional xpub is still present in all four OpenAPI branches despite removal from JavaScript SDK proof types. API acceptance is not determined by that source removal. [V2 OpenAPI](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json), [SDK commit](https://gitlab.com/notabene/open-source/javascript-sdk/-/commit/e32555ea9ffe42274db4d8badf8696fc38b38413).

## Sources consulted (49)

1. [Current public GitLab group roster](https://gitlab.com/api/v4/groups/notabene%2Fopen-source/projects?include_subgroups=true&per_page=100) — Published/updated undated; Tier 2.
2. [Per-package npm registry metadata](https://registry.npmjs.org/@notabene%2fjavascript-sdk) — Published/updated undated; Tier 2.
3. [Notabene API OpenAPI 3.1 specification](https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json) — Published/updated undated; Tier 2.
4. [Notabene Flow — Developer Introduction](https://devx.notabene.id/docs/introduction.md) — Published/updated 2026-03-30; Tier 3.
5. [Transaction Authorization Protocol overview](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/tap-overview.md) — Published/updated 2025-04-22; Tier 2.
6. [TAP Authorization Flow](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/authorization.md) — Published/updated 2025-06-23; Tier 2.
7. [Transaction Authorization Improvement Proposals repository](https://github.com/TransactionAuthorizationProtocol/TAIPs) — Published/updated undated; Tier 2.
8. [TAIPs and tap-ts public repository metadata and git history inspection](https://api.github.com/repos/TransactionAuthorizationProtocol/TAIPs) — Published/updated undated; Tier 2.
9. [tap-ts TypeScript TAP types](https://github.com/TransactionAuthorizationProtocol/tap-ts/blob/main/src/tap.ts) — Published/updated undated; Tier 2.
10. [Notabene JavaScript SDK GitLab repository and source](https://gitlab.com/notabene/open-source/javascript-sdk) — Published/updated undated; Tier 2.
11. [Transfer payload structure](https://devx.notabene.id/docs/transfer-payload-structure) — Published/updated 2025-12-22T09:22:54.000Z; Tier 3.
12. [Notabene SafeTransact V1 OpenAPI](https://doc.notabene.id/) — Published/updated undated; Tier 2.
13. [Notabene NodeJS SDK repository](https://gitlab.com/notabene/open-source/notabene-nodejs) — Published/updated undated; Tier 2.
14. [Fireblocks Integration Overview](https://devx.notabene.id/docs/using-notabene-and-fireblocks.md) — Published/updated 2026-01-21; Tier 3.
15. [PIA (Create Pay-ins)](https://devx.notabene.id/docs/quickstart-pia-create-pay-ins.md) — Published/updated 2026-03-31; Tier 3.
16. [IP (Infrastructure Provider)](https://devx.notabene.id/docs/infrastructure-provider-ip.md) — Published/updated 2026-03-31; Tier 3.
17. [Notabene Announces Strategic Investment from Ripple](https://notabene.id/post/notabene-announces-strategic-investment-from-ripple) — Published/updated 2026-07-23; Tier 2.
18. [Self Hosted Wallet Proofs](https://devx.notabene.id/docs/self-hosted-wallet-verification-1) — Published/updated undated; Tier 3.
19. [Component Events](https://devx.notabene.id/docs/using-the-safeconnect-component-response) — Published/updated undated; Tier 3.
20. [Using Notabene, Fireblocks and Blockchain Analytics](https://devx.notabene.id/docs/fireblocks-and-blockchain-analytics.md) — Published/updated 2026-01-21; Tier 3.
21. [TRUSThub connector (beta)](https://devx.notabene.id/docs/trusthub.md) — Published/updated 2026-01-21; Tier 3.
22. [Common use cases](https://devx.notabene.id/docs/common-usecases.md) — Published/updated 2026-01-22; Tier 3.
23. [DIDdocs explained](https://devx.notabene.id/docs/diddocs-explained.md) — Published/updated 2026-03-31; Tier 3.
24. [Key Management in DIDdocs](https://devx.notabene.id/docs/key-management-in-diddocs.md) — Published/updated 2026-03-31; Tier 3.
25. [Notabene go-didcomm](https://github.com/Notabene-id/go-didcomm) — Published/updated 2026-07-28; Tier 2.
26. [TAP Agents](https://github.com/TransactionAuthorizationProtocol/TAIPs/blob/main/agents.md) — Published/updated 2025-08-03; Tier 2.
27. [Get a customer profile by DID](https://devx.notabene.id/reference/getflowcustomer.md) — Published/updated 2026-05-15; Tier 3.
28. [Authentication](https://devx.notabene.id/reference/authentication-2.md) — Published/updated 2025-11-12; Tier 3.
29. [Generate customerToken](https://devx.notabene.id/docs/customertoken.md) — Published/updated 2026-01-21; Tier 3.
30. [Create a delegate token](https://devx.notabene.id/reference/createdelegatetoken.md) — Published/updated 2026-06-03; Tier 3.
31. [Embedded Components + V2 API](https://devx.notabene.id/docs/embedded-components-v2-api.md) — Published/updated 2026-09-10; Tier 3.
32. [PII requirements](https://devx.notabene.id/docs/pii-requirements) — Published/updated undated; Tier 3.
33. [PRA (Respond to Pay-ins)](https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md) — Published/updated 2026-03-31; Tier 3.
34. [Statuses explained](https://devx.notabene.id/docs/statuses-explained) — Published/updated 2026-01-27T10:54:19.000Z; Tier 3.
35. [Webhook events details](https://devx.notabene.id/docs/webhook-details) — Published/updated undated; Tier 3.
36. [Webhooks](https://devx.notabene.id/docs/webhook-flow) — Published/updated undated; Tier 3.
37. [Encryption managed by Notabene](https://devx.notabene.id/docs/encryption-by-notabene) — Published/updated 2026-01-14T18:30:05.000Z; Tier 3.
38. [Encryption managed by the Customer](https://devx.notabene.id/docs/self-encryption) — Published/updated 2026-01-14T18:29:40.000Z; Tier 3.
39. [Key management](https://devx.notabene.id/docs/key-management.md) — Published/updated 2026-01-21; Tier 3.
40. [Notabene IVMS101 v2 jurisdiction thresholds](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json) — Published/updated undated; Tier 3.
41. [Regulation (EU) 2023/1113](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113) — Published/updated 2023-05-31; Tier 1.
42. [Notabene FR-0 presentation definition](https://pd.notabene.id/ivms101/v2/FR-0.json) — Published/updated undated; Tier 3.
43. [31 CFR 1010.410 — Records to be made and retained by financial institutions](https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-E/section-1010.410) — Published/updated undated; Tier 1.
44. [UK Money Laundering Regulations 2017, regulation 64C — latest revised text](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C) — Published/updated 2026-06-30; Tier 1.
45. [Notabene GB-1000 presentation definition](https://pd.notabene.id/ivms101/v2/GB-1000.json) — Published/updated undated; Tier 3.
46. [MAS Notice PSN02 — Prevention of Money Laundering and Countering the Financing of Terrorism, Digital Payment Token Service](https://www.mas.gov.sg/-/media/annex-a8-mas-notice-psn02.pdf) — Published/updated 2024-04-02; Tier 1.
47. [Notabene SG-1500 presentation definition](https://pd.notabene.id/ivms101/v2/SG-1500.json) — Published/updated undated; Tier 3.
48. [Flow end-to-end examples](https://devx.notabene.id/docs/end-to-end-examples.md) — Published/updated 2026-04-29; Tier 3.
49. [Integrating Notabene Into Your Fireblocks Policies](https://devx.notabene.id/docs/integrating-notabene-into-your-fireblocks-decisions.md) — Published/updated 2026-01-21; Tier 3.
