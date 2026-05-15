// @unocss-include

import { BRANDS } from '../../constants';

export default {
  base: 'px-1.5 py-0.5 text-sm font-mono font-medium rounded-md inline-block',
  variants: {
    color: {
      ...Object.fromEntries(BRANDS.map((color: string) => [color, `border border-${color}/25 bg-${color}/10 color-${color}`])),
      neutral: 'border border-border-muted color-text-highlighted bg-background-muted',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
};
