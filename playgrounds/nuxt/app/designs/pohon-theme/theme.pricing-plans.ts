// @unocss-include
import type { PThemePricingPlan, PThemePricingPlans } from 'pohon-ui';

export const themePricingPlans = {
  base: 'flex flex-col gap-y-8',
  variants: {
    orientation: {
      horizontal: 'lg:(grid grid-cols-[repeat(var(--count),minmax(0,1fr))])',
      vertical: '',
    },
    compact: {
      false: 'gap-x-8',
    },
    scale: {
      true: '',
    },
  },
  compoundVariants: [
    {
      compact: false,
      scale: true,
      class: 'lg:gap-x-13',
    },
  ],
} satisfies PThemePricingPlans;

export const themePricingPlan = {
  slots: {
    root: 'p-6 rounded-lg gap-6 grid relative lg:p-8 xl:p-10',
    header: '',
    body: 'flex flex-col min-w-0',
    footer: 'flex flex-col gap-6 items-center',
    titleWrapper: 'flex gap-3 items-center',
    title: 'text-2xl color-text-highlighted font-600 text-pretty truncate sm:text-3xl',
    description: 'text-base color-text-muted mt-2 text-pretty',
    priceWrapper: 'flex gap-1 items-center',
    price: 'text-3xl color-text-highlighted font-600 sm:text-4xl',
    discount: 'text-xl color-text-muted line-through sm:text-2xl',
    billing: 'flex flex-col min-w-0 justify-between',
    billingPeriod: 'text-xs color-text-toned font-500 truncate',
    billingCycle: 'text-xs color-text-muted font-500 truncate',
    features: 'mt-6 flex flex-1 grow-0 flex-col gap-3',
    feature: 'flex gap-2 min-w-0 items-center',
    featureIcon: 'color-primary shrink-0 size-5',
    featureTitle: 'text-sm color-text-muted truncate',
    badge: '',
    button: '',
    tagline: 'text-base color-text font-600',
    terms: 'text-xs/5 color-text-muted text-center text-balance',
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'grid-cols-1 justify-between divide-divide divide-y lg:(grid-cols-3 divide-x divide-y-0)',
        body: 'pb-6 justify-center lg:(pb-0 pe-6 col-span-2)',
        footer: 'lg:(mx-auto p-6 max-w-xs w-full items-center justify-center)',
        features: 'lg:(mt-12 grid grid-cols-2)',
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
        description: 'pohon:color-text-dimmed',
        price: 'color-text-inverted',
        discount: 'pohon:color-text-dimmed',
        billingCycle: 'pohon:color-text-dimmed',
        billingPeriod: 'pohon:color-text-dimmed',
        featureTitle: 'pohon:color-text-dimmed',
      },
      outline: {
        root: 'bg-background ring ring-ring',
      },
      soft: {
        root: 'bg-background-elevated/50',
      },
      subtle: {
        root: 'bg-background-elevated/50 ring ring-ring',
      },
    },
    highlight: {
      true: {
        root: 'ring-2 ring-primary ring-inset',
      },
    },
    scale: {
      true: {
        root: 'lg:scale-[1.1] lg:z-1',
      },
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: 'soft',
      class: {
        root: 'divide-divide-accented',
      },
    },
    {
      orientation: 'horizontal',
      variant: 'subtle',
      class: {
        root: 'divide-divide-accented',
      },
    },
  ],
} satisfies PThemePricingPlan;
