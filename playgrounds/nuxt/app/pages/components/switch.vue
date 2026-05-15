<script setup lang="ts">
import theme from '#build/ui/switch';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
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
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PSwitch
      v-model="value"
      label="Model value"
      v-bind="props"
    />
    <PSwitch
      label="Default value"
      :default-value="true"
      v-bind="props"
    />
    <PSwitch
      label="Required"
      required
      v-bind="props"
    />
    <PSwitch
      label="Disabled"
      disabled
      v-bind="props"
    />
    <PSwitch
      label="Icon"
      :default-value="true"
      checked-icon="i-lucide-check"
      unchecked-icon="i-lucide-x"
      v-bind="props"
    />
    <PSwitch
      label="Loading"
      loading
      :default-value="true"
      v-bind="props"
    />
    <PSwitch
      label="Loading icon"
      loading
      loading-icon="i-lucide-loader"
      :default-value="true"
      v-bind="props"
    />
    <PSwitch
      label="Description"
      description="This is a description"
      v-bind="props"
    />
  </Matrix>
</template>
