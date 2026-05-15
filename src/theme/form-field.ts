export default {
  slots: {
    root: '',
    wrapper: '',
    labelWrapper: '',
    label: '',
    container: '',
    description: '',
    error: '',
    hint: '',
    help: '',
  },
  variants: {
    size: {
      xs: { root: '' },
      sm: { root: '' },
      md: { root: '' },
      lg: { root: '' },
      xl: { root: '' },
    },
    required: {
      true: {
        label: '',
      },
    },
    orientation: {
      vertical: {
        container: '',
      },
      horizontal: {
        root: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
};
