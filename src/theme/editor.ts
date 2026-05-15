export default {
  slots: {
    root: '',
    content: '',
    base: '',
  },

  variants: {
    placeholderMode: {
      firstLine: {
        base: '',
      },
      everyLine: {
        base: '',
      },
    },
  },
  defaultVariants: {
    placeholderMode: 'everyLine',
  },
};
