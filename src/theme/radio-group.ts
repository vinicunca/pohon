import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    fieldset: '',
    legend: '',
    item: '',
    container: '',
    base: '',
    indicator: '',
    wrapper: '',
    label: '',
    description: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        base: '',
        indicator: '',
      }])),
      neutral: {
        base: '',
        indicator: '',
      },
    },
    variant: {
      list: {
        item: '',
      },
      card: {
        item: '',
      },
      table: {
        item: '',
      },
    },
    orientation: {
      horizontal: {
        fieldset: '',
      },
      vertical: {
        fieldset: '',
      },
    },
    indicator: {
      start: {
        item: '',
        wrapper: '',
      },
      end: {
        item: '',
        wrapper: '',
      },
      hidden: {
        base: '',
        wrapper: '',
      },
    },
    size: {
      xs: {
        fieldset: '',
        legend: '',
        base: '',
        item: '',
        container: '',
        indicator: '',
      },
      sm: {
        fieldset: '',
        legend: '',
        base: '',
        item: '',
        container: '',
        indicator: '',
      },
      md: {
        fieldset: '',
        legend: '',
        base: '',
        item: '',
        container: '',
        indicator: '',
      },
      lg: {
        fieldset: '',
        legend: '',
        base: '',
        item: '',
        container: '',
        indicator: '',
      },
      xl: {
        fieldset: '',
        legend: '',
        base: '',
        item: '',
        container: '',
        indicator: '',
      },
    },
    disabled: {
      true: {
        item: '',
        base: '',
        label: '',
        description: '',
      },
    },
    required: {
      true: {
        legend: '',
      },
    },
    highlight: {
      true: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'list',
    indicator: 'start',
  },
});
