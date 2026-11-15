You are working with **Reicon** — an MIT-licensed library of 2,676 handcrafted icons in 38 categories, with Outline and Filled weights for every icon. No account, license key, or attribution required.

Packages: `reicon-react`, `reicon-vue`, `reicon-svelte`, `reicon-angular`, `reicon-astro`, `reicon-react-native`, `reicon` (vanilla JS), HTML/CDN, Flutter, and Jetpack Compose.

---

## Rules (never break these)

1. **Search before naming.** Never guess or invent an icon name. Use the MCP tool or CLI to search first.
2. **Use the exact component name.** Kebab → PascalCase: `arrow-up-right` → `ArrowUpRight`, `credit-card` → `CreditCard`.
3. **One library only.** Never mix Reicon with Lucide, Heroicons, Phosphor, Font Awesome, or emoji.
4. **Outline is the default weight.** Use `weight="Filled"` only for selected/active/emphasized states — not decoration.
5. **One weight per surface.** A nav row, toolbar, or card grid uses one weight throughout.
6. **Never hand-draw SVG** while Reicon has the concept. No `<path>` by hand.
7. **Never use `componentName` override.** It emits imports that don't exist.
8. **Accessible by default.** Decorative icon → `aria-hidden="true"`. Icon-only button → `aria-label` on the button, not the icon.
9. **`currentColor` for color.** Don't hardcode hex unless the design requires it.
10. **State the substitute.** If Reicon has no exact icon, pick the closest real one and say why in one sentence.

---

## Common search traps — use these instead

| You think | Actually use |
|---|---|
| `delete` | `trash` (not `profile-delete`) |
| `edit` | `pen-writing` |
| `save` | `floppy` |
| `terminal` | `browser-terminal` or `terminal-square` |
| `dashboard` | `grid` |
| `external link` | `arrow-up-right` |
| `drag` / `grip` | `reorder` |
| `spinner` | `loader` |
| `sync` | `refresh` |
| `git branch` | `sitemap` or `hierarchy` |
| `school` | `graduation-cap` |
| `align center` | `align-left` / `align-right` with text label |

---

## Framework install & usage

| Framework | Install | Import | Usage |
|---|---|---|---|
| React / Next.js | `npm i reicon-react` | `import { Trash } from 'reicon-react'` | `<Trash size={20} />` |
| Vue | `npm i reicon-vue` | `import { Trash } from 'reicon-vue'` | `<Trash :size="20" />` |
| Svelte | `npm i reicon-svelte` | `import { Trash } from 'reicon-svelte'` | `<Trash size={20} />` |
| Angular 20+ | `npm i reicon-angular` | `import { TrashComponent } from 'reicon-angular'` | `<ri-trash [size]="20"></ri-trash>` |
| Astro | `npm i reicon-astro` | `import { Trash } from 'reicon-astro'` | `<Trash size={20} />` |
| React Native | `npm i reicon-react-native react-native-svg` | `import { Trash } from 'reicon-react-native'` | `<Trash size={20} />` |
| Vanilla JS | `npm i reicon` | `import { Trash } from 'reicon'` | `Trash({ size: 20 })` |
| HTML / CDN | `<script src="https://unpkg.com/reicon/cdn/reicon.js"></script>` | — | `<re-icon icon="trash" size="20"></re-icon>` |
| Flutter | `reicon_flutter` | `import 'package:reicon_flutter/reicon_flutter.dart'` | `reiconSvg(Reicon.outline.trash, size: 24)` |
| Compose | `dev.reicon:reicon-compose:main-SNAPSHOT` | `import dev.reicon.Trash` | `ReiconIcon(Trash.Outline, contentDescription = "Delete")` |

**Filled weight:**
- React/Vue/Svelte/Astro/React Native/Angular: `weight="Filled"`
- CDN: `weight="filled"` (lowercase)
- Vanilla JS: `{ weight: 'Filled' }`
- Compose: `Trash.Filled` · Flutter: `Reicon.filled.trash`

---

## Props

| Prop | Type | Default |
|---|---|---|
| `size` | `number \| string` | `24` |
| `color` | `string` | `currentColor` |
| `weight` | `"Outline" \| "Filled"` | `Outline` |
| `strokeWidth` | `number \| string` | source default (Outline only) |
| `className` / `class` | `string` | — |

---

## MCP tool (if available)

```json
{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["reicon-mcp"]
    }
  }
}
```

```
search_icons({ "query": "trash", "weight": "Outline", "limit": 8 })
view_icon({ "name": "trash", "weight": "Filled" })
apply_icon({ "name": "trash", "weight": "Outline", "framework": "react", "size": 20 })
list_categories()
```

## CLI (alternative)

```bash
npx reicon-mcp search trash --weight Outline --limit 8
npx reicon-mcp view trash --weight Filled
npx reicon-mcp apply trash --framework react --size 20
npx reicon-mcp categories
```

---

## Quick intent → icon reference

| Need | Icon | Need | Icon |
|---|---|---|---|
| Home | `home` | Delete | `trash` |
| Dashboard | `grid` | Edit | `pen-writing` |
| Search | `search` | Save | `floppy` |
| Settings | `settings` | Copy | `copy` |
| Profile | `user` | Download | `download` |
| Team | `users` | Upload | `upload` |
| Notifications | `bell` | Share | `share` |
| Close / dismiss | `x` | Refresh | `refresh` |
| Back | `arrow-left` | Add | `plus` |
| Forward | `arrow-right` | Remove | `minus` |
| Expand | `chevron-down` | Confirm | `check` |
| External link | `arrow-up-right` | Filter | `filter` |
| More actions | `more-h` | Sort | `sort` |
| Menu | `menu` | Lock | `lock` |
| Calendar | `calendar` | Unlock | `lock-open` |
| Clock | `clock` | Loading | `loader` |
| Mail | `envelope` | Success | `check-circle` |
| Message | `message` | Error | `x-circle` |
| Warning | `alert-triangle` | Info | `info-circle` |
| File | `file` | Folder | `folder` |
| Image | `image` | Code | `code` |
| Credit card | `credit-card` | Cart | `shopping-cart` |
| Wallet | `wallet` | Tag / price | `tag` |
| Star / favorite | `star` | Heart / like | `heart` |
| Shield / secure | `shield-check` | Key | `key` |
| Globe | `globe` | Database | `database` |
| Terminal | `browser-terminal` | Bug | `bug` |
| Drag / reorder | `reorder` | Layers | `layers` |
| Empty box | `box` | No results | `search` |
| Brand logos | use `reicon-file` | Flags | use `data/flag.json` |

---

## When Reicon has no exact icon (fallback ladder)

1. Search synonyms and category list first.
2. Use the nearest concept with a visible text label.
3. Terminal/dev tooling → `browser-terminal` or `terminal-square`.
4. Hierarchy/branches → `sitemap`, `hierarchy`, or `diagram`.
5. File-type / tech marks → `reicon-file` (vanilla JS / CDN web component).
6. Brand logos / flags → official SVG asset, not a package import.
7. No match at all → use text or a simple CSS shape. Never draw a new SVG.

---

## Output format

After adding icons, return:

1. The code change.
2. One line per icon: `Icon: trash → Trash (ui, Outline)`.
3. One sentence explaining the choice — only if not obvious.

If a concept is missing: `No exact Reicon icon for X; used Y because Z.`

Do not dump icon lists, alternatives, or install instructions if Reicon is already in the project.

