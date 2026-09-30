<script setup lang="ts">
const appConfig = useAppConfig()

const { data: page } = await useAsyncData('showcase', () => queryCollection('showcase').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

/** The site behind a project, as its second line. */
function hostname(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

useSeoMeta({
  titleTemplate: '%s - Pohon UI',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Pohon UI`,
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
          <PageSectionHeading title="Selected projects">
            <PButton
              to="https://github.com/vinicunca/pohon/edit/main/docs/content/showcase.yml"
              target="_blank"
              label="Submit yours"
              color="neutral"
              variant="link"
              size="xs"
              class="font-mono color-text-dimmed tracking-wide text-[13px]"
              :trailing-icon="appConfig.ui.icons.plus"
            />
          </PageSectionHeading>

          <p v-if="!page.items.length" class="py-8 color-text-muted">
            No projects have been submitted yet. Use “Submit yours” to add one.
          </p>

          <PPageGrid class="lg:grid-cols-4 gap-x-4 gap-y-6">
            <PPageCard
              v-for="item in page.items"
              :key="item.name"
              :to="item.url"
              target="_blank"
              :title="item.name"
              :description="hostname(item.url)"
              variant="outline"
              class="group overflow-hidden"
              :ui="{
                container: 'p-0 sm:p-0',
                wrapper: 'items-stretch',
                header: 'mb-0 border-b border-border overflow-hidden bg-background-muted/40',
                body: 'p-3 text-center',
                title: 'text-sm',
                description: 'text-sm'
              }"
            >
              <template #header>
                <NuxtImg
                  :src="`/assets/showcase/${item.name.toLowerCase().replace(/\s/g, '-')}.png`"
                  :alt="`Screenshot of ${item.name}`"
                  width="327"
                  height="184"
                  :modifiers="{ position: 'top' }"
                  loading="lazy"
                  class="aspect-video w-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                />
              </template>
            </PPageCard>
          </PPageGrid>
        </PPageBody>
      </PPage>
    </PContainer>
  </PMain>
</template>
