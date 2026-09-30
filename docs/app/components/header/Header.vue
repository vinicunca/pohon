<script setup lang="ts">
const route = useRoute()
const { desktopLinks } = useHeader()
const { open } = useChat()
const { track } = useAnalytics()

// The module route caches Pohon's stats for an hour, shared with /team
// under one key so the payload only rides once.
const { data: module } = await useFetch('/api/module.json', { key: 'module', pick: ['stats'] })
const { format } = Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const starsLabel = computed(() => {
  const stars = module.value?.stats?.stars
  return stars ? format(stars).toLowerCase() : undefined
})

function toggleChat() {
  if (!open.value) {
    track('AI Chat Opened', { source: 'header' })
  }
  open.value = !open.value
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <PHeader
    :ui="{
      container: [route.path.startsWith('/blog/') ? 'max-w-none' : ''],
      right: 'gap-0.5'
    }"
    class="flex flex-col"
  >
    <template #left>
      <HeaderLogo />

      <VersionMenu v-if="route.path.startsWith('/docs/')" />
    </template>

    <PNavigationMenu :items="desktopLinks" variant="link" content-orientation="vertical" />

    <template #right>
      <!-- below `lg` the GitHub button is gone and Ask AI moves up beside search -->
      <PTooltip text="Search" :kbds="['meta', 'K']" class="max-lg:order-[-1]" ignore-non-keyboard-focus>
        <PContentSearchButton />
      </PTooltip>

      <!-- lazy for the theme engine it pulls: Vue keeps the server's button
             and hydrates it when the chunk lands. Not on idle, which would
             defer every mount, and the mobile menu mounts this cluster again -->
      <LazyThemeStudioPresetPicker />

      <PTooltip text="Open on GitHub" class="hidden lg:flex" ignore-non-keyboard-focus>
        <PButton
          color="neutral"
          variant="ghost"
          :label="starsLabel"
          to="https://github.com/vinicunca/pohon"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="Open on GitHub"
        />
      </PTooltip>

      <PSeparator orientation="vertical" class="hidden lg:flex h-auto self-stretch py-1.5 mx-1.5 lg:me-3" />

      <!-- ghost among the ghost controls it sits with below `lg`, framed on its
           own beyond the separator above it; no tooltip where there is no hover -->
      <PButton
        color="neutral"
        variant="ghost"
        aria-label="Ask AI"
        class="lg:hidden -order-1"
        @click="toggleChat"
      >
        <template #leading>
          <PIcon name="i-lucide-sparkles" class="size-5 shrink-0" />
        </template>
      </PButton>

      <PTooltip text="Ask AI" :kbds="['meta', 'I']" class="hidden lg:flex" ignore-non-keyboard-focus>
        <PButton
          color="neutral"
          variant="outline"
          label="Ask AI"
          aria-label="Ask AI"
          @click="toggleChat"
        >
          <template #leading>
            <PIcon name="i-lucide-sparkles" class="size-5 shrink-0" />
          </template>
        </PButton>
      </PTooltip>
    </template>

    <template #toggle="{ open, toggle, ui }">
      <HeaderToggleButton
        :open="open"
        :class="ui.toggle({ toggleSide: 'right' })"
        @click="toggle"
      />
    </template>

    <template #body>
      <HeaderBody />
    </template>

    <template v-if="route.path.startsWith('/docs/')" #bottom>
      <HeaderBottom />
    </template>
  </PHeader>
</template>
