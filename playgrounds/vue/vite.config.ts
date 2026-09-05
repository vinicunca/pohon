import ui from 'pohon-ui/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'green',
          neutral: 'slate',
        },
      },
      autoImport: {
        dirs: ['../nuxt/app/composables'],
        imports: ['vue'],
      },
      components: {
        dirs: ['../nuxt/app/components'],
      },
    }),
  ],
});
