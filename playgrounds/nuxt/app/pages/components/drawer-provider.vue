<template>
  <PDrawerProvider
    scale
    class="min-h-96"
    :ui="{ content: 'min-h-96 p-6' }"
  >
    <p class="color-text-muted mb-4">
      Page content scales down when a descendant drawer opens.
    </p>
    <PDrawer
      title="Background scaling"
      close
    >
      <PButton label="Open drawer" />
      <template #body>
        <Placeholder class="h-48 w-full" />
      </template>
    </PDrawer>
  </PDrawerProvider>
</template>
