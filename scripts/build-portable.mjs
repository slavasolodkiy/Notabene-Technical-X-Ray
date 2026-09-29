#!/usr/bin/env node

import { access, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function exists(file) {
  return access(path.join(root, file)).then(() => true, () => false);
}

function run(file) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [file], {
      cwd: root,
      stdio: 'inherit',
    });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${file} failed (${signal ?? `exit ${code}`})`));
    });
  });
}

const baseBuilder = 'scripts/build-evidence.mjs';
const portableBuilder = 'scripts/build-portable-evidence.mjs';
const hasBaseBuilder = await exists(baseBuilder);
const hasPortableBuilder = await exists(portableBuilder);

if (hasBaseBuilder && hasPortableBuilder) {
  await run(baseBuilder);
  await run(portableBuilder);
} else if (hasBaseBuilder || hasPortableBuilder) {
  throw new Error(
    'Incomplete evidence toolchain: both build-evidence.mjs and build-portable-evidence.mjs are required when rebuilding research.',
  );
} else {
  const required = [
    'artifacts/notabene-xray/public/evidence.json',
    'artifacts/notabene-xray/public/evidence/portable-validation.json',
    'artifacts/notabene-xray/public/corpus/README.md',
    'artifacts/notabene-xray/public/ai/ontology.json',
    'artifacts/notabene-xray/public/downloads/notabene-offline-research.zip',
  ];
  const missing = [];
  for (const file of required) {
    if (!(await exists(file))) missing.push(file);
  }
  if (missing.length) {
    throw new Error(
      `Prebuilt publishable evidence is incomplete:\n${missing.join('\n')}`,
    );
  }

  const validation = JSON.parse(
    await readFile(
      path.join(
        root,
        'artifacts/notabene-xray/public/evidence/portable-validation.json',
      ),
      'utf8',
    ),
  );
  if (validation.passed !== true || validation.failures?.length) {
    throw new Error(
      'Prebuilt publishable evidence did not pass portable validation.',
    );
  }
  console.log(
    `[build-portable] using validated prebuilt publishable evidence (${validation.source_records} source records)`,
  );
}