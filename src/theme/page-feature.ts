export default {
  slots: {
    root: '',
    wrapper: '',
    leading: '',
    leadingIcon: '',
    title: '',
    description: '',
  },
  variants: {
    orientation: {
      horizontal: {
        root: '',
        leading: '',
      },
      vertical: {
        leading: '',
      },
    },
    to: {
      true: {
        root: '',
      },
    },
    title: {
      true: {
        description: '',
      },
    },
  },
};
