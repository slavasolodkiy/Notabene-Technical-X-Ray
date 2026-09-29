# Evidence pipeline repair — 2026-09-29

## Scope and inherited state

Read the continuation brief and attached previous conversation in full. The saved v2 draft, 231-operation canonical inventory, 35 root questions, distinct maps, and commit-level archaeology already existed. The earlier 157-operation headline described a scoped extraction; it was not the complete captured API. The dictionary remains 3,905 preserved scoped field-path records, not exhaustive coverage of the expanded V1 inventory.

The coordinator reported successful initial npm installation in `/tmp/notabene-canonical`, followed by a build failure for the missing JUR-19 capture. This repair ran the evidence builders only; application installation, TypeScript, browser and full static-build acceptance belong to the coordinator.

## Missing capture and targeted retrieval

Registry and documentation-manifest path checks found one missing registry capture: `research/sources/JUR-19-uk-regulation-64c.md`. All documentation-manifest paths existed. No same-name saved copy was found in the workbench corpus or temporary canonical research tree. The historical bytes, retrieval timestamp and checksum are unknown and were not reconstructed or invented.

The same registered public point-in-time XML URL was retrieved successfully:
https://www.legislation.gov.uk/uksi/2017/692/regulation/64C/2023-09-01/data.xml

The response is preserved internally as `research/sources/JUR-19-uk-regulation-64c-retrieved-2026-09-29.xml` (29,667 bytes). Registry retrieval time is `2026-09-29T15:54:01Z`; publication/operative snapshot date remains separately `2023-09-01`. The registry explicitly identifies this as a replacement retrieval, not recovery of the original capture. It contains regulation 64C paragraphs 1–9, including the £800 threshold language. No broader research was performed. JUR-13's truncated capture and its limitation remain preserved.

## Pipeline repairs

- Removed fabricated retrieval-date fallback: an absent capture date is now null, not the build timestamp. Metadata generation has a separate timestamp; source provenance notes survive packaging.
- Missing captured sources now fail portable builds explicitly instead of producing a verified metadata record with no underlying source.
- Fixed ZIP standalone-entry naming: the old writer removed the final character of standalone filenames (`llms.txt`, reports, license notes). They now retain exact names.
- Regenerated report from the corrected draft and regenerated root/research/public/download compatibility copies rather than hand-editing duplicates.
- Added regression checks for 231 endpoints, 3,905 scoped fields and 35 questions. Browser statistics distinguish six captured GitLab trees from 15 discovered organization repositories, six archived repositories and 11 package inventory records.
- Retained eight officially attributable scoped packages, one scoped provenance anomaly, two legacy unscoped packages, and the unrelated twelfth search hit outside the package inventory. TAP organization artifacts are additional research, not part of the 15 Notabene organization records.
- Preserved all 19 archaeology records and their internal references. Added individual package/commit metadata to the portable manifest and explicit distributable pointers for package, repository and commit records.
- Included authored archaeology, corrections, migration, package/repository coverage and this repair account in the offline ZIP. Raw internal captures remain withheld; only the already-authorized MIT JavaScript SDK is redistributed.
- Reviewed all twelve AI jobs; their cited paths exist in the distribution. Corrected the DIDDoc job's instruction to avoid pretending documentation/live drift is an OpenAPI comparison.

## Verification

`node --check` passed for both edited builders. Both evidence builders completed successfully: 280 canonical browser sources, 18 sections and 31 flattened downloads; portable manifest contains 370 source records (one raw SDK artifact, 369 metadata records).

The captured OpenAPI was independently recounted: V1 = 126 HTTP-method operations on 90 paths; V2 = 105 on 85 paths; total = 231. Root questions parse as 35 and fields as 3,905. The portable validator passes all manifest path/hash checks and AI/index local references. Every normalized package/repository/commit has a distributable pointer.

The ZIP was opened with `unzip -t`, and separately parsed to inspect its actual entries and compare every manifest SHA-256 against archived bytes. All twelve jobs and their 66 artifact citations resolve within the archive; SDK MIT notice and root license notes are present. No `research/sources/`, `research/corpus/`, `.git/` or `node_modules` entries are included. This is not a substitute for the coordinator's full secret scan or browser download tests.

## Limits preserved

No claims of observed production behavior, primary Japanese-law resolution, universal FATF fallback, complete migration guarantees or proprietary internals were added. VERIFIED / INFERRED / UNKNOWN distinctions and historical contradictions remain intact. Metadata-only pointers are not offline raw evidence; original URLs remain necessary to retrieve withheld source bodies.