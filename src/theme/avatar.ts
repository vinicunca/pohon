import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    image: '',
    fallback: '',
    icon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        root: '',
        fallback: '',
        icon: '',
      }])),
      neutral: {
        root: '',
        fallback: '',
        icon: '',
      },
    },
    size: {
      '3xs': {
        root: '',
      },
      '2xs': {
        root: '',
      },
      'xs': {
        root: '',
      },
      'sm': {
        root: '',
      },
      'md': {
        root: '',
      },
      'lg': {
        root: '',
      },
      'xl': {
        root: '',
      },
      '2xl': {
        root: '',
      },
      '3xl': {
        root: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
  },
});
