// @unocss-include
export const themePricingPlan = {
  slots: {
    root: 'p-6 rounded-lg gap-6 grid relative lg:p-8 xl:p-10',
    header: '',
    body: 'flex flex-col min-w-0',
    footer: 'flex flex-col gap-6 items-center',
    titleWrapper: 'flex gap-3 items-center',
    title: 'color-text-highlighted text-2xl font-semibold text-pretty truncate sm:text-3xl',
    description: 'color-text-muted text-base mt-2 text-pretty',
    priceWrapper: 'flex gap-1 items-center',
    price: 'color-text-highlighted text-3xl font-semibold sm:text-4xl',
    discount: 'color-text-muted text-xl line-through sm:text-2xl',
    billing: 'flex flex-col min-w-0 justify-between',
    billingPeriod: 'color-text-toned text-xs font-medium truncate',
    billingCycle: 'color-text-muted text-xs font-medium truncate',
    features: 'mt-6 flex flex-1 grow-0 flex-col gap-3',
    feature: 'flex gap-2 min-w-0 items-center',
    featureIcon: 'text-primary shrink-0 size-5',
    featureTitle: 'color-text-muted text-sm truncate',
    badge: '',
    button: '',
    tagline: 'color-text text-base font-semibold',
    terms: 'color-text-muted text-xs/5 text-center text-balance',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'divide-divide grid-cols-1 justify-between divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0',
        body: 'pb-6 justify-center lg:pb-0 lg:pe-6 lg:col-span-2',
        footer: 'lg:mx-auto lg:p-6 lg:max-w-xs lg:w-full lg:items-center lg:justify-center',
        features: 'lg:mt-12 lg:grid lg:grid-cols-2',
      },
      vertical: {
        footer: 'justify-end',
        priceWrapper: 'mt-6',
      },
    },
    variant: {
      solid: {
        root: 'bg-background-inverted',
        title: 'color-text-inverted',
        description: 'color-text-dimmed',
        price: 'color-text-inverted',
        discount: 'color-text-dimmed',
        billingCycle: 'color-text-dimmed',
        billingPeriod: 'color-text-dimmed',
        featureTitle: 'color-text-dimmed',
      },
      outline: {
        root: 'bg-background ring-ring ring',
      },
      soft: {
        root: 'bg-background-elevated/50',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring-ring ring',
      },
    },
    highlight: {
      true: {
        root: 'ring-primary ring-2 ring-inset',
      },
    },
    scale: {
      true: {
        root: 'lg:scale-[1.1] lg:z-[1]',
      },
    },
  },
  compoundVariants: [{
    orientation: 'horizontal',
    variant: 'soft',
    class: {
      root: 'divide-accented',
    },
  }, {
    orientation: 'horizontal',
    variant: 'subtle',
    class: {
      root: 'divide-accented',
    },
  }],
  defaultVariants: {
    variant: 'outline',
  },
};
