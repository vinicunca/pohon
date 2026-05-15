import type { ModuleOptions } from '../module';
import { fieldGroupVariant } from './field-group';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    base: '',
    label: '',
    leadingIcon: '',
    leadingAvatar: '',
    leadingAvatarSize: '',
    trailingIcon: '',
  },
  variants: {
    ...fieldGroupVariant,
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
      xs: {
        base: '',
        leadingIcon: '',
        leadingAvatarSize: '',
        trailingIcon: '',
      },
      sm: {
        base: '',
        leadingIcon: '',
        leadingAvatarSize: '',
        trailingIcon: '',
      },
      md: {
        base: '',
        leadingIcon: '',
        leadingAvatarSize: '',
        trailingIcon: '',
      },
      lg: {
        base: '',
        leadingIcon: '',
        leadingAvatarSize: '',
        trailingIcon: '',
      },
      xl: {
        base: '',
        leadingIcon: '',
        leadingAvatarSize: '',
        trailingIcon: '',
      },
    },
    square: {
      true: '',
    },
  },
  compoundVariants: [],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
});
