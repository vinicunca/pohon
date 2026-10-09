import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    content: 'bg-background ring-ring rounded-md flex flex-col max-h-$akar-context-menu-content-available-height min-w-32 ring shadow-lg origin-$akar-context-menu-content-transform-origin overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    viewport: 'relative divide-y divide-divide scroll-py-1 overflow-y-auto flex-1',
    group: 'p-1 isolate',
    label: 'w-full flex items-center font-600 color-text-highlighted',
    separator: '-mx-1 my-1 h-px bg-border',
    item: 'group outline-none flex w-full select-none items-start relative before:rounded-md before:inset-px before:absolute before:-z-1 before:content-empty data-[disabled]:opacity-75 data-[disabled]:cursor-not-allowed',
    itemLeadingIcon: 'shrink-0',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemTrailingKbdsSize: '',
    itemWrapper: 'flex-1 flex flex-col text-start min-w-0',
    itemLabel: 'truncate',
    itemDescription: 'truncate color-text-muted',
    itemLabelExternalIcon: 'inline-block size-3 align-top color-text-dimmed',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    active: {
      true: {
        item: 'color-text-highlighted before:bg-background-elevated',
        itemLeadingIcon: 'color-text',
      },
      false: {
        item: ['color-text data-[highlighted]:color-text-highlighted data-[state=open]:color-text-highlighted data-[highlighted]:before:bg-background-elevated/50 data-[state=open]:before:bg-background-elevated/50', options.theme.transitions && 'transition-colors before:transition-colors'],
        itemLeadingIcon: ['color-text-dimmed group-data-[highlighted]:color-text group-data-[state=open]:color-text', options.theme.transitions && 'transition-colors'],
      },
    },
    loading: {
      true: {
        itemLeadingIcon: 'animate-spin',
      },
    },
    size: {
      xs: {
        label: 'p-1 text-xs gap-1',
        item: 'p-1 text-xs gap-1',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm',
      },
      sm: {
        label: 'p-1.5 text-xs gap-1.5',
        item: 'p-1.5 text-xs gap-1.5',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm',
      },
      md: {
        label: 'p-1.5 text-sm gap-1.5',
        item: 'p-1.5 text-sm gap-1.5',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'md',
      },
      lg: {
        label: 'p-2 text-sm gap-2',
        item: 'p-2 text-sm gap-2',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'md',
      },
      xl: {
        label: 'p-2 text-base gap-2',
        item: 'p-2 text-base gap-2',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatarSize: 'xs',
        itemTrailingIcon: 'size-6',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'lg',
      },
    },
  },
  compoundVariants: [...(options.theme.colors || []).map((color: string) => ({
    color,
    active: false,
    class: {
      item: `color-${color} data-[highlighted]:color-${color} data-[highlighted]:before:bg-${color}/10 data-[state=open]:before:bg-${color}/10`,
      itemLeadingIcon: `color-${color}/75 group-data-[highlighted]:color-${color} group-data-[state=open]:color-${color}`,
    },
  })), ...(options.theme.colors || []).map((color: string) => ({
    color,
    active: true,
    class: {
      item: `color-${color} before:bg-${color}/10`,
      itemLeadingIcon: `color-${color}`,
    },
  }))],
  defaultVariants: {
    size: 'md',
  },
});
