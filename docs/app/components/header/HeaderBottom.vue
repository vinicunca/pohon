<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from 'pohon-ui/utils/content'

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const items = computed(() => mapContentNavigation(navigation?.value.map(item => ({ ...item, children: undefined })) ?? [])?.map(item => ({
  ...item,
  active: route.path.startsWith(item.to as string)
})))
</script>

<template>
  <PSeparator class="hidden lg:flex" />

  <PContainer class="hidden lg:flex items-center justify-between">
    <PNavigationMenu :items="items" variant="pill" highlight class="-mx-2.5 -mb-px" />

    <FrameworkTabs class="w-40" />
  </PContainer>
</template>
