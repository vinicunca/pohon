<script setup lang="ts">
import type { DropdownMenuItem } from 'pohon-ui';

const appConfig = useAppConfig();

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive'];

const items = computed<Array<DropdownMenuItem>>(() => [{
  label: 'Primary',
  chip: appConfig.ui.colors.primary,
  children: colors.map((color) => ({
    label: color,
    chip: color,
    checked: appConfig.ui.colors.primary === color,
    type: 'checkbox',
    onSelect: (e) => {
      e.preventDefault();

      appConfig.ui.colors.primary = color;
    },
  })),
}, {
  label: 'Neutral',
  chip: appConfig.ui.colors.neutral === 'neutral' ? 'old-neutral' : appConfig.ui.colors.neutral,
  children: neutrals.map((color) => ({
    label: color,
    chip: color === 'neutral' ? 'old-neutral' : color,
    type: 'checkbox',
    checked: appConfig.ui.colors.neutral === color,
    onSelect: (e) => {
      e.preventDefault();

      appConfig.ui.colors.neutral = color;
    },
  })),
}]);
</script>

<template>
  <PDropdownMenu
    :items="items"
    :content="{ side: 'right', align: 'start' }"
  >
    <PButton
      icon="i-lucide-swatch-book"
      color="neutral"
      variant="ghost"
      class="data-[state=open]:bg-elevated"
      aria-label="Switch theme"
    />

    <template #item-leading="{ item }">
      <div class="inline-flex shrink-0 size-5 items-center justify-center">
        <span
          class="bg---chip-light dark:bg---chip-dark rounded-full size-2 ring ring-background"
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`,
          }"
        />
      </div>
    </template>
  </PDropdownMenu>
</template>
