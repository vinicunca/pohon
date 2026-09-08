import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  base: 'px-1.5 py-0.5 text-sm font-mono font-500 rounded-md inline-block',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, `border border-${color}/25 bg-${color}/10 color-${color}`])),
      neutral: 'border border-muted color-text-highlighted bg-muted',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});
