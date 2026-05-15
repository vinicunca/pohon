export default {
  slots: {
    modal: '',
    input: '',
  },
  variants: {
    fullscreen: {
      false: {
        modal: '',
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },
  defaultVariants: {
    size: 'md',
  },
};
