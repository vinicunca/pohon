<script setup lang="ts">
const color = ref('#00C16A')

const chip = computed(() => ({ backgroundColor: color.value }))
</script>

<template>
  <PPopover>
    <UButton label="Choose color" color="neutral" variant="outline">
      <template #leading>
        <span :style="chip" class="size-3 rounded-full" />
      </template>
    </UButton>

    <template #content>
      <PColorPicker v-model="color" class="p-2" />
    </template>
  </PPopover>
</template>
