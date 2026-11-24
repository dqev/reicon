<div align="center">

<br/>
<br/>

<img src="https://reicon.dev/readme-assets/banner.webp" alt="Reicon MCP" width="200" />

<br/>

### Official Reicon MCP server & CLI – open-source icon library for designers & developers

[![npm](https://img.shields.io/npm/v/reicon-mcp?style=flat-square&label=reicon-mcp&color=9B8AFB)](https://www.npmjs.com/package/reicon-mcp)
[![Docs](https://img.shields.io/badge/Docs-reicon.dev-9B8AFB?style=flat-square)](https://reicon.dev/docs/mcp)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](https://github.com/dqev/reicon/blob/main/LICENSE)

</div>

<br/>

MCP server and CLI for searching, previewing, and applying 2,700+ Reicon icons. Equipped with built-in offline semantic vector search (~0.9 ms) to understand conceptual descriptions, synonyms, and misspellings without external API calls.

## Installation & Setup

Add to your MCP client configuration (Cursor, Claude Desktop, Windsurf, or Antigravity):

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

Or run directly from a local build:

```json
{
  "mcpServers": {
    "reicon": {
      "command": "node",
      "args": ["/path/to/reicon/packages/reicon-mcp/bin/run.cjs"]
    }
  }
}
```

## Recommended Agent Prompt

Add this concise prompt to your project instructions (`.cursorrules`, Claude Project instructions, or agent system prompt) to ensure agents use Reicon cleanly:

```markdown
Always use the `reicon` MCP tools to find and place icons:
1. Search first: Call `search_icons({ query: "<concept>" })` (e.g. "padlock", "cinema", "trash", "calendar"). Semantic matching and typos are handled automatically. Never guess icon names.
2. Apply directly: Call `apply_icon({ name: "<name>", framework: "<react|vue|svelte|html|svg>", weight: "Outline" })` and insert the returned `importStatement` and `docsSnippet`.
3. Rules: Use Outline by default (Filled only for selected/active states). Use `currentColor` for color. Never draw custom SVG paths when Reicon has the concept.
```

## MCP Tools

| Tool | Description |
| :--- | :--- |
| `search_icons` | Semantic search across 2,700+ icons by keyword, concept, or description. |
| `view_icon` | Return raw optimized SVG markup and metadata. |
| `apply_icon` | Generate ready-to-paste framework imports and component snippets. |
| `list_categories` | List all available icon categories. |

## CLI

You can also use `reicon-mcp` directly from the command line:

```bash
# Semantic search by concept or keyword
npx reicon-mcp search "padlock"
npx reicon-mcp search "cinema"

# Preview icon metadata and SVG
npx reicon-mcp view heart --weight Filled

# Generate framework code
npx reicon-mcp apply heart --framework react --size 24 --color "currentColor"

# List categories
npx reicon-mcp categories
```

### File Write Mode

For automated scripts and CI, replace a marker string in a target file:

```bash
npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"
```

The marker must exist exactly once in the file.

## License

Free for commercial and personal use under the [MIT License](https://github.com/dqev/reicon/blob/main/LICENSE).

## Credits

Thank you to all the people who contributed and supported Reicon!

<a href="https://github.com/dqev/reicon/stargazers">
  <img src="https://reicon.dev/readme-assets/stargazers.webp" alt="Reicon Stargazers & Contributors" width="800" />
</a>
