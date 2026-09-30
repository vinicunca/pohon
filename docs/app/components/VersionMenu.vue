<script setup lang="ts">
const config = useRuntimeConfig().public
</script>

<template>
  <PBadge color="primary" variant="subtle" size="sm">
    v{{ config.version }}
  </PBadge>
</template>
