import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    base: '',
    icon: '',
    externalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        base: '',
        icon: '',
        externalIcon: '',
      }])),
      neutral: {
        base: '',
        icon: '',
        externalIcon: '',
      },
    },
    to: {
      true: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'neutral',
  },
});
