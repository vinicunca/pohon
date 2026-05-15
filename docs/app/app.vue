<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

const { color, link, style } = useTheme();

const { data: navigation } = await useFetch('/api/navigation.json');

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link,
  style,
});

if (import.meta.server) {
  useSeoMeta({
    ogSiteName: 'Pohon UI',
    twitterCard: 'summary_large_image',
  });

  useSchemaOrg([
    defineWebSite({
      name: useSiteConfig().name,
    }),
  ]);
}

useFaviconFromTheme();

const { rootNavigation } = useNavigation(navigation);

provide('navigation', rootNavigation);
</script>

<template>
  <PApp :toaster="appConfig.toaster">
    <NuxtLoadingIndicator
      color="var(--ui-primary)"
      :height="2"
    />

    <div class="flex">
      <div
        class="flex-1 min-w-0"
        :class="[route.path.startsWith('/docs/') && 'root']"
      >
        <template v-if="!route.path.startsWith('/examples')">
          <CoreHeader />
        </template>

        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>

        <template v-if="!route.path.startsWith('/examples')">
          <!-- <Footer /> -->
        </template>
      </div>

      <template v-if="!route.path.startsWith('/examples')">
        <ClientOnly>
          <!-- <Chat /> -->

          <!-- <Search :files="files" :navigation="navigationByFramework" /> -->
        </ClientOnly>
      </template>
    </div>
  </PApp>
</template>

<style>
@media (min-width: 1024px) {
  .root {
    --ui-header-height: 112px;
  }
}
</style>
