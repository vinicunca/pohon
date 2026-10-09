import type { ModuleOptions } from '../module';

// Active-tab highlight shown before akar's `TabsIndicator` mounts (SSR / pre-hydration).
// akar only renders the real indicator on the client (it needs DOM measurements), so we gate
// a CSS-only pseudo-element fallback on the active trigger by the *absence* of the indicator
// element — the instant akar's measured indicator appears, this selector stops matching.
const ssr = (...classes: Array<string>) => classes.map((c) => `in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:${c}`).join(' ');

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'flex items-center gap-2',
    list: 'relative flex p-1 group',
    indicator: 'transition-[transform,width]-280 ease-out absolute motion-reduce:transition-none',
    trigger: ['group font-500 rounded-md inline-flex min-w-0 items-center relative data-[state=inactive]:color-text-muted disabled:opacity-75 disabled:cursor-not-allowed hover:data-[state=inactive]:not-disabled:color-text', options.theme.transitions && 'transition-colors'],
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    label: 'truncate',
    trailingBadge: 'shrink-0',
    trailingBadgeSize: 'sm',
    content: 'w-full rounded-md focus-visible:outline-3',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        content: `outline-${color}/25`,
      }])),
      neutral: {
        content: 'outline-outline-inverted/25',
      },
    },
    variant: {
      pill: {
        list: 'bg-background-elevated rounded-lg',
        trigger: ['list-no-indicator:data-[state=active]:isolate list-no-indicator:data-[state=active]:before:content-empty list-no-indicator:data-[state=active]:before:absolute list-no-indicator:data-[state=active]:before:inset-0 list-no-indicator:data-[state=active]:before:rounded-md list-no-indicator:data-[state=active]:before:shadow-xs list-no-indicator:data-[state=active]:before:-z-10 grow', ssr('before:content-[\'\']', 'before:absolute', 'before:inset-0', 'before:rounded-md', 'before:shadow-xs', 'before:-z-10', 'isolate')],
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
        indicator: 'w-$akar-tabs-indicator-size translate-x-$akar-tabs-indicator-position left-0',
        trigger: 'justify-center',
      },
      vertical: {
        list: 'flex-col',
        indicator: 'h-$akar-tabs-indicator-size translate-y-$akar-tabs-indicator-position top-0',
      },
    },
    size: {
      xs: {
        trigger: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
      },
      sm: {
        trigger: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
      },
      md: {
        trigger: 'px-3 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
      },
      lg: {
        trigger: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
      },
      xl: {
        trigger: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
      },
    },
  },
  compoundVariants: [{
    orientation: 'horizontal',
    variant: 'pill',
    class: {
      indicator: 'inset-y-1',
    },
  }, {
    orientation: 'horizontal',
    variant: 'link',
    class: {
      list: 'border-b -mb-px',
      indicator: '-bottom-px h-px',
      trigger: ssr('after:inset-x-0', 'after:-bottom-[calc(var(--spacing)+1px)]', 'after:h-px'),
    },
  }, {
    orientation: 'vertical',
    variant: 'pill',
    class: {
      indicator: 'inset-x-1',
      list: 'items-center',
      trigger: 'w-full justify-center',
    },
  }, {
    orientation: 'vertical',
    variant: 'link',
    class: {
      list: 'border-s -ms-px',
      indicator: '-start-px w-px',
      trigger: ssr('after:inset-y-0', 'after:-start-[calc(var(--spacing)+1px)]', 'after:w-px'),
    },
  }, ...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: 'pill',
    class: {
      indicator: `bg-${color}`,
      trigger: [`data-[state=active]:color-text-inverted outline-${color}/25 focus-visible:outline-3 list-no-indicator:data-[state=active]:before:bg-${color}`, ssr(`before:bg-${color}`)],
    },
  })), {
    color: 'neutral',
    variant: 'pill',
    class: {
      indicator: 'bg-background-inverted',
      trigger: ['data-[state=active]:color-text-inverted outline-outline-inverted/25 focus-visible:outline-3 list-no-indicator:data-[state=active]:before:bg-background-inverted', ssr('before:bg-background-inverted')],
    },
  }, ...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: 'link',
    class: {
      indicator: `bg-${color}`,
      trigger: [`data-[state=active]:color-${color} outline-${color}/25 focus-visible:outline-3 list-no-indicator:data-[state=active]:after:bg-${color}`, ssr(`after:bg-${color}`)],
    },
  })), {
    color: 'neutral',
    variant: 'link',
    class: {
      indicator: 'bg-background-inverted',
      trigger: ['data-[state=active]:color-text-highlighted outline-outline-inverted/25 focus-visible:outline-3 list-no-indicator:data-[state=active]:after:bg-background-inverted', ssr('after:bg-background-inverted')],
    },
  }],
  defaultVariants: {
    color: 'primary',
    variant: 'pill',
    size: 'md',
  },
});
