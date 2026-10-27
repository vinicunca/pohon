# Design System

## Semantic colors

Pohon UI uses 7 semantic colors. Never use raw UnoCSS palette colors in components — always use these semantic names.

| Color | Typical palette | When to use |
|---|---|---|
| `primary` | green | CTAs, active states, brand accent, links |
| `secondary` | blue | Secondary actions, complementary highlights |
| `success` | green | Success messages, confirmations, positive states |
| `info` | blue | Informational alerts, tips, neutral highlights |
| `warning` | yellow | Warnings, caution states, pending actions |
| `error` | red | Errors, destructive actions, validation failures |
| `neutral` | slate | Text, borders, backgrounds, disabled states, chrome |

### Choosing colors for components

- **Primary action** on a page (submit, save, confirm) → `color="primary"`
- **Secondary actions** (cancel, back, alternative) → `color="neutral"` with `variant="outline"` or `"ghost"`
- **Destructive actions** (delete, remove) → `color="error"`
- **Status indicators** → match the semantic meaning: `success`, `warning`, `error`, `info`
- **Navigation and chrome** → `color="neutral"`

### Configuring colors

Each semantic color is a set of CSS variables in the app's `main.css`: 11 shades, then the shade used per color mode. Pohon UI ships no values, so every color the app uses needs this block:

```css
/* app/assets/css/main.css */
:root {
  --ui-color-primary-50: oklch(98.2% 0.018 155.826);
  /* ...every shade 100 to 900 */
  --ui-color-primary-950: oklch(26.6% 0.065 152.934);
  --ui-color-primary-foreground: var(--ui-color-primary-950); /* optional: text on `bg-primary` */
}

:root, .light {
  --ui-color-primary: var(--ui-color-primary-500);
}

.dark {
  --ui-color-primary: var(--ui-color-primary-400);
}
```

- Define all 11 shades: component themes read `-300` and `-600`, not only the base.
- Take shade values from the UnoCSS palette (`import { colors } from '@unocss/preset-wind4/colors'`) or from a custom brand ramp.
- `ui.colors` in `app.config.ts` / `vite.config.ts` does not change colors; the CSS variables above are the only source.

`neutral` follows the same pattern with `--ui-color-neutral-*`, which the text, background and border variables read. Pick its ramp for the aesthetic: `slate` (cool, professional), `gray` (true neutral), `zinc` (modern, techy), `neutral` (balanced), `stone` (warm, earthy).

### Extending with new semantic color names

To add a color beyond the defaults (e.g., `tertiary`):

1. Register it so components get the variant:

```ts
// nuxt.config.ts (Vue: the same `theme` key in the `ui()` options of vite.config.ts)
export default defineNuxtConfig({
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
    }
  }
})
```

2. Define its `--ui-color-tertiary-*` variables in CSS, as above.
3. Add its utilities in `uno.config.ts`, since `pohonColors` covers only the default colors:

```ts
theme: {
  colors: {
    ...pohonColors,
    tertiary: {
      DEFAULT: 'var(--ui-color-tertiary)',
      foreground: 'var(--ui-color-tertiary-foreground)',
      ...Object.fromEntries(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
        .map((shade) => [shade, `var(--ui-color-tertiary-${shade})`]))
    }
  }
}
```

## Semantic utility classes

Use these everywhere instead of raw palette colors:

### Text
- `color-text` — primary body text
- `color-text-muted` — secondary text (descriptions, hints)
- `color-text-toned` — medium-emphasis text (between muted and default)
- `color-text-dimmed` — tertiary text (placeholders, disabled)
- `color-text-highlighted` — emphasized text (headings, important labels)
- `color-text-inverted` — text on inverted backgrounds (pair with `bg-background-inverted`)

### Backgrounds
- `bg-background` — page background
- `bg-background-muted` — subtle backgrounds (hover states, alternating rows)
- `bg-background-elevated` — raised surfaces (cards, dropdowns)
- `bg-background-accented` — accent backgrounds (active states, selected items)
- `bg-background-inverted` — inverse background (dark on light, light on dark)

### Borders
- `border-border` — standard borders
- `border-border-muted` — subtle borders (dividers, separators)
- `border-border-accented` — accent borders (active states)
- `border-border-inverted` — inverse borders

## Variants

Most components accept a `variant` prop. Choose based on visual weight:

| Variant | Weight | When to use |
|---|---|---|
| `solid` | Highest | Primary actions, main CTAs |
| `outline` | Medium | Secondary actions, form fields |
| `soft` | Medium-low | Tags, badges, subtle buttons |
| `subtle` | Low | Background highlights, less prominent actions |
| `ghost` | Lowest | Inline actions, icon buttons, navigation items |
| `link` | Lowest | Text-only links inside content |

### Rules

