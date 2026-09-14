<div align="center">

<br/>

<img src="https://reicon.dev/readme-assets/banner.webp" alt="Reicon Angular" width="200" />

<br/>

### Official Reicon package for Angular 20+ — open-source icon library for designers & developers

[![npm](https://img.shields.io/npm/v/reicon-angular?style=flat-square&label=reicon-angular&color=DD0031)](https://www.npmjs.com/package/reicon-angular)
[![Docs](https://img.shields.io/badge/Docs-reicon.dev-9B8AFB?style=flat-square)](https://reicon.dev/docs/angular)
[![License](https://img.shields.io/badge/License-MIT-9B8AFB?style=flat-square)](https://github.com/dqev/reicon/blob/main/LICENSE)

</div>

<br/>

**reicon-angular** provides 2676+ standalone Angular components generated from the Reicon icon dataset. It targets Angular 20 and newer, is fully TypeScript-ready, and ships with Outline and Filled weights.

## Installation

```bash
npm install reicon-angular
# or
pnpm add reicon-angular
# or
yarn add reicon-angular
```

## Quick start

Import the standalone components you use and add them to the component's `imports` array:

```ts
import { Component } from '@angular/core';
import { BellComponent, HomeComponent, ShieldCheckComponent } from 'reicon-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ShieldCheckComponent, BellComponent],
  template: `    <nav>
      <ri-home [size]="24"></ri-home>
      <ri-shield-check size="24" color="#9B8AFB"></ri-shield-check>
      <ri-bell size="24" weight="Filled"></ri-bell>
    </nav>
  `,
})
export class AppComponent {}
```

The component selectors follow the original kebab-case icon names: `home` becomes `ri-home`, while the exported class is `HomeComponent`.

## Inputs

| Input | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number \| string` | `24` | Icon width and height. |
| `color` | `string` | inherited | Primary icon color. |
| `weight` | `'Outline' \| 'Filled'` | `'Outline'` | Visual weight style. |
| `strokeWidth` | `number \| string` | source default | Override the source stroke width where supported. |
| `class` | `string` | — | CSS class applied to the SVG element. |
| `style` | `string \| Record<string, string \| number>` | — | Inline styles applied to the SVG element. |

Common `id`, `title`, `role`, `aria-label`, and `aria-hidden` inputs are forwarded to the SVG element.

## Tree-shaking

Each icon is an independent standalone component. Import only the components used by your application so Angular's build pipeline can remove unused icons.

## Requirements

- Angular 20 or newer
- TypeScript 5.8 or newer
- No runtime dependencies beyond Angular

## Related packages

See the complete Reicon ecosystem at [reicon.dev/packages](https://reicon.dev/packages).

## License

MIT © [Dev Chauhan](https://devchauhan.in)
