import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    list: '',
    item: '',
    link: '',
    linkLeadingIcon: '',
    linkLeadingAvatar: '',
    linkLeadingAvatarSize: '',
    linkLabel: '',
    separator: '',
    separatorIcon: '',
  },
  variants: {
    active: {
      true: {
        link: '',
      },
      false: {
        link: '',
      },
    },
    disabled: {
      true: {
        link: '',
      },
    },
    to: {
      true: '',
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, { link: '' }])),
      neutral: { link: '' },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    color: 'primary',
  },
});
