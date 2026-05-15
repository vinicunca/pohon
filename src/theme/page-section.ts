export default {
  slots: {
    root: '',
    container: '',
    wrapper: '',
    header: '',
    leading: '',
    leadingIcon: '',
    headline: '',
    title: '',
    description: '',
    body: '',
    features: '',
    footer: '',
    links: '',
  },
  variants: {
    orientation: {
      horizontal: {
        container: '',
        description: '',
        features: '',
      },
      vertical: {
        container: '',
        headline: '',
        leading: '',
        title: '',
        description: '',
        links: '',
        features: '',
      },
    },
    reverse: {
      true: {
        wrapper: '',
      },
    },
    headline: {
      true: {
        headline: '',
      },
    },
    title: {
      true: {
        description: '',
      },
    },
    description: {
      true: '',
    },
    body: {
      true: '',
    },
  },
  compoundVariants: [],
};
