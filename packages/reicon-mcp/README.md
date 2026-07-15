# reicon-mcp

MCP server and CLI for searching, previewing, and applying Reicon icons. Works fully offline with a prebuilt search index.

## MCP Server

Add to your MCP client config:

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

Or point directly at the local binary after building:

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

### Tools

| Tool | Description |
| :--- | :--- |
| `search_icons` | Rank icons by keyword |
| `view_icon` | Return raw SVG markup and metadata |
| `apply_icon` | Generate framework-specific import and docs snippets |
| `list_categories` | List all icon categories |

## CLI

```bash
npx reicon-mcp search "shopping cart"
npx reicon-mcp view heart --weight Filled
npx reicon-mcp apply heart --framework react --size 32 --color "#ef4444"
npx reicon-mcp categories
```

### File write mode

For scripted insertion, replace a marker string in a target file:

```bash
npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"
```

The marker must exist exactly once. The command exits non-zero if the marker is not found.

## Build

From the monorepo root:

```bash
npm run build:mcp
```

MIT © [Dev Chauhan](https://devchauhan.in)
