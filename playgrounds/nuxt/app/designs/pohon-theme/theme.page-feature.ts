// @unocss-include
export const themePageFeature = {
  slots: {
    root: 'rounded-sm relative',
    wrapper: '',
    leading: 'inline-flex items-center justify-center',
    leadingIcon: 'text-primary shrink-0 size-5',
    title: 'color-text-highlighted text-base font-semibold text-pretty',
    description: 'color-text-muted text-[15px] text-pretty',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex gap-2.5 items-start',
        leading: 'p-0.5',
      },
      vertical: {
        leading: 'mb-2.5',
      },
    },
    to: {
      true: {
        root: ['outline-primary/25 has-focus-visible:outline-3', 'transition'],
      },
    },
    title: {
      true: {
        description: 'mt-1',
      },
    },
  },
};
