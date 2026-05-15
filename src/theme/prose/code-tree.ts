export default {
  slots: {
    root: '',
    list: '',
    item: '',
    listWithChildren: '',
    itemWithChildren: '',
    link: '',
    linkLeadingIcon: '',
    linkLabel: '',
    linkTrailing: '',
    linkTrailingIcon: '',
    content: '',
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
