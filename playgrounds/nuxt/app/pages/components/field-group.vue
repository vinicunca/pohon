<script setup lang="ts">
import theme from '#build/ui/field-group'

const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  size: ['md' as keyof typeof theme.variants.size]
})

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.size" :items="sizes" multiple />
    <PSelect v-model="orientation" :items="orientations" />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs">
    <UFieldGroup :orientation="orientation" v-bind="props">
      <UButton color="neutral" variant="outline">
        Button
      </UButton>
    </UFieldGroup>

    <UFieldGroup :orientation="orientation" v-bind="props">
      <PInput placeholder="Search..." />
    </UFieldGroup>

    <UFieldGroup :orientation="orientation" v-bind="props">
      <UButton color="neutral" variant="outline">
        Button
      </UButton>
      <UButton color="neutral" variant="subtle">
        Button
      </UButton>
      <UButton color="neutral" variant="outline">
        Button
      </UButton>
    </UFieldGroup>

    <UFieldGroup :orientation="orientation" v-bind="props">
      <UButton color="neutral" variant="outline">
        Button
      </UButton>
      <PInput placeholder="Search..." />
    </UFieldGroup>

    <UFieldGroup :orientation="orientation" v-bind="props">
      <PInput placeholder="Search..." />
      <UButton color="neutral" variant="outline">
        Button
      </UButton>
    </UFieldGroup>

    <UFieldGroup :orientation="orientation" v-bind="props">
      <UBadge color="neutral" variant="outline" size="lg" label="https://" />
      <PInput color="neutral" variant="outline" placeholder="www.example.com" />
    </UFieldGroup>
  </Matrix>
</template>
