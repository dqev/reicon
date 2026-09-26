import { Framework } from './constants';

export function getFrameworkSectionId(framework: Framework): string {
  switch (framework) {
    case 'react': return 'react-docs';
    case 'angular': return 'angular-docs';
    case 'react-native': return 'react-native-docs';
    case 'vue': return 'vue-docs';
    case 'svelte': return 'svelte-docs';
    case 'astro': return 'astro-docs';
    case 'flutter': return 'flutter-docs';
    case 'compose': return 'compose-docs';
    case 'figma': return 'figma';
    case 'vscode': return 'vscode';
    case 'mcp': return 'mcp';
    case 'svg': return 'svg-docs';
    default: return 'cdn';
  }
}

export function getFrameworkLabel(framework: Framework): string {
  switch (framework) {
    case 'react': return 'React';
    case 'angular': return 'Angular';
    case 'react-native': return 'React Native';
    case 'vue': return 'Vue';
    case 'svelte': return 'Svelte';
    case 'astro': return 'Astro';
    case 'flutter': return 'Flutter';
    case 'compose': return 'Compose';
    case 'figma': return 'Figma';
    case 'vscode': return 'VS Code';
    case 'mcp': return 'MCP Server';
    case 'svg': return 'Raw SVGs';
    default: return 'Vanilla JS / CDN';
  }
}

export function isStandaloneFramework(framework: Framework): boolean {
  return framework === 'flutter' || framework === 'compose' || framework === 'figma' || framework === 'vscode' || framework === 'mcp' || framework === 'svg';
}

export const MCP_ON_THIS_PAGE = [
  { id: 'mcp', label: 'MCP Server' },
  { id: 'mcp-installation', label: 'Installation' },
  { id: 'mcp-configuration', label: 'MCP Configuration' },
  { id: 'mcp-agent-workflow', label: 'Agent Workflow' },
  { id: 'mcp-tools-reference', label: 'Tools Reference' },
  { id: 'mcp-cli', label: 'CLI Docs' },
  { id: 'mcp-file-insertion', label: 'Scripted File Insertion' },
  { id: 'mcp-offline-operation', label: 'Offline Operation' },
] as const;

export const VSCODE_ON_THIS_PAGE = [
  { id: 'vscode', label: 'VS Code' },
  { id: 'vscode-installation', label: 'Installation' },
  { id: 'vscode-workflow', label: 'Workflow & Sidebar Panel' },
] as const;

export const FIGMA_ON_THIS_PAGE = [
  { id: 'figma', label: 'Figma' },
  { id: 'figma-installation', label: 'Installation' },
  { id: 'figma-workflow', label: 'Workflow & Guide' },
] as const;

export const SVG_ON_THIS_PAGE = [
  { id: 'svg-docs', label: 'Raw SVGs' },
  { id: 'svg-download', label: 'Download ZIP Archive' },
  { id: 'svg-embedding', label: 'Embedding in HTML' },
  { id: 'svg-styling', label: 'Dynamic Styling via CSS' },
] as const;

export const COMPOSE_ON_THIS_PAGE = [
  { id: 'compose-docs', label: 'Compose' },
  { id: 'compose-installation', label: 'Installation' },
  { id: 'compose-usage', label: 'Basic Usage' },
  { id: 'compose-tint', label: 'Tint & Weight' },
  { id: 'compose-complete', label: 'Full Composable Example' },
] as const;

export const FLUTTER_ON_THIS_PAGE = [
  { id: 'flutter-docs', label: 'Flutter' },
  { id: 'flutter-installation', label: 'Installation' },
  { id: 'flutter-usage', label: 'Basic Usage' },
  { id: 'flutter-svg', label: 'Flutter + flutter_svg' },
  { id: 'flutter-runtime', label: 'Runtime Lookup' },
  { id: 'flutter-complete', label: 'Full Widget Example' },
] as const;

export function getOnThisPageSections(framework: Framework): { id: string; label: string }[] {
  if (framework === 'mcp') return [...MCP_ON_THIS_PAGE];
  if (framework === 'vscode') return [...VSCODE_ON_THIS_PAGE];
  if (framework === 'figma') return [...FIGMA_ON_THIS_PAGE];
  if (framework === 'svg') return [...SVG_ON_THIS_PAGE];
  if (framework === 'flutter') return [...FLUTTER_ON_THIS_PAGE];
  if (framework === 'compose') return [...COMPOSE_ON_THIS_PAGE];

  const frameworkEntry = {
    id: getFrameworkSectionId(framework),
    label: getFrameworkLabel(framework),
  };

  if (isStandaloneFramework(framework)) return [frameworkEntry];

  return [
    frameworkEntry,
    { id: 'props', label: 'Props' },
    { id: 'weights', label: 'Icon Weights' },
    { id: 'styling', label: 'Styling & Color' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'performance', label: 'Performance' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  ];
}
