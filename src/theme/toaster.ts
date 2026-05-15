export default {
  slots: {
    viewport: '',
    base: '',
  },
  variants: {
    position: {
      'top-left': {
        viewport: '',
      },
      'top-center': {
        viewport: '',
      },
      'top-right': {
        viewport: '',
      },
      'bottom-left': {
        viewport: '',
      },
      'bottom-center': {
        viewport: '',
      },
      'bottom-right': {
        viewport: '',
      },
    },
    swipeDirection: {
      up: '',
      right: '',
      down: '',
      left: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    position: 'bottom-right',
  },
};
