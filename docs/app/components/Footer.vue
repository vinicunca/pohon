<script setup lang="ts">
const route = useRoute()
const { links } = useFooter()
</script>

<template>
  <PSeparator :icon="route.path === '/' ? undefined : 'i-simple-icons-nuxtdotjs'" class="h-px" />

  <PFooter>
    <template #left>
      <NuxtLink to="https://github.com/nuxt/ui" target="_blank" class="text-sm text-muted">
        Published under <span class="text-highlighted">MIT License</span>
      </NuxtLink>
    </template>

    <PNavigationMenu :items="links" variant="link" color="neutral" />

    <template #right>
      <PButton
        aria-label="Nuxt Website"
        icon="i-simple-icons-nuxtdotjs"
        to="https://nuxt.com"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
      <PButton
        aria-label="Nuxt on Discord"
        icon="i-simple-icons-discord"
        to="https://go.nuxt.com/discord"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
      <PButton
        aria-label="Nuxt on X"
        icon="i-simple-icons-x"
        to="https://go.nuxt.com/x"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
      <PButton
        aria-label="Nuxt on BlueSky"
        icon="i-simple-icons-bluesky"
        to="https://go.nuxt.com/bluesky"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
      <PButton
        aria-label="Pohon UI on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/ui"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
    </template>
  </PFooter>
</template>
