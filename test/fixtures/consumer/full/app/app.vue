<script setup lang="ts">
const items = ['One', 'Two', 'Three'];

const rows = [
  { id: 1, name: 'Row 1' },
  { id: 2, name: 'Row 2' },
];
</script>

<template>
  <PApp>
    <PButton label="Button" />

    <PEditor content="<p>Hello</p>" />

    <PCarousel
      v-slot="{ item }"
      :items="items"
    >
      <div>{{ item }}</div>
    </PCarousel>

    <PTable :data="rows" />
  </PApp>
</template>
