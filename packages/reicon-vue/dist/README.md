# Reicon Vue

Vue 3 icon components for **2680+** icons in **2 weights** (Outline & Filled) — tree-shakeable, TypeScript-ready, zero config.

## Install

```bash
npm i reicon-vue
# or
bun add reicon-vue
```

## Usage

```vue
<script setup>
import { Home, ShieldCheck, AltArrowDown } from 'reicon-vue';
</script>

<template>
  <Home />
  <ShieldCheck :size="32" color="#d97757" />
  <AltArrowDown weight="Filled" />
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Icon size (number = px, string = any CSS unit) |
| `color` | `string` | `currentColor` | Primary icon color |
| `weight` | `'Outline' \| 'Filled'` | `Outline` | Icon weight / style |
| `strokeWidth` | `number \| string` | — | Override stroke width |

Plus all standard SVG/HTML attributes via `v-bind`.

### Weights

- **Outline** — clean outlined style (default)
- **Filled** — solid filled style

```vue
<template>
  <Home />                              <!-- Outline (default) -->
  <Home weight="Filled" />              <!-- Filled -->
  <Home weight="Filled" color="red" />
</template>
```

### Direct icon import (smallest bundle)

```js
import Home from 'reicon-vue/icons/Home';
```

### Styling with classes

```vue
<template>
  <!-- class is automatically merged with the base 'reicon' class -->
  <Home class="my-icon" />

  <!-- inline style is merged too -->
  <Home :style="{ marginRight: '8px' }" />

  <!-- all native SVG attrs are passed through -->
  <Home @click="handleClick" aria-label="Home icon" />
</template>
```

### Dynamic icons

```vue
<script setup>
import { Home, Settings, User } from 'reicon-vue';
import { shallowRef } from 'vue';

const currentIcon = shallowRef(Home);
</script>

<template>
  <component :is="currentIcon" :size="32" />
</template>
```

## Icon Names

Icons use PascalCase names derived from their kebab-case originals:

| Original | Import |
|----------|--------|
| `home` | `Home` |
| `shield-check` | `ShieldCheck` |
| `alt-arrow-down` | `AltArrowDown` |
| `shopping-cart` | `ShoppingCart` |

## TypeScript

Full TypeScript support out of the box:

```vue
<script setup lang="ts">
import { Home } from 'reicon-vue';
import type { IconWeight } from 'reicon-vue';

const weight: IconWeight = 'Filled';
</script>

<template>
  <Home :size="32" color="#d97757" :weight="weight" />
</template>
```

## Nuxt

Works out of the box with Nuxt 3 — just import and use:

```vue
<script setup>
import { Home } from 'reicon-vue';
</script>

<template>
  <Home :size="24" />
</template>
```

## License

MIT © [devchauhan](https://devchauhan.in)
