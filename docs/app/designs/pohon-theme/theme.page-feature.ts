// @unocss-include
import type { PThemePageFeature } from 'pohon-ui';

export const themePageFeature = {
  slots: {
    root: 'rounded-sm relative',
    wrapper: '',
    leading: 'inline-flex items-center justify-center',
    leadingIcon: 'color-primary shrink-0 size-5',
    title: 'text-base color-text-highlighted font-600 text-pretty',
    description: 'text-[15px] color-text-muted text-pretty',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex gap-2.5 items-start',
        leading: 'p-0.5',
      },
      vertical: {
        leading: 'mb-2.5',
      },
    },
    to: {
      true: {
        root: 'outline-primary/25 transition has-focus-visible:outline-3',
      },
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
  },
} satisfies PThemePageFeature;
