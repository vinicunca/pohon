export default {
  slots: {
    root: '',
    header: '',
    body: '',
    footer: '',
    titleWrapper: '',
    title: '',
    description: '',
    priceWrapper: '',
    price: '',
    discount: '',
    billing: '',
    billingPeriod: '',
    billingCycle: '',
    features: '',
    feature: '',
    featureIcon: '',
    featureTitle: '',
    badge: '',
    button: '',
    tagline: '',
    terms: '',
  },
  variants: {
    orientation: {
      horizontal: {
        root: '',
        body: '',
        footer: '',
        features: '',
      },
      vertical: {
        footer: '',
        priceWrapper: '',
      },
    },
    variant: {
      solid: {
        root: '',
        title: '',
        description: '',
        price: '',
        discount: '',
        billingCycle: '',
        billingPeriod: '',
        featureTitle: '',
      },
      outline: {
        root: '',
      },
      soft: {
        root: '',
      },
      subtle: {
        root: '',
      },
    },
    highlight: {
      true: {
        root: '',
      },
    },
    scale: {
      true: {
        root: '',
      },
    },
  },
  compoundVariants: [],

  defaultVariants: {
    variant: 'outline',
  },
};
