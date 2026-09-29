# Deployment

## Build contract

- Runtime: Node.js 20+
- Install: `npm install` (or `npm ci` when reproducing the lockfile exactly)
- Build: `npm run build`
- Output: `dist/`
- Default public path: `/notabene/`
- Root-hosted build: `BASE_PATH=/ npm run build`

`BASE_PATH` must begin and end with `/`. Build once for the URL at which the
files will be served; do not move a subpath build to a different path without
rebuilding. The application is static and requires no server process, API,
database, environment secret, or production Notabene connection.

## Local production check

```sh
npm install
npm run build
npm run preview
```

Open `http://localhost:5173/notabene/`. For a root check, run
`BASE_PATH=/ npm run build` first and open `http://localhost:5173/`.

## Generic static host

```sh
BASE_PATH=/notabene/ npm run build
```

Upload the **contents** of `dist/` to the host's `notabene/` directory. Keep
file names and directory structure unchanged. The host must serve
`notabene/index.html` at `/notabene/` and must not rewrite evidence/download
requests to HTML.

For root hosting, build with `BASE_PATH=/` and upload the contents of `dist/`
to the document root.

## Existing `https://solodkiy.cv/notabene/`

On the deployment machine, first build for the exact public path:

```sh
 npm install
BASE_PATH=/notabene/ npm run build
```

Copy the contents of `dist/` into the existing site's document-root subfolder
named `notabene` (not into a second nested `notabene/notabene` folder). For
example, when the site's document root is `/var/www/solodkiy.cv`:

```sh
rsync -av --delete dist/ /var/www/solodkiy.cv/notabene/
```

The operator must substitute the real document root if it differs and must
review the `--delete` target before running it. Existing DNS and TLS need no
change. Verify:

```sh
curl -I https://solodkiy.cv/notabene/
curl -I https://solodkiy.cv/notabene/evidence.json
```

Then open the site and verify a real downloadable evidence URL. A missing
evidence file must return `404`, not the SPA's `index.html`. Do not add a broad
server fallback for `/notabene/downloads/`, `/notabene/evidence/`, or other
static artifact paths.

## GitHub Pages

1. Create/select the repository yourself; this project never creates or pushes
   a remote.
2. Build with the repository's Pages path. For a project site in repository
   `notabene`, use:

   ```sh
   npm ci
   BASE_PATH=/notabene/ npm run build
   ```

   For a user/organization site at the domain root, use `BASE_PATH=/`.
3. Publish `dist/` with the official Pages action, or place its contents on the
   configured Pages branch. Add an empty `dist/.nojekyll` if publishing without
   the official static Pages action.
4. Configure the Pages custom domain separately only if you own its DNS.

Hash-based navigation requires no catch-all rewrite.

## Vercel

Import the repository as a static project and set:

- Framework preset: **Vite**
- Install command: `npm ci`
- Build command: `BASE_PATH=/ npm run build`
- Output directory: `dist`

That configuration serves the app at the deployment root. To mount it below an
existing Vercel site, build with `BASE_PATH=/notabene/` in that site's build and
copy this `dist/` tree under its final `notabene/` output. Do not configure an
SPA rewrite over downloadable evidence files.

## Cloudflare Pages

Create a Pages project with:

- Production branch: the branch selected by the owner
- Build command: `BASE_PATH=/ npm run build`
- Build output directory: `dist`
- Node version: `20` (for example, `NODE_VERSION=20`)

Use `BASE_PATH=/notabene/` only when a parent site assembles this output under a
`notabene/` directory. A standalone `*.pages.dev` project normally uses `/`.

## Clean GitHub export

The exporter is local-only and performs no Git operations. Its default mode is
the publishable app plus validated prebuilt evidence; it excludes raw/private
research captures with unestablished redistribution rights:

```sh
npm install
npm run build
npm run export -- --output /tmp/notabene-technical-xray
cd /tmp/notabene-technical-xray
npm install
npm run build
git init
git add .
git status --short
git commit -m "Import Notabene Technical X-Ray v2"
```

Inspect `git status` before committing. Add a remote and push only after the
repository owner explicitly confirms the destination:

```sh
git remote add origin <OWNER-CONFIRMED-URL>
git push -u origin main
```

These last two commands are instructions for the owner; the exporter never
executes them.

The allowlisted exporter creates a minimal portable manifest without the
workbench lockfile. Run `npm install` once in a new export to create its matching
lockfile, then use `npm ci` for repeat builds. Do not push the internal workbench
captures: use the public export. The existing canonical GitHub repository has
not been changed by this handoff.

For a private internal archive only, use
`npm run export -- --include-private-research --output <SECURE-DIRECTORY>`.
That mode is not suitable for a public repository or public deployment without
a source-by-source rights review. Existing output directories are refused;
`--force` can replace only a directory bearing this exporter's sentinel.
