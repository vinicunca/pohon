<script setup lang="ts">
import MyButton from './MyButton.vue'
</script>

<template>
  <UTheme
    :ui="{
      button: {
        base: 'rounded-full'
      }
    }"
  >
    <PCard :ui="{ body: 'flex items-center gap-2 sm:flex-row flex-col' }">
      <UButton label="Direct child" />
      <MyButton />
    </PCard>
  </UTheme>
</template>
