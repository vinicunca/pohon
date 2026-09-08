// @unocss-include
export const themePageSection = {
  slots: {
    root: 'relative isolate',
    container: 'py-16 flex flex-col gap-8 lg:py-32 sm:py-24 sm:gap-16 lg:grid',
    wrapper: '',
    header: '',
    leading: 'mb-6 flex items-center',
    leadingIcon: 'color-primary shrink-0 size-10',
    headline: 'mb-3',
    title: 'color-text-highlighted text-3xl tracking-tight font-bold text-pretty lg:text-5xl sm:text-4xl',
    description: 'color-text-muted text-base sm:text-lg',
    body: 'mt-8',
    features: 'grid',
    footer: 'mt-8',
    links: 'flex flex-wrap gap-x-6 gap-y-3',
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
        description: 'text-pretty',
        features: 'gap-4',
      },
      vertical: {
        container: '',
        headline: 'justify-center',
        leading: 'justify-center',
        title: 'text-center',
        description: 'text-center text-balance',
        links: 'justify-center',
        features: 'gap-8 lg:grid-cols-3 sm:grid-cols-2',
      },
    },
    reverse: {
      true: {
        wrapper: 'order-last',
      },
    },
    headline: {
      true: {
        headline: 'color-primary font-600 flex gap-1.5 items-center',
      },
    },
    title: {
      true: {
        description: 'mt-6',
      },
    },
    description: {
      true: '',
    },
    body: {
      true: '',
    },
  },
  compoundVariants: [{
    orientation: 'vertical',
    title: true,
    class: {
      body: 'mt-16',
    },
  }, {
    orientation: 'vertical',
    description: true,
    class: {
      body: 'mt-16',
    },
  }, {
    orientation: 'vertical',
    body: true,
    class: {
      footer: 'mt-16',
    },
  }],
};
