#!/usr/bin/env node

import {
  cp,
  lstat,
  mkdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const outputIndex = args.indexOf('--output');
const outputArg = outputIndex >= 0 ? args[outputIndex + 1] : undefined;
const force = args.includes('--force');
const includePrivateResearch = args.includes('--include-private-research');
const knownArguments = new Set([
  '--force',
  '--include-private-research',
  '--output',
]);

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (argument === '--output') {
    index += 1;
    continue;
  }
  if (!knownArguments.has(argument)) {
    throw new Error(`Unknown argument: ${argument}`);
  }
}

if (outputIndex >= 0 && !outputArg) {
  throw new Error('--output requires a directory path');
}

const destination = path.resolve(
  process.cwd(),
  outputArg ?? '.portable-export/notabene-technical-xray',
);

const portableRoot = path.join(root, '.portable-export');
if (destination === root || (destination.startsWith(`${root}${path.sep}`) &&
    !destination.startsWith(`${portableRoot}${path.sep}`))) {
  throw new Error(
    'Refusing to export over the repository. Use an external path or .portable-export/.',
  );
}
// A symlink in an output ancestor could turn a seemingly safe path into the source tree.
let existingAncestor = destination;
while (!(await lstat(existingAncestor).then(() => true, () => false))) {
  const parent = path.dirname(existingAncestor);
  if (parent === existingAncestor) throw new Error('No existing output ancestor');
  existingAncestor = parent;
}
const actualDestination = path.join(
  await realpath(existingAncestor),
  path.relative(existingAncestor, destination),
);
if (actualDestination === root ||
    (actualDestination.startsWith(`${root}${path.sep}`) &&
      !actualDestination.startsWith(`${portableRoot}${path.sep}`))) {
  throw new Error('Refusing output path resolving into the repository');
}

const publishableAllowlist = [
  '.gitignore',
  'LICENSE-NOTES.md',
  'README.md',
  'DEPLOYMENT.md',
  'research/final-handoff.md',
  'research/handoff-state.md',
  'research/browser-verification.md',
  'research/simulator-verification.md',
  'research/security-verification.md',
  'QUESTIONS_FOR_NOTABENE.md',
  'TECHNICAL_REPORT.md',
  'llms.txt',
  'llms-full.txt',
  'package.json',
  'tsconfig.base.json',
  'artifacts/notabene-xray/components.json',
  'artifacts/notabene-xray/index.html',
  'artifacts/notabene-xray/package.json',
  'artifacts/notabene-xray/public',
  'artifacts/notabene-xray/src',
  'artifacts/notabene-xray/tsconfig.json',
  'artifacts/notabene-xray/vite.config.ts',
  'scripts/build-portable.mjs',
  'scripts/export-portable.mjs',
  'scripts/scan-secrets.mjs',
];

const privateResearchAllowlist = [
  'architecture',
  'data',
  'research',
  'corpus',
  'evidence',
  'ai',
  'scripts/build-evidence.mjs',
  'scripts/build-portable-evidence.mjs',
];

const blockedNames = new Set([
  '.agents',
  '.cache',
  '.conversation',
  '.git',
  '.local',
  '.npmrc',
  '.replit',
  '.replit-artifact',
  '.ssh',
  '.yarn',
  'node_modules',
  'dist',
]);
const secretPattern = /(^|\/)(\.env(?:\..*)?|\.netrc|\.pypirc|(?:secret|credentials)\.json|.*\.(?:pem|key|p12|pfx))$/i;

function filter(source) {
  const relative = path.relative(root, source).split(path.sep).join('/');
  if (!relative) return true;
  if (relative.startsWith('../') || relative === '..' || path.isAbsolute(relative)) {
    throw new Error('Source escaped repository');
  }
  if (relative.split('/').some((part) => blockedNames.has(part))) return false;
  return !secretPattern.test(relative);
}

async function safeFilter(source) {
  if (!filter(source)) return false;
  if ((await lstat(source)).isSymbolicLink()) {
    throw new Error(`Refusing symlink in export source: ${path.relative(root, source)}`);
  }
  return true;
}

