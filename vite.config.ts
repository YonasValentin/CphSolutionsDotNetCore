import {fileURLToPath, URL} from "url";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url))
        },
    },
    css: { preprocessorOptions: { sass: { charset: false }, css: { charset: false }, scss: { charset: false } } },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/quasar-variables.sass'
      })
    ],
    build: {
        manifest: true,
        emptyOutDir: true
    }
  })
