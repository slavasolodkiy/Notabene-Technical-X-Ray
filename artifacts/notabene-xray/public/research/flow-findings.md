# Flow findings

Research date: 2026-09-24. Scope: public technical evidence only. No authenticated endpoints, credentials or transactions were used.

## Key Facts

- **VERIFIED — coordination boundary.** Flow is an authorization/context and coordination layer over wallet, custody and settlement infrastructure. It does not hold funds, act as custodian, replace KYC/KYB or own customer relationships. PIAs, PRAs and IPs retain those responsibilities. [flow-S02, flow-S11]
- **VERIFIED — protocol relationship.** Flow uses TAP to coordinate identity, compliance, authorization and settlement messages. TAP is described as an open-source/open messaging standard; Flow is Notabene's payment-network implementation. [flow-S02, flow-S12]
- **VERIFIED — roles.** For a pay-in, the PIA represents the merchant/payee and creates the request; the PRA represents the payer and authorizes/settles; an optional IP supplies custody, wallet, liquidity, banking or on-chain execution under instruction and does not own the customer relationship. Roles reverse economically for a payout: the PIA represents the payer and the PRA the payee. [flow-S02, flow-S05]
- **VERIFIED — pay-in API/data.** The documented customer-scoped create call is `POST /entities/{entityDID}/flow/customers/{merchantCustomerDID}/payins`. Example fields include `ref`, decimal-string `amount`, fiat `currency`, CAIP-19 `asset`, up to ten `supportedAssets`, customer identity and `memo`; supported rails may also be PayTo URIs. The response includes transfer ID, `INCOMING`, `CUSTOMER_REQUESTED`, `PAYIN`, payment link, reference and amount. [flow-S03]
- **VERIFIED — pay-in sequence.** The PRA may provide an HTTPS authorization URL, selects an offered asset, waits for the PIA settlement address, authorizes, moves funds on-chain and calls `/settle` with a blockchain transaction hash or bank reference. An IP can execute and report settlement instead. [flow-S04, flow-S05]
- **VERIFIED — compliance ownership.** The worked example assigns payer checks, sanctions/risk review and payer KYC data to the PRA; payee-side review and settlement instructions to the PIA; each institution runs its own policies. Flow carries Travel Rule data and authorization events. [flow-S06]
- **VERIFIED — PII modes.** In managed mode, Notabene encrypts submitted IVMS101 with entity keys, stores it on platform and can re-encrypt/send it to permitted requesting counterparties. In customer-managed mode, already-encrypted PII is forwarded end-to-end and documentation says it is not stored on the entity or Notabene platform. [flow-S17, flow-S18]
- **VERIFIED — product generations.** SafeConnect is a JS-SDK embedded data-collection/proof layer compatible with V1 and V2, not itself the transaction-authorization backend. Its V2 workflow feeds `txCreate`, `txAppend`/`txPresentation` and relationship confirmation. Fireblocks documentation explicitly says its integration is currently Transact V1. [flow-S07, flow-S15, flow-S19]
- **VERIFIED — multi-party representation.** Transact V2 agents carry `@id`, `for` and optional `role`; `for` forms authority chains among end customer, VASP, custodian and source/settlement address. [flow-S16]
- **VERIFIED — payment families.** Public docs describe pull/pay-in, push/payout and recurring payments. The API index exposes create/list/get and authorization-required endpoints for pay-ins and payouts. [flow-S01, flow-S06]
- **VERIFIED — payout API surface and payload.** The public V2 OpenAPI has 105 operations, including entity/customer payout create/list/get, incoming/outgoing lists, settlement-asset selection and authorization-required. Entity-level create requires `ref`, `currency`, decimal-string `amount`, `customer` and `merchant`; customer-scoped create omits `customer` from the body because it is in the path. Both accept optional CAIP-19 `supportedAssets`, `memo`, and invoice `{id,dueDate,lineItems[{description,quantity,unitPrice,lineTotal}],paymentTerms}`. [flow-S24]
- **VERIFIED — payout authorization and status shape.** `POST .../payouts/{payoutId}/settlement_asset` requires CAIP-19 `asset` and optionally accepts CAIP-10 or `payto://` `settlementAddress`. A responder can signal web approval with required `authorizationUrl` and optional expiry (server default one hour). Payout resources expose generic transfer `status`, unconstrained-string `flowState`, direction, agents, amounts, activity log and policy evaluations. The reusable `TransferStatus` enum includes `OUTGOING`, `INCOMING`, awaiting states, authorization/rejection/flagging/settlement, revert states, `FROZEN` and `CLEARED`. [flow-S24]
- **VERIFIED — latest dated technical evidence.** The newest source in this corpus is the SafeConnect+V2 page updated 2026-09-10. It documents required field renames from component output before V2 submission. [flow-S19]

