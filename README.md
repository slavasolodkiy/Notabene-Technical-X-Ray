# Notabene Technical X-Ray v2

An evidence-linked, read-only technical explorer of Notabene's public API,
identity, Travel Rule, Flow, TAP, SDK, jurisdiction, and integration surfaces.
The included transaction trace is synthetic and local-only: it does not call
Notabene, move funds, perform KYC/KYB, or make legal or compliance decisions.

## Portable npm workflow

Requirements: Node.js 20 or newer and npm 10 or newer. No database, API,
secret, Replit service, or Replit package is required.

```sh
npm install
npm run dev
```

Development opens at `http://localhost:5173/`. To test development under the
production subpath:

```sh
BASE_PATH=/notabene/ npm run dev
```

Create the production site:

```sh
npm run build
```

The default production base is `/notabene/`, and the static output is `dist/`.
Override the base for root or another subpath:

```sh
BASE_PATH=/ npm run build
BASE_PATH=/research/xray/ npm run build
```

In the full research checkout, `npm run build` runs the base evidence builder
and then `scripts/build-portable-evidence.mjs` before Vite. In the default
publishable export, those raw-research builders are intentionally absent and
the same command validates the included prebuilt evidence before Vite. See
`DEPLOYMENT.md` for hosting-specific commands.

## Managed workspace workflow

The existing pnpm/Replit workflow remains supported. The managed artifact
continues to run:

```sh
pnpm --filter @workspace/notabene-xray run dev
pnpm --filter @workspace/notabene-xray run build
```

The managed workflow supplies `PORT` and `BASE_PATH` and retains its existing
`artifacts/notabene-xray/dist/public` output. `pnpm run build:workspace` is the
original repository-wide build orchestration command.

## Safe standalone export

Build first, then write the default **publishable** allowlisted export to a new
directory:

```sh
npm run export -- --output /tmp/notabene-technical-xray
cd /tmp/notabene-technical-xray
npm install
npm run build
```

The default export includes the app and its validated, prebuilt publication
pack. It excludes the private/raw research workspace and rebuilds without those
captures by validating and reusing the prebuilt evidence. This is the mode to
use for a public repository or deployment.

For private archival or internal reproduction only, explicitly opt into the
research captures:

```sh
npm run export -- --include-private-research \
  --output /secure/internal/notabene-technical-xray
```

Some captures have unestablished redistribution rights; never publish that
mode without a source-by-source rights review. The exporter does not create
remotes, push commits, alter Git history, or copy `.git`, `.agents`, `.local`,
`.conversation`, caches, dependencies, unrelated artifacts, or common
secret/key files.

An existing destination is always refused. `--force` works only when the
directory contains the exact sentinel written by a previous successful export;
it cannot delete an arbitrary directory.

## Repository structure

- `artifacts/notabene-xray/` — Vite/React application and public downloads
- `architecture/` — architecture reconstructions
- `data/` — machine-readable extracted datasets
- `research/` — reports, registries, archived public evidence, and provenance
- `corpus/`, `evidence/`, `ai/` — normalized/offline layers when generated
- `scripts/build-evidence.mjs` — base evidence assembler
- `scripts/build-portable-evidence.mjs` — portable evidence assembler
- `scripts/export-portable.mjs` — safe allowlisted exporter

Claims distinguish factual `VERIFIED`, `INFERRED`, and `UNKNOWN` evidence
labels from audit dispositions such as `CONFIRMED`, `CORRECTED`, `REFUTED`, and
`UNKNOWN`.

## Limits and licensing

Company documentation is primary evidence for documented behavior, not
independent proof of deployed internals. This project is not legal advice, a
security audit, or evidence of production security, regulatory compliance,
availability, key custody, data residency, or operational fitness. See
`LICENSE-NOTES.md` before redistributing the research corpus.
