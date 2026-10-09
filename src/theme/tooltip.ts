export default {
  slots: {
    content: 'text-xs color-text-highlighted px-2.5 py-1 rounded-sm bg-background flex gap-1 h-6 max-w-[400px] pointer-events-auto select-none ring ring-ring shadow-sm origin-$akar-tooltip-content-transform-origin items-center data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    arrow: 'fill-fill-bg stroke-stroke',
    text: 'truncate',
    kbds: 'shrink-0 gap-0.5 hidden items-center lg:inline-flex not-first-of-type:before:me-0.5 not-first-of-type:before:content-[\'·\']',
    kbdsSize: 'sm',
  },
};
