// @unocss-include
import { BRANDS } from '../design.constants';

export const themeNavigationMenu = {
  slots: {
    root: 'flex gap-1.5 relative [&>div]:min-w-0',
    list: 'min-w-0 isolate',
    label: 'color-text-highlighted text-xs/5 font-semibold px-2.5 py-1.5 flex gap-1.5 w-full items-center',
    item: 'min-w-0',
    link: 'group text-sm font-medium flex gap-1.5 w-full items-center relative focus-visible:outline-none focus:outline-none before:rounded-md before:absolute before:z-[-1] focus-visible:before:outline-3',
    linkLeadingIcon: 'shrink-0 size-5',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: '2xs',
    linkLeadingChipSize: 'sm',
    linkTrailing: 'group ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'shrink-0 size-5 transform transition-transform duration-280 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'color-text-dimmed align-top size-3 inline-block',
    childList: 'isolate',
    childLabel: 'color-text-highlighted text-xs',
    childItem: '',
    childLink: 'group text-sm text-start flex size-full items-start relative focus-visible:outline-none focus:outline-none before:rounded-md before:absolute before:z-[-1] focus-visible:before:outline-3',
    childLinkWrapper: 'min-w-0',
    childLinkIcon: 'shrink-0 size-5',
    childLinkLabel: 'truncate',
    childLinkLabelExternalIcon: 'color-text-dimmed align-top size-3 inline-block',
    childLinkDescription: 'color-text-muted',
    separator: 'bg-border px-2 h-px',
    viewportWrapper: 'flex w-full start-0 top-full absolute',
    viewport: 'bg-background ring-ring rounded-md h-(--reka-navigation-menu-viewport-height) w-full ring shadow-lg origin-[top_center] transition-[width,height,left,right] duration-280 ease-out relative z-1 overflow-hidden motion-reduce:transition-none data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] data-[state=open]:animate-[scale-in_100ms_var(--ease-out)]',
    content: '',
    indicator: 'transition-[translate,width] flex h-2.5 w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) duration-280 ease-out items-end bottom-0 left-0 justify-center absolute z-2 overflow-hidden data-[state=hidden]:opacity-0 motion-reduce:transition-none data-[state=hidden]:animate-[fade-out_100ms_var(--ease-out)] data-[state=visible]:animate-[fade-in_100ms_var(--ease-out)]',
    arrow: 'border-border bg-background border rounded-xs size-2.5 rotate-45 top-[50%] relative z-1',
  },
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, {
        link: `before:outline-${color}/25`,
        childLink: `before:outline-${color}/25`,
      }])),
      neutral: {
        link: 'before:outline-outline-inverted/25',
        childLink: 'before:outline-outline-inverted/25',
      },
    },
    highlightColor: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      pill: '',
      link: '',
    },
    orientation: {
      horizontal: {
        root: 'items-center justify-between',
        list: 'flex items-center',
        item: 'py-2',
        link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
        childList: 'p-2 grid',
        childLink: 'px-3 py-2 gap-2 before:inset-x-px before:inset-y-0',
        childLinkLabel: 'font-medium',
        content: 'max-h-[70vh] w-full start-0 top-0 absolute overflow-y-auto',
      },
      vertical: {
        root: 'flex-col',
        link: 'px-2.5 py-1.5 flex-row before:inset-x-0 before:inset-y-px',
        childLabel: 'px-1.5 py-0.5',
        childLink: 'p-1.5 gap-1.5 before:inset-x-0 before:inset-y-px',
      },
    },
    contentOrientation: {
      horizontal: {
        viewportWrapper: 'justify-center',
        content: 'data-[motion=from-end]:animate-[enter-from-right_200ms_var(--ease-out)] data-[motion=from-start]:animate-[enter-from-left_200ms_var(--ease-out)] data-[motion=to-end]:animate-[exit-to-right_200ms_var(--ease-out)] data-[motion=to-start]:animate-[exit-to-left_200ms_var(--ease-out)]',
      },
      vertical: {
        viewport: 'left-(--reka-navigation-menu-viewport-left) sm:w-(--reka-navigation-menu-viewport-width) rtl:left-auto rtl:right-[calc(100%-var(--reka-navigation-menu-viewport-left)-var(--reka-navigation-menu-viewport-width))]',
      },
    },
    active: {
      true: {
        childLink: 'before:bg-background-elevated color-text-highlighted',
        childLinkIcon: 'color-text',
      },
      false: {
        link: 'color-text-muted',
        linkLeadingIcon: 'color-text-dimmed',
        childLink: ['hover:before:bg-background-elevated/50 color-text hover:color-text-highlighted', 'transition-colors before:transition-colors'],
        childLinkIcon: ['color-text-dimmed group-hover:color-text', 'transition-colors'],
      },
    },
    disabled: {
      true: {
        link: 'opacity-75 cursor-not-allowed',
      },
    },
    highlight: {
      true: '',
    },
    level: {
      true: '',
    },
    collapsed: {
      true: '',
    },
  },
  compoundVariants: [{
    orientation: 'horizontal',
    contentOrientation: 'horizontal',
    class: {
      childList: 'grid-cols-2 gap-2',
    },
  }, {
    orientation: 'horizontal',
    contentOrientation: 'vertical',
    class: {
      childList: 'gap-1',
      content: 'w-60',
    },
  }, {
    orientation: 'vertical',
    collapsed: false,
    class: {
      childList: 'ms-5 border-s border-border',
      childItem: 'ps-1.5 -ms-px',
      content: 'data-[state=open]:animate-[collapsible-down_200ms_var(--ease-out)] data-[state=closed]:animate-[collapsible-up_200ms_var(--ease-out)] data-[state=closed]:overflow-hidden',
    },
  }, {
    orientation: 'vertical',
    collapsed: true,
    class: {
      link: 'px-1.5',
      linkLabel: 'hidden',
      linkTrailing: 'hidden',
      content: 'shadow-sm rounded-sm min-h-6 p-1',
    },
  }, {
    orientation: 'horizontal',
    highlight: true,
    class: {
      link: ['after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full', 'after:transition-colors'],
    },
  }, {
    orientation: 'vertical',
    highlight: true,
    level: true,
    class: {
      link: ['after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full', 'after:transition-colors'],
    },
  }, {
    disabled: false,
    active: false,
    variant: 'pill',
    class: {
      link: ['hover:color-text-highlighted hover:before:bg-background-elevated/50', 'transition-colors before:transition-colors'],
      linkLeadingIcon: ['group-hover:color-text', 'transition-colors'],
    },
  }, {
    disabled: false,
    active: false,
    variant: 'pill',
    orientation: 'horizontal',
    class: {
      link: 'data-[state=open]:color-text-highlighted',
      linkLeadingIcon: 'group-data-[state=open]:color-text',
    },
  }, {
    disabled: false,
    variant: 'pill',
    highlight: true,
    orientation: 'horizontal',
    class: {
      link: 'data-[state=open]:before:bg-background-elevated/50',
    },
  }, {
    disabled: false,
    variant: 'pill',
    highlight: false,
    active: false,
    orientation: 'horizontal',
    class: {
      link: 'data-[state=open]:before:bg-background-elevated/50',
    },
  }, ...BRANDS.map((color: string) => ({
    color,
    variant: 'pill',
    active: true,
    class: {
      link: `text-${color}`,
      linkLeadingIcon: `text-${color} group-data-[state=open]:text-${color}`,
    },
  })), {
    color: 'neutral',
    variant: 'pill',
    active: true,
    class: {
      link: 'color-text-highlighted',
      linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
    },
  }, {
    variant: 'pill',
    active: true,
    highlight: false,
    class: {
      link: 'before:bg-background-elevated',
    },
  }, {
    variant: 'pill',
    active: true,
    highlight: true,
    disabled: false,
    class: {
      link: ['hover:before:bg-background-elevated/50', 'before:transition-colors'],
    },
  }, {
    disabled: false,
    active: false,
    variant: 'link',
    class: {
      link: ['hover:color-text-highlighted', 'transition-colors'],
      linkLeadingIcon: ['group-hover:color-text', 'transition-colors'],
    },
  }, {
    disabled: false,
    active: false,
    variant: 'link',
    orientation: 'horizontal',
    class: {
      link: 'data-[state=open]:color-text-highlighted',
      linkLeadingIcon: 'group-data-[state=open]:color-text',
    },
  }, ...BRANDS.map((color: string) => ({
    color,
    variant: 'link',
    active: true,
    class: {
      link: `text-${color}`,
      linkLeadingIcon: `text-${color} group-data-[state=open]:text-${color}`,
    },
  })), {
    color: 'neutral',
    variant: 'link',
    active: true,
    class: {
      link: 'color-text-highlighted',
      linkLeadingIcon: 'color-text-highlighted group-data-[state=open]:color-text-highlighted',
    },
  }, ...BRANDS.map((highlightColor: string) => ({
    highlightColor,
    highlight: true,
    level: true,
    active: true,
    class: {
      link: `after:bg-${highlightColor}`,
    },
  })), {
    highlightColor: 'neutral',
    highlight: true,
    level: true,
    active: true,
    class: {
      link: 'after:bg-background-inverted',
    },
  }],
  defaultVariants: {
    color: 'primary',
    highlightColor: 'primary',
    variant: 'pill',
  },
};
