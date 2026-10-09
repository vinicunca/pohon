import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative isolate',
    item: 'w-full',
    listWithChildren: 'border-s border-border',
    itemWithChildren: 'ps-1.5 -ms-px',
    link: 'group text-sm flex w-full select-none items-center relative focus-visible:outline-none focus:outline-none before:rounded-md before:content-empty before:inset-x-0 before:inset-y-px before:absolute before:-z-1 focus-visible:before:outline-3',
    linkLeadingIcon: 'shrink-0 relative',
    linkLabel: 'truncate',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingIcon: 'shrink-0 transition-transform-280 ease-out group-data-[expanded]:rotate-180 motion-reduce:transition-none',
  },
  variants: {
    virtualize: {
      true: {
        root: 'overflow-y-auto',
      },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        link: `before:outline-${color}/25`,
      }])),
      neutral: {
        link: 'before:outline-outline-inverted/25',
      },
    },
    size: {
      xs: {
        listWithChildren: 'ms-4',
        link: 'px-2 py-1 text-xs gap-1',
        linkLeadingIcon: 'size-4',
        linkTrailingIcon: 'size-4',
      },
      sm: {
        listWithChildren: 'ms-4.5',
        link: 'px-2.5 py-1.5 text-xs gap-1.5',
        linkLeadingIcon: 'size-4',
        linkTrailingIcon: 'size-4',
      },
      md: {
        listWithChildren: 'ms-5',
        link: 'px-2.5 py-1.5 text-sm gap-1.5',
        linkLeadingIcon: 'size-5',
        linkTrailingIcon: 'size-5',
      },
      lg: {
        listWithChildren: 'ms-5.5',
        link: 'px-3 py-2 text-sm gap-2',
        linkLeadingIcon: 'size-5',
        linkTrailingIcon: 'size-5',
      },
      xl: {
        listWithChildren: 'ms-6',
        link: 'px-3 py-2 text-base gap-2',
        linkLeadingIcon: 'size-6',
        linkTrailingIcon: 'size-6',
      },
    },
    selected: {
      true: {
        link: 'before:bg-background-elevated',
      },
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75',
      },
    },
  },
  compoundVariants: [...(options.theme.colors || []).map((color: string) => ({
    color,
    selected: true,
    class: {
      link: `color-${color}`,
    },
  })), {
    color: 'neutral',
    selected: true,
    class: {
      link: 'color-text-highlighted',
    },
  }, {
    selected: false,
    disabled: false,
    class: {
      link: ['hover:color-text-highlighted hover:before:bg-background-elevated/50', options.theme.transitions && 'transition-colors before:transition-colors'],
    },
  }],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});
