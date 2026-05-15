export default {
  slots: {
    root: '',
    trigger: '',
    leading: '',
    leadingIcon: '',
    chevronIcon: '',
    label: '',
    suffix: '',
    trailingIcon: '',
    content: '',
    body: '',
  },
  variants: {
    variant: {
      inline: {
        body: '',
      },
      card: {
        root: '',
        trigger: '',
        trailingIcon: '',
        body: '',
      },
    },
    chevron: {
      leading: {
        leadingIcon: '',
      },
      trailing: '',
    },
    loading: {
      true: {
        leadingIcon: '',
      },
    },
    alone: {
      false: {
        leadingIcon: '',
        chevronIcon: '',
      },
    },
  },
};
