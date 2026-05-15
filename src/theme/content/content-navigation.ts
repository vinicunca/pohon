import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: '',
    content: '',
    list: '',
    item: '',
    listWithChildren: '',
    itemWithChildren: '',
    trigger: '',
    link: '',
    linkLeadingIcon: '',
    linkTrailing: '',
    linkTrailingBadge: '',
    linkTrailingBadgeSize: '',
    linkTrailingIcon: '',
    linkTitle: '',
    linkTitleExternalIcon: '',
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        trigger: '',
        link: '',
      }])),
      neutral: {
        trigger: '',
        link: '',
      },
    },
    highlightColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      pill: '',
      link: '',
    },
    active: {
      true: {
        link: '',
      },
      false: {
        link: '',
        linkLeadingIcon: '',
      },
    },
    disabled: {
      true: {
        trigger: '',
      },
    },
    highlight: {
      true: {},
    },
    level: {
      true: {
        item: '',
        itemWithChildren: '',
      },
    },
  },
  compoundVariants: [
    {
      highlight: true,
      level: true,
      class: {
        link: '',
      },
    },
    {
      disabled: false,
      active: false,
      variant: '',
      class: {
        link: '',
        linkLeadingIcon: '',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: '',
      active: true,
      class: {
        link: '',
        linkLeadingIcon: '',
      },
    })),
    {
      color: '',
      variant: '',
      active: true,
      class: {
        link: '',
        linkLeadingIcon: '',
      },
    },
    {
      variant: '',
      active: true,
      highlight: false,
      class: {
        link: '',
      },
    },
    {
      variant: '',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: '',
      },
    },
    {
      disabled: false,
      active: false,
      variant: '',
      class: {
        link: '',
        linkLeadingIcon: '',
      },
    },
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      variant: '',
      active: true,
      class: {
        link: '',
        linkLeadingIcon: '',
      },
    })),
    {
      color: '',
      variant: '',
      active: true,
      class: {
        link: '',
        linkLeadingIcon: '',
      },
    },
    ...(options.theme.colors || []).map((highlightColor: string) => ({
      highlightColor,
      highlight: true,
      level: true,
      active: true,
      class: {
        link: '',
      },
    })),
    {
      highlightColor: '',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: '',
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
    variant: 'pill',
  },
});
