<script setup lang="ts">
const { data: page } = await useAsyncData('blog', () =>
  queryCollection('blog').first()
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('posts').order('date', 'DESC').all()
)

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
          <PageSectionHeading title="Latest posts" :meta="`${posts?.length ?? 0} ${posts?.length === 1 ? 'post' : 'posts'}`" />

          <PBlogPosts orientation="vertical">
            <PBlogPost
              v-for="post in posts"
              :key="post.path"
              :to="post.path"
              :title="post.title"
              :description="post.description"
              :date="post.date"
              :badge="post.category"
              :authors="post.authors?.map(author => ({ ...author, target: '_blank' }))"
              variant="naked"
              class="rounded-none"
            />
          </PBlogPosts>
        </PPageBody>
      </PPage>
    </PContainer>
  </PMain>
</template>
