<script setup lang="ts">
// import { createReusableTemplate, refDebounced } from '@vueuse/core'
import { createReusableTemplate } from '@vueuse/core'
import type { User } from '~/types'
import theme from '#build/ui/command-palette'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
const toast = useToast()

const open = ref(false)
const searchTerm = ref('')
// const searchTermDebounced = refDebounced(searchTerm, 200)
const selected = ref([])
const virtualize = ref(false)
const preserveGroupOrder = ref(false)

const sizes = Object.keys(theme.variants.size)
const size = ref(theme.defaultVariants.size)

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  // params: { q: searchTermDebounced },
  transform: (data: User[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true
})

const loading = ref(false)

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || []
}, {
  id: 'actions',
  items: [{
    label: 'Add new file',
    suffix: 'Create a new file in the current directory or workspace.',
    icon: 'i-lucide-file-plus',
    loading: loading.value,
    onSelect(e: Event) {
      e.preventDefault()

      toast.add({ title: 'New file added!' })

      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, 2000)
    },
    kbds: ['meta', 'N']
  }, {
    label: 'Add new folder',
    suffix: 'Create a new folder in the current directory or workspace.',
    icon: 'i-lucide-folder-plus',
    onSelect(e: Event) {
      e.preventDefault()

      toast.add({ title: 'New folder added!' })
    },
    kbds: ['meta', 'F']
  }, {
    label: 'Add hashtag',
    suffix: 'Add a hashtag to the current item.',
    icon: 'i-lucide-hash',
    onSelect(e: Event) {
      e.preventDefault()

      toast.add({ title: 'Hashtag added!' })
    },
    kbds: ['meta', 'H']
  }, {
    label: 'Add label',
    suffix: 'Add a label to the current item.',
    icon: 'i-lucide-tag',
    onSelect(e: Event) {
      e.preventDefault()

      toast.add({ title: 'Label added!' })
    },
    kbds: ['meta', 'L']
  }, {
    label: 'More actions',
    description: 'More actions to perform on the current item.',
    icon: 'i-lucide-ellipsis',
    placeholder: 'Search actions...',
    children: [{
      label: 'Create new file',
      suffix: 'Create a new file in the current directory or workspace.',
      icon: 'i-lucide-file-plus',
      onSelect(e: Event) {
        e.preventDefault()

        toast.add({ title: 'New file added!' })
      }
    }, {
      label: 'Create new folder',
      suffix: 'Create a new folder in the current directory or workspace.',
      icon: 'i-lucide-folder-plus',
      onSelect(e: Event) {
        e.preventDefault()

        toast.add({ title: 'New folder added!' })
      }
    }, {
      label: 'Share',
      placeholder: 'Search share options...',
      icon: 'i-lucide-share',
      children: [{
        label: 'Share with everyone',
        suffix: 'Share with everyone in the current directory or workspace.',
        icon: 'i-lucide-share',
        onSelect(e: Event) {
          e.preventDefault()

          toast.add({ title: 'Shared with everyone!' })
        }
      }, {
        label: 'Share with team',
        suffix: 'Share with the team in the current directory or workspace.',
        icon: 'i-lucide-users',
        onSelect(e: Event) {
          e.preventDefault()

          toast.add({ title: 'Shared with team!' })
        }
      }]
    }]
  }]
}])

const labels = [{
  label: 'bug',
  chip: {
    color: 'error' as const
  }
}, {
  label: 'feature',
  chip: {
    color: 'success' as const
  }
}, {
  label: 'enhancement',
  chip: {
    color: 'info' as const
  }
}]
const label = ref()

// function onSelect(item: typeof groups.value[number]['items'][number]) {
function onSelect(item: any) {
  console.log('Selected', item)
}

defineShortcuts({
  meta_k: () => open.value = !open.value,
  ...extractShortcuts(groups.value)
})
</script>

<template>
  <Navbar>
    <PSwitch v-model="virtualize" label="Virtualize" />
    <PSwitch v-model="preserveGroupOrder" label="Preserve order" />
    <PSelect v-model="size" :items="sizes" />

    <PModal v-model:open="open">
      <PButton label="Open modal" color="neutral" variant="outline" />

      <template #content>
        <ReuseTemplate :close="true" @update:open="open = $event" />
      </template>
    </PModal>

    <PDrawer should-scale-background>
      <PButton label="Open drawer" color="neutral" variant="outline" />

      <template #content>
        <ReuseTemplate class="border-t border-default mt-4" />
      </template>
    </PDrawer>

    <PPopover :content="{ side: 'right', align: 'start' }">
      <PButton label="Select label (popover)" color="neutral" variant="outline" />

      <template #content>
        <PCommandPalette
          v-model="label"
          :size="size"
          placeholder="Search labels..."
          :groups="[{ id: 'labels', items: labels }]"
        />
      </template>
    </PPopover>
  </Navbar>

  <DefineTemplate>
    <PCommandPalette
      v-model="selected"
      v-model:search-term="searchTerm"
      :size="size"
      :loading="status === 'pending'"
      :groups="groups"
      :fuse="{
        fuseOptions: {
          includeMatches: true
        }
      }"
      multiple
      :preserve-group-order="preserveGroupOrder"
      class="sm:max-h-96"
      @update:model-value="onSelect"
    >
      <template #footer>
        <div class="flex items-center justify-between gap-2">
          <PIcon name="i-simple-icons-nuxtdotjs" class="size-5 text-dimmed ml-1" />
          <div class="flex items-center gap-1">
            <PButton color="neutral" variant="ghost" label="Open" size="xs">
              <template #trailing>
                <PKbd value="enter" />
              </template>
            </PButton>

            <PSeparator orientation="vertical" class="h-4" />

            <PButton color="neutral" variant="ghost" label="Actions" size="xs">
              <template #trailing>
                <PKbd value="meta" />
                <PKbd value="k" />
              </template>
            </PButton>
          </div>
        </div>
      </template>
    </PCommandPalette>
  </DefineTemplate>

  <PCard :ui="{ body: '!p-0' }" class="w-xl">
    <PCommandPalette
      v-if="virtualize"
      virtualize
      :size="size"
      :fuse="{ resultLimit: 1000 }"
      placeholder="Search virtualized items..."
      :groups="[{ id: 'items', items: Array(1000).fill(0).map((_, i) => ({ label: `item-${i}`, value: i, icon: 'i-lucide-file' })) }]"
      class="sm:max-h-96"
    />

    <ReuseTemplate v-else />
  </PCard>
</template>
