import type { ModuleOptions } from '../module';
import { fieldGroupVariantWithRoot } from './field-group';
import inputTheme from './input';

export default (options: Required<ModuleOptions>) => {
  const input = inputTheme(options);

  return {
    slots: {
      root: '',
      base: '',
      increment: '',
      decrement: '',
    },
    variants: {
      ...fieldGroupVariantWithRoot,
      color: {
        ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
        neutral: '',
      },
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      variant: {
        ...input.variants.variant,
      },
      disabled: {
        true: {
          increment: '',
          decrement: '',
        },
      },
      orientation: {
        horizontal: {
          base: '',
          increment: '',
          decrement: '',
        },
        vertical: {
          increment: '',
          decrement: '',
        },
      },
      highlight: {
        true: '',
      },
      fixed: {
        false: '',
      },
      increment: {
        false: '',
      },
      decrement: {
        false: '',
      },
    },

    compoundVariants: [],

    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'outline',
    },
  };
};
