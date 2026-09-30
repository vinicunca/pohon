<script setup lang="ts">
const { data: page } = await useAsyncData('team', () => queryCollection('team').first())
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

const [{ data: module }, { data: github }] = await Promise.all([
  useFetch('/api/module.json', { key: 'module', pick: ['stats'] }),
  useFetch('/api/github/contributors.json')
])

const studioIcons = useStudioIcons()
const appConfig = useAppConfig()

const { format } = Intl.NumberFormat('en')
const { format: formatCompact } = Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

const total = computed(() => github.value?.total ? format(github.value.total) : null)

const stats = computed(() => [
  ...(module.value?.stats?.downloads
    ? [{
        value: `${formatCompact(module.value.stats.downloads)}+`,
        label: 'monthly downloads',
        to: 'https://npm.chart.dev/pohon-ui'
      }]
    : []),
  ...(module.value?.stats?.stars
    ? [{
        value: `${formatCompact(module.value.stats.stars)}+`,
        label: 'GitHub stars',
        to: 'https://github.com/vinicunca/pohon'
      }]
    : []),
  ...(total.value ? [{
    value: total.value,
    label: 'contributors',
    to: 'https://github.com/vinicunca/pohon/graphs/contributors'
  }] : [])
])

const socialIcons = computed<Record<string, string>>(() => ({
  twitter: 'i-simple-icons-x',
  bluesky: 'i-simple-icons-bluesky',
  linkedin: 'i-simple-icons-linkedin',
  mastodon: 'i-simple-icons-mastodon',
  youtube: 'i-simple-icons-youtube',
  twitch: 'i-simple-icons-twitch',
  instagram: 'i-simple-icons-instagram',
  facebook: 'i-simple-icons-facebook',
  reddit: 'i-simple-icons-reddit',
  npm: 'i-simple-icons-npm',
  github: 'i-simple-icons-github',
  website: studioIcons.link
}))

const people = computed(() => (github.value?.contributors ?? []).map((contributor, index) => {
  const name = contributor.name || contributor.username

  return {
    ...contributor,
    name,
    rank: String(index + 1).padStart(2, '0'),
    links: [
      ...(contributor.socialAccounts ?? []).map(account => ({
        icon: socialIcons.value[account.provider] ?? socialIcons.value.website!,
        to: account.url,
        label: `${name} on ${account.provider}`
      })),
      { icon: socialIcons.value.github!, to: `https://github.com/${contributor.username}`, label: `${name} on GitHub` },
      ...(contributor.websiteUrl ? [{ icon: socialIcons.value.website!, to: contributor.websiteUrl, label: `${name}'s website` }] : [])
    ]
  }
}))
</script>

<template>
  <PMain v-if="page">
    <PageHero v-bind="page.hero">
      <template #links>
        <PageStats :items="stats" />
      </template>
    </PageHero>

    <PContainer>
      <PPage>
        <PPageBody class="space-y-24">
          <section>
            <PageSectionHeading title="Everyone who ships it" meta="by contributions" />

            <ul class="divide-y divide-border">
              <li
                v-for="person in people"
                :key="person.username"
                class="flex items-center gap-4 sm:gap-6 py-4 first:pt-0 last:pb-0"
              >
                <span class="hidden sm:block w-5.5 shrink-0 font-mono text-xs color-text-muted">{{ person.rank }}</span>

                <PAvatar
                  :src="`https://github.com/${person.username}.png?size=104`"
                  :srcset="`https://github.com/${person.username}.png?size=208 2x`"
                  :alt="`${person.name} avatar`"
                  size="3xl"
                  class="size-13 shrink-0 ring ring-ring"
                  loading="lazy"
                />

                <div class="flex-1 md:flex-none md:w-86 min-w-0 flex flex-col gap-0.5">
                  <span class="text-base sm:text-lg font-semibold leading-tight tracking-tight color-text-highlighted truncate">{{ person.name }}</span>
                  <span v-if="person.location" class="flex items-center gap-1.5 text-[13px] color-text-muted whitespace-nowrap min-w-0">
                    <PIcon :name="studioIcons.mapPin" class="size-3 color-text-dimmed shrink-0" />
                    <span class="truncate">{{ person.location }}</span>
                  </span>
                </div>

                <div class="hidden md:flex gap-0.5">
                  <PButton
                    v-for="link in person.links"
                    :key="link.to"
                    :to="link.to"
                    :icon="link.icon"
                    :aria-label="link.label"
                    target="_blank"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    class="color-text-muted hover:color-text-highlighted"
                  />

                  <PButton
                    v-if="person.sponsorsListing"
                    :to="person.sponsorsListing"
                    target="_blank"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    :aria-label="`Sponsor ${person.name}`"
                    :icon="studioIcons.heart"
                    :ui="{ leadingIcon: 'text-pink-500' }"
                  />
                </div>

                <div class="ms-auto flex items-baseline gap-1 shrink-0">
                  <span class="text-base font-semibold leading-none tracking-tight tabular-nums color-text-highlighted">{{ format(person.contributions) }}</span>
                  <span class="text-xs color-text-muted whitespace-nowrap">contributions</span>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <div class="relative overflow-hidden rounded-2xl border border-border bg-linear-to-b from-default to-(--ui-color-bg-elevated)/60 px-8 py-10 sm:px-13 sm:py-12 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
              <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--ui-color-border-accented)_1px,transparent_1px)] bg-[size:26px_26px] opacity-50 [mask-image:radial-gradient(80%_120%_at_90%_50%,black,transparent_70%)]" />

              <div class="relative flex flex-col gap-2">
                <h2 class="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight color-text-highlighted">
                  {{ total }} people have shipped Pohon UI
                </h2>
                <p class="text-[15px] color-text-muted">
                  Issues, docs, translations and pull requests all count.
                </p>
              </div>

              <div class="relative lg:ms-auto flex flex-wrap gap-2.5 shrink-0">
                <PButton
                  size="lg"
                  color="neutral"
                  variant="outline"
                  label="See all contributors"
                  :trailing-icon="appConfig.ui.icons.arrowRight"
                  to="https://github.com/vinicunca/pohon/graphs/contributors"
                  target="_blank"
                  :ui="{ trailingIcon: 'color-text-dimmed' }"
                />
                <PButton
                  size="lg"
                  color="neutral"
                  icon="i-simple-icons-github"
                  label="Contribute"
                  to="https://github.com/vinicunca/pohon"
                  target="_blank"
                />
              </div>
            </div>
          </section>
        </PPageBody>
      </PPage>
    </PContainer>
  </PMain>
</template>
