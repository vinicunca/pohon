import type { ModuleOptions } from '../module';
import { defuFn } from 'defu';
import { fieldGroupVariant } from './field-group';
import input from './input';

export default (options: Required<ModuleOptions>) => {
  return defuFn(
    {
      slots: {
        root: '',
        base: '',
        value: '',
        placeholder: '',
        arrow: '',
        content: '',
        viewport: '',
        group: '',
        empty: '',
        label: '',
        separator: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatar: '',
        itemLeadingAvatarSize: '',
        itemLeadingChip: '',
        itemLeadingChipSize: '',
        itemTrailing: '',
        itemTrailingIcon: '',
        itemWrapper: '',
        itemLabel: '',
        itemDescription: '',
      },

      variants: {
        ...fieldGroupVariant,

        variant: (prev: Record<string, string>) => ({
          ...prev,
          outline: [prev.outline, ''].join(' '),
          subtle: [prev.subtle, ''].join(' '),
        }),

        size: {
          xs: {
            base: '',
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          sm: {
            base: '',
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          md: {
            base: '',
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          lg: {
            base: '',
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
          xl: {
            base: '',
            label: '',
            item: '',
            itemLeadingIcon: '',
            itemLeadingAvatarSize: '',
            itemLeadingChip: '',
            itemLeadingChipSize: '',
            itemTrailingIcon: '',
            empty: '',
          },
        },
        position: {
          'popper': {
            content: '',
          },
          'item-aligned': {
            content: '',
          },
        },
        multiple: {
          true: '',
        },
      },

      compoundVariants: [],

      defaultVariants: {
        position: 'popper',
      },
    },
    input(options),
  );
};
