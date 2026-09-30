<script setup lang="ts">
const appConfig = useAppConfig()
const studioIcons = useStudioIcons()

const { data: page } = await useAsyncData('templates', () => queryCollection('templates').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// One list per framework, each hidden whole by its class (a JS filter would
// disagree with the server, which has no cookie to read), so the dividers
// only ever sit between rows that show. The counts ride the same split.
const byFramework = computed(() => ({
  nuxt: page.value?.items.filter(item => item.framework === 'nuxt') ?? [],
  vue: page.value?.items.filter(item => item.framework === 'vue') ?? []
}))

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description
})

useCanonical()

if (import.meta.server) {
  defineOgImage('Docs.takumi', {
    title: page.value.title,
    description: page.value.description
  })
}
</script>

<template>
  <PMain v-if="page">
    <PageHero v-bind="page.hero" />

    <PContainer>
      <PPage>
        <PPageBody class="space-y-0">
          <PageSectionHeading>
            <template #leading>
              <FrameworkTabs size="xs" class="w-40" />
            </template>

            <!-- both counts render, the framework class shows one -->
            <template #meta>
              <span v-for="(templates, framework) in byFramework" :key="framework" :class="`${framework}-only`">
                {{ templates.length }} {{ templates.length === 1 ? 'template' : 'templates' }}
              </span>
            </template>
          </PageSectionHeading>

          <div v-for="(templates, framework) in byFramework" :key="framework" :class="`${framework}-only`" class="flex flex-col divide-y divide-border">
            <article
              v-for="template in templates"
              :key="template.title"
              class="grid grid-cols-1 md:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto] md:items-center gap-x-6 lg:gap-x-9 gap-y-5 py-8 first:pt-0 last:pb-0"
            >
              <div class="flex size-14 items-center justify-center rounded-lg bg-background-elevated">
                <PIcon :name="template.icon" class="size-8" />
              </div>

              <div class="flex flex-col gap-3 min-w-0">
                <h2 class="text-2xl font-semibold tracking-tight color-text-highlighted">
                  {{ template.title }}
                </h2>

                <p class="max-w-130 text-base leading-relaxed color-text-muted text-pretty">
                  {{ template.description }}
                </p>

                <ul class="flex flex-col gap-2">
                  <li v-for="feature in template.features || []" :key="feature.title" class="flex items-center gap-2.5 text-base color-text-toned">
                    <PIcon :name="feature.icon" class="size-4.5 shrink-0 text-primary" />
                    {{ feature.title }}
                  </li>
                </ul>
              </div>

              <div class="flex flex-wrap items-center gap-2 md:col-start-2 xl:col-start-3 xl:row-start-1">
                <PDropdownMenu
                  v-if="template.open_links?.length"
                  :items="template.open_links"
                  :ui="{ content: 'w-(--akar-dropdown-menu-trigger-width) min-w-auto' }"
                  :modal="false"
                  class="group"
                >
                  <PButton
                    color="neutral"
                    variant="outline"
                    :icon="studioIcons.link"
                    :trailing-icon="appConfig.ui.icons.chevronDown"
                    label="Open on"
                    :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
                  />
                </PDropdownMenu>

                <PButton
                  v-for="link of template.links"
                  :key="link.label"
                  color="neutral"
                  v-bind="link"
                />
              </div>
            </article>
          </div>
        </PPageBody>
      </PPage>
    </PContainer>
  </PMain>
</template>
