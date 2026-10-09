export default {
  slots: {
    root: 'relative border-b border-border py-8',
    container: '',
    wrapper: 'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
    headline: 'mb-2.5 text-sm font-600 color-primary flex items-center gap-1.5',
    title: 'text-3xl sm:text-4xl text-pretty font-700 color-text-highlighted',
    description: 'text-lg text-pretty color-text-muted',
    links: 'flex flex-wrap items-center gap-1.5',
  },
  variants: {
    title: {
      true: {
        description: 'mt-4',
      },
    },
  },
};
