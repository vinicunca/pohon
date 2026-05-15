import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  base: '',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    variant: 'outline',
    color: 'neutral',
    size: 'md',
  },
});
