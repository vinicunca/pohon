// @unocss-include
import type { PThemeTooltip } from 'pohon-ui';

export const tooltip = {
  slots: {
    content: 'flex items-center gap-1 bg-background color-text-highlighted shadow-sm rounded-sm ring ring-ring h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--akar-tooltip-content-transform-origin) pointer-events-auto',
    arrow: 'fill-background stroke-border',
    text: 'truncate',
    kbds: 'shrink-0 gap-0.5 hidden items-center lg:inline-flex not-first-of-type:before:(me-0.5 content-["·"])',
    kbdsSize: 'sm',
  },
} satisfies PThemeTooltip;
