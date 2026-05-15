// @unocss-include
import type { PThemeTable } from 'pohon-ui';
import { BRANDS } from '../constants';

export const table = {
  slots: {
    root: 'relative overflow-auto',
    base: 'min-w-full overflow-clip',
    caption: 'sr-only',
    thead: 'relative',
    tbody: 'isolate [&>tr]:data-[selectable=true]:hover:bg-background-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary divide-y divide-divide',
    tfoot: 'relative',
    tr: 'data-[selected=true]:bg-background-elevated/50',
    th: 'px-4 py-3.5 text-sm color-text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0',
    td: 'p-4 text-sm color-text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0',
    separator: 'absolute z-1 left-0 w-full h-px bg-(--ui-border-border-accented)',
    empty: 'py-6 text-center text-sm color-text-muted',
    loading: 'py-6 text-center',
  },
  variants: {
    pinned: {
      true: {
        th: 'sticky bg-background/75 z-1',
        td: 'sticky bg-background/75 z-1',
      },
    },
    sticky: {
      true: {
        thead: 'sticky top-0 inset-x-0 bg-background/75 backdrop-blur z-1',
        tfoot: 'sticky bottom-0 inset-x-0 bg-background/75 backdrop-blur z-1',
      },
      header: {
        thead: 'sticky top-0 inset-x-0 bg-background/75 backdrop-blur z-1',
      },
      footer: {
        tfoot: 'sticky bottom-0 inset-x-0 bg-background/75 backdrop-blur z-1',
      },
    },
    loading: {
      true: {
        thead: 'after:absolute after:z-1 after:h-px',
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
  compoundVariants: [
    ...BRANDS.map((loadingColor: string) => ({
      loading: true,
      loadingColor,
      class: {
        thead: `after:bg-${loadingColor}`,
      },
    })),
    {
      loading: true,
      loadingColor: 'neutral',
      class: {
        thead: 'after:bg-background-inverted',
      },
    },
    {
      loading: true,
      loadingAnimation: 'carousel',
      class: {
        thead: 'after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]',
      },
    },
    {
      loading: true,
      loadingAnimation: 'carousel-inverse',
      class: {
        thead: 'after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]',
      },
    },
    {
      loading: true,
      loadingAnimation: 'swing',
      class: {
        thead: 'after:animate-[swing_2s_ease-in-out_infinite]',
      },
    },
    {
      loading: true,
      loadingAnimation: 'elastic',
      class: {
        thead: 'after:animate-[elastic_2s_ease-in-out_infinite]',
      },
    },
  ],
} satisfies PThemeTable;
