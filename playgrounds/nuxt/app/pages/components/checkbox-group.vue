<script setup lang="ts">
import themeCheckbox from '#build/ui/checkbox';
import theme from '#build/ui/checkbox-group';

const colors = Object.keys(theme.variants.color);
const sizes = Object.keys(theme.variants.size);
const variants = Object.keys(theme.variants.variant);
const indicators = Object.keys(themeCheckbox.variants.indicator);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size],
  variant: [theme.defaultVariants.variant],
  indicator: [themeCheckbox.defaultVariants.indicator],
});

const orientation = ref('vertical' as keyof typeof theme.variants.orientation);

const items = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];
const itemsLiteral = [
  'Option 1',
  'Option 2',
  'Option 3',
];
const itemsWithDescription = [
  { value: '1', label: 'Option 1', description: 'Description 1' },
  { value: '2', label: 'Option 2', description: 'Description 2' },
  { value: '3', label: 'Option 3', description: 'Description 3' },
];
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
    <PSelect
      v-model="orientation"
      :items="orientations"
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PCheckboxGroup
      :items="items"
      :default-value="['1']"
      :orientation="orientation"
      v-bind="props"
    />
    <PCheckboxGroup
      :items="itemsLiteral"
      :default-value="['Option 1']"
      :orientation="orientation"
      v-bind="props"
    />
    <PCheckboxGroup
      :items="itemsWithDescription"
      :orientation="orientation"
      v-bind="props"
    />
    <PCheckboxGroup
      :items="items"
      disabled
      :orientation="orientation"
      v-bind="props"
    />
    <PCheckboxGroup
      :items="items"
      legend="Legend"
      :orientation="orientation"
      v-bind="props"
    />
    <PCheckboxGroup
      :items="items"
      legend="Legend"
      required
      :orientation="orientation"
      v-bind="props"
    />
    <PCheckboxGroup
      :items="items"
      :orientation="orientation"
      v-bind="props"
    >
      <template #legend>
        <span class="font-bold italic">
          With slots
        </span>
      </template>
      <template #label="{ item }">
        <span class="italic">
          {{ item.label }}
        </span>
      </template>
    </PCheckboxGroup>
  </Matrix>
</template>
