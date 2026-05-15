import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    spotlight: '',
    container: '',
    wrapper: '',
    header: '',
    body: '',
    footer: '',
    leading: '',
    leadingIcon: '',
    title: '',
    description: '',
  },
  variants: {
    orientation: {
      horizontal: {
        container: '',
      },
      vertical: {
        container: '',
      },
    },
    reverse: {
      true: {
        wrapper: '',
      },
    },
    variant: {
      solid: {
        root: '',
        title: '',
        description: '',
      },
      outline: {
        root: '',
        description: '',
      },
      soft: {
        root: '',
        description: '',
      },
      subtle: {
        root: '',
        description: '',
      },
      ghost: {
        description: '',
      },
      naked: {
        container: '',
        description: '',
      },
    },
    to: {
      true: {
        root: '',
      },
    },
    title: {
      true: {
        description: '',
      },
    },
    highlight: {
      true: {
        root: '',
      },
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    spotlight: {
      true: {
        root: '',
      },
    },
    spotlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    variant: 'outline',
    highlightColor: 'primary',
    spotlightColor: 'primary',
  },
});
