// @unocss-include
export const themePageHeader = {
  slots: {
    root: 'border-border py-8 border-b relative',
    container: '',
    wrapper: 'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
    headline: 'text-primary text-sm font-600 mb-2.5 flex gap-1.5 items-center',
    title: 'color-text-highlighted text-3xl font-bold text-pretty sm:text-4xl',
    description: 'color-text-muted text-lg text-pretty',
    links: 'flex flex-wrap gap-1.5 items-center',
  },
  variants: {
    title: {
      true: {
        description: 'mt-4',
      },
    },
  },
};
