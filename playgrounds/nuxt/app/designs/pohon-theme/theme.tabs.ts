// @unocss-include
import { BRANDS } from '../design.constants';
// Active-tab highlight shown before akar's `TabsIndicator` mounts (SSR / pre-hydration).
// akar only renders the real indicator on the client (it needs DOM measurements), so we gate
// a CSS-only pseudo-element fallback on the active trigger by the *absence* of the indicator
// element — the instant akar's measured indicator appears, this selector stops matching.
const ssr = (...classes: Array<string>) => classes.map((c) => `in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:${c}`).join(' ');

export const themeTabs = {
  slots: {
    root: 'flex gap-2 items-center',
    list: 'group p-1 flex relative',
    indicator: 'transition-[transform,width] duration-280 ease-out absolute motion-reduce:transition-none',
    trigger: ['group relative inline-flex items-center min-w-0 data-[state=inactive]:color-text-muted hover:data-[state=inactive]:not-disabled:color-text font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75', 'transition-colors'],
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    label: 'truncate',
    trailingBadge: 'shrink-0',
    trailingBadgeSize: 'sm',
    content: 'rounded-md w-full focus-visible:outline-3',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, {
        content: `outline-${color}/25`,
      }])),
      neutral: {
        content: 'outline-outline-inverted/25',
      },
    },
    variant: {
      pill: {
        list: 'bg-background-elevated rounded-lg',
        trigger: ['grow', ssr('before:content-[\'\']', 'before:absolute', 'before:inset-0', 'before:rounded-md', 'before:shadow-xs', 'before:-z-10', 'isolate')],
        indicator: 'rounded-md shadow-xs',
      },
      link: {
        list: 'border-border',
        indicator: 'rounded-full',
        trigger: ssr('after:content-[\'\']', 'after:absolute', 'after:rounded-full'),
      },
    },
    orientation: {
      horizontal: {
        root: 'flex-col',
        list: 'w-full',
        indicator: 'w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) left-0',
        trigger: 'justify-center',
      },
      vertical: {
        list: 'flex-col',
        indicator: 'h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position) top-0',
      },
    },
    size: {
      xs: {
        trigger: 'text-xs px-2 py-1 gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
      },
      sm: {
        trigger: 'text-xs px-2.5 py-1.5 gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
      },
      md: {
        trigger: 'text-sm px-3 py-1.5 gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
      },
      lg: {
        trigger: 'text-sm px-3 py-2 gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
      },
      xl: {
        trigger: 'text-base px-3 py-2 gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: 'pill',
      class: {
        indicator: 'inset-y-1',
      },
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      class: {
        list: 'border-b -mb-px',
        indicator: '-bottom-px h-px',
        trigger: ssr('after:inset-x-0', 'after:-bottom-[calc(var(--spacing)+1px)]', 'after:h-px'),
      },
    },
    {
      orientation: 'vertical',
      variant: 'pill',
      class: {
        indicator: 'inset-x-1',
        list: 'items-center',
        trigger: 'w-full justify-center',
      },
    },
    {
      orientation: 'vertical',
      variant: 'link',
      class: {
        list: 'border-s -ms-px',
        indicator: '-start-px w-px',
        trigger: ssr('after:inset-y-0', 'after:-start-[calc(var(--spacing)+1px)]', 'after:w-px'),
      },
    },
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'pill',
      class: {
        indicator: `bg-${color}`,
        trigger: [`data-[state=active]:color-text-inverted outline-${color}/25 focus-visible:outline-3`, ssr(`before:bg-${color}`)],
      },
    })),
    {
      color: 'neutral',
      variant: 'pill',
      class: {
        indicator: 'bg-background-inverted',
        trigger: ['data-[state=active]:color-text-inverted outline-outline-inverted/25 focus-visible:outline-3', ssr('before:bg-background-inverted')],
      },
    },
    ...BRANDS.map((color: string) => ({
      color,
      variant: 'link',
      class: {
        indicator: `bg-${color}`,
        trigger: [`data-[state=active]:text-${color} outline-${color}/25 focus-visible:outline-3`, ssr(`after:bg-${color}`)],
      },
    })),
    {
      color: 'neutral',
      variant: 'link',
      class: {
        indicator: 'bg-background-inverted',
        trigger: ['data-[state=active]:color-text-highlighted outline-outline-inverted/25 focus-visible:outline-3', ssr('after:bg-background-inverted')],
      },
    },
  ],
};
