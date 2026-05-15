export default {
  slots: {
    overlay: '',
    content: '',
    header: '',
    wrapper: '',
    body: '',
    footer: '',
    title: '',
    description: '',
    close: '',
  },
  variants: {
    transition: {
      true: {
        overlay: '',
        content: '',
      },
    },
    fullscreen: {
      true: {
        content: '',
      },
      false: {
        content: '',
      },
    },
    overlay: {
      true: {
        overlay: '',
      },
    },
    scrollable: {
      true: {
        overlay: '',
        content: '',
      },
      false: {
        content: '',
        body: '',
      },
    },
  },

  compoundVariants: [],
};
