#!/usr/bin/env node

const { existsSync } = require('fs');
const { join } = require('path');
const { pathToFileURL } = require('url');

const args = process.argv.slice(2);
const root = join(__dirname, '..');
const base = existsSync(join(root, 'server', 'index.js')) ? root : join(root, 'dist');

if (args.length === 0) {
  import(pathToFileURL(join(base, 'server/index.js')).href);
} else {
  import(pathToFileURL(join(base, 'cli/index.js')).href).then((mod) => {
    mod.run(args).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  });
}