## Structured findings

```json
[
  {
    "id": "flow-role-pia",
    "status": "VERIFIED",
    "sources": ["flow-S02", "flow-S03"],
    "sourceUrls": ["https://devx.notabene.id/docs/introduction.md", "https://devx.notabene.id/docs/quickstart-pia-create-pay-ins.md"],
    "domain": "agent-role",
    "payinResponsibility": "represents merchant/payee; registers merchant customer, creates request, distributes link, authorizes/rejects and reconciles",
    "custody": "not inherent to role",
    "kycKyb": "retained by participant",
    "settlement": "provides receiving address; may delegate infrastructure to IP"
  },
  {
    "id": "flow-role-pra",
    "status": "VERIFIED",
    "sources": ["flow-S02", "flow-S04"],
    "sourceUrls": ["https://devx.notabene.id/docs/introduction.md", "https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md"],
    "domain": "agent-role",
    "payinResponsibility": "represents payer, obtains customer authorization, selects asset, authorizes/rejects",
    "custody": "may use own infrastructure or delegate to IP",
    "kycKyb": "owns payer relationship and checks",
    "settlement": "sends funds and reports settlement unless IP does so"
  },
  {
    "id": "flow-role-ip",
    "status": "VERIFIED",
    "sources": ["flow-S02", "flow-S05"],
    "sourceUrls": ["https://devx.notabene.id/docs/introduction.md", "https://devx.notabene.id/docs/infrastructure-provider-ip.md"],
    "domain": "agent-role",
    "customerRelationship": "none by virtue of IP role",
    "services": ["custody", "MPC wallet", "liquidity", "fiat rails", "on-chain settlement"],
    "settlement": "executes under client instruction and calls settle with settlementId"
  },
  {
    "id": "flow-payment-payin",
    "status": "VERIFIED",
    "sources": ["flow-S03", "flow-S04"],
    "sourceUrls": ["https://devx.notabene.id/docs/quickstart-pia-create-pay-ins.md", "https://devx.notabene.id/docs/quickstart-pra-respond-to-pay-ins.md"],
    "domain": "payment-flow",
    "direction": "pull",
    "requestContext": ["ref", "amount", "currency", "asset", "supportedAssets", "customer", "memo"],
    "completionEvidence": "settlementId as blockchain hash or bank reference"
  },
  {
    "id": "flow-payment-agentic",
    "status": "UNKNOWN",
    "sources": ["flow-S13"],
    "sourceUrls": ["https://notabene.id/post/notabene-announces-strategic-investment-from-ripple"],
    "domain": "payment-flow",
    "nearestEvidence": "July 2026 press release names agentic stablecoin transactions",
    "absence": "No public technical payload, endpoint, authentication, event model or delegation semantics found in the reviewed developer index."
  }
]
```

## Notable Claims Requiring Cross-Reference

- **INFERRED — shared core.** Flow appears to reuse Transact V2 transfer, agent, policy, presentation and settlement primitives because Flow endpoints coexist with `/tx/{id}` authorize/settle operations and Flow emits TAP policy callbacks. Public docs do not publish an internal service decomposition proving code-level reuse. [flow-S03, flow-S04, flow-S16]
- **UNKNOWN — DFNS/Ripple Custody detail.** The primary use-case page names both as wallet-provider integrations, but no public page reviewed specifies exact APIs, fields, key custody, event direction or V1/V2 support. Do not copy the Fireblocks responsibility model onto them. [flow-S14]
- **UNKNOWN — Flow use of Fireblocks adapter.** Fireblocks docs describe a V1 Travel Rule integration, not a Flow IP adapter. Fireblocks could participate operationally as custody infrastructure, but that mapping is not technically documented here. [flow-S07]
- **UNKNOWN — recurring implementation.** The narrative describes a recurring agreement and policy-driven monthly pay-in, but no recurring endpoint/payload appears in the reviewed API index. [flow-S01, flow-S06]
- **VERIFIED — invoice schemas.** V2 OpenAPI defines payout invoice ID, due date, line items and payment terms. It also defines pay-in invoice support: entity-level pay-in accepts the embedded object, while customer-scoped pay-in accepts either an embedded TAIP-16 object or invoice-document URL and says a non-empty invoice requires customer approval. [flow-S24]
- **VERIFIED conflict — pay-in settlement endpoint.** The 2026-03-31 PRA quickstart says the PRA sends only `asset` to `/settlement_address`, but the undated public OpenAPI marks `settlementAddress` required and `asset` optional for `authorizeFlowPayin`. This stale/current conflict cannot be resolved from publication dates because the spec has no timestamp; implementers should confirm against the live contract. [flow-S04, flow-S24]
- **INFERRED — Flow/Network relationship.** The June release says responder capability was rolled out to existing Network institutions, suggesting Flow discovery and reach are layered on the same entity network. It does not establish that all listed entities are active Flow integrators. [flow-S12]

