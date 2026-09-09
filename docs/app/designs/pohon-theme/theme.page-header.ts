// @unocss-include
import type { PThemePageHeader } from 'pohon-ui';

export const themePageHeader = {
  slots: {
    root: 'py-8 border-b border-border relative',
    container: '',
    wrapper: 'flex flex-col gap-4 lg:(flex-row items-center justify-between)',
    headline: 'text-sm color-primary font-600 mb-2.5 flex gap-1.5 items-center',
    title: 'text-3xl color-text-highlighted font-700 text-pretty sm:text-4xl',
    description: 'text-lg color-text-muted text-pretty',
    links: 'flex flex-wrap gap-1.5 items-center',
  },
  variants: {
    title: {
      true: {
        description: 'mt-4',
      },
    },
  },
} satisfies PThemePageHeader;
