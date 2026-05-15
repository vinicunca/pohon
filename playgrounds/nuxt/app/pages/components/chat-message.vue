<script setup lang="ts">
import theme from '#build/ui/chat-message';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
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
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PChatMessage
      id="1"
      role="user"
      :parts="[{ type: 'text', text: 'Hello, how are you?' }]"
      v-bind="props"
    />
  </Matrix>
</template>