## Latest news sweep (through 2026-09-24)

- **VERIFIED as a company announcement, not independent operating metrics.** On 2026-06-04 Notabene announced network-wide Flow responder capability, hosted-wallet payments through existing institutions, and self-hosted-wallet payment support. Claims of 2,000+ entities, 100+ jurisdictions and scale are issuer claims. [flow-S12]
- **VERIFIED as a partnership announcement; implementation status UNKNOWN.** On 2026-07-23 Notabene announced Ripple's investment, an intention to integrate RLUSD into Flow, and exploration of how Flow authorization could complement Ripple Payments. The future-tense wording does not establish a completed Ripple Payments or Ripple Custody integration. [flow-S13]
- **VERIFIED as public positioning only.** The same July announcement names pull, recurring, automated invoicing and agentic stablecoin transactions. Only pull/push/recurring have reviewed developer narratives; agentic API mechanics remain unknown. [flow-S06, flow-S13]
- **UNKNOWN.** No dated September 2026 product/news release was found in the searches. The September 10 SafeConnect+V2 documentation update is the newest dated technical change found. Absence from this scoped search is not proof no announcement exists. [flow-S19]

## Source Quality Assessment

- Strongest evidence: first-party developer pages with `updatedAt`, concrete endpoints, payloads and event names (flow-S02–S05, flow-S16–S19).
- The raw public OpenAPI is the strongest machine-readable API evidence and enumerates 105 V2 operations, but lacks a publication timestamp and conflicts with the dated PRA quickstart on pay-in settlement-address request requiredness (flow-S24 versus flow-S04).
- Fireblocks evidence is detailed and primary from Notabene, but describes V1 and therefore must not be generalized to V2 or Flow (flow-S07–S09).
- News releases are first-party claims carried by Notabene/PR Newswire. They establish that an announcement occurred, not independently validated network scale or integration completion (flow-S12–S13).
- The end-to-end examples are useful for role allocation but partly narrative/marketing and contain a participant-table inconsistency in the recurring example (payer/payee labels appear reversed relative to the story); role mechanics should be cross-checked against the introduction.

## Gaps & Unanswered Questions

1. **PARTLY VERIFIED:** payout create and authorization payloads, customer/entity scope, incoming/outgoing listing, generic transfer statuses and settlement-address handoff are specified. `flow.payout.created` is named in the PRA guide, but a complete payout-specific webhook/event catalog and enumerated `flowState` values remain UNKNOWN. [flow-S04, flow-S24]
2. **UNKNOWN:** recurring-payment agreement endpoint/schema, cancellation, mandate renewal, retry and revocation.
3. **UNKNOWN:** agentic-payment actor/delegation/consent model and APIs.
4. **UNKNOWN:** Flow fee assessment/collection API and whether fee movement is on-chain or netted; only an economic example is public.
5. **UNKNOWN:** whether Flow-managed PII uses the same managed/E2E modes as Transact V2 in every workflow.
6. **UNKNOWN:** exact DFNS and Ripple Custody boundaries, versions and payloads.
7. **UNKNOWN:** whether the announced RLUSD integration was production-complete by 2026-09-24.
8. **UNKNOWN:** SLA, confirmation depth, reorg handling, duplicate settlement IDs and fiat-rail failure behavior.

## Sources

See `research/flow-sources.json`. All retained source documents are under `research/sources/flow-*` plus `research/sources/devx-llms.md`.
