import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    item: '',
    listWithChildren: '',
    itemWithChildren: '',
    link: '',
    linkLeadingIcon: '',
    linkLabel: '',
    linkTrailing: '',
    linkTrailingIcon: '',
  },
  variants: {
    virtualize: {
      true: {
        root: '',
      },
    },
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        link: `focus-visible:before:ring-${color}`,
      }])),
      neutral: {
        link: '',
      },
    },
    size: {
      xs: {
        listWithChildren: '',
        link: '',
        linkLeadingIcon: '',
        linkTrailingIcon: '',
      },
      sm: {
        listWithChildren: '',
        link: '',
        linkLeadingIcon: '',
        linkTrailingIcon: '',
      },
      md: {
        listWithChildren: '',
        link: '',
        linkLeadingIcon: '',
        linkTrailingIcon: '',
      },
      lg: {
        listWithChildren: '',
        link: '',
        linkLeadingIcon: '',
        linkTrailingIcon: '',
      },
      xl: {
        listWithChildren: '',
        link: '',
        linkLeadingIcon: '',
        linkTrailingIcon: '',
      },
    },
    selected: {
      true: {
        link: '',
      },
    },
    disabled: {
      true: {
        link: '',
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});
