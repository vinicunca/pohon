import { describe, expect, it } from 'vitest';
import { applyUnstyled } from '../../src/utils/theme';

describe('applyUnstyled', () => {
  const theme = () => ({
    slots: {
      base: 'inline-flex rounded-md',
      label: 'truncate',
    },
    variants: {
      color: {
        primary: 'bg-primary text-inverted',
        neutral: { base: 'bg-inverted', label: 'text-default' },
      },
      size: {
        md: { base: 'px-2.5 text-sm' },
      },
    },
    compoundVariants: [
      { color: 'primary', variant: 'solid', class: 'bg-primary' },
      { size: 'md', class: { base: 'gap-1.5' } },
    ],
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  });

  it('returns the theme untouched when unstyled is falsy', () => {
    const input = theme();
    expect(applyUnstyled(input, false)).toBe(input);
    expect(applyUnstyled(input, undefined)).toBe(input);
    expect(input).toEqual(theme());
  });

  it('blanks every slot class but keeps the slot keys', () => {
    const result = applyUnstyled(theme(), true);
    expect(result.slots).toEqual({ base: '', label: '' });
  });

  it('blanks variant classes in both string and slot-object forms', () => {
    const result = applyUnstyled(theme(), true);
    expect(result.variants.color.primary).toBe('');
    expect(result.variants.color.neutral).toEqual({ base: '', label: '' });
    expect(result.variants.size.md).toEqual({ base: '' });
  });

  it('blanks compoundVariants classes but keeps the selectors', () => {
    const result = applyUnstyled(theme(), true);
    expect(result.compoundVariants).toEqual([
      { color: 'primary', variant: 'solid', class: '' },
      { size: 'md', class: { base: '' } },
    ]);
  });

  it('preserves defaultVariants and variant keys so props still validate', () => {
    const result = applyUnstyled(theme(), true);
    expect(result.defaultVariants).toEqual({ color: 'primary', size: 'md' });
    expect(Object.keys(result.variants)).toEqual(['color', 'size']);
    expect(Object.keys(result.variants.color)).toEqual(['primary', 'neutral']);
  });

  describe('slot-less themes', () => {
    it('blanks a bare top-level base', () => {
      const result = applyUnstyled({ base: 'w-full mx-auto px-4' }, true);
      expect(result.base).toBe('');
    });

    it('blanks a top-level base alongside variants', () => {
      const result = applyUnstyled({
        base: 'inline-flex px-1 font-medium',
        variants: { size: { md: 'h-5 text-[11px]' } },
        defaultVariants: { size: 'md' },
      }, true);

      expect(result.base).toBe('');
      expect(result.variants.size.md).toBe('');
      expect(result.defaultVariants).toEqual({ size: 'md' });
    });

    it('blanks an array-valued base', () => {
      const result = applyUnstyled({ base: ['inline-flex', 'px-1'] }, true);
      expect(result.base).toBe('');
    });

    it('does not add a base key to themes that have none', () => {
      const result = applyUnstyled({ slots: { base: 'inline-flex' } }, true);
      expect('base' in result).toBe(false);
    });

    it('leaves base untouched when unstyled is falsy', () => {
      const result = applyUnstyled({ base: 'w-full mx-auto' }, false);
      expect(result.base).toBe('w-full mx-auto');
    });
  });

  // Plain-object themes (e.g. `theme/container.ts`) are module singletons, so an
  // in-place blank would leak into every later read of that module.
  describe('purity', () => {
    it('does not mutate a slot-less input theme', () => {
      const input = { base: 'w-full mx-auto px-4' };
      const result = applyUnstyled(input, true);

      expect(input.base).toBe('w-full mx-auto px-4');
      expect(result).not.toBe(input);
      expect(result.base).toBe('');
    });

    it('does not mutate a slot-based input theme', () => {
      const input = theme();
      applyUnstyled(input, true);

      expect(input).toEqual(theme());
    });

    it('is stable across repeated calls on the same theme object', () => {
      const input = { base: 'inline-flex px-1' };

      expect(applyUnstyled(input, true).base).toBe('');
      expect(applyUnstyled(input, false).base).toBe('inline-flex px-1');
      expect(applyUnstyled(input, true).base).toBe('');
    });
  });
});
