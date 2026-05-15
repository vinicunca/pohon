export default {
  slots: {
    root: '',
    gap: '',
    container: '',
    inner: '',
    header: '',
    wrapper: '',
    title: '',
    description: '',
    actions: '',
    close: '',
    body: '',
    footer: '',
    rail: '',
  },
  variants: {
    side: {
      left: {
        container: '',
        rail: '',
      },
      right: {
        container: '',
        rail: '',
      },
    },
    collapsible: {
      offcanvas: {
        root: '',
        gap: '',
      },
      icon: {
        root: '',
        gap: '',
        container: '',
        actions: '',
        body: '',
      },
      none: {
        root: '',
      },
    },
    variant: {
      sidebar: {},
      floating: {
        container: '',
        inner: '',
        rail: '',
      },
      inset: {
        container: '',
        inner: '',
        rail: '',
      },
    },
  },

  compoundVariants: [],
};
