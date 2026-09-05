<script setup lang="ts">
import type { ButtonProps } from 'pohon-ui'

const actions: ButtonProps[] = [
  { label: 'Approve', onClick: () => console.log('approve') },
  { label: 'Deny', color: 'neutral', variant: 'soft', onClick: () => console.log('deny') }
]
</script>

<template>
  <Navbar />

  <div class="w-72 flex flex-col gap-4 items-start">
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
      Found 5 matching components.
    </PChatTool>

    <PChatTool
      text="Searched components"
      icon="i-lucide-search"
      variant="card"
      class="w-full"
    >
      Found 5 matching components.
    </PChatTool>

    <PChatTool
      text="Run terminal command"
      suffix="pnpm run lint"
      icon="i-lucide-terminal"
      variant="card"
      chevron="leading"
      class="w-full"
      :actions="actions"
    >
      <pre class="whitespace-pre-wrap">$ pnpm run lint</pre>
    </PChatTool>
  </div>
</template>
