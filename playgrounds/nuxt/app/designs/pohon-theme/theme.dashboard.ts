// @unocss-include
import type {
  PThemeDashboardGroup,
  PThemeDashboardNavbar,
  PThemeDashboardPanel,
  PThemeDashboardResizeHandle,
  PThemeDashboardSearch,
  PThemeDashboardSearchButton,
  PThemeDashboardSidebar,
  PThemeDashboardSidebarCollapse,
  PThemeDashboardSidebarToggle,
  PThemeDashboardToolbar,
} from 'pohon-ui';

export const themeDashboardGroup = {
  base: 'flex inset-0 fixed overflow-hidden',
} satisfies PThemeDashboardGroup;

export const themeDashboardNavbar = {
  slots: {
    root: 'border-border px-4 border-b flex shrink-0 gap-1.5 h-$ui-header-height items-center justify-between sm:px-6',
    left: 'flex gap-1.5 min-w-0 items-center',
    icon: 'me-1.5 shrink-0 size-5 self-center',
    title: 'color-text-highlighted font-semibold flex gap-1.5 truncate items-center',
    center: 'hidden lg:flex',
    right: 'flex shrink-0 gap-1.5 items-center',
  },
} satisfies PThemeDashboardNavbar;

export const themeDashboardPanel = {
  slots: {
    root: 'lg:not-last:border-border flex shrink-0 flex-col min-w-0 relative min-h-svh lg:not-last:border-e',
    body: 'p-4 flex flex-1 flex-col gap-4 overflow-y-auto sm:(p-6 gap-6)',
  },
  variants: {
    size: {
      true: {
        root: 'w-full lg:w-$width',
      },
      false: {
        root: 'flex-1',
      },
    },
  },
} satisfies PThemeDashboardPanel;

export const themeDashboardResizeHandle = {
  base: 'hidden cursor-ew-resize select-none relative touch-none lg:block before:(content-empty inset-y-0 absolute z-1 -left-1.5 -right-1.5)',
} satisfies PThemeDashboardResizeHandle;

export const themeDashboardSearchButton = {
  slots: {
    trailing: 'ms-auto gap-0.5 hidden items-center lg:flex',
  },
  variants: {
    collapsed: {
      true: {
        label: 'hidden',
        trailing: 'lg:hidden',
      },
    },
  },
} satisfies PThemeDashboardSearchButton;

export const themeDashboardSearch = {
  variants: {
    fullscreen: {
      false: {
        modal: 'h-full sm:(h-[28rem] max-w-3xl)',
      },
    },
  },
} satisfies PThemeDashboardSearch;

export const themeDashboardSidebarCollapse = {
  base: 'hidden lg:flex',
} satisfies PThemeDashboardSidebarCollapse;

export const themeDashboardSidebarToggle = {
  base: 'lg:hidden',
} satisfies PThemeDashboardSidebarToggle;

export const themeDashboardSidebar = {
  slots: {
    root: 'shrink-0 flex-col min-w-16 w-$width hidden relative min-h-svh lg:flex',
    header: 'px-4 flex shrink-0 gap-1.5 h-$ui-header-height items-center',
    body: 'px-4 py-2 flex flex-1 flex-col gap-4 overflow-y-auto',
    footer: 'px-4 py-2 flex shrink-0 gap-1.5 items-center',
    content: 'lg:hidden',
    overlay: 'lg:hidden',
  },
  variants: {
    menu: {
      true: {
        header: 'sm:px-6',
        body: 'sm:px-6',
        footer: 'sm:px-6',
      },
    },
    side: {
      left: {
        root: 'border-border border-e',
      },
    },
    toggleSide: {
      right: {
        toggle: 'ms-auto',
      },
    },
  },
} satisfies PThemeDashboardSidebar;

export const themeDashboardToolbar = {
  slots: {
    root: 'border-border px-4 border-b flex shrink-0 gap-1.5 min-h-[49px] items-center justify-between overflow-x-auto sm:px-6',
    left: 'flex gap-1.5 items-center',
    right: 'flex gap-1.5 items-center',
  },
} satisfies PThemeDashboardToolbar;
