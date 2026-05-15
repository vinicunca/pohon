<script setup lang="ts">
import type { NavigationMenuItem } from 'pohon-ui';

const items: Array<NavigationMenuItem> = [
  {
    label: 'Figma Kit',
    to: 'https://go.nuxt.com/figma-ui',
    target: '_blank',
  },
  {
    label: 'Playground',
    to: 'https://stackblitz.com/edit/pohon-ui',
    target: '_blank',
  },
  {
    label: 'Releases',
    to: 'https://github.com/vinicunca/pohon/releases',
    target: '_blank',
  },
];
</script>

<template>
  <PFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <PNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <PButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://go.nuxt.com/discord"
        target="_blank"
        aria-label="Discord"
      />
      <PButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://go.nuxt.com/x"
        target="_blank"
        aria-label="X"
      />
      <PButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </PFooter>
</template>
