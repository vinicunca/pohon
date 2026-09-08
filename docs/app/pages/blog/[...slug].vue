<script setup lang="ts">
import { kebabCase } from 'scule'

definePageMeta({
  layout: 'blog'
})

const route = useRoute()
const appConfig = useAppConfig()

const { data: page } = await useAsyncData(kebabCase(route.path), () => queryCollection('posts').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '%s - Pohon UI',
  title,
  ogTitle: `${title} - Pohon UI`,
  description,
  ogDescription: description
})

useCanonical()

if (import.meta.server) {
  if (page.value.image) {
    useSeoMeta({ ogImage: page.value.image })
  } else {
    defineOgImage('Docs.takumi', {
      headline: 'Blog',
      title: page.value.title,
      description: page.value.description
    })
  }

  useSchemaOrg([
    defineArticle({
      '@type': 'BlogPosting',
      'headline': title,
      'description': description,
      'datePublished': page.value.date,
      'author': page.value.authors?.map((author: { name: string, to?: string }) => ({
        name: author.name,
        url: author.to
      }))
    })
  ])
}

const tree = ref<Record<string, Node>>({})
const activePath = ref()

provide('tree', tree)
provide('activePath', activePath)

const items = computed(() => Object.entries(tree.value).map(([key, value]) => ({ label: key, component: value })))
</script>

<template>
  <PPage v-if="page" :ui="{ center: 'lg:col-span-5 px-4 sm:px-6 lg:pl-8 lg:pr-0', right: 'lg:col-span-5' }" class="lg:gap-8">
    <PPageHeader :title="page.title" :description="page.description" :ui="{ title: 'relative flex items-center' }">
      <template #headline>
        <PButton
          :icon="appConfig.ui.icons.arrowLeft"
          label="Back to blog"
          to="/blog"
          variant="link"
          class="p-0"
          :ui="{ leadingIcon: 'size-4' }"
        />
        <span class="color-text-muted">&middot;</span>
        <time class="color-text-muted font-normal">{{ new Date(page.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div v-if="page.authors?.length" class="flex items-center gap-6 mt-6">
        <template v-for="author in page.authors" :key="author.name">
          <PLink v-if="author.to" :to="author.to" target="_blank" class="flex items-center gap-3 group">
            <PAvatar :src="author.avatar?.src" :alt="author.name" size="lg" />
            <div class="flex flex-col">
              <span class="text-sm font-500 color-text-highlighted">{{ author.name }}</span>
              <span class="text-xs color-text-muted group-hover:color-primary transition-colors">@{{ author.to.split('/').pop() }}</span>
            </div>
          </PLink>
          <div v-else class="flex items-center gap-3">
            <PAvatar :src="author.avatar?.src" :alt="author.name" size="lg" />
            <span class="text-sm font-500 color-text-highlighted">{{ author.name }}</span>
          </div>
        </template>
      </div>
    </PPageHeader>

    <PPageBody>
      <ContentRenderer v-if="page.body" :value="page" />
    </PPageBody>

    <template #right>
      <div>
        <PContentToc
          :links="page.body.toc?.links"
          class="z-2 lg:hidden mx-0!"
        />

        <nav class="h-full sticky top-(--ui-header-height) max-h-[calc(100vh-var(--ui-header-height))] hidden lg:block">
          <ProseCodeTree
            v-if="activePath"
            :model-value="activePath"
            class="lg:h-full my-0 rounded-none border-y-0 border-r-0 border-border"
            :items="items"
            expand-all
            :ui="{ list: 'border-border', content: '[&>div>pre]:bg-muted/50 [&>div>pre]:border-border [&>div>pre]:rounded-none' }"
          />
          <div v-else class="size-full border-l border-border flex items-center justify-center">
            <PIcon :name="appConfig.ui.icons.arrowDown" class="size-12 color-text-dimmed animate-bounce" />
          </div>
        </nav>
      </div>
    </template>
  </PPage>
</template>
