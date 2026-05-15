import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    container: '',
    base: '',
    indicator: '',
    icon: '',
    wrapper: '',
    label: '',
    description: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        base: '',
        indicator: '',
      }])),
      neutral: {
        base: '',
        indicator: '',
      },
    },
    variant: {
      list: {
        root: '',
      },
      card: {
        root: '',
      },
    },
    indicator: {
      start: {
        root: '',
        wrapper: '',
      },
      end: {
        root: '',
        wrapper: '',
      },
      hidden: {
        base: '',
        wrapper: '',
      },
    },
    size: {
      xs: {
        base: '',
        container: '',
        wrapper: '',
      },
      sm: {
        base: '',
        container: '',
        wrapper: '',
      },
      md: {
        base: '',
        container: '',
        wrapper: '',
      },
      lg: {
        base: '',
        container: '',
        wrapper: '',
      },
      xl: {
        base: '',
        container: '',
        wrapper: '',
      },
    },
    required: {
      true: {
        label: '',
      },
    },
    disabled: {
      true: {
        root: '',
        base: '',
        label: '',
        description: '',
      },
    },
    highlight: {
      true: '',
    },
    checked: {
      true: '',
    },
  },
  compoundVariants: [],

  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'list',
    indicator: 'start',
  },
});
