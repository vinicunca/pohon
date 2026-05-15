export default {
  slots: {
    overlay: '',
    content: '',
    handle: '',
    container: '',
    header: '',
    title: '',
    description: '',
    body: '',
    footer: '',
  },
  variants: {
    direction: {
      top: {
        content: '',
        handle: '',
      },
      right: {
        content: '',
        handle: '',
      },
      bottom: {
        content: '',
        handle: '',
      },
      left: {
        content: '',
        handle: '',
      },
    },
    inset: {
      true: {
        content: '',
      },
    },
    snapPoints: {
      true: '',
    },
  },

  compoundVariants: [],
};
