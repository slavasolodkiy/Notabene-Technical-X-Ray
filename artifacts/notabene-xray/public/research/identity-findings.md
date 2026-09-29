# Identity findings

Research date: 2026-09-24. Scope: public evidence only; no credentials, private endpoints, integrations, or transactions used.

## Key Facts

1. **VERIFIED — Web DID onboarding.** Notabene assigns an entity a `did:web` identity when it is created, generates an initial DID document/Node keys, and instructs the institution to host the document on its domain or redirect to a Notabene-hosted copy. The document advertises verification/key-agreement material and a DIDComm service endpoint. [identity-01]
2. **VERIFIED — three key purposes.** Current V2 docs distinguish Ed25519 signing/authentication, X25519 DIDComm key agreement, and a P-256 `#pii` key for customer-managed PII encryption. [identity-01, identity-02]
3. **VERIFIED — discovery and message authentication.** A sending Node resolves the recipient Web DID document and service endpoint. The receiving Node validates the sender's DID document/signature and decrypts with the appropriate private key when the selected mode permits it. [identity-01]
4. **VERIFIED — customer E2E boundary.** With customer-managed encryption, the customer encrypts IVMS101 to the recipient's PII public key and submits ciphertext to the presentation API; Notabene performs message wrapping/routing and publicly says it cannot decrypt PII on the customer's behalf. [identity-02, identity-07]
5. **VERIFIED — escrow is a different boundary.** Legacy PII SDK docs describe a Notabene-generated escrow key fallback. If used, both parties can decrypt in the UI, so this is not customer-only E2E. [identity-18]
6. **VERIFIED — recursive delegation model.** Transfer agents have `@id`, optional role, and `for`; `for` chains represent addresses/custodians/VASPs acting for another agent or party. [identity-08]
7. **VERIFIED — person/customer distinction.** Flow customer records are entity-owned, typed `natural_person` or `legal_person`, and hold IVMS101 profile data. Public evidence does not establish an independent resolvable DID document for every end customer. [identity-16]
8. **VERIFIED — institution token chain.** Backend client credentials produce a 24-hour bearer accessToken. The documented V1 customerToken is minted server-side using that accessToken, is scoped `customer`, lives five minutes, and is intended for frontend validation without exposing the accessToken. [identity-03, identity-04]
9. **VERIFIED — delegate token, UNKNOWN TTL.** Current API docs expose an entity-bound delegate JWT and DID, but publish no lifetime or precise permission list. It must not be conflated with the five-minute V1 customerToken. [identity-15]
10. **VERIFIED — webhook verification.** Notabene uses Svix and exposes an endpoint signing secret in the portal. Receivers should verify signatures; exact header/canonicalization detail is delegated to Svix documentation. [identity-14]
11. **VERIFIED — TAP does not move money.** TAP is a DIDComm messaging/authorization layer before blockchain settlement. Wallet/custody infrastructure executes the on-chain transfer; `Settle` reports proof/transaction identity. [identity-09, identity-12]
12. **VERIFIED — open implementation artifacts.** TAIPs publishes prose and JSON schemas; `tap-ts` publishes TypeScript message/agent/policy types and validation code. Exact repository commits and paths are recorded in identity-13 and identity-20. [identity-09, identity-13, identity-20]

## Notable Claims Requiring Cross-Reference

- **INFERRED — browser minimization:** only the short-lived customer-scoped token should cross into a browser. Docs directly forbid exposing the accessToken by purpose; classifying client secrets, private encryption keys, and webhook secrets as backend-only follows standard secret boundaries but is not restated in one Notabene page. [identity-03, identity-04, identity-14]
- **INFERRED — cryptographic authority versus business authority:** a valid DIDComm signature proves control of a DID key, while the `for` relationship and policy state determine whether that actor is authorized in a transfer. Public docs say agent-party authority must be cryptographically verifiable but do not show a mandatory delegation credential on every Notabene transfer. [identity-08, identity-11]
- **VERIFIED conflict — key generations:** current V2 DID docs use Web DID + Ed25519/X25519/P-256 `#pii`; older PII SDK material uses `did:key` Ed25519 converted to X25519 and V1 `/tx` APIs. Product generation must be selected before implementing. [identity-01, identity-06, identity-18, identity-19]
- **VERIFIED conflict — role vocabulary:** the Notabene transfer guide lists `VASP` and `Custodian`; current TAP schema/types use `CustodialService` and `EscrowAgent` among standard values. Pin the consumed schema/version rather than assuming synonyms. [identity-08, identity-13, identity-20]
- **VERIFIED conflict — policy vocabulary:** TAIPs JSON schema and newer TypeScript types are not perfectly aligned in policy names/URIs. [identity-13, identity-20]
- **UNKNOWN — “TAP Parser.”** No distinct Transaction Authorization Protocol parser repository appeared in the unauthenticated current Notabene GitLab open-source project list. The npm `tap-parser` result is for Test Anything Protocol. This is an absence in scoped discovery, not proof no historical/renamed repository exists. [identity-00, identity-13]

