// @unocss-include
export const themeModal = {
  slots: {
    overlay: 'inset-0 fixed',
    content: 'bg-background divide-divide flex flex-col divide-y focus:outline-none',
    header: 'p-4 flex gap-1.5 min-h-(--ui-header-height) items-center sm:px-6',
    wrapper: '',
    body: 'p-4 flex-1 sm:p-6',
    footer: 'p-4 flex gap-1.5 items-center sm:px-6',
    title: 'color-text-highlighted font-600',
    description: 'color-text-muted text-sm mt-1',
    close: 'end-4 top-4 absolute',
  },
  variants: {
    transition: {
      true: {
        overlay: 'data-[state=closed]:animate-[fade-out_200ms_var(--ease-out)] data-[state=open]:animate-[fade-in_200ms_var(--ease-out)]',
        content: 'data-[state=closed]:animate-[scale-out_200ms_var(--ease-out)] data-[state=open]:animate-[scale-in_200ms_var(--ease-out)]',
      },
    },
    fullscreen: {
      true: {
        content: 'inset-0',
      },
      false: {
        content: 'ring-ring rounded-lg max-w-lg w-[calc(100vw-2rem)] ring shadow-lg',
      },
    },
    overlay: {
      true: {
        overlay: 'bg-background-elevated/75',
      },
    },
    scrollable: {
      true: {
        overlay: 'overflow-y-auto',
        content: 'relative',
      },
      false: {
        content: 'fixed',
        body: 'overflow-y-auto',
      },
    },
  },
  compoundVariants: [{
    scrollable: true,
    fullscreen: false,
    class: {
      overlay: 'grid place-items-center p-4 sm:py-8',
    },
  }, {
    scrollable: false,
    fullscreen: false,
    class: {
      content: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden',
    },
  }],
};
