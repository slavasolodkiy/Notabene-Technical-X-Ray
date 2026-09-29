# Flow API schema handoff

**Date:** 2026-09-24  
**Audience:** flow-research  
**Status:** VERIFIED against `research/sources/api-09-v2-openapi.json`

The archived V2 OpenAPI contains explicit payout schemas. Flow documentation must not claim that a public payout schema was unavailable.

## Payout operations discovered

- `POST /entities/{entityDID}/flow/payouts` — `createFlowPayout`
- `POST /entities/{entityDID}/flow/customers/{customerDID}/payouts` — `createFlowCustomerPayout`
- `GET /entities/{entityDID}/flow/payouts` — `listFlowPayouts`
- `GET /entities/{entityDID}/flow/payouts/incoming` — `listFlowIncomingPayouts`
- `GET /entities/{entityDID}/flow/payouts/outgoing` — `listFlowOutgoingPayouts`
- `GET /entities/{entityDID}/flow/payouts/{payoutId}` — `getFlowPayout`
- `GET /entities/{entityDID}/flow/customers/{customerDID}/payouts` — `listFlowCustomerPayouts`
- `GET /entities/{entityDID}/flow/customers/{customerDID}/payouts/{payoutId}` — `getFlowCustomerPayout`
- `POST /entities/{entityDID}/flow/payouts/{payoutId}/settlement_asset` — `authorizeFlowPayout`
- `POST /entities/{entityDID}/flow/payouts/{payoutId}/authorization_required` — `payoutAuthorizationRequired`

## `createFlowPayout` request

**Required:** `ref`, `currency`, `amount`, `merchant`, `customer`.

**Optional/conditional:** `supportedAssets`, `memo`, and `invoice`.

The inline merchant and customer objects expose `@id`, `name`, and `email`. Invoice exposes `id`, `dueDate`, `paymentTerms`, and line items with `description`, `quantity`, `unitPrice`, and `lineTotal`.

The `201` response contains `transfer` with `@id`, `@type` fixed to `Payout`, `ref`, `amount`, `status`, `flowState`, `paymentLink`, `customerDid`, `merchantDid`, and `createdAt`.

## Customer-scoped payout difference

`createFlowCustomerPayout` uses the customer DID in the path, so its request requires `ref`, `currency`, `amount`, and `merchant`, but not an inline `customer` object. Its `201` transfer response additionally exposes `asset` in the archived schema.

## Authorization schema

`authorizeFlowPayout` requires `asset`; `settlementAddress` is optional in the request schema.

## Machine-readable handoff

- All 105 V2 operations, including the payout operations above: `data/endpoints.json`
- Extracted request/response paths:
  - `FlowOperation.createFlowPayout.request`
  - `FlowOperation.createFlowPayout.response.201`
  - `FlowOperation.createFlowCustomerPayout.request`
  - `FlowOperation.createFlowCustomerPayout.response.201`
  - `FlowOperation.authorizeFlowPayout.request`
  in `data/fields.json`

**Caveat:** These are public OpenAPI schemas. They verify documented API shape, not undocumented runtime requirements, custody behavior, or production availability in every region.