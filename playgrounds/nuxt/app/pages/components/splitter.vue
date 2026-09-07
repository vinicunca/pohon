<script setup lang="ts">
import type { SplitterItem } from 'pohon-ui'

const card = 'bg-background-elevated/50 border border-default rounded-xl items-center justify-center text-muted font-600'

const items: SplitterItem[] = [
  { slot: 'a', minSize: 20, class: card },
  { slot: 'bc', minSize: 20 }
]

const nested: SplitterItem[] = [
  { slot: 'b', minSize: 20, class: card },
  { slot: 'c', minSize: 20, class: card }
]
</script>

<template>
  <Navbar />

  <div class="flex-1 w-full">
    <PSplitter id="splitter" orientation="horizontal" :items="items">
      <template #a>
        Panel A
      </template>

      <template #bc>
        <PSplitter id="splitter-nested" orientation="vertical" :items="nested">
          <template #b>
            Panel B
          </template>

          <template #c>
            Panel C
          </template>
        </PSplitter>
      </template>
    </PSplitter>
  </div>
</template>
