import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    list: '',
    indicator: '',
    trigger: '',
    leadingIcon: '',
    leadingAvatar: '',
    leadingAvatarSize: '',
    label: '',
    trailingBadge: '',
    trailingBadgeSize: '',
    content: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      pill: {
        list: '',
        trigger: '',
        indicator: '',
      },
      link: {
        list: '',
        indicator: '',
        trigger: '',
      },
    },
    orientation: {
      horizontal: {
        root: '',
        list: '',
        indicator: '',
        trigger: '',
      },
      vertical: {
        list: '',
        indicator: '',
      },
    },
    size: {
      xs: {
        trigger: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
      sm: {
        trigger: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
      md: {
        trigger: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
      lg: {
        trigger: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
      xl: {
        trigger: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
    },
  },
  compoundVariants: [],

  defaultVariants: {
    color: 'primary',
    variant: 'pill',
    size: 'md',
  },
});
