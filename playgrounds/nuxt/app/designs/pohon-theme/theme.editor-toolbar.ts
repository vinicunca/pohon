// @unocss-include

import type { PThemeEditorToolbar } from 'pohon-ui';

export const themeEditorToolbar = {
  slots: {
    root: 'focus:outline-none',
    base: 'flex gap-1.5 items-stretch',
    group: 'flex gap-0.5 items-center',
    separator: 'bg-border w-px self-stretch',
  },
  variants: {
    layout: {
      bubble: {
        base: 'p-1 border border-border rounded-lg bg-background',
      },
      floating: {
        base: 'p-1 border border-border rounded-lg bg-background',
      },
      fixed: {
        base: '',
      },
    },
  },
} satisfies PThemeEditorToolbar;
