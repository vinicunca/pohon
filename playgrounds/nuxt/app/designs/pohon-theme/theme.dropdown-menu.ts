// @unocss-include
import { BRANDS } from '../design.constants';

export const themeDropdownMenu = {
  slots: {
    content: 'bg-background ring-ring rounded-md flex flex-col max-h-(--reka-dropdown-menu-content-available-height) min-w-32 ring shadow-lg origin-(--reka-dropdown-menu-content-transform-origin) overflow-hidden data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] data-[state=open]:animate-[scale-in_100ms_var(--ease-out)]',
    input: 'border-border border-b',
    empty: 'color-text-muted text-center',
    viewport: 'divide-default flex-1 relative overflow-y-auto scroll-py-1 divide-y',
    arrow: 'fill-bg stroke-default',
    group: 'p-1 isolate',
    label: 'color-text-highlighted font-semibold flex w-full items-center',
    separator: 'bg-border my-1 h-px -mx-1',
    item: 'group data-disabled:cursor-not-allowed data-disabled:opacity-75 outline-none flex w-full select-none items-start relative before:rounded-md before:inset-px before:absolute before:z-[-1]',
    itemLeadingIcon: 'shrink-0',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'shrink-0 hidden items-center lg:inline-flex',
    itemTrailingKbdsSize: '',
    itemWrapper: 'text-start flex flex-1 flex-col min-w-0',
    itemLabel: 'truncate',
    itemDescription: 'color-text-muted truncate',
    itemLabelExternalIcon: 'color-text-dimmed align-top size-3 inline-block',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
    active: {
      true: {
        item: 'color-text-highlighted before:bg-background-elevated',
        itemLeadingIcon: 'color-text',
      },
      false: {
        item: ['color-text data-highlighted:color-text-highlighted data-[state=open]:color-text-highlighted data-highlighted:before:bg-background-elevated/50 data-[state=open]:before:bg-background-elevated/50', 'transition-colors before:transition-colors'],
        itemLeadingIcon: ['color-text-dimmed group-data-highlighted:color-text group-data-[state=open]:color-text', 'transition-colors'],
      },
    },
    loading: {
      true: {
        itemLeadingIcon: 'animate-spin',
      },
    },
    size: {
      xs: {
        label: 'text-xs p-1 gap-1',
        item: 'text-xs p-1 gap-1',
        empty: 'text-xs p-2',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm',
      },
      sm: {
        label: 'text-xs p-1.5 gap-1.5',
        item: 'text-xs p-1.5 gap-1.5',
        empty: 'text-xs p-2.5',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm',
      },
      md: {
        label: 'text-sm p-1.5 gap-1.5',
        item: 'text-sm p-1.5 gap-1.5',
        empty: 'text-sm p-2.5',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'md',
      },
      lg: {
        label: 'text-sm p-2 gap-2',
        item: 'text-sm p-2 gap-2',
        empty: 'text-sm p-3',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'md',
      },
      xl: {
        label: 'text-base p-2 gap-2',
        item: 'text-base p-2 gap-2',
        empty: 'text-base p-3',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatarSize: 'xs',
        itemTrailingIcon: 'size-6',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'lg',
      },
    },
  },
  compoundVariants: [...BRANDS.map((color: string) => ({
    color,
    active: false,
    class: {
      item: `text-${color} data-highlighted:text-${color} data-highlighted:before:bg-${color}/10 data-[state=open]:before:bg-${color}/10`,
      itemLeadingIcon: `text-${color}/75 group-data-highlighted:text-${color} group-data-[state=open]:text-${color}`,
    },
  })), ...BRANDS.map((color: string) => ({
    color,
    active: true,
    class: {
      item: `text-${color} before:bg-${color}/10`,
      itemLeadingIcon: `text-${color}`,
    },
  }))],
  defaultVariants: {
    size: 'md',
  },
};
