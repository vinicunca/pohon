export default {
  slots: {
    root: '',
    container: '',
    wrapper: '',
    header: '',
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
        title: '',
        description: '',
        links: '',
      },
    },
    reverse: {
      true: {
        wrapper: '',
      },
    },
    variant: {
      solid: {
        root: '',
        title: '',
        description: '',
      },
      outline: {
        root: '',
        description: '',
      },
      soft: {
        root: '',
        description: '',
      },
      subtle: {
        root: '',
        description: '',
      },
      naked: {
        description: '',
      },
    },
    title: {
      true: {
        description: '',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
};
