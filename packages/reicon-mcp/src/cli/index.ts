import { readFileSync, writeFileSync } from 'fs';
import { handleApplyIcon } from '../server/tools/apply-icon.js';
import { handleListCategories } from '../server/tools/list-categories.js';
import { handleSearchIcons } from '../server/tools/search-icons.js';
import { handleViewIcon } from '../server/tools/view-icon.js';
import type { Framework, IconWeight } from '../core/types.js';

function parseArgs(argv: string[]) {
  const result: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        result[key] = next;
        i++;
      } else {
        result[key] = 'true';
      }
    } else {
      positional.push(arg);
    }
  }

  return { positional, flags: result };
}

function print(data: unknown) {
  console.log(JSON.stringify(data, null, 2));
}

function applyToFile(
  filePath: string,
  marker: string,
  importStatement: string,
  usageSnippet: string,
) {
  const content = readFileSync(filePath, 'utf-8');
  if (!content.includes(marker)) {
    console.error(`Marker not found in ${filePath}: ${marker}`);
    process.exit(1);
  }

  let updated = content.replace(marker, usageSnippet);

  if (importStatement && !updated.includes(importStatement)) {
    const lines = updated.split('\n');
    let insertAt = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ') || lines[i].startsWith('<script')) {
        insertAt = i + 1;
      }
    }
    if (insertAt === 0) {
      lines.unshift(importStatement);
    } else {
      lines.splice(insertAt, 0, importStatement);
    }
    updated = lines.join('\n');
  }

  writeFileSync(filePath, updated, 'utf-8');
  print({ ok: true, file: filePath });
}

export async function run(argv: string[]) {
  const { positional, flags } = parseArgs(argv);
  const command = positional[0];

  if (!command) {
    console.error('Usage: reicon-mcp <search|view|apply|categories> [args]');
    process.exit(1);
  }

  switch (command) {
    case 'search': {
      const query = positional.slice(1).join(' ');
      if (!query) {
        console.error('Usage: reicon-mcp search <query>');
        process.exit(1);
      }
      const result = handleSearchIcons({
        query,
        weight: flags.weight as IconWeight | undefined,
        limit: flags.limit ? Number(flags.limit) : undefined,
      });
      print(result);
      if ('error' in result) process.exit(1);
      break;
    }
    case 'view': {
      const name = positional[1];
      if (!name) {
        console.error('Usage: reicon-mcp view <name> --weight Outline|Filled');
        process.exit(1);
      }
      const weight = (flags.weight as IconWeight) || 'Outline';
      const result = handleViewIcon({ name, weight });
      print(result);
      if ('error' in result) process.exit(1);
      break;
    }
    case 'apply': {
      const name = positional[1];
      if (!name) {
        console.error('Usage: reicon-mcp apply <name> --framework react|react-native|vue|svelte|html|svg [--weight Outline|Filled] [--size 24] [--color #hex] [--file path] [--marker "{/* ICON */}"]');
        process.exit(1);
      }
      const framework = (flags.framework as Framework) || 'react';
      const weight = (flags.weight as IconWeight) || 'Outline';
      const result = handleApplyIcon({
        name,
        weight,
        framework,
        size: flags.size ? Number(flags.size) : undefined,
        color: flags.color,
        componentName: flags.componentName,
      });
      if ('error' in result) {
        print(result);
        process.exit(1);
      }
      if (flags.file && flags.marker) {
        applyToFile(flags.file, flags.marker, result.importStatement, result.usageSnippet);
      } else {
        print(result);
      }
      break;
    }
    case 'categories': {
      print(handleListCategories());
      break;
    }
    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}
