import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    content: 'rounded-md bg-background flex flex-col max-h-96 max-w-60 min-w-48 ring ring-ring shadow-lg origin-$akar-dropdown-menu-content-transform-origin overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    viewport: 'relative divide-y divide-divide scroll-py-1 overflow-y-auto flex-1',
    group: 'p-1 isolate',
    label: 'color-text-highlighted font-semibold flex w-full items-center',
    separator: '-mx-1 my-1 h-px bg-border',
    item: 'group outline-none flex w-full select-none items-start relative before:rounded-md before:content-empty before:inset-px before:absolute before:-z-1 data-[disabled]:opacity-75 data-[disabled]:cursor-not-allowed',
    itemLeadingIcon: 'shrink-0 flex items-center justify-center',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemWrapper: 'flex-1 flex flex-col text-start min-w-0',
    itemLabel: 'truncate',
    itemDescription: 'truncate color-text-muted',
    itemLabelExternalIcon: 'inline-block size-3 align-top color-text-dimmed',
  },
  variants: {
    size: {
      xs: {
        label: 'p-1 text-[10px]/3 gap-1',
        item: 'p-1 text-xs gap-1',
        itemLeadingIcon: 'size-4 text-sm',
        itemLeadingAvatarSize: '3xs',
      },
      sm: {
        label: 'p-1.5 text-[10px]/3 gap-1.5',
        item: 'p-1.5 text-xs gap-1.5',
        itemLeadingIcon: 'size-4 text-sm',
        itemLeadingAvatarSize: '3xs',
      },
      md: {
        label: 'p-1.5 text-xs gap-1.5',
        item: 'p-1.5 text-sm gap-1.5',
        itemLeadingIcon: 'size-5 text-base',
        itemLeadingAvatarSize: '2xs',
      },
      lg: {
        label: 'p-2 text-xs gap-2',
        item: 'p-2 text-sm gap-2',
        itemLeadingIcon: 'size-5 text-base',
        itemLeadingAvatarSize: '2xs',
      },
      xl: {
        label: 'p-2 text-sm gap-2',
        item: 'p-2 text-base gap-2',
        itemLeadingIcon: 'size-6 text-xl',
        itemLeadingAvatarSize: 'xs',
      },
    },
    active: {
      true: {
        item: 'color-text-highlighted before:bg-background-elevated/75',
        itemLeadingIcon: 'color-text',
      },
      false: {
        item: ['color-text data-[highlighted]:not-[[data-disabled]]:color-text-highlighted data-[highlighted]:not-[[data-disabled]]:before:bg-background-elevated/50', options.theme.transitions && 'transition-colors before:transition-colors'],
        itemLeadingIcon: ['color-text-dimmed [.group[data-highlighted]:not([data-disabled])_&]:color-text', options.theme.transitions && 'transition-colors'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
