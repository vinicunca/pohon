import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    base: '',
    caption: '',
    thead: '',
    tbody: '',
    tfoot: '',
    tr: '',
    th: '',
    td: '',
    separator: '',
    empty: '',
    loading: '',
  },
  variants: {
    pinned: {
      true: {
        th: '',
        td: '',
      },
    },
    sticky: {
      true: {
        thead: '',
        tfoot: '',
      },
      header: {
        thead: '',
      },
      footer: {
        tfoot: '',
      },
    },
    loading: {
      true: {
        thead: '',
      },
    },
    loadingAnimation: {
      'carousel': '',
      'carousel-inverse': '',
      'swing': '',
      'elastic': '',
    },
    loadingColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    loadingColor: 'primary',
    loadingAnimation: 'carousel',
  },
});
