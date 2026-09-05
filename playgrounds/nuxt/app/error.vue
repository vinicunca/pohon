<script setup lang="ts">
import type { NuxtError } from '#app'

const { components, groups, items } = useNavigation()

defineProps<{
  error: NuxtError
}>()

provide('components', components)
</script>

<template>
  <PApp>
    <PDashboardGroup unit="rem">
      <PDashboardSidebar class="bg-elevated/25">
        <template #header>
          <NuxtLink to="/" class="text-highlighted">
            <Logo class="h-5 w-auto" />
          </NuxtLink>

          <div class="flex items-center ms-auto">
            <ThemeDropdown />

            <PColorModeButton />
          </div>
        </template>

        <PDashboardSearchButton />

        <PNavigationMenu :items="items" orientation="vertical" />

        <PSeparator type="dashed" />

        <PNavigationMenu :items="components" orientation="vertical" />
      </PDashboardSidebar>

      <PDashboardPanel>
        <PDashboardNavbar class="border-b-0" />

        <PError :error="error" />
      </PDashboardPanel>

      <PDashboardSearch :groups="groups" />
    </PDashboardGroup>
  </PApp>
</template>
