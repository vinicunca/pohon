<script setup lang="ts">
import theme from '#build/ui/blog-post'

const variants = Object.keys(theme.variants.variant)
const orientations = Object.keys(theme.variants.orientation)

const attrs = reactive({
  variant: [theme.defaultVariants.variant]
})

const orientation = ref('vertical' as keyof typeof theme.variants.orientation)
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.variant" :items="variants" multiple />
    <PSelect v-model="orientation" :items="orientations" />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs" class="gap-4" :class="orientation === 'horizontal' ? 'flex-col' : ''">
    <PBlogPost
      title="Pohon UI v4"
      description="Pohon UI v4 unifies Pohon UI and Pohon UI Pro into one powerful, completely free library. With over 110 components, 12 templates, and a comprehensive Figma kit, all of this is available for free."
      image="https://nuxt.com/assets/blog/nuxt-ui-v4.png"
      to="https://nuxt.com/blog/nuxt-ui-v4"
      target="_blank"
      date="2025-09-22"
      :authors="[{
        name: 'praburangki',
        description: 'benjamincanac',
        avatar: {
          src: 'https://github.com/praburangki.png'
        },
        to: 'https://github.com/benjamincanac',
        target: '_blank'
      }]"
      :orientation="orientation"
      v-bind="props"
      class="data-[orientation=vertical]:w-96"
    />
  </Matrix>
</template>
