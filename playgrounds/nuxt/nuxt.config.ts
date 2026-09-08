export default defineNuxtConfig({
  modules: [
    'pohon-ui',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/designs/styles/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  ui: {
    theme: {
      unstyled: true,
    },
  },

  routeRules: {
    '/docs/components/**': { redirect: { to: '/components/**', statusCode: 301 }, prerender: false },
  },

  compatibilityDate: '2024-07-09',

  vite: {
    optimizeDeps: {
      // @keep-sorted
      include: [
        '@ai-sdk/vue',
        '@comark/vue',
        '@comark/vue/plugins/shiki',
        '@vinicunca/perkakas',
        '@vueuse/core',
        '@vueuse/integrations/useFuse',
        'ai',
        'unocss-variants',
        'vaul-vue',
      ],
    },
  },

  typescript: {
    nodeTsConfig: {
      include: [
        '../uno.config.ts',
      ],
    },

    tsConfig: {
      compilerOptions: {
        paths: {
          // The docs examples imported in `pages/components/form.vue` resolve
          // `pohon-ui` from `docs/`, which the isolated CI install can't reach.
          'pohon-ui': ['../node_modules/pohon-ui/dist/module.d.mts'],
          'zod': ['../node_modules/zod'],
        },
      },
    },
  },
});
