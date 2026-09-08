// @unocss-include

import type { PThemePageCard } from 'pohon-ui';
import { BRANDS } from '../design.constants';

export const themePageCard = {
  slots: {
    root: 'rounded-lg flex relative',
    spotlight: 'rounded-inherit bg-background/90 pointer-events-none inset-0 absolute',
    container: 'p-4 flex flex-1 flex-col gap-x-8 gap-y-4 relative sm:p-6 lg:grid',
    wrapper: 'flex flex-1 flex-col items-start',
    header: 'mb-4',
    body: 'flex-1',
    footer: 'mt-auto pt-4',
    leading: 'mb-2.5 inline-flex items-center',
    leadingIcon: 'color-primary shrink-0 size-5',
    title: 'text-base color-text-highlighted font-600 text-pretty',
    description: 'text-[15px] text-pretty',
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
      },
      vertical: {
        container: '',
      },
    },
    reverse: {
      true: {
        wrapper: 'order-last',
      },
    },
    variant: {
      solid: {
        root: 'color-text-inverted bg-background-inverted',
        title: 'color-text-inverted',
        description: 'color-text-dimmed',
      },
      outline: {
        root: 'bg-background ring ring-ring',
        description: 'color-text-muted',
      },
      soft: {
        root: 'bg-background-elevated/50',
        description: 'color-text-toned',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring ring-ring',
        description: 'color-text-toned',
      },
      ghost: {
        description: 'color-text-muted',
      },
      naked: {
        container: 'p-0 sm:p-0',
        description: 'color-text-muted',
      },
    },
    to: {
      true: {
        root: 'outline-primary/25 transition has-[>a:focus-visible]:outline-3',
      },
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
    highlight: {
      true: {
        root: 'ring-2',
      },
    },
    highlightColor: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
    spotlight: {
      true: {
        root: '[--spotlight-size:400px] before:(rounded-inherit bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] pointer-events-none content-empty absolute -inset-px)',
      },
    },
    spotlightColor: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      to: true,
      class: {
        root: 'hover:bg-background-inverted/90',
      },
    },
    {
      variant: 'outline',
      to: true,
      class: {
        root: 'hover:bg-background-elevated/50',
      },
    },
    {
      variant: 'soft',
      to: true,
      class: {
        root: 'hover:bg-background-elevated',
      },
    },
    {
      variant: 'subtle',
      to: true,
      class: {
        root: 'hover:bg-background-elevated',
      },
    },
    {
      variant: 'subtle',
      to: true,
      highlight: false,
      class: {
        root: 'hover:ring-ring-accented',
      },
    },
    {
      variant: ['outline', 'subtle'],
      to: true,
      highlight: false,
      class: {
        root: 'has-[>a:focus-visible]:ring-primary',
      },
    },
    {
      variant: 'ghost',
      to: true,
      class: {
        root: 'hover:bg-background-elevated/50',
      },
    },
    ...BRANDS.map((highlightColor: string) => ({
      highlightColor,
      highlight: true,
      class: {
        root: `ring-${highlightColor}`,
      },
    })),
    {
      highlightColor: 'neutral',
      highlight: true,
      class: {
        root: 'ring-ring-inverted',
      },
    },
    ...BRANDS.map((spotlightColor: string) => ({
      spotlightColor,
      spotlight: true,
      class: {
        root: `[--spotlight-color:var(--ui-${spotlightColor})]`,
      },
    })),
    {
      spotlightColor: 'neutral',
      spotlight: true,
      class: {
        root: '[--spotlight-color:var(--ui-bg-inverted)]',
      },
    },
  ],
} satisfies PThemePageCard;
