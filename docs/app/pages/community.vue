<script setup lang="ts">
const appConfig = useAppConfig()

const { data: page } = await useAsyncData('community', () => queryCollection('community').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
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
          <PageSectionHeading title="Projects and integrations">
            <PButton
              to="https://github.com/vinicunca/pohon/edit/main/docs/content/community.yml"
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

          <PPageGrid class="gap-4">
            <PPageCard
              v-for="item in page.items"
              :key="item.label"
              :to="item.to"
              target="_blank"
              :title="item.label"
              :description="item.description"
              :ui="{ container: 'p-5 sm:p-5', description: 'text-sm' }"
            >
              <template #leading>
                <PAvatar
                  v-bind="item.avatar"
                  :alt="`${item.label} logo`"
                  size="lg"
                  loading="lazy"
                  class="rounded-xl bg-background-elevated"
                />
              </template>

              <template v-if="item.user" #footer>
                <PUser
                  :name="item.user.name"
                  :avatar="item.user.avatar"
                  size="xs"
                  class="rounded-full border border-border ps-1 pe-3 py-1"
                />
              </template>
            </PPageCard>
          </PPageGrid>
        </PPageBody>
      </PPage>
    </PContainer>
  </PMain>
</template>
