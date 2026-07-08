import type { HookResult, ModuleDependencies } from '@nuxt/schema';
import { addComponentsDir, addImports, addImportsDir, addPlugin, createResolver, defineNuxtModule, hasNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';
import { name, version } from '../package.json';
import { publicComposables } from './imports';
import { addTemplates } from './templates';
import { defaultOptions, getDefaultConfig, resolveColors } from './utils/defaults';
import { getClientBundleIcons } from './utils/icons';

export type * from './runtime/types';

type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | (string & {});
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});

export interface ModuleOptions {
  /**
   * Prefix for components
   * @defaultValue `P`
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#prefix
   */
  prefix?: string;

  /**
   * Enable or disable `@nuxt/fonts` module
   * @defaultValue `true`
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#fonts
   */
  fonts?: boolean;

  /**
   * Enable or disable `@nuxtjs/color-mode` module
   * @defaultValue `true`
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#colormode
   */
  colorMode?: boolean;

  /**
   * Customize how the theme is generated
   * @see https://pohon.vinicunca.dev/docs/getting-started/theme/design-system
   */
  theme?: {
    /**
     * Define the color aliases available for components
     * @defaultValue `['primary', 'secondary', 'success', 'info', 'warning', 'error']`
     * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#themecolors
     */
    colors?: Array<Color>;

    /**
     * Enable or disable transitions on components
     * @defaultValue `true`
     * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#themetransitions
     */
    transitions?: boolean;

    /**
     * Remove all default theme classes from components, keeping only their
     * structure and the classes you supply via `class`, `ui` or `app.config.ui`.
     * @defaultValue `false`
     * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#themeunstyled
     */
    unstyled?: boolean;

    /**
     * The default variants to use for components
     * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#themedefaultvariants
     */
    defaultVariants?: {
      /**
       * The default color variant to use for components
       * @defaultValue `'primary'`
       */
      color?: Color;

      /**
       * The default size variant to use for components
       * @defaultValue `'md'`
       */
      size?: Size;
    };
  };

  /**
   * Force the import of prose components even if `@nuxtjs/mdc` or `@nuxt/content` are not installed
   * @defaultValue false
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#prose
   */
  prose?: boolean;

  /**
   * @deprecated Use `prose` instead
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#mdc
   */
  mdc?: boolean;

  /**
   * Force the import of content & prose components even if `@nuxt/content` is not installed
   * @defaultValue false
   * @see https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt#content
   */
  content?: boolean;
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'dashboard:search:toggle': () => HookResult;
    'dashboard:sidebar:toggle': () => HookResult;
    'dashboard:sidebar:collapse': (value: boolean) => HookResult;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    docs: 'https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt',
    configKey: 'ui',
    compatibility: {
      nuxt: '>=4.1.0',
    },
  },

  defaults: defaultOptions,

  moduleDependencies(nuxt): ModuleDependencies {
    const userUiOptions = nuxt.options.ui || {};
    return {
      '@unocss/nuxt': {},

      '@nuxt/icon': {
        defaults: {
          cssLayer: 'properties',
        },
      },
      ...userUiOptions.fonts !== false && {
        '@nuxt/fonts': {
          defaults: {
            defaults: {
              weights: [400, 500, 600, 700],
            },
          },
        },
      },
      ...userUiOptions.colorMode !== false && {
        '@nuxtjs/color-mode': {
          defaults: {
            classSuffix: '',
            disableTransition: true,
          },
        },
      },
      '@nuxtjs/mdc': {
        optional: !userUiOptions.mdc,
        defaults: {
          highlight: {
            theme: {
              light: 'material-theme-lighter',
              default: 'material-theme',
              dark: 'material-theme-palenight',
            },
          },
          components: {
            map: {
              'accordion': 'ProseAccordion',
              'accordion-item': 'ProseAccordionItem',
              'badge': 'ProseBadge',
              'callout': 'ProseCallout',
              'card': 'ProseCard',
              'card-group': 'ProseCardGroup',
              'caution': 'ProseCaution',
              'code-collapse': 'ProseCodeCollapse',
              'code-group': 'ProseCodeGroup',
              'code-icon': 'ProseCodeIcon',
              'code-preview': 'ProseCodePreview',
              'code-tree': 'ProseCodeTree',
              'collapsible': 'ProseCollapsible',
              'field': 'ProseField',
              'field-group': 'ProseFieldGroup',
              'icon': 'ProseIcon',
              'kbd': 'ProseKbd',
              'note': 'ProseNote',
              'prompt': 'ProsePrompt',
              'steps': 'ProseSteps',
              'tabs': 'ProseTabs',
              'tabs-item': 'ProseTabsItem',
              'tip': 'ProseTip',
              'warning': 'ProseWarning',
            },
          },
        },
      },
    };
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.ui = options;

    nuxt.options.alias['#ui'] = resolve('./runtime');

    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, getDefaultConfig(options.theme)) as typeof nuxt.options.appConfig.ui;

    // Pre-bundle the icons Pohon UI uses into `@nuxt/icon`'s client bundle so they're
    // embedded at build time instead of fetched at runtime. Its `clientBundle.scan`
    // skips `node_modules`, so it can't discover the icons baked into our components.
    //
    // `@nuxt/icon` drops any name it can't resolve (collection not installed, icon
    // missing) and falls back to runtime loading instead of failing the build
    // (nuxt/icon#504), so we add them all and let it sort out what's available.
    nuxt.hook('icon:clientBundleIcons', (icons) => {
      for (const name of getClientBundleIcons(nuxt.options.appConfig.ui?.icons)) {
        icons.add(name);
      }
    });

    nuxt.options.build.transpile.push('akar');

    // Isolate root node from portaled components
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ');

    addPlugin({ src: resolve('./runtime/plugins/colors') });

    if (options.prose || options.mdc || options.content || hasNuxtModule('@nuxtjs/mdc') || hasNuxtModule('@nuxt/content')) {
      addComponentsDir({
        path: resolve('./runtime/components/prose'),
        pathPrefix: false,
        prefix: 'Prose',
        global: true,
      });
    }

    if (options.content || hasNuxtModule('@nuxt/content')) {
      addComponentsDir({
        path: resolve('./runtime/components/content'),
        pathPrefix: false,
        prefix: options.prefix,
      });
    }

    if (options.colorMode || hasNuxtModule('@nuxtjs/color-mode')) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: options.prefix,
      });
    } else {
      // Stub `useColorMode` composable used in `DashboardSearch` and `ContentSearch` components
      addImportsDir(resolve('./runtime/composables/color-mode'));
    }

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: options.prefix,
      ignore: ['color-mode/**', 'content/**', 'prose/**'],
    });

    addImports(
      Object.entries(publicComposables).flatMap(([file, exports]) =>
        exports.map((name) => ({ name, from: resolve(`./runtime/composables/${file}`) })),
      ),
    );

    addTemplates(options, nuxt, resolve);
  },
});
