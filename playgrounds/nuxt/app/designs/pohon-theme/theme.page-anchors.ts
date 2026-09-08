// @unocss-include

import type { PThemePageAnchors } from 'pohon-ui';

export const themePageAnchors = {
  slots: {
    root: '',
    list: '',
    item: 'relative',
    link: 'group text-sm py-1 outline-primary/25 rounded-sm flex gap-1.5 items-center focus-visible:outline-3',
    linkLeading: 'p-1 rounded-md inline-flex ring ring-inset',
    linkLeadingIcon: 'shrink-0 size-4',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'color-text-dimmed size-3 top-0 absolute',
  },
  variants: {
    active: {
      true: {
        link: 'color-primary font-600',
        linkLeading: 'color-text-inverted bg-primary ring-primary',
      },
      false: {
        link: 'color-text-muted font-500 transition-colors hover:color-text',
        linkLeading: 'color-text-dimmed bg-background-elevated/50 ring-ring-accented transition group-hover:(color-text-inverted bg-primary ring-primary)',
      },
    },
  },
} satisfies PThemePageAnchors;
