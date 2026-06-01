import type { Resolver } from '@nuxt/kit';
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema';
import type { ModuleOptions } from './module';
import { fileURLToPath } from 'node:url';
import { addTemplate, addTypeTemplate, hasNuxtModule } from '@nuxt/kit';
import { toKebabCase } from '@vinicunca/perkakas';
import { genExport } from 'knitwork';
import * as theme from './theme';
import * as themeContent from './theme/content';
import * as themeProse from './theme/prose';
import { applyDefaultVariants } from './utils/theme';

export function getTemplates(options: ModuleOptions, uiConfig: Record<string, any>, nuxt?: Nuxt) {
  const templates: Array<NuxtTemplate> = [];

  let hasProse = false;
  let hasContent = false;

  const isDev = process.argv.includes('--uiDev');

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `ui/${path ? `${path}/` : ''}${toKebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = (theme as any)[component];
          let result = typeof template === 'function' ? template(options) : template;

          // Override default variants from nuxt.config.ts
          result = applyDefaultVariants(result, options.theme?.defaultVariants);

          const variants = Object.entries(result.variants || {})
            .filter(([_, values]) => {
              const keys = Object.keys(values as Record<string, unknown>);
              return keys.some((key) => key !== 'true' && key !== 'false');
            })
            .map(([key]) => key);

          let json = JSON.stringify(result, null, 2);

          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`);
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`);
              return `${before}${replaced}${after}`;
            });
          }

          function generateVariantDeclarations(variants: Array<string>) {
            return variants.filter((variant) => json.includes(`as typeof ${variant}`)).map((variant) => {
              const keys = Object.keys(result.variants[variant]);
              return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`;
            });
          }

          // For local development, import directly from theme
          if (isDev) {
            const templatePath = fileURLToPath(new URL(`./theme/${path ? `${path}/` : ''}${toKebabCase(component)}`, import.meta.url));
            const themeUtilsPath = fileURLToPath(new URL('./utils/theme', import.meta.url));
            const defaultVariantsJson = JSON.stringify(options.theme?.defaultVariants) ?? 'undefined';

            return [
              `import template from ${JSON.stringify(templatePath)}`,
              `import { applyDefaultVariants } from ${JSON.stringify(themeUtilsPath)}`,
              ...generateVariantDeclarations(variants),
              `const options = ${JSON.stringify(options, null, 2)}`,
              'let result = typeof template === \'function\' ? (template as Function)(options) : template',
              `result = applyDefaultVariants(result, ${defaultVariantsJson})`,
              `const theme = ${json}`,
              'export default result as typeof theme',
            ].join('\n\n');
          }

          // For production build
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`,
          ].join('\n\n');
        },
      });
    }
  }

  if (options.prose || options.mdc || options.content || (!!nuxt && (hasNuxtModule('@nuxtjs/mdc') || hasNuxtModule('@nuxt/content')))) {
    hasProse = true;

    const path = 'prose';

    writeThemeTemplate(themeProse, path);

    templates.push({
      filename: `ui/${path}/index.ts`,
      write: true,
      getContents: () => Object.keys(themeProse).map((component) => `export { default as ${component} } from './${toKebabCase(component)}'`).join('\n'),
    });
  }

  if (options.content || (!!nuxt && hasNuxtModule('@nuxt/content'))) {
    hasContent = true;

    writeThemeTemplate(themeContent, 'content');
  }

  writeThemeTemplate(theme);

  templates.push({
    filename: 'ui/index.ts',
    write: true,
    getContents: () => [
      ...Object.keys(theme).map((component) => `export { default as ${component} } from './${toKebabCase(component)}'`),
      ...(hasContent ? Object.keys(themeContent).map((component) => `export { default as ${component} } from './content/${toKebabCase(component)}'`) : []),
      ...(hasProse ? ['export * as prose from \'./prose\''] : []),
    ].join('\n'),
  });

  // TODO: `typeof colors[number]` should include all colors from the theme
  templates.push({
    filename: 'types/ui.d.ts',
    getContents: () => {
      const iconKeys = Object.keys(uiConfig?.icons || {});
      const iconUnion = iconKeys.length ? iconKeys.map((i) => JSON.stringify(i)).join(' | ') : 'string';

      return `import * as ui from '#build/ui';
import type { UvConfig, DeepRequired } from 'pohon-ui';
import type { colors } from 'unocss/preset-mini';

type IconsConfig = Record<${iconUnion} | (string & {}), string>

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'taupe' | 'mauve' | 'mist' | 'olive'
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {})

type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map((color) => `'${color}'?: Color`).join('\n\t\t')}
    neutral?: NeutralColor | (string & {})
  };
  icons?: Partial<IconsConfig>;
} & UvConfig<typeof ui>;

type AppConfigRuntimeUI = DeepRequired<Pick<AppConfigUI, 'colors' | 'icons' | 'tv'>> & Omit<AppConfigUI, 'colors' | 'icons' | 'tv'>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Pohon UI theme configuration
     * @see https://pohon.vinicunca.dev/docs/getting-started/theme/components
     */
    ui?: AppConfigUI;
  }

  interface AppConfig {
    ui: AppConfigRuntimeUI
  }
}

export {};
`;
    },
  });

  templates.push({
    filename: 'ui-image-component.ts',
    write: true,
    getContents: ({ app }) => {
      const image = app?.components?.find((c) => c.pascalName === 'NuxtImg' && !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath));

      return image ? genExport(image.filePath, [{ name: image.export, as: 'default' }]) : 'export default "img"';
    },
  });

  return templates;
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, resolve: Resolver['resolve']) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui, nuxt);
  for (const template of templates) {
    if (template.filename!.endsWith('.d.ts')) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template);
    }
  }

  nuxt.hook('prepare:types', ({ references }) => {
    references.push({ path: resolve('./runtime/types/app.config.d.ts') });
  });
}
