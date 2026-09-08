<script setup lang="ts">
import theme from '#build/ui/input-tags';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
});

const tags = ref(['Vue', 'Nuxt']);
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
    <PInputTags
      v-model="tags"
      placeholder="Enter tags..."
      autofocus
      v-bind="props"
    />
    <PInputTags
      :default-value="['TypeScript']"
      placeholder="Enter tags..."
      v-bind="props"
    />
    <PInputTags
      placeholder="Highlight"
      highlight
      v-bind="props"
    />
    <PInputTags
      placeholder="Disabled"
      disabled
      v-bind="props"
    />
    <PInputTags
      placeholder="Required"
      required
      v-bind="props"
    />
    <PInputTags
      placeholder="Search..."
      icon="i-lucide-search"
      v-bind="props"
    />
    <PInputTags
      placeholder="Search..."
      icon="i-lucide-search"
      trailing
      v-bind="props"
    />
    <PInputTags
      :avatar="{ src: 'https://github.com/vuejs.png' }"
      icon="i-lucide-search"
      trailing
      placeholder="Search..."
      v-bind="props"
    />
    <PInputTags
      placeholder="Loading..."
      loading
      v-bind="props"
    />
    <PInputTags
      placeholder="Loading..."
      loading
      trailing
      v-bind="props"
    />
    <PInputTags
      placeholder="Loading..."
      loading
      icon="i-lucide-search"
      trailing-icon="i-lucide-chevron-down"
      v-bind="props"
    />
  </Matrix>
</template>
