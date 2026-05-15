export default {
  slots: {
    content: '',
    viewport: '',
    group: '',
    label: '',
    separator: '',
    item: '',
    itemLeadingIcon: '',
    itemLeadingAvatar: '',
    itemLeadingAvatarSize: '',
    itemWrapper: '',
    itemLabel: '',
    itemDescription: '',
    itemLabelExternalIcon: '',
  },
  variants: {
    size: {
      xs: {
        label: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
      },
      sm: {
        label: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
      },
      md: {
        label: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
      },
      lg: {
        label: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
      },
      xl: {
        label: '',
        item: '',
        itemLeadingIcon: '',
        itemLeadingAvatarSize: '',
      },
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
  },
  defaultVariants: {
    size: 'md',
  },
};
