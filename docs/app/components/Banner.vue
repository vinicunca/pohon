<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <UBanner
    id="nuxt-ui-v4"
    title="Pohon v4 is officially released!"
    to="https://github.com/vinicunca/pohon/releases/tag/v4.0.0"
    icon="i-lucide-rocket"
    close
    :actions="[{
      label: 'Read the post',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: appConfig.ui.icons.arrowRight,
      to: 'https://nuxt.com/blog/nuxt-ui-v4',
      target: '_blank',
      class: 'ring-0'
    }]"
  />
</template>
