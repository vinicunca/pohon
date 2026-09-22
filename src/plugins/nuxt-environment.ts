import type { UnpluginOptions } from 'unplugin';
import type { PohonUiOptions } from '../unplugin';
import MagicString from 'magic-string';
import { resolvePathSync } from 'mlly';
import { normalize } from 'pathe';
import { runtimeDir, runtimeUrl } from '../unplugin';
import { resolveRouterMode } from '../utils/router';

/**
 * This plugin normalises Nuxt environment (#imports) and `import.meta.client` within the Pohon UI components.
 */
export default function NuxtEnvironmentPlugin(options: PohonUiOptions) {
  const routerMode = resolveRouterMode(options);
  const stubPath = resolvePathSync(`./vue/stubs/${routerMode}`, { extensions: ['.ts', '.mjs', '.js'], url: runtimeUrl });

  return {
    name: 'pohon:ui',
    enforce: 'pre',
    resolveId(id) {
      // this is implemented here rather than in a vite `config` hook for cross-builder support
      if (id === '#imports') {
        return stubPath;
      }
    },
    transformInclude(id) {
      return normalize(id).includes(runtimeDir);
    },
    transform(code) {
      if (code.includes('import.meta.client')) {
        const s = new MagicString(code);
        s.replaceAll('import.meta.client', 'true');

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true }),
          };
        }
      }
    },
  } satisfies UnpluginOptions;
}
