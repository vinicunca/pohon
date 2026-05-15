import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';
import type { PohonUiOptions } from '../unplugin';
import { defu } from 'defu';
import { join, normalize } from 'pathe';
import { globSync } from 'tinyglobby';
import AutoImportComponents from 'unplugin-vue-components';
import { runtimeDir } from '../unplugin';
import { resolveRouterMode } from '../utils/router';

interface ComponentSource {
  has: (name: string) => boolean;
  resolve: (name: string) => { name: string; from: string } | undefined;
  resolveFile: (filename: string) => string | undefined;
}

function createComponentSource(cwd: string, prefix: string, ignore: Array<string> = []): ComponentSource {
  const files = globSync('**/*.vue', { cwd, ignore: ignore.filter(Boolean) as Array<string> });
  const names = new Set(files.map((c) => `${prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`));
  const paths = new Map(files.map((c) => {
    const componentName = `${prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`;
    return [componentName, c] as const;
  }));

  return {
    has: (name) => names.has(name),
    resolve: (componentName) => {
      const relativePath = paths.get(componentName);
      if (!relativePath) {
        return;
      }
      return { name: 'default', from: join(cwd, relativePath) };
    },
    resolveFile: (filename) => {
      const componentName = `${prefix}${filename}`;
      const relativePath = paths.get(componentName);
      if (!relativePath) {
        return;
      }
      return join(cwd, relativePath);
    },
  };
}

const RELATIVE_IMPORT_RE = /^\.{1,2}\//;

/**
 * This plugin adds all the Pohon UI components as auto-imports.
 */
export default function ComponentImportPlugin(options: PohonUiOptions & { prefix: NonNullable<PohonUiOptions['prefix']> }, meta: UnpluginContextMeta) {
  const colorModeIgnore = !options.colorMode ? ['color-mode/**/*.vue'] : [];
  const routerMode = resolveRouterMode(options);

  const routerOverrides: Record<string, ComponentSource> = {
    'vue-router': createComponentSource(join(runtimeDir, 'vue/overrides/vue-router'), options.prefix),
    'inertia': createComponentSource(join(runtimeDir, 'vue/overrides/inertia'), options.prefix),
    'none': createComponentSource(join(runtimeDir, 'vue/overrides/none'), options.prefix),
  };

  const unpluginComponents = createComponentSource(
    join(runtimeDir, 'vue/components'),
    options.prefix,
    colorModeIgnore,
  );

  // Override sources only: Vue-compatible replacements for Icon and Link
  const overrideSources = [routerOverrides[routerMode], unpluginComponents].filter((s): s is ComponentSource => !!s);

  const internalResolverPlugin: UnpluginOptions = {
    /**
     * This plugin aims to ensure we override certain components with Vue-compatible versions:
     * <PIcon> and <PLink> currently.
     */
    name: 'pohon:ui:components',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!importer || !normalize(importer).includes(runtimeDir)) {
        return;
      }

      if (!RELATIVE_IMPORT_RE.test(id)) {
        return;
      }

      const filename = id.match(/([^/]+)\.vue$/)?.[1];
      if (filename) {
        for (const source of overrideSources) {
          const resolved = source.resolveFile(filename);
          if (resolved) {
            return resolved;
          }
        }
      }
    },
  };

  if (options.components === false) {
    return [internalResolverPlugin] satisfies Array<UnpluginOptions>;
  }

  const defaultComponents = createComponentSource(
    join(runtimeDir, 'components'),
    options.prefix,
    [...colorModeIgnore, 'content/*.vue', 'prose/**/*.vue'],
  );

  const proseComponents = (options.prose || options.mdc)
    ? createComponentSource(join(runtimeDir, 'components/prose'), 'Prose')
    : undefined;

  const allSources: Array<ComponentSource | undefined> = [routerOverrides[routerMode], unpluginComponents, defaultComponents, proseComponents];
  const filteredSources = allSources.filter((s): s is ComponentSource => !!s);

  const packagesToScan = [
    'pohon-ui',
    '@compodium/examples',
    ...(Array.isArray(options.scanPackages) ? options.scanPackages : []),
  ];
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const packagesRegex = packagesToScan.map(escapeRegex).join('|');
  const excludeRegex = new RegExp(`[\\\\/]node_modules[\\\\/](?!\\.pnpm|${packagesRegex})`);

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      excludeRegex,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: [
      (componentName) => {
        for (const source of filteredSources) {
          const resolved = source.resolve(componentName);
          if (resolved) {
            return resolved;
          }
        }
      },
    ],
  });

  return [
    internalResolverPlugin,
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions,
  ] satisfies Array<UnpluginOptions>;
}
