/**
 * Shares the Nuxt playground config so the REPL renders components exactly like the playgrounds.
 * Used both by the UnoCSS Vite plugin (REPL shell) and by `@unocss/runtime` in the preview (see `src/entry.ts`).
 */
export { default } from '../nuxt/uno.config';
