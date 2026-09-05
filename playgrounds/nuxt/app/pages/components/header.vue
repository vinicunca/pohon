<script setup lang="ts">
const items = [{
  label: 'Docs',
  icon: 'i-lucide-book-open'
}, {
  label: 'Components',
  icon: 'i-lucide-box',
  active: true
}, {
  label: 'Figma',
  icon: 'i-simple-icons-figma',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}]
</script>

<template>
  <Navbar />

  <PHeader class="w-full">
    <template #title>
      <Logo class="h-6 w-auto" />
    </template>

    <PNavigationMenu :items="items" />

    <template #right>
      <PColorModeButton />

      <PTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <PButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </PTooltip>
    </template>

    <template #body>
      <PNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </PHeader>
</template>
