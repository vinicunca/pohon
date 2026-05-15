import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    container: '',
    top: '',
    bottom: '',
    trigger: '',
    title: '',
    trailing: '',
    trailingIcon: '',
    content: '',
    list: '',
    listWithChildren: '',
    item: '',
    itemWithChildren: '',
    link: '',
    linkText: '',
    indicator: '',
    indicatorLine: '',
    indicatorActive: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        indicatorActive: '',
      }])),
      neutral: {
        indicatorActive: '',
      },
    },
    active: {
      false: {
        link: '',
      },
    },
    highlight: {
      true: '',
    },
    highlightVariant: {
      straight: '',
      circuit: '',
    },
    body: {
      true: {
        bottom: '',
      },
    },
  },

  compoundVariants: [],

  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
    highlightVariant: 'straight',
  },
});
