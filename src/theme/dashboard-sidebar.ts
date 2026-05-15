export default {
  slots: {
    root: '',
    header: '',
    body: '',
    footer: '',
    toggle: '',
    handle: '',
    content: '',
    overlay: '',
  },
  variants: {
    menu: {
      true: {
        header: '',
        body: '',
        footer: '',
      },
    },
    side: {
      left: {
        root: '',
      },
      right: {
        root: '',
      },
    },
    toggleSide: {
      left: {
        toggle: '',
      },
      right: {
        toggle: '',
      },
    },
  },
};
