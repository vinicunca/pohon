<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const { components, groups, items } = useNavigation()

useHead({
  title: 'Pohon UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Pohon UI components in an interactive environment' }
  ],
  htmlAttrs: {
    lang: 'en',
    dir: computed(() => appConfig.dir)
  }
})

provide('components', components)
</script>

<template>
  <PApp :toaster="appConfig.toaster" :dir="appConfig.dir">
    <PDashboardGroup unit="rem">
      <PDashboardSidebar
        class="bg-elevated/25"
        resizable
        collapsible
        :toggle="{ size: 'sm', variant: 'outline', class: 'ring-default' }"
      >
        <template #header="{ collapsed }">
          <NuxtLink to="/" class="text-highlighted inline-flex" aria-label="Home">
            <Logo class="h-5 w-auto" :collapsed="collapsed" />
          </NuxtLink>

          <div v-if="!collapsed" class="flex items-center ms-auto">
            <ThemeDropdown />

            <PColorModeButton />
          </div>
        </template>

        <template #default="{ collapsed }">
          <PDashboardSearchButton :collapsed="collapsed" />

          <PNavigationMenu :collapsed="collapsed" :items="items" orientation="vertical" />

          <PSeparator type="dashed" />

          <PNavigationMenu :collapsed="collapsed" :items="components" orientation="vertical" />
        </template>
      </PDashboardSidebar>

      <NuxtPage v-if="route.path.startsWith('/components/sidebar')" />
      <PDashboardPanel
        v-else
        :ui="{
          body: [
            route.path.startsWith('/components') && 'mt-16',
            route.path.startsWith('/components/scroll-area') && 'p-0!'
          ]
        }"
      >
        <template #body>
          <div class="flex flex-col items-center justify-center min-h-full shrink-0">
            <NuxtPage />
          </div>
        </template>
      </PDashboardPanel>

      <PDashboardSearch :groups="groups" :fuse="{ resultLimit: 100 }" />
    </PDashboardGroup>
  </PApp>
</template>
