export default {
  slots: {
    root: 'bg-background/75 border-border border-b h-$ui-header-height top-0 sticky z-50 backdrop-blur-sm',
    container: 'flex items-center justify-between gap-3 h-full',
    left: 'lg:flex-1 flex items-center gap-1.5',
    center: 'hidden lg:flex',
    right: 'flex items-center justify-end lg:flex-1 gap-1.5',
    title: 'shrink-0 font-700 text-xl color-text-highlighted flex items-end gap-1.5',
    toggle: 'lg:hidden',
    content: 'lg:hidden',
    overlay: 'lg:hidden',
    header: 'px-4 flex shrink-0 gap-3 h-$ui-header-height items-center justify-between sm:px-6',
    body: 'p-4 sm:p-6 overflow-y-auto',
  },
  variants: {
    toggleSide: {
      left: {
        toggle: '-ms-1.5',
      },
      right: {
        toggle: '-me-1.5',
      },
    },
  },
};
