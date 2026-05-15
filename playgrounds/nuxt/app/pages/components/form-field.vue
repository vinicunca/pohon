<script setup lang="ts">
import theme from '#build/ui/form-field';

const sizes = Object.keys(theme.variants.size);
const orientations = Object.keys(theme.variants.orientation);

const attrs = reactive({
  size: [theme.defaultVariants.size],
  orientation: ['vertical' as const],
});

const feedbacks = [
  {},
  { required: true },
  { description: 'This is a description' },
  { error: 'This is an error' },
  { hint: 'This is a hint' },
  { help: 'Help! I need somebody!' },
];
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      placeholder="Size"
      multiple
    />
    <PSelect
      v-model="attrs.orientation"
      :items="orientations"
      placeholder="Orientation"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <template
      v-for="(feedback, index) in feedbacks"
      :key="index"
    >
      <PFormField
        label="Email"
        name="email"
        v-bind="{ ...feedback, ...props }"
        class="data-[orientation=horizontal]:w-full"
      >
        <PInput placeholder="john@lennon.com" />
      </PFormField>
    </template>
  </Matrix>
</template>
