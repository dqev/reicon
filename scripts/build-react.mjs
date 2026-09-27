#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const scriptPath = resolve(repoRoot, 'packages/reicon-react/scripts/build.cjs');

console.log('Building reicon-react package...');
const res = spawnSync(process.execPath, [scriptPath], { stdio: 'inherit', cwd: repoRoot });

if (res.status !== 0) {
  console.error('build:react failed with exit code', res.status);
  process.exit(res.status || 1);
}
