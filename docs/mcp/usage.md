# Usage of Reicon MCP Server

The `reicon-mcp` package exposes Reicon icons to AI agents and automation tools through the Model Context Protocol. Agents can search the icon library, inspect SVG markup, and generate copy-pasteable code snippets for React, Vue, Svelte, HTML, or raw SVG without human intervention.

## What you can accomplish
- Search 2,700+ icons by keyword with ranked results
- Preview raw SVG markup before applying an icon
- Generate framework-specific import and usage snippets
- Browse icons by category
- Run the same logic from a CLI for scripts and CI

---

## Installation

Install from npm or build from the monorepo:

```bash
npm install reicon-mcp
```

From source:

```bash
git clone https://github.com/dqev/reicon.git
cd reicon
npm run build:mcp
```

---

## MCP Configuration

Add the server to your MCP client. With no arguments, `reicon-mcp` starts a stdio MCP server.

```json
{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["reicon-mcp"]
    }
  }
}
```

For a local development build:

```json
{
  "mcpServers": {
    "reicon": {
      "command": "node",
      "args": ["./packages/reicon-mcp/bin/run.cjs"]
    }
  }
}
```

---

## Agent Workflow

A typical two-step flow for an agent adding an icon to a React component:

1. **Search** with concise keywords (not full sentences):

```
search_icons({ query: "heart", weight: "Filled" })
```

2. **Apply** the chosen icon:

```
apply_icon({
  name: "heart",
  weight: "Filled",
  framework: "react",
  size: 24,
  color: "#ef4444"
})
```

The tool returns `{ importStatement, usageSnippet }`. The agent uses its own file edit tools to insert the code.

---

## Tools Reference

### search_icons

Input: `{ query: string, weight?: "Outline" | "Filled", limit?: number }`

Returns ranked results with `name`, `weight`, `category`, `tags`, and `score`. Queries that look like full sentences are rejected. Use short keywords like `cart`, `user`, or `settings`.

### view_icon

Input: `{ name: string, weight: "Outline" | "Filled" }`

Returns the raw optimized SVG string plus `viewBox`, `tags`, and `category`.

### apply_icon

Input:

```ts
{
  name: string;
  weight: "Outline" | "Filled";
  framework: "react" | "vue" | "svelte" | "html" | "svg";
  size?: number;
  color?: string;
  componentName?: string;
}
```

Defaults: `size` 24, `color` currentColor, `componentName` is PascalCase of the icon name.

Returns `{ importStatement, usageSnippet }` matching the syntax in the React, Vue, Svelte, and CDN usage guides.

### list_categories

No input. Returns all distinct category values from the dataset.

---

## CLI Usage

The same binary supports CLI mode when arguments are provided:

```bash
npx reicon-mcp search "shopping cart"
npx reicon-mcp view heart --weight Filled
npx reicon-mcp apply heart --framework react --size 32 --color "#ef4444"
npx reicon-mcp categories
```

### Scripted file insertion

For CI or scripts without an agent supervising edits:

```bash
npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"
```

This replaces the exact marker with the usage snippet and inserts the import at the top if missing. Exits non-zero if the marker is not found.

---

## Offline Operation

The search index is bundled at build time from `data/icon-data.json`. No network calls are made at runtime. Once installed, the server works fully offline.

> **Note:** Rebuild with `npm run build:mcp` after the icon dataset changes to refresh the bundled index.
