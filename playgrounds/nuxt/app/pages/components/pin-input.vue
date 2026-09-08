<script setup lang="ts">
import theme from '#build/ui/pin-input';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

function onComplete(e: Array<string>) {
  console.log(e);
}
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
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PPinInput
      placeholder="○"
      autofocus
      v-bind="props"
      @complete="onComplete"
    />
    <PPinInput
      placeholder="○"
      highlight
      v-bind="props"
    />
    <PPinInput
      placeholder="○"
      disabled
      v-bind="props"
    />
    <PPinInput
      placeholder="○"
      required
      v-bind="props"
    />
    <PPinInput
      placeholder="○"
      :length="6"
      :separator="3"
      v-bind="props"
    />
  </Matrix>
</template>
