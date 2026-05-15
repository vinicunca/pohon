<script setup lang="ts">
import theme from '#build/ui/checkbox';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const sizes = Object.keys(theme.variants.size);
const indicators = Object.keys(theme.variants.indicator);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
  indicator: [theme.defaultVariants.indicator],
});

const value = ref(true);
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
    <PSelect
      v-model="attrs.indicator"
      :items="indicators"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PCheckbox
      v-model="value"
      label="Model value"
      v-bind="props"
    />
    <PCheckbox
      label="Default value"
      v-bind="props"
      :default-value="true"
    />
    <PCheckbox
      label="Indeterminate"
      v-bind="props"
      default-value="indeterminate"
    />
    <PCheckbox
      label="Icon"
      icon="i-lucide-heart"
      v-bind="props"
      :model-value="true"
    />
    <PCheckbox
      label="Required"
      v-bind="props"
      required
    />
    <PCheckbox
      label="Disabled"
      v-bind="props"
      disabled
    />
    <PCheckbox
      label="Description"
      description="This is a description"
      v-bind="props"
    />
  </Matrix>
</template>