- **One solid primary button per view** — everything else should be lower weight
- **Destructive buttons** use `color="error"` but not necessarily `variant="solid"` — use `variant="soft"` or `"outline"` unless it's the primary action on a confirmation dialog
- **Button groups** should use consistent variants — don't mix `solid` and `outline` siblings

## Customizing components

### `ui` prop

Override theme **slots** on a single instance — wins over global config and variants.

```vue
<PButton :ui="{ base: 'font-bold', trailingIcon: 'size-3 rotate-90' }" />
<PCard :ui="{ header: 'bg-background-muted', body: 'p-8' }" />
```

Rules for `ui` overrides:
- **Prefer `defaultVariants`** over slot class overrides when possible (e.g., changing default button variant/size).
- **Don't duplicate default classes** — check the generated theme file first to see what's already there.
- Border radius defaults come from `--ui-radius`, but you can override with `rounded-*` classes in `ui` or `class` when you need a specific radius on a component.

### `class` prop

Override the **root** (or `base`) slot only — simpler than `ui` for single-slot changes.

```vue
<PButton class="font-bold" />
```

### Finding slot names

Read the generated theme file for any component:
- **Nuxt**: `.nuxt/ui/<component>.ts`
- **Vue**: `node_modules/.pohon-ui/ui/<component>.ts`

These files show every available slot name, variant combination, and default class.

### Global config

Override `slots`, `variants`, `compoundVariants`, and `defaultVariants` globally in `app.config.ts` (Nuxt) or `vite.config.ts` (Vue):

```ts
// Nuxt — app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'font-bold'
      },
      compoundVariants: [{
        color: 'neutral',
        variant: 'outline',
        class: 'ring-border hover:bg-background-accented'
      }],
      defaultVariants: {
        color: 'neutral',
        variant: 'outline'
      }
    }
  }
})
```

Use the component `ui` prop to override slot classes; check the generated theme for available slots.

### Replace instead of merge

Classes from the `ui` prop, the `class` prop, and global config are merged onto the component defaults. To replace them instead, set the slot to a function, which receives the default classes as its argument so you can reuse part of them.

In global config it replaces the slot's own classes, so `variants` and `compoundVariants` still apply on top. In the `ui` and `class` props it runs after the variants, so it replaces the resolved classes, variants included.

```vue
<PButton :ui="{ label: () => 'text-base font-bold' }" />
```

```ts
// app.config.ts, applies to every instance
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        label: () => 'text-base font-bold'
      }
    }
  }
})
```

### Theme component

Override theme for a section of the component tree without affecting the rest of the app. Renders no DOM element — uses `provide`/`inject`:

```vue
<PTheme :ui="{ button: { base: 'rounded-full' } }">
  <PButton label="Rounded" />
  <PButton label="Also rounded" />
</PTheme>
```

### Global `defaultVariants`

Override default `size` and `color` for **all** components at once:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ui: {
    theme: {
      defaultVariants: {
        size: 'lg',
        color: 'neutral'
      }
    }
  }
})
```

### `theme.transitions`

Controls whether interactive components get `transition-colors`. Enabled by default.

```ts
// nuxt.config.ts — disable transitions
export default defineNuxtConfig({
  ui: {
    theme: {
      transitions: false
    }
  }
})
```


### Tree-shaking with `experimental.componentDetection`

Enable automatic component detection to only generate CSS for components you actually use:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ui: {
    experimental: {
      componentDetection: true
    }
  }
})
```

For dynamic components (e.g., `<component :is="...">`), pass an array of component names to guarantee they're included:

```ts
componentDetection: ['Modal', 'DropdownMenu', 'Popover']
```

## UnoCSS theme customization

Customize UnoCSS design tokens in `main.css`:

### Fonts

```css
:root {
  --font-sans: 'Public Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Load custom fonts through `@nuxt/fonts` or your own font provider, then set the CSS variable.

### Breakpoints

```css
:root {
  --breakpoint-3xl: 1920px;
}
```

## CSS variables

Pohon UI exposes CSS variables you can override in `main.css`:

```css
:root {
  --ui-radius: 0.25rem;
  --ui-container: 80rem;
  --ui-header-height: 4rem;
}
```

### Color shade overrides

Each semantic color defaults to shade 500 in light mode, 400 in dark mode. Override per-mode:

```css
:root {
  --ui-primary: var(--ui-color-primary-700);
}
.dark {
  --ui-primary: var(--ui-color-primary-200);
}
```

You can use `var(--ui-color-<name>-<shade>)` to reference shades from the active palette (e.g., `var(--ui-color-neutral-800)` maps to whichever neutral palette is configured).

### Black/white as primary

`black` and `white` have no shades, so they can't be used in config. Set them directly:

```css
:root {
  --ui-primary: black;
}
.dark {
  --ui-primary: white;
}
```
