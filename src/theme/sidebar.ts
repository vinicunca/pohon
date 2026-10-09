import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'peer [--sidebar-width:16rem] [--sidebar-width-icon:4rem]',
    gap: 'bg-transparent w-$sidebar-width relative',
    container: 'w-$sidebar-width hidden inset-y-0 fixed z-10 h-svh',
    inner: 'flex size-full flex-col overflow-hidden divide-y divide-divide',
    header: 'px-4 flex gap-1.5 min-h-$ui-header-height items-center overflow-hidden',
    wrapper: 'min-w-0 flex-1',
    title: 'color-text-highlighted font-600 truncate',
    description: 'color-text-muted text-sm truncate',
    actions: 'flex items-center gap-1.5 shrink-0',
    close: '',
    body: 'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4',
    footer: 'flex items-center gap-1.5 overflow-hidden p-4',
    rail: ['w-4 hidden inset-y-0 absolute z-20 after:w-px after:content-empty after:inset-y-0 after:left-1/2 after:absolute hover:after:bg-$ui-border-accented', options.theme.transitions && 'after:transition-colors'],
  },
  variants: {
    transition: {
      true: {
        gap: 'transition-[width]-280 ease-out motion-reduce:transition-none',
        container: 'duration-280 ease-out [transition-property:inset-inline-start,inset-inline-end,width] motion-reduce:transition-none',
        rail: 'transition-all ease-out',
      },
    },
    breakpoint: {
      'sm': {
        container: 'sm:flex',
        rail: 'sm:flex',
      },
      'md': {
        container: 'md:flex',
        rail: 'md:flex',
      },
      'lg': {
        container: 'lg:flex',
        rail: 'lg:flex',
      },
      'xl': {
        container: 'xl:flex',
        rail: 'xl:flex',
      },
      '2xl': {
        container: '2xl:flex',
        rail: '2xl:flex',
      },
    },
    side: {
      left: {
        container: 'border-e border-border start-0',
        rail: 'translate-x-1/2 end-0 rtl:-translate-x-1/2',
      },
      right: {
        container: 'border-s border-border end-0',
        rail: '-translate-x-1/2 rtl:translate-x-1/2 -start-px',
      },
    },
    collapsible: {
      offcanvas: {
        root: 'group/sidebar hidden',
        gap: 'data-[state=collapsed]:w-0',
      },
      icon: {
        root: 'group/sidebar hidden',
        gap: 'data-[state=collapsed]:w-$sidebar-width-icon',
        container: 'data-[state=collapsed]:w-$sidebar-width-icon',
        actions: 'group-data-[state=collapsed]/sidebar:hidden',
        body: 'group-data-[state=collapsed]/sidebar:overflow-hidden',
      },
      none: {
        root: 'h-full w-$sidebar-width',
      },
    },
    variant: {
      sidebar: {},
      floating: {
        container: 'p-4 border-transparent',
        inner: 'rounded-lg ring ring-ring shadow-lg',
        rail: 'inset-y-4',
      },
      inset: {
        container: 'py-4 border-transparent',
        inner: 'divide-transparent',
        rail: 'inset-y-4',
      },
    },
  },
  compoundVariants: [{
    breakpoint: 'sm',
    collapsible: ['offcanvas', 'icon'],
    class: {
      root: 'sm:block',
    },
  }, {
    breakpoint: 'md',
    collapsible: ['offcanvas', 'icon'],
    class: {
      root: 'md:block',
    },
  }, {
    breakpoint: 'lg',
    collapsible: ['offcanvas', 'icon'],
    class: {
      root: 'lg:block',
    },
  }, {
    breakpoint: 'xl',
    collapsible: ['offcanvas', 'icon'],
    class: {
      root: 'xl:block',
    },
  }, {
    breakpoint: '2xl',
    collapsible: ['offcanvas', 'icon'],
    class: {
      root: '2xl:block',
    },
  }, {
    side: 'left',
    collapsible: ['offcanvas', 'icon'],
    class: {
      rail: 'cursor-w-resize rtl:cursor-e-resize data-[state=collapsed]:cursor-e-resize data-[state=collapsed]:rtl:cursor-w-resize',
    },
  }, {
    side: 'right',
    collapsible: ['offcanvas', 'icon'],
    class: {
      rail: 'cursor-e-resize rtl:cursor-w-resize data-[state=collapsed]:cursor-w-resize data-[state=collapsed]:rtl:cursor-e-resize',
    },
  }, {
    side: 'left',
    collapsible: 'none',
    class: {
      root: 'border-e border-border',
    },
  }, {
    side: 'right',
    collapsible: 'none',
    class: {
      root: 'border-s border-border',
    },
  }, {
    side: 'left',
    collapsible: 'offcanvas',
    class: {
      container: 'data-[state=collapsed]:-start-$sidebar-width',
    },
  }, {
    side: 'right',
    collapsible: 'offcanvas',
    class: {
      container: 'data-[state=collapsed]:-end-$sidebar-width',
    },
  }, {
    variant: 'floating',
    collapsible: 'icon',
    class: {
      gap: 'data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+--spacing(8))]',
      container: 'data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+--spacing(8)+2px)]',
    },
  }, {
    variant: 'floating',
    collapsible: 'none',
    class: {
      root: 'p-4 border-0',
    },
  }, {
    variant: 'inset',
    collapsible: 'none',
    class: {
      root: 'py-4 border-0',
    },
  }, {
    variant: 'floating',
    side: 'left',
    class: {
      rail: 'end-4',
    },
  }, {
    variant: 'floating',
    side: 'right',
    class: {
      rail: 'start-[calc(--spacing(4)-1px)]',
    },
  }],
});
