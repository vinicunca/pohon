// @unocss-include
import type { PThemePageList } from 'pohon-ui';

export const themePageList = {
  base: 'flex flex-col relative',
  variants: {
    divide: {
      true: '*:not-last:after:bg-border *:not-last:after:h-px *:not-last:after:inset-x-1 *:not-last:after:bottom-0 *:not-last:after:absolute',
    },
  },
} satisfies PThemePageList;
