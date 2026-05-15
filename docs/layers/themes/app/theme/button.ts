// @unocss-include
import { BRANDS } from '../constants';
import { fieldGroupVariant } from './field-group';

export default {
  slots: {
    base: 'rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors',
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0',
  },
  variants: {
    ...fieldGroupVariant,
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      link: '',
    },
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
      },
    },
    block: {
      true: {
        base: 'w-full justify-center',
        trailingIcon: 'ms-auto',
      },
    },
    square: {
      true: '',
    },
    leading: {
      true: '',
    },
    trailing: {
      true: '',
    },
    loading: {
      true: '',
    },
    active: {
      true: {
        base: '',
      },
      false: {
        base: '',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'solid',
      class: `color-text-inverted bg-${color} hover:bg-${color}/75 active:bg-${color}/75 disabled:bg-${color} aria-disabled:bg-${color} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'outline',
      class: `ring ring-inset ring-${color}/50 color-${color} hover:bg-${color}/10 active:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'soft',
      class: `color-${color} bg-${color}/10 hover:bg-${color}/15 active:bg-${color}/15 focus:outline-none focus-visible:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'subtle',
      class: `color-${color} ring ring-inset ring-${color}/25 bg-${color}/10 hover:bg-${color}/15 active:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'ghost',
      class: `color-${color} hover:bg-${color}/10 active:bg-${color}/10 focus:outline-none focus-visible:bg-${color}/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    })),
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'link',
      class: `color-${color} hover:color-${color}/75 active:color-${color}/75 disabled:color-${color} aria-disabled:color-${color} focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
    })),
    {
      color: 'neutral',
      variant: 'solid',
      class: 'color-text-inverted bg-background-inverted hover:bg-background-inverted/90 active:bg-background-inverted/90 disabled:bg-background-inverted aria-disabled:bg-background-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted',
    },
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-ring-accented color-text bg-background hover:bg-background-elevated active:bg-background-elevated disabled:bg-background aria-disabled:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-inverted',
    },
    {
      color: 'neutral',
      variant: 'soft',
      class: 'color-text bg-background-elevated hover:bg-background-accented/75 active:bg-background-accented/75 focus:outline-none focus-visible:bg-background-accented/75 disabled:bg-background-elevated aria-disabled:bg-background-elevated',
    },
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'ring ring-inset ring-ring-accented color-text bg-background-elevated hover:bg-background-accented/75 active:bg-background-accented/75 disabled:bg-background-elevated aria-disabled:bg-background-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-inverted',
    },
    {
      color: 'neutral',
      variant: 'ghost',
      class: 'color-text hover:bg-background-elevated active:bg-background-elevated focus:outline-none focus-visible:bg-background-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
    },
    {
      color: 'neutral',
      variant: 'link',
      class: 'color-text-muted hover:color-text active:color-text disabled:color-text-muted aria-disabled:color-text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring-inverted',
    },
    {
      size: 'xs',
      square: true,
      class: 'p-1',
    },
    {
      size: 'sm',
      square: true,
      class: 'p-1.5',
    },
    {
      size: 'md',
      square: true,
      class: 'p-1.5',
    },
    {
      size: 'lg',
      square: true,
      class: 'p-2',
    },
    {
      size: 'xl',
      square: true,
      class: 'p-2',
    },
    {
      loading: true,
      leading: true,
      class: {
        leadingIcon: 'animate-spin',
      },
    },
    {
      loading: true,
      leading: false,
      trailing: true,
      class: {
        trailingIcon: 'animate-spin',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
};
