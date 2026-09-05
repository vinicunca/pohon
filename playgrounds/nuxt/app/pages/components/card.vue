<script setup lang="ts">
import theme from '#build/ui/card'

const variants = Object.keys(theme.variants.variant)

const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.variant" :items="variants" multiple />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs">
    <PCard
      title="Card title"
      description="A short description for the card."
      v-bind="props"
      :ui="{ footer: 'flex justify-end' }"
      class="w-80"
    >
      <Placeholder class="h-24" />

      <template #footer>
        <PButton label="Save" color="neutral" />
      </template>
    </PCard>
  </Matrix>
</template>
