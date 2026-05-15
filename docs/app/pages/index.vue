<script lang="ts" setup>
import { joinURL } from 'ufo';

const { data: page } = await useAsyncData(
  'index',
  () => queryCollection('index').first(),
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const { url } = useSiteConfig();
const appConfig = useAppConfig();

if (import.meta.server) {
  prerenderRoutes(['/raw/index.md']);

  useSchemaOrg([
    defineSoftwareApp({
      name: 'Pohon UI',
      operatingSystem: 'Web',
      applicationCategory: 'DeveloperApplication',
      offers: { price: 0, priceCurrency: 'USD' },
    }),
  ]);
}

useCanonical('/raw/index.md');

useSeoMeta({
  titleTemplate: '%s - Pohon UI',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Pohon UI`,
  ogDescription: page.value.description,
  ogImage: joinURL(url, '/og-image.png'),
});

const { data: components } = await useAsyncData(
  'index-components',
  () => {
    return queryCollection('docs')
      .where('path', 'LIKE', '/docs/components/%')
      .where('extension', '=', 'md')
      .where('index', 'IS NULL')
      .select('path', 'title', 'description', 'category')
      .all();
  },
);

const { data: templates } = await useAsyncData(
  'index-templates',
  () => queryCollection('templates').first(),
  {
    transform: (data) => data?.items?.filter((template) => template.framework === 'nuxt') || [],
  },
);
</script>

<template>
  home page
</template>
