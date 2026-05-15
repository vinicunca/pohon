// @unocss-include

export default {
  slots: {
    root: 'relative my-5 group',
    header: 'flex items-center gap-1.5 border border-border-muted bg-background border-b-0 relative rounded-t-md px-4 py-3',
    filename: 'color-text text-sm/6',
    icon: 'size-4 shrink-0',
    copy: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
    // FIXME: find equivalent for unocss
    base: 'group font-mono text-sm/6 border border-border-muted bg-background-muted rounded-md px-4 py-3 whitespace-pre-wrap wrap-break-word overflow-x-auto focus:outline-none **:[.line]:block **:[.line.highlight]:-mx-4 **:[.line.highlight]:px-4 **:[.line.highlight]:bg-background-accented/50!',
  },
  variants: {
    filename: {
      true: {
        root: '[&>pre]:rounded-t-none [&>pre]:my-0 my-5',
      },
    },
  },
};
