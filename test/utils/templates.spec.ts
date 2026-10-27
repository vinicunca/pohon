import { describe, expect, it } from 'vitest';
import { getTemplates } from '../../src/templates';
import { defaultOptions, getDefaultConfig, resolveColors } from '../../src/utils/defaults';

describe('theme templates', () => {
  it('skips prose themes with `prose: false`', () => {
    const hasProse = (overrides: Record<string, any>) => {
      const options = {
        ...defaultOptions,
        ...overrides,
        theme: {
          ...defaultOptions.theme,
          colors: resolveColors(undefined),
        },
      };
      return getTemplates(options as any, getDefaultConfig(options.theme)).some((template) => template.filename === 'ui/prose/index.ts');
    };

    expect(hasProse({ content: true })).toBe(true);
    expect(hasProse({ content: true, prose: false })).toBe(false);
  });
});
