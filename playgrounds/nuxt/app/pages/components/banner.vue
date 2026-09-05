<script setup lang="ts">
import theme from '#build/ui/banner'

const colors = Object.keys(theme.variants.color)

const attrs = reactive({
  color: [theme.defaultVariants.color]
})
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.color" :items="colors" multiple />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs" class="flex-col w-full" container-class="w-full">
    <PBanner
      id="banner"
      title="Nuxt UI v4 is officially released!"
      to="https://github.com/nuxt/ui/releases/tag/v4.0.0"
      icon="i-lucide-rocket"
      :actions="[{
        label: 'Read the post',
        color: 'neutral',
        variant: 'outline',
        trailingIcon: 'i-lucide-arrow-right',
        to: 'https://nuxt.com/blog/nuxt-ui-v4',
        target: '_blank',
        class: 'ring-0'
      }]"
      v-bind="props"
    />
    <PBanner
      title="Close me - I'll reappear on page reload (no id prop)"
      :close="true"
      v-bind="props"
    />
    <PBanner
      id="banner3"
      title="Close me - I'll stay closed permanently (id='banner3')"
      :close="true"
      v-bind="props"
    />
  </Matrix>
</template>
