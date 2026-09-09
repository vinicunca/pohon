<script setup lang="ts">
const items = [
  {
    label: 'Is Pohon free to use?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! Pohon is completely free and open source under the MIT license. All 125+ components are available to everyone.'
  },
  {
    label: 'Can I use Pohon with Vue without Nuxt?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! While optimized for Nuxt, Pohon works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.'
  },
  {
    label: 'Will Pohon work with other CSS frameworks like UnoCSS?',
    icon: 'i-lucide-circle-help',
    content: 'No. Pohon is designed exclusively for UnoCSS. UnoCSS support would require significant architecture changes due to different class naming conventions.'
  },
  {
    label: 'How does Pohon handle accessibility?',
    icon: 'i-lucide-circle-help',
    content: 'Through [Akar](https://reka-ui.com/docs/overview/accessibility) integration, Pohon provides automatic ARIA attributes, keyboard navigation, focus management, and screen reader support. While offering a strong foundation, testing in your specific use case remains important.'
  },
  {
    label: 'How is Pohon tested?',
    icon: 'i-lucide-circle-help',
    content: 'Pohon ensures reliability with 1000+ Vitest tests covering core functionality and accessibility.'
  },
  {
    label: 'Is Pohon production-ready?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! Pohon is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.'
  }
]
</script>

<template>
  <UAccordion
    type="multiple"
    :items="items"
    :unmount-on-hide="false"
    :default-value="['3']"
    :ui="{
      trigger: 'text-base',
      body: 'text-base text-muted'
    }"
  >
    <template #body="{ item }">
      <MDC :value="item.content" unwrap="p" />
    </template>
  </UAccordion>
</template>
