// @unocss-include

import type { PThemeCard } from 'pohon-ui';

export const card = {
  slots: {
    root: 'rounded-lg overflow-hidden',
    header: 'p-4 sm:px-6',
    title: 'color-text-highlighted font-semibold',
    description: 'mt-1 color-text-muted text-sm',
    body: 'p-4 sm:p-6',
    footer: 'p-4 sm:px-6',
  },
  variants: {
    variant: {
      solid: {
        root: 'bg-background-inverted color-text-inverted',
        title: 'color-text-inverted',
        description: 'color-text-dimmed',
      },
      outline: {
        root: 'bg-background ring ring-ring divide-y divide-divide',
      },
      soft: {
        root: 'bg-background-elevated/50 divide-y divide-divide',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring ring-ring divide-y divide-divide',
      },
    },
  },
} satisfies PThemeCard;
