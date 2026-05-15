// @unocss-include

export default {
  slots: {
    root: 'relative lg:h-[450px] my-5 grid lg:grid-cols-3 border border-border-muted rounded-md',
    list: 'isolate relative p-2 border-b lg:border-b-0 lg:border-e border-border-muted overflow-y-auto',
    item: '',
    listWithChildren: 'ms-4.5 border-s border-border',
    itemWithChildren: 'ps-1.5 -ms-px',
    link: 'relative group peer w-full px-2.5 py-1.5 before:inset-y-px before:inset-x-0 flex items-center gap-1.5 text-sm before:absolute before:-z-1 before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',
    linkLeadingIcon: 'size-4 shrink-0',
    linkLabel: 'truncate',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingIcon: 'size-5 transform transition-transform duration-200 shrink-0 group-[data-expanded]:rotate-180',
    content: 'overflow-hidden lg:col-span-2 flex flex-col [&>div]:my-0 [&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div>div]:border-0 [&>div>pre]:border-b-0 [&>div>pre]:border-s-0 [&>div>pre]:border-e-0 [&>div>pre]:rounded-l-none [&>div>pre]:flex-1 [&>div]:overflow-y-auto',
  },
  variants: {
    active: {
      true: {
        link: 'color-text-highlighted before:bg-background-elevated',
      },
      false: {
        link: 'hover:color-text-highlighted hover:before:bg-background-elevated/50 transition-colors before:transition-colors',
      },
    },
  },
};
