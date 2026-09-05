<script setup lang="ts">
const open = ref(false)
const openCustomAnchor = ref(false)
const loading = ref(false)

function send() {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    open.value = false
  }, 1000)
}
</script>

<template>
  <Navbar />

  <div class="text-center min-h-0">
    <div>
      <PPopover arrow :content="{ side: 'top' }">
        <PButton label="Click me top" color="neutral" variant="outline" />

        <template #content="{ close }">
          <div class="flex justify-center gap-2 p-4 w-48">
            <PButton label="Close" color="neutral" @click="close" />
          </div>
        </template>
      </PPopover>

      <div class="flex items-center gap-2 my-2">
        <PPopover arrow :content="{ side: 'left' }">
          <PButton label="Click me left" color="neutral" variant="outline" />

          <template #content>
            <div class="w-48 h-16" />
          </template>
        </PPopover>

        <PPopover arrow :content="{ side: 'right' }">
          <PButton label="Click me right" color="neutral" variant="outline" />

          <template #content>
            <div class="w-48 h-16" />
          </template>
        </PPopover>
      </div>

      <PPopover v-model:open="open" arrow>
        <PButton label="Click me bottom" color="neutral" variant="outline" />

        <template #content>
          <div class="flex justify-center gap-2 p-4 w-48">
            <PButton label="Close" color="neutral" @click="open = false" />
            <PButton label="Send" color="neutral" trailing-icon="i-lucide-send-horizontal" :loading="loading" @click="send" />
          </div>
        </template>
      </PPopover>

      <div class="mt-8 relative">
        <PPopover
          v-model:open="openCustomAnchor"
          :dismissible="false"
        >
          <template #anchor>
            <PInput placeholder="Search" class="w-56" @focus="openCustomAnchor = true" />
          </template>

          <template #content>
            <Placeholder class="size-48 m-4 inline-flex" />
          </template>
        </PPopover>
      </div>
    </div>

    <div class="mt-24">
      <PPopover mode="hover" arrow :content="{ side: 'top' }">
        <PButton label="Hover me top" color="neutral" variant="outline" />

        <template #content>
          <div class="w-48 h-16" />
        </template>
      </PPopover>

      <div class="flex items-center gap-2 my-2">
        <PPopover mode="hover" arrow :content="{ side: 'left' }">
          <PButton label="Hover me left" color="neutral" variant="outline" />

          <template #content>
            <div class="w-48 h-16" />
          </template>
        </PPopover>

        <PPopover mode="hover" arrow :content="{ side: 'right' }">
          <PButton label="Hover me right" color="neutral" variant="outline" />

          <template #content>
            <div class="w-48 h-16" />
          </template>
        </PPopover>
      </div>

      <PPopover mode="hover" arrow>
        <PButton label="Hover me bottom" color="neutral" variant="outline" />

        <template #content>
          <div class="w-48 h-16" />
        </template>
      </PPopover>
    </div>
  </div>
</template>
