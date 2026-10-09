import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  slots: {
    base: ['group relative block px-4 py-3 rounded-md text-sm/6 my-5 last:mb-0 [&_code]:text-xs/5 [&_code]:bg-background [&_pre]:bg-background [&>div]:my-2.5 [&_ul]:my-2.5 [&_ol]:my-2.5 *:last:mb-0! [&_ul]:ps-4.5 [&_ol]:ps-4.5 [&_li]:my-0', options.theme.transitions && 'transition-colors'],
    icon: ['size-4 shrink-0 align-sub me-2 inline-block', options.theme.transitions && 'transition-colors'],
    externalIcon: ['size-4 align-top absolute right-2 top-2 pointer-events-none', options.theme.transitions && 'transition-colors'],
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, {
        base: `border border-${color}/25 bg-${color}/10 color-${color}-600 dark:color-${color}-300 [&_a]:color-${color} [&_a]:hover:border-${color} [&_a]:focus-visible:border-transparent [&_a]:outline-${color}/25 [&_a]:focus-visible:outline-3 [&_a]:focus-visible:has-[>code]:outline-0 [&_code]:color-${color}-600 dark:[&_code]:color-${color}-300 [&_code]:border-${color}/25 [&_a]:[&>code]:outline-${color}/25 [&_a]:hover:[&>code]:border-${color} [&_a]:hover:[&>code]:color-${color} [&_a]:focus-visible:[&>code]:border-${color} [&_a]:focus-visible:[&>code]:color-${color} [&>ul]:marker:color-${color}/50`,
        icon: `color-${color}`,
        externalIcon: `color-${color}-600 dark:color-${color}-300`,
      }])),
      neutral: {
        base: 'border border-muted bg-muted color-text',
        icon: 'color-text-highlighted',
        externalIcon: 'color-text-dimmed',
      },
    },
    to: {
      true: 'border-dashed',
    },
  },
  compoundVariants: [...(options.theme.colors || []).map((color: string) => ({
    color,
    to: true,
    class: {
      base: `hover:border-${color} outline-${color}/25 has-[>a:focus-visible]:outline-3 has-[>a:focus-visible]:border-${color}`,
      externalIcon: `group-hover:color-${color}`,
    },
  })), {
    color: 'neutral',
    to: true,
    class: {
      base: 'hover:border-border-inverted outline-outline-inverted/25 has-[>a:focus-visible]:outline-3 has-[>a:focus-visible]:border-border-inverted',
      externalIcon: 'group-hover:color-text-highlighted',
    },
  }],
  defaultVariants: {
    color: 'neutral',
  },
});
