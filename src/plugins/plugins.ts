import type { UnpluginOptions } from 'unplugin';
import type { PohonUiOptions } from '../unplugin';
import { genSafeVariableName } from 'knitwork';
import MagicString from 'magic-string';
import { resolvePathSync } from 'mlly';
import { join } from 'pathe';
import { globSync } from 'tinyglobby';
import { runtimeDir, runtimeUrl } from '../unplugin';

/**
 * This plugin provides the necessary transforms to allow loading the
 * Pohon UI _Nuxt_ plugins in `src/runtime/plugins/` in a pure Vue environment.
 */
export default function PluginsPlugin(options: PohonUiOptions) {
  // const plugins = globSync(['**/*', '!*.d.ts'], { cwd: join(runtimeDir, 'plugins'), absolute: true });
  const plugins: Array<string> = [];

  plugins.unshift(resolvePathSync('./vue/plugins/router', { extensions: ['.ts', '.mjs', '.js'], url: runtimeUrl }));
  plugins.unshift(resolvePathSync('./vue/plugins/head', { extensions: ['.ts', '.mjs', '.js'], url: runtimeUrl }));
  plugins.unshift(resolvePathSync('./vue/plugins/icons', { extensions: ['.ts', '.mjs', '.js'], url: runtimeUrl }));

  if (options.colorMode) {
    plugins.push(resolvePathSync('./vue/plugins/color-mode', { extensions: ['.ts', '.mjs', '.js'], url: runtimeUrl }));
  }

  const proseComponents = (options.prose || options.mdc)
    ? globSync(['**/*.vue'], { cwd: join(runtimeDir, 'components/prose'), absolute: true })
    : [];

  return {
    name: 'pohon:ui:plugins',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'pohon-ui/vue-plugin') {
        return 'virtual:pohon-ui-plugins';
      }
    },
    transform(code, id) {
      if (plugins.some((p) => id.startsWith(p)) && code.includes('import.meta.client')) {
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
    loadInclude: (id) => id === 'virtual:pohon-ui-plugins',
    load() {
      const proseImports = proseComponents.map((p) => {
        const name = `Prose${p.split('/').pop()?.replace(/\.vue$/, '')}`;
        return { name, path: p };
      });

      return `
        ${plugins.map((p) => `import ${genSafeVariableName(p)} from "${p}"`).join('\n')}
        ${proseImports.map((c) => `import ${c.name} from "${c.path}"`).join('\n')}

export default {
  install (app, pluginOptions = {}) {
${plugins.map((p) => `    app.use(${genSafeVariableName(p)}, pluginOptions)`).join('\n')}
${proseImports.map((c) => `    app.component('${c.name}', ${c.name})`).join('\n')}
  }
}
        `;
    },
    // Argument Vite specific configuration
    vite: {
      config() {
        return {
          // Opt-out Pohon UI from Vite's pre-bundling,
          // as we need Vite's pipeline to resolve imports like `#imports`
          optimizeDeps: {
            exclude: ['pohon-ui'],
          },
        };
      },
    },
  } satisfies UnpluginOptions;
}
