export default {
  slots: {
    root: 'relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-border shrink-0',
    body: 'p-4 flex flex-1 flex-col gap-4 overflow-y-auto sm:p-6 sm:gap-6',
    handle: '',
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
};
