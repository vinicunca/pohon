<script setup lang="ts">
const tags = ref(['Vue'])
</script>

<template>
  <UFormField label="Tags" required>
    <PInputTags v-model="tags" placeholder="Enter tags..." />
  </UFormField>
</template>
