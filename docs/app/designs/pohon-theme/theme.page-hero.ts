// @unocss-include
import type { PThemePageHero } from 'pohon-ui';

export const themePageHero = {
  slots: {
    root: 'relative isolate',
    container: 'py-24 flex flex-col gap-16 lg:py-40 sm:py-32 sm:gap-y-24 lg:grid',
    wrapper: '',
    header: '',
    headline: 'mb-4',
    title: 'text-5xl color-text-highlighted tracking-tight font-700 text-pretty sm:text-7xl',
    description: 'text-lg color-text-muted sm:text-xl/8',
    body: 'mt-10',
    footer: 'mt-10',
    links: 'flex flex-wrap gap-x-6 gap-y-3',
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
        description: 'text-pretty',
      },
      vertical: {
        container: '',
        headline: 'justify-center',
        wrapper: 'text-center',
        description: 'text-balance',
        links: 'justify-center',
      },
    },
    reverse: {
      true: {
        wrapper: 'order-last',
      },
    },
    headline: {
      true: {
        headline: 'color-primary font-600 flex gap-1.5 items-center',
      },
    },
    title: {
      true: {
        description: 'mt-6',
      },
    },
  },
} satisfies PThemePageHero;
