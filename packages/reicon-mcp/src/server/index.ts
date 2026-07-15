import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { handleApplyIcon } from './tools/apply-icon.js';
import { handleListCategories } from './tools/list-categories.js';
import { handleSearchIcons } from './tools/search-icons.js';
import { handleViewIcon } from './tools/view-icon.js';

const server = new McpServer({
  name: 'reicon-mcp',
  version: '1.1.0',
});

server.tool(
  'search_icons',
  [
    'Search 2,700+ Reicon icons by any keyword, phrase, or description.',
    'Understands synonyms ("round" → circle, "del" → delete/trash), misspellings ("calender" → calendar),',
    'multi-word queries ("user circle", "credit card", "volume up"), and name parts ("up" → arrow-up).',
    'Returns ranked matches. Short specific terms work best but full phrases also work.',
    'After getting results, pick the highest-scoring match and call apply_icon directly.',
    'Only call view_icon first if you need to inspect the raw SVG before generating code.',
  ].join(' '),
  {
    query: z.string().describe(
      'Keyword(s) or phrase — e.g. "cart", "user circle", "volume up", "credit card", "go back", "delete". Handles synonyms, misspellings, and multi-word queries.',
    ),
    weight: z
      .enum(['Outline', 'Filled'])
      .optional()
      .describe('Filter by weight. Omit to search both.'),
    limit: z
      .number()
      .int()
      .min(1)
      .max(20)
      .optional()
      .describe('Max results to return. Defaults to 8.'),
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
  [
    'Fetch raw SVG markup and metadata for a specific Reicon icon.',
    'Use this to inspect the SVG before applying, or when you only need the raw markup.',
    'For generating import/usage code, prefer apply_icon instead.',
  ].join(' '),
  {
    name: z.string().describe('Icon kebab-case name, e.g. "heart", "arrow-right", "user-circle"'),
    weight: z.enum(['Outline', 'Filled']).describe('Which weight variant to fetch'),
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
  [
    'Generate ready-to-paste import and usage code for a Reicon icon.',
    'Returns importStatement and usageSnippet for the chosen framework.',
    'Supported frameworks: react, react-native, vue, svelte, html (CDN custom element), svg (raw markup).',
    'Insert importStatement at the top of the file and usageSnippet where the icon should appear.',
    'Always call search_icons first to confirm the icon name and weight exist.',
  ].join(' '),
  {
    name: z.string().describe('Icon kebab-case name, e.g. "heart"'),
    weight: z.enum(['Outline', 'Filled']).describe('Icon weight variant'),
    framework: z
      .enum(['react', 'react-native', 'vue', 'svelte', 'html', 'svg'])
      .describe('Target framework or output format'),
    size: z
      .number()
      .int()
      .min(8)
      .max(256)
      .optional()
      .describe('Icon size in pixels. Defaults to 24.'),
    color: z
      .string()
      .optional()
      .describe('CSS color value, e.g. "#ef4444" or "currentColor". Defaults to currentColor.'),
    componentName: z
      .string()
      .optional()
      .describe('Override the component name. Defaults to the PascalCase icon name.'),
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
  [
    'List all icon categories available in the Reicon dataset.',
    'Use this to explore what types of icons exist before searching.',
    'Each category can be used as a search keyword with search_icons.',
  ].join(' '),
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
