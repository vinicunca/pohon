// @unocss-include

import type { PThemePageCta } from 'pohon-ui';

export const themePageCta = {
  slots: {
    root: 'rounded-xl relative overflow-hidden isolate',
    container: 'px-6 py-12 flex flex-col gap-8 lg:(px-16 py-24 grid) sm:(px-12 py-24 gap-16)',
    wrapper: '',
    header: '',
    title: 'text-3xl color-text-highlighted tracking-tight font-700 text-pretty sm:text-4xl',
    description: 'text-base color-text-muted sm:text-lg',
    body: 'mt-8',
    footer: 'mt-8',
    links: 'flex flex-wrap gap-x-6 gap-y-3',
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:(grid-cols-2 items-center)',
        description: 'text-pretty',
      },
      vertical: {
        container: '',
        title: 'text-center',
        description: 'text-center text-balance',
        links: 'justify-center',
      },
    },
    reverse: {
      true: {
        wrapper: 'order-last',
      },
    },
    variant: {
      solid: {
        root: 'color-text-inverted bg-background-inverted',
        title: 'color-text-inverted',
        description: 'pohon:color-text-dimmed',
      },
      outline: {
        root: 'bg-background ring ring-ring',
        description: 'color-text-muted',
      },
      soft: {
        root: 'bg-background-elevated/50',
        description: 'color-text-toned',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring ring-ring',
        description: 'color-text-toned',
      },
      naked: {
        description: 'color-text-muted',
      },
    },
    title: {
      true: {
        description: 'mt-6',
      },
    },
  },
} satisfies PThemePageCta;
