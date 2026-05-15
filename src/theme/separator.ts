import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    border: '',
    container: '',
    icon: '',
    avatar: '',
    avatarSize: '',
    label: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, { border: '' }])),
      neutral: { border: '' },
    },
    orientation: {
      horizontal: {
        root: '',
        border: '',
        container: '',
      },
      vertical: {
        root: '',
        border: '',
        container: '',
      },
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    position: {
      start: '',
      center: '',
      end: '',
    },
    type: {
      solid: {
        border: '',
      },
      dashed: {
        border: '',
      },
      dotted: {
        border: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    color: 'neutral',
    size: 'xs',
    type: 'solid',
  },
});
