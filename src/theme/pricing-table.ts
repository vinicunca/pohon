export default {
  slots: {
    root: '',
    table: '',
    list: '',
    item: '',
    caption: '',
    thead: '',
    tbody: '',
    tr: '',
    th: '',
    td: '',
    tier: '',
    tierWrapper: '',
    tierTitleWrapper: '',
    tierTitle: '',
    tierDescription: '',
    tierBadge: '',
    tierPriceWrapper: '',
    tierPrice: '',
    tierDiscount: '',
    tierBilling: '',
    tierBillingPeriod: '',
    tierBillingCycle: '',
    tierButton: '',
    tierFeatureIcon: '',
    section: '',
    sectionTitle: '',
    feature: '',
    featureTitle: '',
    featureValue: '',
  },
  variants: {
    section: {
      true: {
        tr: '',
      },
    },
    active: {
      true: {
        tierFeatureIcon: '',
      },
    },
    highlight: {
      true: {
        tier: '',
        td: '',
        item: '',
      },
    },
  },
};
