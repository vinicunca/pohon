// @unocss-include

export default {
  base: 'focus-visible:outline-primary',
  variants: {
    active: {
      true: 'color-primary',
      false: 'color-text-muted',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75',
    },
  },
  compoundVariants: [
    {
      active: false,
      disabled: false,
      class: 'hover:color-text transition-colors',
    },
  ],
};