## Source Quality Assessment

- **Tier 1, strongest:** current official Developer Hub Markdown/OpenAPI, official TAIPs schemas/prose, exact public repository source pinned to commit. These directly support shapes, APIs and algorithms. [identity-01 through identity-20 as classified in source registry]
- **Tier 1 with version caveat:** Developer Hub contains both V1 and V2 generations. `updatedAt` dates are useful but do not guarantee that an older endpoint is supported for a new integration.
- **Tier 2:** official Notabene product pages/search snippets are useful for discovery but were not relied on for detailed cryptographic claims when primary docs/code existed.
- **Search evidence:** archived only as discovery context in identity-00; no major claim rests solely on a search snippet.
- **Currentness:** sources were retrieved 2026-09-24. Repository HEADs observed that day were TAIPs `c8dd72c…`, `tap-ts` `7b996c4…`, PII SDK `2331a423…`, and JavaScript SDK `9084ba78…`. A retrieved page's update date can precede retrieval by months; no unsupported “latest/current” claim is made beyond those observations.

## Gaps & Unanswered Questions

1. **UNKNOWN:** who, operationally, has access to Node-generated signing/key-agreement private keys in each deployment model; whether they are HSM/KMS-backed; backup/rotation/deletion procedures. Nearest evidence says the Node generates keys and can decrypt hosted messages, but omits custody controls. [identity-01]
2. **UNKNOWN:** domain-control proof and recovery process for Web DID onboarding, including DNS/HTTPS compromise and key rotation overlap. [identity-01, identity-02]
3. **UNKNOWN:** exact production DIDComm cipher suites and whether all commercial Node paths now use the public `go-didcomm` library. The repository proves capabilities, not deployment. [identity-17]
4. **UNKNOWN:** current SafeConnect V2 frontend token, endpoint scopes, CORS constraints and whether the V1 five-minute customerToken remains the recommended component token. [identity-04]
5. **UNKNOWN:** V2 delegate-token TTL, revocation, claims and endpoint permission matrix. [identity-15]
6. **UNKNOWN:** exact OAuth client-secret rotation, access-token revocation, entity-to-organization binding, RBAC and multi-entity permissions. [identity-03]
7. **UNKNOWN:** full webhook signature header/algorithm/replay semantics in Notabene's configured Svix version; Notabene links externally rather than reproducing them. [identity-14]
8. **UNKNOWN:** current production storage semantics for PII, ciphertext retention, metadata visibility, audit access, deletion and backup in every encryption mode. [identity-07, identity-16, identity-18]
9. **UNKNOWN:** whether a customer identifier is globally portable between entities or only entity-local in each product. [identity-04, identity-16]
10. **UNKNOWN:** normative compatibility matrix among TAIPs schemas, `tap-ts`, Notabene Transact V2 and any historical TAP parser/gateway. [identity-13, identity-20]

## Sources

Full metadata is in `research/identity-sources.json`. Principal sources:

- identity-01 — DIDdocs explained
- identity-02 — Key Management in DIDdocs
- identity-03 — Authentication
- identity-04 — Generate customerToken
- identity-07 — Encryption managed by the Customer
- identity-08 — Transfer payload structure
- identity-09/11/12 — TAP overview, agents and authorization
- identity-13 — `tap-ts` exact source
- identity-14 — webhook authentication
- identity-15 — delegate token OpenAPI
- identity-16 — Flow customer OpenAPI
- identity-17 — public DIDComm implementation
- identity-19 — PII SDK source at exact commit
- identity-20 — TAP schemas at exact commit