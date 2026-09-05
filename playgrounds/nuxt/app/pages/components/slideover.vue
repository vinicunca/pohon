<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const LazySlideoverExample = defineAsyncComponent(() => import('../../components/SlideoverExample.vue'))

const open = ref(false)
const inset = ref(false)
const count = ref(0)
const overlay = useOverlay()

const slideover = overlay.create(LazySlideoverExample, {
  props: {
    count: count.value
  }
})

function openSlideover() {
  count.value++

  slideover.open({ count: count.value })
}
</script>

<template>
  <Navbar>
    <PSwitch v-model="inset" label="Inset" />
  </Navbar>

  <div class="flex flex-col gap-2 min-h-0">
    <PSlideover title="First slideover" :inset="inset">
      <PButton color="neutral" variant="outline" label="Open with nested" />

      <template #body>
        <Placeholder class="size-full" />
      </template>

      <template #footer>
        <PSlideover title="Second slideover" :inset="inset">
          <PButton label="Open second" />
        </PSlideover>
      </template>
    </PSlideover>

    <PSlideover title="Slideover on left side" description="This slideover has `side: 'left'` prop." side="left" :inset="inset">
      <PButton label="Open on left" color="neutral" variant="subtle" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover on top side" description="This slideover has `side: 'top'` prop." side="top" :inset="inset">
      <PButton label="Open on top" color="neutral" variant="outline" />

      <template #body>
        <Placeholder class="h-48 w-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover on bottom side" description="This slideover has `side: 'bottom'` prop." side="bottom" :inset="inset">
      <PButton label="Open on bottom" color="neutral" variant="subtle" />

      <template #body>
        <Placeholder class="h-48 w-full" />
      </template>
    </PSlideover>

    <PSlideover v-model:open="open" title="Slideover with v-model" description="This is useful to control the state yourself." :inset="inset">
      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PButton label="Open with v-model" color="neutral" variant="outline" @click="open = true" />

    <PSlideover title="Slideover without overlay" description="This slideover has `overlay: false` prop." :overlay="false" :inset="inset">
      <PButton label="Open without overlay" color="neutral" variant="subtle" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover without modal & overlay" description="This slideover has `modal: false` and `overlay: false` to interact with outside content." :overlay="false" :modal="false" :inset="inset">
      <PButton label="Open without modal" color="neutral" variant="outline" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover without transition" description="This slideover has `transition: false` prop." :transition="false" :inset="inset">
      <PButton label="Open without transition" color="neutral" variant="subtle" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover without portal" description="This slideover has `portal: false` prop." :portal="false" :inset="inset">
      <PButton label="Open without portal" color="neutral" variant="outline" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover
      title="Slideover prevent close"
      description="This slideover has `dismissible: false` prop so it won't close when clicking outside."
      :dismissible="false"
      :modal="false"
      :overlay="false"
      :inset="inset"
    >
      <PButton label="Open unclosable" color="neutral" variant="subtle" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover without close button" description="This slideover has `close: false` prop." :close="false" :inset="inset">
      <PButton label="Open without close button" color="neutral" variant="outline" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PSlideover title="Slideover with custom close button" description="The `close` prop inherits from the Button props." :close="{ color: 'primary', variant: 'solid', size: 'xs' }" :ui="{ close: 'top-3.5 rounded-full' }" :inset="inset">
      <PButton label="Open with custom close button" color="neutral" variant="subtle" />

      <template #body>
        <Placeholder class="size-full" />
      </template>
    </PSlideover>

    <PButton label="Open programmatically" color="neutral" variant="outline" @click="openSlideover" />

    <PSlideover title="Slideover with scoped slot close" description="This slideover has a scoped slot close that can be used to close the slideover from within the content." :inset="inset">
      <PButton color="neutral" variant="subtle" label="Open with scoped slot close" />

      <template #header="{ close }">
        <PButton label="Close with scoped slot close" @click="close" />
      </template>

      <template #body="{ close }">
        <PButton label="Close with scoped slot close" @click="close" />
      </template>

      <template #footer="{ close }">
        <PButton label="Close with scoped slot close" @click="close" />
      </template>
    </PSlideover>
  </div>
</template>
