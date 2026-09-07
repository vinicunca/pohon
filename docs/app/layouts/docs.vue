<script setup lang="ts">
import { useFilter } from 'pohon-ui/composables'
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { scoreItem } = useFilter()
const { navigationByCategory } = useNavigation(navigation!)

const filteredNavigation = computed(() => {
  if (!cleanedSearchTerm.value) {
    return navigationByCategory.value
  }

  return navigationByCategory.value.map(item => ({
    ...item,
    children: item.children?.filter(child => scoreItem(child, cleanedSearchTerm.value, ['title', 'description']) !== null)
  })).filter(item => item.children && item.children.length > 0)
})

const searchTerm = ref('')
const isSearchActive = computed(() => route.path.startsWith('/docs/components'))
const navigationKey = computed(() => `${route.path}-${searchTerm.value ? 'filtered' : 'unfiltered'}`)
const cleanedSearchTerm = computed(() => {
  return searchTerm.value
    .replace(/^U(?=[A-Z])/, '')
    .replace(/^u-/, '')
})

watch(() => route.path, () => {
  if (!isSearchActive.value) {
    searchTerm.value = ''
  }
})

const input = useTemplateRef('input')

defineShortcuts({
  '/': {
    usingInput: false,
    handler: () => {
      input.value?.inputRef?.focus()
    }
  }
})
</script>

<template>
  <PMain>
    <PContainer>
      <PPage>
        <template #left>
          <PPageAside>
            <template v-if="isSearchActive" #top>
              <PInput ref="input" v-model="searchTerm" variant="soft" placeholder="Filter..." class="group">
                <template #trailing>
                  <PKbd value="/" variant="subtle" class="ring-muted bg-transparent text-muted" />
                </template>
              </PInput>
            </template>

            <PContentNavigation
              :key="navigationKey"
              :collapsible="false"
              :navigation="filteredNavigation"
              highlight
              :ui="{
                linkTrailingBadge: 'font-600 uppercase'
              }"
            />
          </PPageAside>
        </template>

        <slot />
      </PPage>
    </PContainer>
  </PMain>
</template>
