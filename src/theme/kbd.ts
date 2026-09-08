import type { ModuleOptions } from '../module';

export default (options: Required<ModuleOptions>) => ({
  base: 'inline-flex items-center justify-center px-1 rounded-sm font-500 font-sans uppercase',
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
    },
    size: {
      sm: 'h-4 min-w-[16px] text-[10px]',
      md: 'h-5 min-w-[20px] text-[11px]',
      lg: 'h-6 min-w-[24px] text-[12px]',
    },
  },
  compoundVariants: [...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: 'solid',
    class: `color-text-inverted bg-${color}`,
  })), ...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: 'outline',
    class: `ring ring-inset ring-${color}/50 color-${color}`,
  })), ...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: 'soft',
    class: `color-${color} bg-${color}/10`,
  })), ...(options.theme.colors || []).map((color: string) => ({
    color,
    variant: 'subtle',
    class: `color-${color} ring ring-inset ring-${color}/25 bg-${color}/10`,
  })), {
    color: 'neutral',
    variant: 'solid',
    class: 'color-text-inverted bg-background-inverted',
  }, {
    color: 'neutral',
    variant: 'outline',
    class: 'ring ring-inset ring-ring-accented color-text bg-background',
  }, {
    color: 'neutral',
    variant: 'soft',
    class: 'color-text bg-background-elevated',
  }, {
    color: 'neutral',
    variant: 'subtle',
    class: 'ring ring-inset ring-ring-accented color-text bg-background-elevated',
  }],
  defaultVariants: {
    variant: 'outline',
    color: 'neutral',
    size: 'md',
  },
});
