<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <PSlideover :description="`This slideover was opened programmatically ${count} times`">
    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <PButton color="neutral" label="Close" @click="emit('close')" />
    </template>
  </PSlideover>
</template>
