#!/usr/bin/env node

// Offline, redacted heuristic scan. Never print the matched bytes or surrounding lines.
import { lstat, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = process.argv.slice(2);
const ignored = new Set(['.git', '.local', '.cache', '.conversation', '.yarn', 'node_modules', 'dist', '.portable-export']);
const maxFile = 32 * 1024 * 1024;
const maxArchive = 128 * 1024 * 1024;
const maxEntry = 32 * 1024 * 1024;
const findings = [];
const errors = [];
let files = 0;
let entries = 0;
let archiveBytes = 0;
const rules = [
  ['private-key-block', /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/g],
  ['mailgun-key', /\b(?:key|pubkey)-[a-f0-9]{32}\b/gi],
  ['mailgun-credential-assignment', /\b(?:mailgun[_-]?(?:api[_-]?)?(?:key|secret|token)|MG_API_KEY)\b["'\s:=]{1,30}["']?(?!your[_ -]|example|sample|dummy|test|fake|replace|changeme|<|{|\$)[a-z0-9_\-]{20,}/gi],
  ['aws-access-key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ['github-token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{70,}\b/g],
  ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  ['stripe-live-key', /\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b/g],
  ['google-api-key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['credential-assignment', /\b(?:api[_-]?key|client[_-]?secret|auth[_-]?token|password)\b["'\s:=]{1,15}["']?(?!your[_ -]|example|sample|dummy|test|fake|replace|changeme|<|{|\$)[A-Za-z0-9_+/=-]{32,}/gi],
];

function isLegislationCitation(content, index) {
  const before = content.slice(Math.max(0, index - 500), index);
  // UK legislation uses #commentary-key-<hex> and #reference-key-<hex>
  // as public citation anchors, not Mailgun API credentials.
  if (/https?:\/\/(?:www\.)?legislation\.gov\.uk\/[^\s)"']{0,450}#(?:commentary|reference)-$/i.test(before)) return true;
  if (!content.includes('http://www.legislation.gov.uk/namespaces')) return false;
  // The same public IDs occur as XML metadata references in its source XML.
  const tag = before.match(/<([a-zA-Z:][\w:-]*)[^<>]*$/)?.[1];
  const attribute = before.match(/([a-zA-Z:][\w:-]*)\s*=\s*['"][^'"]*$/)?.[1];
  return (tag === 'ukm:UnappliedEffect' && attribute === 'EffectId') ||
    (tag === 'Addition' && ['ChangeId', 'CommentaryRef'].includes(attribute)) ||
    (tag === 'Commentary' && attribute === 'id');
}

function scan(bytes, label) {
  if (bytes.includes(0)) return;
  const content = bytes.toString('utf8');
  for (const [type, pattern] of rules) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      if (type === 'mailgun-key' && isLegislationCitation(content, match.index)) continue;
      const line = content.slice(0, match.index).split('\n').length;
      findings.push({ path: label, line, type });
      if (findings.length >= 1000) throw new Error('Finding limit reached; scan incomplete');
    }
  }
}

function command(file, args, limit) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const chunks = [];
    let size = 0;
    child.stdout.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) child.kill();
      else chunks.push(chunk);
    });
    // Do not print archive tool stderr: it can contain member names or contents.
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0 || size > limit) reject(new Error(`archive reader failed or size limit exceeded (exit ${code})`));
      else resolve(Buffer.concat(chunks));
    });
  });
}

async function scanZip(file, label, depth = 0) {
  if (depth > 3) throw new Error('nested archive depth limit exceeded');
  const names = (await command('unzip', ['-Z', '-1', file], maxArchive)).toString('utf8').split('\n').filter(Boolean);
  if (names.length > 10000) throw new Error('archive entry limit exceeded');
  for (const name of names) {
    if (name.endsWith('/')) continue;
    const parts = name.replaceAll('\\', '/').split('/');
    if (parts.some((part) => ignored.has(part))) continue;
    if (parts.some((part) => part === '..' || part === '.') || name.includes('\0') || name.includes('\n')) {
      throw new Error('unsafe archive member name');
    }
    // Reject symlink members; unzip -p could otherwise read link text rather than target.
    const data = await command('unzip', ['-p', file, name], maxEntry);
    archiveBytes += data.length;
    if (archiveBytes > maxArchive) throw new Error('aggregate archive size limit exceeded');
    entries += 1;
    if (name.toLowerCase().endsWith('.zip')) {
      const tempDir = await mkdtemp(path.join(os.tmpdir(), 'notabene-secret-scan-'));
      try {
        const tempFile = path.join(tempDir, 'nested.zip');
        await writeFile(tempFile, data);
        await scanZip(tempFile, `${label}!/${name}`, depth + 1);
      } finally {
        await rm(tempDir, { recursive: true, force: true });
      }
    } else scan(data, `${label}!/${name}`);
  }
}

async function walk(file, label) {
  const stat = await lstat(file);
  if (stat.isSymbolicLink()) { errors.push({ path: label, type: 'symlink-not-scanned' }); return; }
  if (stat.isDirectory()) {
    for (const name of await readdir(file)) {
      if (!ignored.has(name)) await walk(path.join(file, name), `${label}/${name}`);
    }
    return;
  }
  if (!stat.isFile()) return;
  files += 1;
  if (/(^|\/)(?:\.env(?:\.[^/]*)?|secret\.json|[^/]+\.(?:pem|key|p12|pfx))$/i.test(label)) {
    findings.push({ path: label, type: 'sensitive-filename' });
  }
  if (stat.size > maxFile) { errors.push({ path: label, type: 'file-size-limit' }); return; }
  if (file.toLowerCase().endsWith('.zip')) {
    try { await scanZip(file, label); }
    catch { errors.push({ path: label, type: 'zip-read-or-limit-error' }); }
  } else {
    scan(await readFile(file), label);
  }
}

if (!targets.length) targets.push('research', 'corpus', 'artifacts/notabene-xray/public');
for (const target of targets) {
  const absolute = path.resolve(target);
  try { await walk(absolute, path.relative(root, absolute) || '.'); }
  catch { errors.push({ path: target, type: 'unreadable-or-limit-error' }); }
}
for (const finding of findings) console.log(JSON.stringify(finding));
for (const error of errors) console.error(JSON.stringify(error));
console.log(`Secret scan: ${files} files, ${entries} archive members, ${findings.length} findings, ${errors.length} incomplete items. Values never printed.`);
process.exitCode = errors.length ? 2 : findings.length ? 1 : 0;