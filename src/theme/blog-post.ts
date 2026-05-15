export default {
  slots: {
    root: '',
    header: '',
    body: '',
    footer: '',
    image: '',
    title: '',
    description: '',
    authors: '',
    avatar: '',
    meta: '',
    date: '',
    badge: '',
  },
  variants: {
    orientation: {
      horizontal: {
        root: '',
        body: '',
      },
      vertical: {
        root: '',
        body: '',
      },
    },
    variant: {
      outline: {
        root: '',
        date: '',
        description: '',
      },
      soft: {
        root: '',
        date: '',
        description: '',
      },
      subtle: {
        root: '',
        date: '',
        description: '',
      },
      ghost: {
        date: '',
        description: '',
        header: '',
      },
      naked: {
        root: '',
        date: '',
        description: '',
        header: '',
      },
    },
    to: {
      true: {
        root: '',
        image: '',
        avatar: '',
      },
    },
    image: {
      true: '',
    },
  },

  compoundVariants: [],

  defaultVariants: {
    variant: 'outline',
  },
};
