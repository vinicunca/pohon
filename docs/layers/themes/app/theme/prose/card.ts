// @unocss-include

import { BRANDS } from '../../constants';

export default {
  slots: {
    base: 'group relative block my-5 p-4 sm:p-6 border border-border rounded-md bg-background transition-colors',
    icon: 'size-6 mb-2 block',
    title: 'color-text-highlighted font-semibold',
    description: 'text-[15px] color-text-muted *:first:mt-0 *:last:mb-0 *:my-1',
    externalIcon: 'size-4 align-top absolute right-2 top-2 color-text-dimmed pointer-events-none transition-colors',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, {
        icon: `color-${color}`,
      }])),
      neutral: {
        icon: 'color-text-highlighted',
      },
    },
    to: {
      true: '',
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
  },
  compoundVariants: [
    ...BRANDS.map((color: string) => ({
      color,
      to: true,
      class: {
        base: `hover:bg-${color}/10 hover:border-${color} has-focus-visible:border-${color}`,
        externalIcon: `group-hover:color-${color}`,
      },
    })),
    {
      color: 'neutral',
      to: true,
      class: {
        base: 'hover:bg-background-elevated/50 hover:border-border-inverted has-focus-visible:border-border-inverted',
        externalIcon: 'group-hover:color-text-highlighted',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
  },
};
