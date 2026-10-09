export default {
  slots: {
    root: 'flex flex-col lg:gap-10 lg:grid lg:grid-cols-10',
    left: 'lg:col-span-2',
    center: 'lg:col-span-8',
    right: 'order-first lg:col-span-2 lg:order-last',
  },
  variants: {
    left: {
      true: '',
    },
    right: {
      true: '',
    },
  },
  compoundVariants: [{
    left: true,
    right: true,
    class: {
      center: 'lg:col-span-6',
    },
  }, {
    left: false,
    right: false,
    class: {
      center: 'lg:col-span-10',
    },
  }],
};
