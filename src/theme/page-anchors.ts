export default {
  slots: {
    root: '',
    list: '',
    item: '',
    link: '',
    linkLeading: '',
    linkLeadingIcon: '',
    linkLabel: '',
    linkLabelExternalIcon: '',
  },
  variants: {
    active: {
      true: {
        link: '',
        linkLeading: '',
      },
      false: {
        link: '',
        linkLeading: '',
      },
    },
  },
};
