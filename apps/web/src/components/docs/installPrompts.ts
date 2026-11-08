const PM_HINT = 'Use the package manager matching the project lockfile (pnpm, bun, yarn, or npm).';

const PROMPTS: Record<string, string> = {
  'reicon-react': `Install reicon-react. ${PM_HINT}

Import icons as named PascalCase components:
import { Home, ShieldCheck, Bell } from 'reicon-react';

Usage:
<Home size={24} />
<ShieldCheck size={24} color="#9B8AFB" />
<Bell size={24} weight="Filled" className="w-6 h-6 text-indigo-400" />

Props:
- size: number (default 24)
- weight: "Outline" (default) | "Filled"
- color: string (default "currentColor", supports Tailwind/CSS text color)
- secondaryColor, strokeWidth, className, and standard SVG props

Direct tree-shaking import:
import Home from 'reicon-react/icons/Home';`,

  'reicon-vue': `Install reicon-vue in this Vue 3 project. ${PM_HINT}

Usage in <script setup>:
import { Home, ShieldCheck, Bell } from 'reicon-vue';

<template>
  <Home :size={24} />
  <ShieldCheck :size={24} color="#9B8AFB" />
  <Bell weight="Filled" class="w-6 h-6" />
</template>

Props: :size (default 24), weight ("Outline" | "Filled"), color (default "currentColor"), class, strokeWidth.`,

  'reicon-svelte': `Install reicon-svelte. ${PM_HINT}

Usage:
<script>
  import { Home, ShieldCheck, Bell } from 'reicon-svelte';
</script>

<Home size={24} />
<ShieldCheck size={24} color="#9B8AFB" />
<Bell size={24} weight="Filled" class="w-6 h-6" />

Props: size (default 24), weight ("Outline" | "Filled"), color (default "currentColor"), class.`,

  'reicon-astro': `Install reicon-astro. ${PM_HINT}

Usage in Astro frontmatter:
---
import { Home, ShieldCheck, Bell } from 'reicon-astro';
---

<Home size={24} />
<ShieldCheck size={24} color="#9B8AFB" />
<Bell size={24} weight="Filled" class="w-6 h-6" />

Props: size (default 24), weight ("Outline" | "Filled"), color (default "currentColor"), class.`,

  'reicon-angular': `Install reicon-angular (Angular 20+ standalone). ${PM_HINT}

Usage:
import { Component } from '@angular/core';
import { HomeComponent, ShieldCheckComponent } from 'reicon-angular';

@Component({
  standalone: true,
  imports: [HomeComponent, ShieldCheckComponent],
  template: \`
    <ri-home [size]="24"></ri-home>
    <ri-shield-check [size]="24" color="#9B8AFB" weight="Filled"></ri-shield-check>
  \`,
})
export class MyComponent {}

Selectors use ri-[kebab-case] prefix. Inputs: size (default 24), weight ("Outline" | "Filled"), color (default "currentColor"), class.`,

  'reicon-react-native react-native-svg': `Install reicon-react-native and react-native-svg (${PM_HINT} - if using Expo, run 'npx expo install react-native-svg').

Usage:
import { Home, ShieldCheck, Bell } from 'reicon-react-native';

<Home size={24} />
<ShieldCheck size={24} color="#9B8AFB" />
<Bell size={24} weight="Filled" style={{ margin: 4 }} />

Props: size (default 24), weight ("Outline" | "Filled"), color (default "currentColor"), style.`,

  reicon: `Install reicon via package manager (${PM_HINT}) or via CDN:
<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>

JavaScript:
import { Home, ShieldCheck } from 'reicon';
document.body.appendChild(Home({ size: 24, weight: 'Outline' }));

Web Component:
<re-icon icon="home" size="24"></re-icon>
<re-icon icon="shield-check" size="24" weight="filled" color="#9B8AFB"></re-icon>`,

  'reicon-mcp': `Add Reicon MCP to your agent config (.cursor/mcp.json, claude_desktop_config.json, or windsurf):

{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["-y", "reicon-mcp"]
    }
  }
}

Available Agent Tools:
- search_icons({ query: "icon keyword" }) -> Search all 2,700+ Reicon icons
- view_icon({ name: "heart", weight: "Filled" }) -> Inspect SVG
- apply_icon({ name: "heart", framework: "react" }) -> Generates ready-to-use framework component & import

CLI:
npx reicon-mcp search "settings"
npx reicon-mcp apply bell --framework react`,
};

export function getInstallPrompt(packageName: string): string {
  return (
    PROMPTS[packageName] ??
    `Install ${packageName} using the project lockfile (pnpm, bun, yarn, or npm), and import icons as PascalCase named components.`
  );
}
