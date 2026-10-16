<script setup lang="ts">
const open = ref(false);
const inset = ref(false);
</script>

<template>
  <Navbar>
    <PSwitch
      v-model="inset"
      label="Inset"
    />
  </Navbar>

  <PDrawerProvider
    scale
    class="flex-1"
    :ui="{ content: 'flex flex-col gap-2 min-h-0' }"
  >
    <PDrawer
      v-model:open="open"
      title="Drawer with v-model"
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open with v-model"
      />

      <template #body>
        <Placeholder class="h-48 w-full" />
      </template>

      <template #footer>
        <PButton
          label="Submit"
          color="neutral"
          class="justify-center"
        />
        <PButton
          label="Cancel"
          color="neutral"
          variant="outline"
          class="justify-center"
          @click="open = false"
        />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with background scaling"
      description="Wrap page content in PDrawerProvider with scale to enable background scaling."
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open with scale"
      />

      <template #body>
        <Placeholder class="h-screen w-full" />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with nested"
      :inset="inset"
      :ui="{ content: 'h-full' }"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open nested"
      />

      <template #footer>
        <PDrawer
          :inset="inset"
          :ui="{ content: 'h-full' }"
        >
          <PButton
            color="neutral"
            variant="outline"
            label="Open nested"
          />

          <template #content>
            <Placeholder class="m-4 flex-1" />
          </template>
        </PDrawer>
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer prevent close"
      description="This drawer has `dismissible: false` prop so it won't close when clicking outside."
      :dismissible="false"
      :modal="false"
      :overlay="false"
      :inset="inset"
      close
    >
      <PButton
        label="Open unclosable"
        color="neutral"
        variant="outline"
      />

      <template #body>
        <Placeholder class="h-96 w-full" />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with snap points"
      :snap-points="[0.5, 1]"
      :default-snap-point="0.5"
      snap-to-sequential-points
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open with snap points"
      />
      <template #body>
        <Placeholder class="h-screen w-full" />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with bottom direction"
      direction="bottom"
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open on bottom"
      />

      <template #body>
        <Placeholder class="h-96 w-full" />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with left direction"
      direction="left"
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open on left"
      />

      <template #body>
        <Placeholder class="h-full w-96" />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with top direction"
      direction="top"
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open on top"
      />

      <template #body>
        <Placeholder class="h-96 w-full" />
      </template>
    </PDrawer>

    <PDrawer
      title="Drawer with right direction"
      direction="right"
      :inset="inset"
      close
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open on right"
      />

      <template #body>
        <Placeholder class="h-full w-96" />
      </template>
    </PDrawer>
  </PDrawerProvider>
</template>
