<script setup lang="ts">
import theme from '#build/ui/page-card'

const colors = Object.keys(theme.variants.highlightColor)
const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})

const highlight = ref(false)
const highlightColor = ref(theme.defaultVariants.highlightColor)
const spotlight = ref(false)
const spotlightColor = ref(theme.defaultVariants.spotlightColor)

const orientation = ref('vertical' as keyof typeof theme.variants.orientation)
const reverse = ref(false)
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.variant" :items="variants" multiple />
    <PSwitch v-model="highlight" label="Highlight" />
    <PSelect v-model="highlightColor" :items="colors" />
    <PSwitch v-model="spotlight" label="Spotlight" />
    <PSelect v-model="spotlightColor" :items="colors" />
    <PSelect v-model="orientation" :items="orientations" />
    <PSwitch v-model="reverse" label="Reverse" />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs" class="flex-col gap-4">
    <PPageCard
      icon="i-lucide-palette"
      title="Design system"
      description="Build faster with Pohon UI's CSS-first design system powered by Tailwind CSS and its semantic color system combined with a runtime configuration."
      to="https://ui.nuxt.com/docs/theme/design-system"
      target="_blank"
      :highlight="highlight"
      :highlight-color="highlightColor"
      :spotlight="spotlight"
      :spotlight-color="spotlightColor"
      :orientation="orientation"
      :reverse="reverse"
      v-bind="props"
      class="data-[orientation=vertical]:w-80"
    >
      <Placeholder class="size-full aspect-video" />
    </PPageCard>
  </Matrix>
</template>
