<script setup lang="ts">
import { Time } from '@internationalized/date';
import theme from '#build/ui/input-time';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

const value = shallowRef(new Time(12, 30));
const range = shallowRef({
  start: new Time(8, 0),
  end: new Time(16, 30),
});
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
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PInputTime
      v-model="value"
      autofocus
      v-bind="props"
    />
    <PInputTime
      :default-value="new Time(12, 30)"
      v-bind="props"
    />
    <PInputTime
      v-model="range"
      range
      v-bind="props"
    />
    <PInputTime
      :default-value="{ start: new Time(8, 0), end: new Time(16, 30) }"
      range
      v-bind="props"
    />
    <PInputTime
      highlight
      v-bind="props"
    />
    <PInputTime
      disabled
      v-bind="props"
    />
    <PInputTime
      required
      v-bind="props"
    />
    <PInputTime
      :hour-cycle="24"
      v-bind="props"
    />
    <PInputTime
      icon="i-lucide-clock"
      v-bind="props"
    />
    <PInputTime
      icon="i-lucide-clock"
      trailing
      v-bind="props"
    />
    <PInputTime
      :avatar="{ src: 'https://github.com/benjamincanac.png' }"
      icon="i-lucide-clock"
      trailing
      v-bind="props"
    />
    <PInputTime
      loading
      v-bind="props"
    />
    <PInputTime
      loading
      trailing
      v-bind="props"
    />
    <PInputTime
      loading
      icon="i-lucide-clock"
      trailing-icon="i-lucide-chevron-down"
      v-bind="props"
    />
  </Matrix>
</template>
