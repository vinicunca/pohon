<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const route = useRoute();

const { color, link, style } = useTheme();

const { data: navigation } = await useFetch('/api/navigation.json');
const { data: files } = useLazyAsyncData(
  'search',
  () => queryCollectionSearchSections('docs', {
    ignoredTags: ['style'],
  }),
  {
    server: false,
  },
);

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link,
  style,
});

useSeoMeta({
  titleTemplate: '%s - Pohon UI',
  title: String(props.error.statusCode),
});

if (import.meta.server) {
  useSchemaOrg([
    defineWebSite({
      name: useSiteConfig().name,
    }),
  ]);
}

useFaviconFromTheme();

const { rootNavigation, navigationByFramework } = useNavigation(navigation);

provide('navigation', rootNavigation);
</script>

<template>
  <div>
    error
  </div>
</template>

<style>
/* Safelist (do not remove): [&>div]:*:my-0 [&>div]:*:w-full h-64 !px-0 !py-0 !pt-0 !pb-0 !p-0 !justify-start !justify-end !min-h-96 h-136 max-h-[341px] */

@media (min-width: 1024px) {
  .root {
    --ui-header-height: 112px;
  }
}
</style>
