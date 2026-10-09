export default {
  slots: {
    overlay: 'fixed inset-0 bg-background-elevated/75',
    content: 'bg-background flex flex-col ring-ring fixed divide-divide divide-y focus:outline-none sm:ring sm:shadow-lg',
    header: 'p-4 flex gap-1.5 min-h-$ui-header-height items-center sm:px-6',
    wrapper: '',
    body: 'flex-1 overflow-y-auto p-4 sm:p-6',
    footer: 'flex items-center gap-1.5 p-4 sm:px-6',
    title: 'color-text-highlighted font-600',
    description: 'mt-1 color-text-muted text-sm',
    close: 'absolute top-4 end-4',
  },
  variants: {
    side: {
      top: {
        content: '',
      },
      right: {
        content: 'sm:max-w-md',
      },
      bottom: {
        content: '',
      },
      left: {
        content: 'sm:max-w-md',
      },
    },
    inset: {
      true: {
        content: 'rounded-lg',
      },
    },
    transition: {
      true: {
        overlay: 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0',
      },
    },
  },
  compoundVariants: [{
    side: 'top',
    inset: true,
    class: {
      content: 'max-h-[calc(100%-2rem)] inset-x-4 top-4',
    },
  }, {
    side: 'top',
    inset: false,
    class: {
      content: 'max-h-full inset-x-0 top-0',
    },
  }, {
    side: 'right',
    inset: true,
    class: {
      content: 'w-[calc(100%-2rem)] inset-y-4 right-4',
    },
  }, {
    side: 'right',
    inset: false,
    class: {
      content: 'w-full inset-y-0 right-0',
    },
  }, {
    side: 'bottom',
    inset: true,
    class: {
      content: 'max-h-[calc(100%-2rem)] inset-x-4 bottom-4',
    },
  }, {
    side: 'bottom',
    inset: false,
    class: {
      content: 'max-h-full inset-x-0 bottom-0',
    },
  }, {
    side: 'left',
    inset: true,
    class: {
      content: 'w-[calc(100%-2rem)] inset-y-4 left-4',
    },
  }, {
    side: 'left',
    inset: false,
    class: {
      content: 'w-full inset-y-0 left-0',
    },
  }, {
    transition: true,
    side: 'top',
    class: {
      content: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-top data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top',
    },
  }, {
    transition: true,
    side: 'right',
    class: {
      content: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
    },
  }, {
    transition: true,
    side: 'bottom',
    class: {
      content: 'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom',
    },
  }, {
    transition: true,
    side: 'left',
    class: {
      content: 'data-[state=open]:animate-in data-[state=open]:slide-in-left data-[state=closed]:animate-out data-[state=closed]:slide-out-left',
    },
  }],
};
