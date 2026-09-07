// @unocss-include
export const themeLink = {
  base: 'outline-primary/25 focus-visible:outline-3 rounded-md',
  variants: {
    active: {
      true: 'text-primary',
      false: 'color-text-muted'
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    }
  },
  compoundVariants: [{
    active: false,
    disabled: false,
    class: ['hover:color-text', 'transition-colors']
  }]
};
