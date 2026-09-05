<template>
  <UTheme
    :props="{
      button: { color: 'neutral', variant: 'subtle', size: 'lg' },
      tooltip: { delayDuration: 0, arrow: true }
    }"
  >
    <div class="flex items-center gap-2">
      <PTooltip text="Inherits delayDuration from theme">
        <UButton label="Hover me" />
      </PTooltip>
      <UButton label="With icon" icon="i-lucide-rocket" />
      <UButton label="Square" icon="i-lucide-star" square />
    </div>
  </UTheme>
</template>
