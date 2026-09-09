// @unocss-include
import type { PThemePricingTable } from 'pohon-ui';

export const themePricingTable = {
  slots: {
    root: 'w-full relative',
    table: 'h-fit w-full hidden border-separate border-spacing-x-0 table-fixed md:table',
    list: 'flex flex-col gap-6 w-full md:hidden',
    item: 'p-6 border border-border rounded-lg flex flex-col',
    caption: 'sr-only',
    thead: '',
    tbody: '',
    tr: '',
    th: 'font-normal py-4 text-start border-b border-border',
    td: 'px-6 py-4 text-center border-b border-border',
    tier: 'font-normal p-6 text-start align-top h-full',
    tierWrapper: 'flex flex-col md:h-full',
    tierTitleWrapper: 'flex gap-3 items-center',
    tierTitle: 'text-lg color-text-highlighted font-600',
    tierDescription: 'text-sm color-text-muted font-normal mt-1',
    tierBadge: 'truncate',
    tierPriceWrapper: 'mt-4 flex gap-1 items-center',
    tierPrice: 'text-3xl color-text-highlighted font-600 sm:text-4xl',
    tierDiscount: 'text-xl color-text-muted line-through sm:text-2xl',
    tierBilling: 'flex flex-col min-w-0 justify-between',
    tierBillingPeriod: 'text-xs color-text-toned font-500 truncate',
    tierBillingCycle: 'text-xs color-text-muted font-500 truncate',
    tierButton: 'mt-6 md:mt-auto md:pt-6',
    tierFeatureIcon: 'shrink-0 size-5',
    section: 'mt-6 flex flex-col gap-2',
    sectionTitle: 'text-sm color-text-highlighted font-600',
    feature: 'flex gap-1 items-center justify-between',
    featureTitle: 'text-sm color-text',
    featureValue: 'text-sm color-text-muted flex min-w-5 justify-center',
  },
  variants: {
    section: {
      true: {
        tr: '*:pt-8',
      },
    },
    active: {
      true: {
        tierFeatureIcon: 'color-primary',
      },
    },
    highlight: {
      true: {
        tier: 'border-x border-t border-border rounded-t-lg bg-background-elevated/50',
        td: 'border-x border-border bg-background-elevated/50',
        item: 'bg-background-elevated/50',
      },
    },
  },
} satisfies PThemePricingTable;
