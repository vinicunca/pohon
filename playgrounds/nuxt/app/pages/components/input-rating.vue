<script setup lang="ts">
import theme from '#build/ui/input-rating';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
});

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation);

const value = ref(3);
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
    <PSelect
      v-model="orientation"
      :items="orientations"
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
    container-class="gap-8"
  >
    <PInputRating
      v-model="value"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputRating
      :step="0.5"
      :model-value="2.5"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputRating
      :length="10"
      :model-value="7"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputRating
      readonly
      :model-value="4"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputRating
      disabled
      :model-value="3"
      :orientation="orientation"
      v-bind="props"
    />
    <PInputRating
      icon="i-lucide-heart"
      :model-value="4"
      :orientation="orientation"
      v-bind="props"
    />
  </Matrix>
</template>
