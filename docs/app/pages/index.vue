<script setup lang="ts">
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
  useSchemaOrg([
    defineSoftwareApp({
      name: 'Pohon',
      operatingSystem: 'Web',
      applicationCategory: 'DeveloperApplication',
      offers: { price: 0, priceCurrency: 'USD' },
    }),
  ]);
}

useCanonical('/raw/index.md');

useSeoMeta({
  titleTemplate: '%s - Pohon',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Pohon`,
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

const { data: module } = await useFetch('/api/module.json');

const { format } = Intl.NumberFormat('en', { notation: 'compact' });

const contributorsRef = ref(null);
const isContributorsInView = ref(false);
const isContributorsHovered = useElementHover(contributorsRef);

useIntersectionObserver(
  contributorsRef,
  ([entry]) => {
    isContributorsInView.value = entry?.isIntersecting || false;
  },
);
</script>

<template>
  <main v-if="page">
    <PPageHero
      orientation="horizontal"
      :ui="{
        container: 'pb-0 sm:pb-0 lg:py-0',
        title: 'lg:mt-16',
        links: 'lg:mb-16',
        description: 'text-balance',
      }"
    >
      <template #title>
        The Intuitive <br> <span class="text-primary">Vue UI Library</span>
      </template>

      <template #description>
        {{ page.hero.description }}
      </template>

      <template #links>
        <PButton
          v-for="link of page.hero.links"
          :key="link.label"
          v-bind="link"
          size="xl"
        />

        <div class="my-6 w-full">
          <PSeparator
            class="w-1/2"
            type="dashed"
          />
        </div>

        <div class="flex flex-col gap-4">
          <Motion
            v-for="(feature, index) in page.hero.features"
            :key="feature.title"
            as-child
            :initial="{ opacity: 0, transform: 'translateX(-10px)' }"
            :while-in-view="{ opacity: 1, transform: 'translateX(0)' }"
            :transition="{ delay: 0.2 + 0.4 * index }"
            :in-view-options="{ once: true }"
          >
            <PPageFeature
              v-bind="feature"
              class="opacity-0"
            />
          </Motion>
        </div>
      </template>

      <LazySkyBg is-index />

      <div class="h-[344px] w-full overflow-hidden lg:(h-full min-h-[calc(100vh-var(--ui-header-height)-1px)] relative)">
        <PMarquee
          pause-on-hover
          :overlay="false"
          :ui="{
            root: '[--gap:--spacing(4)] [--duration:40s] border-border absolute w-full left-0 border-y lg:border-x lg:border-y-0 lg:w-[calc(50%-6px)] 2xl:max-w-[320px] lg:flex-col',
            content: 'lg:w-auto lg:flex-col lg:animate-[marquee-vertical_var(--duration)_linear_infinite] lg:h-fit',
          }"
        >
          <PLink
            v-for="component of components?.slice(0, 10)"
            :key="component.path"
            class="group/link border-border w-[290px] aspect-video relative 2xl:(p-2 border-y w-[320px]) xl:w-[330px]"
            :to="component.path"
            tabindex="-1"
          >
            <PColorModeImage
              :light="`${component.path.replace('/docs/components/', '/components/light/')}.png`"
              :dark="`${component.path.replace('/docs/components/', '/components/dark/')}.png`"
              :alt="`${component.title} preview`"
              width="290"
              height="163"
              format="webp"
              class="bg-muted border-x border-border w-full aspect-video transition-transform 2xl:border-y-0 lg:border-x-0 lg:border-y hover:scale-105 lg:hover:scale-110"
              loading="lazy"
            />

            <PBadge
              color="neutral"
              variant="outline"
              size="md"
              :label="component.title"
              class="mx-auto opacity-0 hidden pointer-events-none transition-all duration-300 left-6 top-4 absolute group-hover/link:opacity-100 lg:block -translate-y-2 group-hover/link:translate-y-0 xl:left-4"
            />
          </PLink>
        </PMarquee>

        <PMarquee
          pause-on-hover
          reverse
          :overlay="false"
          :ui="{
            root: '[--gap:--spacing(4)] [--duration:40s] border-border absolute w-full mt-[180px] left-0 border-y lg:mt-auto lg:left-auto lg:border-y-0 lg:border-x lg:w-[calc(50%-6px)] 2xl:max-w-[320px] lg:right-0 lg:flex-col',
            content: 'lg:w-auto lg:flex-col lg:animate-[marquee-vertical_var(--duration)_linear_infinite] lg:h-fit lg:[animation-direction:reverse]',
          }"
        >
          <PLink
            v-for="component of components?.slice(10, 20)"
            :key="component.path"
            class="group/link border-border w-[290px] aspect-video relative 2xl:p-2 2xl:border-y 2xl:w-[320px] xl:w-[330px]"
            :to="component.path"
            tabindex="-1"
          >
            <PColorModeImage
              :light="`${component.path.replace('/docs/components/', '/components/light/')}.png`"
              :dark="`${component.path.replace('/docs/components/', '/components/dark/')}.png`"
              :alt="`${component.title} preview`"
              width="290"
              height="163"
              format="webp"
              class="bg-muted border-x border-border w-full aspect-video transition-transform 2xl:border-y-0 lg:border-x-0 lg:border-y hover:scale-105 lg:hover:scale-110"
              loading="lazy"
            />

            <PBadge
              color="neutral"
              variant="outline"
              size="md"
              :label="component.title"
              class="mx-auto opacity-0 hidden pointer-events-none transition-all duration-300 left-6 top-4 absolute group-hover/link:opacity-100 lg:block -translate-y-2 group-hover/link:translate-y-0 xl:left-4"
            />
          </PLink>
        </PMarquee>
      </div>
    </PPageHero>
  </main>
</template>
