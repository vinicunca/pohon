// @unocss-include
import type { PThemePageLogos } from 'pohon-ui';

export const themePageLogos = {
  slots: {
    root: 'relative overflow-hidden',
    title: 'text-lg color-text-highlighted font-600 text-center',
    logos: 'mt-10',
    logo: 'shrink-0 size-10',
  },
  variants: {
    marquee: {
      false: {
        logos: 'flex shrink-0 gap-$gap [--gap:--spacing(16)] items-center justify-around',
      },
    },
  },
} satisfies PThemePageLogos;
