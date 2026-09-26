import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { AngularIcon, AstroIcon, FigmaIcon, FlutterIcon, ComposeIcon, McpIcon, SvelteIcon, VueIcon, SvgIcon } from '@/components/docs/framework/icons';

export interface PackageItem {
    id: string;
    name: string;
    npmPkg: string;
    description: string;
    icon: React.ReactNode;
    npmUrl: string;
    sourceUrl: string;
    guideUrl: string;
    versionBadge?: string;
    downloadsBadge?: string;
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
        versionBadge: 'https://img.shields.io/pub/v/reicon_flutter?color=9B8AFB',
        downloadsBadge: 'https://img.shields.io/pub/likes/reicon_flutter?color=9B8AFB',
        registryLabel: 'pub.dev',
    },
    {
        id: 'compose',
        name: 'reicon-compose',
        npmPkg: 'reicon-compose',
        description: 'Official Jetpack Compose package for Reicon. 2700+ icons as native ImageVectors, zero runtime dependencies.',
        icon: <ComposeIcon size={48} />,
        npmUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-compose',
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-compose',
        guideUrl: '/docs/compose',
        versionBadge: 'https://img.shields.io/badge/version-1.0.0-3DDC84',
        downloadsBadge: 'https://img.shields.io/badge/compose-ready-3DDC84',
        registryLabel: 'Maven',
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
        id: 'mcp',
        name: 'reicon-mcp',
        badge: { label: 'MCP Server', color: '#9B8AFB' },
        version: 'v1.1.102',
        description: 'Search, preview, and apply Reicon icons from AI agents and automation tools via MCP or CLI.',
        icon: <McpIcon size={48} />,
        guideUrl: '/docs/mcp',
        primaryAction: { label: 'npm', href: 'https://www.npmjs.com/package/reicon-mcp' },
        sourceUrl: 'https://github.com/dqev/reicon/tree/main/packages/reicon-mcp',
    },
];

export const SVG_PACKAGE = {
    name: 'reicon-svg',
    guideUrl: '/docs/svg',
    downloadUrl: '/reicon-icons.zip',
    description: 'Download the complete raw vector assets. Includes all Reicon icons in both outline and filled weights in black SVG format, fully compressed.',
    icon: <SvgIcon size={48} />,
};
