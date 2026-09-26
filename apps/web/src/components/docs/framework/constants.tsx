export const FRAMEWORKS = [
    { id: 'vanilla', label: 'Vanilla', icon: 'js', color: '#f7df1e' },
    { id: 'react', label: 'React', icon: 'react', color: '#61DAFB' },
    { id: 'angular', label: 'Angular', icon: 'angular', color: '#DD0031' },
    { id: 'react-native', label: 'React Native', icon: 'react-native', color: '#61DAFB' },
    { id: 'vue', label: 'Vue', icon: 'vue', color: '#4DBA87' },
    { id: 'svelte', label: 'Svelte', icon: 'svelte', color: '#FF3E00' },
    { id: 'astro', label: 'Astro', icon: 'astro', color: '#FF5D01' },
    { id: 'flutter', label: 'Flutter', icon: 'flutter', color: '#02569B' },
    { id: 'compose', label: 'Compose', icon: 'compose', color: '#3DDC84' },
    { id: 'figma', label: 'Figma', icon: 'figma', color: '#F24E1E' },
    { id: 'vscode', label: 'VS Code', icon: 'vscode', color: '#007ACC' },
    { id: 'mcp', label: 'MCP Server', icon: 'mcp', color: '#9B8AFB' },
    { id: 'svg', label: 'Raw SVGs', icon: 'svg', color: '#4285F4' },
] as const;

export type Framework = typeof FRAMEWORKS[number]['id'];

export const NAV_ITEMS = {
    intro: [
        { id: 'what-is-reicon', label: 'What is Reicon?' },
    ],
    basics: [
        { id: 'props', label: 'Props' },
        { id: 'weights', label: 'Icon Weights' },
    ],
    guides: [
        { id: 'styling', label: 'Styling & Color' },
        { id: 'accessibility', label: 'Accessibility' },
        { id: 'performance', label: 'Performance' },
    ],
    advanced: [
        { id: 'typescript', label: 'TypeScript' },
        { id: 'troubleshooting', label: 'Troubleshooting' },
    ],
};
