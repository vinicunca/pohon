import type { ModuleOptions } from '../module';
import { defuFn } from 'defu';
import { fieldGroupVariant, fieldGroupVariantWithRoot } from './field-group';
import input from './input';

export default (options: Required<ModuleOptions>) => {
  return defuFn({
    slots: {
      base: () => ['rounded-md', options.theme.transitions && 'transition-colors'],
      trailing: 'group absolute inset-y-0 end-0 flex items-center disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none',
      trailingClear: 'p-0',
      arrow: 'fill-bg stroke-default',
      content: 'max-h-[min(15rem,var(--akar-combobox-content-available-height,15rem))] w-(--akar-combobox-trigger-width) bg-background shadow-lg rounded-md ring ring-ring overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--akar-combobox-content-transform-origin) pointer-events-auto flex flex-col',
      viewport: 'relative scroll-py-1 overflow-y-auto flex-1',
      group: 'p-1 isolate',
      empty: 'text-center color-text-muted',
      label: 'font-600 color-text-highlighted',
      separator: '-mx-1 my-1 h-px bg-border',
      item: ['group relative w-full flex items-start gap-1.5 p-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 color-text data-highlighted:not-data-disabled:color-text-highlighted data-highlighted:not-data-disabled:before:bg-background-elevated/50', options.theme.transitions && 'transition-colors before:transition-colors'],
      itemLeadingIcon: ['shrink-0 color-text-dimmed group-data-highlighted:not-group-data-disabled:color-text', options.theme.transitions && 'transition-colors'],
      itemLeadingAvatar: 'shrink-0',
      itemLeadingAvatarSize: '',
      itemLeadingChip: 'shrink-0',
      itemLeadingChipSize: '',
      itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
      itemTrailingIcon: 'shrink-0',
      itemWrapper: 'flex-1 flex flex-col min-w-0',
      itemLabel: 'truncate',
      itemDescription: 'truncate color-text-muted',
      tagsItem: 'px-1.5 py-0.5 rounded-sm font-500 inline-flex items-center gap-0.5 ring ring-inset ring-ring-accented bg-background-elevated color-text data-disabled:cursor-not-allowed data-disabled:opacity-75',
      tagsItemText: 'truncate',
      tagsItemDelete: ['inline-flex items-center rounded-xs color-text-dimmed hover:color-text hover:bg-background-accented/75 disabled:pointer-events-none', options.theme.transitions && 'transition-colors'],
      tagsItemDeleteIcon: 'shrink-0',
      tagsInput: 'flex-1 border-0 bg-transparent placeholder:color-text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
    },
    variants: {
      // `root` and `base` are the same element in `multiple` mode, so the
      // `group-*` rounding utilities inherited from `input` never match there.
      // Keep the `group` marker here and pick the right rounding in
      // `compoundVariants` depending on `multiple`.
      fieldGroup: {
        horizontal: () => ({ root: fieldGroupVariantWithRoot.fieldGroup.horizontal.root }),
        vertical: () => ({ root: fieldGroupVariantWithRoot.fieldGroup.vertical.root }),
      },
      virtualize: {
        true: {
          viewport: 'p-1 isolate',
        },
        false: {
          viewport: 'divide-y divide-divide',
        },
      },
      multiple: {
        true: {
          root: 'flex-wrap',
        },
        false: {
          base: 'w-full border-0 placeholder:color-text-dimmed disabled:cursor-not-allowed disabled:opacity-75',
        },
      },
      size: {
        xs: {
          label: 'p-1 text-[10px]/3 gap-1',
          item: 'p-1 text-xs gap-1',
          itemLeadingIcon: 'size-4',
          itemLeadingAvatarSize: '3xs',
          itemLeadingChip: 'size-4',
          itemLeadingChipSize: 'sm',
          itemTrailingIcon: 'size-4',
          tagsItem: 'text-[10px]/3',
          tagsItemDeleteIcon: 'size-3',
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
          tagsItem: 'text-[10px]/3',
          tagsItemDeleteIcon: 'size-3',
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
          tagsItem: 'text-xs',
          tagsItemDeleteIcon: 'size-3.5',
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
          tagsItem: 'text-xs',
          tagsItemDeleteIcon: 'size-3.5',
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
          tagsItem: 'text-sm',
          tagsItemDeleteIcon: 'size-4',
          empty: 'p-3 text-base',
        },
      },
    },
    compoundVariants: [
      {
        multiple: false,
        fieldGroup: 'horizontal',
        class: { base: fieldGroupVariantWithRoot.fieldGroup.horizontal.base },
      },
      {
        multiple: false,
        fieldGroup: 'vertical',
        class: { base: fieldGroupVariantWithRoot.fieldGroup.vertical.base },
      },
      {
        multiple: true,
        fieldGroup: 'horizontal',
        class: { base: fieldGroupVariant.fieldGroup.horizontal },
      },
      {
        multiple: true,
        fieldGroup: 'vertical',
        class: { base: fieldGroupVariant.fieldGroup.vertical },
      },
      {
        variant: 'soft',
        multiple: true,
        class: 'has-focus:bg-background-elevated has-focus-visible:outline-3',
      },
      {
        variant: 'ghost',
        multiple: true,
        class: 'has-focus:bg-background-elevated has-focus-visible:outline-3',
      },
      ...(options.theme.colors || []).map((color: string) => ({
        color,
        multiple: true,
        variant: ['outline', 'subtle'],
        class: `has-focus-visible:outline-3 has-focus-visible:ring-${color}`,
      })),
      {
        color: 'neutral',
        multiple: true,
        variant: ['outline', 'subtle'],
        class: 'has-focus-visible:outline-3 has-focus-visible:ring-ring-inverted',
      },
    ],
  }, input(options));
};
