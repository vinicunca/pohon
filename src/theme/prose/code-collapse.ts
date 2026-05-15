export default {
  slots: {
    root: '',
    footer: '',
    trigger: '',
    triggerIcon: '',
  },
  variants: {
    open: {
      true: {
        root: '',
      },
      false: {
        root: '',
        footer: '',
      },
    },
  },
};
