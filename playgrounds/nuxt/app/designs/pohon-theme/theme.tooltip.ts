// @unocss-include
import type { PThemeTooltip } from 'pohon-ui';

export const themeTooltip = {
  slots: {
    content: 'bg-background color-text-highlighted ring-ring text-xs px-2.5 py-1 rounded-sm flex gap-1 h-6 pointer-events-auto select-none ring shadow-sm origin-$akar-tooltip-content-transform-origin items-center data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] data-[state=delayed-open]:animate-[scale-in_100ms_var(--ease-out)]',
    arrow: 'fill-bg stroke-default',
    text: 'truncate',
    kbds: 'shrink-0 gap-0.5 hidden items-center lg:inline-flex not-first-of-type:before:me-0.5 not-first-of-type:before:content-[·]',
    kbdsSize: 'sm',
  },
} satisfies PThemeTooltip;
