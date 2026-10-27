import type { SourceCodeTransformer, UserConfig } from '@unocss/core';

/**
 * Browser stand-in for `unocss`, aliased in `vite.config.bundle.ts`. The real entry re-exports every
 * preset and transformer, which pulls Node-only code (`oxc-parser`, file loaders) into the preview
 * bundle. `@vinicunca/unocss-preset` and `uno.config.ts` only need what is exported here.
 */
export * from '@unocss/core';
export { default as presetWind4 } from 'unocss/preset-wind4';

export function defineConfig<T extends object>(config: UserConfig<T>): UserConfig<T> {
  return config;
}

// Source transformers only run in build tools; `@unocss/runtime` never calls them.
function noopTransformer(name: string) {
  return (): SourceCodeTransformer => ({
    name,
    transform() {},
  });
}

export const transformerDirectives = noopTransformer('repl:noop-directives');
export const transformerVariantGroup = noopTransformer('repl:noop-variant-group');
