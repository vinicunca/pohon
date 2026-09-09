<script setup lang="ts">
const value = ref(5)
</script>

<template>
  <UInputNumber v-model="value">
    <template #decrement>
      <PButton size="xs" icon="i-lucide-minus" />
    </template>

    <template #increment>
      <PButton size="xs" icon="i-lucide-plus" />
    </template>
  </UInputNumber>
</template>
