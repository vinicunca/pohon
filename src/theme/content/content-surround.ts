export default {
  slots: {
    root: '',
    link: '',
    linkLeading: '',
    linkLeadingIcon: '',
    linkTitle: '',
    linkDescription: '',
  },
  variants: {
    direction: {
      left: {
        linkLeadingIcon: '',
      },
      right: {
        link: '',
        linkLeadingIcon: '',
      },
    },
  },
};
