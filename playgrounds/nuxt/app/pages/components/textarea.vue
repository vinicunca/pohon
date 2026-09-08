<script setup lang="ts">
import theme from '#build/ui/textarea';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

const value = ref('Value');
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      placeholder="Color"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      placeholder="Variant"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      placeholder="Size"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PTextarea
      v-model="value"
      autofocus
      v-bind="props"
    />
    <PTextarea
      default-value="Default value"
      v-bind="props"
    />
    <PTextarea
      placeholder="Highlight"
      highlight
      v-bind="props"
    />
    <PTextarea
      disabled
      placeholder="Disabled"
      v-bind="props"
    />
    <PTextarea
      required
      placeholder="Required"
      v-bind="props"
    />
    <PTextarea
      icon="i-lucide-search"
      placeholder="Search..."
      :rows="1"
      v-bind="props"
    />
    <PTextarea
      icon="i-lucide-search"
      trailing
      placeholder="Search..."
      :rows="1"
      v-bind="props"
    />
    <PTextarea
      :avatar="{ src: 'https://github.com/praburangki.png' }"
      icon="i-lucide-search"
      trailing
      placeholder="Search..."
      :rows="1"
      v-bind="props"
    />
    <PTextarea
      loading
      placeholder="Loading..."
      :rows="1"
      v-bind="props"
    />
    <PTextarea
      loading
      trailing
      placeholder="Loading..."
      :rows="1"
      v-bind="props"
    />
    <PTextarea
      loading
      icon="i-lucide-search"
      trailing-icon="i-lucide-chevron-down"
      placeholder="Loading..."
      :rows="1"
      v-bind="props"
    />
    <PTextarea
      placeholder="Autoresize"
      autoresize
      :maxrows="5"
      :rows="1"
      v-bind="props"
    />
  </Matrix>
</template>
