<script setup lang="ts">
</script>

<template>
  <Navbar />

  <div class="flex flex-col gap-4 w-60 items-start">
    <PChatTool
      text="Searched components"
      icon="i-lucide-search"
    />

    <PChatTool
      text="Reading component"
      suffix="Button"
      icon="i-lucide-file-text"
      streaming
    />

    <PChatTool
      text="Searching components..."
      icon="i-lucide-search"
      streaming
      loading
    />

    <PChatTool
      text="Searching components"
      icon="i-lucide-search"
      chevron="leading"
    >
      <div class="text-sm color-text-muted">
        Found 5 matching components.
      </div>
    </PChatTool>

    <PChatTool
      text="Searched components"
      icon="i-lucide-search"
      variant="card"
      class="w-full"
    >
      Found 5 matching components.
    </PChatTool>
  </div>
</template>
