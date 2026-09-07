import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  base: 'px-1.5 py-0.5 text-sm font-mono font-medium rounded-md inline-block',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, `border border-${color}/25 bg-${color}/10 text-${color}`])),
      neutral: 'border border-muted color-text-highlighted bg-muted',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});
