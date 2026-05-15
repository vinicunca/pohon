// @unocss-include

export default {
  slots: {
    root: 'relative group *:not-first:my-0! *:not-first:static! my-5',
    list: 'relative flex items-center gap-1 border border-border-muted bg-background border-b-0 rounded-t-md overflow-x-auto p-2',
    indicator: 'absolute left-0 inset-y-2 w-$akar-tabs-indicator-size translate-x-$akar-tabs-indicator-position transition-[transform,width] duration-200 bg-background-elevated rounded-md shadow-xs',
    trigger: 'relative inline-flex items-center gap-1.5 color-text data-[state=active]:color-text-highlighted hover:bg-background-elevated/50 px-2 py-1.5 text-sm rounded-md disabled:cursor-not-allowed disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary focus:outline-none transition-colors',
    triggerIcon: 'size-4 shrink-0',
    triggerLabel: 'truncate',
  },
};
