# Migrating Drawer from Vaul to Akar

Pohon Drawer now uses Akar's native drawer primitives. `vaul-vue` and its `reka-ui` dependency are removed.

## Background scaling

Replace `data-vaul-drawer-wrapper` and the drawer's `should-scale-background` / `set-background-color-on-scale` props with a styled provider around your page content:

```vue
<template>
  <PApp>
    <PDrawerProvider
      scale
      class="min-h-dvh"
      :ui="{ content: 'min-h-dvh' }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </PDrawerProvider>
  </PApp>
</template>
```

The provider scales its content whenever a descendant drawer is open. Leave the drawer's portal enabled so the drawer renders outside the scaled page. `scale` defaults to `false`; the provider does not scale content until enabled. Customize the background through `ui.background` and the page through `ui.content`. Reduced-motion preferences disable the page transition.

Scaling is configured on the provider rather than individually on each drawer. Put a separate provider around content that should respond to a different group of drawers.

## Snap points

Replace `activeSnapPoint` / `v-model:active-snap-point` / `update:activeSnapPoint` with `snapPoint` / `v-model:snap-point` / `update:snapPoint`. Use `defaultSnapPoint` for an uncontrolled initial snap point and `snapToSequentialPoints` to advance one snap point at a time.

```vue
<PDrawer
  v-model:snap-point="snapPoint"
  :snap-points="[0.5, 1]"
  snap-to-sequential-points
  title="Snap points"
>
  <PButton label="Open" />
  <template #body>
    <!-- Scrollable content -->
  </template>
</PDrawer>
```

Akar resolves numeric fractions against the viewport height; numbers greater than 1 are pixels. Strings support `px` and `rem`. Snap-point gestures use Akar's release behavior and can feel different from Vaul.

## Nesting

Remove the `nested` prop. Akar automatically detects a drawer rendered inside another drawer's content, including through its portal.

## Removed Vaul options and events

These props have no direct replacement: `closeThreshold`, `scrollLockTimeout`, `fixed`, `noBodyStyles`, `handleOnly`, and `preventScrollRestoration`. Akar owns swipe thresholds, scroll arbitration, and body locking. `DrawerHandle` is a visual handle, rather than Vaul's clickable snap-point control.

Remove listeners for Vaul's `drag`, `release`, `close`, and `animationEnd` events. Use `update:open` for open-state changes and `after:enter` / `after:leave` or `update:openComplete` for animation completion.

`update:open` now receives `(open, details)`. `details.reason` identifies the interaction and `details.cancel()` rejects the request. When `dismissible` is `false`, outside interaction, Escape, and swipe dismissal are prevented and emit `close:prevent`; explicit close buttons and programmatic state changes remain available.

## Content and modality

`content` now uses Akar's `DrawerContentProps` and `DrawerContentEmits`. Use `content.initialFocus` / `content.finalFocus` to customize focus targets or disable automatic focus; content autofocus and outside-interaction event handlers remain available.

`modal` accepts `true`, `false`, or `'trap-focus'`. The latter traps focus while allowing outside pointer interaction, without a backdrop or body scroll lock. Fully modal drawers retain body scroll locking even with `overlay=false`.

Pohon's `direction` (`top`, `right`, `bottom`, `left`), `inset`, titles, descriptions, close controls, slots, and UI overrides remain available. `transition=false`, the global transition setting, and reduced-motion preferences disable visible drawer motion while retaining completion events.

## Documentation site patch

The accompanying `akar-drawer-docs.patch` updates the component page, adds the provider page, and removes the obsolete nested example prop in the separate `vinicunca/docs` checkout. From that checkout:

```sh
git apply /absolute/path/to/pohon/docs/migrations/akar-drawer-docs.patch
```
