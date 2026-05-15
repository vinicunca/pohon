<script lang="ts" setup>
const route = useRoute();
const appConfig = useAppConfig();

const { desktopLinks } = useHeader();
</script>

<template>
  <PHeader
    :ui="{
      left: 'min-w-0',
      right: 'gap-0.5',
      container: [route.path.startsWith('/blog/') ? 'max-w-none' : ''],
    }"
    class="flex flex-col"
  >
    <template #left>
      <NuxtLink
        to="/"
        class="text-xl color-text-highlighted font-bold flex shrink-0 gap-2 min-w-0 items-end focus-visible:outline-primary"
        aria-label="Pohon UI"
      >
        <CoreLogo class="shrink-0 h-6 w-auto" />
      </NuxtLink>
    </template>

    <PNavigationMenu
      :items="desktopLinks"
      variant="link"
      content-orientation="vertical"
    />
  </PHeader>
</template>
