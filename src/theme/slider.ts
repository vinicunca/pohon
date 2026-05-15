import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    track: '',
    range: '',
    thumb: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        range: '',
        thumb: '',
      }])),
      neutral: {
        range: '',
        thumb: '',
      },
    },
    size: {
      xs: {
        thumb: '',
      },
      sm: {
        thumb: '',
      },
      md: {
        thumb: '',
      },
      lg: {
        thumb: '',
      },
      xl: {
        thumb: '',
      },
    },
    orientation: {
      horizontal: {
        root: '',
        range: '',
      },
      vertical: {
        root: '',
        range: '',
      },
    },
    disabled: {
      true: {
        root: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});
