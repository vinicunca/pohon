import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    base: '',
    icon: '',
    title: '',
    description: '',
    externalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        icon: '',
      }])),
      neutral: {
        icon: '',
      },
    },
    to: {
      true: '',
    },
    title: {
      true: {
        description: '',
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'primary',
  },
});
