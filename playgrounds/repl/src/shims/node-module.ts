/**
 * Browser stand-in for `node:module`, aliased in `vite.config.bundle.ts`. `@vinicunca/unocss-preset`
 * calls `createRequire(import.meta.url)` when it loads; only its Node-only code paths use the result.
 */
export const builtinModules: Array<string> = [];

export function createRequire() {
  return (id: string) => {
    throw new Error(`[repl] require('${id}') is not available in the browser`);
  };
}
