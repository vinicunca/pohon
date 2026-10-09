import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative flex items-start',
    base: ['border-2 border-transparent rounded-full inline-flex shrink-0 items-center focus-visible:outline-3 data-[state=unchecked]:bg-background-accented', options.theme.transitions && 'transition-[background-color]-280 ease-out'],
    container: 'flex items-center',
    thumb: 'group rounded-full bg-background flex pointer-events-none ring-0 shadow-lg transition-transform-280 ease-out items-center justify-center data-[state=unchecked]:translate-x-0 motion-reduce:transition-none data-[state=unchecked]:rtl:-translate-x-0',
    icon: ['opacity-0 shrink-0 size-10/12 absolute group-data-[state=unchecked]:color-text-dimmed', options.theme.transitions && 'transition-[color,opacity]-280 ease-out'],
    wrapper: 'ms-2',
    label: 'block font-500 color-text',
    description: 'color-text-muted',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        base: `data-[state=checked]:bg-${color} outline-${color}/25`,
        icon: `group-data-[state=checked]:color-${color}`,
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
        label: 'after:color-error after:ms-0.5 after:content-[\'*\']',
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
    ...(options.theme.colors || []).map((color: string) => ({
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
});
