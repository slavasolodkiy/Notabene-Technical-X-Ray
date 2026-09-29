# Portable evidence corpus

This corpus is an offline index, not a claim that every public web resource may be republished.

## What is included

- `repositories/javascript-sdk/` is a complete source snapshot of Notabene's JavaScript SDK at commit `8115b692e65fed8b0b63e438c3708ff17d461c47`. Its included `LICENSE.md` is MIT. `repositories/javascript-sdk.zip` is the exact downloadable raw artifact referenced by the manifest. This is the intentionally redistributed, genuinely usable offline raw SDK.
- `docs/`, `openapi/`, `schemas/`, `packages/`, and `legal/` contain machine-readable metadata records for captured sources whose redistribution license was not established.
- `snapshots/inventory.json` reports raw and metadata counts separately.
- `../evidence/source-manifest.json` is the authoritative path, checksum, retrieval, status and availability index.

Metadata-only records include the original URL, captured-workspace checksum where available, and an explicit withheld reason. They must not be described as preserved raw content. The original dated research captures remain under `research/` for project lineage, but the portable public corpus does not use their existence as a licensing conclusion.

Build with `node scripts/build-portable-evidence.mjs` after `node scripts/build-evidence.mjs`. The portable builder checks every manifest path and checksum and fails on dangling local artifact links.