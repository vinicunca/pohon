import type { ModuleOptions } from '../module';
import { defuFn } from 'defu';
import { fieldGroupVariant } from './field-group';
import input from './input';

export default (options: Required<ModuleOptions>) => {
  return defuFn({
    slots: {
      root: () => undefined,
      base: () => ['group rounded-md inline-flex items-center relative disabled:opacity-75 disabled:cursor-not-allowed', options.theme.transitions && 'transition-colors'],
      value: 'truncate pointer-events-none',
      placeholder: 'truncate color-text-dimmed',
      arrow: 'fill-fill-bg stroke-stroke',
      content: 'bg-background ring-ring rounded-md flex flex-col max-h-[min(15rem,var(--akar-select-content-available-height,15rem))] w-$akar-select-trigger-width pointer-events-auto ring shadow-lg origin-$akar-select-content-transform-origin overflow-hidden data-[state=closed]:pointer-events-none!',
      viewport: 'relative divide-y divide-divide scroll-py-1 overflow-y-auto flex-1',
      group: 'p-1 isolate',
      empty: 'text-center color-text-muted',
      label: 'font-600 color-text-highlighted',
      separator: '-mx-1 my-1 h-px bg-border',
      item: ['group color-text data-[highlighted]:not-[[data-disabled]]:color-text-highlighted data-[highlighted]:not-[[data-disabled]]:before:bg-background-elevated/50 outline-none flex w-full select-none items-start relative before:rounded-md before:content-empty before:inset-px before:absolute before:-z-1 data-[disabled]:opacity-75 data-[disabled]:cursor-not-allowed', options.theme.transitions && 'transition-colors before:transition-colors'],
      itemLeadingIcon: ['color-text-dimmed [.group[data-highlighted]:not([data-disabled])_&]:color-text shrink-0', options.theme.transitions && 'transition-colors'],
      itemLeadingAvatar: 'shrink-0',
      itemLeadingAvatarSize: '',
      itemLeadingChip: 'shrink-0',
      itemLeadingChipSize: '',
      itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
      itemTrailingIcon: 'shrink-0',
      itemWrapper: 'flex-1 flex flex-col min-w-0',
      itemLabel: 'truncate',
      itemDescription: 'truncate color-text-muted',
    },
    variants: {
      ...fieldGroupVariant,
      variant: (prev: Record<string, string>) => ({
        ...prev,
        outline: [prev.outline, 'hover:bg-background-elevated disabled:bg-background'].join(' '),
        subtle: [prev.subtle, 'hover:bg-background-accented/75 disabled:bg-background-elevated'].join(' '),
      }),
      size: {
        xs: {
          label: 'p-1 text-[10px]/3 gap-1',
          item: 'p-1 text-xs gap-1',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          empty: 'p-2 text-xs',
        },
        sm: {
          label: 'p-1.5 text-[10px]/3 gap-1.5',
          item: 'p-1.5 text-xs gap-1.5',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          empty: 'p-2.5 text-xs',
        },
        md: {
          label: 'p-1.5 text-xs gap-1.5',
          item: 'p-1.5 text-sm gap-1.5',
          itemLeadingIcon: 'size-5',
          itemLeadingAvatarSize: '2xs',
          itemLeadingChip: 'size-5',
          itemLeadingChipSize: 'md',
          itemTrailingIcon: 'size-5',
          empty: 'p-2.5 text-sm',
        },
        lg: {
          label: 'p-2 text-xs gap-2',
          item: 'p-2 text-sm gap-2',
          itemLeadingIcon: 'size-5',
          itemLeadingAvatarSize: '2xs',
          itemLeadingChip: 'size-5',
          itemLeadingChipSize: 'md',
          itemTrailingIcon: 'size-5',
          empty: 'p-3 text-sm',
        },
        xl: {
          label: 'p-2 text-sm gap-2',
          item: 'p-2 text-base gap-2',
          itemLeadingIcon: 'size-6',
          itemLeadingAvatarSize: 'xs',
          itemLeadingChip: 'size-6',
          itemLeadingChipSize: 'lg',
          itemTrailingIcon: 'size-6',
          empty: 'p-3 text-base',
        },
      },
      position: {
        'popper': {
          content: 'data-[side=bottom]:translate-y-1 data-[side=bottom]:slide-in-from-top-2 data-[side=right]:translate-x-1 data-[side=right]:slide-in-from-left-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=left]:slide-in-from-right-2 data-[side=left]:-translate-x-1 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:-translate-y-1',
        },
        'item-aligned': {
          content: '',
        },
      },
      multiple: {
        true: '',
      },
    },
    defaultVariants: {
      position: 'popper',
    },
  }, input(options));
};
