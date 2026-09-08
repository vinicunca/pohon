<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

const { components, groups, items } = useNavigation();

provide('components', components);
</script>

<template>
  <PApp>
    <PDashboardGroup unit="rem">
      <PDashboardSidebar class="bg-background-elevated/25">
        <template #header>
          <NuxtLink
            to="/"
            class="color-text-highlighted"
          >
            <Logo class="h-5 w-auto" />
          </NuxtLink>

          <div class="ms-auto flex items-center">
            <ThemeDropdown />

            <PColorModeButton />
          </div>
        </template>

        <PDashboardSearchButton />

        <PNavigationMenu
          :items="items"
          orientation="vertical"
        />

        <PSeparator type="dashed" />

        <PNavigationMenu
          :items="components"
          orientation="vertical"
        />
      </PDashboardSidebar>

      <PDashboardPanel>
        <PDashboardNavbar class="border-b-0" />

        <PError :error="error" />
      </PDashboardPanel>

      <PDashboardSearch :groups="groups" />
    </PDashboardGroup>
  </PApp>
</template>
