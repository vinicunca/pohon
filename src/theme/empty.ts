export default {
  slots: {
    root: '',
    header: '',
    avatar: '',
    title: '',
    description: '',
    body: '',
    actions: '',
    footer: '',
  },

  variants: {
    size: {
      xs: {
        avatar: '',
        title: '',
        description: '',
      },
      sm: {
        avatar: '',
        title: '',
        description: '',
      },
      md: {
        avatar: '',
        title: '',
        description: '',
      },
      lg: {
        avatar: '',
        title: '',
        description: '',
      },
      xl: {
        avatar: '',
        title: '',
        description: '',
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
  },

  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
};
