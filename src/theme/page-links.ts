export default {
  slots: {
    root: '',
    title: '',
    list: '',
    item: '',
    link: '',
    linkLeadingIcon: '',
    linkLabel: '',
    linkLabelExternalIcon: '',
  },
  variants: {
    active: {
      true: {
        link: '',
      },
      false: {
        link: '',
      },
    },
  },
};
