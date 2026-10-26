import { createGenerator, presetWind4 } from 'unocss';
import { describe, expect, it } from 'vitest';
import { pohonColors } from '../../src/unocss';

describe('pohon semantic colors', () => {
  const uno = createGenerator({
    presets: [
      presetWind4(),
    ],
    theme: { colors: pohonColors },
  });

  it.each([
    ['color-text-muted', 'color', 'text-muted'],
    ['bg-background-elevated', 'background-color', 'bg-elevated'],
    ['bg-primary', 'background-color', 'primary'],
    ['ring-border', '--un-ring-color', 'border'],
    ['ring-border-accented', '--un-ring-color', 'border-accented'],
    ['ring-border-inverted', '--un-ring-color', 'border-inverted'],
    ['divide-border', 'border-color', 'border'],
    ['divide-border-accented', 'border-color', 'border-accented'],
    ['outline-border-inverted', 'outline-color', 'border-inverted'],
    ['stroke-border', 'stroke', 'border'],
    ['stroke-border-inverted', 'stroke', 'border-inverted'],
    ['fill-background', 'fill', 'bg'],
    ['border-background', 'border-color', 'bg'],
    ['ring-offset-background', '--un-ring-offset-color', 'bg'],
  ])('generates %s using the semantic CSS variable', async (utility, property, token) => {
    const { css, matched } = await (await uno).generate(utility, { preflights: false });

    expect(matched.has(utility)).toBe(true);
    expect(css).toContain(`${property}:color-mix(in srgb, var(--ui-color-${token})`);
  });

  it.each([
    ['color-primary-foreground', 'color', 'primary'],
    ['color-error-foreground', 'color', 'error'],
    ['group-hover:color-primary-foreground', 'color', 'primary'],
  ])('generates %s falling back to the inverted text color', async (utility, property, color) => {
    const { css, matched } = await (await uno).generate(utility, { preflights: false });

    expect(matched.has(utility)).toBe(true);
    expect(css).toContain(`${property}:color-mix(in srgb, var(--ui-color-${color}-foreground)`);
  });

  const brands = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'error',
  ];
  const shades = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];

  it.each(
    brands.flatMap((brand) => shades.map((shade) => [`bg-${brand}-${shade}`, brand, shade])),
  )('generates %s using the brand shade CSS variable', async (utility, brand, shade) => {
    const { css, matched } = await (await uno).generate(utility, { preflights: false });

    expect(matched.has(utility)).toBe(true);
    expect(css).toContain(`background-color:color-mix(in srgb, var(--ui-color-${brand}-${shade})`);
  });

  it.each([
    ['color-warning-600', 'color', 'warning-600'],
    ['dark:color-warning-300', 'color', 'warning-300'],
    ['[&_code]:color-error-600', 'color', 'error-600'],
    ['dark:[&_code]:color-error-300', 'color', 'error-300'],
  ])('generates the prose callout shade %s', async (utility, property, token) => {
    const { css, matched } = await (await uno).generate(utility, { preflights: false });

    expect(matched.has(utility)).toBe(true);
    expect(css).toContain(`${property}:color-mix(in srgb, var(--ui-color-${token})`);
  });

  it.each([
    [
      'bg-primary-500/40',
      'background-color',
      'primary-500',
      40,
    ],
    [
      'outline-border-inverted/25',
      'outline-color',
      'border-inverted',
      25,
    ],
    [
      'focus-visible:ring-border-accented/50',
      '--un-ring-color',
      'border-accented',
      50,
    ],
    [
      'stroke-border-inverted/10',
      'stroke',
      'border-inverted',
      10,
    ],
  ])('preserves opacity in %s', async (utility, property, token, opacity) => {
    const { css, matched } = await (await uno).generate(utility, { preflights: false });

    expect(matched.has(utility)).toBe(true);
    expect(css).toContain(`${property}:color-mix(in srgb, var(--ui-color-${token}) ${opacity}%, transparent)`);
  });
});
