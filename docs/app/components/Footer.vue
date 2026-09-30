<script setup lang="ts">
const route = useRoute()
const { links } = useFooter()
const { frameworks } = useFrameworks()
</script>

<template>
  <PSeparator v-if="route.path === '/'" class="h-px" />
  <!-- both icons render, the framework class shows one: the cookie is
       invisible to the prerendered HTML and a class mismatch on a plain
       element is not patched on hydration -->
  <PSeparator v-else class="h-px">
    <PIcon
      v-for="framework in frameworks"
      :key="framework.value"
      :name="framework.icon"
      :class="[`${framework.value}-only`, 'shrink-0 size-5']"
    />
  </PSeparator>

  <PFooter>
    <template #left>
      <NuxtLink to="https://github.com/vinicunca/pohon" target="_blank" class="text-sm color-text-muted">
        Published under <span class="color-text-highlighted">MIT License</span>
      </NuxtLink>
    </template>

    <PNavigationMenu :items="links" variant="link" color="neutral" :ui="{ list: 'flex-wrap justify-center' }" />

    <template #right>
      <PButton
        aria-label="Pohon UI on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/vinicunca/pohon"
        target="_blank"
        color="neutral"
        variant="ghost"
        size="sm"
      />
    </template>
  </PFooter>
</template>
