import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative inline-flex items-center gap-1.5',
    base: ['text-center border-0 rounded-md placeholder:color-text-dimmed disabled:opacity-75 disabled:cursor-not-allowed', options.theme.transitions && 'transition-colors'],
    separator: 'color-text-dimmed flex items-center justify-center',
  },
  variants: {
    size: {
      xs: {
        base: 'size-6 text-sm/4',
      },
      sm: {
        base: 'size-7 text-sm/4',
      },
      md: {
        base: 'size-8 text-base/5',
      },
      lg: {
        base: 'size-9 text-base/5',
      },
      xl: {
        base: 'size-10 text-base',
      },
    },
    variant: {
      outline: 'color-text-highlighted bg-background ring ring-inset ring-ring-accented',
      soft: 'color-text-highlighted bg-background-elevated/50 hover:bg-background-elevated focus:bg-background-elevated disabled:bg-background-elevated/50',
      subtle: 'color-text-highlighted bg-background-elevated ring ring-inset ring-ring-accented',
      ghost: 'color-text-highlighted bg-transparent hover:bg-background-elevated focus:bg-background-elevated disabled:bg-transparent dark:disabled:bg-transparent',
      none: 'color-text-highlighted bg-transparent focus:outline-none',
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    highlight: {
      true: '',
    },
    fixed: {
      false: '',
    },
  },
  compoundVariants: [...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: ['outline', 'subtle'],
    class: `outline-${color}/25 focus-visible:outline-3 focus-visible:ring-${color}`,
  })), ...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: ['soft', 'ghost'],
    class: `outline-${color}/25 focus-visible:outline-3`,
  })), ...(options.theme.colors || []).map((color: string) => ({
    color,
    highlight: true,
    class: `ring ring-inset pohon:ring-${color}`,
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
});
