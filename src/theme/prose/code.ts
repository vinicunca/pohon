import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  base: '',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
  },

  defaultVariants: {
    color: 'neutral',
  },
});
