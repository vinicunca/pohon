import { presetVinicunca } from '@vinicunca/unocss-preset';
import vue from '@vitejs/plugin-vue';
import ui from 'pohon-ui/vite';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    UnoCSS({ presets: [presetVinicunca()] }),
    vue(),
    ui({
      dts: false,
    }),
  ],
});
