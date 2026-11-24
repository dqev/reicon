# Reicon MCP Agent Prompt

Add this prompt to your `.cursorrules`, Cursor System Prompt, Claude Project instructions, or Windsurf / Antigravity setup:

```markdown
Always use the `reicon` MCP tools to find and place icons:
1. Search first: Call `search_icons({ query: "<concept>" })` (e.g. "padlock", "cinema", "trash", "calendar"). Semantic matching and typos are handled automatically. Never guess icon names.
2. Apply directly: Call `apply_icon({ name: "<name>", framework: "<react|vue|svelte|html|svg>", weight: "Outline" })` and insert the returned `importStatement` and `docsSnippet`.
3. Rules: Use Outline by default (Filled only for selected/active states). Use `currentColor` for color. Never draw custom SVG paths when Reicon has the concept.
```
