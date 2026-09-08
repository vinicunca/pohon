// @unocss-include
import type { PThemePageAside } from 'pohon-ui';

export const themePageAside = {
  slots: {
    root: 'py-8 hidden overflow-y-auto lg:(pe-6.5 ps-4 max-h-[calc(100vh-var(--ui-header-height))] block top-$ui-header-height sticky -ms-4)',
    container: 'relative',
    top: 'pointer-events-none sticky z-1 -mt-8 -top-8',
    topHeader: 'px-4 bg-background h-8 -mx-4',
    topBody: 'px-4 bg-background flex flex-col pointer-events-auto relative -mx-4',
    topFooter: 'px-4 h-8 from-background bg-gradient-to-b -mx-4',
  },
} satisfies PThemePageAside;
