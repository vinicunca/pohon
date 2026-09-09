<script setup lang="ts">
const tags = ref(['Vue'])
</script>

<template>
  <PFormField label="Tags" required>
    <UInputTags v-model="tags" placeholder="Enter tags..." />
  </PFormField>
</template>
