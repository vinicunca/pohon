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

  <div class="flex flex-col gap-2 min-h-0">
    <PDrawer
      v-model:open="open"
      title="Drawer with v-model"
      description="This is useful to control the state yourself."
      :inset="inset"
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
      should-scale-background
      title="Drawer with `should-scale-background`"
      description="You need to add the `data-vaul-drawer-wrapper` directive to your content to make it work."
      :inset="inset"
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
      should-scale-background
    >
      <PButton
        color="neutral"
        variant="outline"
        label="Open nested"
      />

      <template #footer>
        <PDrawer
          :inset="inset"
          nested
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
      title="Drawer with bottom direction"
      direction="bottom"
      :inset="inset"
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
  </div>
</template>
