# SDK and protocol chronology

Snapshot: **2026-09-24**. This chronology is a compact view of the commit-level record in `research/code-archaeology.md` and `evidence/commits.json`.

| Date | Public evidence | Finding |
|---|---|---|
| 2022-07-19 | Node commit recorded in preserved GitLab history | **VERIFIED:** PII encryption/decryption was added to create/update/info flows. |
| 2024-07-17–12-09 | JavaScript commits `918a87ff…`, `d568229b…`, `d17935bb…` | **VERIFIED:** secure message-channel, redirect/mobile, and popup transport evolved. |
| 2025-10-15 | PII `42a4efc0…` | **VERIFIED:** libsodium-provider/ECDH-1PU source and tests added. **UNKNOWN:** independent support for the commit message's “14x” performance claim. |
| 2025-11-20 | PII `3ea4e3a3…` | **VERIFIED:** HYBRID mode encrypts to both escrow keys. |
| 2025-11-28 | JS `e32555ea…`; TAIPs `65b1cf2d…` | **VERIFIED:** `xpub` removed from proof types; initial TAIP-19 ISO 20022 mapping added. |
| 2026-03-17 | TAIPs `ed644e3d…` | **VERIFIED:** TAIP-20 gained concrete blockchain-memo references. This is evolution, not proof of initial creation. |
| 2026-04-13 | JS `eed7a642…` | **VERIFIED:** `customerIdentification` moved into `NaturalPersonV2`. |
| 2026-05-01 | TAIPs `f8207e3e…`, `e1a351b1…`, `d9ef6185…` | **VERIFIED:** TAIP-17 Escrow→Lock, TAIP-18 Exchange→RFQ, and TypeScript package extraction to tap-ts. |
| 2026-06-30 | JS `5b0a15dd…`, `2ceb2018…` | **VERIFIED:** V1 transformer helpers removed; V2 counterparty `accountNumber` changed to blockchain destination/source address. |
| 2026-07-08–28 | go-didcomm `383a8172…`, `b08fac2a…`, `7f02e744…`, `d6dbc6f2…` | **VERIFIED:** ECDH-1PU, XChaCha20, X25519 recipient handling, canonical DIDDoc emission. |
| 2026-07-09–10 | JS `f448d879…`, `b573f473…`, `1603b8c4…` | **VERIFIED:** Counterparty Assist webhook metadata, public decrypt helper and connection correlation added. |
| 2026-09-02–07 | npm registry | **VERIFIED:** PII 1.17.2, Node 1.19.2 and JavaScript 2.22.0 stable releases. |

## Interpretation boundary

- **INFERRED:** public work concentrates on V2 transformation, SafeConnect transport, PII cryptography and TAP bindings.
- **UNKNOWN:** official V1 end-of-life date, deployment correspondence, hosted-screen source/history, and private repository lineage.
- The npm registry carries no deprecation flag on the enumerated scoped packages. Absence of a flag is not proof of active support.