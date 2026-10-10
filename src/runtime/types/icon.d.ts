declare module 'virtual:pohon-ui-icons' {
  /**
   * Registers the icons Pohon UI bundles at build time through the passed `addIcon`. Generated
   * by the `pohon:ui:icons` build plugin (via `@nuxt/icon`) and called by `runtime/vue/plugins/icons`.
   */
  export function init(addIcon: typeof import('@iconify/vue').addIcon): void;
}
