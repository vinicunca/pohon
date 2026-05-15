import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    header: '',
    container: '',
    leading: '',
    leadingIcon: '',
    leadingAvatar: '',
    leadingAvatarSize: '',
    files: '',
    content: '',
    actions: '',
  },
  variants: {
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      naked: '',
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    side: {
      left: {},
      right: {
        container: '',
        files: '',
      },
    },
    leading: {
      true: '',
    },
    actions: {
      true: '',
    },
    compact: {
      true: {
        root: '',
        container: '',
        content: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
      false: {
        root: '',
        container: '',
        content: '',
        leadingIcon: '',
        leadingAvatarSize: '',
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'naked',
    color: 'neutral',
  },
});
