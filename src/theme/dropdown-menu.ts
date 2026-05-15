import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    content: '',
    input: '',
    empty: '',
    viewport: '',
    arrow: '',
    group: '',
    label: '',
    separator: '',
    item: '',
    itemLeadingIcon: '',
    itemLeadingAvatar: '',
    itemLeadingAvatarSize: '',
    itemTrailing: '',
    itemTrailingIcon: '',
    itemTrailingKbds: '',
    itemTrailingKbdsSize: '',
    itemWrapper: '',
    itemLabel: '',
    itemDescription: '',
    itemLabelExternalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    active: {
      true: {
        item: '',
        itemLeadingIcon: '',
      },
      false: {
        item: '',
        itemLeadingIcon: '',
      },
    },
    loading: {
      true: {
        itemLeadingIcon: '',
      },
    },
    size: {
      xs: {
        label: '',
        item: '',
        empty: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
        itemTrailingIcon: '',
        itemTrailingKbds: '',
        itemTrailingKbdsSize: '',
      },
      sm: {
        label: '',
        item: '',
        empty: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
        itemTrailingIcon: '',
        itemTrailingKbds: '',
        itemTrailingKbdsSize: '',
      },
      md: {
        label: '',
        item: '',
        empty: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
        itemTrailingIcon: '',
        itemTrailingKbds: '',
        itemTrailingKbdsSize: '',
      },
      lg: {
        label: '',
        item: '',
        empty: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
        itemTrailingIcon: '',
        itemTrailingKbds: '',
        itemTrailingKbdsSize: '',
      },
      xl: {
        label: '',
        item: '',
        empty: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
        itemTrailingIcon: '',
        itemTrailingKbds: '',
        itemTrailingKbdsSize: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'md',
  },
});
