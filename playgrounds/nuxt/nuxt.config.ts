export default defineNuxtConfig({
  modules: [
    'pohon-ui',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  routeRules: {
    '/docs/components/**': { redirect: { to: '/components/**', statusCode: 301 }, prerender: false },
  },

  compatibilityDate: '2024-07-09',

  vite: {
    optimizeDeps: {
      include: [
        '@ai-sdk/vue',
        '@comark/vue',
        '@comark/vue/plugins/shiki',
        '@vueuse/core',
        '@vueuse/integrations/useFuse',
        'ai',
        'unocss-variants',
        'vaul-vue',
      ],
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          // The docs examples imported in `pages/components/form.vue` resolve
          // `pohon-ui` from `docs/`, which the isolated CI install can't reach.
          'pohon-ui': ['../node_modules/pohon-ui/dist/module.d.mts'],
        },
      },
    },
  },
});
