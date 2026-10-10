# Documentation

Component documentation uses MDC (Markdown Components) syntax.

## File Location

Docs live in the [vinicunca/docs](https://github.com/vinicunca/docs) repository, in `content/pohon/2.components/` with kebab-case naming (e.g., `button.md`). `pohon-ui make component` writes the page there when that repo is checked out next to this one.

## Basic Structure

```md
---
description: Brief description of the component.
category: element
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/pohon/blob/main/src/runtime/components/ComponentName.vue
---

## Usage

Use the default slot to set the content.

::component-code
---
slots:
  default: Content
---
::

### Label

Use the `label` prop to set the label.

::component-code
---
props:
  label: Label
---
::

### Color

Use the `color` prop to change the color.

::component-code
---
props:
  color: neutral
slots:
  default: Content
---
::

## Examples

### `class` prop

Use the `class` prop to override base styles.

::component-code
---
props:
  class: 'font-bold rounded-full'
slots:
  default: Content
---
::

### `ui` prop

Use the `ui` prop to override slot styles.

::component-code
---
prettier: true
ignore:
  - ui
props:
  ui:
    label: 'text-primary'
slots:
  default: Content
---
::

## API

### Props

:component-props

::callout{icon="i-simple-icons-mdnwebdocs" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports native HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme

## Changelog

:component-changelog
```

## Frontmatter

Required fields:

```yaml
---
description: Brief description of the component.
category: element  # reuse an existing category from content/pohon/2.components/
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/pohon/blob/main/src/runtime/components/ComponentName.vue
---
```

Optional `keywords` feed the docs search and the MCP `search-components` tool. Use alternate names from other ecosystems, not words already in the title or description:

```yaml
keywords:
  - segmented control
  - button group
```

For Akar based components, add the Akar link:

```yaml
links:
  - label: Dialog
    icon: i-lucide-box
    to: https://akar.vinicunca.dev/docs/components/dialog
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/pohon/blob/main/src/runtime/components/Modal.vue
```

## Component Code Blocks

### Basic Usage

```md
::component-code
---
props:
  label: Button
---
::
```

### With Slots

```md
::component-code
---
slots:
  default: Button content
---
::
```

### With Multiple Props

```md
::component-code
---
props:
  color: neutral
  variant: outline
  size: lg
slots:
  default: Button
---
::
```

### Collapsed Code

Use `collapse: true` to collapse the code block (useful for long examples):

```md
::component-code
---
collapse: true
props:
  color: neutral
slots:
  default: Content
---
::
```

This also works with `::component-example`:

```md
::component-example
---
collapse: true
name: 'select-fetch-example'
---
::
```

### Prettier Formatting

For complex props, use prettier:

```md
::component-code
---
prettier: true
props:
  avatar:
    src: 'https://github.com/nuxt.png'
  ui:
    label: 'text-primary'
slots:
  default: |

    Content
---
::
```

### Ignore Props in UI

Hide specific props from the interactive playground:

```md
::component-code
---
ignore:
  - ui
  - color
props:
  color: neutral
  ui:
    label: 'font-bold'
slots:
  default: Content
---
::
```

### Dropdown Items

Add selectable options:

```md
::component-code
---
items:
  color:
    - primary
    - secondary
    - success
    - error
  size:
    - sm
    - md
    - lg
props:
  color: primary
  size: md
slots:
  default: Button
---
::
```

## Component Examples

For complex examples with setup code:

```md
:component-example{name="button-loading-auto-example"}
```

Example component in `app/components/content/examples/<component>/` of the vinicunca/docs repository:

```vue
<!-- button/ButtonLoadingAutoExample.vue -->
<script setup lang="ts">
async function onClick() {
  await new Promise(resolve => setTimeout(resolve, 2000))
}
</script>

<template>
  <PButton loading-auto @click="onClick">
    Click me
  </PButton>
</template>
```

## Callouts and Tips

### Tip

```md
::tip
You can configure this globally in your `app.config.ts`.
::
```

### Callout with Icon and Link

```md
::callout{icon="i-simple-icons-github" to="https://github.com/vinicunca/pohon"}
Check out the source code on GitHub.
::
```

### Framework-Specific Content

```md
::framework-only
#nuxt
:::tip{to="/docs/getting-started/integrations/icons/nuxt"}
Configure icons in your Nuxt config.
:::

#vue
:::tip{to="/docs/getting-started/integrations/icons/vue"}
Configure icons in your Vite config.
:::
::
```

## Writing Guidelines

1. **Use sentence case** for headings (not Title Case)
2. **Be concise** - show, don't tell
3. **Use code examples** over lengthy explanations
4. **Document all props** with examples
5. **Include `class` and `ui` examples** in every component doc
6. **Link to related components** when relevant
7. **Mark unreleased features** - When documenting a new feature or fix in a PR, append `:badge{label="Soon" class="align-text-top"}` to the heading. The docs site redeploys as soon as the PR is merged, but the feature only ships in the next npm release — the `Soon` badge bridges that gap so users don't try to use a feature that isn't in their installed version yet. The maintainer will replace `Soon` with the actual version number (e.g., `4.4+`) at release time.

```md
### With chip in items :badge{label="Soon" class="align-text-top"}
```

> **Note for PR reviewers (including AI agents):** This badge is expected on new features and fixes. Do not flag it as incorrect or inconsistent with a PR that implements the feature — it is part of the intentional release workflow (docs deploy on merge, feature ships on next release).

## Categories

| Category | Components |
|----------|------------|
| `element` | Button, Badge, Icon, Avatar, etc. |
| `form` | Input, Select, Checkbox, Form, etc. |
| `overlay` | Modal, Slideover, Popover, Toast, etc. |
| `navigation` | NavigationMenu, Breadcrumb, Tabs, etc. |
| `layout` | Card, Container, Separator, etc. |
| `data` | Table, Tree, Calendar, etc. |
| `page` | PageHero, PageSection, PageCard, etc. |
| `dashboard` | DashboardGroup, DashboardSidebar, DashboardPanel, etc. |
| `chat` | ChatMessages, ChatPrompt, ChatPalette, etc. |
| `editor` | Editor, EditorToolbar, EditorSuggestionMenu, etc. |
| `content` | ContentNavigation, ContentSearch, ContentToc, etc. |
| `color-mode` | ColorModeButton, ColorModeSelect, etc. |
| `i18n` | LocaleSelect |
