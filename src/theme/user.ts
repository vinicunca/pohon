export default {
  slots: {
    root: '',
    wrapper: '',
    name: '',
    description: '',
    avatar: '',
  },
  variants: {
    orientation: {
      horizontal: {
        root: '',
      },
      vertical: {
        root: '',
      },
    },
    to: {
      true: {
        name: '',
        description: '',
        avatar: '',
      },
      false: {
        name: '',
        description: '',
      },
    },
    size: {
      '3xs': {
        root: '',
        wrapper: '',
        name: '',
        description: '',
      },
      '2xs': {
        root: '',
        wrapper: '',
        name: '',
        description: '',
      },
      'xs': {
        root: '',
        wrapper: '',
        name: '',
        description: '',
      },
      'sm': {
        root: '',
        name: '',
        description: '',
      },
      'md': {
        root: '',
        name: '',
        description: '',
      },
      'lg': {
        root: '',
        name: '',
        description: '',
      },
      'xl': {
        root: '',
        name: '',
        description: '',
      },
      '2xl': {
        root: '',
        name: '',
        description: '',
      },
      '3xl': {
        root: '',
        name: '',
        description: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
};
