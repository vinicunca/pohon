import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    base: '',
  },
  variants: {
    size: {
      xs: {
        base: '',
      },
      sm: {
        base: '',
      },
      md: {
        base: '',
      },
      lg: {
        base: '',
      },
      xl: {
        base: '',
      },
    },
    variant: {
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      none: '',
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    highlight: {
      true: '',
    },
    fixed: {
      false: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'outline',
  },
});
