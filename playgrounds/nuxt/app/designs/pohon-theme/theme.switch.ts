// @unocss-include
import { BRANDS } from '../design.constants';

export const themeSwitch = {
  slots: {
    root: 'flex items-start relative',
    base: ['inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-3 data-[state=unchecked]:bg-accented', 'transition-[background] duration-280 ease-out'],
    container: 'flex items-center',
    thumb: 'group bg-background rounded-full flex pointer-events-none ring-0 shadow-lg transition-transform duration-280 ease-out items-center justify-center data-[state=unchecked]:translate-x-0 motion-reduce:transition-none data-[state=unchecked]:rtl:-translate-x-0',
    icon: ['absolute shrink-0 group-data-[state=unchecked]:color-text-dimmed opacity-0 size-10/12', 'transition-[color,opacity] duration-280 ease-out'],
    wrapper: 'ms-2',
    label: 'color-text font-medium block',
    description: 'color-text-muted',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, {
        base: `data-[state=checked]:bg-${color} outline-${color}/25`,
        icon: `group-data-[state=checked]:text-${color}`,
      }])),
      neutral: {
        base: 'data-[state=checked]:bg-background-inverted outline-outline-inverted/25',
        icon: 'group-data-[state=checked]:color-text-highlighted',
      },
    },
    size: {
      xs: {
        base: 'w-7',
        container: 'h-4',
        thumb: 'size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3',
        wrapper: 'text-xs',
      },
      sm: {
        base: 'w-8',
        container: 'h-4',
        thumb: 'size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5',
        wrapper: 'text-xs',
      },
      md: {
        base: 'w-9',
        container: 'h-5',
        thumb: 'size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4',
        wrapper: 'text-sm',
      },
      lg: {
        base: 'w-10',
        container: 'h-5',
        thumb: 'size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5',
        wrapper: 'text-sm',
      },
      xl: {
        base: 'w-11',
        container: 'h-6',
        thumb: 'size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5',
        wrapper: 'text-base',
      },
    },
    checked: {
      true: {
        icon: 'group-data-[state=checked]:opacity-100',
      },
    },
    unchecked: {
      true: {
        icon: 'group-data-[state=unchecked]:opacity-100',
      },
    },
    loading: {
      true: {
        icon: 'animate-spin',
      },
    },
    highlight: {
      true: '',
    },
    required: {
      true: {
        label: 'after:text-error after:ms-0.5 after:content-[' * ']',
      },
    },
    disabled: {
      true: {
        root: 'opacity-75',
        base: 'cursor-not-allowed',
        label: 'cursor-not-allowed',
        description: 'cursor-not-allowed',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      highlight: true,
      class: {
        base: `ring ring-${color}`,
      },
    })),
    {
      color: 'neutral',
      highlight: true,
      class: {
        base: 'ring ring-ring-inverted',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
};
