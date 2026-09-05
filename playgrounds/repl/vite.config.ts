import { resolve } from 'node:path';
import ui from 'pohon-ui/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

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
      router: false,
      autoImport: {
        imports: ['vue'],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['@vue/repl'],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
});
