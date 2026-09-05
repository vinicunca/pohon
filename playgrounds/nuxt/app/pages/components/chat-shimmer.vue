<script setup lang="ts">
const duration = ref(2)
const spread = ref(2)
</script>

<template>
  <Navbar>
    <PFormField label="Duration" orientation="horizontal">
      <PInputNumber v-model="duration" class="w-28" />
    </PFormField>
    <PFormField label="Spread" orientation="horizontal">
      <PInputNumber v-model="spread" class="w-28" />
    </PFormField>
  </Navbar>

  <PChatShimmer text="Thinking about it..." :duration="duration" :spread="spread" />
</template>
