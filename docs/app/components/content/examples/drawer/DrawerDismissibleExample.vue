<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <PDrawer
    v-model:open="open"
    :dismissible="false"
    :modal="false"
    :handle="false"
  >
    <PButton
      label="Open"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-up"
    />

    <template #body>
      <div class="mb-4 flex gap-4 items-center justify-between">
        <h2 class="text-highlighted font-semibold">
          Drawer non-dismissible
        </h2>

        <PButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <Placeholder class="size-full min-h-48" />
    </template>
  </PDrawer>
</template>
