import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { AngularIcon, AstroIcon, FigmaIcon, FlutterIcon, ComposeIcon, McpIcon, SvelteIcon, VueIcon, SvgIcon } from '@/components/docs/framework/icons';
import { AntigravityIcon } from '../home/icons';

export interface PackageItem {
    id: string;
    name: string;
    npmPkg: string;
    description: string;
    icon: React.ReactNode;
    npmUrl?: string;
    sourceUrl: string;
    guideUrl: string;
    badge?: { label: string; color: string };
    version: string;
    registryLabel?: string;
}

export const PACKAGES: PackageItem[] = [
    {
        id: 'vanilla',
        name: 'reicon',
        npmPkg: 'reicon',
        description: 'A Reicon icon library package for web and JavaScript applications.',
        icon: <IoLogoJavascript className="text-yellow-400" size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/docs/vanilla',
        badge: { label: 'Web Component', color: '#F7DF1E' },
        version: 'v1.2.5',
    },
    {
        id: 'react',
        name: 'reicon-react',
        npmPkg: 'reicon-react',
        description: 'A Reicon icon library package for React applications.',
        icon: <FaReact className="text-[#61DAFB]" size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-react',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/docs/react',
        badge: { label: 'React Component', color: '#61DAFB' },
        version: 'v1.2.6',
    },
    {
        id: 'angular',
        name: 'reicon-angular',
        npmPkg: 'reicon-angular',
        description: 'Angular 20+ standalone icon components for Reicon. Tree-shakeable, TypeScript-ready, and generated from the shared icon dataset.',
        icon: <AngularIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-angular',
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-angular',
        guideUrl: '/docs/angular',
        badge: { label: 'Angular 20+', color: '#DD0031' },
        version: 'v1.0.2',
    },
    {
        id: 'react-native',
        name: 'reicon-react-native',
        npmPkg: 'reicon-react-native',
        description: 'React Native icon components for Reicon. Tree-shakeable, TypeScript-ready. Works with Expo and bare React Native.',
        icon: <FaReact className="text-[#61DAFB]" size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-react-native',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/docs/react-native',
        badge: { label: 'React Native', color: '#61DAFB' },
        version: 'v1.0.104',
    },
    {
        id: 'vue',
        name: 'reicon-vue',
        npmPkg: 'reicon-vue',
        description: 'Vue 3 icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with Nuxt 3.',
        icon: <VueIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-vue',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/docs/vue',
        badge: { label: 'Vue 3 Component', color: '#41B883' },
        version: 'v1.1.104',
    },
    {
        id: 'svelte',
        name: 'reicon-svelte',
        npmPkg: 'reicon-svelte',
        description: 'Svelte icon components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with SvelteKit.',
        icon: <SvelteIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-svelte',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/docs/svelte',
        badge: { label: 'Svelte Component', color: '#FF3E00' },
        version: 'v1.0.105',
    },
    {
        id: 'astro',
        name: 'reicon-astro',
        npmPkg: 'reicon-astro',
        description: 'Astro components for Reicon. Tree-shakeable, TypeScript-ready, zero config. Works with Astro SSG and SSR.',
        icon: <AstroIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-astro',
        sourceUrl: 'https://github.com/dqev/reicon',
        guideUrl: '/docs/astro',
        badge: { label: 'Astro Component', color: '#FF5D01' },
        version: 'v1.0.1',
    },
    {
        id: 'flutter',
        name: 'reicon_flutter',
        npmPkg: 'reicon_flutter',
        description: 'Official Flutter/Dart package for Reicon. 2700+ SVG icons as path strings. Works with flutter_svg.',
        icon: <FlutterIcon size={48} />,
        npmUrl: 'https://pub.dev/packages/reicon_flutter',
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-flutter',
        guideUrl: '/docs/flutter',
        badge: { label: 'Flutter / Dart', color: '#54C5F8' },
        version: 'v1.0.0',
        registryLabel: 'pub.dev',
    },
    {
        id: 'compose',
        name: 'reicon-compose',
        npmPkg: 'reicon-compose',
        description: 'Official Jetpack Compose package for Reicon. 2700+ icons as native ImageVectors, zero runtime dependencies.',
        icon: <ComposeIcon size={48} />,
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-compose',
        guideUrl: '/docs/compose',
        badge: { label: 'Jetpack Compose', color: '#3DDC84' },
        version: 'v1.0.0',
        registryLabel: 'Maven',
    },
    {
        id: 'mcp',
        name: 'reicon-mcp',
        npmPkg: 'reicon-mcp',
        description: 'MCP server package for Reicon. Search, preview, and insert icons directly from AI assistants, Cursor, Claude, and LLM tools.',
        icon: <McpIcon size={48} />,
        npmUrl: 'https://www.npmjs.com/package/reicon-mcp',
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-mcp',
        guideUrl: '/docs/mcp',
        badge: { label: 'MCP Server', color: '#9B8AFB' },
        version: 'v1.1.103',
    },
];

export interface ToolItem {
    id: string;
    name: string;
    badge: { label: string; color: string };
    version: string;
    description: string;
    icon: React.ReactNode;
    guideUrl: string;
    primaryAction: { label: string; href: string };
    sourceUrl: string;
}

export const TOOLS: ToolItem[] = [
    {
        id: 'figma',
        name: 'reicon-figma',
        badge: { label: 'Figma Plugin', color: '#F24E1E' },
        version: 'v1.0.0',
        description: 'Integrate Reicon directly into your Figma workspace. Search, customize size/stroke weights, and insert vector shapes into your designs.',
        icon: <FigmaIcon size={48} />,
        guideUrl: '/docs/figma',
        primaryAction: { label: 'Open in Figma', href: 'https://www.figma.com/community/plugin/1652983191908763066' },
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-figma',
    },
    {
        id: 'vscode',
        name: 'reicon-vscode',
        badge: { label: 'VS Code Extension', color: '#007ACC' },
        version: 'v1.0.5',
        description: "Browse and insert Reicon icons directly into your HTML, React, Vue, Svelte, or vanilla JS code from your editor's sidebar panel.",
        icon: <VscVscodeInsiders className="text-[#007ACC]" size={48} />,
        guideUrl: '/docs/vscode',
        primaryAction: { label: 'Use', href: 'https://marketplace.visualstudio.com/items?itemName=DevChauhan.reicon' },
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-vscode',
    },
    {
        id: 'antigravity',
        name: 'reicon-antigravity',
        badge: { label: 'Antigravity / Open VSX', color: '#7CD4FF' },
        version: 'v1.0.0',
        description: 'Reicon extension for Google Antigravity and Open VSX compatible IDEs. Instant icon search and code insertion in your editor.',
        icon: <AntigravityIcon size={44} />,
        guideUrl: '/docs/vscode',
        primaryAction: { label: 'Open VSX', href: 'https://open-vsx.org/extension/dqev/reicon' },
        sourceUrl: 'https://github.com/dqev/reicon',
    },
];

export const SVG_PACKAGE = {
    name: 'reicon-svg',
    guideUrl: '/docs/svg',
    downloadUrl: '/reicon-icons.zip',
    description: 'Download the complete raw vector assets. Includes all Reicon icons in both outline and filled weights in black SVG format, fully compressed.',
    icon: <SvgIcon size={48} />,
};
