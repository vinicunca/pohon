export default defineNuxtConfig({
  modules: [
    'pohon-ui',
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-07-09',

  hooks: {
    // Register every Pohon UI component globally so the client bundle ships all of them
    'components:extend': function (components) {
      for (const component of components) {
        if (component.pascalName.startsWith('P')) {
          component.global = true;
        }
      }
    },
  },
});
