<script setup lang="ts">
const retries = ref(0)
</script>

<template>
  <PFormField label="Retries" help="Specify number of attempts" required>
    <UInputNumber v-model="retries" placeholder="Enter retries" />
  </PFormField>
</template>
