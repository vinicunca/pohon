<script setup lang="ts">
const first = ref(false)
const second = ref(false)
</script>

<template>
  <UModal v-model:open="first" title="First modal" :ui="{ footer: 'justify-end' }">
    <PButton color="neutral" variant="subtle" label="Open" />

    <template #footer>
      <PButton label="Close" color="neutral" variant="outline" @click="first = false" />

      <UModal v-model:open="second" title="Second modal" :ui="{ footer: 'justify-end' }">
        <PButton label="Open second" color="neutral" />

        <template #footer>
          <PButton label="Close" color="neutral" variant="outline" @click="second = false" />
        </template>
      </UModal>
    </template>
  </UModal>
</template>
