export default {
  slots: {
    root: '',
    header: '',
    title: '',
    description: '',
    body: '',
    footer: '',
  },
  variants: {
    variant: {
      solid: {
        root: '',
        title: '',
        description: '',
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
  },
  defaultVariants: {
    variant: 'outline',
  },
};
