import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';
import type { PohonUiOptions } from '../unplugin';
import { defu } from 'defu';
import { join } from 'pathe';
import AutoImport from 'unplugin-auto-import';
import { publicComposables } from '../imports';
import { runtimeDir } from '../unplugin';

/**
 * This plugin adds all the Pohon UI composables as auto-imports.
 */
export default function AutoImportPlugin(options: PohonUiOptions, meta: UnpluginContextMeta): UnpluginOptions {
  if (options.autoImport === false) {
    return { name: 'pohon:ui:auto-import' };
  }

  const pluginOptions = defu(options.autoImport, <AutoImportOptions>{
    dts: options.dts ?? true,
    imports: [
      ...Object.entries(publicComposables).map(([file, names]) => ({
        from: join(runtimeDir, 'composables', file),
        imports: names,
      })),
    ],
    dirs: [join(runtimeDir, 'vue/composables')],
  });

  return AutoImport.raw(pluginOptions, meta) as UnpluginOptions;
}
