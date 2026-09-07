// @unocss-include
import { defuFn } from 'defu'
import { themeInput } from './theme.input';
import { fieldGroupVariant } from './theme.field-group';
export const themeInputDate = defuFn({
    slots: {
      root: () => undefined,
      base: () => ['group relative inline-flex items-center rounded-md select-none', 'transition-colors'],
      segment: ['rounded-sm text-center outline-hidden data-placeholder:color-text-dimmed data-[segment=literal]:color-text-muted data-invalid:color-error data-disabled:cursor-not-allowed data-disabled:opacity-75', 'transition-colors'],
      separatorIcon: 'shrink-0 size-4 color-text-muted'
    },
    variants: {
      ...fieldGroupVariant,
      size: {
        xs: {
          base: (prev: string) => [prev, 'gap-0.25'],
          segment: 'data-[segment=day]:w-8 data-[segment=month]:w-8 data-[segment=year]:w-10'
        },
        sm: {
          base: (prev: string) => [prev, 'gap-0.5'],
          segment: 'data-[segment=day]:w-8 data-[segment=month]:w-8 data-[segment=year]:w-10'
        },
        md: {
          base: (prev: string) => [prev, 'gap-0.5'],
          segment: 'data-[segment=day]:w-9 data-[segment=month]:w-9 data-[segment=year]:w-11'
        },
        lg: {
          base: (prev: string) => [prev, 'gap-0.75'],
          segment: 'data-[segment=day]:w-9 data-[segment=month]:w-9 data-[segment=year]:w-11'
        },
        xl: {
          base: (prev: string) => [prev, 'gap-0.75'],
          segment: 'data-[segment=day]:w-10 data-[segment=month]:w-10 data-[segment=year]:w-12'
        }
      },
      variant: (prev: Record<string, string>) => Object.fromEntries(
        Object.entries(prev).map(([key, value]) => [key, replaceFocus(value)])
      )
    },
    compoundVariants: (prev: Record<string, any>[]) => [...prev.map(item => ({
      ...item,
      class: typeof item.class === 'string' ? replaceFocus(item.class) : item.class
    })), {
      variant: 'outline',
      class: {
        segment: 'focus:bg-background-elevated'
      }
    }, {
      variant: 'soft',
      class: {
        segment: 'focus:bg-background-accented/50 group-hover:focus:bg-background-accented'
      }
    }, {
      variant: 'subtle',
      class: {
        segment: 'focus:bg-background-accented'
      }
    }, {
      variant: 'ghost',
      class: {
        segment: 'focus:bg-background-elevated group-hover:focus:bg-background-accented'
      }
    }, {
      variant: 'none',
      class: {
        segment: 'focus:bg-background-elevated'
      }
    }]
  }, themeInput);

function replaceFocus(str: string): string {
  return str
    .replace(/focus:/g, 'has-focus:')
    .replace(/focus-visible:/g, 'has-focus-visible:');
}
