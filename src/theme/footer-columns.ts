export default {
  slots: {
    root: '',
    left: '',
    center: '',
    right: '',
    label: '',
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