const sentinelName = '.notabene-portable-export.json';
const sentinelPath = path.join(destination, sentinelName);
const present = await lstat(destination).then(() => true, () => false);
if (present && !(await lstat(destination)).isDirectory()) {
  throw new Error('Export destination must be a real directory, not a file or symlink');
}

if (present && force) {
  let sentinel;
  try {
    if (!(await lstat(sentinelPath)).isFile()) throw new Error('Not a regular file');
    sentinel = JSON.parse(await readFile(sentinelPath, 'utf8'));
  } catch {
    throw new Error(
      `Refusing --force: destination is not a recognized portable export: ${destination}`,
    );
  }
  if (
    sentinel?.kind !== 'notabene-technical-xray-portable-export' ||
    sentinel?.version !== 1
  ) {
    throw new Error(
      `Refusing --force: destination has an invalid export sentinel: ${destination}`,
    );
  }
  await rm(destination, { recursive: true, force: true });
} else if (present) {
  throw new Error(`Destination already exists: ${destination}`);
}

await mkdir(destination, { recursive: true });
const allowlist = includePrivateResearch
  ? [...publishableAllowlist, ...privateResearchAllowlist]
  : publishableAllowlist;
for (const relative of allowlist) {
  if (path.isAbsolute(relative) || relative.split(/[\\/]/).includes('..')) {
    throw new Error(`Invalid allowlist path: ${relative}`);
  }
  const source = path.join(root, relative);
  if (!(await lstat(source).then(() => true, () => false))) continue;
  if (relative === 'package.json') {
    const manifest = JSON.parse(await readFile(source, 'utf8'));
    // Never ship the imported workspace's connector SDK or Replit-specific tooling.
    const portable = {
      name: manifest.name,
      version: manifest.version,
      private: true,
      type: 'module',
      engines: manifest.engines,
      workspaces: ['artifacts/notabene-xray'],
      scripts: {
        dev: manifest.scripts.dev,
        evidence: manifest.scripts.evidence,
        build: manifest.scripts.build,
        preview: manifest.scripts.preview,
        export: manifest.scripts.export,
        'typecheck:app': 'tsc -p artifacts/notabene-xray/tsconfig.json --noEmit',
        'scan:secrets': 'node scripts/scan-secrets.mjs .',
      },
      devDependencies: { typescript: manifest.devDependencies.typescript },
    };
    await writeFile(path.join(destination, relative), `${JSON.stringify(portable, null, 2)}\n`);
    continue;
  }
  if (relative === 'artifacts/notabene-xray/package.json') {
    const manifest = JSON.parse(await readFile(source, 'utf8'));
    const dependencies = Object.keys({
      ...manifest.dependencies,
      ...manifest.devDependencies,
      ...manifest.optionalDependencies,
    });
    if (dependencies.some((name) => name.startsWith('@replit/'))) {
      throw new Error('Portable web workspace contains a Replit runtime dependency');
    }
  }
  await cp(source, path.join(destination, relative), {
    recursive: true,
    preserveTimestamps: true,
    filter: safeFilter,
  });
}

await writeFile(
  sentinelPath,
  `${JSON.stringify(
    {
      kind: 'notabene-technical-xray-portable-export',
      version: 1,
      mode: includePrivateResearch ? 'private-research' : 'publishable',
    },
    null,
    2,
  )}\n`,
);

// Fail closed on detected credentials, including members of downloadable ZIPs.
// The destination was created by this invocation, so it is safe to remove on failure.
const scanCode = await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [path.join(destination, 'scripts/scan-secrets.mjs'), destination], {
    cwd: destination,
    stdio: 'inherit',
  });
  child.once('error', reject);
  child.once('exit', (code) => resolve(code));
});
if (scanCode !== 0) {
  await rm(destination, { recursive: true, force: true });
  throw new Error('Secret scan failed; generated export removed. Review redacted paths and types above.');
}

console.log(
  `${includePrivateResearch ? 'Private-research' : 'Publishable'} portable export written to ${destination}`,
);
if (includePrivateResearch) {
  console.warn(
    'This export includes research captures with unestablished redistribution rights. Do not publish it as a public repository or site.',
  );
}