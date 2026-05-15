<script setup lang="ts">
import * as locales from 'pohon-ui/locale';

const locale = ref('en');
</script>

<template>
  <Navbar to="https://pohon.vinicunca.dev/docs/getting-started/integrations/i18n" />

  <PLocaleSelect
    v-model="locale"
    :locales="Object.values(locales)"
  />
</template>
