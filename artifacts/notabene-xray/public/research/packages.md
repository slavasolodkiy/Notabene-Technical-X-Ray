# Public npm package inventory

Snapshot: **2026-09-24**. The plain-text npm search returned 12 hits: eight attributable `@notabene/*` packages, one scoped provenance oddity, two attributable unscoped legacy packages, and one unrelated package (`@z29k/notabene`). Registry metadata was captured locally. Downloaded package code was **not executed**.

## Eight attributable scoped packages

| Package | Latest / published | Registry fact | Evidence-based assessment |
|---|---|---|---|
| `@notabene/javascript-sdk` | 2.22.0 / 2026-09-07 | GitLab open-source repository; Notabene author/maintainers; no deprecation flag | **VERIFIED attributable; ACTIVE** |
| `@notabene/nodejs` | 1.19.2 / 2026-09-03 | GitLab open-source repository; no deprecation flag | **VERIFIED attributable; LEGACY/V1-SHAPED is INFERRED** from code/cadence, not registry status |
| `@notabene/pii-sdk` | 1.17.2 / 2026-09-02 | GitLab open-source repository; no deprecation flag | **VERIFIED attributable; ACTIVE** |
| `@notabene/cli` | 1.2.1 / 2023-07-27 | Repository field points to public GitLab URL now absent from group roster/inaccessible anonymously; no deprecation flag | **VERIFIED attributable; source availability UNKNOWN; LEGACY is INFERRED** |
| `@notabene/reactnative-sdk` | 1.2.0 / 2025-02-12 | Notabene author/maintainers; repository field points to a public GitLab URL now absent/inaccessible anonymously | **VERIFIED attributable; support/source status UNKNOWN** |
| `@notabene/ops` | 1.10.0 / 2025-08-11 | Notabene author/maintainers; repository field points to `notabene/lab/ops`, not publicly accessible | **VERIFIED attributable; purpose/source/support UNKNOWN** |
| `@notabene/crypto` | 1.1.0 / 2020-10-29 | Repository is archived `Notabene-id/notabene-crypto`; no deprecation flag | **VERIFIED attributable; LEGACY/abandoned is INFERRED** |
| `@notabene/verify-proof` | 1.11.0 stable / 2025-10-02 | Notabene maintainer set; Apache-2.0; no repository declared; next-tag releases continue in registry | **VERIFIED attributable; ACTIVE is INFERRED from release cadence** |

No scoped package above has a deprecation message on the captured latest record. “No deprecation flag” must not be converted into “supported.”

## Additional and anomalous results

| Package | Classification | Evidence |
|---|---|---|
| `@notabene/appkit` 1.0.8 | **PROVENANCE ODDITY — UNKNOWN purpose** | Notabene maintainer set and scope, but package metadata says author `Reown` and repository `reown-com/appkit`. It is consistent with a Notabene-account republish, but intent/support are not established. |
| `openvasp-client` 0.2.0 | **ATTRIBUTABLE UNSCOPED LEGACY** | Repository points to archived `Notabene-id/openvasp-node-client`; maintainer `ajunge`. |
| `did-auth-express` 0.1.3 | **ATTRIBUTABLE UNSCOPED LEGACY** | Repository points to archived `Notabene-id/did-auth-express`; maintainer `ajunge`. |
| `@z29k/notabene` | **UNRELATED** | Different scope, repository and publisher; excluded from Notabene inventory. |

## Provenance limitations

- npm registry namespace/maintainer evidence establishes publication attribution, not security review or vendor support.
- `cli`, `reactnative-sdk` and `ops` source URLs are unavailable publicly at the snapshot. Private versus deleted is **UNKNOWN**.
- `verify-proof` has no declared repository, so the shipped artifact cannot be mapped to a public source commit from metadata alone.
- Local records: `research/corpus/v2-archaeology/npm/`; normalized records: `evidence/packages.json`.