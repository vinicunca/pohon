// @unocss-include
import type { PThemePageLinks } from 'pohon-ui';

export const themePageLinks = {
  slots: {
    root: 'flex flex-col gap-3',
    title: 'text-sm font-600 flex gap-1.5 items-center',
    list: 'flex flex-col gap-2',
    item: 'relative',
    link: 'group text-sm outline-primary/25 rounded-sm flex gap-1.5 items-center focus-visible:outline-3',
    linkLeadingIcon: 'shrink-0 size-5',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'color-text-dimmed size-3 top-0 absolute',
  },
  variants: {
    active: {
      true: {
        link: 'color-primary font-500',
      },
      false: {
        link: 'color-text-muted transition-colors hover:color-text',
      },
    },
  },
} satisfies PThemePageLinks;
