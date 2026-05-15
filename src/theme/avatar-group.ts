import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    base: '',
  },
  variants: {
    size: {
      '3xs': {
        base: '',
      },
      '2xs': {
        base: '',
      },
      'xs': {
        base: '',
      },
      'sm': {
        base: '',
      },
      'md': {
        base: '',
      },
      'lg': {
        base: '',
      },
      'xl': {
        base: '',
      },
      '2xl': {
        base: '',
      },
      '3xl': {
        base: '',
      },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
  },
});
