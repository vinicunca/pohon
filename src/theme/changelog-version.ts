export default {
  slots: {
    root: '',
    container: '',
    header: '',
    meta: '',
    date: '',
    badge: '',
    title: '',
    description: '',
    imageWrapper: '',
    image: '',
    authors: '',
    footer: '',
    indicator: '',
    dot: '',
    dotInner: '',
  },
  variants: {
    body: {
      false: {
        footer: 'mt-5',
      },
    },
    badge: {
      false: {
        meta: 'lg:hidden',
      },
    },
    to: {
      true: {
        title: '',
        image: '',
      },
    },
    hidden: {
      true: {
        date: 'lg:hidden',
      },
    },
  },
};
