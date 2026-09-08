// @unocss-include
import { BRANDS } from '../design.constants';

export const themeTable = {
  slots: {
    root: 'outline-primary/25 relative overflow-auto focus-visible:outline-3',
    base: 'min-w-full overflow-clip',
    caption: 'sr-only',
    thead: 'relative',
    tbody: '[&>tr]:data-[selectable=true]:hover:bg-background-elevated/50 [&>tr]:data-[selectable=true]:outline-primary/25 divide-divide isolate divide-y [&>tr]:data-[selectable=true]:focus-visible:outline-3',
    tfoot: 'relative',
    tr: 'data-[selected=true]:bg-background-elevated/50',
    th: 'color-text-highlighted text-sm font-600 px-4 py-3.5 text-start [&:has([role=checkbox])]:pe-0',
    td: 'color-text-muted text-sm p-4 whitespace-nowrap [&:has([role=checkbox])]:pe-0',
    separator: 'bg---ui-border-accented h-px w-full start-0 absolute z-1',
    empty: 'color-text-muted text-sm py-6 text-center',
    loading: 'py-6 text-center',
  },
  variants: {
    pinned: {
      true: {
        th: 'bg-background/75 sticky z-1',
        td: 'bg-background/75 sticky z-1',
      },
    },
    sticky: {
      true: {
        thead: 'bg-background/75 inset-x-0 top-0 sticky z-1 backdrop-blur-sm',
        tfoot: 'bg-background/75 inset-x-0 bottom-0 sticky z-1 backdrop-blur-sm',
      },
      header: {
        thead: 'bg-background/75 inset-x-0 top-0 sticky z-1 backdrop-blur-sm',
      },
      footer: {
        tfoot: 'bg-background/75 inset-x-0 bottom-0 sticky z-1 backdrop-blur-sm',
      },
    },
    loading: {
      true: {
        thead: 'after:h-px after:absolute after:z-1 motion-reduce:after:inset-x-0 motion-reduce:after:animate-pulse',
      },
    },
    externalScroll: {
      true: {
        root: 'overflow-visible',
      },
    },
    loadingAnimation: {
      'carousel': '',
      'carousel-inverse': '',
      'swing': '',
      'elastic': '',
    },
    loadingColor: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
  },
  compoundVariants: [...BRANDS.map((loadingColor: string) => ({
    loading: true,
    loadingColor,
    class: {
      thead: `after:bg-${loadingColor}`,
    },
  })), {
    loading: true,
    loadingColor: 'neutral',
    class: {
      thead: 'after:bg-background-inverted',
    },
  }, {
    loading: true,
    loadingAnimation: 'carousel',
    class: {
      thead: 'motion-safe:after:animate-[carousel_2s_linear_infinite] motion-safe:rtl:after:animate-[carousel-rtl_2s_linear_infinite]',
    },
  }, {
    loading: true,
    loadingAnimation: 'carousel-inverse',
    class: {
      thead: 'motion-safe:after:animate-[carousel-inverse_2s_linear_infinite] motion-safe:rtl:after:animate-[carousel-inverse-rtl_2s_linear_infinite]',
    },
  }, {
    loading: true,
    loadingAnimation: 'swing',
    class: {
      thead: 'motion-safe:after:animate-[swing_2s_var(--ease-in-out)_infinite]',
    },
  }, {
    loading: true,
    loadingAnimation: 'elastic',
    class: {
      thead: 'motion-safe:after:animate-[elastic_2s_var(--ease-in-out)_infinite]',
    },
  }],
  defaultVariants: {
    loadingColor: 'primary',
    loadingAnimation: 'carousel',
  },
};
