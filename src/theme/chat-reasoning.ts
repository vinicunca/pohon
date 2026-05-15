export default {
  slots: {
    root: '',
    trigger: '',
    leading: '',
    leadingIcon: '',
    chevronIcon: '',
    label: '',
    trailingIcon: '',
    content: '',
    body: '',
  },
  variants: {
    chevron: {
      leading: {
        leadingIcon: '',
      },
      trailing: '',
    },
    alone: {
      false: {
        leadingIcon: '',
        chevronIcon: '',
      },
    },
  },
};
