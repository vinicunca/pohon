<script setup lang="ts">
const duration = ref(2)
const spread = ref(2)
</script>

<template>
  <Navbar>
    <UFormField label="Duration" orientation="horizontal">
      <PInputNumber v-model="duration" class="w-28" />
    </UFormField>
    <UFormField label="Spread" orientation="horizontal">
      <PInputNumber v-model="spread" class="w-28" />
    </UFormField>
  </Navbar>

  <UChatShimmer text="Thinking about it..." :duration="duration" :spread="spread" />
</template>
