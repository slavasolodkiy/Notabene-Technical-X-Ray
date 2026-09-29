# Final v2 handoff — 2026-09-29

## CHANGES MADE

Continued the existing GitHub snapshot rather than rebuilding. Preserved corrected research, code archaeology, industrial blueprint, all research sections and captured-source lineage. Added missing natural/legal-person and six ownership-proof controls, seven-category X-RAY mode, source-qualified custody boundaries, accessible blueprint controls, mobile stacking and reduced-motion handling. Corrected Markdown code rendering to eliminate invalid HTML/React console errors.

## AUDIT ITEMS FIXED

- Missing UK regulation capture blocked the inherited build. Retrieved only the registered point-in-time primary legislation XML, with a new retrieval date and explicit replacement provenance; no original bytes/checksum fabricated.
- Regenerated stale reports/questions/evidence from authored inputs. Counts: **105 V2 + 126 V1 = 231**, **3,905 scoped field-path records**, **35 diligence questions**, **18 sections**. Historical 157 is not a complete total.
- Repaired a ZIP writer that truncated standalone filenames; verified archive contents and checksums.
- Preserved distinct system/product and actor/entity diagrams and public/metadata-only source boundaries.
- Corrected V2/TAP amount/ref wording, unsupported chain-observation claims, and simulator branches that could imply unexecuted settlement. All behavior remains illustrative, deterministic and local.
- Hardened portable export allowlisting, symlink checks and fail-closed heuristic secret scanning; removed unrelated workspace runtime dependencies from exported package manifest.

## BUILD/TEST RESULTS

- Initial clean npm install succeeded; initial build failed on missing JUR-19. Repair history: handoff-state.md and evidence-repair.md.
- Workspace app TypeScript passes.
- Clean portable npm install succeeds: 418 packages audited, zero npm-reported vulnerabilities.
- Production builds pass for root and `/notabene/`.
- Browser checks: **111/111** on preview, root static output and subpath static output; zero final console/page/network errors.
- All 18 sections and 21 Mermaid diagrams render; distinct map checks pass.
- Each static base passes **316/316** local source/download checks with expected content rather than SPA HTML; built assets load and missing static paths return 404.
- Simulator regression tests cover **7,200** scenario combinations; all fourteen stages/eight facets retained.
- Offline research ZIP opens; **616 entries**, **370 manifest checksums** checked. Corpus distribution includes one licensed raw SDK artifact and 369 metadata records.
- Public-export heuristic scan reports zero findings. Internal captured-source candidates and broad workspace scanner results are not equivalent to public-runtime vulnerabilities; see security-verification.md. Scans are not proof that arbitrary secrets cannot exist.
- Nonblocking warnings: Recharts 2 deprecation and large Mermaid/application JavaScript chunks.

## STILL UNKNOWN

Production jurisdiction selection/precedence and FA-1000 fallback behavior; exact Japanese primary-law mapping; undocumented agent-state semantics; full Flow webhook delivery contracts; private production code, operational key custody, rotation/recovery and network behavior. Package/repository discovery does not prove production use or support. No live transaction, cryptographic, custody or legal-compliance validation was attempted.

## TARGETED NEW RESEARCH PERFORMED

Only the missing UK regulation source was retrieved. Other conclusions use preserved public captures. No broad repeat research, private endpoints, customer credentials or live transactions.

## REPOSITORY STRUCTURE

- artifacts/notabene-xray/src: existing React app and local simulator.
- data, architecture, research: authored workbench inputs and verification.
- scripts: evidence regeneration, portable export, browser and secret checks.
- corpus/evidence/ai and llms indexes: normalized evidence and analysis layer.
- artifacts/notabene-xray/public: regenerated distributable evidence/downloads.
- dist: final deployable static files, built for `/notabene/`.

## PUBLIC VS INTERNAL ARTIFACT BOUNDARY

Do not publish the whole workbench. Raw captures retain uncertain redistribution rights and example/security candidates. The allowlisted portable distribution excludes internal captures, Git history, private workspace state, caches, credentials and dependencies. Metadata-only files explicitly explain withholding and preserve original URL/checksum/reference. Public raw content is included only under the existing licensing policy. The offline ZIP is a rights-filtered archive, not a promise to redistribute every original capture.

## GITHUB STATUS

Source retrieved from https://github.com/slavasolodkiy/Notabene-Technical-X-Ray (main snapshot 9fb7ae3). No remote was created, no push performed, no history rewritten. The GitHub connection from the prior conversation is not installed in this project. Local project changes and downloadable distribution are the deliverable; the remote is unchanged.

## SOLODKIY.CV DEPLOYMENT STEPS

1. Extract the portable source distribution. Run `npm install` (then `npm ci` can reuse its generated lockfile).
2. Run `BASE_PATH=/notabene/ npm run build`.
3. Back up the existing site's notabene directory.
4. Upload only the **contents** of dist/ into that directory, preserving all other site content. Do not upload the workbench or nest another notabene directory.
5. Serve `/notabene/index.html` normally; hash routes need no fallback rewrite. Missing evidence/download URLs must return 404.
6. Check the homepage, API explorer, simulator and a real ZIP/source download.

No deployment, DNS change, site overwrite or publishing has been performed. DEPLOYMENT.md also covers generic static hosting, GitHub Pages, Vercel and Cloudflare Pages.

## BUILD COMMAND

`npm install` then `BASE_PATH=/notabene/ npm run build`.

Root alternative: `BASE_PATH=/ npm run build`. Local development: `npm run dev`.

## OUTPUT DIRECTORY

**dist/** at the repository root. Final default deliverable targets **/notabene/**.