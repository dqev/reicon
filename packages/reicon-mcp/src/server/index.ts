import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { handleApplyIcon } from './tools/apply-icon.js';
import { handleListCategories } from './tools/list-categories.js';
import { handleSearchIcons } from './tools/search-icons.js';
import { handleViewIcon } from './tools/view-icon.js';

const server = new McpServer({
  name: 'reicon-mcp',
  version: '1.0.0',
});

server.tool(
  'search_icons',
  'Search Reicon icons by keyword. Returns ranked matches for agent selection.',
  {
    query: z.string().describe('Concise search keywords, not full sentences'),
    weight: z.enum(['Outline', 'Filled']).optional(),
    limit: z.number().optional(),
  },
  async (args) => {
    const result = handleSearchIcons(args);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.tool(
  'view_icon',
  'View raw SVG markup and metadata for a Reicon icon.',
  {
    name: z.string().describe('Icon kebab-case name'),
    weight: z.enum(['Outline', 'Filled']),
  },
  async (args) => {
    const result = handleViewIcon(args);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.tool(
  'apply_icon',
  'Generate copy-pasteable import and usage code for a Reicon icon.',
  {
    name: z.string(),
    weight: z.enum(['Outline', 'Filled']),
    framework: z.enum(['react', 'vue', 'svelte', 'html', 'svg']),
    size: z.number().optional(),
    color: z.string().optional(),
    componentName: z.string().optional(),
  },
  async (args) => {
    const result = handleApplyIcon(args);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
);

server.tool(
  'list_categories',
  'List all icon categories in the Reicon dataset.',
  {},
  async () => {
    const result = handleListCategories();
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
