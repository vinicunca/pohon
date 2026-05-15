<script setup lang="ts">
import { useAppConfig } from '#imports';

const appConfig = useAppConfig();
</script>

<template>
  <Navbar />

  <PCollapsible class="flex flex-col gap-2 w-48">
    <PButton
      class="group"
      icon="i-lucide-lightbulb"
      :trailing-icon="appConfig.ui.icons.chevronDown"
      color="neutral"
      variant="outline"
      label="Open"
      block
      :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
    />

    <template #content>
      <Placeholder class="h-48 w-full" />
    </template>
  </PCollapsible>
</template>
