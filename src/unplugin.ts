import type { ModuleOptions as NuxtIconModuleOptions, RuntimeOptions } from '@nuxt/icon';
import type { colors } from 'unocss/preset-mini';
import type { UnpluginOptions } from 'unplugin';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';
import type * as ui from '#build/ui';
import type { ModuleOptions } from './module';
import type { UvConfig } from './runtime/types/uv';
import type icons from './theme/icons';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { defu } from 'defu';
import { normalize } from 'pathe';
import { createUnplugin } from 'unplugin';

import AppConfigPlugin from './plugins/app-config';
import AutoImportPlugin from './plugins/auto-import';
import ComponentImportPlugin from './plugins/components';
import IconsPlugin from './plugins/icons';
import NuxtEnvironmentPlugin from './plugins/nuxt-environment';
import PluginsPlugin from './plugins/plugins';
import TemplatePlugin from './plugins/templates';
import { defaultOptions, getDefaultConfig, resolveColors } from './utils/defaults';

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'taupe' | 'mauve' | 'mist' | 'olive';
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {});

type AppConfigUI = {
  /** TODO: add type hinting for colors from `options.theme.colors` */
  colors?: Record<string, Color> & { neutral?: NeutralColor };
  icons?: Partial<typeof icons>;
  prefix?: string;
} & UvConfig<typeof ui>;

export interface PohonUiOptions extends Omit<ModuleOptions, 'fonts' | 'colorMode' | 'content' | 'experimental'> {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean;
  ui?: AppConfigUI;
  /**
   * Default props for the `Icon` component, plus build-time icon bundling through
   * `clientBundle`, which mirrors [`@nuxt/icon`'s option](https://github.com/nuxt/icon#client-bundle)
   * (`icons`, `scan`, `sizeLimitKb`). Bundling is enabled by default for Pohon UI's own icons
   * (when their collection is installed); set `clientBundle: false` to opt out.
   * @see https://pohon.vinicunca.dev/docs/getting-started/integrations/icons/vue#collections
   */
  icon?: Partial<Pick<RuntimeOptions, 'customize' | 'size' | 'mode'>> & {
    /** `includeCustomCollections` is omitted: the Vue build has no custom-collections feature. */
    clientBundle?: false | Omit<NonNullable<NuxtIconModuleOptions['clientBundle']>, 'includeCustomCollections'>;
  };
  /**
   * Enable or disable `@vueuse/core` color-mode integration
   * @defaultValue `true`
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/vue#colormode
   */
  colorMode?: boolean;
  /**
   * Override options for `unplugin-auto-import`, or `false` to disable composable auto-imports
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/vue#autoimport
   */
  autoImport?: false | Partial<AutoImportOptions>;
  /**
   * Override options for `unplugin-vue-components`, or `false` to disable component auto-imports
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/vue#components
   */
  components?: false | Partial<ComponentsOptions>;
  /**
   * Router integration mode
   * - `true` (default): Use vue-router integration
   * - `false`: Disable routing, use anchor tags
   * - `'inertia'`: Use Inertia.js compatibility layer
   * @defaultValue `true`
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/vue#router
   */
  router?: boolean | 'inertia';
  /**
   * Enables compatibility layer for InertiaJS
   * @deprecated Use `router: 'inertia'` instead
   */
  inertia?: boolean;
  /**
   * Additional packages to scan for components using Pohon UI
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/vue#scanpackages
   */
  scanPackages?: Array<string>;
  /**
   * Root directory where the `.nuxt-ui` directory (generated theme templates) is created.
   * Useful for setups like `electron-vite` where `config.root` points to a sub-directory
   * (e.g. `src/renderer`) that Tailwind doesn't scan.
   * @defaultValue `config.root`
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/vue#root
   */
  root?: string;
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)));

/** `resolvePathSync` needs a relative id and a file url: an absolute Windows path like `D:/...` is parsed as a `d:` url scheme */
export const runtimeUrl = pathToFileURL(`${runtimeDir}/`).href;

export const PohonUiPlugin = createUnplugin<PohonUiOptions | undefined>((_options = {}, meta) => {
  const options = defu(_options, { fonts: false }, defaultOptions);

  options.theme = options.theme || {};
  options.theme.colors = resolveColors(options.theme.colors);

  // `clientBundle` is a build-time concern, so keep it out of the runtime app config.
  const { clientBundle, ...icon } = options.icon || {};
  const appConfig = defu({ ui: options.ui, colorMode: options.colorMode, icon }, { ui: getDefaultConfig(options.theme) });

  return [
    NuxtEnvironmentPlugin(options),
    ComponentImportPlugin(options, meta),
    AutoImportPlugin(options, meta),
    IconsPlugin(options, appConfig),
    PluginsPlugin(options),
    TemplatePlugin(options, appConfig),
    AppConfigPlugin(options, appConfig),
    <UnpluginOptions>{
      name: 'pohon-ui:plugins-duplication-detection',
      vite: {
        configResolved(config) {
          const plugins = config.plugins || [];

          if (options.autoImport !== false && plugins.filter((i) => i.name === 'unplugin-auto-import').length > 1) {
            throw new Error('[Pohon UI] Multiple instances of `unplugin-auto-import` detected. Pohon UI includes `unplugin-auto-import` already, and you can configure it using `autoImport` option in Pohon UI module options.');
          }
          if (options.components !== false && plugins.filter((i) => i.name === 'unplugin-vue-components').length > 1) {
            throw new Error('[Pohon UI] Multiple instances of `unplugin-vue-components` detected. Pohon UI includes `unplugin-vue-components` already, and you can configure it using `components` option in Pohon UI module options.');
          }
        },
      },
    },
  ].flat(1) as Array<UnpluginOptions>;
});
