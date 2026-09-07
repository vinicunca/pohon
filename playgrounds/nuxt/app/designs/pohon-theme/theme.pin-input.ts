// @unocss-include
import { BRANDS } from '../design.constants';

export const themePinInput = {
  slots: {
    root: 'inline-flex gap-1.5 items-center relative',
    base: ['rounded-md border-0 placeholder:color-text-dimmed text-center disabled:cursor-not-allowed disabled:opacity-75', 'transition-colors'],
    separator: 'color-text-dimmed flex items-center justify-center',
  },
  variants: {
    size: {
      xs: {
        base: 'text-sm/4 size-6',
      },
      sm: {
        base: 'text-sm/4 size-7',
      },
      md: {
        base: 'text-base/5 size-8',
      },
      lg: {
        base: 'text-base/5 size-9',
      },
      xl: {
        base: 'text-base size-10',
      },
    },
    variant: {
      outline: 'color-text-highlighted bg-background ring-ring-accented ring ring-inset',
      soft: 'color-text-highlighted bg-background-elevated/50 hover:bg-background-elevated focus:bg-background-elevated disabled:bg-background-elevated/50',
      subtle: 'color-text-highlighted bg-background-elevated ring-ring-accented ring ring-inset',
      ghost: 'color-text-highlighted hover:bg-background-elevated focus:bg-background-elevated bg-transparent disabled:bg-transparent dark:disabled:bg-transparent',
      none: 'color-text-highlighted bg-transparent focus:outline-none',
    },
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
    highlight: {
      true: '',
    },
    fixed: {
      false: '',
    },
  },
  compoundVariants: [...BRANDS.map((color: string) => ({
    color,
    variant: ['outline', 'subtle'],
    class: `outline-${color}/25 focus-visible:outline-3 focus-visible:ring-${color}`,
  })), ...BRANDS.map((color: string) => ({
    color,
    variant: ['soft', 'ghost'],
    class: `outline-${color}/25 focus-visible:outline-3`,
  })), ...BRANDS.map((color: string) => ({
    color,
    highlight: true,
    class: `ring ring-inset ring-${color}`,
  })), {
    color: 'neutral',
    variant: ['outline', 'subtle'],
    class: 'outline-outline-inverted/25 focus-visible:outline-3 focus-visible:ring-ring-inverted',
  }, {
    color: 'neutral',
    variant: ['soft', 'ghost'],
    class: 'outline-outline-inverted/25 focus-visible:outline-3',
  }, {
    color: 'neutral',
    highlight: true,
    class: 'ring ring-inset ring-ring-inverted',
  }, {
    fixed: false,
    size: 'xs',
    class: 'md:text-xs',
  }, {
    fixed: false,
    size: 'sm',
    class: 'md:text-xs',
  }, {
    fixed: false,
    size: 'md',
    class: 'md:text-sm',
  }, {
    fixed: false,
    size: 'lg',
    class: 'md:text-sm',
  }],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'outline',
  },
};
