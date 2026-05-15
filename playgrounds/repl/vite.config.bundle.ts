import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import ui from 'pohon-ui/vite';
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
      autoImport: false,
      components: false,
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      formats: ['es'],
      fileName: 'pohon-ui',
    },
    outDir: resolve(__dirname, 'public'),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: 'pohon-ui.[ext]',
        inlineDynamicImports: true,
      },
    },
  },
});
