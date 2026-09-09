<script setup lang="ts">
import theme from '#build/ui/page-feature';

const orientations = Object.keys(theme.variants.orientation);

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation);
</script>

<template>
  <Navbar>
    <PSelect
      v-model="orientation"
      :items="orientations"
    />
  </Navbar>

  <PPageFeature
    title="Theme"
    description="Customize Pohon UI with your own colors, fonts, and more."
    icon="i-lucide-swatch-book"
    :orientation="orientation"
    to="https://pohon.vinicunca.dev/docs/getting-started/theme/design-system"
    target="_blank"
  />
</template>
