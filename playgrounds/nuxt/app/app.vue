<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

const { components, groups, items } = useNavigation();

useHead({
  title: 'Pohon UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Pohon UI components in an interactive environment' },
  ],
  htmlAttrs: {
    lang: 'en',
    dir: computed(() => appConfig.dir),
  },
});

provide('components', components);
</script>

<template>
  <PApp
    :toaster="appConfig.toaster"
    :tooltip="{
      delayDuration: 300,
    }"
  >
    <PHeader>
      <template #body>
        hehe
      </template>
    </PHeader>

    <PMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </PMain>
  </PApp>
</template>
