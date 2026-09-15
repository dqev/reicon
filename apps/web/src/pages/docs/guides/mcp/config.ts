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

export const SEARCH_TOOL = `search_icons({ query: "heart", weight: "Filled" })`;

export const APPLY_TOOL = `apply_icon({
  name: "heart",
  weight: "Filled",
  framework: "react",
  size: 24,
  color: "#ef4444"
})`;

export const FILE_MARKER_CMD = `npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"`;
