// @unocss-include
export const themePageCta = {
  slots: {
    root: 'rounded-xl relative overflow-hidden isolate',
    container: 'px-6 py-12 flex flex-col gap-8 lg:px-16 lg:py-24 sm:px-12 sm:py-24 sm:gap-16 lg:grid',
    wrapper: '',
    header: '',
    title: 'color-text-highlighted text-3xl tracking-tight font-bold text-pretty sm:text-4xl',
    description: 'color-text-muted text-base sm:text-lg',
    body: 'mt-8',
    footer: 'mt-8',
    links: 'flex flex-wrap gap-x-6 gap-y-3',
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'lg:grid-cols-2 lg:items-center',
        description: 'text-pretty',
      },
      vertical: {
        container: '',
        title: 'text-center',
        description: 'text-center text-balance',
        links: 'justify-center',
      },
    },
    reverse: {
      true: {
        wrapper: 'order-last',
      },
    },
    variant: {
      solid: {
        root: 'bg-background-inverted color-text-inverted',
        title: 'color-text-inverted',
        description: 'color-text-dimmed',
      },
      outline: {
        root: 'bg-background ring-ring ring',
        description: 'color-text-muted',
      },
      soft: {
        root: 'bg-background-elevated/50',
        description: 'color-text-toned',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring-ring ring',
        description: 'color-text-toned',
      },
      naked: {
        description: 'color-text-muted',
      },
    },
    title: {
      true: {
        description: 'mt-6',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
};
