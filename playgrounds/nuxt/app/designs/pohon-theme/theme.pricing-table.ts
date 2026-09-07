// @unocss-include
export const themePricingTable = {
  slots: {
    root: 'w-full relative',
    table: 'h-fit w-full hidden border-separate border-spacing-x-0 table-fixed md:table',
    list: 'flex flex-col gap-6 w-full md:hidden',
    item: 'border-border p-6 border rounded-lg flex flex-col',
    caption: 'sr-only',
    thead: '',
    tbody: '',
    tr: '',
    th: 'border-border font-normal py-4 text-start border-b',
    td: 'border-border px-6 py-4 text-center border-b',
    tier: 'font-normal p-6 text-start align-top h-full',
    tierWrapper: 'flex flex-col md:h-full',
    tierTitleWrapper: 'flex gap-3 items-center',
    tierTitle: 'color-text-highlighted text-lg font-semibold',
    tierDescription: 'color-text-muted text-sm font-normal mt-1',
    tierBadge: 'truncate',
    tierPriceWrapper: 'mt-4 flex gap-1 items-center',
    tierPrice: 'color-text-highlighted text-3xl font-semibold sm:text-4xl',
    tierDiscount: 'color-text-muted text-xl line-through sm:text-2xl',
    tierBilling: 'flex flex-col min-w-0 justify-between',
    tierBillingPeriod: 'color-text-toned text-xs font-medium truncate',
    tierBillingCycle: 'color-text-muted text-xs font-medium truncate',
    tierButton: 'mt-6 md:mt-auto md:pt-6',
    tierFeatureIcon: 'shrink-0 size-5',
    section: 'mt-6 flex flex-col gap-2',
    sectionTitle: 'color-text-highlighted text-sm font-semibold',
    feature: 'flex gap-1 items-center justify-between',
    featureTitle: 'color-text text-sm',
    featureValue: 'color-text-muted text-sm flex min-w-5 justify-center',
  },
  variants: {
    section: {
      true: {
        tr: '*:pt-8',
      },
    },
    active: {
      true: {
        tierFeatureIcon: 'text-primary',
      },
    },
    highlight: {
      true: {
        tier: 'bg-background-elevated/50 border-border border-x border-t rounded-t-lg',
        td: 'bg-background-elevated/50 border-border border-x',
        item: 'bg-background-elevated/50',
      },
    },
  },
};
