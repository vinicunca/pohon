<script setup lang="ts">
import theme from '#build/ui/avatar';

const sizes = Object.keys(theme.variants.size);
const colors = Object.keys(theme.variants.color);

const attrs = reactive({
  size: [theme.defaultVariants.size],
  color: [theme.defaultVariants.color],
});
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PAvatar
      src="https://github.com/praburangki.png"
      alt="praburangki"
      v-bind="props"
    />
    <PAvatar
      icon="i-lucide-image"
      v-bind="props"
    />
    <PAvatar
      alt="praburangki"
      v-bind="props"
    />
    <PAvatar
      :text="props?.size"
      v-bind="props"
    />

    <PAvatarGroup
      v-bind="props"
      :max="2"
    >
      <PChip
        inset
        text="1"
      >
        <PAvatar
          src="https://github.com/praburangki.png"
          alt="praburangki"
        />
      </PChip>
      <PAvatar
        src="https://github.com/romhml.png"
        alt="Romain Hamel"
      />
      <PAvatar
        src="https://github.com/noook.png"
        alt="Neil Richter"
      />
    </PAvatarGroup>

    <PAvatarGroup
      v-bind="props"
      :max="4"
    >
      <PAvatar
        src="https://github.com/praburangki.png"
        alt="praburangki"
      />
      <PAvatar
        src="https://github.com/romhml.png"
        alt="Romain Hamel"
      />
      <PAvatar
        src="https://github.com/noook.png"
        alt="Neil Richter"
      />
    </PAvatarGroup>
  </Matrix>
</template>
