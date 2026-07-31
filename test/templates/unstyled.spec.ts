import { defu } from 'defu';
import { describe, expect, it } from 'vitest';
import { getTemplates } from '../../src/templates';
import { defaultOptions } from '../../src/utils/defaults';

async function loadTheme(filename: string, unstyled: boolean) {
  const templates = getTemplates(defu({ theme: { unstyled } }, defaultOptions), {});
  const template = templates.find((t) => t.filename === filename);
  expect(template).toBeDefined();

  const contents = await template!.getContents!({} as any);
  // Production templates embed `as typeof <variant>[number]` for types — strip, then parse JSON.
  const jsonMatch = contents.match(/export default (\{[\s\S]*\})\s*$/);
  expect(jsonMatch).toBeTruthy();

  const json = jsonMatch![1].replace(/ as typeof \w+\[number\]/g, '');
  return JSON.parse(json);
}

function assertBlankedClasses(theme: any) {
  if ('base' in theme) {
    expect(theme.base).toBe('');
  }

  for (const value of Object.values(theme.slots || {})) {
    expect(value).toBe('');
  }

  for (const group of Object.values(theme.variants || {}) as Array<Record<string, unknown>>) {
    for (const value of Object.values(group)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        expect(Object.values(value as Record<string, unknown>).every((v) => v === '')).toBe(true);
      } else {
        expect(value).toBe('');
      }
    }
  }

  for (const entry of theme.compoundVariants || []) {
    const cls = entry.class;
    if (cls && typeof cls === 'object' && !Array.isArray(cls)) {
      expect(Object.values(cls).every((v) => v === '')).toBe(true);
    } else {
      expect(cls).toBe('');
    }
  }
}

describe('getTemplates with theme.unstyled', () => {
  it.each(['ui/button.ts', 'ui/badge.ts'])('blanks %s when unstyled is true', async (filename) => {
    const theme = await loadTheme(filename, true);

    assertBlankedClasses(theme);
    expect(Object.keys(theme.slots || {}).length).toBeGreaterThan(0);
    expect(Object.keys(theme.variants || {}).length).toBeGreaterThan(0);
    expect(theme.defaultVariants).toBeDefined();
  });

  it.each(['ui/button.ts', 'ui/badge.ts'])('keeps non-empty slot classes on %s when unstyled is false', async (filename) => {
    const theme = await loadTheme(filename, false);

    const slotValues = Object.values(theme.slots || {}) as Array<string>;
    expect(slotValues.some((value) => typeof value === 'string' && value.length > 0)).toBe(true);
  });

  // Slot-less themes keep every class on a top-level `base` and have no `slots`.
  const SLOT_LESS = ['ui/container.ts', 'ui/main.ts', 'ui/kbd.ts', 'ui/link.ts', 'ui/skeleton.ts'];

  it.each(SLOT_LESS)('blanks the top-level base of %s when unstyled is true', async (filename) => {
    const theme = await loadTheme(filename, true);

    expect(theme.slots).toBeUndefined();
    expect(theme.base).toBe('');
    assertBlankedClasses(theme);
  });

  it.each(SLOT_LESS)('keeps a non-empty base on %s when unstyled is false', async (filename) => {
    const theme = await loadTheme(filename, false);

    expect(typeof theme.base).toBe('string');
    expect(theme.base.length).toBeGreaterThan(0);
  });

  it('preserves kbd variant keys and defaultVariants under unstyled', async () => {
    const styled = await loadTheme('ui/kbd.ts', false);
    const unstyled = await loadTheme('ui/kbd.ts', true);

    expect(Object.keys(unstyled.variants)).toEqual(Object.keys(styled.variants));
    expect(Object.keys(unstyled.variants.size)).toEqual(Object.keys(styled.variants.size));
    expect(unstyled.defaultVariants).toEqual(styled.defaultVariants);
  });

  // Exhaustive guard: catches any component — including ones added later — whose
  // classes survive `unstyled`, without needing a hand-maintained list.
  it('leaves no non-empty class string on any theme under unstyled', async () => {
    const templates = getTemplates(defu({ theme: { unstyled: true } }, defaultOptions), {});
    const offenders: Array<string> = [];
    let inspected = 0;
    let slotLess = 0;

    for (const template of templates) {
      if (!template.filename?.startsWith('ui/') || !template.getContents) {
        continue;
      }

      const contents = await template.getContents({} as any);
      const jsonMatch = contents.match(/export default (\{[\s\S]*\})\s*$/);
      if (!jsonMatch) {
        continue;
      }

      const theme = JSON.parse(jsonMatch[1].replace(/ as typeof \w+\[number\]/g, ''));
      inspected++;
      if (!theme.slots) {
        slotLess++;
      }

      if (typeof theme.base === 'string' && theme.base.length > 0) {
        offenders.push(`${template.filename} base="${theme.base}"`);
      }
      for (const [slot, value] of Object.entries(theme.slots || {})) {
        if (typeof value === 'string' && value.length > 0) {
          offenders.push(`${template.filename} slots.${slot}="${value}"`);
        }
      }
    }

    expect(offenders).toEqual([]);
    // Fail loudly if the sweep stops finding themes (e.g. template shape changes).
    expect(inspected).toBeGreaterThan(100);
    expect(slotLess).toBeGreaterThan(10);
  });

  it('preserves button variant keys and defaultVariants under unstyled', async () => {
    const styled = await loadTheme('ui/button.ts', false);
    const unstyled = await loadTheme('ui/button.ts', true);

    expect(Object.keys(unstyled.variants)).toEqual(Object.keys(styled.variants));
    expect(Object.keys(unstyled.variants.color)).toEqual(Object.keys(styled.variants.color));
    expect(Object.keys(unstyled.variants.size)).toEqual(Object.keys(styled.variants.size));
    expect(unstyled.defaultVariants).toEqual(styled.defaultVariants);
    expect(Object.keys(unstyled.slots)).toEqual(Object.keys(styled.slots));
  });
});
