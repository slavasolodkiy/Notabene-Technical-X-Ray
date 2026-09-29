# Public repository inventory

Snapshot: **2026-09-24**. Inventories came from unauthenticated public organization/group APIs. “Absent” means not publicly returned at the snapshot, never proof of deletion or nonexistence.

## GitLab `notabene/open-source`: six projects, no public subgroups

| Repository | Created | Public activity | Role | Assessment |
|---|---|---|---|---|
| `javascript-sdk` | 2022-06-02 | 2026-09-07 | SafeConnect wrapper, transport, types, transformers | **VERIFIED public; ACTIVE** |
| `ndar` | 2023-08-08 | 2026-09-23 | Digital Asset Registry/data publication | **VERIFIED public; ACTIVE** |
| `notabene-encryption-examples` | 2025-10-01 | 2026-09-22 | Java/Rust/TypeScript encryption examples | **VERIFIED public; low-volume activity** |
| `notabene-nodejs` | 2022-02-20 | 2026-09-03 | Backend V1-shaped SDK | **VERIFIED public; maintenance/legacy is INFERRED** |
| `pii-sdk` | 2022-05-25 | 2026-09-22 | PII crypto/storage/escrow helpers | **VERIFIED public; ACTIVE** |
| `trusthub-client` | 2026-06-26 | 2026-08-20 | IMAP-based TRUSThub token-email client | **VERIFIED public; ACTIVE/NEW** |

The count **six** is verified, but the older roster was wrong: `cli` is not returned, while `trusthub-client`, `notabene-encryption-examples`, and `ndar` are. The npm URLs for `cli` and `react-native-sdk` do not establish present public repository access.

## GitHub `Notabene-id`: nine public repositories

Coverage distinction: the workbench contains six GitLab source trees under `research/corpus/sdk/repos/`. This is a captured-tree count, not a claim that every file was reviewed. The 15 normalized organization records below comprise six GitLab plus nine Notabene-id GitHub discoveries; TAP-organization artifacts are additional protocol research and are not included in that 15. Commit/diff-level inspected coverage is itemized in `research/code-archaeology.md` and the 19 records in `evidence/commits.json`, not inferred from discovery counts.

Six are archived: `openvasp-contracts`, `openvasp-node-client`, `did-auth-express`, `daf`, `notabene-crypto`, and `CounterpartyRiskAttestation`. Three are unarchived: `flow-saas-starter` (fork), `go-didcomm`, and `skills`. **VERIFIED:** `go-didcomm` is a GitHub primary with public cryptographic commit history, not a GitLab mirror.

## TAP organization and missing-name limits

The public `TransactionAuthorizationProtocol` organization hosts the TAIPs and language implementations/bindings, including tap-ts. Attribution to Notabene is strongly supported by repository statements and shared maintainers but remains **INFERRED** because the GitHub organization is not platform-verified.

No public artifact named “TAP Parser” was found in the enumerated GitLab group, the two GitHub organizations, or npm search. Modern public validation candidates are tap-ts, tap-rs, tap-go, and TAIPs `schemas/`/`test-vectors/`. This is **scoped negative evidence**, not proof that no private or historical parser ever existed.

Likewise, Travel Rule Schemas, OpenAPI Standards, Protocol Gateway API, NodeJS SDK Example, React Native Widget Example, and Widget NextJS Example are not in the current public rosters. Their disposition is **UNKNOWN**.

Raw roster captures: `research/corpus/v2-archaeology/gitlab/projects.json`, `research/corpus/v2-archaeology/github/`. Normalized records: `evidence/repositories.json`.