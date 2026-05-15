import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    base: '',
    indicator: '',
    status: '',
    steps: '',
    step: '',
  },
  variants: {
    animation: {
      'carousel': '',
      'carousel-inverse': '',
      'swing': '',
      'elastic': '',
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        indicator: '',
        steps: '',
      }])),
      neutral: {
        indicator: '',
        steps: '',
      },
    },
    size: {
      '2xs': {
        status: '',
        steps: '',
      },
      'xs': {
        status: '',
        steps: '',
      },
      'sm': {
        status: '',
        steps: '',
      },
      'md': {
        status: '',
        steps: '',
      },
      'lg': {
        status: '',
        steps: '',
      },
      'xl': {
        status: '',
        steps: '',
      },
      '2xl': {
        status: '',
        steps: '',
      },
    },
    step: {
      active: {
        step: '',
      },
      first: {
        step: '',
      },
      other: {
        step: '',
      },
      last: {
        step: '',
      },
    },
    orientation: {
      horizontal: {
        root: '',
        base: '',
        status: '',
      },
      vertical: {
        root: '',
        base: '',
        status: '',
      },
    },
    inverted: {
      true: {
        status: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    animation: 'carousel',
    color: 'primary',
    size: 'md',
  },
});
