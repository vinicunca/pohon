import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from 'pohon-ui/vite'
import UnoCSS from 'unocss/vite'
import { presetVinicunca } from '@vinicunca/unocss-preset'

export default defineConfig({
  plugins: [
    UnoCSS({ presets: [presetVinicunca()] }),
    vue(),
    ui({
      dts: false
    })
  ]
})
