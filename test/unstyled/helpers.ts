import { expect } from 'vitest';

/** Theme utilities that must not appear when `theme.unstyled` is enabled. */
export const THEME_CLASS_MARKERS = [
  'rounded-md',
  'font-500',
  'inline-flex',
  'truncate',
  'bg-primary',
  'color-text-inverted',
  'color-primary',
  'ring-inset',
  'transition-colors',
  'px-2.5',
  'py-1.5',
  'text-sm',
] as const;

export function classTokens(classAttr: string | undefined): Array<string> {
  return (classAttr ?? '').split(/\s+/).filter(Boolean);
}

export function expectNoThemeClasses(classAttr: string | undefined) {
  const tokens = classTokens(classAttr);
  for (const marker of THEME_CLASS_MARKERS) {
    expect(tokens).not.toContain(marker);
  }
}
