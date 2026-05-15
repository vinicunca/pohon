import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    header: '',
    item: '',
    container: '',
    trigger: '',
    indicator: '',
    icon: '',
    separator: '',
    wrapper: '',
    title: '',
    description: '',
    content: '',
  },

  variants: {
    orientation: {
      horizontal: {
        root: '',
        container: '',
        separator: '',
        wrapper: '',
      },
      vertical: {
        header: '',
        item: '',
        separator: '',
      },
    },

    size: {
      xs: {
        trigger: '',
        icon: '',
        title: '',
        description: '',
        wrapper: '',
      },
      sm: {
        trigger: '',
        icon: '',
        title: '',
        description: '',
        wrapper: '',
      },
      md: {
        trigger: '',
        icon: '',
        title: '',
        description: '',
        wrapper: '',
      },
      lg: {
        trigger: '',
        icon: '',
        title: '',
        description: '',
        wrapper: '',
      },
      xl: {
        trigger: '',
        icon: '',
        title: '',
        description: '',
        wrapper: '',
      },
    },

    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        trigger: '',
        separator: '',
      }])),
      neutral: {
        trigger: '',
        separator: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});
