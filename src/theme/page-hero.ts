export default {
  slots: {
    root: '',
    container: '',
    wrapper: '',
    header: '',
    headline: '',
    title: '',
    description: '',
    body: '',
    footer: '',
    links: '',
  },
  variants: {
    orientation: {
      horizontal: {
        container: '',
        description: '',
      },
      vertical: {
        container: '',
        headline: '',
        wrapper: '',
        description: '',
        links: '',
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
  },
};
