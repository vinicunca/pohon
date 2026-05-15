<script setup lang="ts">
import theme from '#build/ui/button';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

function onClick() {
  return new Promise<void>((res) => {
    setTimeout(res, 5000);
  });
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
    <PButton
      label="Button"
      v-bind="props"
    />
    <PButton
      label="Link"
      to="/"
      v-bind="props"
    />
    <PButton
      label="Disabled"
      disabled
      v-bind="props"
    />
    <PButton
      label="Disabled link"
      to="#"
      disabled
      v-bind="props"
    />
    <PButton
      label="Loading"
      loading
      v-bind="props"
    />
    <PButton
      label="Loading"
      loading
      trailing
      v-bind="props"
    />
    <PButton
      label="Loading auto"
      loading-auto
      v-bind="props"
      @click="onClick"
    />
    <PButton
      label="Icon"
      icon="i-lucide-rocket"
      v-bind="props"
    />
    <PButton
      label="Icon"
      icon="i-lucide-chevron-down"
      trailing
      v-bind="props"
    />
    <PButton
      label="Avatar"
      :avatar="{ src: 'https://github.com/benjamincanac.png' }"
      v-bind="props"
    />
    <PButton
      icon="i-lucide-rocket"
      v-bind="props"
      square
    />
    <PButton
      :avatar="{ src: 'https://github.com/benjamincanac.png' }"
      v-bind="props"
      square
    />
  </Matrix>
</template>
