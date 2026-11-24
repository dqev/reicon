export const MCP_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["reicon-mcp"]
    }
  }
}`;

export const MCP_DEV_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "node",
      "args": ["./packages/reicon-mcp/bin/run.cjs"]
    }
  }
}`;

export const RECOMMENDED_PROMPT = `Always use the \`reicon\` MCP tools to find and place icons:
1. Search first: Call \`search_icons({ query: "<concept>" })\` (e.g. "padlock", "cinema", "trash", "calendar"). Semantic matching and typos are handled automatically. Never guess icon names.
2. Apply directly: Call \`apply_icon({ name: "<name>", framework: "<react|vue|svelte|html|svg>", weight: "Outline" })\` and insert the returned \`importStatement\` and \`docsSnippet\`.
3. Rules: Use Outline by default (Filled only for selected/active states). Use \`currentColor\` for color. Never draw custom SVG paths when Reicon has the concept.`;

export const SEARCH_TOOL = `search_icons({ query: "padlock", weight: "Filled" })`;

export const APPLY_TOOL = `apply_icon({
  name: "heart",
  weight: "Filled",
  framework: "react",
  size: 24,
  color: "#ef4444"
})`;

export const FILE_MARKER_CMD = `npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"`;
