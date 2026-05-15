import type { UnpluginOptions } from 'unplugin';
import type { PohonUiOptions } from '../unplugin';

/**
 * This plugin injects Pohon UI configuration into the runtime build so Pohon UI components can
 * access it.
 */
export default function AppConfigPlugin(_options: PohonUiOptions & { theme: NonNullable<PohonUiOptions['theme']> }, appConfig: Record<string, any>) {
  return {
    name: 'pohon:ui:app-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#build/app.config') {
        return 'virtual:pohon-ui-app-config';
      }
    },
    loadInclude: (id) => id === 'virtual:pohon-ui-app-config',
    load() {
      return `
          export default ${JSON.stringify(appConfig!)}
        `;
    },
    vite: {
      config() {
        return {
          test: {
            server: {
              deps: {
                inline: ['pohon-ui'],
              },
            },
          },
        };
      },
    },
  } satisfies UnpluginOptions;
}
