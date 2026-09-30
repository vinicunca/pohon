<script setup lang="ts">
const studioIcons = useStudioIcons()
</script>

<template>
  <PBanner
    id="pohon-ui-v2"
    title="Pohon UI v2 release candidate is available"
    to="https://github.com/vinicunca/pohon/releases"
    :icon="studioIcons.rocket"
    close
  />
</template>
