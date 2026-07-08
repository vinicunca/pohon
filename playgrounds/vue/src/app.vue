<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const appConfig = useAppConfig();

appConfig.dir = ref('ltr');
appConfig.toaster = reactive({
  position: 'bottom-right' as const,
  expand: true,
  duration: 5000,
});

useHead({
  title: 'Pohon UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Pohon UI components in an interactive environment' },
  ],
  htmlAttrs: {
    dir: computed(() => appConfig.dir as 'ltr' | 'rtl'),
  },
});

const { components, groups, items } = useNavigation();

provide('components', components);
</script>

<template>
  <Suspense>
    <PApp
      :toaster="appConfig.toaster"
      :dir="appConfig.dir"
    >
      <PIcon name="cif:gb" />
      <PDashboardGroup
        unit="rem"
        storage="local"
      >
        <PDashboardSidebar
          class="bg-elevated/25"
          resizable
          collapsible
          :toggle="{ size: 'sm', variant: 'outline', class: 'ring-default' }"
        >
          <template #header="{ collapsed }">
            <RouterLink
              to="/"
              class="text-highlighted inline-flex"
              aria-label="Home"
            >
              <Logo
                class="h-5 w-auto"
                :collapsed="collapsed"
              />
            </RouterLink>

            <div
              v-if="!collapsed"
              class="flex items-center ms-auto"
            >
              <ThemeDropdown />

              <PColorModeButton />
            </div>
          </template>

          <template #default="{ collapsed }">
            <PDashboardSearchButton :collapsed="collapsed" />

            <PNavigationMenu
              :collapsed="collapsed"
              :items="items"
              orientation="vertical"
            />

            <PSeparator type="dashed" />

            <PNavigationMenu
              :collapsed="collapsed"
              :items="components"
              orientation="vertical"
            />
          </template>
        </PDashboardSidebar>

        <RouterView v-if="route.path.startsWith('/components/sidebar')" />
        <PDashboardPanel
          v-else
          :ui="{
            body: [
              route.path.startsWith('/components') && 'mt-16',
              route.path.startsWith('/components/scroll-area') && 'p-0!',
            ],
          }"
        >
          <template #body>
            <div class="flex flex-col items-center justify-center min-h-full shrink-0">
              <RouterView />
            </div>
          </template>
        </PDashboardPanel>

        <PDashboardSearch
          :groups="groups"
          :fuse="{ resultLimit: 100 }"
        />
      </PDashboardGroup>
    </PApp>
  </Suspense>
</template>
