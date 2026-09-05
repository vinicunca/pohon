<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <PModal :title="`This modal was opened programmatically ${count} times`">
    <template #footer>
      <PButton color="neutral" label="Close" @click="emit('close')" />
    </template>
  </PModal>
</template>
