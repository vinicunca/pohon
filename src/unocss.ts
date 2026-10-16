/**
 * A brand color and the text color that sits on top of it (`bg-primary color-primary-foreground`).
 * `--ui-color-<name>-foreground` is optional and falls back to `--ui-color-text-inverted`.
 */
function brandColor(name: string) {
  return {
    DEFAULT: `var(--ui-color-${name})`,
    foreground: `var(--ui-color-${name}-foreground)`,
  };
}

/** Semantic colors for UnoCSS `theme.colors`, backed by Pohon UI CSS variables. */
export const pohonColors = {
  text: {
    dimmed: 'var(--ui-color-text-dimmed)',
    muted: 'var(--ui-color-text-muted)',
    toned: 'var(--ui-color-text-toned)',
    DEFAULT: 'var(--ui-color-text)',
    highlighted: 'var(--ui-color-text-highlighted)',
    inverted: 'var(--ui-color-text-inverted)',
  },
  background: {
    DEFAULT: 'var(--ui-color-bg)',
    muted: 'var(--ui-color-bg-muted)',
    elevated: 'var(--ui-color-bg-elevated)',
    accented: 'var(--ui-color-bg-accented)',
    inverted: 'var(--ui-color-bg-inverted)',
  },
  border: {
    DEFAULT: 'var(--ui-color-border)',
    muted: 'var(--ui-color-border-muted)',
    accented: 'var(--ui-color-border-accented)',
    inverted: 'var(--ui-color-border-inverted)',
  },
  primary: brandColor('primary'),
  secondary: brandColor('secondary'),
  success: brandColor('success'),
  info: brandColor('info'),
  warning: brandColor('warning'),
  error: brandColor('error'),
};
