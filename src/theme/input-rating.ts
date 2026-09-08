import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    item: ['relative inline-block cursor-pointer select-none rounded-sm has-focus-visible:outline-3', options.theme.transitions && 'transition'],
    indicator: 'absolute inset-0 overflow-hidden outline-none text-transparent w-(--akar-rating-item-step-width) opacity-(--akar-rating-item-step-opacity) z-(--akar-rating-item-step-z-index)',
    icon: 'block',
    emptyIcon: 'block w-full h-full color-text-muted pointer-events-none',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'inline-flex items-center gap-0.5',
      },
      vertical: {
        root: 'inline-flex flex-col items-center gap-0.5',
      },
    },
    size: {
      xs: {
        item: 'size-3',
        icon: 'size-3',
      },
      sm: {
        item: 'size-4',
        icon: 'size-4',
      },
      md: {
        item: 'size-5',
        icon: 'size-5',
      },
      lg: {
        item: 'size-6',
        icon: 'size-6',
      },
      xl: {
        item: 'size-7',
        icon: 'size-7',
      },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        indicator: `data-[state=active]:color-${color}`,
        item: `outline-${color}/25`,
      }])),
      neutral: {
        indicator: 'data-[state=active]:color-text-highlighted',
        item: 'outline-outline-inverted/25',
      },
    },
    readonly: {
      true: {
        root: 'cursor-default',
        item: 'cursor-default',
      },
      false: {},
    },
    disabled: {
      true: {
        root: 'opacity-75 cursor-not-allowed',
        item: 'cursor-not-allowed pointer-events-none',
      },
      false: {},
    },
  },
  compoundVariants: [{
    readonly: false,
    disabled: false,
    class: {
      item: 'hover:scale-110',
    },
  }],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});
