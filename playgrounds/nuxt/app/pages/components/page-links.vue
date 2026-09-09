<script setup lang="ts">
const links = [{
  label: 'Edit this page',
  to: 'https://github.com/vinicunca/pohon/edit/v4/docs/content/page-links.md',
  target: '_blank',
  icon: 'i-lucide-file-pen',
}, {
  label: 'Star on GitHub',
  to: 'https://github.com/vinicunca/pohon',
  target: '_blank',
  icon: 'i-lucide-star',
  active: true,
}, {
  label: 'Releases',
  to: 'https://github.com/vinicunca/pohon/releases',
  target: '_blank',
  icon: 'i-lucide-rocket',
}];
</script>

<template>
  <Navbar />

  <PPageLinks
    title="Community"
    :links="links"
  />
</template>
