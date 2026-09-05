<script setup lang="ts">
const items = [
  {
    label: 'Is Pohon UI free to use?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! Pohon UI is completely free and open source under the MIT license. All 125+ components are available to everyone.'
  },
  {
    label: 'Can I use Pohon UI with Vue without Nuxt?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! While optimized for Nuxt, Pohon UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.'
  },
  {
    label: 'Will Pohon UI work with other CSS frameworks like UnoCSS?',
    icon: 'i-lucide-circle-help',
    content: 'No. Pohon UI is designed exclusively for Tailwind CSS. UnoCSS support would require significant architecture changes due to different class naming conventions.'
  },
  {
    label: 'How does Pohon UI handle accessibility?',
    icon: 'i-lucide-circle-help',
    content: 'Through [Reka UI](https://reka-ui.com/docs/overview/accessibility) integration, Pohon UI provides automatic ARIA attributes, keyboard navigation, focus management, and screen reader support. While offering a strong foundation, testing in your specific use case remains important.'
  },
  {
    label: 'How is Pohon UI tested?',
    icon: 'i-lucide-circle-help',
    content: 'Pohon UI ensures reliability with 1000+ Vitest tests covering core functionality and accessibility.'
  },
  {
    label: 'Is Pohon UI production-ready?',
    icon: 'i-lucide-circle-help',
    content: 'Yes! Pohon UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.'
  }
]
</script>

<template>
  <PAccordion
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
  </PAccordion>
</template>
