export default {
  slots: {
    root: 'border-border px-4 border-b flex shrink-0 gap-1.5 h-$ui-header-height items-center justify-between sm:px-6',
    left: 'flex items-center gap-1.5 min-w-0',
    icon: 'shrink-0 size-5 self-center me-1.5',
    title: 'flex items-center gap-1.5 font-600 color-text-highlighted truncate',
    center: 'hidden lg:flex',
    right: 'flex items-center shrink-0 gap-1.5',
    toggle: '',
  },
  variants: {
    toggleSide: {
      left: {
        toggle: '',
      },
      right: {
        toggle: '',
      },
    },
  },
};
