# Using Reicon with Angular

The official Angular 20+ package for Reicon. Import standalone components generated from the shared icon dataset, customize their inputs, and let Angular tree-shake icons you do not use.

## What you can accomplish

- Import icons as standalone Angular components
- Customize size, color, weight, and stroke width
- Use Angular 20+ standalone components or import them from an NgModule
- Keep bundles small by importing only the icons your application needs
- Use standard accessibility inputs such as `title`, `role`, and `aria-label`
- Use the same Outline and Filled icon weights as every Reicon package

---

## Installation

```bash
npm install reicon-angular
# or
yarn add reicon-angular
# or
pnpm add reicon-angular
```

The package requires Angular 20 or newer and has no runtime dependency beyond Angular.

---

## Basic Usage

Import the standalone components you use into your Angular component and add their selectors to the template:

```ts
import { Component } from '@angular/core';
import { BellComponent, HomeComponent, ShieldCheckComponent } from 'reicon-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ShieldCheckComponent, BellComponent],
  template: `
    <nav>
      <ri-home [size]="24"></ri-home>
      <ri-shield-check size="24" color="#9B8AFB"></ri-shield-check>
      <ri-bell size="24" weight="Filled"></ri-bell>
    </nav>
  `,
})
export class AppComponent {}
```

Icon names are derived from the source data. For example, `home` becomes the `HomeComponent` export and the `<ri-home>` selector.

---

## Icon Inputs

```html
<ri-home [size]="32" color="#9B8AFB"></ri-home>
<ri-star weight="Filled" color="#f59e0b"></ri-star>
<ri-bell [strokeWidth]="2" aria-label="Notifications"></ri-bell>
```

| Input | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number \| string` | `24` | Icon width and height. Numbers are SVG pixels; strings accept CSS units. |
| `color` | `string` | inherited | Primary icon color via CSS `currentColor`. |
| `secondaryColor` | `string` | same as color | Secondary color token for icons that expose one. |
| `weight` | `'Outline' \| 'Filled'` | `'Outline'` | Visual weight style. |
| `strokeWidth` | `number \| string` | source default | Override the source stroke width where supported. |
| `class` | `string` | — | CSS class applied to the SVG element. |
| `style` | `string \| Record<string, string \| number>` | — | Inline styles applied to the SVG element. |

The `id`, `title`, `role`, `aria-label`, and `aria-hidden` inputs are forwarded to the generated SVG element.

---

## Styling

Icons inherit `currentColor` by default, so regular CSS and utility classes work without extra configuration:

```html
<button class="toolbar-button">
  <ri-settings class="toolbar-icon" [size]="20"></ri-settings>
  Settings
</button>
```

```css
.toolbar-button {
  color: #6554e8;
}

.toolbar-icon {
  display: inline-block;
  vertical-align: middle;
}
```

---

## NgModule applications

The generated icons are standalone components, so they can be added to an NgModule's `imports` array when working in a module-based application:

```ts
import { NgModule } from '@angular/core';
import { HomeComponent } from 'reicon-angular';

@NgModule({
  imports: [HomeComponent],
})
export class SharedModule {}
```

---

## Tree-shaking and direct imports

Each icon is generated as an independent component and exported through the package barrel. Import only the components used by the application:

```ts
import { HomeComponent, SearchComponent } from 'reicon-angular';
```

Angular's production builder can remove unused component modules from the final bundle.

---

## Accessibility

Decorative icons can be hidden from assistive technology. Meaningful icons should have a text alternative:

```html
<ri-heart aria-hidden="true"></ri-heart>
<ri-download aria-label="Download file" role="img"></ri-download>
```

Pair icons with visible text whenever possible, and avoid using an icon as the only indication of a destructive or irreversible action.

---

## TypeScript

The package exports the shared input types:

```ts
import { type IconProps, type IconWeight } from 'reicon-angular';

const weight: IconWeight = 'Filled';
const props: IconProps = { size: 32, color: '#6554e8', weight };
```

---

## License

Free for commercial and personal use under the [MIT License](https://github.com/dqev/reicon/blob/main/LICENSE).
